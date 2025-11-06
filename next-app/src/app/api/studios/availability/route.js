// api/studios/availability/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { getValidAccessToken, ReconnectRequiredError } from "@lib/getValidAccessToken";
import { resolveCalendarIdByName, listEvents, freeBusy } from "@lib/googleCalendar";
import { refreshAccessToken } from "@lib/googleAuth";
import { alignSlots, toISO } from "@lib/slots";

// strict overlap: adjacent is allowed
function overlapsStrict(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

// day string (YYYY-MM-DD) for a Date as seen in a given IANA timezone
function ymdInTz(date, tz) {
  return new Date(date).toLocaleString("sv-SE", { timeZone: tz }).slice(0, 10);
}

function isAuthError(e) {
  const msg = String(e?.message || e);
  return msg.includes("(401)") || msg.includes("UNAUTHENTICATED") || msg.includes("Invalid Credentials");
}

export async function POST(req) {
  const t0 = Date.now();
  try {
    const body = await req.json();
    const { studioId, day, timezone: tzOverride, slotDurationMinutes: slotOverride } = body || {};
    if (!studioId || !day) {
      return NextResponse.json({ error: "studioId and day are required." }, { status: 400 });
    }

    const studio = await prisma.studio.findUnique({
      where: { id: studioId },
      include: { calendarConnection: true },
    });
    if (!studio || !studio.calendarConnection) {
      console.warn("[Avail] studio or connection missing", { studioId });
      return NextResponse.json({ error: "Studio or calendar connection not found." }, { status: 404 });
    }

    const timezone = tzOverride || studio.timezone || "Europe/Athens";
    const slotMinutes = slotOverride || studio.slotDurationMinutes || 30;

    // ---- Wide fetch window to avoid server-TZ clipping ----
    const dayStartUTC = new Date(`${day}T00:00:00Z`);
    const timeMin = new Date(dayStartUTC.getTime() - 12 * 60 * 60 * 1000);
    const timeMax = new Date(dayStartUTC.getTime() + 36 * 60 * 60 * 1000);
    const timeMinISO = timeMin.toISOString();
    const timeMaxISO = timeMax.toISOString();

    console.info("[Avail] request", {
      studioId,
      timezone,
      slotMinutes,
      day,
      timeMinISO,
      timeMaxISO,
    });

    // 0) Google access token (normal path)
    let accessToken;
    try {
      accessToken = await getValidAccessToken(studio.calendarConnection.id);
    } catch (e) {
      if (e instanceof ReconnectRequiredError) {
        console.warn("[Avail] reconnect required", { studioId, reason: e.message });
        return NextResponse.json({ error: "Reconnect calendar" }, { status: 401 });
      }
      console.error("[Avail] Google auth error", { studioId, error: String(e?.message || e) });
      return NextResponse.json({ error: "Google auth error" }, { status: 502 });
    }

    // 1) Resolve Availability calendar **in real time** and update DB if changed
    let availabilityCalendarId = null;
    try {
      console.info("[Avail] resolving Availability calendar by name (real-time)");
      availabilityCalendarId = await resolveCalendarIdByName(accessToken, "Availability");

      if (!availabilityCalendarId) {
        console.warn("[Avail] Availability calendar not found; clearing stale id if any");
        if (studio.availabilityCalendarId) {
          prisma.studio
            .update({ where: { id: studio.id }, data: { availabilityCalendarId: null } })
            .catch(() => {});
        }
        return NextResponse.json(
          { error: "Availability calendar not found (must be named 'Availability')." },
          { status: 404 }
        );
      }

      if (studio.availabilityCalendarId !== availabilityCalendarId) {
        console.info("[Avail] updating stored availabilityCalendarId", {
          old: studio.availabilityCalendarId,
          next: availabilityCalendarId,
        });
        prisma.studio
          .update({ where: { id: studio.id }, data: { availabilityCalendarId } })
          .catch(() => {});
      }
    } catch (e) {
      console.error("[Avail] failed to resolve calendars", { error: String(e?.message || e) });
      return NextResponse.json({ error: "Failed to resolve calendars" }, { status: 502 });
    }

    // Safer booking calendar fallback
    const bookingCalendarId =
      studio.bookingCalendarId ||
      studio.calendarConnection.calendarId ||
      "primary";

    console.info("[Avail] calendar ids", {
      availabilityCalendarId,
      bookingCalendarId,
    });

    // 2) Query Google with one-time auto-retry on 401
    let availResp, fb;
    try {
      availResp = await listEvents(accessToken, availabilityCalendarId, {
        timeMinISO,
        timeMaxISO,
        timezone,
      });
      fb = await freeBusy(accessToken, {
        calendarId: bookingCalendarId,
        timeMinISO,
        timeMaxISO,
        timezone,
      });
    } catch (e) {
      if (isAuthError(e)) {
        console.warn("[Avail] auth 401 during Google calls; forcing refresh and retry once", { studioId });
        // Force refresh using stored refresh token
        const rt = studio.calendarConnection.refreshToken;
        if (!rt) {
          console.warn("[Avail] no refresh token on record, cannot recover");
          return NextResponse.json({ error: "Reconnect calendar" }, { status: 401 });
        }
        try {
          const data = await refreshAccessToken({
            refreshToken: rt,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          });
          const nextAccess = data.access_token;
          const expiresIn = data.expires_in ?? 3600;
          const nextExpiry = new Date(Date.now() + expiresIn * 1000);
          if (!nextAccess) {
            console.error("[Avail] forced refresh returned no access token");
            return NextResponse.json({ error: "Reconnect calendar" }, { status: 401 });
          }
          // Persist new AT/expiry
          await prisma.calendarConnection.update({
            where: { id: studio.calendarConnection.id },
            data: { accessToken: nextAccess, expiry: nextExpiry },
          });
          accessToken = nextAccess;

          // Retry both calls once
          availResp = await listEvents(accessToken, availabilityCalendarId, {
            timeMinISO, timeMaxISO, timezone,
          });
          fb = await freeBusy(accessToken, {
            calendarId: bookingCalendarId,
            timeMinISO, timeMaxISO, timezone,
          });
        } catch (err2) {
          const msg2 = String(err2?.message || err2);
          console.error("[Avail] forced refresh & retry failed", { studioId, error: msg2 });
          if (msg2.includes("invalid_grant") || msg2.includes("unauthorized_client")) {
            return NextResponse.json({ error: "Reconnect calendar" }, { status: 401 });
          }
          return NextResponse.json({ error: "Google service error" }, { status: 502 });
        }
      } else {
        console.error("[Avail] Google service error", { error: String(e?.message || e) });
        return NextResponse.json({ error: "Google service error" }, { status: 502 });
      }
    }

    const availabilityWindows = (availResp.items || [])
      .filter(ev => (ev.transparency || "opaque") === "transparent")
      .map(ev => {
        const s = ev.start?.dateTime || ev.start?.date;
        const e = ev.end?.dateTime || ev.end?.date;
        if (!s || !e) return null;
        const start = new Date(s);
        const end = new Date(e);
        return start < end ? { start, end } : null;
      })
      .filter(Boolean);

    const busyWindows = (fb.calendars?.[bookingCalendarId]?.busy || []).map(b => ({
      start: new Date(b.start),
      end: new Date(b.end),
    }));

    // Busy from active DB holds (expiresAt > now)
    try {
      const now = new Date();
      const holds = await prisma.appointmentHold.findMany({
        where: {
          studioId: studio.id,
          startISO: { lt: timeMax },
          endISO:   { gt: timeMin },
          expiresAt: { gt: now },
        },
        select: { startISO: true, endISO: true },
      });
      for (const h of holds) busyWindows.push({ start: h.startISO, end: h.endISO });
    } catch (e) {
      console.warn("holds lookup failed:", e?.message || e);
    }

    // 3) Slice into fixed slots, filter by STRICT busy overlap
    const outSlots = [];
    for (const w of availabilityWindows) {
      const candidates = alignSlots(w.start, w.end, slotMinutes);
      for (const s of candidates) {
        if (ymdInTz(s.start, timezone) !== day) continue;
        const conflict = busyWindows.some(b => overlapsStrict(s.start, s.end, b.start, b.end));
        if (!conflict) outSlots.push({ start: toISO(s.start), end: toISO(s.end) });
      }
    }

    outSlots.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

    // 4) Hide already-started / near-now slots for *today* (server-side)
    const nowTZ = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    const todayYMD = ymdInTz(nowTZ, timezone);
    const GRACE_MIN = 5;
    const slots = (day === todayYMD)
      ? outSlots.filter(s => new Date(s.start) > new Date(nowTZ.getTime() + GRACE_MIN * 60 * 1000))
      : outSlots;

    console.info("[Avail] response", {
      studioId,
      totalAvailabilityWindows: availabilityWindows.length,
      totalBusyWindows: busyWindows.length,
      totalSlots: slots.length,
      tookMs: Date.now() - t0,
    });

    return NextResponse.json({
      studioId: studio.id,
      timezone,
      slotDurationMinutes: slotMinutes,
      window: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
      },
      slots,
      meta: {
        availabilityCalendarId,
        bookingCalendarId,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("Availability POST error:", String(err?.message || err));
    return NextResponse.json(
      { error: "Failed to compute availability.", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}

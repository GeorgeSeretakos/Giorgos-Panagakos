// lib/googleCalendar.js
import { googleApiGet, googleApiPost } from "./googleAuth";

/** Find calendar id by exact name (summary) */
export async function resolveCalendarIdByName(accessToken, name) {
  let pageToken = undefined;
  const target = String(name || "").trim().toLowerCase();

  for (let i = 0; i < 10; i++) {
    const url = new URL("https://www.googleapis.com/calendar/v3/users/me/calendarList");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    try {
      const data = await googleApiGet(url.toString(), accessToken);
      const items = data.items || [];
      const match = items.find(c => (c.summary || "").trim().toLowerCase() === target);
      if (match) return match.id || null;

      pageToken = data.nextPageToken;
      if (!pageToken) break;
    } catch (err) {
      console.error("[GCAL] resolveCalendarIdByName error", {
        step: "calendarList",
        name: err?.name,
        message: String(err?.message || err),
      });
      throw err;
    }
  }
  return null;
}

/** List expanded events for a calendar within a window */
export async function listEvents(accessToken, calendarId, { timeMinISO, timeMaxISO, timezone }) {
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
  url.searchParams.set("timeMin", new Date(timeMinISO).toISOString());
  url.searchParams.set("timeMax", new Date(timeMaxISO).toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("showDeleted", "false");
  url.searchParams.set("maxResults", "2500");
  if (timezone) url.searchParams.set("timeZone", timezone);

  try {
    console.info("[GCAL] listEvents:start", {
      calendarId,
      timeMinISO,
      timeMaxISO,
      timezone,
    });
    const res = await googleApiGet(url.toString(), accessToken);
    console.info("[GCAL] listEvents:ok", {
      calendarId,
      items: Array.isArray(res?.items) ? res.items.length : null,
    });
    return res;
  } catch (err) {
    console.error("[GCAL] listEvents error", {
      calendarId,
      name: err?.name,
      message: String(err?.message || err),
    });
    throw err;
  }
}

/** FreeBusy for primary (bookings) */
export async function freeBusy(accessToken, { calendarId = "primary", timeMinISO, timeMaxISO, timezone }) {
  const body = {
    timeMin: new Date(timeMinISO).toISOString(),
    timeMax: new Date(timeMaxISO).toISOString(),
    timeZone: timezone,
    items: [{ id: calendarId }],
  };

  try {
    console.info("[GCAL] freeBusy:start", {
      calendarId,
      timeMinISO,
      timeMaxISO,
      timezone,
    });
    const res = await googleApiPost("https://www.googleapis.com/calendar/v3/freeBusy", accessToken, body);
    console.info("[GCAL] freeBusy:ok", { calendarId });
    return res;
  } catch (err) {
    console.error("[GCAL] freeBusy error", {
      calendarId,
      name: err?.name,
      message: String(err?.message || err),
    });
    throw err;
  }
}

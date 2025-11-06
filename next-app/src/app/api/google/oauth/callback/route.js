export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForTokens } from "@lib/googleAuth";
import { prisma } from "@lib/prisma";

function getSafeBaseUrl(req) {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (envBase && /^https?:\/\//i.test(envBase)) {
    const u = new URL(envBase);
    if (process.env.NODE_ENV === "production") u.protocol = "https:";
    u.port = "";
    return u.toString();
  }
  const u = new URL(req.url);
  u.protocol = "https:";
  u.port = "";
  u.pathname = "/";
  u.search = "";
  u.hash = "";
  return u.toString();
}

function canonEmail(e = "") {
  const s = String(e || "").trim().toLowerCase();
  const at = s.lastIndexOf("@");
  if (at === -1) return s;
  let local = s.slice(0, at);
  let domain = s.slice(at + 1);

  if (domain === "googlemail.com") domain = "gmail.com";
  if (domain === "gmail.com") {
    const plus = local.indexOf("+");
    if (plus !== -1) local = local.slice(0, plus);
    local = local.replace(/\./g, "");
  }

  return `${local}@${domain}`;
}

function decodeJwtPayload(idToken) {
  if (!idToken || typeof idToken !== "string" || !idToken.includes(".")) return null;
  const base64 = idToken.split(".")[1];
  try {
    const json = Buffer.from(base64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const stateStr = url.searchParams.get("state") || "";

  const state = new URLSearchParams(stateStr);
  const studioId = state.get("studioId");
  const stateNonce = state.get("nonce");

  const cookieStore = await cookies();
  const cookieNonce = cookieStore.get("gcal_oauth_state")?.value;

  if (!code || !studioId) {
    return new NextResponse("Missing code or studioId", { status: 400 });
  }
  if (!stateNonce || !cookieNonce || stateNonce !== cookieNonce) {
    return new NextResponse("Invalid OAuth state", { status: 400 });
  }

  const studio = await prisma.studio.findUnique({
    where: { id: studioId },
    select: { id: true, email: true, booking_mode: true },
  });

  const deny = () => {
    const res = new NextResponse("Unauthorized", { status: 403 });
    res.cookies.set("gcal_oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  };

  if (!studio) return deny();
  if (studio.booking_mode !== "CALENDAR_AND_CONTACT") return deny();
  if (!studio.email || !studio.email.trim()) return deny();

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.OAUTH_REDIRECT_URI,
    });

    if (!tokens?.access_token) {
      console.error("[OAuth:callback] missing access_token in token response", tokens);
      const res = new NextResponse("OAuth callback error", { status: 500 });
      res.cookies.set("gcal_oauth_state", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return res;
    }

    // Email & verification from id_token (thanks to openid + email scopes)
    let googleEmail = null;
    let verified = false;
    if (tokens.id_token) {
      const payload = decodeJwtPayload(tokens.id_token);
      googleEmail = canonEmail(payload?.email || "");
      verified = !!payload?.email_verified;
    }

    if (!googleEmail || !verified || googleEmail !== canonEmail(studio.email)) {
      console.warn("[OAuth:callback] email mismatch or unverified", {
        studioEmail: canonEmail(studio.email),
        googleEmail,
        verified,
      });
      return deny();
    }

    const expiresAt =
      tokens.expiry_date
        ? new Date(tokens.expiry_date)
        : new Date(Date.now() + (tokens.expires_in || 0) * 1000);

    // ⬇️ WRITE STUDIO EMAIL AS calendarId on create/update
    await prisma.calendarConnection.upsert({
      where: { studioId },
      update: {
        accessToken: tokens.access_token || undefined,
        ...(tokens.refresh_token ? { refreshToken: tokens.refresh_token } : {}),
        expiry: expiresAt,
        grantedScopes: tokens.scope?.split(" ") ?? [],
        calendarId: studio.email, // <— set to studio email
      },
      create: {
        studioId,
        accessToken: tokens.access_token || null,
        refreshToken: tokens.refresh_token || null,
        expiry: expiresAt,
        grantedScopes: tokens.scope?.split(" ") ?? [],
        calendarId: studio.email, // <— set to studio email
      },
    });

    const target = getSafeBaseUrl(req);
    const res = NextResponse.redirect(target);
    res.cookies.set("gcal_oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch (err) {
    console.error("OAuth callback error:", err?.message || err);
    const res = new NextResponse("OAuth callback error", { status: 500 });
    res.cookies.set("gcal_oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  }
}

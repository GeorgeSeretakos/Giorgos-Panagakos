import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { prisma } from "@lib/prisma";

export async function GET(req) {
  const url = new URL(req.url);
  const studioId = url.searchParams.get("studioId");
  console.log("[OAuth:start] incoming", { studioId });

  if (!studioId) {
    console.warn("[OAuth:start] deny: missing studioId");
    return new NextResponse("Missing studioId", { status: 400 });
  }

  const studio = await prisma.studio.findUnique({
    where: { id: studioId },
    select: { id: true, email: true, booking_mode: true, isActive: true },
  });

  console.log("[OAuth:start] studio lookup result:", studio);

  if (!studio) {
    console.warn("[OAuth:start] deny: studio not found", { studioId });
    return new NextResponse("Unauthorized", { status: 403 });
  }
  if (studio.booking_mode !== "CALENDAR_AND_CONTACT") {
    console.warn("[OAuth:start] deny: wrong booking_mode", {
      studioId,
      booking_mode: studio.booking_mode,
    });
    return new NextResponse("Unauthorized", { status: 403 });
  }
  if (!studio.email || !studio.email.trim()) {
    console.warn("[OAuth:start] deny: missing studio email", { studioId, email: studio.email });
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.OAUTH_REDIRECT_URI;
  console.log("[OAuth:start] env check", { clientId, redirectUri });
  if (!clientId || !redirectUri) {
    console.error("[OAuth:start] missing env vars", { clientId: !!clientId, redirectUri: !!redirectUri });
    return new NextResponse("OAuth not configured", { status: 500 });
  }

  const cookieStore = await cookies();

  const nonce = crypto.randomUUID();
  console.log("[OAuth:start] generated nonce", { nonce });
  cookieStore.set("gcal_oauth_state", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  const state = new URLSearchParams({ studioId, nonce }).toString();
  console.log("[OAuth:start] composed state", state);

  // calendar + identity scopes (openid/email gives id_token with email)
  const scope = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
    "openid",
    "email",
  ].join(" ");
  console.log("[OAuth:start] using scopes", scope);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
    state,
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  console.log("[OAuth:start] redirecting to", authUrl);
  return NextResponse.redirect(authUrl);
}

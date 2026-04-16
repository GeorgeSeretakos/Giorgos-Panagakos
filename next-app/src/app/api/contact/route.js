import { NextResponse } from "next/server";
import { sendContactMail } from "../../lib/sendContactMail";

/**
 * Build an absolute URL for redirects behind reverse proxies (e.g. Netlify).
 * Avoids `new URL(path, request.url)` which can produce `https://host:80/...`
 * when the upstream URL uses port 80 — that breaks TLS (ERR_SSL_PROTOCOL_ERROR).
 */
function publicRedirectUrl(request, pathname) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = request.headers.get("host") ?? "";

  if (forwardedProto || forwardedHost) {
    const proto = forwardedProto || "https";
    const host = (forwardedHost || hostHeader)
      .replace(/:80$/, "")
      .replace(/:443$/, "");
    if (host) {
      return new URL(pathname, `${proto}://${host}`).href;
    }
  }

  return new URL(pathname, request.nextUrl.origin).href;
}

export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }

  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const locale = String(formData.get("locale") || "el").trim();

  if (!email || !phone || !message) {
    return new NextResponse("Invalid form submission", { status: 400 });
  }

  try {
    await sendContactMail({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
  } catch (e) {
    console.error(e);
    return new NextResponse("Failed to send email", { status: 500 });
  }

  const thankYou = locale === "en" ? "/en/thank-you" : "/el/thank-you";
  return NextResponse.redirect(publicRedirectUrl(request, thankYou), 303);
}

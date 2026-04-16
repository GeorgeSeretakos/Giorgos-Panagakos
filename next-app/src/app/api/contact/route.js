import { NextResponse } from "next/server";
import { sendContactMail } from "../../lib/sendContactMail";

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
  return NextResponse.redirect(new URL(thankYou, request.url), 303);
}

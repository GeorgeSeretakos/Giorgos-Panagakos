"use server";

import { redirect } from "next/navigation";
import { sendContactMail } from "../lib/sendContactMail";

export async function sendContactForm(formData) {
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const locale = String(formData.get("locale") || "el").trim();

  if (!email || !phone || !message) {
    throw new Error("Invalid form submission");
  }

  await sendContactMail({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  redirect(locale === "en" ? "/en/thank-you" : "/el/thank-you");
}

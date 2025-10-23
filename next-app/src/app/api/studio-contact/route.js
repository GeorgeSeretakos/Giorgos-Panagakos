export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM || "Bookings <no-reply@yourdomain.com>";
const FIRM_EMAIL = process.env.FIRM_NOTIFICATIONS_EMAIL; // required to notify the firm

export async function POST(req) {
  try {
    const body = await req.json();

    // Basic required fields
    const { studioId, name, email, phone, message, website } = body || {};

    // Honeypot: if 'website' is filled, likely a bot → pretend success
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!studioId || !name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Fetch studio to get its email and name
    const studio = await prisma.studio.findUnique({
      where: { id: studioId },
      select: { id: true, name: true, email: true, timezone: true, address: true },
    });
    if (!studio) {
      return NextResponse.json({ error: "Studio not found" }, { status: 404 });
    }

    // Build recipients: firm + studio.email (deduped)
    const recipients = Array.from(
      new Set(
        [FIRM_EMAIL, studio.email]
          .map((e) => (typeof e === "string" ? e.trim() : ""))
          .filter(Boolean)
      )
    );
    if (recipients.length === 0) {
      // No recipients configured; treat as success but log
      console.warn("studio-contact: no recipients (firm/studio) configured.");
      return NextResponse.json({ ok: true, to: [] });
    }

    const subject = `Νέο μήνυμα επικοινωνίας — ${studio.name}`;
    const createdAt = new Date().toLocaleString("el-GR", {
      timeZone: studio.timezone || "Europe/Athens",
      dateStyle: "full",
      timeStyle: "short",
    });

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
        <h2 style="margin:0 0 8px">Νέο μήνυμα επικοινωνίας</h2>
        <p style="margin:0 0 10px"><strong>Στούντιο:</strong> ${esc(studio.name)}</p>
        ${studio.address ? `<p style="margin:0 0 10px"><strong>Διεύθυνση:</strong> ${esc(studio.address)}</p>` : ""}
        <p style="margin:0 0 10px"><strong>Ημερομηνία:</strong> ${esc(createdAt)}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
        <p style="margin:0 0 6px"><strong>Όνομα:</strong> ${esc(name)}</p>
        <p style="margin:0 0 6px"><strong>Email:</strong> ${esc(email)}</p>
        ${phone ? `<p style="margin:0 0 6px"><strong>Τηλέφωνο:</strong> ${esc(phone)}</p>` : ""}
        <p style="margin:10px 0 6px"><strong>Μήνυμα:</strong></p>
        <pre style="white-space:pre-wrap;border:1px solid #eee;padding:12px;border-radius:8px;background:#fafafa">${esc(message)}</pre>
      </div>
    `;

    const text = [
      "Νέο μήνυμα επικοινωνίας",
      `• Στούντιο: ${studio.name}`,
      studio.address ? `• Διεύθυνση: ${studio.address}` : null,
      `• Ημερομηνία: ${createdAt}`,
      `• Όνομα: ${name}`,
      `• Email: ${email}`,
      phone ? `• Τηλέφωνο: ${phone}` : null,
      "",
      "Μήνυμα:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: recipients, // firm + studio (deduped)
      subject,
      html,
      text,
      reply_to: email, // so firm/studio can reply directly to the requester
    });

    if (error) {
      console.error("studio-contact send error:", error);
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    const messageIds = Array.isArray(data?.ids) ? data.ids : data?.id ? [data.id] : [];
    return NextResponse.json({ ok: true, to: recipients, messageIds });
  } catch (err) {
    console.error("studio-contact route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

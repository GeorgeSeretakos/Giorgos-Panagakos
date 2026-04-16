import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMail({
  firstName,
  lastName,
  email,
  phone,
  message,
}) {
  return resend.emails.send({
    from: "AGPA Law Office Website <no-reply@agpa-law-firm.gr>",
    to: [
      // "gsa.panagakos.law@gmail.com",
      "g.seretakos@gmail.com",
    ],
    replyTo: email,
    subject: "Website: Αίτημα Επικοινωνίας / Contact Request",
    html: `
      <h2>Νέο Αίτημα Επικοινωνίας</h2>
      <p><strong>Όνομα:</strong> ${firstName || ""}</p>
      <p><strong>Επώνυμο:</strong> ${lastName || ""}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Τηλέφωνο:</strong> ${phone}</p>
      <hr />
      <p><strong>Μήνυμα:</strong></p>
      <p>${String(message || "").replace(/\n/g, "<br />")}</p>
    `,
  });
}

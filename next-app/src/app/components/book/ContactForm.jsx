// app/components/book/ContactForm.jsx
"use client";

import { useMemo, useState } from "react";

export default function ContactForm({
                                      studioId,
                                      studioName,
                                      studioEmail = "",
                                      locale = "el",
                                      showTitle = true,
                                    }) {
  const t = useMemo(
    () =>
      locale === "en"
        ? {
          title: `Contact ${studioName}`,
          name: "Your name",
          email: "Your email",
          phone: "Phone (optional)",
          message: "Message",
          submit: "Send message",
          ok: "Thanks! Your message was sent.",
          fail: "Something went wrong. Please try again.",
          studioEmailLabel: "Studio email",
        }
        : {
          title: `Επικοινωνία με ${studioName}`,
          name: "Ονοματεπώνυμο",
          email: "Email",
          phone: "Τηλέφωνο (προαιρετικό)",
          message: "Μήνυμα",
          submit: "Αποστολή",
          ok: "Ευχαριστούμε! Το μήνυμα στάλθηκε.",
          fail: "Κάτι πήγε στραβά. Προσπαθήστε ξανά.",
          studioEmailLabel: "Email στούντιο",
        },
    [locale, studioName]
  );

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setOk(false);
    setErr("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/studio-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioId,
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          message: data.message,
          website: data.website || "", // honeypot
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Request failed");
      }

      setOk(true);
      form.reset();
    } catch (e) {
      setErr(t.fail);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full rounded-xl bg-white text-gray-900 p-6 space-y-4 border border-gray-200 shadow-md"
      onSubmit={onSubmit}
    >
      {showTitle && (
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold">{t.title}</h3>
          {studioEmail ? (
            <span className="text-xs text-gray-500">
              {t.studioEmailLabel}:{" "}
              <span className="font-medium text-gray-700">{studioEmail}</span>
            </span>
          ) : null}
        </div>
      )}

      {/* Honeypot field for bots (hidden from users) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">{t.name}</span>
          <input
            name="name"
            required
            className="rounded-md bg-white border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoComplete="name"
            disabled={loading}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">{t.email}</span>
          <input
            name="email"
            type="email"
            required
            className="rounded-md bg-white border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoComplete="email"
            disabled={loading}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">{t.phone}</span>
        <input
          name="phone"
          type="tel"
          className="rounded-md bg-white border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoComplete="tel"
          disabled={loading}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">{t.message}</span>
        <textarea
          name="message"
          required
          rows={6}
          className="rounded-md bg-white border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
          disabled={loading}
        />
      </label>

      <button
        type="submit"
        className="btn disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "…" : t.submit}
      </button>

      {ok && <p className="text-sm text-green-600">{t.ok}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </form>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";

export default function AppointmentForm({
                                          embedded = false,
                                          studioId,
                                          defaultTimezone = "Europe/Athens",
                                          locale = "el",
                                        }) {
  // -------- i18n --------
  const t = useMemo(() => {
    if (locale === "en") {
      return {
        selectedLabel: "Selected:",
        pickHint: "Pick a time from the available slots on the right.",
        missingStudio: "Studio id is missing.",
        pickFirst: "Please pick a time slot first.",
        requiredFields: "Please fill in all required fields.",
        invalidEmail: "Email address is not valid.",
        acceptPrivacy: "Please accept the Privacy Policy.",
        slotTaken: "This time has just been booked. Please pick another.",
        sendFailed: "Failed to send confirmation email.",
        sending: "Sending...",
        send: "Send",
        selectedTimeBanner: (day, time, tz) => (
          <>
            <span className="text-gray-600">Selected:</span>
            <span className="font-medium text-gray-900"> {day} • {time}</span>
            <span className="text-gray-500"> ({tz})</span>
          </>
        ),
        form: {
          firstName: "First name",
          lastName: "Last name",
          email: "Email",
          phone: "Phone",
          message: "Message (optional)",
        },
        privacy: {
          labelPrefix: "I accept the ",
          linkText: "Privacy Policy",
        },
        success: {
          title: "Confirmation link sent",
          bodyPrefix: "Check the email ",
          bodyMid: " and click “Confirm Appointment”. The link expires in ~5 minutes.",
          whenPrefix: "Appointment time: ",
        },
        bannerFallback: "Pick a time from the available slots on the right.",
        dateLocale: "en-US",
      };
    }
    // Greek (default)
    return {
      selectedLabel: "Επιλεγμένο:",
      pickHint: "Επιλέξτε μια ώρα από τα διαθέσιμα στα δεξιά.",
      missingStudio: "Λείπει το studio id.",
      pickFirst: "Επιλέξτε πρώτα ώρα ραντεβού από τα διαθέσιμα.",
      requiredFields: "Συμπληρώστε όλα τα υποχρεωτικά πεδία.",
      invalidEmail: "Το email δεν είναι έγκυρο.",
      acceptPrivacy: "Αποδεχθείτε την Πολιτική Απορρήτου.",
      slotTaken: "Η ώρα μόλις κλείστηκε. Επιλέξτε άλλη διαθέσιμη ώρα.",
      sendFailed: "Αποτυχία αποστολής email επιβεβαίωσης.",
      sending: "Γίνεται αποστολή...",
      send: "Αποστολή",
      selectedTimeBanner: (day, time, tz) => (
        <>
          <span className="text-gray-600">Επιλεγμένο:</span>
          <span className="font-medium text-gray-900"> {day} • {time}</span>
          <span className="text-gray-500"> ({tz})</span>
        </>
      ),
      form: {
        firstName: "Όνομα",
        lastName: "Επώνυμο",
        email: "Email",
        phone: "Τηλέφωνο",
        message: "Μήνυμα (προαιρετικό)",
      },
      privacy: {
        labelPrefix: "Αποδέχομαι την ",
        linkText: "Πολιτική Απορρήτου",
      },
      success: {
        title: "Στάλθηκε σύνδεσμος επιβεβαίωσης",
        bodyPrefix: "Ελέγξτε το email ",
        bodyMid: ' και πατήστε «Επιβεβαίωση Ραντεβού». Ο σύνδεσμος λήγει σε ~5 λεπτά.',
        whenPrefix: "Ώρα ραντεβού: ",
      },
      bannerFallback: "Επιλέξτε μια ώρα από τα διαθέσιμα στα δεξιά.",
      dateLocale: "el-GR",
    };
  }, [locale]);

  // -------- state --------
  const [picked, setPicked] = useState(null); // { day, time, startISO, endISO, timezone }
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [whenText, setWhenText] = useState("");

  useEffect(() => {
    function onSlot(e) {
      const d = e.detail || {};
      setPicked({
        day: d.day,
        time: d.time,
        startISO: d.startISO,
        endISO: d.endISO,
        timezone: d.timezone || defaultTimezone,
      });
      setError("");
    }
    window.addEventListener("booking:slot", onSlot);
    return () => window.removeEventListener("booking:slot", onSlot);
  }, [defaultTimezone]);

  function isEmail(s = "") {
    return /\S+@\S+\.\S+/.test(s);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!studioId) return setError(t.missingStudio);
    if (!picked?.startISO || !picked?.endISO) return setError(t.pickFirst);

    const fd = new FormData(e.currentTarget);
    const firstName = fd.get("firstName")?.toString().trim();
    const lastName  = fd.get("lastName")?.toString().trim();
    const email     = fd.get("email")?.toString().trim();
    const phone     = fd.get("phone")?.toString().trim();
    const message   = fd.get("message")?.toString().trim() || "";
    const consent   = fd.get("consent");

    if (!firstName || !lastName || !email || !phone) return setError(t.requiredFields);
    if (!isEmail(email)) return setError(t.invalidEmail);
    if (!consent) return setError(t.acceptPrivacy);

    const payload = {
      studioId,
      startISO: picked.startISO,
      endISO: picked.endISO,
      firstName,
      lastName,
      email,
      phone,
      message,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409 || data?.reason === "slot_taken") {
          throw new Error(t.slotTaken);
        }
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setConfirmEmail(email);
      try {
        const dt = new Date(picked.startISO);
        setWhenText(
          dt.toLocaleString(t.dateLocale, {
            timeZone: picked.timezone || defaultTimezone,
            dateStyle: "medium",
            timeStyle: "short",
          })
        );
      } catch {}
      setSent(true);

      try { window.dispatchEvent(new Event("booking:reload")); } catch {}
    } catch (err) {
      setError(err?.message || t.sendFailed);
    } finally {
      setSubmitting(false);
    }
  }

  const Banner = (
    <div className="flex items-center justify-between">
      <div className="text-sm">
        {picked ? (
          <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 border border-gray-200">
            {t.selectedTimeBanner(picked.day, picked.time, picked.timezone || defaultTimezone)}
          </span>
        ) : (
          <span className="text-xs text-gray-600">{t.bannerFallback}</span>
        )}
      </div>
    </div>
  );

  const SuccessNote = sent && (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
      <div className="font-medium">{t.success.title}</div>
      <div className="mt-1">
        {t.success.bodyPrefix}
        <span className="font-semibold"> {confirmEmail}</span>
        {t.success.bodyMid}
        {whenText ? <div className="mt-1 text-emerald-700">{t.success.whenPrefix}{whenText}</div> : null}
      </div>
    </div>
  );

  const ErrorNote = error ? (
    <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
  ) : null;

  const Card = (
    <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 sm:p-6 w-full h-full text-gray-900">
      <form className="space-y-5 h-full flex flex-col" onSubmit={onSubmit}>
        {Banner}

        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder={t.form.firstName}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#1C86D1] focus:border-[#1C86D1]"
          />
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder={t.form.lastName}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#1C86D1] focus:border-[#1C86D1]"
          />
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t.form.email}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#1C86D1] focus:border-[#1C86D1]"
          />
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={t.form.phone}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#1C86D1] focus:border-[#1C86D1]"
          />
        </div>

        {/* Message */}
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t.form.message}
          className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#1C86D1] focus:border-[#1C86D1]"
        />

        {ErrorNote}
        {SuccessNote}

        {/* Privacy + Submit (hidden after success) */}
        {!sent && (
          <div className="mt-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <input type="checkbox" name="consent" value="yes" required className="h-4 w-4 accent-[#1C86D1]" />
              {t.privacy.labelPrefix}
              <a href="/privacy-policy" className="text-[#1C86D1] hover:underline">
                {t.privacy.linkText}
              </a>
            </label>

            <button
              type="submit"
              disabled={!picked || submitting}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-white text-sm font-medium transition
              ${!picked || submitting ? "bg-[#1C86D1]/60 cursor-not-allowed" : "bg-[#1C86D1] hover:bg-[#166da7]"}`}
            >
              {submitting ? t.sending : t.send}
              {!submitting && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Hidden (debugging only) */}
        <input type="hidden" name="day" value={picked?.day || ""} />
        <input type="hidden" name="time" value={picked?.time || ""} />
        <input type="hidden" name="timezone" value={picked?.timezone || defaultTimezone} />
      </form>
    </div>
  );

  if (embedded) return Card;
  return <div className="mx-auto w-full px-4 bg-white">{Card}</div>;
}

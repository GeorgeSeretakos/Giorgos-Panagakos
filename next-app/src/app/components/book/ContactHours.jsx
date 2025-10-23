"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Day order + keys in the JSON
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABELS = {
  en: {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
    hours: "Opening hours",
    contact: "Contact",
    closed: "Closed",
  },
  el: {
    mon: "Δευτέρα",
    tue: "Τρίτη",
    wed: "Τετάρτη",
    thu: "Πέμπτη",
    fri: "Παρασκευή",
    sat: "Σάββατο",
    sun: "Κυριακή",
    hours: "Ώρες λειτουργίας",
    contact: "Επικοινωνία",
    closed: "Κλειστά",
  },
};

function formatSlots(slots = [], locale = "en") {
  const t = DAY_LABELS[locale] || DAY_LABELS.en;
  if (!Array.isArray(slots) || slots.length === 0) return t.closed;
  // e.g. "08:00 – 13:00, 17:00 – 21:00"
  return slots.map((s) => `${s.start} – ${s.end}`).join(", ");
}

export default function ContactAndHours({ studio, locale = "en" }) {
  const t = DAY_LABELS[locale] || DAY_LABELS.en;
  const hours = studio?.openingHours; // JSON with mon..sun

  return (
    <section className="py-8">
      <div className="max-w-6xl px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">{t.contact}</h2>
          <ul className="space-y-3 text-gray-700">
            {studio.address && (
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>{studio.address}</span>
              </li>
            )}
            {studio.phone && (
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                <a href={`tel:${studio.phone}`} className="hover:underline">
                  {studio.phone}
                </a>
              </li>
            )}
            {studio.email && (
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                <a href={`mailto:${studio.email}`} className="hover:underline">
                  {studio.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Opening hours */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">{t.hours}</h2>

          {hours && typeof hours === "object" ? (
            <ul className="space-y-2 text-gray-700">
              {DAY_KEYS.map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="w-36 shrink-0">{t[k]}</span>
                  <span className="text-gray-800">{formatSlots(hours[k], locale)}</span>
                </li>
              ))}
            </ul>
          ) : (
            // Fallback: if no hours in DB, show all days as closed
            <ul className="space-y-2 text-gray-700">
              {DAY_KEYS.map((k) => (
                <li key={k} className="flex items-center gap-2 opacity-70">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="w-36 shrink-0">{t[k]}</span>
                  <span className="text-gray-800">{t.closed}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [locale, setLocale] = useState("el");

  // load saved language
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Contact Section */}
      <section className="flex-grow relative py-12 px-4 flex items-center bg-[#0E2A4C] text-white min-h-[calc(100vh-70px)]">
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* CONTACT LOCATIONS */}
            <div className="text-sm sm:text-base flex flex-col justify-center">

              {/* 1) Περιστέρι */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">
                  {locale === "en"
                    ? "Peristeri Offices (Attica)"
                    : "Γραφεία Περιστερίου Αττικής"}
                </h2>
                <p className="leading-relaxed">
                  {locale === "en"
                    ? "Pavlou Mela 45-47, inside shopping center"
                    : "Παύλου Μελά 45-47, Εντός εμπορικού κέντρου"}
                  <br />
                  <a
                    href="mailto:gsa.panagakos.law@gmail.com"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    gsa.panagakos.law@gmail.com
                  </a>
                  <br />
                  <a
                    href="tel:6981165818"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    6981165818
                  </a>
                  ,{" "}
                  <a
                    href="tel:2114120834"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    2114120834
                  </a>
                </p>
              </div>

              {/* 2) Πειραιάς */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">
                  {locale === "en" ? "Piraeus Offices" : "Γραφεία Πειραιά"}
                </h2>
                <p className="leading-relaxed">
                  {locale === "en"
                    ? "Alkiviadou 110–112, 1st floor (300m from Dimotiko Theatro station)"
                    : "Αλκιβιάδου 110-112, 18 532 1ος όροφος (300μ - σταθμό Δημ. Θέατρο)"}
                  <br />
                  {locale === "en"
                    ? 'Co-located with the notary office "Maria-Ioanna Kardasaki"'
                    : 'Συστεγαζόμενο με συμβολ. γραφείο «Μαρία-Ιωάννα Καρδασάκη»'}
                  <br />
                  <a
                    href="mailto:kardasakigram@gmail.com"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    kardasakigram@gmail.com
                  </a>
                  <br />
                  <a
                    href="tel:2104173270"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    210 4173270
                  </a>
                </p>
              </div>

              {/* 3) Κεντρικά Αθήνα */}
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {locale === "en"
                    ? "Head Offices (Athens)"
                    : "Κεντρικά Γραφεία (Αθήνα)"}
                </h2>
                <p className="leading-relaxed">
                  {locale === "en"
                    ? "Sokratous 79-81, near Omonoia"
                    : "Σωκράτους 79-81, πλησίον Ομονοίας"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-white/40 h-[80%] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

            {/* CONTACT FORM */}
            <div className="text-sm sm:text-base flex flex-col justify-center">
              <p className="mb-4 font-bold">
                {locale === "en"
                  ? "Fill in the form and we will contact you."
                  : "Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας."}
              </p>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/thank-you"
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />

                {/* Honeypot */}
                <p hidden>
                  <label>
                    {locale === "en" ? "Do not fill this:" : "Μην το συμπληρώσετε:"}{" "}
                    <input name="bot-field" />
                  </label>
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={locale === "en" ? "First Name" : "Όνομα"}
                    required
                    className="flex-1 p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={locale === "en" ? "Last Name" : "Επώνυμο"}
                    required
                    className="flex-1 p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={locale === "en" ? "Phone" : "Τηλέφωνο"}
                  required
                  className="w-full p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder={locale === "en" ? "Message" : "Μήνυμα"}
                  required
                  className="w-full p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      required
                      className="accent-white scale-110"
                    />
                    {locale === "en" ? "I accept the" : "Αποδέχομαι την"}{" "}
                    <a
                      href="/privacy-policy"
                      className="underline underline-offset-2 hover:opacity-90"
                    >
                      {locale === "en"
                        ? "Privacy Policy"
                        : "Πολιτική Απορρήτου"}
                    </a>
                  </label>

                  <button
                    type="submit"
                    className="bg-white text-[#0E2A4C] font-semibold px-6 py-2 rounded hover:opacity-90 transition"
                  >
                    {locale === "en" ? "Submit" : "Αποστολή"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM FOOTER */}
      <footer className="py-5 bg-[#0E2A4C] text-white border-t border-white/20 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-center">
          <p>
            {locale === "en"
              ? "© 2025 AGPA Law Office. All rights reserved."
              : "© 2025 AGPA Law Office. Όλα τα δικαιώματα διατηρούνται."}
          </p>
          <span className="hidden md:inline mx-2">·</span>
          <a
            href="/privacy-policy"
            className="underline underline-offset-2 hover:opacity-90"
          >
            {locale === "en" ? "Privacy Policy" : "Πολιτική Απορρήτου"}
          </a>
        </div>
      </footer>
    </main>
  );
}

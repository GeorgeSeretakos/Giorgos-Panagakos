// Footer.jsx
"use client";

export default function Footer() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Ενιαίο τμήμα Επικοινωνίας */}
      <section className="flex-grow relative py-12 px-4 flex items-center bg-[#0E2A4C] text-white min-h-[calc(100vh-70px)]">
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Πληροφορίες Επικοινωνίας */}
            <div className="text-sm sm:text-base flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">
                  Κεντρικά Γραφεία (Αθήνα)
                </h2>
                <p className="leading-relaxed">
                  Πειραιώς 4, Αθήνα, Ομόνοια
                  <br />
                  <a href="mailto:aggelopoulos.legal@gmail.com" className="underline underline-offset-2 hover:opacity-90">
                    aggelopoulos.legal@gmail.com
                  </a>
                  <br />
                  <a href="tel:6948941308" className="underline underline-offset-2 hover:opacity-90">6948941308</a>,{" "}
                  <a href="tel:2105236039" className="underline underline-offset-2 hover:opacity-90">2105236039</a>
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Γραφεία Περιστερίου Αττικής</h2>
                <p className="leading-relaxed">
                  Παύλου Μελά 45-47, Εντός εμπορικού κέντρου
                  <br />
                  <a href="mailto:gsa.panagakos.law@gmail.com" className="underline underline-offset-2 hover:opacity-90">
                    gsa.panagakos.law@gmail.com
                  </a>
                  <br />
                  <a href="tel:6981165818" className="underline underline-offset-2 hover:opacity-90">6981165818</a>,{" "}
                  <a href="tel:2114120834" className="underline underline-offset-2 hover:opacity-90">2114120834</a>
                </p>
              </div>
            </div>

            {/* Κάθετος Διαχωριστής */}
            <div className="hidden md:block w-px bg-white/40 h-[80%] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

            {/* Φόρμα Επικοινωνίας */}
            <div className="text-sm sm:text-base flex flex-col justify-center">
              <p className="mb-4 font-bold">Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας.</p>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/thank-you"
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />

                {/* Honeypot (must match data-netlify-honeypot) */}
                <p hidden>
                  <label>
                    Μην το συμπληρώσετε: <input name="bot-field" />
                  </label>
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="firstName"            // ✅ aligned
                    placeholder="Όνομα"
                    required
                    className="flex-1 p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                  />
                  <input
                    type="text"
                    name="lastName"             // ✅ aligned
                    placeholder="Επώνυμο"
                    required
                    className="flex-1 p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                  />
                </div>

                <input
                  type="email"
                  name="email"                  // ✅ aligned
                  placeholder="Email"
                  required
                  className="w-full p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                />

                <input
                  type="tel"
                  name="phone"                  // ✅ aligned
                  placeholder="Τηλέφωνο"
                  required
                  className="w-full p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                />

                <textarea
                  name="message"                // ✅ aligned
                  rows={5}
                  placeholder="Μήνυμα"
                  required
                  className="w-full p-2 rounded bg-white text-[#2F3E46] border border-white/30"
                />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" required className="accent-white scale-110" />
                    Αποδέχομαι την{" "}
                    <a href="/privacy-policy" className="underline underline-offset-2 hover:opacity-90">
                      Πολιτική Απορρήτου
                    </a>
                  </label>

                  <button type="submit" className="bg-white text-[#0E2A4C] font-semibold px-6 py-2 rounded hover:opacity-90 transition">
                    Αποστολή
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Κάτω Τμήμα Footer */}
      <footer className="py-5 bg-[#0E2A4C] text-white border-t border-white/20 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-center">
          <p>© 2025 AGPA Law Office. Όλα τα δικαιώματα διατηρούνται.</p>
          <span className="hidden md:inline mx-2">·</span>
          <a href="/privacy-policy" className="underline underline-offset-2 hover:opacity-90">
            Πολιτική Απορρήτου
          </a>
        </div>
      </footer>
    </main>
  );
}

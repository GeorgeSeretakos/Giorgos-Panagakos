"use client";

import { useEffect, useState } from "react";
import IntroSection from "../components/IntroSection";
import Navbar from "../components/Navbar";

const officeImages = [
  "/images/office/2.jpg",
  "/images/office/3.jpg",
  "/images/office/4.jpg",
  "/images/office/5.jpg",
  "/images/office/6.jpg",
];

export default function OfficePage() {
  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        <IntroSection
          image="/images/office/1.jpg"
          title={locale === "en" ? "The Office" : "Το Γραφείο"}
          paragraph={
            <>
              <p>
                {locale === "en" ? (
                  <>
                    The <strong>AGPA Law</strong> office is located in a modern,
                    functional, and elegant space designed to ensure professionalism,
                    discretion, and comfort throughout every collaboration.
                  </>
                ) : (
                  <>
                    Το δικηγορικό γραφείο <strong>AGPA Law</strong> εδρεύει σε έναν
                    σύγχρονο, λειτουργικό και καλαίσθητο χώρο, ο οποίος έχει σχεδιαστεί
                    ώστε να εξασφαλίζει επαγγελματισμό, διακριτικότητα και άνεση σε κάθε
                    συνεργασία.
                  </>
                )}
              </p>

              <p className="mt-6">
                {locale === "en" ? (
                  <>
                    The office environment reflects seriousness and calmness, providing
                    conditions that support effective legal work and confidential
                    communication with our clients. Access is convenient, and parking
                    space is available for visitors.
                  </>
                ) : (
                  <>
                    Το περιβάλλον του γραφείου αποπνέει σοβαρότητα και ηρεμία, παρέχοντας
                    συνθήκες που ευνοούν την αποτελεσματική νομική εργασία και την
                    εμπιστευτική επικοινωνία με τους εντολείς μας. Η πρόσβαση είναι
                    εύκολη, ενώ διατίθεται χώρος στάθμευσης για την εξυπηρέτηση των
                    επισκεπτών.
                  </>
                )}
              </p>

              <p className="mt-6">
                {locale === "en" ? (
                  <>
                    Every meeting is conducted with full respect for the client’s privacy
                    and needs, aiming to create an atmosphere of trust, safety, and
                    professional consistency.
                  </>
                ) : (
                  <>
                    Κάθε συνάντηση πραγματοποιείται με σεβασμό στην ιδιωτικότητα και στις
                    ανάγκες του πελάτη, στοχεύοντας πάντα στη δημιουργία ενός κλίματος
                    εμπιστοσύνης, ασφάλειας και επαγγελματικής συνέπειας.
                  </>
                )}
              </p>
            </>
          }
        />

        {/* Full-width images with spacing */}
        <div className="w-full overflow-hidden">
          {officeImages.map((src, index) => (
            <div
              key={index}
              className="w-full h-[38vh] md:h-[70vh] mb-10 md:mb-14 last:mb-0"
            >
              <img
                src={src}
                alt={
                  locale === "en"
                    ? `Office photo ${index + 1}`
                    : `Φωτογραφία γραφείου ${index + 1}`
                }
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

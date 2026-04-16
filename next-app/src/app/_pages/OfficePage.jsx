"use client";

import IntroSection from "../components/IntroSection";
import Navbar from "../components/Navbar";
import { useLocale } from "../lib/locale";

const officeImages = [
  "/images/office/1.jpg",
  "/images/office/2.jpg",
  "/images/office/3.jpg",
  "/images/office/4.jpg",
  "/images/office/5.jpg",
  "/images/office/6.jpg",
  "/images/office/7.jpg",
  "/images/office/8.jpg",
  "/images/office/9.jpg",
  "/images/office/10.jpg",
  "/images/office/11.jpg",
];

export default function OfficePage() {
  const locale = useLocale();

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        <IntroSection
          image="/images/office/8.jpg"
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

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
            {officeImages.map((src, index) => (
              <figure
                key={index}
                className="break-inside-avoid mb-4 md:mb-6 overflow-hidden rounded-lg"
              >
                <img
                  src={src}
                  alt={
                    locale === "en"
                      ? `Office photo ${index + 1}`
                      : `Φωτογραφία γραφείου ${index + 1}`
                  }
                  className="block w-full h-auto"
                />
              </figure>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import IntroSection from "./components/IntroSection";
import AboutSection from "./components/AboutSection";
import services from "/public/data/services";
import FeatureGrid from "./components/FeatureGrid";
import TestimonialsCarousel from "./components/TestimonialsCarousel";

export default function HomePage() {
  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  const isEn = locale === "en";

  return (
    <main>
      <IntroSection
        image="/images/general/8.jpg"
        hasDarkOverlay={true}
        tallImage={true}
        isStudioPage={false}
        imageClassName="object-cover object-center"
        title={
          <div className="text-white text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              AGPA Law Office
            </h1>
            {/*
            <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl font-medium text-white/90">
              {isEn
                ? "Specialisation in Enforcement and Banking Law"
                : "Εξειδίκευση στην Αναγκαστική Εκτέλεση & Τραπεζικό Δίκαιο"}
            </p>
            */}
          </div>
        }
        paragraph={
          <div className="text-gray-700 space-y-4">
            <p>
              {isEn ? (
                <>
                  We are a flexible team of lawyers with many years of
                  experience in enforcement law, providing services both at
                  advisory and out-of-court level, as well as before all courts
                  throughout Greece. Our primary goal is the advancement and
                  protection of our clients’ interests.
                </>
              ) : (
                <>
                  Αποτελούμαστε από ένα ευέλικτο σχήμα δικηγόρων με πολυετή
                  εμπειρία στον τομέα της αναγκαστικής εκτέλεσης και παρέχουμε
                  υπηρεσίες τόσο σε συμβουλευτικό – εξωδικαστικό επίπεδο, όσο
                  και ενώπιον όλων των Δικαστηρίων της επικράτειας. Βασικός μας
                  στόχος είναι η εξέλιξη και η ικανοποίηση των συμφερόντων των
                  πελατών μας.
                </>
              )}
            </p>
            <p>
              {isEn ? (
                <>
                  Our Office undertakes judicial and out-of-court
                  representation, representation before administrative
                  authorities and public services, handling of applications and
                  communications, incorporation, transformation and dissolution
                  of companies, as well as debt restructuring and the provision
                  of legal advice across a wide range of legal fields.
                </>
              ) : (
                <>
                  Το Γραφείο μας αναλαμβάνει τη δικαστική και εξωδικαστική
                  εκπροσώπηση, την εκπροσώπηση σε διοικητικές αρχές και
                  υπηρεσίες, τη διεκπεραίωση αιτημάτων και επικοινωνιών, τη
                  σύσταση, μετατροπή και λύση εταιρειών, καθώς και τη ρύθμιση
                  οφειλών και την παροχή νομικών συμβουλών σε ευρύ φάσμα
                  νομικών πεδίων.
                </>
              )}
            </p>
          </div>
        }
      />

      <FeatureGrid
        title={isEn ? "Services" : "Υπηρεσίες"}
        items={services}
        preview
      />

      <AboutSection
        title={
          isEn
            ? "About Georgios A. Panagakos"
            : "Σχετικά με τον Γεώργιο Α. Παναγάκο"
        }
        image="/images/people/panagakos_1.jpg"
        reverse={true}
        fullWidthTitle={false}
        description={
          isEn
            ? [
              "Mr <strong>Georgios A. Panagakos</strong> is an attorney in Athens with many years of experience in <em>Banking</em> and <em>Commercial Law</em>, as well as in <em>Enforcement Law</em>. He has developed extensive litigation and advisory activity in cases that require legal strategy, precision and close attention to detail.",
              "His objective is the <strong>substantive resolution of disputes</strong> through a realistic and effective approach, whether out of court or before the courts. He focuses on ongoing communication and on building a relationship of trust with every client.",
            ]
            : [
              "Ο <strong>Γεώργιος Α. Παναγάκος</strong> είναι δικηγόρος Αθηνών με πολυετή εμπειρία στο <em>Τραπεζικό</em> και το <em>Εμπορικό Δίκαιο</em>, καθώς και στο <em>Δίκαιο Αναγκαστικής Εκτέλεσης</em>. Έχει αναπτύξει εκτενή δικαστηριακή και συμβουλευτική δραστηριότητα σε υποθέσεις που απαιτούν νομική στρατηγική, ακρίβεια και προσήλωση στις λεπτομέρειες.",
              "Στόχος του είναι η <strong>ουσιαστική επίλυση διαφορών</strong> με ρεαλιστική και αποτελεσματική προσέγγιση, είτε σε εξωδικαστικό επίπεδο είτε ενώπιον των δικαστηρίων. Επικεντρώνεται στη συνεχή επικοινωνία και στην οικοδόμηση σχέσης εμπιστοσύνης με κάθε πελάτη.",
            ]
        }
        ticks={
          isEn
            ? [
              "Specialisation in Banking and Commercial Law",
              "Strategic handling of Enforcement Law cases",
              "Personalised legal guidance",
            ]
            : [
              "Εξειδίκευση στο Τραπεζικό και Εμπορικό Δίκαιο",
              "Στρατηγικός χειρισμός υποθέσεων Αναγκαστικής Εκτέλεσης",
              "Προσωποποιημένη νομική καθοδήγηση",
            ]
        }
        ctaText={isEn ? "Learn more" : "Μάθετε περισσότερα"}
        ctaLink="/about"
      />

      <TestimonialsCarousel locale={locale} />
    </main>
  );
}

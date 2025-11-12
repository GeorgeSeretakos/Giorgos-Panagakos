"use client";

import IntroSection from "./components/IntroSection";
import AboutSection from "./components/AboutSection";
import services from "/public/data/services";
import FeatureGrid from "./components/FeatureGrid";
import TestimonialsCarousel from "./components/TestimonialsCarousel";

export default function HomePage() {
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
            {/*<p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl font-medium text-white/90">*/}
            {/*  Εξειδίκευση στην Αναγκαστική Εκτέλεση &amp; Τραπεζικό Δίκαιο*/}
            {/*</p>*/}
          </div>
        }
        paragraph={
          <div className="text-gray-700 space-y-4">
            <p>
              Αποτελούμαστε από ένα ευέλικτο σχήμα δικηγόρων με πολυετή εμπειρία
              στον τομέα της αναγκαστικής εκτέλεσης και παρέχουμε υπηρεσίες τόσο
              σε συμβουλευτικό – εξωδικαστικό επίπεδο, όσο και ενώπιον όλων των
              Δικαστηρίων της επικράτειας. Βασικός μας στόχος είναι η εξέλιξη και
              η ικανοποίηση των συμφερόντων των πελατών μας.
            </p>
            <p>
              Το Γραφείο μας αναλαμβάνει τη δικαστική και εξωδικαστική εκπροσώπηση,
              την εκπροσώπηση σε διοικητικές αρχές και υπηρεσίες, τη διεκπεραίωση
              αιτημάτων και επικοινωνιών, τη σύσταση, μετατροπή και λύση εταιρειών,
              καθώς και τη ρύθμιση οφειλών και την παροχή νομικών συμβουλών σε ευρύ
              φάσμα νομικών πεδίων.
            </p>
          </div>
        }
      />

      <FeatureGrid title="Υπηρεσίες" items={services} preview />

      <AboutSection
        title="Σχετικά με τον Γεώργιο Α. Παναγάκο"
        image="/images/people/panagakos_1.jpg"
        reverse={true}
        fullWidthTitle={false}
        description={[
          "Ο <strong>Γεώργιος Α. Παναγάκος</strong> είναι δικηγόρος Αθηνών με πολυετή εμπειρία στο <em>Τραπεζικό</em> και το <em>Εμπορικό Δίκαιο</em>, καθώς και στο <em>Δίκαιο Αναγκαστικής Εκτέλεσης</em>. Έχει αναπτύξει εκτενή δικαστηριακή και συμβουλευτική δραστηριότητα σε υποθέσεις που απαιτούν νομική στρατηγική, ακρίβεια και προσήλωση στις λεπτομέρειες.",
          "Στόχος του είναι η <strong>ουσιαστική επίλυση διαφορών</strong> με ρεαλιστική και αποτελεσματική προσέγγιση, είτε σε εξωδικαστικό επίπεδο είτε ενώπιον των δικαστηρίων. Επικεντρώνεται στη συνεχή επικοινωνία και στην οικοδόμηση σχέσης εμπιστοσύνης με κάθε πελάτη.",
        ]}
        ticks={[
          "Εξειδίκευση στο Τραπεζικό και Εμπορικό Δίκαιο",
          "Στρατηγικός χειρισμός υποθέσεων Αναγκαστικής Εκτέλεσης",
          "Προσωποποιημένη νομική καθοδήγηση",
        ]}
        ctaText="Μάθετε περισσότερα"
        ctaLink="/about"
      />

      <TestimonialsCarousel />

    </main>
  );
}

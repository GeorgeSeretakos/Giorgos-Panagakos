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
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        <IntroSection
          image="/images/office/1.jpg"
          title="Το Γραφείο"
          paragraph={
            <>
              <p>
                Το δικηγορικό γραφείο <strong>AGPA Law</strong> εδρεύει σε έναν σύγχρονο,
                λειτουργικό και καλαίσθητο χώρο, ο οποίος έχει σχεδιαστεί ώστε να
                εξασφαλίζει επαγγελματισμό, διακριτικότητα και άνεση σε κάθε συνεργασία.
              </p>

              <p className="mt-6">
                Το περιβάλλον του γραφείου αποπνέει σοβαρότητα και ηρεμία, παρέχοντας
                συνθήκες που ευνοούν την αποτελεσματική νομική εργασία και την
                εμπιστευτική επικοινωνία με τους εντολείς μας. Η πρόσβαση είναι εύκολη,
                ενώ διατίθεται χώρος στάθμευσης για την εξυπηρέτηση των επισκεπτών.
              </p>

              <p className="mt-6">
                Κάθε συνάντηση πραγματοποιείται με σεβασμό στην ιδιωτικότητα και στις
                ανάγκες του πελάτη, στοχεύοντας πάντα στη δημιουργία ενός κλίματος
                εμπιστοσύνης, ασφάλειας και επαγγελματικής συνέπειας.
              </p>
            </>
          }
        />

        {/* Πλήρους πλάτους συλλογή εικόνων με αυξημένο κενό μεταξύ τους */}
        <div className="w-full overflow-hidden">
          {officeImages.map((src, index) => (
            <div
              key={index}
              className="w-full h-[38vh] md:h-[70vh] mb-10 md:mb-14 last:mb-0"
            >
              <img
                src={src}
                alt={`Φωτογραφία γραφείου ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

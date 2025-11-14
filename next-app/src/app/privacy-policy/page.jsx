"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
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
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-bold">
        {isEn ? "Privacy Policy" : "Πολιτική Απορρήτου"}
      </h1>

      <p className="mt-4">
        {isEn ? (
          <>
            Protecting your personal data is important to us. This Privacy Policy
            explains how we collect, use and protect the data you provide to us
            through the contact form on our website.
          </>
        ) : (
          <>
            Η προστασία των προσωπικών σας δεδομένων είναι σημαντική για εμάς. Η
            παρούσα Πολιτική Απορρήτου εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και
            προστατεύουμε τα δεδομένα που μας παρέχετε μέσω της φόρμας
            επικοινωνίας στην ιστοσελίδα μας.
          </>
        )}
      </p>

      <ol className="mt-8 space-y-6 list-decimal pl-6">
        {/* 1. Ποια δεδομένα συλλέγουμε */}
        <li>
          <h2 className="font-semibold">
            {isEn ? "What data we collect" : "Ποια δεδομένα συλλέγουμε"}
          </h2>
          <p className="mt-2">
            {isEn
              ? "Through the contact form, we collect the following information:"
              : "Μέσω της φόρμας επικοινωνίας, συλλέγουμε τα παρακάτω στοιχεία:"}
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              {isEn
                ? "Full name (first and last name)"
                : "Ονοματεπώνυμο (Όνομα & Επώνυμο)"}
            </li>
            <li>
              {isEn
                ? "Email address"
                : "Διεύθυνση ηλεκτρονικού ταχυδρομείου (email)"}
            </li>
            <li>{isEn ? "Telephone number" : "Τηλέφωνο"}</li>
            <li>
              {isEn
                ? "The content of your message"
                : "Το περιεχόμενο του μηνύματός σας"}
            </li>
          </ul>
        </li>

        {/* 2. Σκοπός επεξεργασίας */}
        <li>
          <h2 className="font-semibold">
            {isEn ? "Purpose of processing" : "Σκοπός επεξεργασίας"}
          </h2>
          <p className="mt-2">
            {isEn ? (
              <>
                The data you submit is used solely to respond to your request or
                question. It is not used for advertising purposes and is not
                disclosed to third parties without your explicit consent.
              </>
            ) : (
              <>
                Τα δεδομένα που υποβάλλετε χρησιμοποιούνται αποκλειστικά για να
                απαντήσουμε στο αίτημα ή την ερώτησή σας. Δεν χρησιμοποιούνται
                για διαφημιστικούς σκοπούς και δεν διαβιβάζονται σε τρίτους
                χωρίς τη ρητή συγκατάθεσή σας.
              </>
            )}
          </p>
        </li>

        {/* 3. Νομική βάση */}
        <li>
          <h2 className="font-semibold">
            {isEn ? "Legal basis for processing" : "Νομική βάση επεξεργασίας"}
          </h2>
          <p className="mt-2">
            {isEn ? "The processing is based on:" : "Η επεξεργασία βασίζεται:"}
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              {isEn ? (
                <>
                  your consent when you submit the contact form; and/or
                </>
              ) : (
                <>στη συγκατάθεσή σας όταν υποβάλλετε την φόρμα επικοινωνίας, και/ή</>
              )}
            </li>
            <li>
              {isEn
                ? "our legitimate interest in responding to your queries"
                : "στο έννομο συμφέρον μας να απαντήσουμε στα ερωτήματά σας"}
            </li>
          </ul>
        </li>

        {/* 4. Διάρκεια διατήρησης */}
        <li>
          <h2 className="font-semibold">
            {isEn ? "Data retention period" : "Διάρκεια διατήρησης"}
          </h2>
          <p className="mt-2">
            {isEn ? (
              <>
                Personal data is kept only for as long as necessary to serve the
                purpose of communication and is then securely deleted.
              </>
            ) : (
              <>
                Τα προσωπικά δεδομένα διατηρούνται μόνο για όσο χρόνο απαιτείται
                για την εξυπηρέτηση του σκοπού επικοινωνίας και στη συνέχεια
                διαγράφονται με ασφάλεια.
              </>
            )}
          </p>
        </li>

        {/* 5. Δικαιώματα */}
        <li>
          <h2 className="font-semibold">
            {isEn ? "Your rights" : "Τα δικαιώματά σας"}
          </h2>
          <p className="mt-2">
            {isEn ? (
              <>
                Under the General Data Protection Regulation (GDPR), you have
                the following rights:
              </>
            ) : (
              <>
                Σύμφωνα με τον Γενικό Κανονισμό για την Προστασία Δεδομένων
                (GDPR), έχετε τα εξής δικαιώματα:
              </>
            )}
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              {isEn
                ? "Right of access to your personal data"
                : "Δικαίωμα πρόσβασης στα προσωπικά σας δεδομένα"}
            </li>
            <li>
              {isEn
                ? "Right to rectification of inaccurate data"
                : "Δικαίωμα διόρθωσης ανακριβών δεδομένων"}
            </li>
            <li>
              {isEn
                ? 'Right to erasure of your data ("right to be forgotten")'
                : 'Δικαίωμα διαγραφής των δεδομένων σας ("δικαίωμα στη λήθη")'}
            </li>
            <li>
              {isEn
                ? "Right to restriction of processing"
                : "Δικαίωμα περιορισμού της επεξεργασίας"}
            </li>
            <li>
              {isEn
                ? "Right to object to processing"
                : "Δικαίωμα εναντίωσης στην επεξεργασία"}
            </li>
            <li>
              {isEn ? (
                <>
                  Right to lodge a complaint with the Hellenic Data Protection
                  Authority
                </>
              ) : (
                <>
                  Δικαίωμα υποβολής καταγγελίας στην Αρχή Προστασίας Δεδομένων
                  Προσωπικού Χαρακτήρα
                </>
              )}
            </li>
          </ul>
        </li>

        {/* 6. Google Maps */}
        <li>
          <h2 className="font-semibold">
            {isEn
              ? "Embedded Map (Google Maps)"
              : "Ενσωματωμένος Χάρτης (Google Maps)"}
          </h2>
          <p className="mt-2">
            {isEn ? (
              <>
                Our website includes an embedded map from the Google Maps
                service to better present our location. Google may collect usage
                data or store cookies when you interact with the map (e.g. when
                you zoom in or move the map). For more information, please refer
                to Google’s Privacy Policy.
              </>
            ) : (
              <>
                Η ιστοσελίδα περιλαμβάνει ενσωματωμένο χάρτη από την υπηρεσία
                Google Maps για την καλύτερη παρουσίαση της τοποθεσίας μας. Η
                Google ενδέχεται να συλλέγει δεδομένα χρήσης ή να αποθηκεύει
                cookies όταν αλληλεπιδράτε με τον χάρτη (π.χ. όταν κάνετε ζουμ
                ή μετακινείτε τον χάρτη). Για περισσότερες πληροφορίες,
                παρακαλούμε δείτε την Πολιτική Απορρήτου της Google.
              </>
            )}
          </p>
        </li>

        {/* 7. Επικοινωνία */}
        <li>
          <h2 className="font-semibold">
            {isEn
              ? "Contact for privacy matters"
              : "Επικοινωνία για θέματα απορρήτου"}
          </h2>
          <p className="mt-2">
            {isEn ? (
              <>
                For any request regarding the processing of your personal data,
                you may contact us at{" "}
              </>
            ) : (
              <>
                Για οποιοδήποτε αίτημα σχετικά με την επεξεργασία των
                προσωπικών σας δεδομένων, μπορείτε να επικοινωνήσετε μαζί μας στο{" "}
              </>
            )}
            <a
              href="mailto:gsapanagakoslaw@gmail.com"
              className="underline"
            >
              gsapanagakoslaw@gmail.com
            </a>
            .
          </p>
        </li>

        {/* 8. Ασφάλεια */}
        <li>
          <h2 className="font-semibold">
            {isEn ? "Data security" : "Ασφάλεια δεδομένων"}
          </h2>
          <p className="mt-2">
            {isEn ? (
              <>
                We take appropriate technical and organizational measures to
                protect your personal data from unauthorized access, loss or
                alteration.
              </>
            ) : (
              <>
                Λαμβάνουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την
                προστασία των προσωπικών σας δεδομένων από μη εξουσιοδοτημένη
                πρόσβαση, απώλεια ή αλλοίωση.
              </>
            )}
          </p>
        </li>

        {/* 9. Πνευματικά δικαιώματα & πηγές */}
        <li>
          <h2 className="font-semibold">
            {isEn
              ? "Copyright and media sources"
              : "Πνευματικά δικαιώματα και πηγές πολυμέσων"}
          </h2>
          <p className="mt-2">
            {isEn ? (
              <>
                Our website uses photos from{" "}
                <a
                  href="https://www.pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Pexels
                </a>{" "}
                and{" "}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Unsplash
                </a>
                , as well as icons from{" "}
                <a
                  href="https://www.freepik.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Freepik
                </a>
                . All of the above sources belong to the free versions of the
                respective websites and are used in accordance with their terms
                of use and licences.
              </>
            ) : (
              <>
                Στην ιστοσελίδα έχουν χρησιμοποιηθεί φωτογραφίες από τις
                πλατφόρμες{" "}
                <a
                  href="https://www.pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Pexels
                </a>{" "}
                και{" "}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Unsplash
                </a>
                , καθώς και εικονίδια από το{" "}
                <a
                  href="https://www.freepik.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Freepik
                </a>
                . Όλες οι παραπάνω πηγές ανήκουν στις δωρεάν εκδόσεις των
                αντίστοιχων ιστοσελίδων και χρησιμοποιούνται σύμφωνα με τους
                όρους χρήσης και τις άδειες που αυτές παρέχουν.
              </>
            )}
          </p>
        </li>
      </ol>
    </section>
  );
}

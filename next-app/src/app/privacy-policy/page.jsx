// app/privacy-policy/PrivacyPolicyContent.jsx
"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicyContent() {
  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("locale") || "el" : "el";
    setLocale(saved);
  }, []);

  const isEN = locale === "en";
  const effectiveDate = isEN ? "6 November 2025" : "6 Νοεμβρίου 2025";

  // Helper to render bullet lists inside JSX without repeating markup
  const Li = ({ children }) => <li className="mt-1">{children}</li>;

  const t = {
    title: isEN ? "Privacy Policy & Terms of Use" : "Πολιτική Απορρήτου & Όροι Χρήσης",
    effDate: isEN ? "Effective date" : "Ημερομηνία ισχύος",
    intro: isEN
      ? "We care about the protection of your personal data and the transparent use of our website and booking services. This page explains what data we process, for what purposes and legal bases, how long we keep it, who receives it, and what your rights are under the GDPR."
      : "Μας ενδιαφέρει η προστασία των προσωπικών σας δεδομένων και η διαφανής χρήση της ιστοσελίδας και των υπηρεσιών κρατήσεων. Σε αυτή τη σελίδα εξηγούμε ποια δεδομένα επεξεργαζόμαστε, για ποιους σκοπούς και με ποιες νομικές βάσεις, για πόσο χρόνο τα τηρούμε, σε ποιους διαβιβάζονται και ποια είναι τα δικαιώματά σας βάσει GDPR.",
    toc: isEN ? "Contents" : "Περιεχόμενα",

    // Headings
    privacy: isEN ? "Privacy Policy" : "Πολιτική Απορρήτου",
    roles: isEN ? "Who is the Controller / Processor" : "Ποιος είναι Υπεύθυνος Επεξεργασίας / Εκτελών",
    controller: isEN ? "Controller & Contact Details" : "Υπεύθυνος Επεξεργασίας & Στοιχεία Επικοινωνίας",
    collected: isEN ? "What data we process (by feature)" : "Ποια δεδομένα επεξεργαζόμαστε (ανά λειτουργία)",
    forms: isEN ? "Contact & Booking Forms" : "Φόρμες Επικοινωνίας & Κράτησης",
    calendar: isEN ? "Google Calendar Connection (Studios)" : "Σύνδεση Google Calendar (Στούντιο)",
    geolocation: isEN ? "Nearby / Geolocation" : "Κοντινά / Γεωεντοπισμός",
    logs: isEN ? "Technical & Security Logs" : "Τεχνικά & Αρχεία Ασφαλείας",
    purposes: isEN ? "Purposes & Legal Bases" : "Σκοποί & Νομικές Βάσεις",
    recipients: isEN ? "Recipients / Processors" : "Αποδέκτες / Εκτελούντες",
    transfers: isEN ? "International transfers outside the EEA" : "Διεθνείς διαβιβάσεις εκτός ΕΟΧ",
    retention: isEN ? "Retention periods" : "Χρόνοι διατήρησης",
    storage: isEN ? "Cookies, Local & Session Storage" : "Cookies, Local & Session Storage",
    embeds: isEN ? "Embedded content (YouTube, Google Maps)" : "Ενσωματωμένο περιεχόμενο (YouTube, Google Maps)",
    security: isEN ? "Security Measures" : "Μέτρα Ασφάλειας",
    rights: isEN ? "Your GDPR Rights" : "Τα Δικαιώματά σας (GDPR)",
    complaints: isEN ? "Supervisory Authority & Complaints" : "Αρχή Προστασίας Δεδομένων & Καταγγελίες",
    minors: isEN ? "Minors" : "Ανήλικοι",
    contactPrivacy: isEN ? "Contact for privacy matters" : "Επικοινωνία για θέματα απορρήτου",
    changes: isEN ? "Changes to this Policy" : "Αλλαγές στην Πολιτική",

    // Terms
    terms: isEN ? "Terms & Conditions of Use" : "Όροι & Προϋποθέσεις Χρήσης",
    accept: isEN ? "Acceptance" : "Αποδοχή όρων",
    ip: isEN ? "Intellectual property" : "Πνευματική ιδιοκτησία",
    thirdLic: isEN ? "Third-party content – Credits & Licenses" : "Περιεχόμενο τρίτων – Credits & Άδειες",
    acceptableUse: isEN ? "Acceptable use" : "Αποδεκτή χρήση",
    links: isEN ? "Third-party links" : "Σύνδεσμοι τρίτων",
    medical: isEN ? "Medical/Professional disclaimer" : "Ιατρική/Επαγγελματική αποποίηση",
    liability: isEN ? "Limitation of liability" : "Περιορισμός ευθύνης",
    changesTerms: isEN ? "Changes" : "Τροποποιήσεις",
    law: isEN ? "Governing law & jurisdiction" : "Εφαρμοστέο δίκαιο & δικαιοδοσία",

    // Bodies – controller
    controllerBody: isEN ? (
      <>
        The data controller is <strong>FF Medical & Wellness</strong>.
        <ul>
          <Li>Address: Iroon Polytechneiou 5, Nea Erythraia, 146 71, Greece</Li>
          <Li>
            Email: <a href="mailto:ffmedicwell@gmail.com">ffmedicwell@gmail.com</a>
          </Li>
          <Li>
            Phone: <a href="tel:2108070010">210 8070010</a>
          </Li>
        </ul>
      </>
    ) : (
      <>
        Υπεύθυνος επεξεργασίας είναι η <strong>FF Medical & Wellness</strong>.
        <ul>
          <Li>Διεύθυνση: Ηρώων Πολυτεχνείου 5, Νέα Ερυθραία, 146 71, Ελλάδα</Li>
          <Li>
            Email: <a href="mailto:ffmedicwell@gmail.com">ffmedicwell@gmail.com</a>
          </Li>
          <Li>
            Τηλέφωνο: <a href="tel:2108070010">210 8070010</a>
          </Li>
        </ul>
      </>
    ),

    rolesBody: isEN ? (
      <>
        <p className="mb-2">
          For website visitors and individuals submitting forms, <strong>FF Medical & Wellness</strong> acts as the{" "}
          <strong>Controller</strong>.
        </p>
        <p>
          For studios that connect their Google Calendar to enable booking, we act as a{" "}
          <strong>Processor</strong> on behalf of that studio with respect to the calendar data accessed via OAuth
          (availability windows, busy periods, and booking events). The studio remains the <strong>Controller</strong> of
          its Google Calendar data.
        </p>
      </>
    ) : (
      <>
        <p className="mb-2">
          Για τους επισκέπτες του ιστότοπου και τα άτομα που υποβάλλουν φόρμες, η <strong>FF Medical & Wellness</strong>{" "}
          λειτουργεί ως <strong>Υπεύθυνος Επεξεργασίας</strong>.
        </p>
        <p>
          Για τα στούντιο που συνδέουν το Google Calendar για κρατήσεις, ενεργούμε ως <strong>Εκτελών την Επεξεργασία</strong>{" "}
          για λογαριασμό του στούντιο ως προς τα δεδομένα ημερολογίου που προσπελαύνονται μέσω OAuth (παράθυρα διαθεσιμότητας,
          δεσμεύσεις/απασχολήσεις και γεγονότα κρατήσεων). Το στούντιο παραμένει <strong>Υπεύθυνος Επεξεργασίας</strong> των
          δεδομένων Google Calendar του.
        </p>
      </>
    ),

    // Collected data — features
    formsBody: isEN ? (
      <>
        <p className="mb-2">
          We process contact or booking details that you submit in our forms (e.g., first name, last name, email, phone,
          free-text message). Required fields are marked in the form UI. We ask you <strong>not</strong> to include
          special-category data (e.g., health) unless strictly necessary.
        </p>
        <p>
          For booking confirmation, we also process the <strong>time slot</strong> you select and your acknowledgement of
          our Privacy Policy (consent checkbox).
        </p>
      </>
    ) : (
      <>
        <p className="mb-2">
          Επεξεργαζόμαστε στοιχεία επικοινωνίας/κράτησης που υποβάλλετε στις φόρμες μας (π.χ. όνομα, επώνυμο, email,
          τηλέφωνο, ελεύθερο κείμενο). Τα υποχρεωτικά πεδία επισημαίνονται στη φόρμα. Σας ζητούμε να <strong>μην</strong>{" "}
          περιλαμβάνετε <em>ευαίσθητα</em> δεδομένα (π.χ. υγείας) εκτός αν είναι απολύτως απαραίτητα.
        </p>
        <p>
          Για την επιβεβαίωση κράτησης, επεξεργαζόμαστε επίσης την <strong>ώρα</strong> που επιλέγετε και την αποδοχή της
          Πολιτικής Απορρήτου (checkbox συγκατάθεσης).
        </p>
      </>
    ),

    calendarBody: isEN ? (
      <>
        <p className="mb-2">
          Studios may connect a Google account via OAuth. During this flow we request the following scopes from Google:
        </p>
        <ul className="list-disc pl-6">
          <Li>
            <code>https://www.googleapis.com/auth/calendar.readonly</code> (read availability windows & calendar metadata)
          </Li>
          <Li>
            <code>https://www.googleapis.com/auth/calendar.events</code> (read busy/free periods and create/manage booking
            events)
          </Li>
          <Li>
            <code>openid</code> &amp; <code>https://www.googleapis.com/auth/userinfo.email</code> (to verify the account
            email matches the studio’s email)
          </Li>
        </ul>
        <p className="mt-2">
          What we store for the studio connection: <strong>access token</strong> (short-lived),{" "}
          <strong>refresh token</strong> (long-lived), <strong>token expiry</strong>, <strong>granted scopes</strong>, and the
          chosen <strong>calendar identifier</strong> (by default the studio email). Tokens are used solely to compute
          availability and (where applicable) create booking events; they are secured and never shared with third parties.
          The studio may revoke access at any time in their Google Account settings.
        </p>
      </>
    ) : (
      <>
        <p className="mb-2">
          Τα στούντιο μπορούν να συνδέσουν λογαριασμό Google μέσω OAuth. Κατά τη ροή ζητάμε τα παρακάτω scopes:
        </p>
        <ul className="list-disc pl-6">
          <Li>
            <code>https://www.googleapis.com/auth/calendar.readonly</code> (ανάγνωση παραθύρων διαθεσιμότητας & μεταδεδομένων)
          </Li>
          <Li>
            <code>https://www.googleapis.com/auth/calendar.events</code> (ανάγνωση απασχολήσεων/διαθεσιμότητας και δημιουργία/
            διαχείριση γεγονότων κρατήσεων)
          </Li>
          <Li>
            <code>openid</code> &amp; <code>https://www.googleapis.com/auth/userinfo.email</code> (επιβεβαίωση ότι το email
            του λογαριασμού ταιριάζει με το email του στούντιο)
          </Li>
        </ul>
        <p className="mt-2">
          Τι αποθηκεύουμε για τη σύνδεση: <strong>access token</strong> (βραχύβιο), <strong>refresh token</strong>{" "}
          (μακράς διάρκειας), <strong>λήξη token</strong>, <strong>παραχωρημένα scopes</strong> και τον επιλεγμένο{" "}
          <strong>αναγνωριστικό ημερολογίου</strong> (προεπιλογή το email του στούντιο). Τα tokens χρησιμοποιούνται
          αποκλειστικά για τον υπολογισμό διαθεσιμότητας και (όπου εφαρμόζεται) για δημιουργία γεγονότων κράτησης·
          προστατεύονται και δεν κοινοποιούνται σε τρίτους. Το στούντιο μπορεί να ανακαλέσει την πρόσβαση ανά πάσα στιγμή
          από τις ρυθμίσεις λογαριασμού Google.
        </p>
      </>
    ),

    geolocationBody: isEN ? (
      <>
        <p className="mb-2">
          If you choose to use the <strong>Nearby</strong> feature, your browser may prompt you to share approximate location
          (HTML5 Geolocation). This is <strong>optional</strong>. If you allow it, we use coordinates only to display
          nearby studios and <strong>do not store</strong> your location on our servers. You can disable location access at
          any time via your browser or device settings.
        </p>
      </>
    ) : (
      <>
        <p className="mb-2">
          Αν επιλέξετε τη λειτουργία <strong>Κοντινά</strong>, ο φυλλομετρητής μπορεί να ζητήσει κοινή χρήση κατά προσέγγιση
          τοποθεσίας (HTML5 Geolocation). Η λειτουργία είναι <strong>προαιρετική</strong>. Αν επιτρέψετε, τα συντεταγμένα
          χρησιμοποιούνται μόνο για εμφάνιση κοντινών στούντιο και <strong>δεν αποθηκεύονται</strong> στους διακομιστές μας.
          Μπορείτε να απενεργοποιήσετε την πρόσβαση στην τοποθεσία από τις ρυθμίσεις του φυλλομετρητή/συσκευής σας.
        </p>
      </>
    ),

    logsBody: isEN ? (
      <>
        <p className="mb-2">
          For security and troubleshooting we keep minimal technical logs (e.g., timestamps, request metadata, error stack
          traces, anonymized/hashed identifiers). IP addresses may appear transiently in server access logs for
          anti-abuse/security. We do not build profiles from logs.
        </p>
      </>
    ) : (
      <>
        <p className="mb-2">
          Για λόγους ασφάλειας και αποσφαλμάτωσης διατηρούμε ελάχιστα τεχνικά αρχεία (π.χ. χρονικές σημάνσεις, μεταδεδομένα
          αιτημάτων, traces σφαλμάτων, ανωνυμοποιημένα/hashed αναγνωριστικά). Διευθύνσεις IP ενδέχεται να εμφανίζονται
          παροδικά στα server access logs για ασφάλεια/αντι-κατάχρηση. Δεν δημιουργούμε προφίλ από αυτά.
        </p>
      </>
    ),

    purposesBody: isEN ? (
      <>
        <ul className="list-disc pl-6">
          <Li>
            <strong>Responding to enquiries / booking requests</strong> via our forms and sending confirmations or reminders
            (Art. 6(1)(b) GDPR – pre-contractual steps; Art. 6(1)(f) GDPR – legitimate interests).
          </Li>
          <Li>
            <strong>Providing the studio booking functionality</strong>, including computing availability and creating
            calendar events for confirmed bookings (Art. 6(1)(b) GDPR with the studio; for visitors, Art. 6(1)(b)/(f)).
          </Li>
          <Li>
            <strong>Consent-based communications</strong> (e.g., newsletter) where you opt-in (Art. 6(1)(a) GDPR).
          </Li>
          <Li>
            <strong>Security & fraud prevention</strong>, debugging and service continuity (Art. 6(1)(f) GDPR).
          </Li>
          <Li>
            <strong>Compliance with legal obligations</strong> (Art. 6(1)(c) GDPR).
          </Li>
        </ul>
      </>
    ) : (
      <>
        <ul className="list-disc pl-6">
          <Li>
            <strong>Ανταπόκριση σε αιτήματα / κρατήσεις</strong> μέσω φορμών και αποστολή επιβεβαιώσεων ή υπενθυμίσεων (άρθ.
            6(1)(b) GDPR – προσυμβατικά βήματα· άρθ. 6(1)(f) – έννομο συμφέρον).
          </Li>
          <Li>
            <strong>Παροχή λειτουργίας κρατήσεων</strong>, περιλαμβανομένου υπολογισμού διαθεσιμότητας και δημιουργίας
            γεγονότων ημερολογίου για επιβεβαιωμένες κρατήσεις (άρθ. 6(1)(b) GDPR με το στούντιο· για επισκέπτες, 6(1)(b)/(f)).
          </Li>
          <Li>
            <strong>Επικοινωνία βάσει συγκατάθεσης</strong> (π.χ. newsletter) όπου επιλέγετε (άρθ. 6(1)(a) GDPR).
          </Li>
          <Li>
            <strong>Ασφάλεια & αποτροπή κατάχρησης</strong>, αποσφαλμάτωση και συνέχεια υπηρεσίας (άρθ. 6(1)(f) GDPR).
          </Li>
          <Li>
            <strong>Συμμόρφωση με νομικές υποχρεώσεις</strong> (άρθ. 6(1)(c) GDPR).
          </Li>
        </ul>
      </>
    ),

    recipientsBody: isEN ? (
      <>
        <p className="mb-2">We use carefully selected processors under Art. 28 GDPR, including:</p>
        <ul className="list-disc pl-6">
          <Li>
            <strong>Hosting/CDN</strong> (e.g., Netlify or equivalent) for site delivery and security.
          </Li>
          <Li>
            <strong>Email & transactional delivery</strong> for sending confirmations and operational messages.
          </Li>
          <Li>
            <strong>Google LLC</strong> – Google Calendar (for studios), Maps (embeds), and related Google services strictly
            limited to the scopes you approve during OAuth.
          </Li>
        </ul>
        <p className="mt-2">
          Processors act only on our instructions. We do not sell your data or share it with third-party advertisers.
        </p>
      </>
    ) : (
      <>
        <p className="mb-2">Χρησιμοποιούμε επιλεγμένους εκτελούντες βάσει άρθ. 28 GDPR, όπως:</p>
        <ul className="list-disc pl-6">
          <Li>
            <strong>Φιλοξενία/CDN</strong> (π.χ. Netlify ή ισοδύναμο) για παράδοση ιστότοπου και ασφάλεια.
          </Li>
          <Li>
            <strong>Υπηρεσίες email</strong> για αποστολή επιβεβαιώσεων και λειτουργικών μηνυμάτων.
          </Li>
          <Li>
            <strong>Google LLC</strong> – Google Calendar (για στούντιο), Maps (embeds) και συναφείς υπηρεσίες Google,
            αυστηρά εντός των scopes που εγκρίνετε στο OAuth.
          </Li>
        </ul>
        <p className="mt-2">
          Οι εκτελούντες ενεργούν μόνο κατ’ εντολή μας. Δεν πωλούμε τα δεδομένα σας ούτε τα κοινοποιούμε σε διαφημιστικές
          πλατφόρμες τρίτων.
        </p>
      </>
    ),

    transfersBody: isEN
      ? "Some providers are located outside the EEA (e.g., the United States). Where data is transferred internationally, we rely on Standard Contractual Clauses (SCCs) or other lawful transfer mechanisms under EU law, together with supplementary measures, as appropriate."
      : "Ορισμένοι πάροχοι βρίσκονται εκτός ΕΟΧ (π.χ. ΗΠΑ). Όπου πραγματοποιούνται διεθνείς διαβιβάσεις, βασιζόμαστε σε Τυποποιημένες Συμβατικές Ρήτρες (SCCs) ή σε άλλα νόμιμα μέσα διαβίβασης βάσει του δικαίου της ΕΕ, με τυχόν συμπληρωματικά μέτρα.",

    retentionBody: isEN ? (
      <ul className="list-disc pl-6">
        <Li>
          <strong>Form submissions (contact/booking):</strong> retained as needed to respond and manage your request, with{" "}
          <em>periodic review</em> and deletion when no longer necessary (at least annually).
        </Li>
        <Li>
          <strong>Booking events and holds:</strong> operational data retained for the booking lifecycle and for up to{" "}
          <em>24 months</em> after last interaction, unless longer is required for legal claims or statutory obligations.
        </Li>
        <Li>
          <strong>Studio OAuth connection (tokens, calendar id):</strong> retained while the studio keeps the connection
          active and deleted upon disconnection or after <em>6 months of inactivity</em>, or earlier upon request/revocation.
        </Li>
        <Li>
          <strong>Newsletter:</strong> until you withdraw consent or after prolonged inactivity.
        </Li>
        <Li>
          <strong>Logs:</strong> short retention for security and troubleshooting, typically up to <em>90 days</em> unless a
          longer period is needed for an incident.
        </Li>
      </ul>
    ) : (
      <ul className="list-disc pl-6">
        <Li>
          <strong>Υποβολές φορμών (επικοινωνία/κράτηση):</strong> διατήρηση όσο απαιτείται για διαχείριση αιτήματος, με{" "}
          <em>περιοδική ανασκόπηση</em> και διαγραφή όταν δεν είναι πλέον απαραίτητες (τουλ. ετησίως).
        </Li>
        <Li>
          <strong>Γεγονότα κρατήσεων & προσωρινές δεσμεύσεις (holds):</strong> λειτουργικά δεδομένα τηρούνται κατά τον κύκλο
          κράτησης και έως <em>24 μήνες</em> από την τελευταία αλληλεπίδραση, εκτός αν απαιτείται μεγαλύτερος χρόνος για
          νομικές αξιώσεις ή υποχρεώσεις.
        </Li>
        <Li>
          <strong>Σύνδεση OAuth στούντιο (tokens, id ημερολογίου):</strong> διατηρούνται όσο η σύνδεση είναι ενεργή και
          διαγράφονται με αποσύνδεση ή μετά από <em>6 μήνες αδράνειας</em>, ή νωρίτερα κατόπιν αιτήματος/ανάκλησης.
        </Li>
        <Li>
          <strong>Newsletter:</strong> έως ανάκληση συγκατάθεσης ή μετά από παρατεταμένη αδράνεια.
        </Li>
        <Li>
          <strong>Logs:</strong> μικρή διατήρηση για ασφάλεια/αποσφαλμάτωση, συνήθως έως <em>90 ημέρες</em>, εκτός αν
          απαιτείται λόγω περιστατικού.
        </Li>
      </ul>
    ),

    storageBody: isEN ? (
      <>
        <p className="mb-2">We do not use marketing cookies. We use only essential storage:</p>
        <ul className="list-disc pl-6">
          <Li>
            <code>localStorage</code>: language preference <code>locale</code>.
          </Li>
          <Li>
            <code>sessionStorage</code>: UI throttling flags (e.g., <code>newsletterModalSeen:&lt;locale&gt;</code>).
          </Li>
          <Li>
            <strong>OAuth state cookie</strong>: a short-lived, httpOnly cookie used for CSRF protection during Google
            OAuth (<code>gcal_oauth_state</code>), deleted after the flow.
          </Li>
        </ul>
        <p className="mt-2">You may clear storage from your browser at any time.</p>
      </>
    ) : (
      <>
        <p className="mb-2">Δεν χρησιμοποιούμε cookies μάρκετινγκ. Χρησιμοποιούμε μόνο απαραίτητη αποθήκευση:</p>
        <ul className="list-disc pl-6">
          <Li>
            <code>localStorage</code>: προτίμηση γλώσσας <code>locale</code>.
          </Li>
          <Li>
            <code>sessionStorage</code>: flags διεπαφής (π.χ. <code>newsletterModalSeen:&lt;locale&gt;</code>).
          </Li>
          <Li>
            <strong>Cookie OAuth state</strong>: βραχύβιο, httpOnly cookie για προστασία CSRF κατά το Google OAuth{" "}
            (<code>gcal_oauth_state</code>), διαγράφεται μετά το πέρας.
          </Li>
        </ul>
        <p className="mt-2">Μπορείτε να καθαρίσετε την αποθήκευση από τον φυλλομετρητή σας ανά πάσα στιγμή.</p>
      </>
    ),

    embedsBody: isEN ? (
      <>
        The site includes embedded YouTube videos and a Google Map. When you view/interact, these providers may collect
        usage data and place cookies under their own policies (see{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Privacy Policy
        </a>
        ). Links to other sites lead to third-party environments where their policies apply.
      </>
    ) : (
      <>
        Ο ιστότοπος περιλαμβάνει ενσωματωμένα βίντεο YouTube και χάρτη Google. Κατά την προβολή/αλληλεπίδραση, οι πάροχοι
        ενδέχεται να συλλέγουν δεδομένα χρήσης και να τοποθετούν cookies σύμφωνα με τις πολιτικές τους (βλ.{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Privacy Policy
        </a>
        ). Οι σύνδεσμοι προς άλλους ιστότοπους οδηγούν σε περιβάλλοντα τρίτων όπου ισχύουν οι δικές τους πολιτικές.
      </>
    ),

    securityBody: isEN
      ? "We implement appropriate technical and organisational measures, such as HTTPS, access controls, least-privilege policies, encrypted storage for secrets/tokens, and regular updates/patching. We review access rights and monitor for abuse."
      : "Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα, όπως HTTPS, έλεγχο πρόσβασης, αρχές ελάχιστου δικαιώματος, κρυπτογράφηση μυστικών/tokens και τακτικές ενημερώσεις. Ελέγχουμε περιοδικά τα δικαιώματα πρόσβασης και παρακολουθούμε για κατάχρηση.",

    rightsBody: isEN ? (
      <>
        <ul className="list-disc pl-6">
          <Li>Access (copy of your data)</Li>
          <Li>Rectification</Li>
          <Li>Erasure (“right to be forgotten”), where applicable</Li>
          <Li>Restriction of processing</Li>
          <Li>Objection (for legitimate-interest processing)</Li>
          <Li>Portability (where applicable)</Li>
        </ul>
        <p className="mt-2">
          To exercise rights, contact us using the details below. We may need to verify your identity. If you believe your
          rights are infringed, you can lodge a complaint with the Hellenic DPA (<a href="https://www.dpa.gr/" target="_blank" rel="noopener noreferrer">www.dpa.gr</a>).
        </p>
      </>
    ) : (
      <>
        <ul className="list-disc pl-6">
          <Li>Πρόσβαση (αντίγραφο δεδομένων)</Li>
          <Li>Διόρθωση</Li>
          <Li>Διαγραφή (“λήθη”), όπου εφαρμόζεται</Li>
          <Li>Περιορισμός επεξεργασίας</Li>
          <Li>Εναντίωση (για επεξεργασία βάσει εννόμου συμφέροντος)</Li>
          <Li>Φορητότητα (όπου εφαρμόζεται)</Li>
        </ul>
        <p className="mt-2">
          Για άσκηση δικαιωμάτων, επικοινωνήστε στα παρακάτω στοιχεία. Ενδέχεται να απαιτηθεί ταυτοποίηση. Αν θεωρείτε ότι
          παραβιάζονται τα δικαιώματά σας, μπορείτε να υποβάλετε καταγγελία στην ΑΠΔΠΧ (
          <a href="https://www.dpa.gr/" target="_blank" rel="noopener noreferrer">www.dpa.gr</a>).
        </p>
      </>
    ),

    complaintsBody: isEN ? (
      <>
        Supervisory Authority: Hellenic Data Protection Authority (HDPA) –{" "}
        <a href="https://www.dpa.gr/" target="_blank" rel="noopener noreferrer">www.dpa.gr</a>.
      </>
    ) : (
      <>
        Αρμόδια Αρχή: Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ) –{" "}
        <a href="https://www.dpa.gr/" target="_blank" rel="noopener noreferrer">www.dpa.gr</a>.
      </>
    ),

    minorsBody: isEN
      ? "This website targets adults. If you are under 16, please do not submit personal data without parental/guardian consent."
      : "Η ιστοσελίδα απευθύνεται σε ενήλικες. Αν είστε κάτω των 16 ετών, μην υποβάλλετε προσωπικά δεδομένα χωρίς συγκατάθεση γονέα/κηδεμόνα.",

    contactPrivacyBody: isEN ? (
      <>
        For privacy questions/requests:
        <ul>
          <Li>
            Email: <a href="mailto:ffmedicwell@gmail.com">ffmedicwell@gmail.com</a>
          </Li>
          <Li>
            Phone: <a href="tel:2108070010">210 8070010</a>
          </Li>
          <Li>Address: Iroon Polytechneiou 5, Nea Erythraia, 146 71, Greece</Li>
        </ul>
      </>
    ) : (
      <>
        Για αιτήματα/ερωτήσεις σχετικά με τα δεδομένα σας:
        <ul>
          <Li>
            Email: <a href="mailto:ffmedicwell@gmail.com">ffmedicwell@gmail.com</a>
          </Li>
          <Li>
            Τηλέφωνο: <a href="tel:2108070010">210 8070010</a>
          </Li>
          <Li>Διεύθυνση: Ηρώων Πολυτεχνείου 5, Νέα Ερυθραία, 146 71, Ελλάδα</Li>
        </ul>
      </>
    ),

    changesBody: isEN
      ? "We may update this Policy periodically to reflect changes in our services or legal requirements. The current version is published on this page with an updated effective date."
      : "Η Πολιτική μπορεί να ενημερώνεται περιοδικά σύμφωνα με αλλαγές στις υπηρεσίες ή στις νομικές απαιτήσεις. Η τρέχουσα έκδοση δημοσιεύεται σε αυτή τη σελίδα με επικαιροποιημένη ημερομηνία ισχύος.",

    // Terms bodies (kept + lightly polished)
    acceptBody: isEN
      ? "By accessing/using the site, you agree to these terms. If you do not agree, please do not use the site."
      : "Με την πρόσβαση και χρήση του ιστότοπου αποδέχεστε τους παρόντες όρους. Αν δεν συμφωνείτε, παρακαλούμε μη χρησιμοποιείτε τον ιστότοπο.",
    ipBody: isEN
      ? "The content (marks, logos, texts, images) is protected by IP laws. Reproduction, distribution or modification is prohibited without prior written permission, unless expressly permitted by a third-party license."
      : "Το περιεχόμενο (σήματα, λογότυπα, κείμενα, εικόνες) προστατεύεται από δικαιώματα ΠΙ. Απαγορεύεται αναπαραγωγή/διανομή/τροποποίηση χωρίς προηγούμενη έγγραφη άδεια, εκτός εάν ρητά επιτρέπεται από άδεια τρίτου.",
    // your centralized credits section retained as-is (below)
  };

  return (
    <main className="privacy-policy bg-white text-[#0a0a0a] py-16 px-4">
      <div className="container content max-w-4xl mx-auto leading-relaxed">
        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-2">{t.title}</h1>
          <p>
            {t.effDate}: {effectiveDate}
          </p>
        </header>

        {/* Intro */}
        <section className="mb-8">
          <p>{t.intro}</p>
        </section>

        {/* TOC */}
        <nav className="mb-10">
          <h2 className="mb-3">{t.toc}</h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              <a href="#privacy">{t.privacy}</a>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li><a href="#roles">{t.roles}</a></li>
                <li><a href="#controller">{t.controller}</a></li>
                <li><a href="#data-we-collect">{t.collected}</a></li>
                <li><a href="#forms">{t.forms}</a></li>
                <li><a href="#calendar">{t.calendar}</a></li>
                <li><a href="#geolocation">{t.geolocation}</a></li>
                <li><a href="#logs">{t.logs}</a></li>
                <li><a href="#purposes">{t.purposes}</a></li>
                <li><a href="#recipients">{t.recipients}</a></li>
                <li><a href="#transfers">{t.transfers}</a></li>
                <li><a href="#retention">{t.retention}</a></li>
                <li><a href="#storage">{t.storage}</a></li>
                <li><a href="#embeds">{t.embeds}</a></li>
                <li><a href="#security">{t.security}</a></li>
                <li><a href="#rights">{t.rights}</a></li>
                <li><a href="#complaints">{t.complaints}</a></li>
                <li><a href="#minors">{t.minors}</a></li>
                <li><a href="#contact-privacy">{t.contactPrivacy}</a></li>
                <li><a href="#changes">{t.changes}</a></li>
              </ol>
            </li>
            <li className="mt-3">
              <a href="#terms">{t.terms}</a>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li><a href="#acceptance">{t.accept}</a></li>
                <li><a href="#ip">{t.ip}</a></li>
                <li><a href="#third-party-licenses">{t.thirdLic}</a></li>
                <li><a href="#acceptable-use">{t.acceptableUse}</a></li>
                <li><a href="#links">{t.links}</a></li>
                <li><a href="#medical">{t.medical}</a></li>
                <li><a href="#liability">{t.liability}</a></li>
                <li><a href="#changes-terms">{t.changesTerms}</a></li>
                <li><a href="#law">{t.law}</a></li>
              </ol>
            </li>
          </ol>
        </nav>

        {/* -------------------- PRIVACY -------------------- */}
        <section id="privacy" className="mb-12">
          <h2 className="mb-4">{t.privacy}</h2>

          <section id="roles" className="mb-8">
            <h3>1) {t.roles}</h3>
            <div>{t.rolesBody}</div>
          </section>

          <section id="controller" className="mb-8">
            <h3>2) {t.controller}</h3>
            <div>{t.controllerBody}</div>
          </section>

          <section id="data-we-collect" className="mb-8">
            <h3>3) {t.collected}</h3>
            <p>
              {isEN
                ? "We process only what is necessary for the operation of our website and booking functionality, as detailed in the sections below."
                : "Επεξεργαζόμαστε μόνο τα απολύτως απαραίτητα δεδομένα για τη λειτουργία της ιστοσελίδας και του συστήματος κρατήσεων, όπως αναλύεται στις παρακάτω ενότητες."}
            </p>
          </section>


          <section id="forms" className="mb-8">
            <h3>4) {t.forms}</h3>
            <div>{t.formsBody}</div>
          </section>

          <section id="calendar" className="mb-8">
            <h3>5) {t.calendar}</h3>
            <div>{t.calendarBody}</div>
          </section>

          <section id="geolocation" className="mb-8">
            <h3>6) {t.geolocation}</h3>
            <div>{t.geolocationBody}</div>
          </section>

          <section id="logs" className="mb-8">
            <h3>7) {t.logs}</h3>
            <div>{t.logsBody}</div>
          </section>

          <section id="purposes" className="mb-8">
            <h3>8) {t.purposes}</h3>
            <div>{t.purposesBody}</div>
          </section>

          <section id="recipients" className="mb-8">
            <h3>9) {t.recipients}</h3>
            <div>{t.recipientsBody}</div>
          </section>

          <section id="transfers" className="mb-8">
            <h3>10) {t.transfers}</h3>
            <p>{t.transfersBody}</p>
          </section>

          <section id="retention" className="mb-8">
            <h3>11) {t.retention}</h3>
            <div>{t.retentionBody}</div>
          </section>

          <section id="storage" className="mb-8">
            <h3>12) {t.storage}</h3>
            <div>{t.storageBody}</div>
          </section>

          <section id="embeds" className="mb-8">
            <h3>13) {t.embeds}</h3>
            <div>{t.embedsBody}</div>
          </section>

          <section id="security" className="mb-8">
            <h3>14) {t.security}</h3>
            <p>{t.securityBody}</p>
          </section>

          <section id="rights" className="mb-8">
            <h3>15) {t.rights}</h3>
            <div>{t.rightsBody}</div>
          </section>

          <section id="complaints" className="mb-8">
            <h3>16) {t.complaints}</h3>
            <p>{t.complaintsBody}</p>
          </section>

          <section id="minors" className="mb-8">
            <h3>17) {t.minors}</h3>
            <p>{t.minorsBody}</p>
          </section>

          <section id="contact-privacy" className="mb-8">
            <h3>18) {t.contactPrivacy}</h3>
            <div>{t.contactPrivacyBody}</div>
          </section>

          <section id="changes" className="mb-8">
            <h3>19) {t.changes}</h3>
            <p>{t.changesBody}</p>
          </section>
        </section>

        {/* -------------------- TERMS -------------------- */}
        <section id="terms" className="mb-12">
          <h2 className="mb-4">{t.terms}</h2>

          <section id="acceptance" className="mb-6">
            <h3>1) {t.accept}</h3>
            <p>{t.acceptBody}</p>
          </section>

          <section id="ip" className="mb-6">
            <h3>2) {t.ip}</h3>
            <p>{t.ipBody}</p>
          </section>

          <section id="third-party-licenses" className="mb-6">
            <h3>3) {t.thirdLic}</h3>
            <div>
              {isEN ? (
                <>
                  <p>
                    <strong>Centralized attribution:</strong> We do not place attribution next to each image or icon.
                    To ensure compliance, all attributions and ownership notices are provided <em>on this page</em>.
                    If any license requires closer attribution, please contact us and we will add it or remove the
                    asset.
                  </p>
                  <p>We use creative assets under their respective free or paid licenses, including:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>
                      <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">
                        Pexels
                      </a>{" "}
                      — Pexels License (free for commercial use, no attribution required; attribution appreciated).
                    </li>
                    <li>
                      <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
                        Unsplash
                      </a>{" "}
                      — Unsplash License (free for commercial use, no attribution required; attribution appreciated).
                    </li>
                    <li>
                      <a href="https://www.freepikcompany.com/legal" target="_blank" rel="noopener noreferrer">
                        Freepik / Storyset
                      </a>{" "}
                      — Free assets generally require attribution (link to author/source); premium accounts may waive
                      attribution.
                    </li>
                    <li>
                      <a href="https://www.flaticon.com/license" target="_blank" rel="noopener noreferrer">
                        Flaticon
                      </a>{" "}
                      — Free use with author attribution; premium license may remove attribution.
                    </li>
                    <li>
                      <a href="https://pixabay.com/service/license/" target="_blank" rel="noopener noreferrer">
                        Pixabay
                      </a>{" "}
                      — Pixabay License (free for commercial use, no attribution required).
                    </li>
                    <li>
                      <a href="https://github.com/tailwindlabs/heroicons/blob/master/LICENSE" target="_blank"
                         rel="noopener noreferrer">
                        Heroicons
                      </a>{" "}
                      — MIT License (no attribution required).
                    </li>
                    <li>
                      <a href="https://github.com/lucide-icons/lucide/blob/main/LICENSE" target="_blank"
                         rel="noopener noreferrer">
                        Lucide
                      </a>{" "}
                      — ISC License (no attribution required).
                    </li>
                  </ul>
                  <p className="mt-2">
                    Trademarks, logos, and brand names remain the property of their respective owners.
                    Infrastructure or integrations (e.g., Google, Netlify) are referenced separately under the Privacy
                    Policy as service providers, not creative licensors.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Κεντρική αναφορά:</strong> Δεν τοποθετούμε απόδοση (attribution) δίπλα σε κάθε εικόνα ή
                    εικονίδιο.
                    Για λόγους συμμόρφωσης, όλες οι αποδόσεις και δηλώσεις κυριότητας παρέχονται <em>σε αυτή τη
                    σελίδα</em>.
                    Αν κάποια άδεια απαιτεί απόδοση κοντά στο στοιχείο, ενημερώστε μας ώστε να την προσθέσουμε ή να
                    αφαιρέσουμε το στοιχείο.
                  </p>
                  <p>Χρησιμοποιούμε δημιουργικά στοιχεία σύμφωνα με τις εκάστοτε άδειες χρήσης τους, μεταξύ άλλων:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>
                      <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">
                        Pexels
                      </a>{" "}
                      — Άδεια Pexels (ελεύθερη εμπορική χρήση, χωρίς υποχρεωτική απόδοση· προαιρετικά εκτιμάται).
                    </li>
                    <li>
                      <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
                        Unsplash
                      </a>{" "}
                      — Άδεια Unsplash (ελεύθερη εμπορική χρήση, χωρίς υποχρεωτική απόδοση· προαιρετικά εκτιμάται).
                    </li>
                    <li>
                      <a href="https://www.freepikcompany.com/legal" target="_blank" rel="noopener noreferrer">
                        Freepik / Storyset
                      </a>{" "}
                      — Τα δωρεάν στοιχεία απαιτούν συνήθως απόδοση (σύνδεσμος σε δημιουργό/πηγή)· στα premium πακέτα
                      ενδέχεται να μην απαιτείται.
                    </li>
                    <li>
                      <a href="https://www.flaticon.com/license" target="_blank" rel="noopener noreferrer">
                        Flaticon
                      </a>{" "}
                      — Δωρεάν χρήση με απόδοση δημιουργού· τα premium προγράμματα ενδέχεται να την απαλλάσσουν.
                    </li>
                    <li>
                      <a href="https://pixabay.com/service/license/" target="_blank" rel="noopener noreferrer">
                        Pixabay
                      </a>{" "}
                      — Άδεια Pixabay (ελεύθερη εμπορική χρήση, χωρίς υποχρεωτική απόδοση).
                    </li>
                    <li>
                      <a href="https://github.com/tailwindlabs/heroicons/blob/master/LICENSE" target="_blank"
                         rel="noopener noreferrer">
                        Heroicons
                      </a>{" "}
                      — Άδεια MIT (δεν απαιτείται απόδοση).
                    </li>
                    <li>
                      <a href="https://github.com/lucide-icons/lucide/blob/main/LICENSE" target="_blank"
                         rel="noopener noreferrer">
                        Lucide
                      </a>{" "}
                      — Άδεια ISC (δεν απαιτείται απόδοση).
                    </li>
                  </ul>
                  <p className="mt-2">
                    Τα εμπορικά σήματα, λογότυπα και ονομασίες παραμένουν ιδιοκτησία των νόμιμων κατόχων τους.
                    Οι πάροχοι υποδομής ή ενσωματώσεων (όπως Google, Netlify) αναφέρονται ξεχωριστά στην Πολιτική
                    Απορρήτου ως πάροχοι υπηρεσιών και όχι ως δημιουργοί περιεχομένου.
                  </p>
                </>
              )}
            </div>
          </section>


          <section id="acceptable-use" className="mb-6">
            <h3>4) {t.acceptableUse}</h3>
            <div>
              <ul className="list-disc pl-6">
                <Li>{isEN ? "Do not use the site in ways that violate the law or third-party rights." : "Απαγορεύεται χρήση του ιστότοπου κατά τρόπο που παραβιάζει τον νόμο ή δικαιώματα τρίτων."}</Li>
                <Li>{isEN ? "No attempts at unauthorised access or interference with site operation." : "Απαγορεύεται απόπειρα μη εξουσιοδοτημένης πρόσβασης ή παρεμβάσεις στη λειτουργία του ιστότοπου."}</Li>
              </ul>
            </div>
          </section>

          <section id="links" className="mb-6">
            <h3>5) {t.links}</h3>
            <p>
              {isEN
                ? "The site includes links to our other pages and social accounts. We are not responsible for third-party content or privacy policies."
                : "Ο ιστότοπος περιέχει συνδέσμους προς άλλες σελίδες μας και λογαριασμούς σε κοινωνικά δίκτυα. Δεν ευθυνόμαστε για περιεχόμενο ή πολιτικές απορρήτου τρίτων."}
            </p>
          </section>

          <section id="medical" className="mb-6">
            <h3>6) {t.medical}</h3>
            <p>
              {isEN
                ? "Information regarding EMS and services is for informational purposes only and does not constitute medical advice. Consult a healthcare professional before any exercise/therapy program."
                : "Οι πληροφορίες σχετικά με το EMS και τις υπηρεσίες είναι ενημερωτικές και δεν αποτελούν ιατρική συμβουλή. Συμβουλευτείτε επαγγελματία υγείας πριν από οποιοδήποτε πρόγραμμα άσκησης/θεραπείας."}
            </p>
          </section>

          <section id="liability" className="mb-6">
            <h3>7) {t.liability}</h3>
            <p>
              {isEN
                ? "We strive for accuracy without warranties of completeness or timeliness. To the maximum extent permitted by law, we are not liable for direct/indirect damages arising from site use."
                : "Καταβάλλουμε προσπάθεια για ακρίβεια χωρίς εγγυήσεις πληρότητας ή επικαιρότητας. Στο μέγιστο που επιτρέπεται από τον νόμο, δεν ευθυνόμαστε για άμεσες/έμμεσες ζημίες από τη χρήση του ιστότοπου."}
            </p>
          </section>

          <section id="changes-terms" className="mb-6">
            <h3>8) {t.changesTerms}</h3>
            <p>
              {isEN
                ? "We may modify these terms; continued use after changes constitutes acceptance."
                : "Διατηρούμε δικαίωμα τροποποιήσεων· η συνέχιση χρήσης μετά τις αλλαγές συνιστά αποδοχή."}
            </p>
          </section>

          <section id="law" className="mb-6">
            <h3>9) {t.law}</h3>
            <p>
              {isEN
                ? "These terms are governed by Greek law. Courts of Athens have jurisdiction, subject to mandatory consumer protection provisions."
                : "Οι όροι διέπονται από το Ελληνικό Δίκαιο. Αρμόδια τα δικαστήρια Αθηνών, με την επιφύλαξη αναγκαστικών διατάξεων προστασίας καταναλωτή."}
            </p>
          </section>
        </section>

        {/* Contact footer */}
        <section className="mt-12">
          <h3>{isEN ? "Contact" : "Επικοινωνία"}</h3>
          <p>
            {isEN ? (
              <>
                For anything related to this page (Privacy Policy or Terms), contact{" "}
                <a href="mailto:ffmedicwell@gmail.com">ffmedicwell@gmail.com</a> or{" "}
                <a href="tel:2108070010">210 8070010</a>.
              </>
            ) : (
              <>
                Για οτιδήποτε σχετικό με την παρούσα σελίδα (Πολιτική Απορρήτου ή Όρους Χρήσης) επικοινωνήστε στο{" "}
                <a href="mailto:ffmedicwell@gmail.com">ffmedicwell@gmail.com</a> ή στο{" "}
                <a href="tel:2108070010">210 8070010</a>.
              </>
            )}
          </p>
        </section>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import IntroSection from "../components/IntroSection";
import AboutSection from "../components/AboutSection";
import CVTimeline from "../components/CVTimeline";

export default function AboutPage() {
  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  const isEn = locale === "en";

  // ---------- CV DATA (EL) ----------
  const greekSections = [
    {
      title: "Εργασιακή Εμπειρία",
      items: [
        {
          role: "Δικηγόρος παρ’ Αρείω Πάγω",
          org: "Ελεύθερος επαγγελματίας",
          dates: "19/02/2025 - σήμερα",
          bullets: "",
        },
        {
          role: "Δικηγόρος παρ’ Εφέταις",
          org: "Ελεύθερος επαγγελματίας",
          dates: "01/04/2018 - 18/02/2025",
          bullets: [
            "Δίκαιο Αλλοδαπών",
            "Δίκαιο Εταιρειών",
            "Δίκαιο Ιθαγένειας",
            "Δίκαιο Σημάτων",
            "Εμπορικό Δίκαιο",
            "Ενασχόληση με Αστικές Διαφορές",
            "Ποινικές Υποθέσεις",
          ],
        },

        {
          role: "Δικηγόρος παρ’ Πρωτοδίκαις",
          org: "Ελεύθερος επαγγελματίας",
          dates: "01/10/2015 - 31/3/2018",
          bullets: [
            "Συνεργασία και συστέγαση με το δικηγορικό γραφείο του Θεόδωρου Σ. Αγγελόπουλου (Δικηγόρος παρά Πρωτοδίκαις)",
            "Δίκαιο Αλλοδαπών",
            "Δίκαιο Εταιρειών",
            "Δίκαιο Ιθαγένειας",
            "Δίκαιο Σημάτων",
            "Εμπορικό Δίκαιο",
            "Ενασχόληση με Αστικές Διαφορές",
            "Ποινικές Υποθέσεις",
          ],
        },

        {
          role: "Δικηγόρος παρ’ Πρωτοδίκαις",
          org: "Δικηγορικό γραφείο Χ. Οικονομάκη",
          dates: "05/05/2014 - 30/06/2015",
          bullets: [
            "Πλήρης απασχόληση στο γραφείο του Χρήστου Γ. Οικονομάκη (Δικηγόρος Πειραιά Παρ’ Αρείω Πάγω)",
            "Νομικές υποθέσεις Ποινικού-Αστικού και Διοικητικού Δικαίου",
            "Αιτήσεις περί ακύρωσης της διαδικασίας, αιτήσεις περί ακύρωσης της απόφασης, αιτήσεις περί μετατροπής της ποινής φυλάκισης σε χρηματική ποινή και καταβολής της σε δόσεις, αιτήσεις περί μετατροπής της ποινής φυλάκισης σε εθελοντική κοινωνική εργασία",
            "Άρνηση της κατηγορίας ενώπιον Ακροατηρίου",
            "Παράσταση σε ακροατήρια ποινικά, παράσταση σε ποινικά ακροατήρια για αδικήματα φορολογικών παραβάσεων",
            "Παράσταση ενώπιον του Ανακριτού",
            "Παράσταση σε αστικά, ειδικότερα σε εκούσια δικαιοδοσία (υπερχρεωμένα φυσικά πρόσωπα Ν.3869/2010)",
            "Παράσταση σε ασφαλιστικά μέτρα και προσωρινές διαταγές",
            "Παράσταση σε ανακοπές 954 παρ. 4 του ΚΠολΔ.",
            "Σύνταξη δικογράφων πάσης φύσεως",
            "Σύνταξη υπομνημάτων κι εγγράφων εξηγήσεων",
            "Υποβολή αυτοτελών ισχυρισμών περί ακύρωσης της διαδικασίας / περί αναγνώρισης ελαφρυντικών περιστάσεων / περί απαλλαγής από την ποινή",
            "Υποβολή-σύνταξη μηνύσεων",
          ],
        },

        {
          role: "Ασκούμενος Δικηγόρος",
          org: "Δικηγορικό γραφείο Ι. Μπακάλογλου",
          dates: "01/11/2011 - 23/04/2014",
          bullets: [
            "Πλήρης απασχόληση στο δικηγορικό γραφείο του Ι. Μπακάλογλου (Δικηγόρος Αθηνών Παρ’ Αρείω Πάγω)",
            "Νομικές υποθέσεις Ποινικού-Αστικού Δικαίου",
            "Εξειδίκευση στον νόμο 3869/2010 (όπως τροποποιήθηκε με τους νόμους Ν.3996/2011, Ν.4161/2013 και Ν.4336/2015)",
            "Έλεγχος τίτλων σε υποθηκοφυλακεία",
            "Κατάθεση-σύνταξη κάθε είδους δικογράφων (μηνύσεων, αγωγών, ασφαλιστικών μέτρων, πρακτικών συμβιβασμού, εφέσεων, εξώδικων, ιδιωτικών συμφωνητικών, ανακοπών κατά διαταγών πληρωμής και κατά διαταγών απόδοσης μισθίου, διαταγές πληρωμής, διοικητική προσφυγή)",
          ],
        },

        {
          role: "Επικοινωνία & Πωλήσεις",
          org: "Ευρωχαρτική Α.Β.Ε.Ε.",
          dates: "01/08/2006 - 31/12/2008",
          bullets: [
            "Πλήρης απασχόληση στην Ευρωχαρτική Α.Β.Ε.Ε., επωνυμία “ENDLESS”",
            "Απασχόληση στο τμήμα Πωλήσεων (Sales and Merchandises)",
            "Εμπορικός αντιπρόσωπος στα πρατήρια του στρατού Ε.Κ.Ε.Μ.Σ. και της πολεμικής αεροπορίας Σ.Ε.Π.Α.",
          ],
        },

        {
          role:
            "Εκπαίδευση - Απασχόληση στους Ολυμπιακούς Αγώνες «ΑΘΗΝΑ 2004»",
          org: "Οργανωτική Επιτροπή Ολυμπιακών Αγώνων «ΑΘΗΝΑ 2004»",
          dates: "01/07/2004 - 31/08/2004",
          bullets: [
            "Πλήρης απασχόληση στην Οργανωτική Επιτροπή Ολυμπιακών Αγώνων «ΑΘΗΝΑ 2004»",
            "Απασχόληση στο Γραφείο Κινήσεως",
            "Γραμματειακή Υποστήριξη",
          ],
        },

        {
          role: "Πρόγραμμα Εκπαίδευσης & Απασχόλησης ΟΑΕΔ",
          org: "Ο.Α.Ε.Δ.",
          dates: "2003",
          bullets: [
            "Μερική απασχόληση στον Ο.Α.Ε.Δ. Αγίων Αναργύρων Ν.Π.Δ.Δ.",
            "Απασχόληση στο κεντρικό ταμείο",
            "Βοηθός ταμία (έλεγχος επιδομάτων ανεργίας, επαλήθευση μηνιαίου λογαριασμού μεταξύ υπηρεσίας και Ε.Τ.Ε.)",
          ],
        },

        {
          role: "Πρόγραμμα Εκπαίδευσης & Απασχόλησης Ο.Α.Ε.Δ.",
          org: "Ο.Α.Ε.Δ.",
          dates: "2000 - 2001",
          bullets: [
            "Μερική απασχόληση στο Ι.Κ.Α. Αγίων Αναργύρων Ν.Π.Δ.Δ.",
            "Γραμματειακή υποστήριξη",
          ],
        },
      ],
    },

    {
      title: "Σπουδές",
      items: [
        {
          role: "Μεταπτυχιακό Δίπλωμα Ειδίκευσης",
          org:
            "Τμήμα Κοινωνικής και Εκπαιδευτικής Πολιτικής, Πανεπιστήμιο Πελοποννήσου",
          dates: "2000 – 2001",
          bullets: [
            "Εκπόνηση Μεταπτυχιακής Διπλωματικής Διατριβής με θέμα: «Το ιατρικό λάθος στην παθητική ευθανασία των ανηλίκων και ενηλίκων ασθενών».",
            "Δημοσιευμένη στο διαδίκτυο — URL: http://195.251.38.253:8080/xmlui/handle/123456789/2769",
            "Ενδεικτικά μαθήματα: Ιατρικό λάθος, Κώδικας Ιατρικής Δεοντολογίας, Δικαιώματα Ασθενών, Ποινική και Αστική Ευθύνη Ιατρών, Ευρωπαϊκό και Διεθνές Πλαίσιο της Υγείας, Οικονομικά της Υγείας.",
          ],
        },
        {
          role: "Πτυχίο Τμήματος Νομικής",
          org: "Δημοκρίτειο Πανεπιστήμιο Θράκης",
          dates: "10/2013 – 12/2016",
          bullets: [],
        },
        {
          role:
            "Πτυχίο Τμήματος Πολιτικής Επιστήμης και Δημόσιας Διοίκησης",
          org: "Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών",
          dates: "10/1999 – 09/2005",
          bullets: [],
        },
      ],
    },

    {
      title: "Επιμόρφωση",
      items: [
        {
          role:
            "Πρόγραμμα Εκπαίδευσης στον Εξωδικαστικό Μηχανισμό Ρύθμισης Οφειλών — Εξειδίκευση στην Τραπεζική Διαμεσολάβηση",
          org:
            "Ελληνικό Ινστιτούτο Διαμεσολάβησης (GMI) και Εκπαιδευτικός Φορέας ADR Center — Member of JAMS International",
          dates: "25/07/2017 – 26/07/2017",
          bullets: ["Πρόγραμμα εκπαίδευσης διάρκειας 16 ωρών."],
        },
        {
          role: "Νομικό Συνέδριο: «Επίκαιρα Ζητήματα Φορολογικού Δικαίου»",
          org:
            "Ένωση Ασκούμενων και Νέων Δικηγόρων Αθηνών (Ε.Α.Ν.Δ.Α.)",
          dates: "13/03/2015 – 15/03/2015",
          bullets: [],
        },
        {
          role: "Ημερίδα: «Νομικές και Εγκληματολογικές Προσεγγίσεις της Ποινής»",
          org:
            "Μ.Π.Σ. Εγκληματολογίας του Παντείου Πανεπιστημίου και Τμήμα Ποινικών και Εγκληματολογικών Επιστημών του Δημοκρίτειου Πανεπιστημίου Θράκης",
          dates: "10/04/2013",
          bullets: [],
        },
        {
          role:
            "Ημερίδα: «Ο Ρόλος της Εξωτερικής Πολιτικής της Ομοσπονδιακής Δημοκρατίας της Γερμανίας στην Ε.Ε.»",
          org: "Ινστιτούτο Διεθνών Οικονομικών Σχέσεων",
          dates: "09/02/2006",
          bullets: [],
        },
      ],
    },
  ];

  // ---------- CV DATA (EN – matched to images) ----------
  const englishSections = [
    {
      title: "Working Experience",
      items: [
        {
          role: "Attorney-at-Law before the Supreme Court (Areios Pagos)",
          org: "Self-employed",
          dates: "19/02/2025 – Present",
          bullets: "",
        },

        {
          role: "Lawyer – Court of Appeal (Freelancer)",
          org: "Freelancer",
          dates: "01/04/2018 – 18/02/2025",
          bullets: [
            "Immigration Law",
            "Intellectual Property Law",
            "Family Law",
            "Civil Law",
            "Labor Law",
            "Health Law",
            "Criminal Law",
            "Real Estate Law",
            "Personal Injury Law",
          ],
        },
        {
          role: "Lawyer – Court of First Instance (Freelancer)",
          org: "Theodoros Aggelopoulos Office",
          dates: "01/10/2015 – 31/03/2018",
          bullets: [
            "Immigration Law",
            "Intellectual Property Law",
            "Family Law",
            "Civil Law",
            "Labor Law",
            "Health Law",
            "Criminal Law",
            "Real Estate Law",
            "Personal Injury Law",
          ],
        },
        {
          role: "Lawyer",
          org: "Christos Oikonomakis Office – Full time position",
          dates: "05/05/2014 – 30/06/2015",
          bullets: [
            "Legal cases of Criminal, Civil and Administrative Law",
            "Cancellation requests and applications of annulment",
            "Conversion of sentence into monetary penalty",
            "Conversion of the prison sentence into voluntary charity work",
            "Refusal of a charge before the audience",
            "Appearance in criminal auditions for tax-related offenses and before interrogator",
            "Representation in civil cases, in particular voluntary jurisdiction over indebted individuals (L. 3869/2010)",
            "Representation in interim measures and interim injunctions 954 §4, Code of Civil Procedure",
            "Creation of applications and statements of any kind",
            "Preparation of memoranda and explanatory documents in stand-alone allegations",
            "Recognition of mitigators",
            "Drafting cancellation documents and documents for the exemption of sentence",
            "Creating and submitting lawsuits and reports",
          ],
        },
        {
          role: "Intern Lawyer",
          org: "I. Mpakaloglou Office – Full time position",
          dates: "01/11/2011 – 23/04/2014",
          bullets: [
            "Criminal and civil law cases",
            "Specialization in Law 3869/2010 (as amended by L. 3996/2011, L. 4161/2013 & L. 4336/2015)",
            "Checking titles and deeds in mortgages",
            "Filing and drafting any legal document: lawsuits, interim measures, appeals, private agreements, etc.",
          ],
        },
        {
          role: "Communication & Sales",
          org: "Evrochartiki – Full time position",
          dates: "01/08/2006 – 31/12/2008",
          bullets: [
            "Sales & Merchandises",
            "Sales representative in army station and air force",
          ],
        },
        {
          role: "Olympic Games, Athens 2004",
          org:
            "Organizing Committee of the Olympic Games – Full time position",
          dates: "01/07/2004 – 31/08/2004",
          bullets: ["Office", "Secretarial support"],
        },
        {
          role: "Greek Manpower Employment Organization (OAED)",
          org: "Part-time position in Aghioi Anargyri branch",
          dates: "2003",
          bullets: ["Front office clerk", "Teller assistant"],
        },
        {
          role: "Greek Manpower Employment Organization",
          org:
            "Part-time position in Social Insurance Institute (IKA) – Aghioi Anargyri IKA",
          dates: "2000 – 2001",
          bullets: ["Secretarial support"],
        },
      ],
    },

    {
      title: "Education",
      items: [
        {
          role:
            "Master of Arts, Department of Social and Educational Policy",
          org: "University of Peloponnisos",
          dates: "10/2013 – 12/2016",
          bullets: [
            'Paper topic: "The medical error in passive euthanasia of minor and adult patients"',
            "URL: http://195.251.38.253:8080/xmlui/handle/123456789/2769",
            "Program courses: Medical Error, Code of Medical Ethics, Patients' Rights, Criminal and Civil Liability of Physicians and Health Care Staff, European and International Health Standards, Health Finances",
          ],
        },
        {
          role: "Law School, Undergraduate Program",
          org: "Democritus University of Thrace (DUTH)",
          dates: "10/2007 – 07/2012",
          bullets: [],
        },
        {
          role: "Bachelor in Political Science and Public Administration",
          org: "National and Kapodistrian University of Athens (EKPA)",
          dates: "10/1999 – 09/2005",
          bullets: [],
        },
      ],
    },

    {
      title: "Seminars & Workshops",
      items: [
        {
          role: "Out-of-Court Debt Settlement / Specialization in banking intermediation",
          org: "Greek Institute GMI and ADR Center – Member of Jams International",
          dates: "25/07/2017 – 26/07/2017",
          bullets: ["Training: 16 hours"],
        },
        {
          role: "Legal Conference: Crucial Issues of Tax Law",
          org: "Association of Legal Practitioners and Lawyers of Athens",
          dates: "13/03/2015 – 15/03/2015",
          bullets: [],
        },
        {
          role: "Workshop: Legal and Forensic Approaches to Punishment",
          org: "Panteion University and Democritus University of Thrace",
          dates: "10/04/2013",
          bullets: [],
        },
        {
          role: "Workshop: The role of Germany's foreign policies in the EU",
          org: "",
          dates: "09/02/2006",
          bullets: [],
        },
      ],
    },
  ];

  const cvSections = isEn ? englishSections : greekSections;

  return (
    <main>
      {/* INTRO */}
      <IntroSection
        image="/images/general/7.jpg"
        hasDarkOverlay={true}
        tallImage={false}
        isStudioPage={false}
        imageClassName="object-cover object-center"
        title={
          <div className="text-white text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {isEn
                ? "About our law firm"
                : "Σχετικά με το γραφείο μας"}
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl font-medium text-white/90">
              {isEn
                ? "Trust, consistency and legal precision in every case"
                : "Εμπιστοσύνη, συνέπεια και νομική ακρίβεια σε κάθε υπόθεση"}
            </p>
          </div>
        }
        paragraph={
          <div className="text-gray-700 space-y-4">
            {isEn ? (
              <>
                <p>
                  <strong>AGPA Law</strong> is a modern law firm that
                  provides comprehensive legal services to individuals
                  and legal entities, based in Athens with a network of
                  partners throughout Greece.
                </p>
                <p>
                  Our philosophy is grounded in realistic legal
                  guidance, transparency and steady communication with
                  every client — so that each case is handled with
                  professionalism and responsibility.
                </p>
              </>
            ) : (
              <>
                <p>
                  Το <strong>AGPA Law</strong> αποτελεί ένα σύγχρονο
                  δικηγορικό γραφείο που παρέχει ολοκληρωμένες νομικές
                  υπηρεσίες σε φυσικά και νομικά πρόσωπα, με έδρα την
                  Αθήνα και συνεργάτες σε όλη την Ελλάδα.
                </p>
                <p>
                  Η φιλοσοφία μας βασίζεται στη ρεαλιστική νομική
                  καθοδήγηση, στη διαφάνεια και στη σταθερή επικοινωνία
                  με κάθε πελάτη — ώστε κάθε υπόθεση να αντιμετωπίζεται
                  με επαγγελματισμό και υπευθυνότητα.
                </p>
              </>
            )}
          </div>
        }
      />

      {/* MAIN BIO */}
      <AboutSection
        title={
          isEn
            ? "George A. Panagakos — Profile & Practice Areas"
            : "Γεώργιος Α. Παναγάκος — Βιογραφικό & Τομείς Ενασχόλησης"
        }
        image="/images/people/panagakos_2.png"
        reverse={false}
        fullWidthTitle={true}
        description={
          isEn
            ? [
              " <strong>George A. Panagakos</strong> is a member of the Athens Bar Association with long-standing experience in <em>Banking</em> and <em>Commercial Law</em>, in <em>Enforcement Law</em>, as well as in <em>Civil</em> and <em>Criminal</em> cases. He maintains a strong litigation and advisory practice, handling cases that require strategic planning, precision and consistency, both out of court and before the courts.",
              "He specializes in <em>Banking Law</em> (loan agreements, General Terms of Transactions, damages, protection of privacy and personal data), <em>Commercial Law</em> (company formation and transformations, due diligence) and <em>Enforcement Law</em> (recovery of claims, payment orders, prenotations and seizures).",
              "In <em>Civil</em> and <em>Criminal</em> matters particular emphasis is placed on careful documentation, clear strategy and continuous client updates, with the aim of transparency and effectiveness at every stage.",
            ]
            : [
              "Ο <strong>Γεώργιος Α. Παναγάκος</strong> είναι μέλος του Δικηγορικού Συλλόγου Αθηνών, με πολυετή εμπειρία σε <em>Τραπεζικό</em> και <em>Εμπορικό Δίκαιο</em>, στο <em>Δίκαιο Αναγκαστικής Εκτέλεσης</em>, καθώς και σε <em>Αστικές</em> και <em>Ποινικές</em> υποθέσεις. Διαθέτει έντονη δικαστηριακή και συμβουλευτική δραστηριότητα, αναλαμβάνοντας υποθέσεις που απαιτούν στρατηγικό σχεδιασμό, ακρίβεια και συνέπεια, τόσο σε εξωδικαστικό επίπεδο όσο και ενώπιον δικαστηρίων.",
              "Εξειδικεύεται σε ζητήματα <em>Τραπεζικού Δικαίου</em> (συμβάσεις δανείων, Γενικοί Όροι Συναλλαγών, αποζημιώσεις, προστασία απορρήτου και προσωπικών δεδομένων), <em>Εμπορικού Δικαίου</em> (ίδρυση και μετασχηματισμοί εταιρειών, due diligence) και <em>Δικαίου Αναγκαστικής Εκτέλεσης</em> (διεκδίκηση απαιτήσεων, διαταγές πληρωμής, προσημειώσεις και κατασχέσεις).",
              "Στις <em>Αστικές</em> και <em>Ποινικές</em> υποθέσεις δίνεται ιδιαίτερη έμφαση στην προσεκτική τεκμηρίωση, στην καθαρή στρατηγική και στη συνεχή ενημέρωση του πελάτη, με στόχο τη διαφάνεια και την αποτελεσματικότητα σε κάθε στάδιο.",
            ]
        }
        ticks={
          isEn
            ? [
              "Banking, Commercial & Enforcement Law",
              "Civil & Criminal litigation",
              "Title checks, drafting pleadings, remedies and appeals",
              "Combination of practicality and legal precision",
              "Strategic and efficient handling of cases",
              "Transparency and consistency at every stage",
            ]
            : [
              "Τραπεζικό, Εμπορικό & Δίκαιο Αναγκαστικής Εκτέλεσης",
              "Αστικές & Ποινικές Διαφορές",
              "Έλεγχος τίτλων, κατάρτιση δικογράφων, ένδικα μέσα",
              "Συνδυασμός πρακτικότητας και νομικής ακρίβειας",
              "Στρατηγικός, αποδοτικός χειρισμός υποθέσεων",
              "Διαφάνεια και συνέπεια σε κάθε στάδιο",
            ]
        }
      />

      {/* CV TIMELINE */}
      <CVTimeline sections={cvSections} />

      {/* PARTNERS */}
      <AboutSection
        title={
          isEn
            ? "Theodoros S. Aggelopoulos — Attorney at Law, Athens"
            : "Θεόδωρος Σ. Αγγελόπουλος — Δικηγόρος Αθηνών"
        }
        image="/images/people/thodoris.jpg"
        reverse={true}
        fullWidthTitle={true}
        description={
          isEn
            ? [
              "Member of the Athens Bar Association, son of criminal lawyer Spyros D. Aggelopoulos and grandson of notary Demosthenis Aggelopoulos.",
              "He specializes in <strong>Enforcement Law</strong>, collaborating with major credit institutions and servicers in Greece.",
            ]
            : [
              "Μέλος του ΔΣΑ, υιός του Ποινικολόγου Σπύρου Δ. Αγγελόπουλου και εγγονός του Συμβολαιογράφου Δημοσθένη Αγγελόπουλου.",
              "Ειδικεύεται στο <strong>Δίκαιο Αναγκαστικής Εκτέλεσης</strong>, με συνεργασίες με σημαντικά πιστωτικά ιδρύματα και servicers στην Ελλάδα.",
            ]
        }
        ticks={
          isEn
            ? [
              "Expertise in Enforcement Law",
              "Collaborations with major banking institutions",
              "High volume and complexity of cases",
            ]
            : [
              "Εξειδίκευση στην Αναγκαστική Εκτέλεση",
              "Συνεργασίες με μεγάλα τραπεζικά ιδρύματα",
              "Υψηλός όγκος και πολυπλοκότητα υποθέσεων",
            ]
        }
      />

      <AboutSection
        title={
          isEn
            ? "Chrysa Theodoritsi — Lawyer, Piraeus"
            : "Χρύσα Θεοδωρίτση — Δικηγόρος Πειραιά"
        }
        image="/images/people/xrisa.jpg"
        reverse={false}
        fullWidthTitle={true}
        description={
          isEn
            ? [
              "Member of the Piraeus Bar Association. Graduate of the Athens Law School (2016).",
              "She specializes in <strong>Enforcement Law</strong> and <strong>title checks</strong>. She is an <em>Accredited Mediator</em>.",
            ]
            : [
              "Μέλος του Δικηγορικού Συλλόγου Πειραιά. Απόφοιτη Νομικής Αθηνών (2016).",
              "Ειδικεύεται στην <strong>Αναγκαστική Εκτέλεση</strong> και στους <strong>ελέγχους τίτλων</strong>. Είναι <em>Διαπιστευμένη Διαμεσολαβήτρια</em>.",
            ]
        }
        ticks={
          isEn
            ? [
              "Enforcement Law",
              "Title checks",
              "Accredited Mediator",
            ]
            : [
              "Αναγκαστική Εκτέλεση",
              "Έλεγχοι τίτλων",
              "Διαπιστευμένη Διαμεσολαβήτρια",
            ]
        }
      />
    </main>
  );
}

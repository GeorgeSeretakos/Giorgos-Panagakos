"use client";

import IntroSection from "../components/IntroSection";
import AboutSection from "../components/AboutSection";
import FeatureGrid from "../components/FeatureGrid";
import services from "../../../public/data/services";
import { useLocale } from "../lib/locale";

export default function ServicesPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <>
      <IntroSection
        image="/images/general/9.jpg"
        poster="/images/services/hero.jpg"
        hasDarkOverlay={true}
        imageClassName="object-cover object-center"
        title={
          <div className="text-white text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {isEn ? "Services" : "Υπηρεσίες"}
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl font-medium text-white/90">
              {isEn
                ? "Banking, Enforcement Law, Commercial, Civil and Criminal Law."
                : "Τραπεζικό, Δίκαιο Αναγκαστικής Εκτέλεσης, Εμπορικό, Αστικό και Ποινικό Δίκαιο."}
            </p>
          </div>
        }
        paragraph={
          <div className="text-gray-700 space-y-4">
            <p>
              {isEn ? (
                <>
                  The law firm <strong>AGPA Law</strong> provides high-level,
                  comprehensive legal services to individuals and businesses,
                  with a strong focus on detail and safeguarding each client’s
                  interests.
                </>
              ) : (
                <>
                  Το δικηγορικό γραφείο <strong>AGPA Law</strong> παρέχει
                  ολοκληρωμένες νομικές υπηρεσίες υψηλού επιπέδου σε ιδιώτες και
                  επιχειρήσεις, με προσήλωση στη λεπτομέρεια και στη διασφάλιση
                  των συμφερόντων κάθε εντολέα.
                </>
              )}
            </p>
            <p>
              {isEn ? (
                <>
                  With specialization in <em>Banking Law</em>,{" "}
                  <em>Enforcement Law</em>, <em>Commercial</em>,{" "}
                  <em>Civil</em> and <em>Criminal Law</em>, our firm combines
                  legal expertise, experience and efficiency at every stage of
                  the legal process.
                </>
              ) : (
                <>
                  Με εξειδίκευση στους τομείς του <em>Τραπεζικού Δικαίου</em>,
                  του <em>Δικαίου Αναγκαστικής Εκτέλεσης</em>, του{" "}
                  <em>Εμπορικού</em>, <em>Αστικού</em> και{" "}
                  <em>Ποινικού Δικαίου</em>, το γραφείο μας συνδυάζει
                  επιστημονική γνώση, εμπειρία και αποτελεσματικότητα σε κάθε
                  στάδιο της νομικής διαδικασίας.
                </>
              )}
            </p>
          </div>
        }
      />

      <FeatureGrid title={isEn ? "Services" : "Υπηρεσίες"} items={services} />

      <AboutSection
        title={isEn ? "Banking Law" : "Τραπεζικό Δίκαιο"}
        image="/images/services/10.jpg"
        reverse={false}
        fullWidthTitle={false}
        description={
          isEn
            ? [
              "Our firm is active in the banking sector, providing advice on financial matters, leasing, loans, compensation, guarantees and security, business transactions, as well as financial transactions and issues of international commercial dealings.",
              "In addition, we provide full services for the management of banking relationships between bank and client: key characteristics and particularities of this relationship, general and special obligations of credit institutions towards clients, banking confidentiality, confidentiality of deposits, and obligations relating to personal data.",
              "In particular, we undertake:",
            ]
            : [
              "Το γραφείο μας δραστηριοποιείται στον τραπεζικό χώρο παρέχοντας συμβουλές σε οικονομικά θέματα, leasing, δάνεια, αποζημιώσεις, εγγυήσεις και παροχή ασφάλειας, επιχειρηματικές συναλλαγές καθώς επίσης και στον τομέα οικονομικών συναλλαγών και σε ζητήματα διεθνών εμπορικών συναλλαγών.",
              "Επιπρόσθετα, παρέχουμε πλήρεις υπηρεσίες για διαχείριση τραπεζικών συναλλαγών για τις σχέσεις τράπεζας και πελάτη, βασικά χαρακτηριστικά και ιδιαιτερότητα της σχέσης, γενικές και ειδικές υποχρεώσεις των πιστωτικών ιδρυμάτων έναντι των πελατών, γενικό τραπεζικό απόρρητο, απόρρητο των τραπεζικών καταθέσεων, υποχρεώσεις σε σχέση με τα προσωπικά δεδομένα.",
              "Ειδικότερα αναλαμβάνουμε :",
            ]
        }
        ticks={
          isEn
            ? [
              "Objections against payment orders arising from banking contracts.",
              "Review of General Terms of Banking Contracts / Unfair contract terms.",
              "Damages claims against banks.",
              "Negative declaratory actions.",
              "Over-indebted households – Law 3869/2010 (drafting application and representation in court).",
            ]
            : [
              "Ανακοπές κατά Διαταγών Πληρωμής από τραπεζικές συμβάσεις.",
              "Έλεγχος Γ.Ο.Σ τραπεζικών συμβάσεων / Καταχρηστικότητα όρων.",
              "Αγωγές αποζημίωσης κατά τραπεζών.",
              "Αρνητικές Αναγνωριστικές Αγωγές.",
              "Υπερχρεωμένα Ν.3869/2010 (Σύνταξη Αίτησης – Εκδίκαση).",
            ]
        }
      />

      <AboutSection
        title={isEn ? "Enforcement Law" : "Δίκαιο Αναγκαστικής Εκτέλεσης"}
        image="/images/services/3.jpg"
        reverse={true}
        fullWidthTitle={false}
        description={
          isEn
            ? [
              "Our firm is highly specialized in Enforcement Law and undertakes, with great reliability, the recovery of overdue claims. Our clients include major banking institutions with a high volume of cases, international funds and large Greek and foreign companies.",
              "Our selected legal team is constantly trained and fully up to date with the legislation governing enforcement proceedings. Our aim is the full recovery of your claim, using all necessary legal actions within the framework of Enforcement Law, either through out-of-court solutions or before the courts.",
              "Our services include:",
            ]
            : [
              "Το γραφείο μας είναι εξειδικευμένο στο Δίκαιο Αναγκαστικής Εκτέλεσης και αναλαμβάνει με μεγάλη αξιοπιστία τη διεκδίκηση ληξιπρόθεσμων απαιτήσεων. Εντολείς μας είναι μεγάλα τραπεζικά ιδρύματα με μεγάλο όγκο υποθέσεων, διεθνή funds και μεγάλες επιχειρήσεις, ελληνικές και αλλοδαπές.",
              "Η επίλεκτη νομική μας ομάδα εκπαιδεύεται διαρκώς και είναι απολύτως ενημερωμένη για τις ισχύουσες διατάξεις που αφορούν στις αναγκαστικές εκτελέσεις. Επιδίωξή μας είναι η πλήρης διεκδίκηση της απαίτησής σας, κάνοντας χρήση όλων των αναγκαίων νομικών ενεργειών στο πλαίσιο του Δικαίου Αναγκαστικής Εκτέλεσης, ακολουθώντας την εξωδικαστική ή τη δικαστική οδό.",
              "Το εύρος των υπηρεσιών μας περιλαμβάνει:",
            ]
        }
        ticks={
          isEn
            ? [
              "Research on immovable property.",
              "Drafting and service of extrajudicial notices and formal invitations.",
              "Filing and service of payment orders.",
              "Drafting and litigation of lawsuits, filing legal remedies and auxiliary actions.",
              "Registration and cancellation of prenotations and compulsory or consensual mortgages.",
              "Seizures of movable and immovable property.",
              "Enforcement actions (lodging claims in auctions, objections, obtaining final judgments and collection of claims).",
              "Court representation at all stages.",
            ]
            : [
              "Έρευνες ακίνητης περιουσίας.",
              "Σύνταξη εξώδικων δηλώσεων – προσκλήσεων.",
              "Κατάθεση και επίδοση διαταγών πληρωμής.",
              "Σύνταξη και εκδίκαση αγωγών, άσκηση ενδίκων μέσων και βοηθημάτων.",
              "Εγγραφή και ανάκληση προσημειώσεων, αναγκαστικών και συναινετικών",
              "Κατασχέσεις κινητών και ακινήτων",
              "Ενέργειες αναγκαστικής εκτέλεσης (Αναγγελία απαιτήσεων σε πλειστηριασμό, ανακοπές, τελεσιδικία και είσπραξη απαιτήσεων).",
              "Δικαστηριακή εκπροσώπηση",
            ]
        }
      />

      <AboutSection
        title={isEn ? "Commercial Law" : "Εμπορικό Δίκαιο"}
        image="/images/services/9.jpg"
        reverse={false}
        fullWidthTitle={false}
        description={
          isEn
            ? [
              "Our firm undertakes the legal representation of all types of companies, in Greece and abroad (general partnerships, limited partnerships, limited liability companies, private companies, sociétés anonymes, cooperatives, associations, joint ventures, silent partnerships, etc.) from their incorporation through to their dissolution.",
              "Our specialized team can recommend the most suitable legal form for your business, aligned with your interests and needs, and then provide continuous legal guidance, offering solutions at every stage of your company’s development and proposing appropriate tax planning in accordance with current tax legislation.",
              "We also handle all forms of corporate transformations provided for in the applicable legislation, both by type (mergers, demergers, conversions, spin-offs) and by corporate form (transformations between similar or different corporate forms), from full legal and factual due diligence through to the signing of final agreements.",
            ]
            : [
              "Το γραφείο μας αναλαμβάνει την νομική εκπροσώπηση κάθε μορφής εταιρειών, εντός και εκτός Ελλάδος, (ομόρρυθμες, ετερόρρυθμες, ΕΠΕ, ΙΚΕ, Ανώνυμες Εταιρείες, συνεταιρισμοί, σωματεία, κοινοπραξίες, αφανείς εταιρείες κλπ.) από το στάδιο της ίδρυσής τους μέχρι και την λύση τους. Οι εξειδικευμένοι συνεργάτες μας είναι σε θέση να σας προτείνουν την καλύτερη νομική μορφή, η οποία θα εξυπηρετεί τα συμφέροντα και τις ανάγκες τις επιχείρησής σας ενώ εν συνεχεία θα προσφέρουν την κατάλληλη νομική καθοδήγηση προσφέροντας λύσεις σε κάθε στάδιο εξέλιξης της επιχείρησής σας και προτείνοντας τον κατάλληλο φορολογικό σχεδιασμό συμφώνως με τις ισχύουσες φορολογικές διατάξεις.",
              "Επιπλέον, αναλαμβάνουμε την διεκπεραίωση όλων των ρητά προβλεπόμενων, από την ισχύουσα νομοθεσία, μορφών μετασχηματισμών τόσο κατ’ είδος (συγχωνεύσεις, διασπάσεις, μετατροπές, αποσχίσεις κλάδου) όσο και κατ’ εταιρική μορφή (μετασχηματισμοί μεταξύ ομοειδών αλλά και διαφορετικών εταιρικών μορφών), από τον πλήρη νομικό και πραγματικό έλεγχο (due diligence) έως και την υπογραφή των οριστικών συμβάσεων.",
            ]
        }
        ticks={[]}
      />

      <AboutSection
        title={isEn ? "Civil Law" : "Αστικό Δίκαιο"}
        image="/images/services/5.jpg"
        reverse={true}
        fullWidthTitle={false}
        description={
          isEn
            ? [
              "Our firm specializes in pursuing and processing lawful civil claims, which may consist either of providing monetary compensation or restoring positive or consequential damage. For natural persons, this includes preventing loss of income that under normal circumstances would have increased the value of their assets, while for legal entities it includes restoring profitability that was affected by an unforeseen event that the representative of the business entity did not anticipate. We also undertake the restoration of violations of an individual’s personality rights and the protection of a company’s trade name through the exercise of appropriate legal remedies or actions before all levels of jurisdiction, including the Supreme Court.",
            ]
            : [
              "Το γραφείο μας ειδικεύεται στην διεκδίκηση και στην διεκπεραίωση νόμιμων αστικών αξιώσεων που συνίσταται είτε σε παροχή χρηματικής αποζημίωσης, είτε σε αποκατάσταση της θετικής ή αποθετικής ζημίας, στο οποίο για ένα φυσικό πρόσωπο είναι η αποφυγή της μείωσης του εισοδήματος του που υπό κανονικές συνθήκες θα είχε αυξηθεί το ενεργητικό της περιουσιακής του κατάστασης είτε στην αποκατάσταση της κερδοφορίας ενός νομικού προσώπου λόγω εκδήλωσης ενός εκτάκτου γεγονότος που ο εκπρόσωπος της εκάστοτε επιχειρηματικής οντότητας δεν προέβλεψε καθώς και στην αποκατάσταση της προσβολής του δικαιώματος της προσωπικότητας ενός ατόμου και στην προστασία της επωνυμίας μίας εταιρείας μέσω της άσκησης των κατάλληλων ενδίκων βοηθημάτων ή ενδίκων μέσων σε όλους τους βαθμούς δικαιοδοσίας, ακόμη και στον Άρειο Πάγο.",
            ]
        }
        ticks={[]}
      />

      <AboutSection
        title={isEn ? "Criminal Law" : "Ποινικό Δίκαιο"}
        image="/images/services/8.jpg"
        reverse={false}
        fullWidthTitle={false}
        description={
          isEn
            ? [
              "Our firm has extensive experience in supporting the procedural position of individuals during the stages of preliminary examination, pre-investigation, and formal investigation. We ensure that their rights are fully protected from any violation by police or investigative authorities, and when appearing before a court, we provide comprehensive representation to secure favorable treatment aimed at acquittal of all charges, or alternatively, recognition of the appropriate mitigating factors. Our goal is to reduce the impact on the client’s personal and financial situation and to pursue exemption from any penalty before all levels of jurisdiction, including the Supreme Court.",
            ]
            : [
              "Το γραφείο μας διαθέτει εμπειρία στην υποστήριξη της δικονομικής θέσης ενός φυσικού προσώπου στο στάδιο της προκαταρκτικής εξέτασης, της προανάκρισης και της ανάκρισης και διασφαλίζει τα δικαιώματα του ότι δεν θα παραβιαστούν από τις αστυνομικές άλλως ανακριτικές αρχές και εφόσον κληθεί ενώπιον ενός δικαστηρίου εκπροσωπείται εις το έπακρο ώστε να τύχει ευνοϊκής μεταχείρισης προκειμένου να απαλλαγεί των οποιονδήποτε κατηγοριών άλλως θα αναγνωριστούν τα απαιτούμενα ελαφρυντικά που αρμόζουν σε κάθε περίπτωση ώστε να ελαφρυνθεί η παρούσα προσωπική και περιουσιακή του κατάσταση και να διεκδικηθεί η απαλλαγή του από την επιβολή οποιασδήποτε ποινής σε κάθε βαθμό δικαιοδοσίας ακόμη και στον Άρειο Πάγο.",
            ]
        }
        ticks={[]}
      />
    </>
  );
}

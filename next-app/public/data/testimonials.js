const testimonials = [
  {
    name: {
      el: "Ελευθερία Βαζούκη",
      en: "Eleftheria Vazouki",
    },
    initial: "Ε",
    years: {
      el: "πριν από 4 μήνες",
      en: "4 months ago",
    },
    stars: 5,
    text: {
      el: "Άμεση κατανόηση της υπόθεσης και ξεκάθαρη στρατηγική. Η ομάδα χειρίστηκε την ανακοπή διαταγής πληρωμής με επαγγελματισμό και διαρκή ενημέρωση.",
      en: "Immediate understanding of the case and a clear strategy. The team handled the objection against the payment order with professionalism and continuous updates.",
    },
    avatar: null,
    color: "bg-emerald-600",
  },

  {
    name: {
      el: "Γεώργιος Δρίτσας",
      en: "Georgios Dritsas",
    },
    initial: "Γ",
    years: {
      el: "πριν από 1 μήνα",
      en: "1 month ago",
    },
    stars: 5,
    text: {
      el: "Εξαιρετική συνεργασία σε εμπορική διαφορά. Πλήρης προετοιμασία φακέλου και ουσιαστικές διαπραγματεύσεις που οδήγησαν σε συμβιβασμό υπέρ μας.",
      en: "Excellent cooperation in a commercial dispute. Complete case preparation and meaningful negotiations that led to a favorable settlement.",
    },
    avatar: null,
    color: "bg-sky-600",
  },

  {
    name: {
      el: "Ήρα Πέτρα",
      en: "Hera Petra",
    },
    initial: "Ή",
    years: {
      el: "πριν από 2 μήνες",
      en: "2 months ago",
    },
    stars: 5,
    text: {
      el: "Μεθοδική προσέγγιση και σαφείς οδηγίες σε υπόθεση ρύθμισης οφειλών. Ένιωσα ασφάλεια σε κάθε στάδιο της διαδικασίας.",
      en: "Methodical approach and clear guidance in a debt restructuring case. I felt secure at every stage of the process.",
    },
    avatar: null,
    color: "bg-rose-600",
  },

  {
    name: {
      el: "Αναστασία Αλφρέτου",
      en: "Anastasia Alfrettou",
    },
    initial: "Α",
    years: {
      el: "πριν από 2 μήνες",
      en: "2 months ago",
    },
    stars: 5,
    text: {
      el: "Άρτια νομική τεκμηρίωση σε αστική διαφορά αποζημίωσης. Η παρουσία στο ακροατήριο ήταν υποδειγματική.",
      en: "Excellent legal documentation in a civil compensation dispute. The courtroom representation was exemplary.",
    },
    avatar: null,
    color: "bg-indigo-600",
  },

  {
    name: {
      el: "Ιωάννα Χαρικιοπούλου",
      en: "Ioanna Charikiopoulou",
    },
    initial: "Ι",
    years: {
      el: "πριν από 2 μήνες",
      en: "2 months ago",
    },
    stars: 5,
    text: {
      el: "Για τη σύσταση ΙΚΕ έλαβα σαφές πλάνο ενεργειών, φορολογικές επισημάνσεις και άμεση διεκπεραίωση. Πολύ καλή οργάνωση.",
      en: "For the establishment of an LLC, I received a clear action plan, tax notes, and quick processing. Very well organized.",
    },
    avatar: null,
    color: "bg-amber-600",
  },

  {
    name: {
      el: "Γιώργος Τριανταφύλλου",
      en: "Giorgos Triantafyllou",
    },
    initial: "Γ",
    years: {
      el: "πριν από 1 μήνα",
      en: "1 month ago",
    },
    stars: 5,
    text: {
      el: "Σε υπόθεση αναγκαστικής εκτέλεσης κινήθηκαν έγκαιρα όλα τα απαιτούμενα ένδικα μέσα. Η ενημέρωση ήταν συνεχής και ειλικρινής.",
      en: "In a forced execution case, all required legal actions were taken promptly. The updates were continuous and transparent.",
    },
    avatar: null,
    color: "bg-purple-600",
  },

  {
    name: {
      el: "Σαντρίνο Μπέρμετα",
      en: "Sandrino Bermeta",
    },
    initial: "Σ",
    years: {
      el: "πριν από 5 μήνες",
      en: "5 months ago",
    },
    stars: 5,
    text: {
      el: "Εμπεριστατωμένη νομική γνωμοδότηση για διεθνή εμπορική συναλλαγή και όρους εγγυήσεων. Πολύτιμη καθοδήγηση.",
      en: "Thorough legal advice on an international commercial transaction and guarantee terms. Valuable guidance.",
    },
    avatar: null,
    color: "bg-teal-600",
  },

  {
    name: {
      el: "Βάσια Δούλου",
      en: "Vasia Doulou",
    },
    initial: "Β",
    years: {
      el: "πριν από 2 μήνες",
      en: "2 months ago",
    },
    stars: 5,
    text: {
      el: "Επαγγελματική υποστήριξη σε ποινικό σκέλος εταιρικής υπόθεσης. Διακριτικότητα και ακριβής προετοιμασία.",
      en: "Professional support in the criminal aspect of a corporate case. Discretion and precise preparation.",
    },
    avatar: null,
    color: "bg-pink-600",
  },

  {
    name: {
      el: "Παναγιώτης Περικλάκης",
      en: "Panagiotis Periklakis",
    },
    initial: "Π",
    years: {
      el: "πριν από 2 μήνες",
      en: "2 months ago",
    },
    stars: 5,
    text: {
      el: "Ολοκληρωμένη διαχείριση φακέλου τραπεζικής σύμβασης με έλεγχο Γ.Ο.Σ. και διαπραγμάτευση όρων. Άψογη συνεργασία.",
      en: "Complete handling of a banking contract file with review of general terms and negotiation of conditions. Excellent cooperation.",
    },
    avatar: null,
    color: "bg-cyan-600",
  },
];

export default testimonials;

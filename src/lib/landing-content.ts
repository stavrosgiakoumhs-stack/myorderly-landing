export const REGISTER_URL = "https://app.myorderly.gr/register";
export const LOGIN_URL = "https://app.myorderly.gr/login";
export const CONTACT_EMAIL = "stavrosgiakoumhs@gmail.com";

export const siteMeta = {
  title: "Orderly — Σύστημα παραγγελιοληψίας για καφέ, bar και εστιατόρια",
  description:
    "QR στο τραπέζι, Waiter PDA, Orderly Print και live dashboard. Παραγγελιοληψία, λογαριασμοί και εκτυπώσεις προς bar και κουζίνα — σε ένα σύστημα.",
} as const;

export const demoMeta = {
  title: "Διαδραστικό Demo",
  description:
    "Δοκίμασε το Orderly ως πελάτης, σερβιτόρος ή ιδιοκτήτης. Διαδραστικό demo με δοκιμαστικά δεδομένα — δεν είναι πραγματικός λογαριασμός και δεν δημιουργεί παραγγελίες.",
} as const;

export const navItems = [
  { id: "product", label: "Προϊόν", href: "/#product" },
  { id: "demo", label: "Demo", href: "/demo" },
  { id: "how-it-works", label: "Πώς λειτουργεί", href: "/#how-it-works" },
  { id: "pricing", label: "Πακέτα", href: "/#pricing" },
  { id: "faq", label: "FAQ", href: "/#faq" },
] as const;

export const howSteps = [
  {
    step: 1,
    title: "Στήσε το κατάστημα",
    description: "Περνάς προϊόντα, κατηγορίες, extras και επιλογές. Δημιουργείς τραπέζια και QR.",
  },
  {
    step: 2,
    title: "Πάρε την παραγγελία",
    description:
      "Ο πελάτης σκανάρει το QR στο τραπέζι. Στο Pro, ο σερβιτόρος περνά παραγγελία από PDA — dine-in ή Take Away.",
  },
  {
    step: 3,
    title: "Στείλε στην παραγωγή",
    description: "Το Orderly Print δρομολογεί την παραγγελία στο bar και την κουζίνα.",
  },
  {
    step: 4,
    title: "Ολοκλήρωσε τον λογαριασμό",
    description:
      "Live dashboard, ανοιχτά τραπέζια και ολοκλήρωση με μετρητά ή κάρτα. Στο Pro, βάρδιες και αναφορές.",
  },
] as const;

export const capabilityGroups = [
  {
    id: "customer",
    title: "Παραγγελία στο τραπέζι",
    description: "Ο πελάτης παραγγέλνει μόνος του, χωρίς εφαρμογή.",
    items: [
      { title: "QR ανά τραπέζι", description: "Κάθε τραπέζι έχει το δικό του link και καθαρή ροή." },
      { title: "Ψηφιακό μενού", description: "Κατηγορίες, προϊόντα, τιμές και διαθεσιμότητα." },
      { title: "Extras και επιλογές", description: "Προσαρμογές με σωστή χρέωση, χωρίς παρανοήσεις." },
      { title: "Χωρίς app", description: "Άνοιγμα από τον browser του κινητού." },
    ],
  },
  {
    id: "service",
    title: "Service και PDA",
    description: "Εργαλεία για την ομάδα αίθουσας — στο πακέτο Pro.",
    items: [
      { title: "Waiter PDA", description: "Ο σερβιτόρος περνά παραγγελία από το κινητό ή tablet." },
      { title: "Παραγγελία σε τραπέζι", description: "Επιλογή τραπεζιού, άτομα και μενού στην ίδια ροή." },
      { title: "Take Away", description: "Παραγγελία πακέτου χωρίς να χρειάζεται τραπέζι." },
      { title: "Βάρδιες", description: "Λειτουργική εικόνα βάρδιας για την ομάδα service." },
    ],
  },
  {
    id: "print",
    title: "Παραγωγή",
    description: "Η παραγγελία φτάνει εκεί που πρέπει να ετοιμαστεί.",
    items: [
      { title: "Orderly Print", description: "Εκτύπωση παραγγελιών προς τα σημεία παραγωγής." },
      { title: "Bar και κουζίνα", description: "Δρομολόγηση ανά προϊόν — ποτά στο bar, πιάτα στην κουζίνα." },
      { title: "Λιγότερα λάθη", description: "Ξεκάθαρο ticket αντί για φωνές και χαρτάκια." },
    ],
  },
  {
    id: "owner",
    title: "Διαχείριση καταστήματος",
    description: "Ζωντανή εικόνα και ολοκλήρωση λογαριασμών.",
    items: [
      { title: "Live dashboard", description: "Νέες παραγγελίες και κατάσταση σε πραγματικό χρόνο." },
      { title: "Τραπέζια και λογαριασμοί", description: "Ανοιχτοί λογαριασμοί και ολοκλήρωση με μετρητά ή κάρτα." },
      {
        title: "Αναφορές Pro",
        description: "Analytics, απόδοση σερβιτόρων και εικόνα εσόδων βάρδιας.",
      },
    ],
  },
] as const;

export const starterFeatures = [
  "QR ανά τραπέζι",
  "Ψηφιακό μενού",
  "Παραγγελίες πελατών από QR",
  "Προϊόντα, κατηγορίες, extras και επιλογές",
  "Βασικό live dashboard παραγγελιών",
  "Βασική διαχείριση τραπεζιών και λογαριασμών",
  "Orderly Print",
  "Εκτύπωση παραγγελιών προς bar και κουζίνα",
] as const;

export const starterExcluded = [
  "Waiter PDA",
  "Παραγγελίες σερβιτόρου σε τραπέζι",
  "Take Away από PDA",
  "Άτομα στο τραπέζι στη ροή σερβιτόρου",
  "Analytics και αναφορές",
] as const;

export const proExtras = [
  "Waiter PDA",
  "Παραγγελίες σερβιτόρου σε τραπέζι",
  "Take Away χωρίς τραπέζι",
  "Επιλογή ατόμων στη ροή σερβιτόρου",
  "Analytics και αναφορές dashboard",
  "Αναφορές απόδοσης σερβιτόρων",
  "Αναφορές βάρδιας και εσόδων",
] as const;

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "25€",
    cadence: "/μήνα",
    per: "ανά κατάστημα",
    positioning: "Τα απαραίτητα για ψηφιακή παραγγελιοληψία.",
    featured: false,
    includes: starterFeatures,
    excludes: starterExcluded,
    cta: "Ξεκίνα με Starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: "40€",
    cadence: "/μήνα",
    per: "ανά κατάστημα",
    positioning: "Πλήρης λειτουργία για το service σου.",
    featured: true,
    badge: "Προτεινόμενο",
    includes: [...starterFeatures, ...proExtras],
    excludes: [] as const,
    cta: "Ξεκίνα με Pro",
  },
] as const;

export const faqItems = [
  {
    q: "Χρειάζεται εφαρμογή ο πελάτης;",
    a: "Όχι. Σκανάρει το QR του τραπεζιού και παραγγέλνει από τον browser του κινητού — χωρίς εγκατάσταση.",
  },
  {
    q: "Ποια είναι η διαφορά Starter και Pro;",
    a: "Το Starter καλύπτει QR ανά τραπέζι, ψηφιακό μενού, live dashboard, λογαριασμούς και Orderly Print. Το Pro προσθέτει Waiter PDA, παραγγελίες σερβιτόρου, Take Away, άτομα στο τραπέζι και αναφορές / analytics.",
  },
  {
    q: "Τι κάνει το Orderly Print;",
    a: "Στέλνει την παραγγελία στους εκτυπωτές παραγωγής. Τα ποτά πηγαίνουν στο bar και τα πιάτα στην κουζίνα, ώστε η ομάδα να ετοιμάζει χωρίς φωνές και χαρτάκια.",
  },
  {
    q: "Χρειάζεται σύνδεση με POS;",
    a: "Όχι. Το Orderly δουλεύει χωρίς POS integration. Οι πληρωμές ολοκληρώνονται όπως ήδη λειτουργεί το κατάστημα, με μετρητά ή κάρτα στο ταμείο.",
  },
  {
    q: "Γίνονται online πληρωμές πελατών μέσα στο Orderly;",
    a: "Όχι. Ο πελάτης δεν πληρώνει μέσα από την εφαρμογή. Η ολοκλήρωση γίνεται στο κατάστημα, με μετρητά ή κάρτα.",
  },
  {
    q: "Μπορεί ο σερβιτόρος να περάσει παραγγελία από PDA;",
    a: "Ναι, στο πακέτο Pro. Από το Waiter PDA επιλέγει τραπέζι, άτομα και προϊόντα, ή περνά Take Away χωρίς τραπέζι.",
  },
  {
    q: "Υποστηρίζεται Take Away;",
    a: "Ναι, μέσω Waiter PDA στο πακέτο Pro. Δεν απαιτείται τραπέζι — η παραγγελία μπαίνει ως πακέτο και εμφανίζεται στο dashboard.",
  },
] as const;

export const REGISTER_URL = "https://app.myorderly.gr/register";
export const LOGIN_URL = "https://app.myorderly.gr/login";
export const CONTACT_EMAIL = "stavrosgiakoumhs@gmail.com";

export const problems = [
  {
    title: "Χαμένες παραγγελίες",
    description: "Χάος με χαρτάκια, φωνές και παρανοήσεις στην αίθουσα.",
  },
  {
    title: "Καθυστερήσεις στο service",
    description: "Οι πελάτες περιμένουν περισσότερο απ’ όσο πρέπει.",
  },
  {
    title: "Πολλά πήγαινε-έλα",
    description: "Η ομάδα τρέχει συνέχεια αντί να εστιάζει στην εξυπηρέτηση.",
  },
  {
    title: "Λάθη σε προϊόντα και extras",
    description: "Παραγγελίες που φτάνουν λάθος ή ελλιπείς.",
  },
  {
    title: "Πίεση σε ώρες αιχμής",
    description: "Όταν γεμίζει το μαγαζί, το σύστημα «σπάει».",
  },
] as const;

export const solutions = [
  {
    title: "QR ανά τραπέζι",
    description: "Κάθε τραπέζι έχει το δικό του link και ξεκάθαρη ροή παραγγελιών.",
    icon: "qr",
  },
  {
    title: "Ψηφιακό μενού",
    description: "Καθαρή παρουσίαση προϊόντων, τιμών και διαθεσιμότητας.",
    icon: "menu",
  },
  {
    title: "Live παραγγελίες",
    description: "Βλέπεις τι μπαίνει σε πραγματικό χρόνο στο dashboard.",
    icon: "pulse",
  },
  {
    title: "Waiter view",
    description: "Ιδιωτικό link για σερβιτόρους και συγκεκριμένα τραπέζια.",
    icon: "waiter",
  },
  {
    title: "Extras προϊόντων",
    description: "Χρεώσιμα extras και επιλογές χωρίς μπέρδεμα στο service.",
    icon: "extras",
  },
  {
    title: "Ολοκλήρωση παραγγελιών",
    description: "Ξεκάθαρη ροή από «νέα» μέχρι «ολοκληρώθηκε».",
    icon: "check",
  },
] as const;

export const howSteps = [
  {
    step: 1,
    title: "Περνάς προϊόντα και κατηγορίες",
    description: "Στήνεις το μενού σου με κατηγορίες, τιμές και extras.",
  },
  {
    step: 2,
    title: "Δημιουργείς τραπέζια και QR",
    description: "Κάθε τραπέζι παίρνει το δικό του QR για άμεση πρόσβαση.",
  },
  {
    step: 3,
    title: "Ο πελάτης σκανάρει και παραγγέλνει",
    description: "Από browser — χωρίς εγκατάσταση εφαρμογής.",
  },
  {
    step: 4,
    title: "Η ομάδα βλέπει και ολοκληρώνει την παραγγελία",
    description: "Dashboard και waiter view για γρήγορη εκτέλεση.",
  },
] as const;

export const featureCards = [
  { title: "QR ανά τραπέζι", description: "Ξεκάθαρη ταύτιση παραγγελίας με τραπέζι." },
  { title: "Live dashboard", description: "Ζωντανή εικόνα των παραγγελιών." },
  { title: "Waiter view", description: "Ιδιωτικό link για την ομάδα πεδίου." },
  { title: "Κατηγορίες και προϊόντα", description: "Οργανωμένο μενού που ενημερώνεται εύκολα." },
  { title: "Χρεώσιμα extras", description: "Extras και επιλογές με σωστή τιμολόγηση." },
  { title: "Ολοκλήρωση παραγγελιών", description: "Κατάσταση παραγγελίας για λιγότερο χάος." },
  { title: "Χωρίς app download", description: "Ο πελάτης ανοίγει απευθείας από το QR." },
  { title: "Χωρίς POS integration", description: "Απλό setup — χωρίς πολύπλοκες ενσωματώσεις." },
  { title: "Χωρίς online πληρωμές πελατών", description: "Οι πληρωμές μένουν όπως ήδη δουλεύεις." },
] as const;

export const useCases = [
  {
    title: "Καφετέριες",
    description: "Γρήγορα ροφήματα και snacks με σταθερή ροή παραγγελιών σε peak ώρες.",
  },
  {
    title: "Bars",
    description: "Ποτά και συνοδευτικά με λιγότερα λάθη και πιο γρήγορο bar service.",
  },
  {
    title: "Beach bars",
    description: "Λιγότερο τρέξιμο στην άμμο — οι πελάτες παραγγέλνουν από το τραπέζι τους.",
  },
  {
    title: "Εστιατόρια",
    description: "Πιάτα και extras με πιο καθαρή επικοινωνία κουζίνας και σερβιτόρων.",
  },
  {
    title: "Ταβέρνες",
    description: "Μεζέδες και μερίδες με απλό QR flow για μεγάλα τραπέζια και παρέες.",
  },
] as const;

export const pricingFeatures = [
  "QR ordering",
  "Dashboard",
  "Waiter view",
  "Προϊόντα, κατηγορίες και extras",
  "Live παραγγελίες",
  "Βασική υποστήριξη",
] as const;

export const faqItems = [
  {
    q: "Χρειάζεται app ο πελάτης;",
    a: "Όχι, ανοίγει από browser με το QR του τραπεζιού.",
  },
  {
    q: "Συνδέεται με POS;",
    a: "Όχι, το Orderly είναι απλό QR ordering και μπορεί να λειτουργήσει χωρίς POS integration.",
  },
  {
    q: "Γίνονται πληρωμές πελατών μέσα από το Orderly;",
    a: "Όχι, οι πληρωμές γίνονται όπως ήδη λειτουργεί το μαγαζί.",
  },
  {
    q: "Μπορούν οι σερβιτόροι να βλέπουν παραγγελίες;",
    a: "Ναι, μέσω waiter view από ιδιωτικό link.",
  },
  {
    q: "Μπορώ να αλλάζω προϊόντα και τιμές;",
    a: "Ναι, από το dashboard μπορείς να διαχειρίζεσαι προϊόντα, κατηγορίες, extras και διαθεσιμότητα.",
  },
] as const;

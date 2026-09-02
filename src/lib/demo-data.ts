export type PrintStation = "bar" | "kitchen";

export type DemoExtra = {
  id: string;
  name: string;
  price: number;
};

export type DemoChoice = {
  id: string;
  name: string;
  price: number;
};

export type DemoOptionGroup = {
  id: string;
  name: string;
  required: boolean;
  choices: DemoChoice[];
};

export type DemoProduct = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  station: PrintStation;
  extras: DemoExtra[];
  optionGroups: DemoOptionGroup[];
};

export type DemoCategory = {
  id: string;
  name: string;
};

export type DemoTableStatus = "free" | "occupied" | "ordering";

export type DemoTable = {
  id: string;
  label: string;
  seats: number;
  status: DemoTableStatus;
};

export type DemoLiveOrderStatus = "new" | "preparing" | "ready";

export type DemoLiveOrder = {
  id: string;
  source: "qr" | "pda" | "takeaway";
  tableLabel: string;
  guestCount: number | null;
  items: { name: string; qty: number; station: PrintStation }[];
  status: DemoLiveOrderStatus;
  minutesAgo: number;
  total: number;
  payment?: "cash" | "card";
};

export type DemoOpenAccount = {
  id: string;
  tableLabel: string;
  guests: number;
  total: number;
  since: string;
  waiter: string;
};

export const venue = {
  name: "Ανεμόεσσα Café-Bar",
  city: "Νάξος",
  demoTable: { id: "t7", label: "Τραπέζι 7" },
  waiter: "Άννα",
} as const;

export const categories: DemoCategory[] = [
  { id: "coffee", name: "Καφέδες" },
  { id: "drinks", name: "Ροφήματα" },
  { id: "cocktails", name: "Κοκτέιλ" },
  { id: "food", name: "Φαγητό" },
  { id: "sweets", name: "Γλυκά" },
];

export const products: DemoProduct[] = [
  {
    id: "freddo-espresso",
    categoryId: "coffee",
    name: "Freddo espresso",
    description: "Διπλός εσπρέσο με πάγο.",
    price: 3.5,
    station: "bar",
    extras: [
      { id: "syrup-vanilla", name: "Σιρόπι βανίλια", price: 0.4 },
      { id: "syrup-coconut", name: "Σιρόπι καρύδα", price: 0.4 },
      { id: "extra-shot", name: "Έξτρα shot", price: 0.6 },
    ],
    optionGroups: [
      {
        id: "sugar",
        name: "Ζάχαρη",
        required: true,
        choices: [
          { id: "no-sugar", name: "Σκέτος", price: 0 },
          { id: "medium", name: "Μέτριος", price: 0 },
          { id: "sweet", name: "Γλυκός", price: 0 },
        ],
      },
    ],
  },
  {
    id: "ice-latte",
    categoryId: "coffee",
    name: "Ice latte",
    description: "Εσπρέσο με κρύο γάλα.",
    price: 4.2,
    station: "bar",
    extras: [
      { id: "oat", name: "Γάλα βρώμης", price: 0.5 },
      { id: "caramel", name: "Καραμέλα", price: 0.4 },
    ],
    optionGroups: [
      {
        id: "milk",
        name: "Γάλα",
        required: true,
        choices: [
          { id: "fresh", name: "Φρέσκο", price: 0 },
          { id: "almond", name: "Αμυγδάλου", price: 0.4 },
          { id: "oat-base", name: "Βρώμης", price: 0.4 },
        ],
      },
    ],
  },
  {
    id: "cappuccino",
    categoryId: "coffee",
    name: "Cappuccino",
    description: "Κλασικός, με αφρόγαλα.",
    price: 3.8,
    station: "bar",
    extras: [{ id: "cinnamon", name: "Κανέλα", price: 0 }],
    optionGroups: [],
  },
  {
    id: "fresh-orange",
    categoryId: "drinks",
    name: "Φυσικός χυμός πορτοκάλι",
    description: "Στυμμένος την ώρα.",
    price: 4.5,
    station: "bar",
    extras: [],
    optionGroups: [
      {
        id: "ice",
        name: "Πάγος",
        required: true,
        choices: [
          { id: "ice-yes", name: "Με πάγο", price: 0 },
          { id: "ice-no", name: "Χωρίς πάγο", price: 0 },
        ],
      },
    ],
  },
  {
    id: "soda",
    categoryId: "drinks",
    name: "Σόδα λεμόνι",
    description: "Ανθρακούχο με φέτα λεμονιού.",
    price: 3.0,
    station: "bar",
    extras: [],
    optionGroups: [],
  },
  {
    id: "negroni",
    categoryId: "cocktails",
    name: "Negroni",
    description: "Gin, Campari, vermouth.",
    price: 11.0,
    station: "bar",
    extras: [{ id: "orange-zest", name: "Ξύσμα πορτοκαλιού", price: 0 }],
    optionGroups: [],
  },
  {
    id: "aperol",
    categoryId: "cocktails",
    name: "Aperol spritz",
    description: "Aperol, prosecco, σόδα.",
    price: 9.5,
    station: "bar",
    extras: [],
    optionGroups: [],
  },
  {
    id: "club-sandwich",
    categoryId: "food",
    name: "Club sandwich",
    description: "Κοτόπουλο, μπέικον, σαλάτα. Πατάτες.",
    price: 9.8,
    station: "kitchen",
    extras: [
      { id: "no-tomato", name: "Χωρίς ντομάτα", price: 0 },
      { id: "extra-bacon", name: "Έξτρα μπέικον", price: 1.2 },
      { id: "fries-upgrade", name: "Γλυκοπατάτα", price: 1.0 },
    ],
    optionGroups: [
      {
        id: "bread",
        name: "Ψωμί",
        required: true,
        choices: [
          { id: "white", name: "Λευκό", price: 0 },
          { id: "whole", name: "Ολικής", price: 0 },
        ],
      },
    ],
  },
  {
    id: "greek-salad",
    categoryId: "food",
    name: "Χωριάτικη",
    description: "Ντομάτα, αγγούρι, φέτα, ελιά.",
    price: 8.5,
    station: "kitchen",
    extras: [{ id: "extra-feta", name: "Έξτρα φέτα", price: 1.5 }],
    optionGroups: [],
  },
  {
    id: "toast-egg",
    categoryId: "food",
    name: "Toast αυγό",
    description: "Αυγό, τυρί, γαλοπούλα.",
    price: 5.2,
    station: "kitchen",
    extras: [],
    optionGroups: [],
  },
  {
    id: "cheesecake",
    categoryId: "sweets",
    name: "Cheesecake φράουλα",
    description: "Σπιτικό, με φρέσκια φράουλα.",
    price: 6.5,
    station: "kitchen",
    extras: [],
    optionGroups: [],
  },
  {
    id: "chocolate-cake",
    categoryId: "sweets",
    name: "Σοκολατόπιτα",
    description: "Ζεστή, με παγωτό βανίλια.",
    price: 6.8,
    station: "kitchen",
    extras: [{ id: "ice-cream", name: "Παγωτό βανίλια", price: 1.5 }],
    optionGroups: [],
  },
];

export const waiterTables: DemoTable[] = [
  { id: "t3", label: "3", seats: 2, status: "occupied" },
  { id: "t4", label: "4", seats: 4, status: "free" },
  { id: "t5", label: "5", seats: 4, status: "occupied" },
  { id: "t7", label: "7", seats: 4, status: "free" },
  { id: "t8", label: "8", seats: 2, status: "ordering" },
  { id: "t9", label: "9", seats: 6, status: "free" },
  { id: "t11", label: "11", seats: 4, status: "occupied" },
  { id: "t12", label: "12", seats: 2, status: "free" },
];

export const seedOpenAccounts: DemoOpenAccount[] = [
  { id: "acc-3", tableLabel: "Τραπέζι 3", guests: 2, total: 18.4, since: "12:10", waiter: "Άννα" },
  { id: "acc-5", tableLabel: "Τραπέζι 5", guests: 4, total: 42.9, since: "12:28", waiter: "Άννα" },
  { id: "acc-11", tableLabel: "Τραπέζι 11", guests: 3, total: 27.5, since: "12:41", waiter: "Γιώργος" },
];

export const seedLiveOrders: DemoLiveOrder[] = [
  {
    id: "ord-1042",
    source: "qr",
    tableLabel: "Τραπέζι 12",
    guestCount: 2,
    items: [
      { name: "Freddo espresso", qty: 2, station: "bar" },
      { name: "Club sandwich", qty: 1, station: "kitchen" },
    ],
    status: "new",
    minutesAgo: 1,
    total: 16.8,
  },
  {
    id: "ord-1041",
    source: "pda",
    tableLabel: "Τραπέζι 5",
    guestCount: 4,
    items: [
      { name: "Aperol spritz", qty: 2, station: "bar" },
      { name: "Χωριάτικη", qty: 1, station: "kitchen" },
    ],
    status: "preparing",
    minutesAgo: 6,
    total: 27.5,
  },
  {
    id: "ord-1040",
    source: "takeaway",
    tableLabel: "Take Away",
    guestCount: null,
    items: [
      { name: "Ice latte", qty: 1, station: "bar" },
      { name: "Toast αυγό", qty: 2, station: "kitchen" },
    ],
    status: "ready",
    minutesAgo: 11,
    total: 14.6,
  },
  {
    id: "ord-1038",
    source: "pda",
    tableLabel: "Τραπέζι 3",
    guestCount: 2,
    items: [{ name: "Negroni", qty: 2, station: "bar" }],
    status: "preparing",
    minutesAgo: 14,
    total: 22.0,
  },
];

export const analytics = {
  todayRevenue: 486.4,
  cash: 210.0,
  card: 276.4,
  orderCount: 34,
  avgTicket: 14.3,
  takeawayCount: 7,
  openTables: 5,
  hourly: [
    { hour: "10:00", value: 22 },
    { hour: "11:00", value: 38 },
    { hour: "12:00", value: 61 },
    { hour: "13:00", value: 84 },
    { hour: "14:00", value: 72 },
    { hour: "15:00", value: 48 },
    { hour: "16:00", value: 41 },
    { hour: "17:00", value: 55 },
    { hour: "18:00", value: 66 },
  ],
  topProducts: [
    { name: "Freddo espresso", qty: 48, revenue: 168.0 },
    { name: "Aperol spritz", qty: 19, revenue: 180.5 },
    { name: "Club sandwich", qty: 14, revenue: 137.2 },
    { name: "Ice latte", qty: 21, revenue: 88.2 },
    { name: "Χωριάτικη", qty: 9, revenue: 76.5 },
  ],
  waiters: [
    { name: "Άννα", orders: 16, revenue: 214.8 },
    { name: "Γιώργος", orders: 11, revenue: 162.4 },
    { name: "Ελένη", orders: 7, revenue: 109.2 },
  ],
  shift: {
    name: "Μεσημέρι",
    range: "10:00 – 16:00",
    revenue: 318.6,
    cash: 142.0,
    card: 176.6,
    orders: 22,
  },
} as const;


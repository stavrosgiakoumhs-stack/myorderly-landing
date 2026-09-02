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
  takeawayPrice: number;
  station: PrintStation;
  extras: DemoExtra[];
  optionGroups: DemoOptionGroup[];
  available?: boolean;
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

export type DemoWaiterStaff = {
  id: string;
  name: string;
  role: string;
  tables: string[];
  active: boolean;
};

export type DemoShift = {
  id: string;
  name: string;
  waiter: string;
  range: string;
  startedAt: string;
  status: "open" | "closed";
  revenue: number;
  cash: number;
  card: number;
  orders: number;
};

export type AnalyticsPreset = "today" | "yesterday" | "7d" | "30d" | "custom";

export type DemoAnalytics = {
  collections: number;
  sales: number;
  orderCount: number;
  avgTicket: number;
  cash: number;
  card: number;
  closedAccounts: number;
  openAccounts: number;
  takeawayCollections: number;
  takeawayCompleted: number;
  hourly: { hour: string; value: number }[];
  daily: { label: string; value: number }[];
  topProducts: { name: string; qty: number; revenue: number }[];
  topCategories: { name: string; qty: number; revenue: number }[];
  waiters: { name: string; orders: number; revenue: number }[];
};

export type DemoOrderItem = {
  id: string;
  product_name_snapshot: string;
  quantity: number;
  total_price: number;
  extras: { id: string; name_snapshot: string; price_snapshot: number }[];
  options: { id: string; item_name_snapshot: string; price_delta_snapshot: number }[];
  note: string;
};

export type DemoWaiterOrder = {
  id: string;
  order_number: number;
  order_type: "dine_in" | "takeaway";
  table_id: string | null;
  table_name: string | null;
  guest_count: number | null;
  total_amount: number;
  customer_note: string;
  handled_at: string | null;
  created_at: string;
  items: DemoOrderItem[];
  source: "qr" | "pda" | "takeaway";
  status: DemoLiveOrderStatus;
};

export const venue = {
  name: "Ανεμόεσσα Café-Bar",
  city: "Νάξος",
  demoTable: { id: "t7", label: "7" },
  waiter: "Άννα",
  waiterId: "waiter-anna",
  sessionStartedAt: "2026-09-02T10:02:00.000Z",
  shiftStartedAt: "2026-09-02T10:00:00.000Z",
} as const;

export function productPrice(product: DemoProduct, takeaway = false): number {
  return takeaway ? product.takeawayPrice : product.price;
}

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
    takeawayPrice: 3.5,
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
    takeawayPrice: 4.7,
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
    takeawayPrice: 3.8,
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
    takeawayPrice: 4.5,
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
    takeawayPrice: 3.0,
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
    takeawayPrice: 11.0,
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
    takeawayPrice: 10.0,
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
    takeawayPrice: 8.9,
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
    takeawayPrice: 8.5,
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
    takeawayPrice: 5.5,
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
    takeawayPrice: 6.5,
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
    takeawayPrice: 7.2,
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

/** Tables currently assigned to Anna's PDA shift. Table 11 belongs to Giorgos (owner view only). */
export const annaWaiterTables: DemoTable[] = waiterTables.filter((table) => table.id !== "t11");

export const seedOpenAccounts: DemoOpenAccount[] = [
  { id: "acc-3", tableLabel: "Τραπέζι 3", guests: 2, total: 18.4, since: "12:10", waiter: "Άννα" },
  { id: "acc-5", tableLabel: "Τραπέζι 5", guests: 4, total: 42.9, since: "12:28", waiter: "Άννα" },
  { id: "acc-11", tableLabel: "Τραπέζι 11", guests: 3, total: 27.5, since: "12:41", waiter: "Γιώργος" },
];

export const annaOpenAccounts: DemoOpenAccount[] = seedOpenAccounts.filter(
  (account) => account.waiter === venue.waiter,
);

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

export const staffWaiters: DemoWaiterStaff[] = [
  { id: "waiter-anna", name: "Άννα", role: "Σερβιτόρος", tables: ["3", "4", "5", "7", "8", "9", "12"], active: true },
  { id: "waiter-giorgos", name: "Γιώργος", role: "Σερβιτόρος", tables: ["11"], active: true },
  { id: "waiter-eleni", name: "Ελένη", role: "Σερβιτόρος", tables: [], active: false },
];

export const shifts: DemoShift[] = [
  {
    id: "shift-midday",
    name: "Μεσημέρι",
    waiter: "Άννα",
    range: "10:00 – 16:00",
    startedAt: venue.shiftStartedAt,
    status: "open",
    revenue: 318.6,
    cash: 142.0,
    card: 176.6,
    orders: 22,
  },
  {
    id: "shift-giorgos",
    name: "Μεσημέρι",
    waiter: "Γιώργος",
    range: "10:00 – 16:00",
    startedAt: "2026-09-02T10:05:00.000Z",
    status: "open",
    revenue: 162.4,
    cash: 68.0,
    card: 94.4,
    orders: 11,
  },
];

export const printStations = [
  {
    id: "bar",
    name: "Bar",
    destination: "Θερμικός εκτυπωτής bar",
    categories: ["Καφέδες", "Ροφήματα", "Κοκτέιλ"],
  },
  {
    id: "kitchen",
    name: "Κουζίνα",
    destination: "Θερμικός εκτυπωτής κουζίνας",
    categories: ["Φαγητό", "Γλυκά"],
  },
] as const;

export const seedWaiterOrders: DemoWaiterOrder[] = [
  {
    id: "ord-1038",
    order_number: 1038,
    order_type: "dine_in",
    table_id: "t3",
    table_name: "3",
    guest_count: 2,
    total_amount: 22.0,
    customer_note: "",
    handled_at: null,
    created_at: "2026-09-02T12:10:00.000Z",
    source: "pda",
    status: "preparing",
    items: [
      {
        id: "i-1038-1",
        product_name_snapshot: "Negroni",
        quantity: 2,
        total_price: 22.0,
        extras: [],
        options: [],
        note: "",
      },
    ],
  },
  {
    id: "ord-1041",
    order_number: 1041,
    order_type: "dine_in",
    table_id: "t5",
    table_name: "5",
    guest_count: 4,
    total_amount: 42.9,
    customer_note: "Όλα μαζί",
    handled_at: null,
    created_at: "2026-09-02T12:28:00.000Z",
    source: "pda",
    status: "preparing",
    items: [
      {
        id: "i-1041-1",
        product_name_snapshot: "Aperol spritz",
        quantity: 2,
        total_price: 19.0,
        extras: [],
        options: [],
        note: "",
      },
      {
        id: "i-1041-2",
        product_name_snapshot: "Χωριάτικη",
        quantity: 1,
        total_price: 8.5,
        extras: [{ id: "ex-1", name_snapshot: "Έξτρα φέτα", price_snapshot: 1.5 }],
        options: [],
        note: "",
      },
      {
        id: "i-1041-3",
        product_name_snapshot: "Club sandwich",
        quantity: 1,
        total_price: 9.8,
        extras: [],
        options: [{ id: "op-1", item_name_snapshot: "Λευκό", price_delta_snapshot: 0 }],
        note: "Χωρίς μαγιονέζα",
      },
    ],
  },
  {
    id: "ord-1040",
    order_number: 1040,
    order_type: "takeaway",
    table_id: null,
    table_name: null,
    guest_count: null,
    total_amount: 14.6,
    customer_note: "",
    handled_at: null,
    created_at: "2026-09-02T12:34:00.000Z",
    source: "takeaway",
    status: "ready",
    items: [
      {
        id: "i-1040-1",
        product_name_snapshot: "Ice latte",
        quantity: 1,
        total_price: 4.7,
        extras: [],
        options: [{ id: "op-2", item_name_snapshot: "Φρέσκο", price_delta_snapshot: 0 }],
        note: "",
      },
      {
        id: "i-1040-2",
        product_name_snapshot: "Toast αυγό",
        quantity: 2,
        total_price: 10.4,
        extras: [],
        options: [],
        note: "",
      },
    ],
  },
  {
    id: "ord-1035",
    order_number: 1035,
    order_type: "dine_in",
    table_id: "t12",
    table_name: "12",
    guest_count: 2,
    total_amount: 16.8,
    customer_note: "",
    handled_at: "2026-09-02T12:05:00.000Z",
    created_at: "2026-09-02T11:48:00.000Z",
    source: "qr",
    status: "ready",
    items: [
      {
        id: "i-1035-1",
        product_name_snapshot: "Freddo espresso",
        quantity: 2,
        total_price: 7.0,
        extras: [],
        options: [{ id: "op-3", item_name_snapshot: "Μέτριος", price_delta_snapshot: 0 }],
        note: "",
      },
      {
        id: "i-1035-2",
        product_name_snapshot: "Club sandwich",
        quantity: 1,
        total_price: 9.8,
        extras: [],
        options: [],
        note: "",
      },
    ],
  },
];

export const annaWaiterOrders: DemoWaiterOrder[] = seedWaiterOrders.filter((order) => {
  if (order.order_type === "takeaway") return true;
  if (!order.table_id) return false;
  return annaWaiterTables.some((table) => table.id === order.table_id);
});

const todayAnalytics: DemoAnalytics = {
  collections: 486.4,
  sales: 512.8,
  orderCount: 34,
  avgTicket: 14.3,
  cash: 210.0,
  card: 276.4,
  closedAccounts: 18,
  openAccounts: 5,
  takeawayCollections: 86.2,
  takeawayCompleted: 7,
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
  daily: [
    { label: "Σαβ", value: 38 },
    { label: "Κυρ", value: 52 },
    { label: "Δευ", value: 61 },
    { label: "Τρι", value: 58 },
    { label: "Τετ", value: 74 },
    { label: "Πεμ", value: 69 },
    { label: "Παρ", value: 84 },
  ],
  topProducts: [
    { name: "Freddo espresso", qty: 48, revenue: 168.0 },
    { name: "Aperol spritz", qty: 19, revenue: 180.5 },
    { name: "Club sandwich", qty: 14, revenue: 137.2 },
    { name: "Ice latte", qty: 21, revenue: 88.2 },
    { name: "Χωριάτικη", qty: 9, revenue: 76.5 },
  ],
  topCategories: [
    { name: "Καφέδες", qty: 92, revenue: 312.4 },
    { name: "Κοκτέιλ", qty: 28, revenue: 286.0 },
    { name: "Φαγητό", qty: 31, revenue: 248.9 },
    { name: "Γλυκά", qty: 12, revenue: 79.6 },
  ],
  waiters: [
    { name: "Άννα", orders: 16, revenue: 214.8 },
    { name: "Γιώργος", orders: 11, revenue: 162.4 },
    { name: "Ελένη", orders: 7, revenue: 109.2 },
  ],
};

function scaleAnalytics(base: DemoAnalytics, factor: number, orderFactor: number): DemoAnalytics {
  const round = (value: number) => Math.round(value * 10) / 10;
  return {
    collections: round(base.collections * factor),
    sales: round(base.sales * factor),
    orderCount: Math.round(base.orderCount * orderFactor),
    avgTicket: round(base.avgTicket * (factor / orderFactor)),
    cash: round(base.cash * factor),
    card: round(base.card * factor),
    closedAccounts: Math.round(base.closedAccounts * orderFactor),
    openAccounts: factor < 1 ? 0 : base.openAccounts,
    takeawayCollections: round(base.takeawayCollections * factor),
    takeawayCompleted: Math.round(base.takeawayCompleted * orderFactor),
    hourly: base.hourly.map((row) => ({ ...row, value: round(row.value * factor) })),
    daily: base.daily.map((row) => ({ ...row, value: round(row.value * factor) })),
    topProducts: base.topProducts.map((row) => ({
      ...row,
      qty: Math.round(row.qty * orderFactor),
      revenue: round(row.revenue * factor),
    })),
    topCategories: base.topCategories.map((row) => ({
      ...row,
      qty: Math.round(row.qty * orderFactor),
      revenue: round(row.revenue * factor),
    })),
    waiters: base.waiters.map((row) => ({
      ...row,
      orders: Math.round(row.orders * orderFactor),
      revenue: round(row.revenue * factor),
    })),
  };
}

export const analyticsByPreset: Record<AnalyticsPreset, DemoAnalytics> = {
  today: todayAnalytics,
  yesterday: scaleAnalytics(todayAnalytics, 0.86, 0.82),
  "7d": scaleAnalytics(todayAnalytics, 6.1, 6.4),
  "30d": scaleAnalytics(todayAnalytics, 24.2, 25.1),
  custom: scaleAnalytics(todayAnalytics, 4.4, 4.6),
};

export const analytics = {
  todayRevenue: todayAnalytics.collections,
  cash: todayAnalytics.cash,
  card: todayAnalytics.card,
  orderCount: todayAnalytics.orderCount,
  avgTicket: todayAnalytics.avgTicket,
  takeawayCount: todayAnalytics.takeawayCompleted,
  openTables: todayAnalytics.openAccounts,
  hourly: todayAnalytics.hourly,
  topProducts: todayAnalytics.topProducts,
  waiters: todayAnalytics.waiters,
  shift: {
    name: shifts[0].name,
    range: shifts[0].range,
    revenue: shifts[0].revenue,
    cash: shifts[0].cash,
    card: shifts[0].card,
    orders: shifts[0].orders,
  },
} as const;


"use client";

import { useState } from "react";
import {
  analyticsByPreset,
  categories,
  printStations,
  products,
  seedLiveOrders,
  seedOpenAccounts,
  shifts,
  staffWaiters,
  venue,
  waiterTables,
  type AnalyticsPreset,
  type DemoLiveOrder,
} from "@/lib/demo-data";
import { formatAmountEuro } from "@/lib/money";
import { formatTableDisplayName } from "@/lib/demo-format";
import { DashboardBackHeader, DashboardHomeHeader } from "./DashboardHeader";

type OwnerView =
  | "home"
  | "orders"
  | "products"
  | "categories"
  | "tables"
  | "waiters"
  | "shifts"
  | "prints"
  | "settings";

const navCards: { id: Exclude<OwnerView, "home">; title: string; body: string }[] = [
  { id: "orders", title: "Orders", body: "Live orders and open table accounts." },
  { id: "products", title: "Products", body: "Manage products." },
  { id: "categories", title: "Categories", body: "Manage categories." },
  { id: "tables", title: "Tables & QR", body: "Tables and QR codes." },
  { id: "waiters", title: "Waiters", body: "Manage waiters." },
  { id: "shifts", title: "Shifts", body: "Open and closed shifts." },
  { id: "prints", title: "Εκτυπώσεις", body: "Σταθμοί εκτύπωσης Bar / Κουζίνα και δρομολόγηση παραγγελιών." },
  { id: "settings", title: "Settings", body: "Shop settings." },
];

const datePresets: { id: AnalyticsPreset; label: string }[] = [
  { id: "today", label: "Σήμερα" },
  { id: "yesterday", label: "Χθες" },
  { id: "7d", label: "7 ημέρες" },
  { id: "30d", label: "30 ημέρες" },
  { id: "custom", label: "Προσαρμογή" },
];

const statusLabel: Record<DemoLiveOrder["status"], string> = {
  new: "Νέα",
  preparing: "Σε ετοιμασία",
  ready: "Έτοιμη",
};

const sourceLabel = {
  qr: "QR πελάτη",
  pda: "Waiter PDA",
  takeaway: "Take away",
} as const;

export function OwnerDemo() {
  const [view, setView] = useState<OwnerView>("home");
  const [preset, setPreset] = useState<AnalyticsPreset>("today");
  const [unseenOrders, setUnseenOrders] = useState(2);
  const [liveOrders, setLiveOrders] = useState(seedLiveOrders);
  const [available, setAvailable] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(products.map((product) => [product.id, true])),
  );
  const activeCard = navCards.find((card) => card.id === view);

  function openView(next: Exclude<OwnerView, "home">) {
    if (next === "orders") setUnseenOrders(0);
    setView(next);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        {view === "home" ? (
          <>
            <DashboardHomeHeader shopName={venue.name} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {navCards.map((card) => (
                <button
                  key={card.id}
                  className="relative rounded-2xl border border-blue-100 bg-white p-5 text-left shadow-sm shadow-blue-950/5 transition hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => openView(card.id)}
                  type="button"
                >
                  {card.id === "orders" && unseenOrders > 0 ? (
                    <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                      {unseenOrders} νέα
                    </span>
                  ) : null}
                  <p className="pr-16 text-lg font-semibold text-slate-950">{card.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{card.body}</p>
                </button>
              ))}
            </div>
            <DashboardAnalytics preset={preset} onPresetChange={setPreset} />
          </>
        ) : (
          <DashboardBackHeader
            description={activeCard?.body ?? ""}
            onBack={() => setView("home")}
            title={activeCard?.title ?? ""}
          />
        )}

        {view === "orders" ? <OrdersView orders={liveOrders} onStatus={setLiveOrders} /> : null}
        {view === "products" ? <ProductsView available={available} onToggle={setAvailable} /> : null}
        {view === "categories" ? <CategoriesView /> : null}
        {view === "tables" ? <TablesView /> : null}
        {view === "waiters" ? <WaitersView /> : null}
        {view === "shifts" ? <ShiftsView /> : null}
        {view === "prints" ? <PrintsView /> : null}
        {view === "settings" ? <SettingsView /> : null}
      </div>
    </main>
  );
}

function DashboardAnalytics({
  preset,
  onPresetChange,
}: {
  preset: AnalyticsPreset;
  onPresetChange: (preset: AnalyticsPreset) => void;
}) {
  const [grain, setGrain] = useState<"hour" | "day">("hour");
  const data = analyticsByPreset[preset];
  const series = grain === "hour" ? data.hourly.map((row) => ({ label: row.hour.slice(0, 2), value: row.value })) : data.daily;
  const maxBar = Math.max(...series.map((row) => row.value), 1);
  const maxWaiter = Math.max(...data.waiters.map((row) => row.revenue), 1);
  const payTotal = data.cash + data.card;

  return (
    <section className="mt-10 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-slate-950">Επισκόπηση επιχείρησης</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Τα ποσά ακολουθούν την ώρα Europe/Athens. Οι ανοιχτοί λογαριασμοί είναι η τρέχουσα κατάσταση, όχι ιστορικό
            περιόδου. Demo δεδομένα — δεν είναι live σύνδεση.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {datePresets.map((item) => {
            const active = preset === item.id;
            return (
              <button
                key={item.id}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${
                  active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-200 bg-white text-blue-700"
                }`}
                onClick={() => onPresetChange(item.id)}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      {preset === "custom" ? (
        <p className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm font-semibold text-slate-700">
          Προσαρμογή · 26/08/2026 – 01/09/2026 (demo εύρος)
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Εισπράξεις" value={formatAmountEuro(data.collections)} />
        <StatCard label="Πωλήσεις" value={formatAmountEuro(data.sales)} />
        <StatCard label="Παραγγελίες" value={String(data.orderCount)} />
        <StatCard label="Μέσος λογαριασμός" value={formatAmountEuro(data.avgTicket)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Μετρητά" value={formatAmountEuro(data.cash)} />
        <StatCard label="Κάρτες" value={formatAmountEuro(data.card)} />
        <StatCard label="Κλεισμένοι λογαριασμοί" value={String(data.closedAccounts)} />
        <StatCard label="Ανοιχτοί λογαριασμοί (τώρα)" value={String(data.openAccounts)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Take away εισπράξεις" value={formatAmountEuro(data.takeawayCollections)} />
        <StatCard label="Take away ολοκληρωμένα" value={String(data.takeawayCompleted)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-950">Εισπράξεις στο χρόνο</h3>
            <div className="flex gap-2">
              {(
                [
                  { id: "hour" as const, label: "Ανά ώρα" },
                  { id: "day" as const, label: "Ανά ημέρα" },
                ] as const
              ).map((item) => {
                const active = grain === item.id;
                return (
                  <button
                    key={item.id}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-200 bg-white text-blue-700"
                    }`}
                    onClick={() => setGrain(item.id)}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex h-32 items-end gap-1.5">
            {series.map((row) => (
              <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1" key={row.label}>
                <span
                  className="w-full min-h-2 rounded-t bg-blue-600"
                  style={{ height: `${Math.max((row.value / maxBar) * 104, 8)}px` }}
                />
                <span className="text-[10px] font-semibold text-slate-500">{row.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5">
          <h3 className="text-base font-bold text-slate-950">Τρόπος πληρωμής</h3>
          <div className="mt-4 space-y-3">
            <PayRow label="Μετρητά" value={data.cash} total={payTotal} />
            <PayRow label="Κάρτες" value={data.card} total={payTotal} />
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5">
          <h3 className="text-base font-bold text-slate-950">Κορυφαία προϊόντα</h3>
          <ul className="mt-3 space-y-2">
            {data.topProducts.map((row) => (
              <li className="flex items-center justify-between gap-3 text-sm" key={row.name}>
                <span className="font-semibold text-slate-950">{row.name}</span>
                <span className="text-slate-600">
                  {row.qty} · {formatAmountEuro(row.revenue)}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5">
          <h3 className="text-base font-bold text-slate-950">Κορυφαίες κατηγορίες</h3>
          <ul className="mt-3 space-y-2">
            {data.topCategories.map((row) => (
              <li className="flex items-center justify-between gap-3 text-sm" key={row.name}>
                <span className="font-semibold text-slate-950">{row.name}</span>
                <span className="text-slate-600">
                  {row.qty} · {formatAmountEuro(row.revenue)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5">
        <h3 className="text-base font-bold text-slate-950">Απόδοση σερβιτόρων</h3>
        <ul className="mt-4 space-y-3">
          {data.waiters.map((waiter) => (
            <li key={waiter.name}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-950">{waiter.name}</span>
                <span className="text-slate-600">
                  {waiter.orders} παραγγελίες · {formatAmountEuro(waiter.revenue)}
                </span>
              </div>
              <span className="mt-1 block h-2 overflow-hidden rounded-full bg-blue-50">
                <span className="block h-full rounded-full bg-blue-600" style={{ width: `${(waiter.revenue / maxWaiter) * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

function OrdersView({
  orders,
  onStatus,
}: {
  orders: DemoLiveOrder[];
  onStatus: (orders: DemoLiveOrder[]) => void;
}) {
  function cycle(order: DemoLiveOrder) {
    const next: DemoLiveOrder["status"] = order.status === "new" ? "preparing" : order.status === "preparing" ? "ready" : "new";
    onStatus(orders.map((item) => (item.id === order.id ? { ...item, status: next } : item)));
  }

  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-slate-600">Ζωντανές παραγγελίες · demo δεδομένα, χωρίς live σύνδεση.</p>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={order.id}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-lg font-black text-slate-950">{order.tableLabel}</p>
                <p className="text-xs font-semibold text-slate-500">
                  {sourceLabel[order.source]}
                  {order.guestCount ? ` · ${order.guestCount} άτομα` : ""} · πριν {order.minutesAgo}λ
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  order.status === "new"
                    ? "bg-emerald-50 text-emerald-800"
                    : order.status === "ready"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-800"
                }`}
              >
                {statusLabel[order.status]}
              </span>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.name}`}>
                  {item.qty}× {item.name}{" "}
                  <span className="text-xs font-semibold text-blue-700">{item.station === "bar" ? "Bar" : "Κουζίνα"}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-black text-blue-700">{formatAmountEuro(order.total)}</p>
              <button
                className="rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700"
                onClick={() => cycle(order)}
                type="button"
              >
                Αλλαγή κατάστασης (Demo)
              </button>
            </div>
          </li>
        ))}
      </ul>
      <section>
        <h2 className="text-base font-bold text-slate-950">Ανοιχτοί λογαριασμοί</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {seedOpenAccounts.map((account) => (
            <li className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={account.id}>
              <p className="font-black text-slate-950">{account.tableLabel}</p>
              <p className="text-xs font-semibold text-slate-500">
                {account.guests} άτομα · από {account.since} · {account.waiter}
              </p>
              <p className="mt-2 text-sm font-black text-blue-700">{formatAmountEuro(account.total)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ProductsView({
  available,
  onToggle,
}: {
  available: Record<string, boolean>;
  onToggle: (next: Record<string, boolean>) => void;
}) {
  return (
    <ul className="mt-6 space-y-2">
      {products.map((product) => (
        <li className="flex items-start justify-between gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={product.id}>
          <div>
            <p className="font-semibold text-slate-950">{product.name}</p>
            <p className="mt-1 text-sm text-slate-600">{product.description}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {categories.find((category) => category.id === product.categoryId)?.name} ·{" "}
              {product.station === "bar" ? "Bar" : "Κουζίνα"} · extras {product.extras.length}
              {product.takeawayPrice !== product.price ? ` · Take away ${formatAmountEuro(product.takeawayPrice)}` : ""}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-black text-blue-700">{formatAmountEuro(product.price)}</p>
            <button
              className={`mt-2 rounded-full px-3 py-1 text-xs font-bold ${
                available[product.id] ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-500"
              }`}
              onClick={() => onToggle({ ...available, [product.id]: !available[product.id] })}
              type="button"
            >
              {available[product.id] ? "Διαθέσιμο" : "Μη διαθέσιμο"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CategoriesView() {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {categories.map((category) => {
        const count = products.filter((product) => product.categoryId === category.id).length;
        return (
          <li className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4" key={category.id}>
            <p className="font-black text-slate-950">{category.name}</p>
            <p className="mt-1 text-sm text-slate-600">{count} προϊόντα</p>
          </li>
        );
      })}
    </ul>
  );
}

function TablesView() {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {waiterTables.map((table) => (
        <li className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={table.id}>
          <p className="text-lg font-black text-slate-950">{formatTableDisplayName(table.label)}</p>
          <p className="text-xs font-semibold text-slate-500">{table.seats} θέσεις</p>
          <div className="mt-3 grid grid-cols-5 gap-1 rounded-xl border border-blue-100 bg-white p-2">
            {Array.from({ length: 25 }, (_, index) => (
              <span
                key={index}
                className={`aspect-square rounded-[2px] ${index % 3 === 0 || index % 7 === 0 ? "bg-slate-950" : "bg-white"}`}
              />
            ))}
          </div>
          <p className="mt-2 truncate text-[11px] font-medium text-slate-500">/o/anemoessa/t/{table.id}</p>
        </li>
      ))}
    </ul>
  );
}

function WaitersView() {
  return (
    <ul className="mt-6 space-y-3">
      {staffWaiters.map((waiter) => (
        <li className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={waiter.id}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-black text-slate-950">{waiter.name}</p>
              <p className="text-sm text-slate-600">{waiter.role}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${waiter.active ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
              {waiter.active ? "Ενεργός" : "Εκτός βάρδιας"}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {waiter.tables.length === 0 ? (
              <span className="text-sm text-slate-500">Χωρίς ανατεθειμένα τραπέζια</span>
            ) : (
              waiter.tables.map((table) => (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700" key={table}>
                  {table}
                </span>
              ))
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function ShiftsView() {
  return (
    <ul className="mt-6 space-y-3">
      {shifts.map((shift) => (
        <li className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={shift.id}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-black text-slate-950">
                {shift.name} · {shift.waiter}
              </p>
              <p className="text-sm text-slate-600">{shift.range}</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {shift.status === "open" ? "Ανοιχτή" : "Κλειστή"}
            </span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-xs text-slate-500">Έσοδα</dt>
              <dd className="font-black text-slate-950">{formatAmountEuro(shift.revenue)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Μετρητά</dt>
              <dd className="font-black text-slate-950">{formatAmountEuro(shift.cash)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Κάρτα</dt>
              <dd className="font-black text-slate-950">{formatAmountEuro(shift.card)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Παραγγελίες</dt>
              <dd className="font-black text-slate-950">{shift.orders}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

function PrintsView() {
  const sample = seedLiveOrders[0];
  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-slate-600">
        Το Orderly Print χωρίζει την παραγγελία ανά σημείο παραγωγής. Demo tickets για {sample.tableLabel}.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {printStations.map((station) => (
          <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5" key={station.id}>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Orderly Print</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">{station.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{station.destination}</p>
            <p className="mt-3 text-xs font-semibold text-slate-500">{station.categories.join(" · ")}</p>
            <ul className="mt-4 space-y-1 font-mono text-sm text-slate-800">
              {sample.items
                .filter((item) => item.station === station.id)
                .map((item) => (
                  <li key={item.name}>
                    {item.qty}× {item.name}
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="mt-6 max-w-md rounded-2xl border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Κατάστημα</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{venue.name}</h2>
      <p className="mt-1 text-sm text-slate-600">{venue.city}</p>
      <dl className="mt-6 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-semibold text-slate-500">Όνομα</dt>
          <dd className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-950">{venue.name}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-slate-500">Πόλη</dt>
          <dd className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-950">{venue.city}</dd>
        </div>
      </dl>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
        Demo ρυθμίσεις — δεν αποθηκεύονται και δεν συνδέονται με πραγματικό λογαριασμό.
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function PayRow({ label, value, total }: { label: string; value: number; total: number }) {
  const width = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-slate-950">{label}</span>
        <span className="text-slate-600">{formatAmountEuro(value)}</span>
      </div>
      <span className="mt-1 block h-2 overflow-hidden rounded-full bg-blue-50">
        <span className="block h-full rounded-full bg-blue-600" style={{ width: `${width}%` }} />
      </span>
    </div>
  );
}

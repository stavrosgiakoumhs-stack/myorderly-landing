"use client";

import { useState } from "react";
import {
  analytics,
  products,
  seedLiveOrders,
  seedOpenAccounts,
  venue,
  type DemoLiveOrder,
} from "@/lib/demo-data";
import { formatEuro } from "@/lib/money";

const tabs = [
  { id: "live", label: "Ζωντανά" },
  { id: "products", label: "Προϊόντα" },
  { id: "print", label: "Εκτυπώσεις" },
  { id: "reports", label: "Αναφορές" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const statusLabel: Record<DemoLiveOrder["status"], string> = {
  new: "Νέα",
  preparing: "Σε ετοιμασία",
  ready: "Έτοιμη",
};

const sourceLabel = {
  qr: "QR πελάτη",
  pda: "Waiter PDA",
  takeaway: "Take Away",
} as const;

export function OwnerDemo() {
  const [tab, setTab] = useState<TabId>("live");
  const [flash, setFlash] = useState<string | null>(null);

  function simulatePrint(order: DemoLiveOrder) {
    const stations = [...new Set(order.items.map((item) => (item.station === "bar" ? "Bar" : "Κουζίνα")))];
    setFlash(`Demo: στάλθηκε στο ${stations.join(" + ")} (${order.tableLabel})`);
    window.setTimeout(() => setFlash(null), 2800);
  }

  return (
    <div className="flex min-h-[32rem] flex-1 flex-col overflow-hidden bg-slate-50 sm:rounded-3xl sm:border sm:border-slate-200 sm:shadow-xl">
      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-orderly-blue">Ιδιοκτήτης · Dashboard</p>
        <h2 className="text-xl font-extrabold text-orderly-navy">{venue.name}</h2>
        <p className="text-sm text-slate-600">Δοκιμαστικά δεδομένα ημέρας — όχι live σύνδεση</p>
        <div className="demo-scroll-hide mt-4 flex gap-2 overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
                tab === item.id ? "bg-orderly-navy text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {flash ? (
        <p className="bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800" role="status">
          {flash}
        </p>
      ) : null}

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {tab === "live" ? <LiveTab onPrint={simulatePrint} /> : null}
        {tab === "products" ? <ProductsTab /> : null}
        {tab === "print" ? <PrintTab onPrint={simulatePrint} /> : null}
        {tab === "reports" ? <ReportsTab /> : null}
      </div>
    </div>
  );
}

function LiveTab({ onPrint }: { onPrint: (order: DemoLiveOrder) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Έσοδα σήμερα" value={formatEuro(analytics.todayRevenue)} />
        <StatCard label="Μετρητά" value={formatEuro(analytics.cash)} />
        <StatCard label="Κάρτα" value={formatEuro(analytics.card)} />
      </div>
      <section>
        <h3 className="text-sm font-bold text-orderly-navy">Ζωντανές παραγγελίες</h3>
        <ul className="mt-3 space-y-3">
          {seedLiveOrders.map((order) => (
            <li key={order.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-orderly-navy">{order.tableLabel}</p>
                  <p className="text-xs text-slate-500">
                    {sourceLabel[order.source]}
                    {order.guestCount ? ` · ${order.guestCount} άτομα` : ""} · πριν {order.minutesAgo}λ
                  </p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusTone(order.status)}`}>
                  {statusLabel[order.status]}
                </span>
              </div>
              <ul className="mt-3 text-sm text-slate-700">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.name}`}>
                    {item.qty}× {item.name}{" "}
                    <span className="text-xs text-slate-400">{item.station === "bar" ? "Bar" : "Κουζίνα"}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-orderly-blue">{formatEuro(order.total)}</p>
                <button
                  type="button"
                  onClick={() => onPrint(order)}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-orderly-navy"
                >
                  Print (Demo)
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-sm font-bold text-orderly-navy">Ανοιχτά τραπέζια</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {seedOpenAccounts.map((account) => (
            <li key={account.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
              <p className="font-semibold text-orderly-navy">{account.tableLabel}</p>
              <p className="text-xs text-slate-500">
                {account.guests} άτομα · από {account.since} · {account.waiter}
              </p>
              <p className="mt-2 text-sm font-bold text-orderly-blue">{formatEuro(account.total)}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-sm font-bold text-orderly-navy">Take Away</h3>
        <p className="mt-2 rounded-2xl bg-white p-4 text-sm text-slate-600 ring-1 ring-slate-100">
          {analytics.takeawayCount} παραγγελίες πακέτου σήμερα. Τελευταία έτοιμη: Ice latte + Toast αυγό (14,60€).
        </p>
      </section>
    </div>
  );
}

function ProductsTab() {
  return (
    <ul className="space-y-2">
      {products.map((product) => (
        <li key={product.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-100">
          <div>
            <p className="font-semibold text-orderly-navy">{product.name}</p>
            <p className="text-xs text-slate-500">
              {product.station === "bar" ? "Bar" : "Κουζίνα"} · extras {product.extras.length}
            </p>
          </div>
          <p className="text-sm font-bold text-orderly-blue">{formatEuro(product.price)}</p>
        </li>
      ))}
    </ul>
  );
}

function PrintTab({ onPrint }: { onPrint: (order: DemoLiveOrder) => void }) {
  const sample = seedLiveOrders[0];
  const barItems = sample.items.filter((i) => i.station === "bar");
  const kitchenItems = sample.items.filter((i) => i.station === "kitchen");

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Το Orderly Print χωρίζει την παραγγελία ανά σημείο παραγωγής. Παρακάτω, demo tickets για {sample.tableLabel}.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Ticket title="Bar" items={barItems} table={sample.tableLabel} />
        <Ticket title="Κουζίνα" items={kitchenItems} table={sample.tableLabel} />
      </div>
      <button
        type="button"
        onClick={() => onPrint(sample)}
        className="h-11 rounded-full bg-orderly-navy px-5 text-sm font-semibold text-white"
      >
        Προσομοίωση αποστολής
      </button>
    </div>
  );
}

function Ticket({
  title,
  table,
  items,
}: {
  title: string;
  table: string;
  items: DemoLiveOrder["items"];
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 font-mono text-sm text-slate-800">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Orderly Print · {title}</p>
      <p className="mt-2 font-sans text-base font-bold text-orderly-navy">{table}</p>
      <ul className="mt-3 space-y-1">
        {items.length ? items.map((item) => <li key={item.name}>{item.qty}× {item.name}</li>) : <li>—</li>}
      </ul>
    </div>
  );
}

function ReportsTab() {
  const maxHour = Math.max(...analytics.hourly.map((h) => h.value));
  const maxWaiter = Math.max(...analytics.waiters.map((w) => w.revenue));

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-4">
        <StatCard label="Παραγγελίες" value={String(analytics.orderCount)} />
        <StatCard label="Μέσος λογαριασμός" value={formatEuro(analytics.avgTicket)} />
        <StatCard label="Ανοιχτά τραπέζια" value={String(analytics.openTables)} />
        <StatCard label="Take Away" value={String(analytics.takeawayCount)} />
      </div>
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-100">
        <h3 className="text-sm font-bold text-orderly-navy">Έσοδα ανά ώρα</h3>
        <ul className="mt-4 space-y-2">
          {analytics.hourly.map((row) => (
            <li key={row.hour} className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center gap-2 text-xs">
              <span className="text-slate-500">{row.hour}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-orderly-blue to-orderly-sky"
                  style={{ width: `${(row.value / maxHour) * 100}%` }}
                />
              </span>
              <span className="text-right font-semibold text-orderly-navy">{row.value}€</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-100">
        <h3 className="text-sm font-bold text-orderly-navy">Top προϊόντα</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[18rem] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400">
                <th className="py-2 font-semibold">Προϊόν</th>
                <th className="py-2 font-semibold">Τμχ</th>
                <th className="py-2 font-semibold">Έσοδα</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topProducts.map((row) => (
                <tr key={row.name} className="border-t border-slate-100">
                  <td className="py-2 text-orderly-navy">{row.name}</td>
                  <td className="py-2">{row.qty}</td>
                  <td className="py-2 font-semibold">{formatEuro(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-100">
        <h3 className="text-sm font-bold text-orderly-navy">Απόδοση σερβιτόρων</h3>
        <ul className="mt-4 space-y-3">
          {analytics.waiters.map((waiter) => (
            <li key={waiter.name}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-orderly-navy">{waiter.name}</span>
                <span className="text-slate-600">
                  {waiter.orders} παραγγελίες · {formatEuro(waiter.revenue)}
                </span>
              </div>
              <span className="mt-1 block h-2 overflow-hidden rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full bg-orderly-blue"
                  style={{ width: `${(waiter.revenue / maxWaiter) * 100}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-100">
        <h3 className="text-sm font-bold text-orderly-navy">Βάρδια {analytics.shift.name}</h3>
        <p className="mt-1 text-sm text-slate-600">{analytics.shift.range}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-slate-500">Έσοδα</dt>
            <dd className="font-bold text-orderly-navy">{formatEuro(analytics.shift.revenue)}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Μετρητά</dt>
            <dd className="font-bold text-orderly-navy">{formatEuro(analytics.shift.cash)}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Κάρτα</dt>
            <dd className="font-bold text-orderly-navy">{formatEuro(analytics.shift.card)}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Παραγγελίες</dt>
            <dd className="font-bold text-orderly-navy">{analytics.shift.orders}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-orderly-navy">{value}</p>
    </div>
  );
}

function statusTone(status: DemoLiveOrder["status"]) {
  if (status === "new") return "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200";
  if (status === "ready") return "bg-orderly-ice text-orderly-blue ring-1 ring-orderly-blue/20";
  return "bg-amber-50 text-amber-800 ring-1 ring-amber-200";
}

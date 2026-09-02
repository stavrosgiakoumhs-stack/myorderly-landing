"use client";

import { useState } from "react";
import { seedOpenAccounts, venue, waiterTables, type DemoOpenAccount, type DemoTable } from "@/lib/demo-data";
import { formatEuro } from "@/lib/money";
import { nextOrderId, type CartLine } from "@/lib/demo-cart";
import { GuestCountPicker } from "./GuestCount";
import { MenuOrdering } from "./MenuOrdering";

type Screen = "floor" | "pick-table" | "guests" | "menu" | "success";
type Mode = "dinein" | "takeaway";

type LocalOrder = {
  id: string;
  label: string;
  takeaway: boolean;
  guests: number | null;
  total: number;
  lines: CartLine[];
  note: string;
  status: "open" | "paid";
  payment?: "cash" | "card";
};

const tableStatusLabel: Record<DemoTable["status"], string> = {
  free: "Ελεύθερο",
  occupied: "Ανοιχτό",
  ordering: "Σε παραγγελία",
};

export function WaiterDemo() {
  const [screen, setScreen] = useState<Screen>("floor");
  const [mode, setMode] = useState<Mode>("dinein");
  const [table, setTable] = useState<DemoTable | null>(null);
  const [guests, setGuests] = useState(2);
  const [orders, setOrders] = useState<LocalOrder[]>(
    seedOpenAccounts.map((account) => accountToOrder(account)),
  );
  const [lastOrder, setLastOrder] = useState<LocalOrder | null>(null);
  const [settling, setSettling] = useState<LocalOrder | null>(null);

  const contextLabel = mode === "takeaway" ? "Take Away" : table ? `Τραπέζι ${table.label}` : "Νέα παραγγελία";
  const guestCount = mode === "takeaway" ? null : guests;

  function startDineIn() {
    setMode("dinein");
    setTable(null);
    setGuests(2);
    setScreen("pick-table");
  }

  function startTakeaway() {
    setMode("takeaway");
    setTable(null);
    setScreen("menu");
  }

  function submitOrder(payload: { lines: CartLine[]; note: string; total: number }) {
    const created: LocalOrder = {
      id: nextOrderId(),
      label: contextLabel,
      takeaway: mode === "takeaway",
      guests: guestCount,
      total: payload.total,
      lines: payload.lines,
      note: payload.note,
      status: "open",
    };
    setOrders((prev) => [created, ...prev]);
    setLastOrder(created);
    setScreen("success");
  }

  function settle(order: LocalOrder, payment: "cash" | "card") {
    setOrders((prev) => prev.map((item) => (item.id === order.id ? { ...item, status: "paid", payment } : item)));
    setSettling(null);
  }

  return (
    <div className="relative flex min-h-[32rem] flex-1 flex-col overflow-hidden bg-slate-50 sm:rounded-3xl sm:border sm:border-slate-200 sm:shadow-xl">
      {screen === "floor" ? (
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-orderly-blue">Σερβιτόρος · Pro PDA</p>
          <h2 className="mt-1 text-xl font-extrabold text-orderly-navy">Βάρδια · {venue.waiter}</h2>
          <p className="text-sm text-slate-600">{venue.name} · τα τραπέζια σου</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={startDineIn}
              className="rounded-2xl bg-orderly-navy px-4 py-3 text-sm font-semibold text-white"
            >
              Νέα παραγγελία
            </button>
            <button
              type="button"
              onClick={startTakeaway}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-orderly-navy ring-1 ring-slate-200"
            >
              Take Away
            </button>
          </div>

          <h3 className="mt-6 text-sm font-bold text-orderly-navy">Τραπέζια</h3>
          <ul className="mt-2 grid grid-cols-4 gap-2">
            {waiterTables.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setMode("dinein");
                    setTable(item);
                    setGuests(Math.min(item.seats, 2));
                    setScreen("guests");
                  }}
                  className={`flex aspect-square w-full flex-col items-center justify-center rounded-2xl text-xs font-bold ${tableTone(item.status)}`}
                >
                  <span className="text-base">{item.label}</span>
                  <span className="mt-0.5 font-medium opacity-80">{tableStatusLabel[item.status]}</span>
                </button>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-bold text-orderly-navy">Ανοιχτές παραγγελίες</h3>
          <ul className="mt-2 space-y-2 pb-4">
            {orders.filter((o) => o.status === "open").length === 0 ? (
              <li className="text-sm text-slate-500">Καμία ανοιχτή παραγγελία.</li>
            ) : (
              orders
                .filter((o) => o.status === "open")
                .map((order) => (
                  <li key={order.id}>
                    <button
                      type="button"
                      onClick={() => setSettling(order)}
                      className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left ring-1 ring-slate-100"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-orderly-navy">{order.label}</span>
                        <span className="text-xs text-slate-500">
                          {order.takeaway ? "Take Away" : `${order.guests} άτομα`} · {order.id}
                        </span>
                      </span>
                      <span className="text-sm font-bold text-orderly-blue">{formatEuro(order.total)}</span>
                    </button>
                  </li>
                ))
            )}
          </ul>
        </div>
      ) : null}

      {screen === "pick-table" ? (
        <div className="flex flex-1 flex-col px-4 py-5">
          <button type="button" onClick={() => setScreen("floor")} className="self-start text-sm font-medium text-orderly-blue">
            ← Πίσω
          </button>
          <h2 className="mt-3 text-xl font-extrabold text-orderly-navy">Επίλεξε τραπέζι</h2>
          <ul className="mt-4 grid grid-cols-4 gap-2">
            {waiterTables.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTable(item);
                    setGuests(Math.min(item.seats, 2));
                    setScreen("guests");
                  }}
                  className={`flex aspect-square w-full flex-col items-center justify-center rounded-2xl text-xs font-bold ${tableTone(item.status)}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {screen === "guests" && table ? (
        <div className="flex flex-1 flex-col px-4 py-5">
          <button type="button" onClick={() => setScreen("pick-table")} className="self-start text-sm font-medium text-orderly-blue">
            ← Πίσω
          </button>
          <h2 className="mt-3 text-xl font-extrabold text-orderly-navy">Τραπέζι {table.label}</h2>
          <p className="text-sm text-slate-600">Πόσα άτομα κάθονται;</p>
          <div className="mt-6">
            <GuestCountPicker value={guests} onChange={setGuests} />
          </div>
          <button
            type="button"
            onClick={() => setScreen("menu")}
            className="mt-auto h-12 rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark text-sm font-semibold text-white"
          >
            Άνοιγμα μενού
          </button>
        </div>
      ) : null}

      {screen === "menu" ? (
        <MenuOrdering
          contextLabel={contextLabel}
          guestCount={guestCount}
          submitLabel="Καταχώρηση (Demo)"
          onBack={() => setScreen(mode === "takeaway" ? "floor" : "guests")}
          onSubmit={submitOrder}
        />
      ) : null}

      {screen === "success" && lastOrder ? (
        <div className="flex flex-1 flex-col px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Demo επιτυχία</p>
          <h2 className="mt-2 text-2xl font-extrabold text-orderly-navy">Καταχωρήθηκε.</h2>
          <p className="mt-2 text-sm text-slate-600">
            {lastOrder.id} · {lastOrder.label}
            {lastOrder.guests ? ` · ${lastOrder.guests} άτομα` : ""} · {formatEuro(lastOrder.total)}
          </p>
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
            Το ticket θα πήγαινε σε bar / κουζίνα μέσω Orderly Print. Εδώ μένει μόνο τοπικά στο demo.
          </p>
          <button
            type="button"
            onClick={() => setScreen("floor")}
            className="mt-auto h-12 rounded-full bg-orderly-navy text-sm font-semibold text-white"
          >
            Επιστροφή στα τραπέζια
          </button>
        </div>
      ) : null}

      {settling ? (
        <div className="absolute inset-0 z-30 flex items-end bg-slate-900/40 p-4 sm:items-center sm:justify-center">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl" role="dialog" aria-labelledby="settle-title">
            <h2 id="settle-title" className="text-lg font-bold text-orderly-navy">
              Ολοκλήρωση · {settling.label}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{formatEuro(settling.total)} · Demo πληρωμή στο κατάστημα</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => settle(settling, "cash")}
                className="h-11 rounded-full bg-orderly-navy text-sm font-semibold text-white"
              >
                Μετρητά
              </button>
              <button
                type="button"
                onClick={() => settle(settling, "card")}
                className="h-11 rounded-full bg-orderly-blue text-sm font-semibold text-white"
              >
                Κάρτα
              </button>
            </div>
            <button type="button" onClick={() => setSettling(null)} className="mt-3 w-full text-sm text-slate-500">
              Άκυρο
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function accountToOrder(account: DemoOpenAccount): LocalOrder {
  return {
    id: account.id,
    label: account.tableLabel,
    takeaway: false,
    guests: account.guests,
    total: account.total,
    lines: [],
    note: "",
    status: "open",
  };
}

function tableTone(status: DemoTable["status"]) {
  if (status === "occupied") return "bg-amber-50 text-amber-900 ring-1 ring-amber-200";
  if (status === "ordering") return "bg-orderly-blue/10 text-orderly-blue ring-1 ring-orderly-blue/25";
  return "bg-white text-slate-600 ring-1 ring-slate-200";
}

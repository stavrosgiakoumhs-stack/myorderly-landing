"use client";

import { useMemo, useState } from "react";
import {
  annaWaiterOrders,
  annaWaiterTables,
  venue,
  type DemoWaiterOrder,
} from "@/lib/demo-data";
import { formatAmount } from "@/lib/money";
import { formatDemoDateTime, formatTableDisplayName } from "@/lib/demo-format";
import type { CartLine } from "@/lib/demo-cart";
import { lineTotal } from "@/lib/demo-cart";
import { PaymentSheet } from "./PaymentSheet";
import { OrderLineItems, WaiterPda, tablesFromDemo } from "./WaiterPda";

type Tab = "orders" | "new-order" | "takeaway";
const TAKEAWAY_LABEL = "TAKE AWAY";

function placeLabel(order: DemoWaiterOrder): string {
  if (order.order_type === "takeaway") return TAKEAWAY_LABEL;
  return formatTableDisplayName(order.table_name ?? "");
}

export function WaiterDemo() {
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<DemoWaiterOrder[]>(() => annaWaiterOrders.map((order) => ({ ...order, items: order.items.map((item) => ({ ...item })) })));
  const [settlingTableId, setSettlingTableId] = useState<string | null>(null);
  const [settlingTakeawayId, setSettlingTakeawayId] = useState<string | null>(null);
  const [transferTableId, setTransferTableId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(null);
  const [destinationTableId, setDestinationTableId] = useState<string | null>(null);
  const assignedTables = tablesFromDemo(annaWaiterTables);

  const openTableAccounts = useMemo(() => {
    const map = new Map<
      string,
      { tableId: string; tableName: string; orders: DemoWaiterOrder[]; orderCount: number; totalAmount: number }
    >();
    for (const order of orders) {
      if (order.handled_at || order.order_type === "takeaway" || !order.table_id) continue;
      const existing = map.get(order.table_id);
      if (!existing) {
        map.set(order.table_id, {
          tableId: order.table_id,
          tableName: order.table_name ?? "",
          orders: [order],
          orderCount: 1,
          totalAmount: Number(order.total_amount),
        });
        continue;
      }
      existing.orders.push(order);
      existing.orderCount += 1;
      existing.totalAmount += Number(order.total_amount);
    }
    return [...map.values()].sort((a, b) => {
      const aTime = Math.max(...a.orders.map((order) => new Date(order.created_at).getTime()));
      const bTime = Math.max(...b.orders.map((order) => new Date(order.created_at).getTime()));
      return bTime - aTime;
    });
  }, [orders]);

  const openTakeaway = useMemo(
    () =>
      orders
        .filter((order) => order.order_type === "takeaway" && order.handled_at === null)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    [orders],
  );

  const completed = useMemo(
    () =>
      orders
        .filter((order) => order.handled_at !== null)
        .sort((a, b) => new Date(b.handled_at ?? b.created_at).getTime() - new Date(a.handled_at ?? a.created_at).getTime()),
    [orders],
  );

  const openTableIds = useMemo(() => new Set(openTableAccounts.map((account) => account.tableId)), [openTableAccounts]);
  const settlingAccount = openTableAccounts.find((account) => account.tableId === settlingTableId) ?? null;
  const transferringAccount = openTableAccounts.find((account) => account.tableId === transferTableId) ?? null;
  const settlingTakeaway = openTakeaway.find((order) => order.id === settlingTakeawayId) ?? null;
  const transferDestinations = assignedTables
    .filter((table) => table.id !== transferTableId)
    .map((table) => ({ tableId: table.id, tableName: table.name, hasOpenAccount: openTableIds.has(table.id) }));
  const totalAmount = orders.filter((order) => !order.handled_at).reduce((sum, order) => sum + Number(order.total_amount), 0);
  const orderCount = orders.filter((order) => !order.handled_at).length;

  function addOrder(payload: {
    orderNumber: number;
    tableId: string | null;
    tableName: string;
    takeaway: boolean;
    guests: number | null;
    total: number;
    note: string;
    lines: CartLine[];
  }) {
    const created: DemoWaiterOrder = {
      id: `ord-${payload.orderNumber}`,
      order_number: payload.orderNumber,
      order_type: payload.takeaway ? "takeaway" : "dine_in",
      table_id: payload.tableId,
      table_name: payload.takeaway ? null : payload.tableName,
      guest_count: payload.guests,
      total_amount: payload.total,
      customer_note: payload.note,
      handled_at: null,
      created_at: new Date().toISOString(),
      source: payload.takeaway ? "takeaway" : "pda",
      status: "new",
      items: payload.lines.map((line, index) => ({
        id: `${payload.orderNumber}-${index}`,
        product_name_snapshot: line.name,
        quantity: line.quantity,
        total_price: lineTotal(line),
        extras: line.extras.map((extra) => ({
          id: extra.id,
          name_snapshot: extra.name,
          price_snapshot: extra.price,
        })),
        options: line.options.map((option) => ({
          id: option.id,
          item_name_snapshot: option.name,
          price_delta_snapshot: option.priceDelta,
        })),
        note: line.note,
      })),
    };
    setOrders((current) => [created, ...current]);
  }

  function settleTable() {
    if (!settlingTableId || !paymentMethod) return;
    const handledAt = new Date().toISOString();
    setOrders((current) =>
      current.map((order) =>
        order.table_id === settlingTableId && order.handled_at === null ? { ...order, handled_at: handledAt, status: "ready" } : order,
      ),
    );
    setSettlingTableId(null);
    setPaymentMethod(null);
  }

  function settleTakeaway() {
    if (!settlingTakeawayId || !paymentMethod) return;
    const handledAt = new Date().toISOString();
    setOrders((current) =>
      current.map((order) => (order.id === settlingTakeawayId ? { ...order, handled_at: handledAt, status: "ready" } : order)),
    );
    setSettlingTakeawayId(null);
    setPaymentMethod(null);
  }

  function transferTable() {
    const destination = transferDestinations.find((item) => item.tableId === destinationTableId);
    if (!transferTableId || !destination || destination.hasOpenAccount) return;
    setOrders((current) =>
      current.map((order) =>
        order.table_id === transferTableId && order.handled_at === null
          ? { ...order, table_id: destination.tableId, table_name: destination.tableName }
          : order,
      ),
    );
    setTransferTableId(null);
    setDestinationTableId(null);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5">
      <div className="mx-auto max-w-2xl">
        <nav className="sticky top-0 z-30 bg-white/95 pb-3 pt-1 backdrop-blur">
          <div className="grid grid-cols-3 gap-1 rounded-2xl border border-blue-100 bg-blue-50/70 p-1">
            <button
              className={`min-h-12 rounded-xl px-2 py-3 text-xs font-black transition sm:text-sm ${
                tab === "orders" ? "bg-blue-600 text-white shadow-sm" : "bg-transparent text-blue-700"
              }`}
              onClick={() => setTab("orders")}
              type="button"
            >
              Παραγγελίες
              {openTableAccounts.length > 0 ? (
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-black sm:ml-2 sm:text-xs ${
                    tab === "orders" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {openTableAccounts.length}
                </span>
              ) : null}
            </button>
            <button
              className={`min-h-12 rounded-xl px-2 py-3 text-xs font-black transition sm:text-sm ${
                tab === "new-order" ? "bg-blue-600 text-white shadow-sm" : "bg-transparent text-blue-700"
              }`}
              onClick={() => setTab("new-order")}
              type="button"
            >
              Νέα παραγγελία
            </button>
            <button
              className={`min-h-12 rounded-xl px-2 py-3 text-xs font-black transition sm:text-sm ${
                tab === "takeaway" ? "bg-blue-600 text-white shadow-sm" : "bg-transparent text-blue-700"
              }`}
              onClick={() => setTab("takeaway")}
              type="button"
            >
              Take away
              {openTakeaway.length > 0 ? (
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-black sm:ml-2 sm:text-xs ${
                    tab === "takeaway" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {openTakeaway.length}
                </span>
              ) : null}
            </button>
          </div>
        </nav>

        <div className={tab === "new-order" ? "mt-1 block" : "hidden"}>
          <WaiterPda assignedTables={assignedTables} onOrderCreated={addOrder} onShowOrders={() => setTab("orders")} />
        </div>

        <div className={tab === "takeaway" ? "mt-1 block" : "hidden"}>
          <div className="space-y-4">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-950">Ανοιχτά Take away</h2>
              {openTakeaway.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-4 text-sm text-slate-600">
                  Δεν υπάρχουν ανοιχτές take away παραγγελίες.
                </p>
              ) : (
                openTakeaway.map((order) => (
                  <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={order.id}>
                    <div className="flex flex-wrap items-center gap-2 border-b border-blue-50 pb-3">
                      <h3 className="text-lg font-black text-slate-950">#{order.order_number}</h3>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">{TAKEAWAY_LABEL}</span>
                      <span className="ml-0 font-black text-blue-700 sm:ml-auto">{formatAmount(order.total_amount)}€</span>
                    </div>
                    {order.customer_note ? (
                      <p className="mt-2 rounded-xl bg-blue-50/70 px-3 py-2 text-sm font-semibold text-slate-700">{order.customer_note}</p>
                    ) : null}
                    <OrderLineItems items={order.items} />
                    <button
                      className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-base font-black text-white transition hover:bg-blue-700"
                      onClick={() => {
                        setSettlingTakeawayId(order.id);
                        setPaymentMethod(null);
                      }}
                      type="button"
                    >
                      Ολοκλήρωση
                    </button>
                  </article>
                ))
              )}
            </section>
            <WaiterPda
              assignedTables={[]}
              onOrderCreated={addOrder}
              onShowOrders={() => setTab("orders")}
              takeaway
            />
          </div>
        </div>

        <div className={tab === "orders" ? "block" : "hidden"}>
          <header className="rounded-3xl border border-blue-100 bg-blue-50/60 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Orderly waiter view</p>
            <h1 className="mt-2 text-2xl font-black text-slate-950">{venue.waiter}</h1>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {venue.name} · Έναρξη {formatDemoDateTime(venue.sessionStartedAt)}
            </p>
          </header>
          <section className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Σύνολο παραγγελιών</p>
              <p className="mt-2 text-2xl font-black text-slate-950">{formatAmount(totalAmount)}€</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Orders</p>
              <p className="mt-2 text-2xl font-black text-slate-950">{orderCount}</p>
            </div>
          </section>
          <section className="mt-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-950">Assigned tables</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {assignedTables.map((table) => (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700" key={table.id}>
                  {table.name}
                </span>
              ))}
            </div>
          </section>
          <section className="mt-4 space-y-3">
            <h2 className="text-base font-bold text-slate-950">Ανοιχτοί λογαριασμοί</h2>
            {openTableAccounts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-6 text-center text-sm text-slate-600">
                Δεν υπάρχουν ανοιχτοί λογαριασμοί για τα τραπέζια σου.
              </div>
            ) : (
              openTableAccounts.map((account) => (
                <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={account.tableId}>
                  <div className="flex flex-wrap items-center gap-2 border-b border-blue-50 pb-3">
                    <h3 className="text-xl font-black text-slate-950">{formatTableDisplayName(account.tableName)}</h3>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                      {account.orderCount} {account.orderCount === 1 ? "παραγγελία" : "παραγγελίες"}
                    </span>
                    <span className="ml-0 text-lg font-black text-blue-700 sm:ml-auto">{formatAmount(account.totalAmount)}€</span>
                  </div>
                  {account.orders.map((order) => (
                    <div key={order.id}>
                      {order.customer_note ? (
                        <p className="mt-2 rounded-xl bg-blue-50/70 px-3 py-2 text-sm font-semibold text-slate-700">{order.customer_note}</p>
                      ) : null}
                      <OrderLineItems items={order.items} />
                    </div>
                  ))}
                  <button
                    className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-base font-black text-white transition hover:bg-blue-700"
                    onClick={() => {
                      setSettlingTableId(account.tableId);
                      setPaymentMethod(null);
                    }}
                    type="button"
                  >
                    Ολοκλήρωση τραπεζιού
                  </button>
                  <button
                    className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-base font-black text-blue-700 transition hover:bg-blue-50"
                    onClick={() => {
                      setTransferTableId(account.tableId);
                      setDestinationTableId(null);
                    }}
                    type="button"
                  >
                    Μεταφορά τραπεζιού
                  </button>
                </article>
              ))
            )}
          </section>
          <section className="mt-6 space-y-3 pb-8">
            <h2 className="text-base font-bold text-slate-950">Ολοκληρωμένες παραγγελίες</h2>
            {completed.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-4 text-sm text-slate-600">
                Δεν υπάρχουν ολοκληρωμένες παραγγελίες ακόμα.
              </p>
            ) : (
              <details className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5">
                <summary className="cursor-pointer text-sm font-black text-blue-700">Show completed ({completed.length})</summary>
                <div className="mt-3 space-y-3">
                  {completed.map((order) => (
                    <article className="rounded-2xl border border-blue-50 bg-blue-50/30 p-4" key={order.id}>
                      <div className="flex flex-wrap items-center gap-2 border-b border-blue-50 pb-3">
                        <h3 className="text-lg font-black text-slate-950">#{order.order_number}</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-blue-700">{placeLabel(order)}</span>
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Ολοκληρώθηκε</span>
                        <span className="ml-0 font-black text-blue-700 sm:ml-auto">{formatAmount(order.total_amount)}€</span>
                      </div>
                      {order.handled_at ? (
                        <p className="mt-2 text-xs font-semibold text-slate-500">{formatDemoDateTime(order.handled_at)}</p>
                      ) : null}
                      <OrderLineItems items={order.items} />
                    </article>
                  ))}
                </div>
              </details>
            )}
          </section>
        </div>
      </div>

      {settlingAccount ? (
        <PaymentSheet
          onCancel={() => {
            setSettlingTableId(null);
            setPaymentMethod(null);
          }}
          onConfirm={settleTable}
          onSelectMethod={setPaymentMethod}
          selectedMethod={paymentMethod}
          tableLabel={formatTableDisplayName(settlingAccount.tableName)}
          totalAmount={formatAmount(settlingAccount.totalAmount)}
        />
      ) : null}
      {settlingTakeaway ? (
        <PaymentSheet
          onCancel={() => {
            setSettlingTakeawayId(null);
            setPaymentMethod(null);
          }}
          onConfirm={settleTakeaway}
          onSelectMethod={setPaymentMethod}
          selectedMethod={paymentMethod}
          tableLabel={TAKEAWAY_LABEL}
          totalAmount={formatAmount(settlingTakeaway.total_amount)}
        />
      ) : null}
      {transferringAccount ? (
        <TransferSheet
          destinations={transferDestinations}
          onCancel={() => {
            setTransferTableId(null);
            setDestinationTableId(null);
          }}
          onConfirm={transferTable}
          onSelectDestination={setDestinationTableId}
          selectedTableId={destinationTableId}
          sourceTableName={transferringAccount.tableName}
          sourceTotalAmount={formatAmount(transferringAccount.totalAmount)}
        />
      ) : null}
    </main>
  );
}

function TransferSheet({
  sourceTableName,
  sourceTotalAmount,
  destinations,
  selectedTableId,
  onSelectDestination,
  onConfirm,
  onCancel,
}: {
  sourceTableName: string;
  sourceTotalAmount: string;
  destinations: { tableId: string; tableName: string; hasOpenAccount: boolean }[];
  selectedTableId: string | null;
  onSelectDestination: (tableId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const selected = destinations.find((item) => item.tableId === selectedTableId);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-3 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-950/20" role="dialog">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Μεταφορά λογαριασμού</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Από: {formatTableDisplayName(sourceTableName)}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-600">{sourceTotalAmount}€</p>
        <p className="mt-4 text-sm font-bold text-slate-800">Προς</p>
        <div className="mt-3 grid gap-2">
          {destinations.length === 0 ? (
            <p className="rounded-xl border border-dashed border-blue-200 bg-blue-50/50 px-3 py-3 text-sm text-slate-600">
              Δεν έχεις άλλο ανατεθειμένο τραπέζι.
            </p>
          ) : (
            destinations.map((item) => {
              const active = item.tableId === selectedTableId;
              return (
                <button
                  key={item.tableId}
                  className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-base font-bold transition ${
                    item.hasOpenAccount
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                      : active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-blue-200 bg-white text-blue-700"
                  }`}
                  disabled={item.hasOpenAccount}
                  onClick={() => onSelectDestination(item.tableId)}
                  type="button"
                >
                  <span>{formatTableDisplayName(item.tableName)}</span>
                  {item.hasOpenAccount ? <span className="mt-1 block text-xs font-semibold">Έχει ανοιχτό λογαριασμό</span> : null}
                </button>
              );
            })
          )}
        </div>
        {selected ? (
          <p className="mt-4 rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-slate-700">
            Μεταφορά λογαριασμού
            <br />
            {formatTableDisplayName(sourceTableName)} → {formatTableDisplayName(selected.tableName)}
            <br />
            Θα μεταφερθούν όλες οι ανοιχτές παραγγελίες του τραπεζιού.
          </p>
        ) : null}
        <button
          className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={!selected || selected.hasOpenAccount}
          onClick={onConfirm}
          type="button"
        >
          Μεταφορά
        </button>
        <button
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700"
          onClick={onCancel}
          type="button"
        >
          Ακύρωση
        </button>
      </div>
    </div>
  );
}

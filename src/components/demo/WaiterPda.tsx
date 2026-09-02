"use client";

import { useMemo, useRef, useState } from "react";
import { categories, products, productPrice, type DemoProduct, type DemoTable } from "@/lib/demo-data";
import { formatAmount } from "@/lib/money";
import {
  cartQuantity,
  cartTotal,
  lineKey,
  lineTotal,
  nextOrderNumber,
  type CartExtra,
  type CartLine,
  type CartOption,
} from "@/lib/demo-cart";
import { DEFAULT_GUEST_COUNT, formatTableDisplayName, parseGuestCount } from "@/lib/demo-format";
import { CollapsibleChipList } from "./CollapsibleChipList";
import { GuestCountStepper } from "./GuestCount";

const TAKEAWAY_LABEL = "TAKE AWAY";

type PdaScreen = "table" | "guests" | "menu" | "product" | "cart" | "success";

type AssignedTable = { id: string; name: string };

type SuccessState = {
  orderNumber: number;
  totalAmount: string;
  tableName: string;
};

type Configuring = {
  categoryId: string;
  product: DemoProduct;
};

function defaultOptions(product: DemoProduct): Record<string, string[]> {
  const selected: Record<string, string[]> = {};
  for (const group of product.optionGroups) {
    selected[group.id] = group.required ? group.choices.slice(0, 1).map((choice) => choice.id) : [];
  }
  return selected;
}

export function WaiterPda({
  assignedTables,
  takeaway = false,
  onOrderCreated,
  onShowOrders,
}: {
  assignedTables: AssignedTable[];
  takeaway?: boolean;
  onOrderCreated: (payload: {
    orderNumber: number;
    tableId: string | null;
    tableName: string;
    takeaway: boolean;
    guests: number | null;
    total: number;
    note: string;
    lines: CartLine[];
  }) => void;
  onShowOrders: () => void;
}) {
  const [screen, setScreen] = useState<PdaScreen>(takeaway ? "menu" : "table");
  const [table, setTable] = useState<AssignedTable | null>(null);
  const [guests, setGuests] = useState(DEFAULT_GUEST_COUNT);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [configuring, setConfiguring] = useState<Configuring | null>(null);
  const [editing, setEditing] = useState<CartLine | null>(null);
  const [lines, setLines] = useState<Record<string, CartLine>>({});
  const [orderNote, setOrderNote] = useState("");
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const submitting = useRef(false);

  const selectedCategory = categories.find((category) => category.id === categoryId) ?? null;
  const cartLines = useMemo(() => Object.values(lines), [lines]);
  const total = cartTotal(cartLines);
  const quantity = cartQuantity(cartLines);
  const placeLabel = takeaway ? TAKEAWAY_LABEL : table ? formatTableDisplayName(table.name) : "";
  const menuProducts = products.map((product) => ({ ...product, price: productPrice(product, takeaway) }));

  const resetAfterSuccess = () => {
    setLines({});
    setOrderNote("");
    setConfiguring(null);
    setEditing(null);
    setCategoryId(null);
    setSuccess(null);
    submitting.current = false;
    if (takeaway) {
      setTable(null);
      setScreen("menu");
      return;
    }
    setTable(null);
    setGuests(DEFAULT_GUEST_COUNT);
    setScreen("table");
  };

  function upsertLine(product: DemoProduct, payload: { quantity: number; note: string; extras: CartExtra[]; options: CartOption[] }) {
    const key = lineKey(product.id, payload.note, payload.extras, payload.options);
    setLines((current) => {
      const next = { ...current };
      if (editing) delete next[editing.lineId];
      const existing = next[key];
      next[key] = existing
        ? {
            ...existing,
            quantity: existing.quantity + payload.quantity,
            note: payload.note,
            extras: payload.extras,
            options: payload.options,
          }
        : {
            lineId: key,
            productId: product.id,
            categoryId: product.categoryId,
            name: product.name,
            station: product.station,
            quantity: payload.quantity,
            basePrice: product.price,
            extras: payload.extras,
            options: payload.options,
            note: payload.note,
          };
      return next;
    });
    setConfiguring(null);
    setEditing(null);
    setScreen(editing ? "cart" : "menu");
  }

  function changeQty(lineId: string, nextQty: number) {
    setLines((current) => {
      const existing = current[lineId];
      if (!existing) return current;
      if (nextQty <= 0) {
        const copy = { ...current };
        delete copy[lineId];
        return copy;
      }
      return { ...current, [lineId]: { ...existing, quantity: nextQty } };
    });
  }

  if (screen === "success" && success) {
    return (
      <section className="rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-sm shadow-blue-950/5">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Orderly · Demo</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">Η παραγγελία στάλθηκε</h2>
        <p className="mt-4 text-lg font-bold text-slate-800">Παραγγελία #{success.orderNumber}</p>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          {success.tableName === TAKEAWAY_LABEL ? TAKEAWAY_LABEL : formatTableDisplayName(success.tableName)}
        </p>
        <p className="mt-3 text-3xl font-black text-blue-700">{success.totalAmount}€</p>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          Demo — η παραγγελία έμεινε μόνο τοπικά.
        </p>
        <div className="mt-8 grid gap-3">
          <button
            className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700"
            onClick={resetAfterSuccess}
            type="button"
          >
            Νέα παραγγελία
          </button>
          <button
            className="w-full rounded-2xl border border-blue-200 bg-white px-5 py-4 text-base font-bold text-blue-700"
            onClick={onShowOrders}
            type="button"
          >
            Παραγγελίες
          </button>
        </div>
      </section>
    );
  }

  if (screen === "product" && configuring) {
    return (
      <WaiterProductConfig
        product={configuring.product}
        categoryName={categories.find((category) => category.id === configuring.categoryId)?.name ?? ""}
        initial={editing}
        onCancel={() => {
          setConfiguring(null);
          setScreen(editing ? "cart" : "menu");
          setEditing(null);
        }}
        onSave={(payload) => upsertLine(configuring.product, payload)}
      />
    );
  }

  if (screen === "cart" && (takeaway || table)) {
    return (
      <WaiterCartPanel
        tableName={placeLabel}
        items={cartLines}
        orderNote={orderNote}
        onOrderNoteChange={setOrderNote}
        onBack={() => setScreen("menu")}
        onEditItem={(line) => {
          const product = menuProducts.find((item) => item.id === line.productId);
          if (!product) return;
          setEditing(line);
          setConfiguring({ categoryId: line.categoryId, product });
          setScreen("product");
        }}
        onUpdateQuantity={changeQty}
        onRemoveItem={(lineId) => changeQty(lineId, 0)}
        onSubmit={() => {
          if (cartLines.length === 0 || submitting.current || (!takeaway && (!table || parseGuestCount(guests) === null))) {
            return;
          }
          submitting.current = true;
          const orderNumber = nextOrderNumber();
          const tableName = takeaway ? TAKEAWAY_LABEL : table!.name;
          onOrderCreated({
            orderNumber,
            tableId: takeaway ? null : table!.id,
            tableName,
            takeaway,
            guests: takeaway ? null : guests,
            total,
            note: orderNote,
            lines: cartLines,
          });
          setSuccess({
            orderNumber,
            totalAmount: formatAmount(total),
            tableName,
          });
          setScreen("success");
        }}
      />
    );
  }

  if (screen === "menu" && (takeaway || table)) {
    return (
      <section className={quantity > 0 ? "pb-[calc(7rem+env(safe-area-inset-bottom))]" : "pb-4"}>
        <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                {takeaway ? "Take away" : "Επιλεγμένο τραπέζι"}
              </p>
              <h2 className="mt-1 truncate text-2xl font-black text-slate-950">{placeLabel}</h2>
              {takeaway ? null : <p className="mt-1 text-sm font-semibold text-slate-600">Άτομα: {guests}</p>}
            </div>
            {takeaway ? null : (
              <button
                className="shrink-0 rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-bold text-blue-700"
                onClick={() => {
                  setConfiguring(null);
                  setEditing(null);
                  setCategoryId(null);
                  setScreen("table");
                }}
                type="button"
              >
                Αλλαγή
              </button>
            )}
          </div>
        </div>
        {selectedCategory ? (
          <div className="mt-4 space-y-3">
            <div className="sticky top-[4.5rem] z-10 flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white/95 px-3 py-3 shadow-sm backdrop-blur">
              <h3 className="min-w-0 truncate text-lg font-black text-slate-950">{selectedCategory.name}</h3>
              <button
                className="shrink-0 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700"
                onClick={() => {
                  setCategoryId(null);
                  window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
                }}
                type="button"
              >
                Αλλαγή κατηγορίας
              </button>
            </div>
            {menuProducts
              .filter((product) => product.categoryId === selectedCategory.id)
              .map((product) => (
                <button
                  key={product.id}
                  className="flex w-full items-start justify-between gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-sm shadow-blue-950/5"
                  onClick={() => {
                    setEditing(null);
                    setConfiguring({ categoryId: selectedCategory.id, product });
                    setScreen("product");
                  }}
                  type="button"
                >
                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-slate-950">{product.name}</h3>
                    {product.description ? (
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{product.description}</p>
                    ) : null}
                    {takeaway && product.takeawayPrice !== products.find((item) => item.id === product.id)?.price ? (
                      <p className="mt-1 text-xs font-semibold text-blue-700">Take away τιμή</p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-base font-black text-blue-700">{formatAmount(product.price)}€</span>
                </button>
              ))}
          </div>
        ) : (
          <div className="mt-4">
            <h3 className="text-base font-bold text-slate-950">Επιλογή κατηγορίας</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="min-h-16 rounded-2xl border border-blue-100 bg-white px-3 py-4 text-left text-sm font-black text-slate-950 shadow-sm shadow-blue-950/5"
                  onClick={() => {
                    setCategoryId(category.id);
                    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
                  }}
                  type="button"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {quantity > 0 ? (
          <div className="fixed inset-x-0 bottom-0 z-20 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <button
              className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-white px-4 py-4 text-left shadow-lg shadow-blue-950/15"
              onClick={() => setScreen("cart")}
              type="button"
            >
              <span className="min-w-0">
                <span className="block text-base font-black text-slate-950">Καλάθι</span>
                <span className="mt-0.5 block truncate text-sm font-semibold text-slate-600">
                  {quantity} {quantity === 1 ? "προϊόν" : "προϊόντα"} · {formatAmount(total)}€
                </span>
              </span>
              <span className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white">Προβολή</span>
            </button>
          </div>
        ) : null}
      </section>
    );
  }

  if (!takeaway && screen === "guests" && table) {
    return (
      <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{formatTableDisplayName(table.name)}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Άτομα τραπεζιού</h2>
        <p className="mt-2 text-sm font-medium text-slate-600">Επίλεξε πόσα άτομα κάθονται στο τραπέζι.</p>
        <div className="mt-6">
          <GuestCountStepper label="Άτομα τραπεζιού" onChange={setGuests} value={guests} />
        </div>
        <button
          className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-slate-400"
          disabled={parseGuestCount(guests) === null}
          onClick={() => {
            if (parseGuestCount(guests) !== null) setScreen("menu");
          }}
          type="button"
        >
          Συνέχεια στο μενού
        </button>
        <button
          className="mt-3 w-full rounded-2xl border border-blue-200 bg-white px-5 py-3 text-base font-bold text-blue-700"
          onClick={() => setScreen("table")}
          type="button"
        >
          Αλλαγή τραπεζιού
        </button>
      </section>
    );
  }

  return (
    <section>
      <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-5">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">Επιλογή τραπεζιού</h2>
        <p className="mt-2 text-sm font-medium text-slate-600">Επίλεξε ένα από τα τραπέζια που σου έχουν ανατεθεί.</p>
      </div>
      {assignedTables.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-6 text-center text-sm text-slate-600">
          Δεν έχεις ενεργά τραπέζια αυτή τη στιγμή.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {assignedTables.map((item) => (
            <button
              key={item.id}
              className="min-h-16 rounded-2xl border border-blue-100 bg-white px-4 py-4 text-left text-xl font-black text-slate-950 shadow-sm shadow-blue-950/5 transition"
              onClick={() => {
                if (table?.id !== item.id) {
                  setLines({});
                  setOrderNote("");
                  setGuests(DEFAULT_GUEST_COUNT);
                }
                setTable(item);
                setScreen("guests");
              }}
              type="button"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function WaiterCartPanel({
  tableName,
  items,
  orderNote,
  onOrderNoteChange,
  onBack,
  onEditItem,
  onUpdateQuantity,
  onRemoveItem,
  onSubmit,
}: {
  tableName: string;
  items: CartLine[];
  orderNote: string;
  onOrderNoteChange: (value: string) => void;
  onBack: () => void;
  onEditItem: (line: CartLine) => void;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemoveItem: (lineId: string) => void;
  onSubmit: () => void;
}) {
  const total = cartTotal(items);
  return (
    <section className="pb-[calc(8rem+env(safe-area-inset-bottom))]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Καλάθι</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            {tableName === TAKEAWAY_LABEL ? TAKEAWAY_LABEL : formatTableDisplayName(tableName)}
          </h2>
        </div>
        <button
          className="shrink-0 rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-bold text-blue-700"
          onClick={onBack}
          type="button"
        >
          Πίσω
        </button>
      </div>
      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-6 text-center text-sm text-slate-600">
          Το καλάθι είναι άδειο.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((line) => (
            <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5" key={line.lineId}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-black text-slate-950">{line.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{formatAmount(lineTotal(line))}€</p>
                </div>
                <button
                  className="shrink-0 text-sm font-bold text-red-700"
                  onClick={() => onRemoveItem(line.lineId)}
                  type="button"
                >
                  Αφαίρεση
                </button>
              </div>
              {line.options.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {line.options.map((option) => (
                    <p className="text-sm font-medium text-blue-700" key={`${option.groupId}-${option.id}`}>
                      {option.groupName}: {option.name}
                      {Number(option.priceDelta) !== 0 ? ` +${formatAmount(option.priceDelta)}€` : ""}
                    </p>
                  ))}
                </div>
              ) : null}
              {line.extras.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {line.extras.map((extra) => (
                    <p className="text-sm font-medium text-blue-700" key={extra.id}>
                      + {extra.name} {formatAmount(extra.price)}€
                    </p>
                  ))}
                </div>
              ) : null}
              {line.note ? (
                <p className="mt-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-medium text-slate-700">{line.note}</p>
              ) : null}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 text-2xl font-black text-blue-700 disabled:text-slate-300"
                    onClick={() => onUpdateQuantity(line.lineId, line.quantity - 1)}
                    type="button"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-xl font-black text-slate-950">{line.quantity}</span>
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 text-2xl font-black text-blue-700"
                    onClick={() => onUpdateQuantity(line.lineId, line.quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <button
                  className="rounded-xl border border-blue-200 px-3 py-2 text-sm font-bold text-blue-700"
                  onClick={() => onEditItem(line)}
                  type="button"
                >
                  Επεξεργασία
                </button>
              </div>
            </article>
          ))}
          <div>
            <label className="block text-sm font-bold text-slate-700" htmlFor="pda-order-note">
              Σημείωση παραγγελίας
            </label>
            <textarea
              className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-base text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="pda-order-note"
              onChange={(event) => onOrderNoteChange(event.target.value)}
              placeholder="Προαιρετικό"
              rows={3}
              value={orderNote}
            />
          </div>
        </div>
      )}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-blue-100 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-700">Σύνολο</span>
            <span className="text-2xl font-black text-slate-950">{formatAmount(total)}€</span>
          </div>
          <button
            className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={items.length === 0}
            onClick={onSubmit}
            type="button"
          >
            Αποστολή παραγγελίας
          </button>
        </div>
      </div>
    </section>
  );
}

function WaiterProductConfig({
  product,
  categoryName,
  initial,
  onCancel,
  onSave,
}: {
  product: DemoProduct;
  categoryName: string;
  initial: CartLine | null;
  onCancel: () => void;
  onSave: (payload: { quantity: number; note: string; extras: CartExtra[]; options: CartOption[] }) => void;
}) {
  const [quantity, setQuantity] = useState(Math.max(1, initial?.quantity ?? 1));
  const [note, setNote] = useState(initial?.note ?? "");
  const [extraIds, setExtraIds] = useState<string[]>(initial?.extras.map((extra) => extra.id) ?? []);
  const [options, setOptions] = useState<Record<string, string[]>>(() => {
    if (!initial) return defaultOptions(product);
    const selected: Record<string, string[]> = {};
    for (const group of product.optionGroups) selected[group.id] = [];
    for (const option of initial.options) {
      selected[option.groupId] = [...(selected[option.groupId] ?? []), option.id];
    }
    return selected;
  });

  const extras = product.extras.filter((extra) => extraIds.includes(extra.id));
  const selectedOptions: CartOption[] = product.optionGroups.flatMap((group) => {
    const ids = options[group.id] ?? [];
    return group.choices
      .filter((choice) => ids.includes(choice.id))
      .map((choice) => ({
        id: choice.id,
        groupId: group.id,
        groupName: group.name,
        name: choice.name,
        priceDelta: choice.price,
      }));
  });
  const blocked = product.optionGroups.some((group) => group.required && (options[group.id] ?? []).length === 0);
  const linePrice =
    (Number(product.price) + extras.reduce((sum, extra) => sum + extra.price, 0) + selectedOptions.reduce((sum, option) => sum + option.priceDelta, 0)) *
    quantity;

  return (
    <section className="flex min-h-[70vh] flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{categoryName}</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{product.name}</h2>
          <p className="mt-1 text-lg font-black text-blue-700">{formatAmount(product.price)}€</p>
        </div>
        <button
          className="shrink-0 rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-bold text-blue-700"
          onClick={onCancel}
          type="button"
        >
          Πίσω
        </button>
      </div>
      {product.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p> : null}
      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
        <p className="text-sm font-bold text-slate-700">Ποσότητα</p>
        <div className="mt-3 flex items-center justify-center gap-5">
          <button
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl font-black text-blue-700 disabled:text-slate-300"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            type="button"
          >
            −
          </button>
          <span className="min-w-10 text-center text-3xl font-black text-slate-950">{quantity}</span>
          <button
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl font-black text-blue-700"
            onClick={() => setQuantity((value) => value + 1)}
            type="button"
          >
            +
          </button>
        </div>
      </div>
      {product.optionGroups.length > 0 ? (
        <div className="mt-5 space-y-5">
          {product.optionGroups.map((group) => {
            const selected = options[group.id] ?? [];
            return (
              <div key={group.id}>
                <p className="text-sm font-bold text-slate-800">
                  {group.name}
                  {group.required ? <span className="ml-1 text-red-600">*</span> : null}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.choices.map((choice) => {
                    const active = selected.includes(choice.id);
                    return (
                      <button
                        key={choice.id}
                        className={`min-h-12 rounded-2xl border px-4 py-3 text-base font-bold transition ${
                          active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-200 bg-white text-blue-700"
                        }`}
                        onClick={() =>
                          setOptions((current) => {
                            const ids = current[group.id] ?? [];
                            return { ...current, [group.id]: ids[0] !== choice.id || group.required ? [choice.id] : [] };
                          })
                        }
                        type="button"
                      >
                        {choice.name}
                        {Number(choice.price) !== 0 ? ` +${formatAmount(choice.price)}€` : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {product.extras.length > 0 ? (
        <div className="mt-5">
          <p className="text-sm font-bold text-slate-800">Έξτρα</p>
          <div className="mt-2">
            <CollapsibleChipList>
              {product.extras.map((extra) => {
                const active = extraIds.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    className={`min-h-12 rounded-2xl border px-4 py-3 text-base font-bold transition ${
                      active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-200 bg-white text-blue-700"
                    }`}
                    onClick={() =>
                      setExtraIds((current) =>
                        current.includes(extra.id) ? current.filter((id) => id !== extra.id) : [...current, extra.id],
                      )
                    }
                    type="button"
                  >
                    {extra.name} +{formatAmount(extra.price)}€
                  </button>
                );
              })}
            </CollapsibleChipList>
          </div>
        </div>
      ) : null}
      <label className="mt-5 block text-sm font-bold text-slate-700" htmlFor={`pda-product-note-${product.id}`}>
        Σημείωση
      </label>
      <input
        className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-base text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        id={`pda-product-note-${product.id}`}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Προαιρετικό"
        type="text"
        value={note}
      />
      {blocked ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          Επίλεξε όλες τις υποχρεωτικές επιλογές.
        </p>
      ) : null}
      <div className="mt-auto pt-6">
        <div className="mb-3 flex items-center justify-between text-base">
          <span className="font-bold text-slate-700">Σύνολο γραμμής</span>
          <span className="text-xl font-black text-slate-950">{formatAmount(linePrice)}€</span>
        </div>
        <button
          className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={blocked}
          onClick={() => {
            if (!blocked) onSave({ quantity, note: note.trim(), extras, options: selectedOptions });
          }}
          type="button"
        >
          {initial ? "Ενημέρωση καλαθιού" : "Προσθήκη"}
        </button>
      </div>
    </section>
  );
}

export function tablesFromDemo(tables: DemoTable[]): AssignedTable[] {
  return tables.map((table) => ({ id: table.id, name: table.label }));
}

export function OrderLineItems({
  items,
}: {
  items: {
    id: string;
    product_name_snapshot: string;
    quantity: number;
    total_price: number;
    extras: { id: string; name_snapshot: string; price_snapshot: number }[];
    options: { id: string; item_name_snapshot: string; price_delta_snapshot: number }[];
    note: string;
  }[];
}) {
  return (
    <div className="mt-2 divide-y divide-blue-50">
      {items.map((item) => (
        <WaiterOrderItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function WaiterOrderItem({
  item,
}: {
  item: {
    id: string;
    product_name_snapshot: string;
    quantity: number;
    total_price: number;
    extras: { id: string; name_snapshot: string; price_snapshot: number }[];
    options: { id: string; item_name_snapshot: string; price_delta_snapshot: number }[];
    note: string;
  };
}) {
  const extras = item.extras ?? [];
  const options = item.options ?? [];
  return (
    <div className="py-2">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 font-bold text-slate-950">
          <span className="font-black text-blue-700">{item.quantity}×</span> {item.product_name_snapshot}
        </p>
        <p className="shrink-0 font-black text-blue-700">{formatAmount(item.total_price)}€</p>
      </div>
      {options.length > 0 || extras.length > 0 || item.note ? (
        <ul className="mt-1 space-y-0.5 text-sm font-medium text-slate-600">
          {options.map((option) => (
            <li key={option.id}>
              {option.item_name_snapshot}
              {Number(option.price_delta_snapshot) !== 0 ? ` +${formatAmount(option.price_delta_snapshot)}€` : ""}
            </li>
          ))}
          {extras.map((extra) => (
            <li key={extra.id}>
              + {extra.name_snapshot} +{formatAmount(extra.price_snapshot)}€
            </li>
          ))}
          {item.note ? <li>Σχόλιο: {item.note}</li> : null}
        </ul>
      ) : null}
    </div>
  );
}

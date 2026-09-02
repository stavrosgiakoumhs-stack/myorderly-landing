"use client";

import { useMemo, useState } from "react";
import { categories, products, type DemoProduct } from "@/lib/demo-data";
import { formatEuro } from "@/lib/money";
import { cartTotal, nextLineId, type CartLine } from "@/lib/demo-cart";
import { IconClose } from "@/components/landing/Icons";

type Props = {
  contextLabel: string;
  guestCount: number | null;
  submitLabel?: string;
  onSubmit: (payload: { lines: CartLine[]; note: string; total: number }) => void;
};

export function MenuOrdering({ contextLabel, guestCount, submitLabel = "Αποστολή παραγγελίας", onSubmit }: Props) {
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [note, setNote] = useState("");
  const [configuring, setConfiguring] = useState<DemoProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const visible = useMemo(() => products.filter((p) => p.categoryId === categoryId), [categoryId]);
  const total = cartTotal(lines);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  function addConfigured(product: DemoProduct, extras: string[], options: string[], quantity: number) {
    const extraSum = product.extras.filter((e) => extras.includes(e.id)).reduce((s, e) => s + e.price, 0);
    const optionSum = product.optionGroups.reduce((s, group) => {
      const choice = group.choices.find((c) => options.includes(c.id));
      return s + (choice?.price ?? 0);
    }, 0);
    const extraNames = product.extras.filter((e) => extras.includes(e.id)).map((e) => e.name);
    const optionNames = product.optionGroups.flatMap((group) => {
      const choice = group.choices.find((c) => options.includes(c.id));
      return choice ? [`${group.name}: ${choice.name}`] : [];
    });
    setLines((prev) => [
      ...prev,
      {
        lineId: nextLineId(),
        productId: product.id,
        name: product.name,
        station: product.station,
        quantity,
        unitPrice: product.price + extraSum + optionSum,
        extras: extraNames,
        options: optionNames,
      },
    ]);
    setConfiguring(null);
    setCartOpen(true);
  }

  function changeQty(lineId: string, delta: number) {
    setLines((prev) =>
      prev
        .map((line) => (line.lineId === lineId ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-orderly-blue">{contextLabel}</p>
        <p className="text-sm text-slate-600">
          {guestCount ? `${guestCount} άτομα · ` : null}
          Διάλεξε από το μενού
        </p>
      </div>

      <div className="demo-scroll-hide flex gap-2 overflow-x-auto border-b border-slate-100 bg-white px-4 py-2">
        {categories.map((cat) => {
          const active = cat.id === categoryId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryId(cat.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
                active ? "bg-orderly-navy text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {visible.map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => setConfiguring(product)}
              className="flex w-full items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-orderly-blue/30"
            >
              <div>
                <p className="font-semibold text-orderly-navy">{product.name}</p>
                <p className="mt-1 text-sm text-slate-600">{product.description}</p>
                {product.extras.length || product.optionGroups.length ? (
                  <p className="mt-1 text-xs text-orderly-blue">Επιλογές / extras</p>
                ) : null}
              </div>
              <p className="shrink-0 text-sm font-bold text-orderly-blue">{formatEuro(product.price)}</p>
            </button>
          </li>
        ))}
      </ul>

      {count > 0 ? (
        <div className="border-t border-slate-200 bg-white p-3">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex h-12 w-full items-center justify-between rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark px-5 text-sm font-semibold text-white shadow-lg shadow-orderly-blue/25"
          >
            <span>Καλάθι · {count}</span>
            <span>{formatEuro(total)}</span>
          </button>
        </div>
      ) : null}

      {configuring ? (
        <ProductConfigurator
          product={configuring}
          onClose={() => setConfiguring(null)}
          onAdd={addConfigured}
        />
      ) : null}

      {cartOpen ? (
        <div className="absolute inset-0 z-20 flex flex-col bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h2 className="text-lg font-bold text-orderly-navy">Καλάθι</h2>
            <button type="button" onClick={() => setCartOpen(false)} className="rounded-full p-2 text-slate-500">
              <IconClose className="h-5 w-5 text-slate-500" />
              <span className="sr-only">Κλείσιμο καλαθιού</span>
            </button>
          </div>
          {lines.length === 0 ? (
            <p className="px-4 py-8 text-sm text-slate-500">Το καλάθι είναι άδειο.</p>
          ) : (
            <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {lines.map((line) => (
                <li key={line.lineId} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-orderly-navy">{line.name}</p>
                      {line.options.concat(line.extras).length ? (
                        <p className="mt-1 text-xs text-slate-500">{line.options.concat(line.extras).join(" · ")}</p>
                      ) : null}
                    </div>
                    <p className="text-sm font-bold text-orderly-blue">{formatEuro(line.unitPrice * line.quantity)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full bg-white text-lg font-semibold text-orderly-navy ring-1 ring-slate-200"
                      onClick={() => changeQty(line.lineId, -1)}
                      aria-label="Μείωση ποσότητας"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">{line.quantity}</span>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full bg-white text-lg font-semibold text-orderly-navy ring-1 ring-slate-200"
                      onClick={() => changeQty(line.lineId, 1)}
                      aria-label="Αύξηση ποσότητας"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="space-y-3 border-t border-slate-200 p-4">
            <label className="block text-sm font-medium text-orderly-navy" htmlFor="order-note">
              Σημείωση παραγγελίας
            </label>
            <textarea
              id="order-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={2}
              placeholder="π.χ. χωρίς πάγο, όλα μαζί"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-orderly-blue"
            />
            <button
              type="button"
              disabled={lines.length === 0}
              onClick={() => onSubmit({ lines, note, total })}
              className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark text-sm font-semibold text-white disabled:opacity-50"
            >
              {submitLabel} · {formatEuro(total)}
            </button>
            <p className="text-center text-[11px] text-slate-500">Demo — δεν δημιουργείται πραγματική παραγγελία.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProductConfigurator({
  product,
  onClose,
  onAdd,
}: {
  product: DemoProduct;
  onClose: () => void;
  onAdd: (product: DemoProduct, extras: string[], options: string[], quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>(
    product.optionGroups.filter((g) => g.required).map((g) => g.choices[0]?.id).filter(Boolean) as string[],
  );

  const extraSum = product.extras.filter((e) => extras.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const optionSum = product.optionGroups.reduce((s, group) => {
    const choice = group.choices.find((c) => options.includes(c.id));
    return s + (choice?.price ?? 0);
  }, 0);
  const unit = product.price + extraSum + optionSum;

  function selectOption(groupId: string, choiceId: string) {
    const group = product.optionGroups.find((g) => g.id === groupId);
    if (!group) return;
    const ids = new Set(group.choices.map((c) => c.id));
    setOptions((prev) => [...prev.filter((id) => !ids.has(id)), choiceId]);
  }

  function toggleExtra(id: string) {
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-white" role="dialog" aria-modal="true" aria-labelledby="cfg-title">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 id="cfg-title" className="text-lg font-bold text-orderly-navy">
          {product.name}
        </h2>
        <button type="button" onClick={onClose} className="rounded-full p-2">
          <IconClose className="h-5 w-5 text-slate-500" />
          <span className="sr-only">Κλείσιμο</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-sm text-slate-600">{product.description}</p>
        <p className="mt-2 text-sm font-bold text-orderly-blue">{formatEuro(product.price)}</p>
        {product.optionGroups.map((group) => (
          <fieldset key={group.id} className="mt-5">
            <legend className="text-sm font-semibold text-orderly-navy">
              {group.name}
              {group.required ? " *" : ""}
            </legend>
            <div className="mt-2 space-y-2">
              {group.choices.map((choice) => {
                const checked = options.includes(choice.id);
                return (
                  <label
                    key={choice.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 ring-1 ${
                      checked ? "bg-orderly-ice ring-orderly-blue/30" : "bg-slate-50 ring-slate-100"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm text-slate-800">
                      <input
                        type="radio"
                        name={group.id}
                        checked={checked}
                        onChange={() => selectOption(group.id, choice.id)}
                      />
                      {choice.name}
                    </span>
                    {choice.price > 0 ? (
                      <span className="text-xs font-semibold text-orderly-blue">+{formatEuro(choice.price)}</span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
        {product.extras.length ? (
          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-orderly-navy">Extras</legend>
            <div className="mt-2 space-y-2">
              {product.extras.map((extra) => {
                const checked = extras.includes(extra.id);
                return (
                  <label
                    key={extra.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 ring-1 ${
                      checked ? "bg-orderly-ice ring-orderly-blue/30" : "bg-slate-50 ring-slate-100"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm text-slate-800">
                      <input type="checkbox" checked={checked} onChange={() => toggleExtra(extra.id)} />
                      {extra.name}
                    </span>
                    <span className="text-xs font-semibold text-orderly-blue">
                      {extra.price > 0 ? `+${formatEuro(extra.price)}` : "δωρεάν"}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}
      </div>
      <div className="flex items-center gap-3 border-t border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-slate-100 text-lg font-semibold"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Μείωση"
          >
            −
          </button>
          <span className="min-w-6 text-center font-semibold">{quantity}</span>
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-slate-100 text-lg font-semibold"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Αύξηση"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => onAdd(product, extras, options, quantity)}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark text-sm font-semibold text-white"
        >
          Προσθήκη · {formatEuro(unit * quantity)}
        </button>
      </div>
    </div>
  );
}

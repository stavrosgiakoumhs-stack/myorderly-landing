"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { categories, products, venue, type DemoChoice, type DemoExtra, type DemoOptionGroup, type DemoProduct } from "@/lib/demo-data";
import { formatAmount, formatAmountEuro } from "@/lib/money";
import { cartQuantity, cartTotal, lineKey, lineTotal, nextOrderNumber, type CartLine, type CartOption } from "@/lib/demo-cart";
import { DEFAULT_GUEST_COUNT, formatTableDisplayName, parseGuestCount } from "@/lib/demo-format";
import { CollapsibleChipList } from "./CollapsibleChipList";
import { GuestCountStepper } from "./GuestCount";

type SubmitResult = {
  success: true;
  orderNumber: number;
  totalAmount: string;
};

function defaultOptions(product: DemoProduct): Record<string, string[]> {
  const selected: Record<string, string[]> = {};
  for (const group of product.optionGroups) {
    const defaults = group.required ? group.choices.slice(0, 1).map((choice) => choice.id) : [];
    selected[group.id] = defaults;
  }
  return selected;
}

function requiredMissing(product: DemoProduct, options: Record<string, string[]>): boolean {
  return product.optionGroups.some((group) => group.required && (options[group.id] ?? []).length === 0);
}

export function CustomerDemo() {
  const [lines, setLines] = useState<Record<string, CartLine>>({});
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [orderNote, setOrderNote] = useState("");
  const [guests, setGuests] = useState(DEFAULT_GUEST_COUNT);
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [addedFlash, setAddedFlash] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [cartVisible, setCartVisible] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const productsRef = useRef<HTMLElement | null>(null);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const flashTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
  }, []);

  const selectedCategory = categories.find((category) => category.id === categoryId) ?? null;
  const categoryProducts = useMemo(
    () => products.filter((product) => product.categoryId === categoryId),
    [categoryId],
  );
  const cartLines = useMemo(() => Object.values(lines), [lines]);
  const total = cartTotal(cartLines);
  const quantity = cartQuantity(cartLines);
  const showStickyCart = quantity > 0 && !cartVisible;

  function scrollToProducts() {
    const section = productsRef.current;
    if (!section) return;
    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }

  function addProduct(product: DemoProduct, note: string, extras: DemoExtra[], options: CartOption[]) {
    const key = lineKey(product.id, note, extras, options);
    setLines((current) => {
      const existing = current[key];
      return {
        ...current,
        [key]: existing
          ? { ...existing, quantity: existing.quantity + 1 }
          : {
              lineId: key,
              productId: product.id,
              categoryId: product.categoryId,
              name: product.name,
              station: product.station,
              quantity: 1,
              basePrice: product.price,
              extras,
              options,
              note,
            },
      };
    });
    setAddedFlash(true);
    setAddedProductId(product.id);
    if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => {
      setAddedFlash(false);
      setAddedProductId(null);
      flashTimer.current = null;
    }, 1500);
  }

  function setQuantity(lineId: string, next: number) {
    setLines((current) => {
      const existing = current[lineId];
      if (!existing) return current;
      if (next <= 0) {
        const copy = { ...current };
        delete copy[lineId];
        return copy;
      }
      return { ...current, [lineId]: { ...existing, quantity: next } };
    });
  }

  useEffect(() => {
    const cart = cartRef.current;
    if (!cart || cartLines.length === 0 || typeof IntersectionObserver === "undefined") {
      setCartVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCartVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -120px 0px", threshold: 0.1 },
    );
    observer.observe(cart);
    return () => observer.disconnect();
  }, [cartLines.length]);

  if (result?.success) {
    return (
      <main className="min-h-screen bg-white px-4 py-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-sm shadow-blue-950/5">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Orderly · Demo</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Η παραγγελία σου στάλθηκε.</h1>
          <p className="mt-4 text-slate-600">Order #{result.orderNumber}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{result.totalAmount}</p>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            Demo — δεν δημιουργήθηκε πραγματική παραγγελία.
          </p>
          <button
            className="mt-8 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            onClick={() => {
              setResult(null);
              setLines({});
              setOrderNote("");
              setConfirmed(false);
              setCategoryId(null);
            }}
            type="button"
          >
            Back to menu
          </button>
        </div>
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className={`min-h-screen bg-white ${showStickyCart ? "pb-[calc(7rem+env(safe-area-inset-bottom))]" : ""}`}>
        <header className="sticky top-0 z-10 border-b border-blue-100 bg-white/95 px-4 py-4 backdrop-blur" ref={headerRef}>
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <Image
              alt="Orderly"
              className="h-11 w-11 shrink-0 rounded-xl shadow-sm shadow-blue-200/40 sm:h-12 sm:w-12"
              height={96}
              priority
              src="/icon-192x192.png"
              width={96}
            />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{venue.name}</h1>
              <p className="mt-0.5 truncate text-sm text-slate-600">
                {formatTableDisplayName(venue.demoTable.label)} · {guests} άτομα
              </p>
            </div>
          </div>
        </header>
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-6">
            <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">Επιλέξτε κατηγορία</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {categories.map((category) => {
                  const count = products.filter((product) => product.categoryId === category.id).length;
                  const active = categoryId === category.id;
                  return (
                    <button
                      key={category.id}
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-blue-100 bg-blue-50/60 text-slate-950 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                      onClick={() => {
                        setCategoryId(category.id);
                        window.requestAnimationFrame(() => {
                          window.requestAnimationFrame(scrollToProducts);
                        });
                      }}
                      type="button"
                    >
                      <span className="block font-semibold">{category.name}</span>
                      <span className={`mt-1 block text-sm ${active ? "text-blue-50" : "text-slate-600"}`}>
                        {count} προϊόντα
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
            {selectedCategory ? (
              <section id={`category-products-${selectedCategory.id}`} ref={productsRef}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Επιλεγμένη κατηγορία</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">{selectedCategory.name}</h2>
                  </div>
                </div>
                {categoryProducts.length === 0 ? (
                  <p className="mt-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-6 text-sm text-slate-600">
                    Δεν υπάρχουν διαθέσιμα προϊόντα σε αυτήν την κατηγορία.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {categoryProducts.map((product) => (
                      <CustomerProductCard
                        justAdded={addedProductId === product.id}
                        key={product.id}
                        onAddProduct={addProduct}
                        product={product}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : null}
          </section>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5" ref={cartRef}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-tight text-slate-950">Καλάθι</h2>
                <span
                  aria-hidden={!addedFlash}
                  className={`rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition-opacity duration-200 ${
                    addedFlash ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  role="status"
                >
                  Προστέθηκε ✓
                </span>
              </div>
              {cartLines.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">Προσθέστε προϊόντα για να ξεκινήσετε την παραγγελία σας.</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {cartLines.map((line, index) => (
                    <div className="rounded-xl border border-blue-100 p-4" key={line.lineId}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-slate-950">{line.name}</h3>
                          <p className="mt-1 text-sm text-slate-600">
                            Βάση {formatAmount(line.basePrice)}€ · Σύνολο {formatAmount(lineTotal(line))}€
                          </p>
                          {line.extras.length > 0 ? (
                            <div className="mt-2 space-y-1">
                              {line.extras.map((extra) => (
                                <p className="text-sm font-medium text-blue-700" key={extra.id}>
                                  + {extra.name} {formatAmount(extra.price)}€
                                </p>
                              ))}
                            </div>
                          ) : null}
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
                          {line.note ? (
                            <p className="mt-2 rounded-lg bg-blue-50 px-2 py-1 text-sm text-slate-700">{line.note}</p>
                          ) : null}
                        </div>
                        <button
                          className="text-sm font-semibold text-red-700 underline-offset-4 hover:underline"
                          onClick={() => setQuantity(line.lineId, 0)}
                          type="button"
                        >
                          Αφαίρεση
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          className="h-9 w-9 rounded-full border border-slate-300 text-lg font-semibold"
                          onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                          type="button"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center font-semibold">{line.quantity}</span>
                        <button
                          className="h-9 w-9 rounded-full border border-slate-300 text-lg font-semibold"
                          onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <label className="mt-3 block text-sm font-medium text-slate-700" htmlFor={`note-${index}`}>
                        Σημείωση προϊόντος
                      </label>
                      <input
                        className="mt-2 w-full rounded-lg border border-blue-100 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        id={`note-${index}`}
                        onChange={(event) => {
                          const note = event.target.value;
                          setLines((current) => {
                            const existing = current[line.lineId];
                            return existing ? { ...current, [line.lineId]: { ...existing, note } } : current;
                          });
                        }}
                        placeholder="Προαιρετικό"
                        type="text"
                        value={line.note}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="customerNote">
                      Σημείωση παραγγελίας
                    </label>
                    <textarea
                      className="mt-2 w-full rounded-lg border border-blue-100 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      id="customerNote"
                      onChange={(event) => setOrderNote(event.target.value)}
                      placeholder="Προαιρετικό"
                      rows={3}
                      value={orderNote}
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="font-semibold text-slate-950">Σύνολο</span>
                    <span className="text-xl font-bold text-slate-950">{formatAmount(total)}</span>
                  </div>
                </div>
              )}
              <button
                className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={cartLines.length === 0}
                onClick={() => {
                  if (parseGuestCount(guests) === null) {
                    setConfirmed(false);
                    return;
                  }
                  setResult({
                    success: true,
                    orderNumber: nextOrderNumber(),
                    totalAmount: formatAmountEuro(total),
                  });
                }}
                type="button"
              >
                Αποστολή παραγγελίας
              </button>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Το τελικό σύνολο επιβεβαιώνεται κατά την αποστολή της παραγγελίας.
              </p>
            </div>
          </aside>
        </div>
        {showStickyCart ? (
          <div className="fixed inset-x-0 bottom-0 z-20 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <button
              className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-left shadow-lg shadow-blue-950/15 transition hover:border-blue-300 hover:bg-blue-50/40"
              onClick={() => cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              type="button"
            >
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-950">Καλάθι</span>
                <span className="mt-0.5 block truncate text-sm text-slate-600">
                  {quantity} {quantity === 1 ? "προϊόν" : "προϊόντα"} • {formatAmount(total)}€
                </span>
              </span>
              <span className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Προβολή</span>
            </button>
          </div>
        ) : null}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-md rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-sm shadow-blue-950/5">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{venue.name}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Πόσα άτομα είστε;</h1>
        <p className="mt-3 text-sm text-slate-600">{formatTableDisplayName(venue.demoTable.label)}</p>
        <div className="mt-8">
          <GuestCountStepper label="Άτομα τραπεζιού" onChange={setGuests} value={guests} />
        </div>
        <button
          className="mt-8 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={parseGuestCount(guests) === null}
          onClick={() => {
            if (parseGuestCount(guests) !== null) setConfirmed(true);
          }}
          type="button"
        >
          Συνέχεια στο μενού
        </button>
      </div>
    </main>
  );
}

function CustomerProductCard({
  product,
  justAdded,
  onAddProduct,
}: {
  product: DemoProduct;
  justAdded: boolean;
  onAddProduct: (product: DemoProduct, note: string, extras: DemoExtra[], options: CartOption[]) => void;
}) {
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [options, setOptions] = useState<Record<string, string[]>>(() => defaultOptions(product));
  const [note, setNote] = useState("");
  const blocked = requiredMissing(product, options);

  function toggleChoice(group: DemoOptionGroup, choice: DemoChoice) {
    setOptions((current) => {
      const selected = current[group.id] ?? [];
      return {
        ...current,
        [group.id]: selected[0] !== choice.id || group.required ? [choice.id] : [],
      };
    });
  }

  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-950">{product.name}</h3>
          {product.description ? <p className="mt-1 text-sm leading-6 text-slate-600">{product.description}</p> : null}
        </div>
        <p className="shrink-0 font-semibold text-slate-950">{formatAmount(product.price)}</p>
      </div>
      {product.optionGroups.length > 0 ? (
        <div className="mt-4">
          <div className="space-y-4">
            {product.optionGroups.map((group) => {
              const selected = options[group.id] ?? [];
              return (
                <div key={group.id}>
                  <p className="text-sm font-semibold text-slate-700">
                    {group.name}
                    {group.required ? <span className="ml-1 text-red-600">*</span> : null}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.choices.map((choice) => {
                      const active = selected.includes(choice.id);
                      return (
                        <button
                          key={choice.id}
                          className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                            active
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                          }`}
                          onClick={() => toggleChoice(group, choice)}
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
        </div>
      ) : null}
      <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor={`quick-note-${product.id}`}>
        Σημείωση προϊόντος
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-blue-100 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        id={`quick-note-${product.id}`}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Προαιρετικό"
        type="text"
        value={note}
      />
      {product.extras.length > 0 ? (
        <div className="mt-4">
          <p className="text-sm font-semibold text-slate-700">Προσθέστε έξτρα</p>
          <div className="mt-2">
            <CollapsibleChipList>
              {product.extras.map((extra) => {
                const active = extraIds.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                    onClick={() => {
                      setExtraIds((current) =>
                        current.includes(extra.id) ? current.filter((id) => id !== extra.id) : [...current, extra.id],
                      );
                    }}
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
      <button
        aria-live="polite"
        className={`mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 ${
          justAdded ? "scale-[0.98] bg-emerald-600 shadow-inner" : blocked ? "cursor-not-allowed bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={blocked}
        onClick={() => {
          if (blocked) return;
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
          onAddProduct(product, note.trim(), extras, selectedOptions);
          setExtraIds([]);
          setOptions(defaultOptions(product));
          setNote("");
        }}
        type="button"
      >
        {justAdded ? "Προστέθηκε ✓" : "Προσθήκη στο καλάθι"}
      </button>
    </article>
  );
}

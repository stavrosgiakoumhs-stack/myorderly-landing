"use client";

export function PaymentSheet({
  tableLabel,
  totalAmount,
  selectedMethod,
  isSubmitting,
  error,
  confirmLabel = "Ολοκλήρωση",
  onSelectMethod,
  onConfirm,
  onCancel,
}: {
  tableLabel: string;
  totalAmount: string;
  selectedMethod: "cash" | "card" | null;
  isSubmitting?: boolean;
  error?: string | null;
  confirmLabel?: string;
  onSelectMethod: (method: "cash" | "card") => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-3 sm:items-center">
      <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-950/20" role="dialog">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{tableLabel}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Τρόπος πληρωμής</h2>
        <p className="mt-1 text-sm font-semibold text-slate-600">Σύνολο {totalAmount}€</p>
        <div className="mt-4 grid gap-3">
          <button
            className={`min-h-14 rounded-2xl border px-4 py-3 text-lg font-black transition ${
              selectedMethod === "cash" ? "border-blue-600 bg-blue-600 text-white" : "border-blue-200 bg-white text-blue-700"
            }`}
            disabled={isSubmitting}
            onClick={() => onSelectMethod("cash")}
            type="button"
          >
            Μετρητά
          </button>
          <button
            className={`min-h-14 rounded-2xl border px-4 py-3 text-lg font-black transition ${
              selectedMethod === "card" ? "border-blue-600 bg-blue-600 text-white" : "border-blue-200 bg-white text-blue-700"
            }`}
            disabled={isSubmitting}
            onClick={() => onSelectMethod("card")}
            type="button"
          >
            Κάρτα
          </button>
        </div>
        {error ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>
        ) : null}
        <button
          className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={!selectedMethod || isSubmitting}
          onClick={onConfirm}
          type="button"
        >
          {isSubmitting ? "Ολοκληρώνεται..." : confirmLabel}
        </button>
        <button
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700"
          disabled={isSubmitting}
          onClick={onCancel}
          type="button"
        >
          Ακύρωση
        </button>
      </div>
    </div>
  );
}

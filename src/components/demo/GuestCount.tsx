"use client";

export function GuestCountPicker({
  value,
  onChange,
  label = "Πόσα άτομα;",
}: {
  value: number;
  onChange: (next: number) => void;
  label?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-orderly-navy">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`h-11 w-11 rounded-full text-sm font-semibold transition ${
                selected
                  ? "bg-orderly-navy text-white shadow-md"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:border-orderly-blue hover:ring-orderly-blue/30"
              }`}
              aria-pressed={selected}
            >
              {n}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

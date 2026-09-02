"use client";

import { clampGuestCount } from "@/lib/demo-format";

export function GuestCountStepper({
  value,
  onChange,
  label,
  disabled = false,
  id = "guest-count",
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  disabled?: boolean;
  id?: string;
}) {
  const guests = clampGuestCount(value);

  return (
    <div>
      <p className="text-sm font-semibold text-slate-700" id={`${id}-label`}>
        {label}
      </p>
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          aria-label="Λιγότερα άτομα"
          className="h-14 w-14 rounded-2xl border border-blue-200 bg-white text-3xl font-black text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled || guests <= 1}
          onClick={() => onChange(clampGuestCount(guests - 1))}
          type="button"
        >
          −
        </button>
        <input
          aria-labelledby={`${id}-label`}
          className="h-14 w-20 rounded-2xl border border-blue-200 bg-blue-50 text-center text-3xl font-black text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          disabled={disabled}
          id={id}
          inputMode="numeric"
          max={99}
          min={1}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (Number.isInteger(next)) onChange(clampGuestCount(next));
          }}
          type="number"
          value={guests}
        />
        <button
          aria-label="Περισσότερα άτομα"
          className="h-14 w-14 rounded-2xl border border-blue-200 bg-white text-3xl font-black text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled || guests >= 99}
          onClick={() => onChange(clampGuestCount(guests + 1))}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}

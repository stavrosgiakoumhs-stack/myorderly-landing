"use client";

import Image from "next/image";

export function DashboardHomeHeader({ shopName }: { shopName: string }) {
  return (
    <header className="border-b border-blue-100 pb-6">
      <Image
        alt="Orderly"
        className="h-16 w-16 rounded-2xl shadow-sm shadow-blue-200/40 sm:h-[72px] sm:w-[72px]"
        height={144}
        priority
        src="/icon-192x192.png"
        width={144}
      />
      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-blue-700">Orderly</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">Welcome to your dashboard</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">Managing {shopName}</p>
    </header>
  );
}

export function DashboardBackHeader({
  title,
  description,
  onBack,
}: {
  title: string;
  description: string;
  onBack: () => void;
}) {
  return (
    <header className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm shadow-blue-950/5">
      <div className="bg-blue-600 px-6 py-3">
        <button
          className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white transition hover:bg-white/25"
          onClick={onBack}
          type="button"
        >
          ← Dashboard
        </button>
      </div>
      <div className="p-6 sm:p-7">
        <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </header>
  );
}

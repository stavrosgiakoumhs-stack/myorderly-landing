"use client";

import Image from "next/image";

export function DashboardHomeHeader({ shopName }: { shopName: string }) {
  return (
    <header className="flex flex-col gap-4 border-b border-blue-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-5">
        <Image
          alt="Orderly"
          className="mt-0.5 h-16 w-16 shrink-0 rounded-2xl shadow-sm shadow-blue-200/50 sm:h-[72px] sm:w-[72px]"
          height={144}
          priority
          src="/icon-192x192.png"
          width={144}
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Orderly</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Welcome to your dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Managing {shopName}</p>
        </div>
      </div>
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
      <div className="bg-blue-600 px-6 py-3 sm:px-7">
        <button
          className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/25"
          onClick={onBack}
          type="button"
        >
          ← Dashboard
        </button>
      </div>
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </header>
  );
}

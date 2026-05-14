import { OrderlyLogo } from "./OrderlyLogo";
import { LOGIN_URL, REGISTER_URL } from "@/lib/landing-content";

function DashboardMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/[0.04]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Live orders</p>
          <p className="text-sm font-bold text-orderly-navy">Τραπέζι 12</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Νέα
        </span>
      </div>
      <ul className="space-y-2">
        {[
          { name: "Freddo espresso ×2", extra: "+ σιρόπι καρύδα", time: "πριν 12δ" },
          { name: "Club sandwich", extra: "χωρίς ντομάτα", time: "πριν 1λ" },
        ].map((row) => (
          <li
            key={row.name}
            className="flex items-start justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100"
          >
            <div>
              <p className="text-xs font-semibold text-orderly-navy">{row.name}</p>
              <p className="text-[10px] text-slate-500">{row.extra}</p>
            </div>
            <span className="shrink-0 text-[10px] text-slate-400">{row.time}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <span className="h-1.5 flex-1 rounded-full bg-orderly-blue/80" />
        <span className="h-1.5 w-8 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[min(100%,220px)]">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-orderly-blue/20 via-orderly-sky/10 to-transparent blur-2xl" />
      <div className="rounded-[2rem] border-[6px] border-slate-900 bg-slate-900 p-1 shadow-2xl shadow-slate-900/30">
        <div className="overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-orderly-ice to-white">
          <div className="flex items-center justify-between px-4 pb-2 pt-3">
            <span className="text-[10px] font-semibold text-orderly-navy">Τραπέζι 12</span>
            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-medium text-slate-500 ring-1 ring-slate-200">
              Μενού
            </span>
          </div>
          <div className="mx-3 mb-2 grid grid-cols-4 gap-1.5 rounded-lg bg-white/90 p-2 ring-1 ring-slate-100">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className={`aspect-square rounded-sm ${i % 3 === 0 ? "bg-orderly-navy" : "bg-slate-200"}`} />
            ))}
          </div>
          <div className="space-y-2 px-3 pb-3">
            <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-100">
              <div className="flex justify-between gap-2">
                <p className="text-[11px] font-semibold text-orderly-navy">Ice latte</p>
                <p className="text-[11px] font-bold text-orderly-blue">3,50€</p>
              </div>
              <p className="mt-1 text-[9px] text-slate-500">Γάλα · Σιρόπι · Ζάχαρη</p>
            </div>
            <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-100">
              <div className="flex justify-between gap-2">
                <p className="text-[11px] font-semibold text-orderly-navy">Toast αυγό</p>
                <p className="text-[11px] font-bold text-orderly-blue">5,20€</p>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-gradient-to-r from-orderly-blue to-orderly-blue-dark py-2 text-[11px] font-semibold text-white shadow-md shadow-orderly-blue/25"
            >
              Προσθήκη στο καλάθι
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaiterCardMockup() {
  return (
    <div className="relative rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/[0.04]">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orderly-ice text-orderly-blue ring-1 ring-orderly-blue/15">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Waiter view</p>
          <p className="truncate text-sm font-bold text-orderly-navy">Νέα παραγγελία · Τρ. 7</p>
          <p className="mt-0.5 text-xs text-slate-600">2× Μπύρα draft · 1× Ορεκτικό</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="inline-flex flex-1 items-center justify-center rounded-lg bg-slate-50 py-1.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-100">
          Ανάληψη
        </span>
        <span className="inline-flex flex-1 items-center justify-center rounded-lg bg-orderly-blue/10 py-1.5 text-[10px] font-semibold text-orderly-blue ring-1 ring-orderly-blue/20">
          Ολοκλήρωση
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-orderly-ice/90 via-white to-slate-50"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-orderly-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orderly-sky/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <div className="mb-8 sm:mb-10">
              <div className="inline-flex overflow-hidden rounded-[1.35rem] shadow-[0_12px_40px_-8px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.08] sm:rounded-[1.5rem]">
                <OrderlyLogo
                  priority
                  className="block h-[5.75rem] w-[5.75rem] object-cover object-center sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                  sizes="(max-width: 640px) 92px, (max-width: 1024px) 112px, 128px"
                />
              </div>
            </div>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              QR παραγγελίες για καφέ, bar και εστίαση — απλά και γρήγορα.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Οι πελάτες σκανάρουν το QR στο τραπέζι, στέλνουν την παραγγελία και η ομάδα σου τη βλέπει άμεσα στο
              dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={REGISTER_URL}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark px-8 text-sm font-semibold text-white shadow-lg shadow-orderly-blue/30 transition hover:brightness-105 hover:shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Δοκίμασε το Orderly
              </a>
              <a
                href={LOGIN_URL}
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-orderly-navy shadow-sm transition hover:border-orderly-blue/30 hover:bg-slate-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                Σύνδεση
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Χωρίς εγκατάσταση εφαρμογής για τον πελάτη · Ξεκάθαρη ροή για την ομάδα σου
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-orderly-blue/10 via-transparent to-orderly-sky/10" />
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1 lg:gap-6">
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  <DashboardMockup />
                  <div className="flex flex-col justify-center gap-4">
                    <WaiterCardMockup />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 flex justify-center lg:justify-end">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

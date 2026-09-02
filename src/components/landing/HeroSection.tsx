import Link from "next/link";
import { CONTACT_CTA_LABEL, contactMailto } from "@/lib/landing-content";
import { CustomerPhoneMockup, OwnerDashboardMockup, WaiterPdaMockup } from "./ProductMockups";
import { OrderlyLogo } from "./OrderlyLogo";

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
                  className="block h-[4.75rem] w-[4.75rem] object-cover object-center sm:h-24 sm:w-24 lg:h-28 lg:w-28"
                  sizes="(max-width: 640px) 76px, (max-width: 1024px) 96px, 112px"
                />
              </div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">
              Σύστημα παραγγελιοληψίας
            </p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Όλη η παραγγελιοληψία του καταστήματός σου, σε ένα σύστημα.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              QR στο τραπέζι, Waiter PDA, Orderly Print και live dashboard. Από την παραγγελία μέχρι την
              εκτύπωση στο bar και την κουζίνα — σε πραγματικό χρόνο.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark px-8 text-sm font-semibold text-white shadow-lg shadow-orderly-blue/30 transition hover:brightness-105 hover:shadow-xl"
              >
                Δες το Demo
              </Link>
              <a
                href={contactMailto()}
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-orderly-navy shadow-sm transition hover:border-orderly-blue/30 hover:bg-slate-50"
              >
                {CONTACT_CTA_LABEL}
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Για καφέ, bars και εστιατόρια · Χωρίς ανάγκη σύνδεσης με POS και χωρίς online πληρωμές πελατών
            </p>
          </div>
          <div className="relative" aria-hidden>
            <div className="grid gap-4 sm:grid-cols-2">
              <OwnerDashboardMockup />
              <div className="flex flex-col gap-4">
                <WaiterPdaMockup />
                <div className="hidden sm:block lg:hidden">
                  <CustomerPhoneMockup compact />
                </div>
              </div>
              <div className="col-span-full flex justify-center sm:hidden lg:col-span-2 lg:flex lg:justify-end">
                <CustomerPhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

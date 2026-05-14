import { pricingFeatures, REGISTER_URL } from "@/lib/landing-content";

export function PricingSection() {
  return (
    <section id="pricing" className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-orderly-ice/30 to-white py-16 sm:py-20 lg:py-24" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Τιμή</p>
          <h2 id="pricing-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Απλή συνδρομή, καθαρή αξία.
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-lg">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xl shadow-orderly-blue/10 ring-1 ring-slate-900/[0.04] sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orderly-blue/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-orderly-sky/15 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Πλάνο</p>
              <h3 className="mt-1 text-2xl font-extrabold text-orderly-navy">Orderly Basic</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-orderly-navy">20€</span>
                <span className="text-lg font-semibold text-slate-500">/μήνα</span>
                <span className="text-sm text-slate-500">ανά μαγαζί</span>
              </p>
              <p className="mt-6 text-sm leading-relaxed text-slate-600">
                Ιδανικό για μικρά και μεσαία μαγαζιά που θέλουν απλή QR παραγγελιοληψία χωρίς πολύπλοκες εγκαταστάσεις.
              </p>
              <ul className="mt-8 space-y-3">
                {pricingFeatures.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <a
                href={REGISTER_URL}
                className="mt-10 flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark text-sm font-semibold text-white shadow-lg shadow-orderly-blue/25 transition hover:brightness-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ξεκίνα τώρα
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

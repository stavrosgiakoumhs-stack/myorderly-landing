import { pricingPlans, contactMailto } from "@/lib/landing-content";
import { IconCheck, IconClose } from "./Icons";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-orderly-ice/30 to-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Πακέτα</p>
          <h2 id="pricing-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Δύο μηνιαία πλάνα, ανά κατάστημα.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Επίλεξε Starter στα 25€ ή Pro στα 40€ τον μήνα, ανά κατάστημα. Προς το παρόν η ενεργοποίηση του πακέτου
            γίνεται σε συνεννόηση με την ομάδα μας — επικοινώνησε μαζί μας και θα σε καθοδηγήσουμε στα επόμενα βήματα.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`relative overflow-hidden rounded-3xl border bg-white p-8 shadow-xl ring-1 sm:p-10 ${
                plan.featured
                  ? "border-orderly-blue/40 shadow-orderly-blue/15 ring-orderly-blue/20"
                  : "border-slate-200/80 shadow-slate-900/5 ring-slate-900/[0.04]"
              }`}
            >
              {plan.featured ? (
                <span className="absolute right-6 top-6 rounded-full bg-orderly-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              ) : null}
              <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">{plan.name}</p>
              <h3 className="mt-1 text-2xl font-extrabold text-orderly-navy">{plan.positioning}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-orderly-navy">{plan.price}</span>
                <span className="text-lg font-semibold text-slate-500">{plan.cadence}</span>
                <span className="text-sm text-slate-500">{plan.per}</span>
              </p>
              <ul className="mt-8 space-y-3">
                {plan.includes.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <IconCheck className="h-3 w-3 text-emerald-600" />
                    </span>
                    {line}
                  </li>
                ))}
                {"excludes" in plan
                  ? plan.excludes.map((line) => (
                      <li key={line} className="flex items-start gap-3 text-sm text-slate-400">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 ring-1 ring-slate-100">
                          <IconClose className="h-3 w-3 text-slate-400" />
                        </span>
                        {line}
                      </li>
                    ))
                  : null}
              </ul>
              <a
                href={contactMailto(plan.name)}
                className={`mt-10 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-gradient-to-r from-orderly-blue to-orderly-blue-dark text-white shadow-lg shadow-orderly-blue/25 hover:brightness-105"
                    : "border border-slate-200 bg-white text-orderly-navy hover:border-orderly-blue/30 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { solutions } from "@/lib/landing-content";
import { SolutionIcon } from "./SolutionIcons";

export function SolutionSection() {
  return (
    <section className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24" aria-labelledby="solution-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Λύση</p>
          <h2 id="solution-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Το Orderly φέρνει τη ροή πίσω στο μαγαζί σου.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Ένα καθαρό QR flow για πελάτες, με live εικόνα για την ομάδα — χωρίς περιττή πολυπλοκότητα.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.03] transition hover:-translate-y-0.5 hover:border-orderly-blue/20 hover:shadow-lg hover:shadow-orderly-blue/10"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orderly-ice ring-1 ring-orderly-blue/10">
                <SolutionIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-orderly-navy">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

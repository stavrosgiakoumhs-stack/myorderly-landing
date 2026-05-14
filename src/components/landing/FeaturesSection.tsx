import { featureCards } from "@/lib/landing-content";
import { FeatureGlyph } from "./SolutionIcons";

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-slate-200/80 bg-slate-50 py-16 sm:py-20 lg:py-24" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Δυνατότητες</p>
          <h2 id="features-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Ό,τι χρειάζεσαι για QR παραγγελίες — σε ένα μέρος.
          </h2>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((f) => (
            <li
              key={f.title}
              className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orderly-blue/20 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orderly-ice text-orderly-blue ring-1 ring-orderly-blue/10 transition group-hover:scale-105">
                <FeatureGlyph className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-orderly-navy">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

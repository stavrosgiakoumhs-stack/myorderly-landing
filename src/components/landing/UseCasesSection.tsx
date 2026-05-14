import { useCases } from "@/lib/landing-content";

const accents = [
  "from-orderly-blue/15 to-orderly-sky/5",
  "from-orderly-sky/20 to-orderly-blue/10",
  "from-orderly-ice to-orderly-blue/10",
  "from-orderly-blue/10 to-orderly-ice",
  "from-orderly-sky/15 to-white",
] as const;

export function UseCasesSection() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="usecases-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Χρήση</p>
          <h2 id="usecases-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Για κάθε τύπο μαγαζιού εστίασης.
          </h2>
          <p className="mt-4 text-base text-slate-600">Από τον καφέ μέχρι την ταβέρνα — το ίδιο απλό σύστημα.</p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, i) => (
            <li
              key={uc.title}
              className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br ${accents[i % accents.length]} p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl`}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
              <h3 className="relative text-xl font-bold text-orderly-navy">{uc.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-700">{uc.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

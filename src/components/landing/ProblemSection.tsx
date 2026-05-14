import { problems } from "@/lib/landing-content";

export function ProblemSection() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="problem-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Πρόβλημα</p>
            <h2 id="problem-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
              Όταν το service «βουλιάζει», χάνεται η εμπειρία.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Σε καφέ, bars και εστίαση, οι μικρές τριβές γίνονται μεγάλο κόστος σε ώρες αιχμής. Το Orderly στοχεύει
              ακριβώς εκεί.
            </p>
            <div className="mt-8 hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-orderly-ice/50 to-white p-6 shadow-inner shadow-slate-900/[0.03] lg:block">
              <p className="text-sm font-medium text-orderly-navy">Λιγότερο χάος, πιο καθαρή ροή.</p>
              <p className="mt-2 text-sm text-slate-600">Από το τραπέζι στο dashboard — χωρίς περιττά βήματα.</p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {problems.map((item, i) => (
              <li
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orderly-blue/25 hover:bg-white hover:shadow-lg hover:shadow-orderly-blue/10"
              >
                <span className="text-xs font-bold text-orderly-blue/70">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-orderly-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orderly-blue/5 blur-2xl transition group-hover:bg-orderly-blue/10" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

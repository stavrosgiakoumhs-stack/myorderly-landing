import { howSteps } from "@/lib/landing-content";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="how-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Πώς λειτουργεί</p>
            <h2 id="how-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
              Από το μενού μέχρι την παραγγελία σε 4 βήματα.
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 sm:text-right">
            Καθαρή ροή για να στήσεις γρήγορα και να δουλεύει σταθερά την επόμενη μέρα.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howSteps.map((step) => (
            <li key={step.step} className="relative">
              <div className="relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-6 text-center shadow-sm transition hover:border-orderly-blue/25 hover:shadow-md lg:text-left">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orderly-blue to-orderly-blue-dark text-lg font-extrabold text-white shadow-lg shadow-orderly-blue/25 lg:mx-0">
                  {step.step}
                </span>
                <h3 className="mt-4 text-lg font-bold text-orderly-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

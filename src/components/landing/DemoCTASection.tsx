import Link from "next/link";
import { IconQr, IconWaiter, IconPulse } from "./Icons";

const roles = [
  {
    title: "Πελάτης",
    body: "QR, άτομα στο τραπέζι, μενού, extras και αποστολή παραγγελίας.",
    icon: IconQr,
  },
  {
    title: "Σερβιτόρος",
    body: "PDA: τραπέζια, νέα παραγγελία, Take Away και ανοιχτοί λογαριασμοί.",
    icon: IconWaiter,
  },
  {
    title: "Ιδιοκτήτης",
    body: "Live παραγγελίες, έσοδα, print routing και αναφορές Pro.",
    icon: IconPulse,
  },
] as const;

export function DemoCTASection() {
  return (
    <section
      id="demo"
      className="scroll-mt-20 border-b border-slate-200/80 bg-gradient-to-b from-orderly-navy to-orderly-navy-deep py-16 sm:py-20 lg:py-24"
      aria-labelledby="demo-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-sky">Διαδραστικό demo</p>
          <h2 id="demo-cta-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Δοκίμασέ το πριν εγγραφείς.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Τρία σενάρια με δοκιμαστικά δεδομένα. Χωρίς λογαριασμό, χωρίς πραγματικές παραγγελίες.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {roles.map((role) => (
            <li key={role.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-orderly-sky">
                <role.icon className="h-5 w-5 text-orderly-sky" />
              </span>
              <h3 className="mt-4 font-bold text-white">{role.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{role.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            href="/demo"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-orderly-navy shadow-lg transition hover:bg-orderly-ice"
          >
            Άνοιξε το Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

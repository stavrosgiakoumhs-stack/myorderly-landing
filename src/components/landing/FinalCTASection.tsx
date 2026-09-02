import Link from "next/link";
import { CONTACT_CTA_LABEL, LOGIN_URL, contactMailto } from "@/lib/landing-content";

export function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden bg-orderly-navy py-16 sm:py-20 lg:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orderly-blue/25 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-orderly-sky/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 id="final-cta-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Έτοιμος να βάλεις τάξη στην παραγγελιοληψία;
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          Δοκίμασε το demo ή επικοινώνησέ μας για χειροκίνητη ενεργοποίηση — μενού, QR, print και dashboard.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/demo"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-orderly-navy shadow-lg transition hover:bg-orderly-ice"
          >
            Δες το Demo
          </Link>
          <a
            href={contactMailto()}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            {CONTACT_CTA_LABEL}
          </a>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Έχεις ήδη λογαριασμό;{" "}
          <a href={LOGIN_URL} className="font-medium text-orderly-sky hover:text-white" target="_blank" rel="noopener noreferrer">
            Σύνδεση
          </a>
        </p>
      </div>
    </section>
  );
}

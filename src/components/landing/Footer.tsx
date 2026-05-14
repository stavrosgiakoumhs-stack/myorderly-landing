import Link from "next/link";
import { OrderlyLogo } from "./OrderlyLogo";
import { CONTACT_EMAIL, LOGIN_URL, REGISTER_URL } from "@/lib/landing-content";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-orderly-navy text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <Link
              href="#top"
              className="inline-block rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-white/10 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
            >
              <OrderlyLogo className="h-9 w-auto max-w-[148px] object-contain object-left" sizes="148px" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Simple QR ordering for hospitality venues — καθαρή εμπειρία για την ομάδα και τον πελάτη.
            </p>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Σύνδεσμοι</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={REGISTER_URL}
                    className="text-white/90 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Δοκίμασε το Orderly
                  </a>
                </li>
                <li>
                  <a href={LOGIN_URL} className="text-white/90 hover:text-white" target="_blank" rel="noopener noreferrer">
                    Σύνδεση
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Επικοινωνία</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 block text-sm text-orderly-sky hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Orderly · myorderly.gr
        </p>
      </div>
    </footer>
  );
}

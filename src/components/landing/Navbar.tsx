import Link from "next/link";
import { OrderlyLogo } from "./OrderlyLogo";
import { REGISTER_URL } from "@/lib/landing-content";

const navLinks = [
  { href: "#how-it-works", label: "Πώς λειτουργεί" },
  { href: "#features", label: "Δυνατότητες" },
  { href: "#pricing", label: "Τιμή" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="flex shrink-0 items-center gap-2 rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563eb]"
        >
          <OrderlyLogo priority className="h-8 w-auto max-w-[128px] object-contain object-left sm:h-9 sm:max-w-[148px]" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Κύρια πλοήγηση">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-orderly-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={REGISTER_URL}
            className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark px-4 text-sm font-semibold text-white shadow-md shadow-orderly-blue/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-orderly-blue/30 sm:px-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Δοκίμασε το Orderly
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 pb-3 pt-2 md:hidden">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-orderly-navy">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

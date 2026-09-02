"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { OrderlyLogo } from "./OrderlyLogo";
import { IconClose, IconMenuBars } from "./Icons";
import { LOGIN_URL, REGISTER_URL, navItems } from "@/lib/landing-content";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-lg outline-offset-4"
          aria-label="Orderly — αρχική"
        >
          <OrderlyLogo
            className="h-9 w-auto max-w-[132px] object-contain object-left sm:h-10 sm:max-w-[148px]"
            sizes="148px"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Κύρια πλοήγηση">
          {navItems.map((item) => {
            const href = onHome && item.id !== "demo" ? `#${item.id}` : item.href;
            return (
              <Link
                key={item.id}
                href={href}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-orderly-navy"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={LOGIN_URL}
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-orderly-navy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Σύνδεση
          </a>
          <a
            href={REGISTER_URL}
            className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark px-5 text-sm font-semibold text-white shadow-md shadow-orderly-blue/25 transition hover:brightness-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ξεκίνα
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-orderly-navy lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenuBars className="h-5 w-5" />}
          <span className="sr-only">{open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}</span>
        </button>
      </div>

      {open ? (
        <div id={menuId} className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Κινητό μενού">
            {navItems.map((item) => {
              const href = onHome && item.id !== "demo" ? `#${item.id}` : item.href;
              return (
                <Link
                  key={item.id}
                  href={href}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={LOGIN_URL}
              className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Σύνδεση
            </a>
            <a
              href={REGISTER_URL}
              className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark text-sm font-semibold text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ξεκίνα με το Orderly
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

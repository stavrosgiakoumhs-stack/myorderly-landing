const navLinks = [
  { href: "#how-it-works", label: "Πώς λειτουργεί" },
  { href: "#features", label: "Δυνατότητες" },
  { href: "#pricing", label: "Τιμή" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-10 md:gap-x-12"
          aria-label="Κύρια πλοήγηση"
        >
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
      </div>
    </header>
  );
}

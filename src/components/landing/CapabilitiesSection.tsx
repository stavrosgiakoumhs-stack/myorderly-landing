import { capabilityGroups } from "@/lib/landing-content";
import { groupIcons } from "./Icons";

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-20 border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Δυνατότητες</p>
          <h2 id="capabilities-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Ό,τι χρειάζεται η παραγγελιοληψία — ομαδοποιημένα.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Όχι γενικά «features». Συγκεκριμένες ροές για πελάτη, service, παραγωγή και ιδιοκτήτη.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {capabilityGroups.map((group) => {
            const Icon = groupIcons[group.id];
            return (
              <section
                key={group.id}
                className="rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm sm:p-8"
                aria-labelledby={`cap-${group.id}`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orderly-ice ring-1 ring-orderly-blue/10">
                    <Icon />
                  </span>
                  <div>
                    <h3 id={`cap-${group.id}`} className="text-xl font-bold text-orderly-navy">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{group.description}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.title} className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
                      <p className="font-semibold text-orderly-navy">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { OrderlyLogo } from "@/components/landing/OrderlyLogo";
import { IconPulse, IconQr, IconWaiter } from "@/components/landing/Icons";
import { CONTACT_CTA_LABEL, contactMailto } from "@/lib/landing-content";
import { resetDemoIds } from "@/lib/demo-cart";
import { venue } from "@/lib/demo-data";
import { CustomerDemo } from "./CustomerDemo";
import { WaiterDemo } from "./WaiterDemo";
import { OwnerDemo } from "./OwnerDemo";

export type DemoRole = "customer" | "waiter" | "owner";

export function DemoApp() {
  const [role, setRole] = useState<DemoRole | null>(null);
  const [resetKey, setResetKey] = useState(0);

  function changeRole() {
    setRole(null);
  }

  function resetDemo() {
    resetDemoIds();
    setResetKey((value) => value + 1);
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-100">
      <div className="sticky top-0 z-40 border-b border-amber-300 bg-amber-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 text-amber-950 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm font-semibold">
            Demo Orderly · δοκιμαστικά δεδομένα · δεν είναι πραγματικός λογαριασμός
          </p>
          <div className="flex flex-wrap gap-2">
            {role ? (
              <>
                <button
                  type="button"
                  onClick={changeRole}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 ring-1 ring-amber-300"
                >
                  Αλλαγή ρόλου
                </button>
                <button
                  type="button"
                  onClick={resetDemo}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 ring-1 ring-amber-300"
                >
                  Επαναφορά Demo
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center rounded-lg" aria-label="Επιστροφή στο Orderly">
            <OrderlyLogo className="h-8 w-auto max-w-[128px] object-contain object-left" sizes="128px" />
          </Link>
          <a href={contactMailto()} className="text-sm font-semibold text-orderly-blue hover:underline">
            {CONTACT_CTA_LABEL}
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-0 py-0 sm:px-6 sm:py-8">
        {role === null ? <RolePicker onSelect={setRole} /> : null}
        <div key={resetKey} className={role && role !== "owner" ? "mx-auto flex w-full max-w-md flex-1 flex-col" : "flex flex-1 flex-col"}>
          {role === "customer" ? <CustomerDemo /> : null}
          {role === "waiter" ? <WaiterDemo /> : null}
          {role === "owner" ? <OwnerDemo /> : null}
        </div>
      </main>
    </div>
  );
}

function RolePicker({ onSelect }: { onSelect: (role: DemoRole) => void }) {
  const cards = [
    {
      id: "customer" as const,
      title: "Πελάτης",
      body: "Σκανάρισμα QR, άτομα στο τραπέζι, μενού, extras και αποστολή παραγγελίας.",
      icon: IconQr,
    },
    {
      id: "waiter" as const,
      title: "Σερβιτόρος",
      body: "PDA: τραπέζια, νέα παραγγελία, Take Away και ολοκλήρωση λογαριασμού.",
      icon: IconWaiter,
    },
    {
      id: "owner" as const,
      title: "Ιδιοκτήτης",
      body: "Live dashboard, έσοδα, print routing και αναφορές Pro.",
      icon: IconPulse,
    },
  ];

  return (
    <div className="flex flex-1 flex-col px-4 py-10 sm:px-0">
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
        Πώς θέλεις να γνωρίσεις το Orderly;
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 sm:text-base">
        Διάλεξε ρόλο. Όλα τρέχουν τοπικά, με το μενού του φανταστικού «{venue.name}».
      </p>
      <ul className="mx-auto mt-10 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <li key={card.id}>
            <button
              type="button"
              onClick={() => onSelect(card.id)}
              className="flex h-full w-full flex-col rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-orderly-blue/30 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orderly-ice">
                <card.icon />
              </span>
              <span className="mt-4 text-xl font-bold text-orderly-navy">{card.title}</span>
              <span className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

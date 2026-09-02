"use client";

import { useState } from "react";
import Link from "next/link";
import { venue } from "@/lib/demo-data";
import { formatEuro } from "@/lib/money";
import { nextOrderId, type CartLine } from "@/lib/demo-cart";
import { REGISTER_URL } from "@/lib/landing-content";
import { GuestCountPicker } from "./GuestCount";
import { MenuOrdering } from "./MenuOrdering";

type Step = "welcome" | "menu" | "success";

export function CustomerDemo() {
  const [step, setStep] = useState<Step>("welcome");
  const [guests, setGuests] = useState(2);
  const [order, setOrder] = useState<{ id: string; total: number; lines: CartLine[]; note: string } | null>(null);

  return (
    <div className="relative flex min-h-[32rem] flex-1 flex-col overflow-hidden rounded-none bg-slate-50 sm:rounded-3xl sm:border sm:border-slate-200 sm:shadow-xl">
      {step === "welcome" ? (
        <div className="flex flex-1 flex-col px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-orderly-blue">Πελάτης · QR</p>
          <h2 className="mt-2 text-2xl font-extrabold text-orderly-navy">{venue.name}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {venue.city} · {venue.demoTable.label}
          </p>
          <p className="mt-4 rounded-2xl bg-orderly-ice/80 px-4 py-3 text-sm text-orderly-navy ring-1 ring-orderly-blue/15">
            Σκάναρες το QR του τραπεζιού. Αυτό είναι demo — δεν στέλνεται παραγγελία στο κατάστημα.
          </p>
          <div className="mt-8">
            <GuestCountPicker value={guests} onChange={setGuests} />
          </div>
          <button
            type="button"
            onClick={() => setStep("menu")}
            className="mt-auto flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-orderly-blue to-orderly-blue-dark text-sm font-semibold text-white"
          >
            Συνέχεια στο μενού
          </button>
        </div>
      ) : null}

      {step === "menu" ? (
        <MenuOrdering
          contextLabel={venue.demoTable.label}
          guestCount={guests}
          onSubmit={({ lines, note, total }) => {
            setOrder({ id: nextOrderId(), total, lines, note });
            setStep("success");
          }}
        />
      ) : null}

      {step === "success" && order ? (
        <div className="flex flex-1 flex-col px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Demo επιτυχία</p>
          <h2 className="mt-2 text-2xl font-extrabold text-orderly-navy">Η παραγγελία καταχωρήθηκε.</h2>
          <p className="mt-2 text-sm text-slate-600">
            {order.id} · {venue.demoTable.label} · {guests} άτομα · {formatEuro(order.total)}
          </p>
          <ul className="mt-6 space-y-2">
            {order.lines.map((line) => (
              <li key={line.lineId} className="rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-slate-100">
                <span className="font-semibold text-orderly-navy">
                  {line.quantity}× {line.name}
                </span>
                {line.options.concat(line.extras).length ? (
                  <span className="mt-1 block text-xs text-slate-500">{line.options.concat(line.extras).join(" · ")}</span>
                ) : null}
              </li>
            ))}
          </ul>
          {order.note ? <p className="mt-4 text-sm text-slate-600">Σημείωση: {order.note}</p> : null}
          <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
            Δεν δημιουργήθηκε πραγματική παραγγελία. Στο live Orderly θα εμφανιζόταν στο dashboard και θα τυπωνόταν στο
            bar / κουζίνα.
          </p>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <button
              type="button"
              onClick={() => {
                setOrder(null);
                setStep("welcome");
              }}
              className="h-12 rounded-full border border-slate-200 bg-white text-sm font-semibold text-orderly-navy"
            >
              Νέα demo παραγγελία
            </button>
            <a
              href={REGISTER_URL}
              className="flex h-12 items-center justify-center rounded-full bg-orderly-navy text-sm font-semibold text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ξεκίνα με το Orderly
            </a>
            <Link href="/" className="text-center text-sm font-medium text-orderly-blue">
              Επιστροφή στη σελίδα
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

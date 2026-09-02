
export function CustomerPhoneMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative mx-auto ${compact ? "w-[min(100%,200px)]" : "w-[min(100%,230px)]"}`}>
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-orderly-blue/20 via-orderly-sky/10 to-transparent blur-2xl" />
      <div className="rounded-[2rem] border-[6px] border-slate-900 bg-slate-900 p-1 shadow-2xl shadow-slate-900/30">
        <div className="overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-orderly-ice to-white">
          <div className="flex items-center justify-between px-4 pb-2 pt-3">
            <div>
              <p className="text-[10px] font-semibold text-orderly-navy">Τραπέζι 7</p>
              <p className="text-[9px] text-slate-500">2 άτομα · Ανεμόεσσα</p>
            </div>
            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-medium text-slate-500 ring-1 ring-slate-200">
              Μενού
            </span>
          </div>
          <div className="mx-3 mb-2 flex gap-1.5 overflow-hidden">
            {["Καφέδες", "Φαγητό", "Ποτά"].map((cat, i) => (
              <span
                key={cat}
                className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                  i === 0 ? "bg-orderly-navy text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="space-y-2 px-3 pb-3">
            <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-100">
              <div className="flex justify-between gap-2">
                <p className="text-[11px] font-semibold text-orderly-navy">Freddo espresso</p>
                <p className="text-[11px] font-bold text-orderly-blue">3,50€</p>
              </div>
              <p className="mt-1 text-[9px] text-slate-500">Ζάχαρη · Σιρόπι · Έξτρα shot</p>
            </div>
            <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-100">
              <div className="flex justify-between gap-2">
                <p className="text-[11px] font-semibold text-orderly-navy">Club sandwich</p>
                <p className="text-[11px] font-bold text-orderly-blue">9,80€</p>
              </div>
              <p className="mt-1 text-[9px] text-slate-500">Ψωμί · Extras</p>
            </div>
            <div className="w-full rounded-xl bg-gradient-to-r from-orderly-blue to-orderly-blue-dark py-2 text-center text-[11px] font-semibold text-white shadow-md shadow-orderly-blue/25">
              Καλάθι · 13,30€
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WaiterPdaMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/[0.04]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Waiter PDA</p>
          <p className="text-sm font-bold text-orderly-navy">Βάρδια Άννας</p>
        </div>
        <span className="rounded-full bg-orderly-ice px-2 py-0.5 text-[10px] font-semibold text-orderly-blue ring-1 ring-orderly-blue/20">
          Pro
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { n: "3", s: "open" },
          { n: "4", s: "free" },
          { n: "5", s: "open" },
          { n: "7", s: "free" },
          { n: "8", s: "busy" },
          { n: "9", s: "free" },
          { n: "11", s: "open" },
          { n: "TA", s: "ta" },
        ].map((t) => (
          <span
            key={t.n}
            className={`flex aspect-square items-center justify-center rounded-xl text-[10px] font-bold ${
              t.s === "open"
                ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                : t.s === "busy"
                  ? "bg-orderly-blue/10 text-orderly-blue ring-1 ring-orderly-blue/20"
                  : t.s === "ta"
                    ? "bg-orderly-navy text-white"
                    : "bg-slate-50 text-slate-500 ring-1 ring-slate-100"
            }`}
          >
            {t.n}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <span className="inline-flex flex-1 items-center justify-center rounded-lg bg-orderly-navy py-1.5 text-[10px] font-semibold text-white">
          Νέα παραγγελία
        </span>
        <span className="inline-flex flex-1 items-center justify-center rounded-lg bg-slate-50 py-1.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-100">
          Take Away
        </span>
      </div>
    </div>
  );
}

export function OwnerDashboardMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/[0.04]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Live dashboard</p>
          <p className="text-sm font-bold text-orderly-navy">Σήμερα · 486,40€</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
          3 νέες
        </span>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
          <p className="text-[9px] text-slate-500">Μετρητά</p>
          <p className="text-xs font-bold text-orderly-navy">210,00€</p>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
          <p className="text-[9px] text-slate-500">Κάρτα</p>
          <p className="text-xs font-bold text-orderly-navy">276,40€</p>
        </div>
      </div>
      <ul className="space-y-2">
        {[
          { name: "Τραπέζι 12 · QR", extra: "2× Freddo · Club sandwich", dest: "Bar + Κουζίνα" },
          { name: "Take Away · PDA", extra: "Ice latte · Toast αυγό", dest: "Bar + Κουζίνα" },
        ].map((row) => (
          <li key={row.name} className="rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold text-orderly-navy">{row.name}</p>
              <span className="shrink-0 text-[9px] font-medium text-orderly-blue">{row.dest}</span>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-500">{row.extra}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PrintTicketMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white p-4 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Orderly Print</p>
      <p className="mt-1 text-sm font-bold text-orderly-navy">Ticket · Bar</p>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-slate-700">
        Τραπέζι 12
        <br />
        2× Freddo espresso
        <br />
        &nbsp;&nbsp;μέτριος + καρύδα
        <br />
        1× Aperol spritz
      </p>
      <p className="mt-3 text-[10px] text-slate-500">Αντίγραφο κουζίνας: Club sandwich</p>
    </div>
  );
}

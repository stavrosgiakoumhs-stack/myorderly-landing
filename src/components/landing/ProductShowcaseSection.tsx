import { CustomerPhoneMockup, OwnerDashboardMockup, PrintTicketsPair, WaiterPdaMockup } from "./ProductMockups";

const showcases = [
  {
    id: "qr",
    eyebrow: "Πελάτης",
    title: "QR στο τραπέζι",
    body: "Ο πελάτης ανοίγει το μενού από το κινητό, διαλέγει extras και στέλνει την παραγγελία — χωρίς εφαρμογή.",
  },
  {
    id: "pda",
    eyebrow: "Σερβιτόρος · Pro",
    title: "Waiter PDA",
    body: "Νέα παραγγελία σε τραπέζι, άτομα στο τραπέζι και Take Away από το ίδιο κινητό της ομάδας.",
  },
  {
    id: "owner",
    eyebrow: "Ιδιοκτήτης",
    title: "Dashboard και Print",
    body: "Ζωντανές παραγγελίες, ανοιχτοί λογαριασμοί και δρομολόγηση tickets σε bar και κουζίνα.",
  },
] as const;

export function ProductShowcaseSection() {
  return (
    <section id="product" className="scroll-mt-20 border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">Προϊόν</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Τρεις όψεις του ίδιου συστήματος.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Παραγγελιοληψία για τον πελάτη, service για την ομάδα, εικόνα και εκτυπώσεις για το κατάστημα.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <article className="flex flex-col rounded-3xl border border-slate-200/80 bg-gradient-to-b from-orderly-ice/60 to-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-orderly-blue">{showcases[0].eyebrow}</p>
            <h3 className="mt-1 text-xl font-bold text-orderly-navy">{showcases[0].title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{showcases[0].body}</p>
            <div className="mt-6" aria-hidden>
              <CustomerPhoneMockup />
            </div>
          </article>

          <article className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-orderly-blue">{showcases[1].eyebrow}</p>
            <h3 className="mt-1 text-xl font-bold text-orderly-navy">{showcases[1].title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{showcases[1].body}</p>
            <div className="mt-6" aria-hidden>
              <WaiterPdaMockup />
            </div>
          </article>

          <article className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-orderly-blue">{showcases[2].eyebrow}</p>
            <h3 className="mt-1 text-xl font-bold text-orderly-navy">{showcases[2].title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{showcases[2].body}</p>
            <div className="mt-6 space-y-4" aria-hidden>
              <OwnerDashboardMockup />
              <PrintTicketsPair />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

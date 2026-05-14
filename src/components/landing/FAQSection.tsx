import { faqItems } from "@/lib/landing-content";

export function FAQSection() {
  return (
    <section id="faq" className="border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orderly-blue">FAQ</p>
          <h2 id="faq-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-orderly-navy sm:text-4xl">
            Συχνές ερωτήσεις
          </h2>
        </div>
        <dl className="mt-12 space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-sm transition hover:border-orderly-blue/20 hover:bg-white hover:shadow-md sm:p-6"
            >
              <dt className="text-base font-bold text-orderly-navy">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

"use client";

const faqs = [
  {
    q: "How much does it cost to launch a casino?",
    a: "The Starter Package is $15,000 USD. It includes your selected casino design, online casino slots, casino game tables and your casino branding (logo, colors and domain setup).",
  },
  {
    q: "What is included in the Starter Package?",
    a: "Your selected casino design, online casino slots, casino game tables (e.g. Blackjack, Roulette, Baccarat) and your casino branding: logo, colors and domain setup.",
  },
  {
    q: "Which add-on modules are available?",
    a: "Live Dealer Tables, Sportsbook, Poker Platform and Sweepstakes. They are optional and quoted separately, so message us with the ones you want.",
  },
  {
    q: "How do I reserve a casino?",
    a: "Choose a design and message us on WhatsApp. A $500 hold reserves your casino, then we set it up, brand it and get you live.",
  },
  {
    q: "Can I see a design before I choose?",
    a: 'Yes. Tap "View Demo" on any design and we will send you its live demo on WhatsApp.',
  },
  {
    q: "Will the casino carry my own brand?",
    a: "Yes. It launches with your name, logo, colors and your own domain.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-10 sm:py-14 relative z-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              Questions, <span className="gold-text">answered</span>
            </span>
          </h2>
        </div>

        <div className="mt-7 space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="panel group !rounded-xl px-5 py-1 transition-all duration-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-semibold text-white [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <span className="text-2xl leading-none text-[#f5c451] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 text-white/70 text-sm sm:text-base leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

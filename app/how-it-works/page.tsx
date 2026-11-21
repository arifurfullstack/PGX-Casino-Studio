import Link from "next/link";
import { Crown, Monitor, Layers, Send, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "How It Works | All I Gaming",
  description: "Learn how to launch your branded online casino in 3 simple turnkey steps with All I Gaming.",
};

const STEPS = [
  {
    step: "01",
    title: "Choose Your Casino Design",
    subtitle: "Frontend Theme & Aesthetic",
    icon: Monitor,
    description: "Browse our catalog of 12 luxury online casino themes (Royal Prestige, Neon Vegas, Emerald Club, etc.). Each design comes with responsive desktop and mobile layouts.",
    deliverables: [
      "Full responsive Next.js frontend source code",
      "Tailored color palette and custom branding",
      "Dynamic banner animations and slot lobby interface",
    ],
  },
  {
    step: "02",
    title: "Customize Your Package",
    subtitle: "Modules & Payment Integrations",
    icon: Layers,
    description: "Start with our $15,000 USD core package (table games & slots) and add expansion modules anytime (Live Dealer, Sportsbook, Poker, or Sweepstakes).",
    deliverables: [
      "Custom domain and cloud hosting deployment",
      "Multi-currency fiat & crypto payment gateway setup",
      "Certified RNG slots library with single-wallet sync",
    ],
  },
  {
    step: "03",
    title: "Launch & Operate",
    subtitle: "7-14 Days Turnkey Handover",
    icon: Send,
    description: "Our engineering team deploys your casino cluster on private high-availability servers. We provide full admin backoffice training and ongoing 24/7 technical support.",
    deliverables: [
      "Comprehensive player management backoffice",
      "Real-time GGR revenue sharing & financial analytics",
      "99.99% server uptime SLA and ongoing security patches",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Turnkey Methodology
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            How It <span className="text-[#FFD700]">Works</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            From initial theme selection to live player bets in under 14 days. Our streamlined turnkey delivery eliminates development headaches and technical risk.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 space-y-6 shadow-[0_0_25px_rgba(168,85,247,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/50 text-yellow-400 flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <span className="text-3xl font-black text-purple-800/80">{s.step}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">{s.title}</h3>
                    <p className="text-xs font-semibold text-yellow-400/90">{s.subtitle}</p>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{s.description}</p>

                  <div className="space-y-2 pt-3 border-t border-purple-950/80">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                      Deliverables:
                    </p>
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 size={13} className="text-yellow-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={13} className="text-purple-400" />
                    <span>Average turnaround: 3-5 days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#15042a] to-purple-950/80 border-2 border-yellow-400/60 p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-6 shadow-[0_0_40px_rgba(255,215,0,0.2)]">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
            Ready to Begin Your Casino Journey?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Reserve your favorite casino design today with a $500 refundable deposit, and our engineers will schedule your onboarding session immediately.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/designs"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center gap-2 transition-all"
            >
              <span>Explore All Designs</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-purple-950/80 hover:bg-purple-900 border border-purple-500/60 transition-all"
            >
              <span>Speak to an Advisor</span>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

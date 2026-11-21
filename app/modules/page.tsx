import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Video, Trophy, Sparkles, Dices } from "lucide-react";

export const metadata = {
  title: "Add-On Modules | All I Gaming",
  description: "Expand your casino platform with Live Dealer tables, Sportsbook odds engine, Poker tournament network, and Sweepstakes.",
};

const MODULES = [
  {
    id: "live-dealer",
    title: "Live Dealer Casino",
    price: "$10,000 USD",
    icon: Video,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop&crop=faces",
    description: "Real human croupiers broadcasting 24/7 in 4K resolution. Support for Live Roulette, Blackjack, Baccarat, and interactive game shows.",
    features: [
      "Low-latency ultra HD video streaming",
      "Multi-angle high roller VIP tables",
      "Multi-language native dealing staff",
      "Evolution & Pragmatic Live game integrations",
    ],
  },
  {
    id: "sportsbook",
    title: "Global Sportsbook Engine",
    price: "$10,000 USD",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop",
    description: "Complete turnkey sportsbook covering 60+ sports, 50,000+ live monthly events, automated odds management, and instant bet settlement.",
    features: [
      "Football, Basketball, Tennis, Cricket & Esports",
      "Pre-match and in-play live betting feeds",
      "Cash-out feature & accumulator bonus system",
      "Automated risk management & margin controls",
    ],
  },
  {
    id: "poker",
    title: "Multiplayer Poker Platform",
    price: "$20,000 USD",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=600&h=400&fit=crop",
    description: "Independent or pooled multiplayer poker network. Fully responsive client with anti-collusion and anti-bot algorithms.",
    features: [
      "Texas Hold'em, Omaha, Short Deck & Sit & Go",
      "Multi-table tournament (MTT) scheduling engine",
      "Rakeback and player loyalty VIP tiers",
      "Fair play certified cryptographic RNG",
    ],
  },
  {
    id: "sweepstakes",
    title: "Sweepstakes & Social Gaming",
    price: "$25,000 USD",
    icon: Dices,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&h=400&fit=crop",
    description: "Launch in regulated North American markets under the dual-currency promotional sweepstakes model (Gold Coins & Sweeps Coins).",
    features: [
      "Dual virtual currency wallet (GC / SC)",
      "Daily spin wheels & promotional giveaways",
      "Automated KYC, AML & prize redemption flow",
      "Compliant alternative entry method (AMOE)",
    ],
  },
];

export default function ModulesPage() {
  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Modular Architecture
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Add-On <span className="text-[#FFD700]">Modules</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Scale your gaming operation at any time. Plug in live dealer streams, sports betting feeds, poker rooms, or sweepstakes with seamless single-wallet integration.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="rounded-3xl bg-[#090214] border border-purple-900/60 hover:border-yellow-400/70 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(255,215,0,0.25)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-yellow-400 flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-xl font-black text-white">{mod.title}</h3>
                    </div>
                    <span className="text-base font-black text-yellow-400">{mod.price}</span>
                  </div>

                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-purple-900/50">
                    <Image src={mod.image} alt={mod.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{mod.description}</p>

                  <ul className="space-y-2 pt-2 border-t border-purple-950/80">
                    {mod.features.map((f) => (
                      <li key={f} className="text-xs text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/contact?module=${mod.id}`}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-purple-950/70 hover:bg-purple-900 border border-purple-500/50 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Inquire About {mod.title}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}

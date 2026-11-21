import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send, Crown, Layers, Dices, Coins, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: Crown,
    title: "Premium Casino Designs",
    subtitle: "Modern, High-Converting Looks",
  },
  {
    icon: Layers,
    title: "Turnkey Setup",
    subtitle: "Branded & Ready to Launch",
  },
  {
    icon: Dices,
    title: "Casino Games Included",
    subtitle: "Slots & Game Tables",
  },
  {
    icon: Coins,
    title: "Scalable & Flexible",
    subtitle: "Add More Modules Anytime",
  },
  {
    icon: ShieldCheck,
    title: "Professional Support",
    subtitle: "From Setup to Launch",
  },
];

export default function HeroSection() {
  return (
    <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero: Left Headline & Right Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-sm">
              <Crown size={13} className="text-[#FFD700]" />
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">
                B2B Turnkey Casino Solutions
              </p>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black tracking-tight text-white uppercase leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                OWN YOUR ONLINE CASINO
              </h1>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black italic tracking-wide text-[#FFD700] drop-shadow-[0_0_25px_rgba(255,215,0,0.6)] leading-[1.1]">
                STARTING AT $15,000!
              </p>
            </div>

            <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-1 font-normal max-w-xl">
              <p>Choose Your Design. Launch with Online Casino Slots &amp; Game Tables.</p>
              <p className="text-gray-400">Build Your Global Casino Brand with All I Gaming platform solutions.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/designs"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] rounded-lg shadow-[0_0_22px_rgba(255,215,0,0.45)] hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] hover:brightness-110 transition-all duration-300"
              >
                <span>Browse Casino Designs</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-purple-950/60 hover:bg-purple-900/70 rounded-lg border border-purple-500/60 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:border-purple-400"
              >
                <Send size={14} className="text-purple-300" />
                <span>Request a Quote</span>
              </Link>
            </div>
          </div>

          {/* Right Visual: Cards, Laptop, Roulette, Dice */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[620px] aspect-[1468/700]">
              <Image
                src="/images/hero-showcase-full.png"
                alt="Casino software platform preview with laptop, chips, cards, roulette and dice"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]"
                priority
              />
            </div>
          </div>

        </div>

        {/* 5-Item Highlights Bar */}
        <div className="mt-10 sm:mt-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 bg-[#0a0319]/80 border border-purple-800/40 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-[0_0_20px_rgba(88,28,135,0.25)]">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-purple-950/30 transition-colors">
                  <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-purple-950/70 border border-purple-500/30 text-[#FFD700]">
                    <Icon size={19} className="stroke-[2]" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-white leading-tight truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-400 leading-tight mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

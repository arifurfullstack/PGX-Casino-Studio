import { CheckCircle2, Video, Trophy, Spade, Sparkles } from "lucide-react";

const includedItems = [
  { title: "Your selected casino design" },
  { title: "Online casino slots" },
  {
    title: "Casino game tables",
    sub: "(e.g. Blackjack, Roulette, Baccarat, etc.)",
  },
  {
    title: "Your casino branding",
    sub: "(logo, colors, and domain setup)",
  },
];

const addonModules = [
  { label: "Live Dealer\nTables", icon: Video },
  { label: "Sportsbook", icon: Trophy },
  { label: "Poker", icon: Spade },
  { label: "Sweepstakes", icon: Sparkles },
];

export default function StarterPackage() {
  return (
    <section id="packages" className="py-4 sm:py-6 relative">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        {/* Luminous Box with Purple Neon Border and Glow */}
        <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#120428]/95 via-[#0b021d]/90 to-[#14022c]/95 border-2 border-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.35),inset_0_0_15px_rgba(168,85,247,0.15)] overflow-hidden">
          
          {/* Subtle Top & Bottom Gold Glow Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Price & Starter Package Info */}
            <div className="lg:col-span-4 space-y-1.5 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
                STARTER PACKAGE
              </p>
              <div className="text-3xl sm:text-4xl font-black text-[#FFD700] drop-shadow-[0_0_18px_rgba(255,215,0,0.5)]">
                $15,000 USD
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white pt-0.5">
                Launch Your Own Branded Online Casino
              </h2>
              <p className="text-[11px] text-gray-300 leading-relaxed max-w-sm">
                A complete casino website with your chosen design, including casino slots and game tables.
              </p>
            </div>

            {/* Middle Column: Included Checklist */}
            <div className="lg:col-span-4 space-y-2 text-left lg:border-l lg:border-purple-900/40 lg:pl-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FFD700]">
                INCLUDED:
              </p>
              <ul className="space-y-2">
                {includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#FFD700] fill-[#FFD700]/20 shrink-0 mt-0.5"
                    />
                    <div className="text-[11px] text-gray-200 leading-tight">
                      <span className="font-medium text-white">{item.title}</span>
                      {item.sub && (
                        <span className="block text-[10px] text-gray-400 mt-0.5">
                          {item.sub}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Available Add-On Modules */}
            <div className="lg:col-span-4 space-y-2 text-left lg:border-l lg:border-purple-900/40 lg:pl-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FFD700]">
                AVAILABLE ADD-ON MODULES:
              </p>

              {/* 4 Square Badges in a Row */}
              <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                {addonModules.map((mod, idx) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex flex-col items-center justify-center p-2 rounded-lg bg-gradient-to-b from-purple-950/80 to-[#1e053d]/90 border border-purple-500/50 hover:border-[#FFD700]/70 hover:shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all duration-300 text-center cursor-pointer min-h-[68px]"
                    >
                      <Icon
                        size={16}
                        className="text-[#FFD700] mb-1 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-[9px] font-semibold text-white leading-tight whitespace-pre-line">
                        {mod.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[9px] text-gray-400 leading-tight pt-1">
                Add more features to expand your casino. Additional modules are priced separately based on your requirements.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

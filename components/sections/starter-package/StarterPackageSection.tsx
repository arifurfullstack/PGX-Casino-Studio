import { CheckCircle2, Video, Trophy, Spade, Sparkles } from "lucide-react";
import { StarterPackage, AddonModule } from "@/types";

interface StarterPackageSectionProps {
  packageData: StarterPackage;
  addons: AddonModule[];
}

const ICON_MAP = {
  video: Video,
  trophy: Trophy,
  spade: Spade,
  sparkles: Sparkles,
};

export default function StarterPackageSection({
  packageData,
  addons,
}: StarterPackageSectionProps) {
  return (
    <section id="packages" className="py-6 sm:py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luminous Box with Purple Neon Border and Glow */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#120428]/95 via-[#0b021d]/90 to-[#14022c]/95 border-2 border-purple-500/70 shadow-[0_0_35px_rgba(168,85,247,0.35),inset_0_0_20px_rgba(168,85,247,0.15)] overflow-hidden">
          
          {/* Subtle Top & Bottom Gold Glow Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Price & Starter Package Info */}
            <div className="lg:col-span-4 space-y-2 text-left">
              <div className="inline-block px-3 py-1 rounded-md bg-[#FFD700]/10 border border-[#FFD700]/30 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">
                {packageData.subtitle}
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] tracking-tight">
                ${packageData.basePrice.toLocaleString()} <span className="text-xl sm:text-2xl font-bold text-gray-300">{packageData.currency}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white pt-1">
                {packageData.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm font-normal">
                {packageData.description}
              </p>
            </div>

            {/* Middle Column: Included Checklist */}
            <div className="lg:col-span-4 space-y-3 text-left lg:border-l lg:border-purple-900/40 lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FFD700]">
                INCLUDED IN BASIC PACKAGE:
              </p>
              <ul className="space-y-2.5">
                {packageData.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="text-[#FFD700] fill-[#FFD700]/20 shrink-0 mt-0.5"
                    />
                    <div className="text-xs sm:text-sm text-gray-200 leading-tight">
                      <span className="font-medium text-white">{item.title}</span>
                      {item.sub && (
                        <span className="block text-[11px] text-gray-400 mt-0.5">
                          {item.sub}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Available Add-On Modules */}
            <div className="lg:col-span-4 space-y-3 text-left lg:border-l lg:border-purple-900/40 lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FFD700]">
                AVAILABLE ADD-ON MODULES:
              </p>

              {/* 4 Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 pt-1">
                {addons.map((mod) => {
                  const Icon = ICON_MAP[mod.iconKey as keyof typeof ICON_MAP] || Sparkles;
                  return (
                    <div
                      key={mod.id}
                      className="group flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-purple-950/80 to-[#1e053d]/90 border border-purple-500/50 hover:border-[#FFD700]/70 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 text-center cursor-pointer min-h-[76px]"
                    >
                      <Icon
                        size={18}
                        className="text-[#FFD700] mb-1.5 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-[10px] font-semibold text-white leading-tight">
                        {mod.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-gray-400 italic">
                *Select optional modules dynamically during casino design demo.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

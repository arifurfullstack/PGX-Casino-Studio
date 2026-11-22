import { CheckCircle2, Video, Trophy, Spade, Gift, Crown } from "lucide-react";
import { StarterPackage, AddonModule } from "@/types";

interface StarterPackageSectionProps {
  packageData: StarterPackage;
  addons: AddonModule[];
}

const ICON_MAP = {
  video: Video,
  trophy: Trophy,
  spade: Spade,
  coins: Gift,
  ticket: Gift,
};

export default function StarterPackageSection({
  packageData,
  addons,
}: StarterPackageSectionProps) {
  return (
    <section id="packages" className="py-6 sm:py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luminous Box with Neon Purple Double Border & Intense Glow */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#13032b]/95 via-[#0b021d]/90 to-[#180336]/95 neon-box-purple overflow-hidden">
          
          {/* Subtle Top & Bottom Gold Ambient Accents */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-90" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-90" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Price & Starter Package Info */}
            <div className="lg:col-span-4 space-y-2.5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFD700]/15 border border-[#FFD700]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">
                <Crown size={13} className="text-[#FFD700]" />
                <span>{packageData.subtitle || "STARTER PACKAGE"}</span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-[#FFD700] drop-shadow-[0_0_25px_rgba(255,215,0,0.6)] tracking-tight">
                ${packageData.basePrice.toLocaleString()} <span className="text-xl sm:text-2xl font-bold text-gray-200">{packageData.currency}</span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-white pt-0.5">
                {packageData.title || "Launch Your Own Branded Online Casino"}
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm font-normal">
                {packageData.description || "A complete casino website with your chosen design, including casino slots and game tables."}
              </p>
            </div>

            {/* Middle Column: Included Checklist */}
            <div className="lg:col-span-4 space-y-3.5 text-left lg:border-l lg:border-purple-900/50 lg:pl-8">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#FFD700]">
                INCLUDED:
              </p>
              <ul className="space-y-2.5">
                {packageData.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={17}
                      className="text-[#FFD700] fill-[#FFD700] text-black shrink-0 mt-0.5"
                    />
                    <div className="text-xs sm:text-sm text-gray-200 leading-tight">
                      <span className="font-semibold text-white">{item.title}</span>
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
            <div className="lg:col-span-4 space-y-3.5 text-left lg:border-l lg:border-purple-900/50 lg:pl-8">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#FFD700]">
                AVAILABLE ADD-ON MODULES:
              </p>

              {/* 4 Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 pt-1">
                {addons.map((mod) => {
                  const Icon = ICON_MAP[mod.iconKey as keyof typeof ICON_MAP] || Gift;
                  return (
                    <div
                      key={mod.id}
                      className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#24064a] to-[#120326] border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:border-[#FFD700]/80 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300 text-center cursor-pointer min-h-[82px]"
                    >
                      <Icon
                        size={20}
                        className="text-[#FFD700] mb-1.5 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-[10px] font-bold text-white leading-tight">
                        {mod.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] text-gray-400 leading-relaxed font-normal">
                Add more features to expand your casino. Additional modules are priced separately based on your requirements.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

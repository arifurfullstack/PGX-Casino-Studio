import { Timer, Crown, Dices, MonitorSmartphone, Globe, Headset } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Fast Turnkey Setup",
    desc: "Get online quickly and start operating.",
  },
  {
    icon: Crown,
    title: "100% Your Brand",
    desc: "Fully branded with your name, logo & domain.",
  },
  {
    icon: Dices,
    title: "Certified Games",
    desc: "Popular casino slots and live game tables.",
    badge: "777",
  },
  {
    icon: MonitorSmartphone,
    title: "Multi-Device",
    desc: "Optimized for desktop, mobile and tablet.",
  },
  {
    icon: Globe,
    title: "Global Ready",
    desc: "Support for multiple currencies and regions.",
  },
  {
    icon: Headset,
    title: "Dedicated B2B Support",
    desc: "Technical assistance and platform onboarding.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-8 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Heading */}
        <div className="relative inline-block mb-8 sm:mb-10">
          <div className="absolute -top-3 left-[-50px] right-[-50px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_12px_#A855F7]" />
          
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-1">
            WHY PARTNER WITH US
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-8">
            FEATURES &amp; BENEFITS
          </h2>

          <div className="absolute -bottom-3 left-[-50px] right-[-50px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_12px_#A855F7]" />
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-4 rounded-xl bg-[#0e0422]/70 border border-purple-800/30 hover:border-[#FFD700]/60 hover:bg-purple-950/30 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-purple-950/70 border border-purple-500/30 text-[#FFD700] mb-2.5 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="stroke-[2]" />
                  {feat.badge && (
                    <span className="absolute -top-1 -right-1 text-[9px] font-black bg-[#FFD700] text-black px-1 rounded">
                      {feat.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {feat.title}
                </h3>
                <p className="text-[11px] text-gray-400 leading-tight">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

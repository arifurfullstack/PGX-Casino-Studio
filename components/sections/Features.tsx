import { Rocket, ShieldCheck, Sparkles, MonitorSmartphone, Globe2, Headphones } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Fast Setup",
    desc: "Get online quickly and start operating.",
  },
  {
    icon: ShieldCheck,
    title: "Your Brand",
    desc: "Fully branded with your name, logo & domain.",
  },
  {
    icon: Sparkles,
    title: "Proven Games",
    desc: "Popular casino slots and game tables.",
    badge: "777",
  },
  {
    icon: MonitorSmartphone,
    title: "Multi-Device",
    desc: "Optimized for desktop, mobile and tablet.",
  },
  {
    icon: Globe2,
    title: "Global Ready",
    desc: "Support for multiple currencies and regions.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    desc: "Technical assistance and platform updates.",
  },
];

export default function Features() {
  return (
    <section className="py-6 sm:py-8 relative overflow-hidden">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 text-center">
        
        {/* Section Heading */}
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute -top-2.5 left-[-40px] right-[-40px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_#A855F7]" />
          
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-6">
            FEATURES &amp; BENEFITS
          </h2>

          <div className="absolute -bottom-2.5 left-[-40px] right-[-40px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_#A855F7]" />
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center space-y-1.5 p-1 rounded-xl transition-all duration-300 hover:bg-purple-950/20"
              >
                {/* Gold Icon */}
                <div className="relative flex items-center justify-center w-9 h-9 text-[#FFD700] mb-0.5 group-hover:scale-110 transition-transform">
                  {feat.badge ? (
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black tracking-widest text-[#FFD700] border border-[#FFD700] px-1 rounded-sm leading-none py-0.5">
                        777
                      </span>
                    </div>
                  ) : (
                    <Icon size={22} className="stroke-[1.75]" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xs font-bold text-white leading-tight">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-[10px] text-gray-300 leading-tight max-w-[140px]">
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

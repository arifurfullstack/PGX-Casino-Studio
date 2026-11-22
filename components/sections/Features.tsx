import { Zap, ShieldCheck, Dices, Monitor, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Setup",
    desc: "Get online quickly and start operating.",
  },
  {
    icon: ShieldCheck,
    title: "Your Brand",
    desc: "Fully branded with your name, logo & domain.",
  },
  {
    icon: Dices,
    title: "Proven Games",
    desc: "Popular casino slots and game tables.",
    badge: "777",
  },
  {
    icon: Monitor,
    title: "Multi-Device",
    desc: "Optimized for desktop, mobile and tablet.",
  },
  {
    icon: Globe,
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
    <section id="features" className="py-8 sm:py-14 relative overflow-hidden">
      {/* Luminous Curved Neon Purple Archway */}
      <div className="curved-neon-arc mb-4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            FEATURES &amp; BENEFITS
          </h2>
        </div>

        {/* 6 Features Row matching mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-4 rounded-2xl bg-gradient-to-b from-[#160430]/90 to-[#0b021d]/90 border border-purple-800/40 hover:border-[#FFD700]/70 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 min-h-[145px] justify-center"
              >
                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-500/40 text-[#FFD700] mb-2.5 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="stroke-[2.2]" />
                  {feat.badge && (
                    <span className="absolute -top-1.5 -right-1.5 text-[8px] font-black bg-[#FFD700] text-black px-1 rounded shadow-sm">
                      {feat.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs font-black text-white leading-tight">
                  {feat.title}
                </p>
                <p className="text-[10px] text-gray-300 leading-tight mt-1 font-normal">
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

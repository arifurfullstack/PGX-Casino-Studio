import { Monitor, Layers, Send, ChevronRight } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Choose a Design",
    desc: "Pick from our premium casino looks.",
    icon: Monitor,
  },
  {
    num: "2",
    title: "Customize Your Package",
    desc: "Start with the $15,000 package and add optional modules.",
    icon: Layers,
  },
  {
    num: "3",
    title: "Reserve & Launch",
    desc: "Reserve your casino, we set it up, brand it, and get you live!",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-8 sm:py-14 relative overflow-hidden">
      {/* Luminous Curved Neon Purple Archway spanning across */}
      <div className="curved-neon-arc mb-4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            HOW IT WORKS
          </h2>
        </div>

        {/* 3 Steps Row with Golden Chevron Connectors */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-8 max-w-5xl mx-auto pt-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex-1 flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="flex-1 flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-b from-[#160430]/90 via-[#0a0217]/95 to-[#120326]/90 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:border-[#FFD700]/70 transition-all duration-300 w-full min-h-[175px] justify-center">
                  {/* Glowing Circular Icon matching mockup */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-purple-800 to-purple-950 border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] mb-2.5">
                    <Icon size={20} className="text-[#FFD700]" />
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-[#FFD700] mb-1">
                    {step.num}. {step.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium max-w-xs">
                    {step.desc}
                  </p>
                </div>

                {/* Golden Chevrons Connector for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center text-yellow-400 opacity-80 shrink-0">
                    <ChevronRight size={18} className="stroke-[3]" />
                    <ChevronRight size={18} className="stroke-[3] -ml-2.5" />
                    <ChevronRight size={18} className="stroke-[3] -ml-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

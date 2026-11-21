import { Monitor, Layers, Send } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Choose a Design",
    desc: "Pick from our premium ready-made casino looks.",
    icon: Monitor,
  },
  {
    num: "2",
    title: "Customize Your Package",
    desc: "Start with the $15,000 package and select optional modules.",
    icon: Layers,
  },
  {
    num: "3",
    title: "Submit & Reserve",
    desc: "Submit your selection or lock a 5% discount with $500 reservation.",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-10 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Heading */}
        <div className="relative inline-block mb-10 sm:mb-14">
          <div className="absolute -top-3 left-[-50px] right-[-50px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_12px_#A855F7]" />
          
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-1">
            SIMPLE ONBOARDING
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-8">
            HOW IT WORKS
          </h2>

          <div className="absolute -bottom-3 left-[-50px] right-[-50px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_12px_#A855F7]" />
        </div>

        {/* 3 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-[#14052c]/80 to-[#0b021d]/90 border border-purple-500/40 hover:border-[#FFD700]/70 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-b from-[#FFE259] to-[#FFA700] text-black text-xs font-black flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                  {step.num}
                </div>

                {/* Glowing Circular Icon */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-900/80 to-[#120324] border-2 border-purple-400/80 shadow-[0_0_18px_rgba(168,85,247,0.5)] mb-4 mt-2 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-[#FFD700]" />
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

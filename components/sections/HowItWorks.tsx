import { Monitor, Layers, Send, ChevronRight } from "lucide-react";

const steps = [
  {
    num: "1.",
    title: "Choose a Design",
    desc: "Pick from our premium casino looks.",
    icon: Monitor,
  },
  {
    num: "2.",
    title: "Customize Your Package",
    desc: "Start with the $15,000 package and add optional modules.",
    icon: Layers,
  },
  {
    num: "3.",
    title: "Request a Quote",
    desc: "Tell us your requirements and get a tailored proposal.",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-8 sm:py-10 relative overflow-hidden">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Section Heading with Glowing Arc Frame */}
        <div className="relative inline-block mb-8">
          <div className="absolute -top-2.5 left-[-40px] right-[-40px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_#A855F7]" />
          
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-6">
            HOW IT WORKS
          </h2>

          <div className="absolute -bottom-2.5 left-[-40px] right-[-40px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_#A855F7]" />
        </div>

        {/* 3 Steps Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 max-w-[850px] mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 flex-1">
                {/* Step Item */}
                <div className="flex flex-col items-center text-center space-y-1.5 flex-1">
                  {/* Glowing Purple Circular Badge */}
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-900/80 to-[#120324] border-2 border-purple-400/80 shadow-[0_0_18px_rgba(168,85,247,0.5),inset_0_0_10px_rgba(168,85,247,0.3)]">
                    <Icon size={20} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-bold text-white pt-0.5">
                    {step.num} {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] text-gray-300 leading-tight max-w-[190px]">
                    {step.desc}
                  </p>
                </div>

                {/* Triple Chevron Connector (between steps) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center text-[#FFD700] space-x-[-6px] text-sm font-bold opacity-80 pt-1 shrink-0">
                    <ChevronRight size={15} className="stroke-[3]" />
                    <ChevronRight size={15} className="stroke-[3]" />
                    <ChevronRight size={15} className="stroke-[3]" />
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

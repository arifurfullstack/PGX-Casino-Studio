"use client";

import { Monitor, Layers, Send, ChevronsRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              <span className="gold-text">How it works</span>
            </span>
          </h2>
        </div>

        <div className="mt-14 grid items-stretch gap-x-4 xl:gap-x-6 gap-y-12 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:px-4">
          {/* Step 1 */}
          <div className="group h-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
            <div className="panel panel-interactive h-full !rounded-2xl lg:-skew-x-[10deg]">
              <div className="panel-sheen" aria-hidden="true" />
              <div className="panel-rim" aria-hidden="true" />
              <div className="relative px-6 pb-7 pt-10 xl:px-10 xl:pb-9 xl:pt-12 text-center lg:skew-x-[10deg]">
                <span className="absolute -top-7 xl:-top-8 left-1/2 grid h-14 w-14 xl:h-16 xl:w-16 -translate-x-1/2 place-items-center rounded-full border border-[#d58cff]/90 bg-[#2a0a4a] shadow-[0_0_18px_rgba(190,90,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-[#f5ce6e] group-hover:bg-[#38105d] group-hover:shadow-[0_0_24px_rgba(245,196,81,0.55),inset_0_0_14px_rgba(245,196,81,0.22)]">
                  <Monitor className="lucide lucide-monitor gold-icon h-6 w-6 xl:h-7 xl:w-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                </span>
                <h3 className="gold-text font-philosopher text-[clamp(1.35rem,2vw,1.75rem)] font-bold italic leading-tight transition-all duration-500 group-hover:brightness-110">
                  1. Choose a Design
                </h3>
                <p className="mx-auto mt-2.5 max-w-[300px] xl:max-w-[340px] leading-snug text-white/80 text-sm sm:text-base xl:text-lg transition-colors duration-500 group-hover:text-white/95">
                  Pick from our premium casino looks.
                </p>
              </div>
            </div>
          </div>

          <ChevronsRight className="lucide lucide-chevrons-right gold-icon hidden h-9 w-9 xl:h-11 xl:w-11 self-center lg:block" />

          {/* Step 2 */}
          <div className="group h-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
            <div className="panel panel-interactive h-full !rounded-2xl lg:-skew-x-[10deg]">
              <div className="panel-sheen" aria-hidden="true" />
              <div className="panel-rim" aria-hidden="true" />
              <div className="relative px-6 pb-7 pt-10 xl:px-10 xl:pb-9 xl:pt-12 text-center lg:skew-x-[10deg]">
                <span className="absolute -top-7 xl:-top-8 left-1/2 grid h-14 w-14 xl:h-16 xl:w-16 -translate-x-1/2 place-items-center rounded-full border border-[#d58cff]/90 bg-[#2a0a4a] shadow-[0_0_18px_rgba(190,90,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-[#f5ce6e] group-hover:bg-[#38105d] group-hover:shadow-[0_0_24px_rgba(245,196,81,0.55),inset_0_0_14px_rgba(245,196,81,0.22)]">
                  <Layers className="lucide lucide-layers gold-icon h-6 w-6 xl:h-7 xl:w-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                </span>
                <h3 className="gold-text font-philosopher text-[clamp(1.35rem,2vw,1.75rem)] font-bold italic leading-tight transition-all duration-500 group-hover:brightness-110">
                  2. Customize Your Package
                </h3>
                <p className="mx-auto mt-2.5 max-w-[300px] xl:max-w-[340px] leading-snug text-white/80 text-sm sm:text-base xl:text-lg transition-colors duration-500 group-hover:text-white/95">
                  Start with the $15,000 package and add optional modules.
                </p>
              </div>
            </div>
          </div>

          <ChevronsRight className="lucide lucide-chevrons-right gold-icon hidden h-9 w-9 xl:h-11 xl:w-11 self-center lg:block" />

          {/* Step 3 */}
          <div className="group h-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
            <div className="panel panel-interactive h-full !rounded-2xl lg:-skew-x-[10deg]">
              <div className="panel-sheen" aria-hidden="true" />
              <div className="panel-rim" aria-hidden="true" />
              <div className="relative px-6 pb-7 pt-10 xl:px-10 xl:pb-9 xl:pt-12 text-center lg:skew-x-[10deg]">
                <span className="absolute -top-7 xl:-top-8 left-1/2 grid h-14 w-14 xl:h-16 xl:w-16 -translate-x-1/2 place-items-center rounded-full border border-[#d58cff]/90 bg-[#2a0a4a] shadow-[0_0_18px_rgba(190,90,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-[#f5ce6e] group-hover:bg-[#38105d] group-hover:shadow-[0_0_24px_rgba(245,196,81,0.55),inset_0_0_14px_rgba(245,196,81,0.22)]">
                  <Send className="lucide lucide-send gold-icon h-6 w-6 xl:h-7 xl:w-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                </span>
                <h3 className="gold-text font-philosopher text-[clamp(1.35rem,2vw,1.75rem)] font-bold italic leading-tight transition-all duration-500 group-hover:brightness-110">
                  3. Reserve &amp; Launch
                </h3>
                <p className="mx-auto mt-2.5 max-w-[300px] xl:max-w-[340px] leading-snug text-white/80 text-sm sm:text-base xl:text-lg transition-colors duration-500 group-hover:text-white/95">
                  Reserve your casino, we set it up, brand it, and get you live!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

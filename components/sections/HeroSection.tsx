import Image from "next/image";
import { ArrowRight, Send, Monitor, Layers, Gamepad2, Settings2, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-6 sm:pt-8 pb-4 sm:pb-6 overflow-hidden">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Hero: Left Headline & Right Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4 text-left">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#E0C068]">
              ONLINE CASINO SOLUTIONS
            </p>

            <div className="space-y-0.5">
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-white uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                OWN YOUR ONLINE CASINO
              </h1>
              <p className="text-2xl sm:text-3xl lg:text-[34px] font-black italic tracking-wide text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] leading-tight">
                STARTING AT $15,000!
              </p>
            </div>

            <div className="text-gray-300 text-[11px] sm:text-xs leading-snug space-y-0.5 font-normal">
              <p>Choose Your Design. Launch with Casino Slots &amp; Game Tables.</p>
              <p>Build Your Casino Brand with All I Gaming.</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="#designs"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] rounded-md shadow-[0_0_18px_rgba(255,215,0,0.45)] hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] hover:brightness-110 transition-all duration-300"
              >
                <span>Browse Casino Designs</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-medium text-white bg-purple-950/50 hover:bg-purple-900/60 rounded-md border border-purple-500/60 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.25)]"
              >
                <Send size={11} className="text-purple-300" />
                <span>Request a Quote</span>
              </a>
            </div>
          </div>

          {/* Right Visual: Cards, Laptop, Roulette, Dice */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[530px]">
              <Image
                src="/images/hero-cluster-hd.png"
                alt="Casino software platform preview with laptop, chips, cards, roulette and dice"
                width={545}
                height={160}
                className="w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                priority
              />
            </div>
          </div>

        </div>

        {/* 5-Item Highlights Bar */}
        <div className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3 bg-[#0a0319]/80 border border-purple-800/40 rounded-xl px-3 py-2.5 backdrop-blur-sm shadow-[0_0_15px_rgba(88,28,135,0.2)]">
            
            {/* 1. Premium Casino Designs */}
            <div className="flex items-center gap-2 p-1">
              <div className="shrink-0 text-[#FFD700]">
                <Monitor size={18} className="stroke-[1.75]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">
                  Premium Casino Designs
                </p>
                <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
                  Modern, High-Converting Looks
                </p>
              </div>
            </div>

            {/* 2. Turnkey Setup */}
            <div className="flex items-center gap-2 p-1">
              <div className="shrink-0 text-[#FFD700]">
                <Layers size={18} className="stroke-[1.75]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">
                  Turnkey Setup
                </p>
                <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
                  Branded &amp; Ready to Launch
                </p>
              </div>
            </div>

            {/* 3. Casino Games Included */}
            <div className="flex items-center gap-2 p-1">
              <div className="shrink-0 text-[#FFD700]">
                <Gamepad2 size={18} className="stroke-[1.75]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">
                  Casino Games Included
                </p>
                <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
                  Slots &amp; Game Tables
                </p>
              </div>
            </div>

            {/* 4. Scalable & Flexible */}
            <div className="flex items-center gap-2 p-1">
              <div className="shrink-0 text-[#FFD700]">
                <Settings2 size={18} className="stroke-[1.75]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">
                  Scalable &amp; Flexible
                </p>
                <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
                  Add More Modules Anytime
                </p>
              </div>
            </div>

            {/* 5. Professional Support */}
            <div className="flex items-center gap-2 p-1 col-span-2 md:col-span-1 justify-center md:justify-start">
              <div className="shrink-0 text-[#FFD700]">
                <ShieldCheck size={18} className="stroke-[1.75]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">
                  Professional Support
                </p>
                <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
                  From Setup to Launch
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

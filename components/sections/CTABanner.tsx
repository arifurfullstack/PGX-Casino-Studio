import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-6 sm:py-8 relative">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        {/* Glow Banner Box with Purple Neon Border */}
        <div className="relative rounded-2xl px-5 py-4 sm:px-8 sm:py-6 bg-gradient-to-r from-[#170535] via-[#21064d] to-[#170535] border-2 border-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.4),inset_0_0_15px_rgba(168,85,247,0.2)] overflow-hidden">
          
          {/* Top & Bottom Gold Accents */}
          <div className="absolute top-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
            
            {/* Left Visual: Aces Cards & Chips Stack */}
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="relative w-[160px] sm:w-[180px] h-[80px] sm:h-[90px]">
                <Image
                  src="/images/cta-cluster-hd.png"
                  alt="Casino playing cards and gold chips"
                  fill
                  sizes="180px"
                  className="object-contain drop-shadow-[0_0_18px_rgba(168,85,247,0.5)]"
                />
              </div>
            </div>

            {/* Center Text */}
            <div className="md:col-span-6 text-center md:text-left space-y-1">
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                READY TO LAUNCH
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FFD700] uppercase tracking-tight drop-shadow-[0_0_18px_rgba(255,215,0,0.6)] leading-tight">
                YOUR OWN CASINO?
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-200 font-normal leading-snug">
                Choose a design, customize your package, and let&apos;s build your casino brand today!
              </p>
            </div>

            {/* Right Button */}
            <div className="md:col-span-3 flex justify-center md:justify-end">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] rounded-full shadow-[0_0_18px_rgba(255,215,0,0.5)] hover:shadow-[0_0_26px_rgba(255,215,0,0.8)] hover:brightness-110 transition-all duration-300 shrink-0"
              >
                <span>Request a Quote</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

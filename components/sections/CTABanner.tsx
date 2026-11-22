import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-8 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow Banner Box with Neon Purple Double Border matching mockup */}
        <div className="relative rounded-3xl px-6 py-6 sm:px-10 sm:py-8 bg-gradient-to-r from-[#170535] via-[#240654] to-[#170535] neon-box-purple overflow-hidden">
          
          {/* Top & Bottom Gold Accents */}
          <div className="absolute top-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Visual: Aces Cards & Gold Chips Stack */}
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="relative w-[180px] sm:w-[220px] h-[95px] sm:h-[115px]">
                <Image
                  src="/images/cta-cluster-hd.png"
                  alt="Casino playing cards and gold chips"
                  fill
                  sizes="220px"
                  className="object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                />
              </div>
            </div>

            {/* Center Text matching mockup */}
            <div className="md:col-span-6 text-center md:text-left space-y-1">
              <p className="text-xs sm:text-sm font-black text-[#FFD700] uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                READY TO LAUNCH
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
                YOUR OWN CASINO?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed max-w-lg">
                Choose a design, customize your package, and reserve a casino today!
              </p>
            </div>

            {/* Right Button: Reserve A Casino Pill */}
            <div className="md:col-span-3 flex justify-center md:justify-end">
              <Link
                href="/select-design"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-black text-black bg-gradient-to-r from-[#FFE259] to-[#FFA700] rounded-full shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:shadow-[0_0_35px_rgba(255,215,0,0.8)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 shrink-0"
              >
                <Send size={15} className="text-black stroke-[3]" />
                <span>Reserve A Casino</span>
                <ArrowRight size={16} className="stroke-[3]" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

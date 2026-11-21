import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-8 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow Banner Box with Purple Neon Border */}
        <div className="relative rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-10 sm:py-8 bg-gradient-to-r from-[#170535] via-[#240654] to-[#170535] border-2 border-purple-500/70 shadow-[0_0_35px_rgba(168,85,247,0.4),inset_0_0_20px_rgba(168,85,247,0.2)] overflow-hidden">
          
          {/* Top & Bottom Gold Accents */}
          <div className="absolute top-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Visual: Aces Cards & Chips Stack */}
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="relative w-[180px] sm:w-[220px] h-[90px] sm:h-[110px]">
                <Image
                  src="/images/cta-cluster-hd.png"
                  alt="Casino playing cards and gold chips"
                  fill
                  sizes="220px"
                  className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                />
              </div>
            </div>

            {/* Center Text */}
            <div className="md:col-span-6 text-center md:text-left space-y-1.5">
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                READY TO LAUNCH
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFD700] uppercase tracking-tight drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] leading-tight">
                YOUR OWN CASINO PLATFORM?
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed max-w-lg">
                Choose your turnkey design, customize your packages, and start onboarding today with full technical coordination.
              </p>
            </div>

            {/* Right Button */}
            <div className="md:col-span-3 flex justify-center md:justify-end">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] hover:brightness-110 transition-all duration-300 shrink-0"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

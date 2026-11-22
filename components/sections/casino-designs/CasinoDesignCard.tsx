"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CasinoDesign } from "@/types";

interface CasinoDesignCardProps {
  design: CasinoDesign;
}

const THEME_GLOW_MAP: Record<string, string> = {
  "royal-prestige": "theme-card-royal-prestige",
  "neon-vegas": "theme-card-neon-vegas",
  "emerald-club": "theme-card-emerald-club",
  "elite-casino": "theme-card-elite-casino",
  "diamond-palace": "theme-card-diamond-palace",
  "cosmic-casino": "theme-card-cosmic-casino",
  "golden-crown": "theme-card-golden-crown",
  "lucky-spin": "theme-card-lucky-spin",
  "prestige-gold": "theme-card-prestige-gold",
  "ruby-casino": "theme-card-ruby-casino",
  "ocean-casino": "theme-card-ocean-casino",
  "mystic-casino": "theme-card-mystic-casino",
};

export default function CasinoDesignCard({ design }: CasinoDesignCardProps) {
  // Use clean artwork if available
  const artImage = design.image.includes("-hd.png")
    ? design.image.replace("-hd.png", "-art.png")
    : design.image;

  const glowClass = THEME_GLOW_MAP[design.slug] || "theme-card-royal-prestige";

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-[#07010e] border-2 transition-all duration-300 flex flex-col hover:scale-[1.02] ${glowClass}`}
    >
      {/* Upper Casino Artwork Area */}
      <div className="relative w-full aspect-[460/190] overflow-hidden bg-[#0c0317]">
        <Image
          src={artImage}
          alt={design.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
      </div>

      {/* Real HTML Buttons Action Bar matching mockup */}
      <div className="p-2.5 sm:p-3 bg-gradient-to-b from-[#0a0316] to-[#04010a] border-t border-purple-900/40 flex items-center gap-2">
        {/* Real View Demo HTML Link Pill Button */}
        <Link
          href={`/designs/${design.slug}`}
          title={`View live demo of ${design.name}`}
          className="flex-1 py-1.5 px-3 rounded-full text-[11px] sm:text-xs font-bold text-gray-200 hover:text-white bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/60 hover:border-purple-300 transition-all flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.3)] active:scale-[0.98]"
        >
          <span>View Demo</span>
          <ExternalLink size={12} className="stroke-[2.2] text-[#FFD700] shrink-0" />
        </Link>

        {/* Real Select Design HTML Link Pill Button */}
        <Link
          href={`/select-design?design=${design.slug}`}
          title={`Select ${design.name} for your casino platform`}
          className="flex-1 py-1.5 px-3 rounded-full text-[11px] sm:text-xs font-black text-black bg-gradient-to-r from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_22px_rgba(255,215,0,0.7)] transition-all flex items-center justify-center"
        >
          <span>Select Design</span>
        </Link>
      </div>
    </div>
  );
}

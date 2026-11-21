"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CasinoDesign } from "@/types";

interface CasinoDesignCardProps {
  design: CasinoDesign;
}

export default function CasinoDesignCard({ design }: CasinoDesignCardProps) {
  // Use clean artwork without baked buttons if available
  const artImage = design.image.includes("-hd.png")
    ? design.image.replace("-hd.png", "-art.png")
    : design.image;

  return (
    <div className="group relative rounded-xl overflow-hidden bg-[#07010e] border border-purple-500/40 hover:border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all duration-300 flex flex-col">
      {/* Upper Casino Artwork Area */}
      <div className="relative w-full aspect-[460/190] overflow-hidden bg-[#0c0317]">
        <Image
          src={artImage}
          alt={design.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      {/* Real HTML Buttons Action Bar */}
      <div className="p-2 sm:p-2.5 bg-gradient-to-b from-[#0a0316] to-[#04010a] border-t border-purple-900/40 flex items-center gap-2">
        {/* Real View Demo HTML Link Button */}
        <Link
          href={`/designs/${design.slug}`}
          title={`View live demo of ${design.name}`}
          className="flex-1 py-1.5 px-2 rounded-md text-[11px] sm:text-xs font-semibold text-gray-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/50 hover:border-purple-400 transition-all flex items-center justify-center gap-1 shadow-[0_0_8px_rgba(168,85,247,0.2)] active:scale-[0.98]"
        >
          <span>View Demo</span>
          <ExternalLink size={12} className="stroke-[2.2] text-purple-300 shrink-0" />
        </Link>

        {/* Real Select Design HTML Link Button */}
        <Link
          href={`/select-design?design=${design.slug}`}
          title={`Select ${design.name} for your casino platform`}
          className="flex-1 py-1.5 px-2 rounded-md text-[11px] sm:text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_12px_rgba(255,215,0,0.35)] hover:shadow-[0_0_18px_rgba(255,215,0,0.6)] transition-all flex items-center justify-center"
        >
          <span>Select Design</span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { CasinoDesign } from "@/types";

interface CasinoDesignCardProps {
  design: CasinoDesign;
}

export default function CasinoDesignCard({ design }: CasinoDesignCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-purple-500/40 hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.55)] transition-all duration-300">
      {/* Full Card Rendered Image Artwork */}
      <div className="relative w-full aspect-[230/122]">
        <Image
          src={design.image}
          alt={design.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />

        {/* Interactive Overlays for View Demo & Select Design */}
        <div className="absolute bottom-1.5 left-2 right-2 h-7 flex items-center gap-2 z-10">
          {/* View Demo Button Link */}
          <Link
            href={`/designs/${design.slug}`}
            title={`View Demo for ${design.name}`}
            className="flex-1 h-full rounded bg-transparent hover:bg-white/10 active:bg-white/20 transition-colors flex items-center justify-center"
            aria-label={`View Demo for ${design.name}`}
          />

          {/* Select Design Button Link */}
          <Link
            href={`/select-design?design=${design.slug}`}
            title={`Select Design ${design.name}`}
            className="flex-1 h-full rounded bg-transparent hover:bg-yellow-400/20 active:bg-yellow-400/30 transition-colors flex items-center justify-center"
            aria-label={`Select Design ${design.name}`}
          />
        </div>
      </div>
    </div>
  );
}

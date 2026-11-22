import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CasinoDesign } from "@/types";
import CasinoDesignCard from "./CasinoDesignCard";

interface CasinoDesignsSectionProps {
  designs: CasinoDesign[];
}

export default function CasinoDesignsSection({ designs }: CasinoDesignsSectionProps) {
  return (
    <section id="designs" className="py-8 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching mockup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-2">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              CHOOSE YOUR CASINO DESIGN
            </h2>
          </div>

          <Link
            href="/designs"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#FFD700] hover:text-[#FFE57F] transition-colors tracking-wide"
          >
            <span>View All Designs</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1.5 transition-transform stroke-[3]"
            />
          </Link>
        </div>

        {/* 12 Themed Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {designs.map((design) => (
            <CasinoDesignCard key={design.id} design={design} />
          ))}
        </div>
      </div>
    </section>
  );
}

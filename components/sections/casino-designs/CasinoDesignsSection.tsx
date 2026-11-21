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
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-1">
              EXCLUSIVE PREVIEWS
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              CHOOSE YOUR CASINO DESIGN
            </h2>
          </div>

          <Link
            href="/designs"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FFD700] hover:text-[#FFE57F] transition-colors"
          >
            <span>View All ({designs.length}) Designs</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform stroke-[2.5]"
            />
          </Link>
        </div>

        {/* 12 Cards Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {designs.map((design) => (
            <CasinoDesignCard key={design.id} design={design} />
          ))}
        </div>
      </div>
    </section>
  );
}

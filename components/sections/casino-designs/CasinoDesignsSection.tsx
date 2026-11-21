import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CasinoDesign } from "@/types";
import CasinoDesignCard from "./CasinoDesignCard";

interface CasinoDesignsSectionProps {
  designs: CasinoDesign[];
}

export default function CasinoDesignsSection({ designs }: CasinoDesignsSectionProps) {
  return (
    <section id="designs" className="py-6 sm:py-8 relative">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            CHOOSE YOUR CASINO DESIGN
          </h2>

          <Link
            href="/designs"
            className="group inline-flex items-center gap-1 text-[11px] font-bold text-[#FFD700] hover:text-[#FFE57F] transition-colors"
          >
            <span>View All Designs</span>
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform stroke-[2.5]"
            />
          </Link>
        </div>

        {/* 12 Cards Grid (4 Columns x 3 Rows on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {designs.map((design) => (
            <CasinoDesignCard key={design.id} design={design} />
          ))}
        </div>
      </div>
    </section>
  );
}

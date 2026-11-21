import { getAllActiveDesigns } from "@/services/casinoService";
import DesignsCatalog from "@/components/designs/DesignsCatalog";
import { Crown } from "lucide-react";

export const metadata = {
  title: "Casino Designs | All I Gaming Turnkey Marketplace",
  description: "Browse 12 high-converting luxury online casino designs. European VIP, Neon Vegas, Emerald Club, and more.",
};

export default async function DesignsPage() {
  const designs = await getAllActiveDesigns();

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Exclusive Turnkey Collection
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Choose Your <span className="text-[#FFD700]">Casino Design</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Select from 12 pre-built, production-ready casino frontend themes. Launch with live dealer tables, sportsbook, and slot integration in under 14 days.
          </p>
        </div>

        {/* Dynamic Catalog Component */}
        <DesignsCatalog initialDesigns={designs} />

      </div>
    </main>
  );
}

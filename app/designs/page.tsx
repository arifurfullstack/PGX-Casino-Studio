import { getAllActiveDesigns } from "@/services/casinoService";
import { getPricingConfig } from "@/services/pricingService";
import HomepageBackground from "@/components/sections/HomepageBackground";
import DesignsCatalog from "@/components/designs/DesignsCatalog";

export const metadata = {
  title: "Casino Designs | Royal Casino Club Turnkey Marketplace",
  description:
    "Browse 12 high-converting luxury online casino designs. Royal Prestige, Ruby Casino, Neon Vegas, Emerald Club, and more.",
};

interface DesignsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function DesignsPage({ searchParams }: DesignsPageProps) {
  const { category, q } = await searchParams;
  const [designs, pricingConfig] = await Promise.all([
    getAllActiveDesigns(),
    getPricingConfig(),
  ]);

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#07020d] text-white">
      {/* Exact Homepage Multi-Layered Luxury Ambient Canvas */}
      <HomepageBackground />

      <div className="relative z-10 mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-24">
        <DesignsCatalog
          initialDesigns={designs}
          pricingConfig={pricingConfig}
          initialCategory={category}
          initialQuery={q}
        />
      </div>
    </main>
  );
}

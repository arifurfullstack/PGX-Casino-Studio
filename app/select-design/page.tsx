import { getAllActiveDesigns } from "@/services/casinoService";
import { getPublicPaymentConfig } from "@/services/integrationService";
import {
  getPricingConfig,
  getAddonModules,
  getStarterPackage,
} from "@/services/pricingService";
import HomepageBackground from "@/components/sections/HomepageBackground";
import ReservationFlow from "@/components/reservation/ReservationFlow";

export const metadata = {
  title: "Reserve Casino Design",
  description:
    "Customize your turnkey online casino design, configure modular add-ons, and lock in your exclusive reservation discount with a 100% refundable holding fee.",
};

interface SelectDesignPageProps {
  searchParams: Promise<{ design?: string; total?: string; addons?: string }>;
}

export default async function SelectDesignPage({ searchParams }: SelectDesignPageProps) {
  const { design, total, addons } = await searchParams;

  const [designs, paymentConfig, pricingConfig] = await Promise.all([
    getAllActiveDesigns(),
    getPublicPaymentConfig(),
    getPricingConfig(),
  ]);

  const addonModules = getAddonModules().filter((m) => m.isEnabled);
  const starterPackage = getStarterPackage();

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#07020d] text-white">
      {/* Exact Homepage Multi-Layered Luxury Ambient Canvas */}
      <HomepageBackground />

      <div className="relative z-10 mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-20 sm:pb-28">
        <ReservationFlow
          designs={designs}
          addonModules={addonModules}
          starterPackage={starterPackage}
          pricingConfig={pricingConfig}
          initialDesignSlug={design}
          initialTotal={total ? parseInt(total, 10) : undefined}
          initialAddons={addons}
          paymentConfig={paymentConfig}
        />
      </div>
    </main>
  );
}

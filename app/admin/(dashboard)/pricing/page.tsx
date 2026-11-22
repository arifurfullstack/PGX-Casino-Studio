import { DollarSign } from "lucide-react";
import { getPricingConfig } from "@/services/pricingService";
import PricingConfigForm from "@/components/admin/pricing/PricingConfigForm";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const config = await getPricingConfig();

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2.5">
            <DollarSign size={26} className="text-[#FFD700]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Platform Pricing &amp; Commercial Terms
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mt-1.5">
            Configure starter package price, reservation holding deposit ($500), 5% price incentive, and 75/25 GGR revenue share split.
          </p>
        </div>
      </div>

      <PricingConfigForm initialConfig={config} />
    </div>
  );
}

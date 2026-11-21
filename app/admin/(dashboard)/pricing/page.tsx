import { DollarSign } from "lucide-react";
import { getPricingConfig } from "@/services/pricingService";
import PricingConfigForm from "@/components/admin/pricing/PricingConfigForm";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const config = await getPricingConfig();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-[#FFD700]" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Platform Pricing &amp; Commercial Terms
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Configure starter package price, reservation holding deposit ($500), 5% price incentive, and 75/25 GGR revenue share split.
          </p>
        </div>
      </div>

      <PricingConfigForm initialConfig={config} />
    </div>
  );
}

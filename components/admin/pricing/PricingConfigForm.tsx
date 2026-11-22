"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2, DollarSign, Percent } from "lucide-react";
import { PricingConfig } from "@/types";
import { updatePricingConfigAction } from "@/app/actions/pricingActions";

interface PricingConfigFormProps {
  initialConfig: PricingConfig;
}

export default function PricingConfigForm({ initialConfig }: PricingConfigFormProps) {
  const [config, setConfig] = useState<PricingConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const res = await updatePricingConfigAction(config);
    if (res.success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } else {
      alert("Failed to save pricing configuration: " + res.error);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm font-medium flex items-center gap-2.5">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>Pricing configuration saved! Customer quote calculations and storefront prices are updated.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Package & Holding Fees */}
        <div className="p-6 rounded-2xl bg-[#080214] border border-purple-900/40 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-purple-900/30">
            <DollarSign size={19} className="text-[#FFD700]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Turnkey Package &amp; Reservation Fees
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
              Starter Package Base Price (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">$</span>
              <input
                type="number"
                min={1000}
                step={500}
                required
                value={config.starterPackagePrice}
                onChange={(e) =>
                  setConfig({ ...config, starterPackagePrice: Number(e.target.value) })
                }
                className="w-full px-4 py-2.5 pl-8 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm font-bold focus:outline-none focus:border-[#FFD700]"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Default: $15,000 USD (Includes slots, table games, branding).</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
              Reservation Holding Fee (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">$</span>
              <input
                type="number"
                min={100}
                step={50}
                required
                value={config.reservationFee}
                onChange={(e) =>
                  setConfig({ ...config, reservationFee: Number(e.target.value) })
                }
                className="w-full px-4 py-2.5 pl-8 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm font-bold focus:outline-none focus:border-[#FFD700]"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Credited towards project invoice or refunded if expired.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Discount Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={50}
                  required
                  value={config.reservationDiscountPercent}
                  onChange={(e) =>
                    setConfig({ ...config, reservationDiscountPercent: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2.5 pr-8 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm font-bold focus:outline-none focus:border-[#FFD700]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Default: 5% price incentive.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Holding Duration
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={720}
                  required
                  value={config.reservationDurationHours}
                  onChange={(e) =>
                    setConfig({ ...config, reservationDurationHours: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2.5 pr-16 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm font-bold focus:outline-none focus:border-[#FFD700]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">hours</span>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">120 hrs = 5 full business days.</p>
            </div>
          </div>
        </div>

        {/* GGR Revenue Share Split & Module Pricing */}
        <div className="p-6 rounded-2xl bg-[#080214] border border-purple-900/40 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-purple-900/30">
            <Percent size={19} className="text-[#FFD700]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              GGR Revenue Share Model
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Operator Share (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={config.ggrOperatorShare}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setConfig({ ...config, ggrOperatorShare: val, ggrCompanyShare: 100 - val });
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm font-bold focus:outline-none focus:border-[#FFD700]"
              />
              <p className="text-xs text-gray-400 mt-1.5">Casino client revenue (75%).</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                All I Gaming Share (%)
              </label>
              <input
                type="number"
                disabled
                value={config.ggrCompanyShare}
                className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-gray-400 text-sm font-bold"
              />
              <p className="text-xs text-gray-400 mt-1.5">Platform fee (25%).</p>
            </div>
          </div>

          {/* Add-on Modules Reference Table */}
          <div className="pt-3 border-t border-purple-900/30">
            <h3 className="text-xs font-bold text-gray-300 uppercase mb-3">
              Expansion Module Pricing Reference
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between p-3 rounded-xl bg-[#04010a] border border-purple-900/40">
                <span>Live Dealer Casino</span>
                <span className="font-bold text-white">$10,000 USD</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#04010a] border border-purple-900/40">
                <span>Sportsbook Integration</span>
                <span className="font-bold text-white">$10,000 USD</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#04010a] border border-purple-900/40">
                <span>Poker Platform</span>
                <span className="font-bold text-white">$20,000 USD</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#04010a] border border-purple-900/40">
                <span>Sweepstakes Engine</span>
                <span className="font-bold text-white">$25,000 USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all disabled:opacity-50 cursor-pointer"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} className="stroke-[2.5]" />}
          <span>Save Pricing Configuration</span>
        </button>
      </div>
    </form>
  );
}

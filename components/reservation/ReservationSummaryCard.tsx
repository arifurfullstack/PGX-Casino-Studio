import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { CasinoDesign } from "@/types";

interface ReservationSummaryCardProps {
  selectedDesign: CasinoDesign;
  packageTotal: number;
  addonCount: number;
}

export default function ReservationSummaryCard({
  selectedDesign,
  packageTotal,
  addonCount,
}: ReservationSummaryCardProps) {
  const discountAmount = Math.round(packageTotal * 0.05);

  return (
    <div className="lg:col-span-5 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 space-y-5 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
      <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200">
        Selected Platform Summary
      </h3>

      <div className="relative w-full aspect-[460/190] rounded-xl overflow-hidden border border-purple-500/40">
        <Image
          src={selectedDesign.image}
          alt={selectedDesign.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between py-1.5 border-b border-purple-950">
          <span className="text-gray-400">Base Platform:</span>
          <span className="font-bold text-white">$15,000 USD</span>
        </div>
        {addonCount > 0 && (
          <div className="flex justify-between py-1.5 border-b border-purple-950">
            <span className="text-gray-400">Add-On Modules:</span>
            <span className="font-bold text-yellow-400">{addonCount} Selected</span>
          </div>
        )}
        <div className="flex justify-between py-1.5 border-b border-purple-950">
          <span className="text-gray-400">Standard Package Price:</span>
          <span className="font-bold text-white">${packageTotal.toLocaleString()} USD</span>
        </div>
        <div className="flex justify-between py-1.5 text-green-400 font-bold">
          <span>5% Reservation Discount Available:</span>
          <span>-${discountAmount.toLocaleString()} USD</span>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1.5 text-[11px] text-gray-300">
        <div className="flex items-center gap-2 text-green-400 font-bold">
          <ShieldCheck size={14} />
          <span>100% Risk-Free Holding Guarantee</span>
        </div>
        <p className="leading-relaxed">
          Reserving unlocks 5% off the full price and protects your chosen design for 5 days. Holding fee is fully refundable.
        </p>
      </div>
    </div>
  );
}

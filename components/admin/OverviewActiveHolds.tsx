import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Reservation } from "@/types";
import HoldCountdown from "@/components/portal/HoldCountdown";

interface OverviewActiveHoldsProps {
  reservations: Reservation[];
}

export default function OverviewActiveHolds({ reservations }: OverviewActiveHoldsProps) {
  const activeHolds = reservations.filter((r) => r.status === "active").slice(0, 5);

  return (
    <div className="p-5 rounded-xl bg-[#080214] border border-purple-900/40">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#FFD700]" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Active 5-Day Price Locks ($500)
          </h2>
        </div>
        <Link
          href="/admin/reservations"
          className="text-xs font-semibold text-[#FFD700] hover:text-[#FFE57F] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All ({reservations.length})</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {activeHolds.length === 0 ? (
        <div className="py-8 text-center text-gray-500 text-xs">
          No active price-lock reservations at this time.
        </div>
      ) : (
        <div className="divide-y divide-purple-900/30">
          {activeHolds.map((res) => {
            return (
              <div
                key={res.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02] px-2 rounded-lg transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{res.customerName}</span>
                    <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                      {res.reservationId}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                    <span className="text-[#FFD700]">{res.selectedDesignName}</span>
                    <span>•</span>
                    <span>Bal: ${res.remainingBalance.toLocaleString()} USD</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">5% Saved: ${res.discountPercent ? Math.round((res.originalPackagePrice * res.discountPercent) / 100).toLocaleString() : "750"}</span>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <HoldCountdown
                    expiresAt={res.expiresAt}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border bg-purple-950/80 text-purple-200 border-purple-500/40"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

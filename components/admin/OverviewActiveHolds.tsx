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
    <div className="p-6 rounded-2xl bg-[#080214] border border-purple-900/40">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <Clock size={20} className="text-[#FFD700]" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Active 5-Day Price Locks ($1,000)
          </h2>
        </div>
        <Link
          href="/admin/reservations"
          className="text-sm font-semibold text-[#FFD700] hover:text-[#FFE57F] inline-flex items-center gap-1.5 transition-colors"
        >
          <span>View All ({reservations.length})</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {activeHolds.length === 0 ? (
        <div className="py-12 text-center text-gray-400 text-sm">
          No active price-lock reservations at this time.
        </div>
      ) : (
        <div className="divide-y divide-purple-900/30">
          {activeHolds.map((res) => {
            return (
              <div
                key={res.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.03] px-3 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-white">{res.customerName}</span>
                    <span className="text-xs font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/30">
                      {res.reservationId}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                    <span className="text-[#FFD700] font-medium">{res.selectedDesignName}</span>
                    <span>•</span>
                    <span>Bal: ${res.remainingBalance.toLocaleString()} USD</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">
                      5% Saved: $
                      {res.discountPercent
                        ? Math.round((res.originalPackagePrice * res.discountPercent) / 100).toLocaleString()
                        : "750"}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <HoldCountdown
                    expiresAt={res.expiresAt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border bg-purple-950/80 text-purple-200 border-purple-500/40"
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

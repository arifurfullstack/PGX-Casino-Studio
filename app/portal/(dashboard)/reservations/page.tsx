import Link from "next/link";
import { redirect } from "next/navigation";
import { Clock, ShieldCheck, CheckCircle2, RotateCcw, AlertTriangle, ArrowRight } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { getCustomerDashboardData } from "@/services/customerPortalService";

export const dynamic = "force-dynamic";

export default async function CustomerReservationsPage() {
  const session = await getCustomerSession();
  if (!session) {
    redirect("/portal/login");
  }

  const data = await getCustomerDashboardData(session.email);
  const reservations = data?.reservations || [];

  const getRemainingTime = (expiresAtStr: string) => {
    const diff = new Date(expiresAtStr).getTime() - Date.now();
    if (diff <= 0) return { text: "Expired", isExpired: true };
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { text: `${hours}h ${mins}m remaining`, isExpired: false };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-[#FFD700]" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              My 5-Day Reservations &amp; Receipts
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Track your $500 reservation holdings, locked 5% package discounts, and digital deposit receipts.
          </p>
        </div>

        <Link
          href="/designs"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_12px_rgba(255,215,0,0.3)] self-start sm:self-auto"
        >
          <span>Reserve Another Theme</span>
          <ArrowRight size={14} className="stroke-[2.5]" />
        </Link>
      </div>

      {/* Reservations Table / Cards */}
      {reservations.length === 0 ? (
        <div className="p-8 rounded-xl bg-[#080214] border border-purple-900/40 text-center space-y-3">
          <Clock size={32} className="mx-auto text-purple-400/60" />
          <h2 className="text-sm font-bold text-white">No Reservations On File Yet</h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            You can lock in a 5% discount and secure your casino package price for 5 days with a $500 refundable deposit on the design selector.
          </p>
          <Link
            href="/designs"
            className="inline-block mt-2 px-4 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700]"
          >
            Explore Casino Designs →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => {
            const { text: timeText, isExpired } = getRemainingTime(res.expiresAt);
            const discountAmount = Math.round(res.originalPackagePrice * 0.05);

            return (
              <div
                key={res.id}
                className="p-5 rounded-xl bg-[#080214] border border-purple-900/50 space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-900/30">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm font-bold text-[#FFD700]">{res.reservationId}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        res.status === "active"
                          ? "bg-purple-950 text-purple-300 border-purple-500/40"
                          : res.status === "agreement_completed"
                          ? "bg-emerald-950 text-emerald-300 border-emerald-500/40"
                          : "bg-red-950 text-red-300 border-red-500/40"
                      }`}
                    >
                      {res.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400">
                    Created on {new Date(res.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Casino Theme</span>
                    <p className="font-bold text-white mt-0.5">{res.selectedDesignName}</p>
                    {res.selectedAddons?.length > 0 && (
                      <p className="text-[10px] text-purple-300">+{res.selectedAddons.length} modules</p>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Original Price</span>
                    <p className="text-gray-300 mt-0.5 font-medium">${res.originalPackagePrice.toLocaleString()} USD</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold">5% Discount Locked</span>
                    <p className="text-emerald-400 font-bold mt-0.5">-${discountAmount.toLocaleString()} USD</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#FFD700] uppercase font-bold">Balance Due</span>
                    <p className="text-sm font-black text-[#FFD700] mt-0.5">${res.remainingBalance.toLocaleString()} USD</p>
                  </div>
                </div>

                {/* Receipt Footnote */}
                <div className="p-3 rounded-lg bg-[#04010a] border border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={14} className="text-[#FFD700] shrink-0" />
                    <span>
                      Deposit Paid: <strong className="text-white">$500 USD</strong> • 100% credited toward project invoice upon agreement sign-off.
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    {res.status === "active" ? (
                      <span className="font-bold text-amber-300">{timeText}</span>
                    ) : (
                      <span className="text-gray-500 italic">Archived</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

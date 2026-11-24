import Link from "next/link";
import { redirect } from "next/navigation";
import { Clock, ShieldCheck, ArrowRight, Crown, Sparkles } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { getCustomerDashboardData } from "@/services/customerPortalService";
import HoldCountdown from "@/components/portal/HoldCountdown";

export const dynamic = "force-dynamic";

export default async function CustomerReservationsPage() {
  const session = await getCustomerSession();
  if (!session) {
    redirect("/portal/login");
  }

  const data = await getCustomerDashboardData(session.email);
  const reservations = data?.reservations || [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <section className="portal-panel p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="portal-icon-medallion portal-icon-medallion-active w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
            <Clock size={19} className="text-[#f5c451]" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f5c451]">
              5% Discount &amp; 120-Hour Price Lock
            </p>
            <h1 className="font-philosopher text-xl sm:text-2xl font-bold italic text-white leading-tight mt-0.5">
              My 5-Day <span className="gold-text">Reservations</span> &amp; Receipts
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
              Track your $1,000 refundable reservation holdings, locked 5% package discounts, and official digital deposit receipts.
            </p>
          </div>
        </div>

        <Link
          href="/designs"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffe27a] via-[#f5b82e] to-[#d48806] text-[#261100] px-4 py-2.5 text-xs sm:text-sm font-extrabold border border-[#fff2b2]/70 hover:brightness-105 transition-all duration-150 shrink-0 self-start lg:self-auto"
        >
          <Crown size={15} className="fill-[#261100] text-[#261100]" />
          <span>Reserve Another Theme</span>
          <ArrowRight size={15} className="stroke-[2.5]" />
        </Link>
      </section>

      {/* Reservations Cards */}
      {reservations.length === 0 ? (
        <section className="portal-panel p-7 sm:p-10 text-center space-y-3.5">
          <span className="portal-icon-medallion w-12 h-12 rounded-xl mx-auto flex items-center justify-center">
            <Sparkles size={20} className="text-[#f5c451]" />
          </span>
          <h2 className="font-philosopher text-xl sm:text-2xl font-bold text-white">
            No Reservations On File Yet
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            Lock in a <strong className="text-[#ffe28a]">5% VIP discount</strong> and secure your custom casino package price for 5 full days with a $1,000 refundable deposit on our design selector.
          </p>
          <div className="pt-1">
            <Link
              href="/designs"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffe27a] via-[#f5b82e] to-[#d48806] text-[#261100] px-5 py-2.5 text-xs sm:text-sm font-extrabold border border-[#fff2b2]/70 hover:brightness-105 transition-all duration-150"
            >
              <span>Explore Casino Designs</span>
              <ArrowRight size={15} className="stroke-[2.5]" />
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => {
            const discountAmount = Math.round(res.originalPackagePrice * 0.05);

            return (
              <div
                key={res.id}
                className="portal-panel portal-panel-gold p-4 sm:p-5 space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-[#d696ff]/15">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-philosopher text-lg font-bold gold-text tabular-nums">
                      {res.reservationId}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                        res.status === "active"
                          ? "bg-purple-950/90 text-[#e5b8ff] border-[#d58cff]/45"
                          : res.status === "agreement_completed"
                          ? "bg-emerald-950/90 text-emerald-300 border-emerald-400/45"
                          : "bg-rose-950/90 text-rose-200 border-rose-500/45"
                      }`}
                    >
                      {res.status.replace("_", " ")}
                    </span>
                  </div>

                  <span className="text-xs text-white/60 tabular-nums">
                    Created on {new Date(res.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-[#0d031b]/75 border border-[#d696ff]/20">
                    <span className="text-[11px] text-white/55 uppercase font-bold tracking-wider">
                      Casino Theme
                    </span>
                    <p className="font-philosopher text-base font-bold text-white mt-0.5">
                      {res.selectedDesignName}
                    </p>
                    {res.selectedAddons?.length > 0 && (
                      <p className="text-[11px] text-[#d58cff] font-semibold mt-0.5">
                        +{res.selectedAddons.length} expansion modules
                      </p>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-[#0d031b]/75 border border-[#d696ff]/20">
                    <span className="text-[11px] text-white/55 uppercase font-bold tracking-wider">
                      Original Price
                    </span>
                    <p className="font-philosopher text-base font-bold text-white/85 mt-0.5 tabular-nums">
                      ${res.originalPackagePrice.toLocaleString()} USD
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/35 border border-emerald-400/30">
                    <span className="text-[11px] text-emerald-300 uppercase font-bold tracking-wider">
                      5% Discount Locked
                    </span>
                    <p className="font-philosopher text-base font-bold text-emerald-300 mt-0.5 tabular-nums">
                      -${discountAmount.toLocaleString()} USD
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/35 border border-[#f5c451]/35">
                    <span className="text-[11px] text-[#ffe28a] uppercase font-bold tracking-wider">
                      Balance Due
                    </span>
                    <p className="font-philosopher text-lg font-bold gold-text mt-0.5 tabular-nums">
                      ${res.remainingBalance.toLocaleString()} USD
                    </p>
                  </div>
                </div>

                {/* Receipt Footnote */}
                <div className="p-3 rounded-xl bg-[#090214]/85 border border-[#d696ff]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2 text-white/75">
                    <ShieldCheck size={15} className="text-[#f5c451] shrink-0" />
                    <span>
                      Deposit Paid: <strong className="text-white">$1,000 USD</strong> • 100% credited toward project invoice upon agreement sign-off.
                    </span>
                  </div>

                  <div className="shrink-0">
                    {res.status === "active" ? (
                      <HoldCountdown expiresAt={res.expiresAt} />
                    ) : (
                      <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                        Archived
                      </span>
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

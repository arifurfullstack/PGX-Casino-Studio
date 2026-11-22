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
    <div className="space-y-8">
      {/* Luxury Page Header */}
      <section className="js-portal-hero portal-panel p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <span className="portal-icon-medallion portal-icon-medallion-active w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <Clock size={26} className="gold-icon" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5c451]">
              5% Discount &amp; 120-Hour Price Lock
            </p>
            <h1 className="font-philosopher text-2xl sm:text-3xl xl:text-4xl font-bold italic text-white leading-tight mt-1">
              My 5-Day <span className="gold-text">Reservations</span> &amp; Receipts
            </h1>
            <p className="text-sm sm:text-base text-white/70 mt-2 max-w-2xl">
              Track your $500 refundable reservation holdings, locked 5% package discounts, and official digital deposit receipts.
            </p>
          </div>
        </div>

        <Link
          href="/designs"
          className="js-portal-cta btn-royal-gold shine px-6 py-3.5 text-[15px] font-extrabold shrink-0 self-start lg:self-auto"
        >
          <Crown size={17} className="fill-[#261100] text-[#261100]" />
          <span>Reserve Another Theme</span>
          <ArrowRight size={17} className="stroke-[2.75]" />
        </Link>
      </section>

      {/* Reservations Cards */}
      {reservations.length === 0 ? (
        <section className="js-portal-panel portal-panel p-10 sm:p-14 text-center space-y-5">
          <span className="js-portal-float portal-icon-medallion w-16 h-16 rounded-2xl mx-auto flex items-center justify-center">
            <Sparkles size={28} className="gold-icon" />
          </span>
          <h2 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
            No Reservations On File Yet
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Lock in a <strong className="text-[#ffe28a]">5% VIP discount</strong> and secure your custom casino package price for 5 full days with a $500 refundable deposit on our design selector.
          </p>
          <div className="pt-2">
            <Link
              href="/designs"
              className="js-portal-cta btn-royal-gold shine px-8 py-4 text-[15px] font-extrabold"
            >
              <span>Explore Casino Designs</span>
              <ArrowRight size={18} className="stroke-[2.75]" />
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {reservations.map((res) => {
            const discountAmount = Math.round(res.originalPackagePrice * 0.05);

            return (
              <div
                key={res.id}
                className="js-portal-panel js-portal-card group portal-panel portal-panel-gold panel-interactive p-6 sm:p-8 space-y-6"
              >
                <div className="portal-card-spotlight" aria-hidden="true" />
                <div className="panel-sheen" aria-hidden="true" />
                <div className="panel-rim" aria-hidden="true" />

                {/* Header Row */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#d696ff]/20">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-philosopher text-xl font-bold gold-text tabular-nums">
                      {res.reservationId}
                    </span>
                    <span
                      className={`text-xs font-bold px-3.5 py-1 rounded-full border uppercase tracking-wider ${
                        res.status === "active"
                          ? "bg-purple-950/90 text-[#e5b8ff] border-[#d58cff]/50"
                          : res.status === "agreement_completed"
                          ? "bg-emerald-950/90 text-emerald-300 border-emerald-400/50"
                          : "bg-rose-950/90 text-rose-200 border-rose-500/50"
                      }`}
                    >
                      {res.status.replace("_", " ")}
                    </span>
                  </div>

                  <span className="text-sm text-white/65 tabular-nums">
                    Created on {new Date(res.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="p-4 rounded-2xl bg-[#0d031b]/75 border border-[#d696ff]/25">
                    <span className="text-xs text-white/55 uppercase font-bold tracking-wider">
                      Casino Theme
                    </span>
                    <p className="font-philosopher text-lg sm:text-xl font-bold text-white mt-1">
                      {res.selectedDesignName}
                    </p>
                    {res.selectedAddons?.length > 0 && (
                      <p className="text-xs text-[#d58cff] font-semibold mt-1">
                        +{res.selectedAddons.length} expansion modules
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d031b]/75 border border-[#d696ff]/25">
                    <span className="text-xs text-white/55 uppercase font-bold tracking-wider">
                      Original Price
                    </span>
                    <p className="font-philosopher text-lg sm:text-xl font-bold text-white/85 mt-1 tabular-nums">
                      ${res.originalPackagePrice.toLocaleString()} USD
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/35 border border-emerald-400/35">
                    <span className="text-xs text-emerald-300 uppercase font-bold tracking-wider">
                      5% Discount Locked
                    </span>
                    <p className="font-philosopher text-lg sm:text-xl font-bold text-emerald-300 mt-1 tabular-nums">
                      -${discountAmount.toLocaleString()} USD
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/35 border border-[#f5c451]/45">
                    <span className="text-xs text-[#ffe28a] uppercase font-bold tracking-wider">
                      Balance Due
                    </span>
                    <p className="font-philosopher text-xl sm:text-2xl font-bold gold-text mt-1 tabular-nums">
                      ${res.remainingBalance.toLocaleString()} USD
                    </p>
                  </div>
                </div>

                {/* Receipt Footnote */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#090214]/85 border border-[#d696ff]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-3 text-white/75">
                    <ShieldCheck size={18} className="text-[#f5c451] shrink-0" />
                    <span>
                      Deposit Paid: <strong className="text-white">$500 USD</strong> • 100% credited toward project invoice upon agreement sign-off.
                    </span>
                  </div>

                  <div className="shrink-0">
                    {res.status === "active" ? (
                      <HoldCountdown expiresAt={res.expiresAt} />
                    ) : (
                      <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
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

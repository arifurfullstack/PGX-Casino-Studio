import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Crown,
  DollarSign,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getReservationById } from "@/services/reservationService";
import { getPublicPaymentConfig } from "@/services/integrationService";
import StandaloneReservationPay from "@/components/reservation/StandaloneReservationPay";

export const dynamic = "force-dynamic";

interface StandaloneReservationPageProps {
  params: Promise<{ id: string }>;
}

export default async function StandaloneReservationPage({
  params,
}: StandaloneReservationPageProps) {
  const { id } = await params;
  const [reservation, paymentConfig, t, tCommon] = await Promise.all([
    getReservationById(id),
    getPublicPaymentConfig(),
    getTranslations("reservation.standalone"),
    getTranslations("common"),
  ]);

  if (!reservation) {
    return (
      <main className="min-h-screen pt-16 pb-24 bg-[#04010a] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl bg-[#090214] border border-purple-900/60 p-8 text-center space-y-4 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
          <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 mx-auto flex items-center justify-center">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-xl font-black text-white">{t("notFoundTitle")}</h1>
          <p className="text-xs text-gray-400">
            {t("notFoundBody", { id })}
          </p>
          <div className="pt-2">
            <Link
              href="/designs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            >
              <span>{t("browseCatalog")}</span>
              <ArrowRight size={14} className="rtl-flip" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isAlreadyPaid = reservation.status === "active" || reservation.status === "agreement_completed";
  const isExpired = reservation.status === "expired" || reservation.status === "cancelled";

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-24 bg-[#04010a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              {t("dossierBadge")}
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            {t("headingPrefix")} <span className="text-[#FFD700]">{t("headingHighlight")}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            {t("referenceClient", { id: reservation.reservationId, name: reservation.customerName })}
          </p>
        </div>

        {/* If Already Paid */}
        {isAlreadyPaid && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#090214] border-2 border-[#34d399] text-center space-y-4 shadow-[0_0_40px_rgba(52,211,153,0.2)]">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-[#34d399] mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {t("alreadyPaidTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              {t("alreadyPaidBody", {
                discount: reservation.discountPercent,
                design: reservation.selectedDesignName,
              })}
            </p>
            <div className="pt-2">
              <Link
                href={`/confirmation/reservation?id=${reservation.reservationId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                <span>{t("viewOfficialReceipt")}</span>
                <ArrowRight size={14} className="rtl-flip" />
              </Link>
            </div>
          </div>
        )}

        {/* If Expired */}
        {isExpired && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#090214] border-2 border-red-500/60 text-center space-y-4 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 mx-auto flex items-center justify-center">
              <Clock size={36} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {t("expiredTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              {t("expiredBody")}
            </p>
            <div className="pt-2">
              <Link
                href="/designs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                <span>{t("startNew")}</span>
                <ArrowRight size={14} className="rtl-flip" />
              </Link>
            </div>
          </div>
        )}

        {/* If Pending Payment -> Show 2-Column Checkout */}
        {!isAlreadyPaid && !isExpired && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Reservation Package Summary */}
            <div className="lg:col-span-5 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="space-y-1 pb-4 border-b border-purple-900/40">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {t("targetSolution")}
                </span>
                <h3 className="text-xl font-black text-white">
                  {reservation.selectedDesignName}
                </h3>
                {reservation.selectedAddons && reservation.selectedAddons.length > 0 && (
                  <p className="text-xs text-purple-300">
                    {t("includes", { addons: reservation.selectedAddons.join(", ") })}
                  </p>
                )}
              </div>

              {/* Financial Calculation Table */}
              <div className="p-4 rounded-xl bg-[#04010a] border border-purple-900/50 space-y-3">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{t("standardPrice")}</span>
                  <span className="line-through">${reservation.originalPackagePrice.toLocaleString()} {tCommon("usd")}</span>
                </div>

                <div className="flex justify-between text-xs text-[#34d399] font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles size={13} />
                    <span>{t("discountLabel", { discount: reservation.discountPercent })}</span>
                  </span>
                  <span>-${Math.round((reservation.originalPackagePrice * reservation.discountPercent) / 100).toLocaleString()} {tCommon("usd")}</span>
                </div>

                <div className="flex justify-between text-xs text-white font-bold pt-2 border-t border-purple-900/40">
                  <span>{t("lockedTotal")}</span>
                  <span className="text-sm text-yellow-400">${reservation.discountedPrice.toLocaleString()} {tCommon("usd")}</span>
                </div>

                <div className="flex justify-between text-xs text-white font-bold pt-1">
                  <span>{t("holdingDueNow")}</span>
                  <span className="text-sm text-[#FFD700]">${reservation.reservationFee} {tCommon("usd")}</span>
                </div>

                <div className="flex justify-between text-[11px] text-gray-400 pt-2 border-t border-purple-900/40">
                  <span>{t("remainingBalance")}</span>
                  <span>${reservation.remainingBalance.toLocaleString()} {tCommon("usd")}</span>
                </div>
              </div>

              {/* Commercial Terms Badges */}
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-yellow-400 shrink-0" />
                  <span>{t("term1")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-[#34d399] shrink-0" />
                  <span>{t("term2")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-purple-400 shrink-0" />
                  <span>{t("term3")}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Payment Form */}
            <div className="lg:col-span-7 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
              <StandaloneReservationPay
                reservation={reservation}
                paymentConfig={paymentConfig}
              />
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

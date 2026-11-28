"use client";

import Link from "next/link";
import {
  Crown,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Reservation } from "@/types";
import { SITE_CONFIG } from "@/config/site-config";
import HoldCountdown from "@/components/portal/HoldCountdown";

interface ReservationReceiptViewProps {
  reservation: Reservation;
}

export default function ReservationReceiptView({
  reservation,
}: ReservationReceiptViewProps) {
  const t = useTranslations("reservation.confirmation");
  const tCommon = useTranslations("common");
  const discountAmount = Math.round(
    (reservation.originalPackagePrice * reservation.discountPercent) / 100
  );

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ALL I GAMING, I have reserved ${reservation.selectedDesignName} (Reservation ID: ${reservation.reservationId}). Looking forward to discussing our turnkey casino launch.`
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Congratulatory Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40">
          <CheckCircle2 size={13} className="text-[#34d399]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34d399]">
            {t("resBadge", { discount: reservation.discountPercent })}
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
          {t("resHeadingPrefix")} <span className="text-[#FFD700]">{t("resHeadingHighlight")}</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
          {t("resSubtitle")}
        </p>
      </div>

      {/* Main Official Luxury Certificate Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#110526] to-[#080214] border-2 border-[#FFD700] p-6 sm:p-10 shadow-[0_0_50px_rgba(255,215,0,0.25)] space-y-8 print:border-black print:bg-white print:text-black">
        
        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-900/50 print:border-gray-300">
          <div>
            <div className="flex items-center gap-2">
              <Crown size={20} className="text-[#FFD700]" />
              <span className="text-xs font-black tracking-widest text-[#FFD700] uppercase">
                {t("certificateTitle")}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{t("certificateSub")}</p>
          </div>

          <div className="text-start sm:text-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              {t("reservationIdLabel")}
            </span>
            <span className="font-mono text-base font-black text-yellow-300">
              {reservation.reservationId}
            </span>
          </div>
        </div>

        {/* 2-Column: Customer Details & Countdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-[#04010a]/80 border border-purple-900/40 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {t("clientInfo")}
            </span>
            <p className="text-white font-bold text-sm">{reservation.customerName}</p>
            <p className="text-gray-300">{t("emailLabel", { email: reservation.customerEmail })}</p>
            <p className="text-gray-300">{t("phoneLabel", { phone: reservation.customerPhone })}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#04010a]/80 border border-purple-900/40 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {t("expiryWindow")}
              </span>
              <Clock size={14} className="text-yellow-400" />
            </div>
            <div className="py-1">
              <HoldCountdown expiresAt={reservation.expiresAt} />
            </div>
            <p className="text-[11px] text-gray-400">
              {t("exactExpiry", { date: new Date(reservation.expiresAt).toUTCString() })}
            </p>
          </div>
        </div>

        {/* Selected Package Breakdown Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            {t("platformConfig")}
          </h3>

          <div className="rounded-2xl bg-[#04010a] border border-purple-900/50 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-900/40">
              <div>
                <span className="font-bold text-white text-sm">{reservation.selectedDesignName}</span>
                {reservation.selectedAddons && reservation.selectedAddons.length > 0 && (
                  <p className="text-[11px] text-purple-300 mt-0.5">
                    {t("modulesLabel", { modules: reservation.selectedAddons.join(", ") })}
                  </p>
                )}
              </div>
              <span className="font-mono text-gray-300">${reservation.originalPackagePrice.toLocaleString()} {tCommon("usd")}</span>
            </div>

            {/* Financial Rows */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>{t("originalTotal")}</span>
                <span className="font-mono line-through">${reservation.originalPackagePrice.toLocaleString()} {tCommon("usd")}</span>
              </div>

              <div className="flex justify-between text-[#34d399] font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>{t("exclusiveDiscount", { discount: reservation.discountPercent })}</span>
                </span>
                <span className="font-mono">-${discountAmount.toLocaleString()} {tCommon("usd")}</span>
              </div>

              <div className="flex justify-between text-white font-bold pt-2 border-t border-purple-900/40">
                <span>{t("discountedTotal")}</span>
                <span className="font-mono text-sm text-yellow-400">${reservation.discountedPrice.toLocaleString()} {tCommon("usd")}</span>
              </div>

              <div className="flex justify-between text-[#FFD700] font-bold">
                <span>{t("depositPaid")}</span>
                <span className="font-mono text-sm">${reservation.reservationFee} {tCommon("usd")} ({t("refundableTag")})</span>
              </div>

              <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-purple-900/40">
                <span>{t("remainingBalance")}</span>
                <span className="font-mono text-base text-[#FFD700]">${reservation.remainingBalance.toLocaleString()} {tCommon("usd")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps 3-Item Process */}
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2 text-xs text-gray-300">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD700] block">
            {t("whatNext")}
          </span>
          <ol className="list-decimal list-inside space-y-1 leading-relaxed">
            <li><strong>{t("step2Title")}:</strong> {t("step2Desc")}</li>
            <li><strong>{t("step1Title")}:</strong> {t("step1Desc")}</li>
            <li><strong>{t("step3Title")}:</strong> {t("step3Desc")}</li>
          </ol>
        </div>

        {/* Card Actions (Print, WhatsApp, Portal) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-900/50 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 transition-all"
          >
            <Printer size={15} />
            <span>{t("printReceipt")}</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <MessageSquare size={15} />
              <span>{t("chatWhatsapp")}</span>
            </a>

            <Link
              href="/portal/reservations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            >
              <span>{t("clientPortal")}</span>
              <ArrowRight size={14} className="rtl-flip" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

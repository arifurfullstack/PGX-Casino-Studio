"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Sparkles, Clock, ArrowRight, Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { CasinoDesign, PricingConfig } from "@/types";
import { DEFAULT_PRICING_CONFIG } from "@/config/default-package";

interface ReservationConfirmedViewProps {
  selectedDesign: CasinoDesign;
  reservationDetails: {
    reservationId: string;
    discountedPrice: number;
    remainingBalance: number;
    expiresAt: string;
  };
  packageTotal: number;
  pricingConfig?: PricingConfig;
  email: string;
  phone: string;
}

export default function ReservationConfirmedView({
  selectedDesign,
  reservationDetails,
  packageTotal,
  pricingConfig = DEFAULT_PRICING_CONFIG,
  email,
  phone,
}: ReservationConfirmedViewProps) {
  const t = useTranslations("reservation.confirmed");
  const tCommon = useTranslations("common");
  const cardRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!cardRef.current) return;
    const tween = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 32, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const target = new Date(reservationDetails.expiresAt).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeLeft(
        `${days}d ${String(hours).padStart(2, "0")}h ${String(mins).padStart(
          2,
          "0"
        )}m ${String(secs).padStart(2, "0")}s`
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [reservationDetails.expiresAt]);

  const discountPercent = pricingConfig.reservationDiscountPercent;
  const reservationFee = pricingConfig.reservationFee;
  const holdDays = Math.max(1, Math.round(pricingConfig.reservationDurationHours / 24));

  return (
    <div
      ref={cardRef}
      className="panel panel-gold relative max-w-2xl mx-auto p-7 sm:p-11 text-center space-y-6 overflow-hidden"
    >
      <div className="panel-sheen" aria-hidden="true" />
      <div className="panel-rim" aria-hidden="true" />

      <div className="relative z-10 w-16 h-16 rounded-full border border-[#f5c451]/70 bg-[#2a0a4a] text-[#ffd75e] mx-auto flex items-center justify-center shadow-[0_0_28px_rgba(245,196,81,0.4)]">
        <Sparkles size={32} />
      </div>

      <div className="relative z-10 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100]">
          <Crown size={13} />
          <span>
            {t("badge", { discount: discountPercent, days: holdDays })}
          </span>
        </span>
        <h2 className="font-philosopher text-3xl sm:text-4xl font-bold italic uppercase text-white">
          {t("headingPrefix")} <span className="gold-text">{t("headingHighlight")}</span> {t("headingSuffix")}
        </h2>
        <p className="text-xs font-bold text-[#ffe28a] uppercase tracking-wider font-mono">
          {t("bookingId", { id: reservationDetails.reservationId })}
        </p>
      </div>

      {/* Live Ticking Hold Countdown Banner */}
      <div className="relative z-10 p-3.5 rounded-2xl bg-[#150529]/90 border border-[#f5c451]/40 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#ffe28a] font-bold">
        <Clock size={16} className="text-[#ffd75e] animate-pulse shrink-0" />
        <span>
          {t("priceLockActive", { hours: pricingConfig.reservationDurationHours })}
          {timeLeft ? ` • ${t("remaining", { time: timeLeft })}` : ""}
        </span>
      </div>

      <div className="relative z-10 rounded-2xl bg-[#0e031d]/90 border border-purple-400/30 p-5 text-start space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">{t("selectedDesign")}</span>
          <span className="font-bold text-white">{selectedDesign.name}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">{t("originalPrice")}</span>
          <span className="line-through text-white/45 tabular-nums">
            ${packageTotal.toLocaleString()} {tCommon("usd")}
          </span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">{t("discountedTotal", { discount: discountPercent })}</span>
          <span className="font-bold text-[#ffe28a] tabular-nums">
            ${reservationDetails.discountedPrice.toLocaleString()} {tCommon("usd")}
          </span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">{t("holdingFee")}</span>
          <span className="font-bold text-emerald-400 tabular-nums">
            ${reservationFee.toLocaleString()} {tCommon("usd")} ({t("credited")})
          </span>
        </div>
        <div className="flex justify-between py-1.5">
          <span className="text-white/60">{t("balanceDelivery")}</span>
          <span className="font-philosopher text-lg font-bold italic gold-text tabular-nums">
            ${reservationDetails.remainingBalance.toLocaleString()} {tCommon("usd")}
          </span>
        </div>
      </div>

      <p className="relative z-10 text-xs sm:text-sm text-white/75 leading-relaxed">
        {t("outreach", { days: holdDays, email, phone })}
      </p>

      <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/confirmation/reservation?id=${reservationDetails.reservationId}`}
          className="btn-royal-gold shine w-full sm:w-auto px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
        >
          <span>{t("viewReceipt")}</span>
          <ArrowRight size={14} className="rtl-flip" />
        </Link>
        <Link
          href="/designs"
          className="btn btn-neon w-full sm:w-auto text-xs font-semibold"
        >
          <span>{t("browseCatalog")}</span>
        </Link>
      </div>
    </div>
  );
}

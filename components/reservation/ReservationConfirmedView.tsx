"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Sparkles, Clock, ArrowRight, Crown } from "lucide-react";
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
            {discountPercent}% Discount Locked • {holdDays}-Day Hold Active
          </span>
        </span>
        <h2 className="font-philosopher text-3xl sm:text-4xl font-bold italic uppercase text-white">
          Design <span className="gold-text">Reserved</span> Successfully!
        </h2>
        <p className="text-xs font-bold text-[#ffe28a] uppercase tracking-wider font-mono">
          Booking ID: {reservationDetails.reservationId}
        </p>
      </div>

      {/* Live Ticking Hold Countdown Banner */}
      <div className="relative z-10 p-3.5 rounded-2xl bg-[#150529]/90 border border-[#f5c451]/40 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#ffe28a] font-bold">
        <Clock size={16} className="text-[#ffd75e] animate-pulse shrink-0" />
        <span>
          Price Lock Active ({pricingConfig.reservationDurationHours} Hours)
          {timeLeft ? ` • Remaining: ${timeLeft}` : ""}
        </span>
      </div>

      <div className="relative z-10 rounded-2xl bg-[#0e031d]/90 border border-purple-400/30 p-5 text-left space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">Selected Design:</span>
          <span className="font-bold text-white">{selectedDesign.name}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">Original Price:</span>
          <span className="line-through text-white/45 tabular-nums">
            ${packageTotal.toLocaleString()} USD
          </span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">{discountPercent}% Discounted Total:</span>
          <span className="font-bold text-[#ffe28a] tabular-nums">
            ${reservationDetails.discountedPrice.toLocaleString()} USD
          </span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-purple-500/20">
          <span className="text-white/60">Refundable Holding Fee:</span>
          <span className="font-bold text-emerald-400 tabular-nums">
            ${reservationFee.toLocaleString()} USD (Credited)
          </span>
        </div>
        <div className="flex justify-between py-1.5">
          <span className="text-white/60">Balance on Project Delivery:</span>
          <span className="font-philosopher text-lg font-bold italic gold-text tabular-nums">
            ${reservationDetails.remainingBalance.toLocaleString()} USD
          </span>
        </div>
      </div>

      <p className="relative z-10 text-xs sm:text-sm text-white/75 leading-relaxed">
        Your selected design has been placed on exclusive {holdDays}-day hold. Our technical
        deployment manager will reach out via Email (<strong className="text-white">{email}</strong>)
        and WhatsApp (<strong className="text-white">{phone}</strong>) within 2 business hours.
      </p>

      <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/confirmation/reservation?id=${reservationDetails.reservationId}`}
          className="btn-royal-gold shine w-full sm:w-auto px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
        >
          <span>View Official Reservation Receipt</span>
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/designs"
          className="btn btn-neon w-full sm:w-auto text-xs font-semibold"
        >
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}

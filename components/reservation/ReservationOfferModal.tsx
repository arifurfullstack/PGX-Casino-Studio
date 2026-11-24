"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, ShieldCheck, ArrowRight, X, Clock, Crown } from "lucide-react";
import { PricingConfig } from "@/types";
import { DEFAULT_PRICING_CONFIG } from "@/config/default-package";

interface ReservationOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPrice: number;
  designName: string;
  pricingConfig?: PricingConfig;
  onConfirmReservation: () => void;
  onContinueWithoutReserving: () => void;
  loading: boolean;
}

export default function ReservationOfferModal({
  isOpen,
  originalPrice,
  designName,
  pricingConfig = DEFAULT_PRICING_CONFIG,
  onConfirmReservation,
  onContinueWithoutReserving,
  loading,
}: ReservationOfferModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const tween = gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 28, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.3)" }
    );
    return () => {
      tween.kill();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const discountPercent = pricingConfig.reservationDiscountPercent;
  const discountAmount = Math.round((originalPrice * discountPercent) / 100);
  const discountedTotal = originalPrice - discountAmount;
  const depositFee = pricingConfig.reservationFee;
  const balanceOnLaunch = Math.max(0, discountedTotal - depositFee);
  const holdDays = Math.max(1, Math.round(pricingConfig.reservationDurationHours / 24));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#05010c]/85 backdrop-blur-md flex items-start sm:items-center justify-center p-4 overflow-y-auto overscroll-contain"
    >
      <div
        ref={modalRef}
        className="panel panel-gold relative max-w-lg w-full p-6 sm:p-8 space-y-6 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-sheen" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-px left-[12%] right-[12%] h-[1.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 232, 150, 0.95), transparent)",
          }}
        />

        {/* Close Button -> defaults to Continue without reserving */}
        <button
          onClick={onContinueWithoutReserving}
          className="absolute top-4 right-4 z-20 p-2 rounded-full border border-purple-400/30 bg-[#1a0730]/85 text-white/60 hover:text-white hover:border-[#f5c451]/60 transition-colors"
          title="Skip Reservation"
        >
          <X size={16} />
        </button>

        {/* Header Badge */}
        <div className="relative z-10 text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2a0a4a]/90 border border-[#f5c451]/60 text-[#ffe28a] text-[11px] font-bold uppercase tracking-[0.16em]">
            <Sparkles size={13} className="text-[#ffd75e]" />
            <span>Exclusive Operator Incentive</span>
          </div>
          <h3 className="font-philosopher text-2xl sm:text-[1.75rem] font-bold uppercase italic tracking-wide text-white leading-tight">
            Lock In <span className="gold-text">{discountPercent}% Off</span> &amp; Hold Your Design
          </h3>
          <p className="text-xs sm:text-sm text-white/75">
            Reserve <strong className="text-white">{designName}</strong> for {holdDays} days with a ${depositFee.toLocaleString()} USD refundable deposit.
          </p>
        </div>

        {/* Pricing Comparison Card */}
        <div className="relative z-10 rounded-2xl bg-[#0e031d]/90 border border-purple-400/35 p-4 space-y-2.5 text-xs sm:text-[13px]">
          <div className="flex justify-between items-center text-white/60">
            <span>Standard Package Price:</span>
            <span className="line-through tabular-nums">${originalPrice.toLocaleString()} USD</span>
          </div>

          <div className="flex justify-between items-center text-emerald-400 font-bold">
            <span>{discountPercent}% Instant Reservation Discount:</span>
            <span className="tabular-nums">-${discountAmount.toLocaleString()} USD</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-y border-purple-500/25 text-sm font-bold text-white">
            <span>Locked Package Total:</span>
            <span className="font-philosopher text-xl font-bold italic gold-text tabular-nums">
              ${discountedTotal.toLocaleString()} USD
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px]">
            <div className="p-2.5 rounded-xl bg-[#18062f]/80 border border-emerald-400/30">
              <p className="text-white/60">Holding Deposit Today:</p>
              <p className="text-sm font-black text-emerald-400 tabular-nums">
                ${depositFee.toLocaleString()} USD
              </p>
              <p className="text-[10px] text-white/50 mt-0.5">100% Refundable</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#18062f]/80 border border-[#f5c451]/35">
              <p className="text-white/60">Balance on Handover:</p>
              <p className="text-sm font-black text-[#ffe28a] tabular-nums">
                ${balanceOnLaunch.toLocaleString()} USD
              </p>
              <p className="text-[10px] text-white/50 mt-0.5">Deposit Credited</p>
            </div>
          </div>
        </div>

        {/* Incentive Highlights */}
        <div className="relative z-10 space-y-2 text-xs text-white/80">
          <div className="flex items-center gap-2.5">
            <Clock size={15} className="text-[#f5c451] shrink-0" />
            <span>
              <strong className="text-white">{holdDays}-Day Price Lock:</strong> Protected against price changes for {pricingConfig.reservationDurationHours} hours.
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">100% Refundable:</strong> Full refund if you choose not to proceed within {holdDays} days.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 space-y-2.5 pt-1">
          <button
            onClick={onConfirmReservation}
            disabled={loading}
            className="btn-royal-gold shine w-full py-3.5 px-5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Securing Reservation...</span>
            ) : (
              <>
                <Crown size={15} className="fill-black/20" />
                <span>Option A: Reserve Now (${depositFee.toLocaleString()} USD)</span>
                <ArrowRight size={15} strokeWidth={2.8} />
              </>
            )}
          </button>

          <button
            onClick={onContinueWithoutReserving}
            disabled={loading}
            className="btn btn-neon w-full !py-2.5 text-xs font-semibold cursor-pointer"
          >
            Option B: Continue Without Reserving (Standard Inquiry)
          </button>
        </div>
      </div>
    </div>
  );
}

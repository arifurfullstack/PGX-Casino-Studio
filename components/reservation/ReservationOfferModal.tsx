"use client";

import { Sparkles, ShieldCheck, ArrowRight, X, Clock, DollarSign } from "lucide-react";

interface ReservationOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPrice: number;
  designName: string;
  onConfirmReservation: () => void;
  onContinueWithoutReserving: () => void;
  loading: boolean;
}

export default function ReservationOfferModal({
  isOpen,
  originalPrice,
  designName,
  onConfirmReservation,
  onContinueWithoutReserving,
  loading,
}: ReservationOfferModalProps) {
  if (!isOpen) return null;

  const discountPercent = 5;
  const discountAmount = Math.round((originalPrice * discountPercent) / 100);
  const discountedTotal = originalPrice - discountAmount;
  const depositFee = 500;
  const balanceOnLaunch = discountedTotal - depositFee;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="relative max-w-lg w-full rounded-3xl bg-gradient-to-b from-[#140428] via-[#0b0217] to-[#05000c] border-2 border-yellow-400 p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(255,215,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button -> defaults to Continue without reserving */}
        <button
          onClick={onContinueWithoutReserving}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-purple-950/80 text-gray-400 hover:text-white transition-colors"
          title="Skip Reservation"
        >
          <X size={16} />
        </button>

        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400 text-yellow-400 text-[11px] font-black uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Exclusive Operator Incentive</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Lock In 5% Off &amp; Hold Your Design
          </h3>
          <p className="text-xs text-gray-300">
            Reserve <strong className="text-white">{designName}</strong> for 5 days with a $500 refundable deposit.
          </p>
        </div>

        {/* Pricing Comparison Card */}
        <div className="rounded-2xl bg-[#090214] border border-purple-500/40 p-4 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-gray-400">
            <span>Standard Package Price:</span>
            <span className="line-through text-gray-400">${originalPrice.toLocaleString()} USD</span>
          </div>

          <div className="flex justify-between items-center text-green-400 font-bold">
            <span className="flex items-center gap-1">
              <span>5% Instant Reservation Discount:</span>
            </span>
            <span>-${discountAmount.toLocaleString()} USD</span>
          </div>

          <div className="flex justify-between items-center py-2 border-y border-purple-900/60 text-sm font-black text-white">
            <span>Locked Package Total:</span>
            <span className="text-yellow-400 text-base">${discountedTotal.toLocaleString()} USD</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-800/40">
              <p className="text-gray-400">Holding Deposit Today:</p>
              <p className="text-sm font-black text-green-400">${depositFee} USD</p>
              <p className="text-[10px] text-gray-400 mt-0.5">100% Refundable</p>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-800/40">
              <p className="text-gray-400">Balance on Handover:</p>
              <p className="text-sm font-black text-yellow-400">${balanceOnLaunch.toLocaleString()} USD</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Deposit Credited</p>
            </div>
          </div>
        </div>

        {/* Incentive Highlights */}
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-yellow-400 shrink-0" />
            <span><strong>5-Day Price Lock:</strong> Protected against price changes for 120 hours.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-400 shrink-0" />
            <span><strong>100% Refundable:</strong> Full refund if you choose not to proceed within 5 days.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Option A: Reserve Now */}
          <button
            onClick={onConfirmReservation}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_25px_rgba(255,215,0,0.5)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span>Securing Reservation...</span>
            ) : (
              <>
                <span>Option A: Reserve Now ($500 USD)</span>
                <ArrowRight size={15} strokeWidth={3} />
              </>
            )}
          </button>

          {/* Option B: Continue without reserving */}
          <button
            onClick={onContinueWithoutReserving}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/50 transition-colors"
          >
            Option B: Continue Without Reserving (Standard Inquiry)
          </button>
        </div>

      </div>
    </div>
  );
}

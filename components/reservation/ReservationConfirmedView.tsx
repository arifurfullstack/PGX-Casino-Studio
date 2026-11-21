"use client";

import Link from "next/link";
import { Sparkles, Clock, ArrowRight } from "lucide-react";
import { CasinoDesign } from "@/types";

interface ReservationConfirmedViewProps {
  selectedDesign: CasinoDesign;
  reservationDetails: {
    reservationId: string;
    discountedPrice: number;
    remainingBalance: number;
    expiresAt: string;
  };
  packageTotal: number;
  email: string;
  phone: string;
}

export default function ReservationConfirmedView({
  selectedDesign,
  reservationDetails,
  packageTotal,
  email,
  phone,
}: ReservationConfirmedViewProps) {
  return (
    <div className="max-w-2xl mx-auto rounded-3xl bg-[#090214] border-2 border-yellow-400 p-8 sm:p-12 text-center space-y-6 shadow-[0_0_50px_rgba(255,215,0,0.35)]">
      <div className="w-16 h-16 rounded-full bg-yellow-400/20 text-yellow-400 mx-auto flex items-center justify-center">
        <Sparkles size={36} />
      </div>

      <div className="space-y-1">
        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-yellow-400 text-black">
          5% Discount Locked • 5-Day Hold Active
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-2">
          Design Reserved Successfully!
        </h2>
        <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
          Booking ID: {reservationDetails.reservationId}
        </p>
      </div>

      {/* 5-Day Countdown Banner */}
      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center gap-2 text-xs text-yellow-300 font-bold">
        <Clock size={16} className="text-yellow-400 animate-pulse" />
        <span>Price Hold Guaranteed for 120 Hours (5 Days)</span>
      </div>

      <div className="rounded-2xl bg-[#0e0420] border border-purple-900/60 p-4 text-left space-y-2 text-xs">
        <div className="flex justify-between py-1 border-b border-purple-950">
          <span className="text-gray-400">Selected Design:</span>
          <span className="font-bold text-white">{selectedDesign.name}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-purple-950">
          <span className="text-gray-400">Original Price:</span>
          <span className="line-through text-gray-400">${packageTotal.toLocaleString()} USD</span>
        </div>
        <div className="flex justify-between py-1 border-b border-purple-950">
          <span className="text-gray-400">5% Discounted Total:</span>
          <span className="font-bold text-yellow-400">${reservationDetails.discountedPrice.toLocaleString()} USD</span>
        </div>
        <div className="flex justify-between py-1 border-b border-purple-950">
          <span className="text-gray-400">Refundable Holding Fee:</span>
          <span className="font-bold text-green-400">$500 USD (Credited)</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-400">Balance on Project Delivery:</span>
          <span className="font-bold text-yellow-400">${reservationDetails.remainingBalance.toLocaleString()} USD</span>
        </div>
      </div>

      <p className="text-xs text-gray-300 leading-relaxed">
        Your selected design has been placed on exclusive 5-day hold. Our technical deployment manager will reach out via Email (<strong className="text-white">{email}</strong>) and WhatsApp (<strong className="text-white">{phone}</strong>) within 2 business hours.
      </p>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/designs"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110"
        >
          <span>Browse More Designs</span>
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-purple-950/60 border border-purple-800/50"
        >
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

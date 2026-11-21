"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, ArrowRight, Lock, Sparkles } from "lucide-react";
import { CasinoDesign } from "@/types";

interface ReservationFlowProps {
  designs: CasinoDesign[];
  initialDesignSlug?: string;
  initialTotal?: number;
  initialAddons?: string;
}

export default function ReservationFlow({
  designs,
  initialDesignSlug = "royal-prestige",
  initialTotal = 15000,
  initialAddons = "",
}: ReservationFlowProps) {
  const [selectedSlug, setSelectedSlug] = useState(initialDesignSlug);
  const [brandName, setBrandName] = useState("");
  const [domainPreference, setDomainPreference] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"details" | "confirmation">("details");

  const selectedDesign = designs.find((d) => d.slug === selectedSlug) || designs[0];
  const reservationFee = 500;
  const packageTotal = initialTotal;
  const balanceRemaining = packageTotal - reservationFee;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  if (step === "confirmation") {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl bg-[#090214] border-2 border-yellow-400 p-8 sm:p-12 text-center space-y-6 shadow-[0_0_50px_rgba(255,215,0,0.35)]">
        <div className="w-16 h-16 rounded-full bg-yellow-400/20 text-yellow-400 mx-auto flex items-center justify-center">
          <Sparkles size={36} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
            Design Reserved Successfully!
          </h2>
          <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
            Booking ID: AIG-RES-{(Math.random() * 90000 + 10000).toFixed(0)}
          </p>
        </div>

        <div className="rounded-2xl bg-[#0e0420] border border-purple-900/60 p-4 text-left space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-purple-950">
            <span className="text-gray-400">Selected Theme:</span>
            <span className="font-bold text-white">{selectedDesign.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-purple-950">
            <span className="text-gray-400">Branded Name:</span>
            <span className="font-bold text-white">{brandName || "To be specified"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-purple-950">
            <span className="text-gray-400">Refundable Holding Fee:</span>
            <span className="font-bold text-green-400">${reservationFee} USD</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-400">Balance on Handover:</span>
            <span className="font-bold text-yellow-400">${balanceRemaining.toLocaleString()} USD</span>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          Your selected design has been placed on exclusive hold for 48 hours. Our technical setup coordinator will reach out to <strong className="text-white">{email}</strong> and <strong className="text-white">{phone}</strong> to verify domain DNS setup and wire transfer instructions.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110"
          >
            <span>Return to Homepage</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleReserve} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
      
      {/* Left Input Fields */}
      <div className="lg:col-span-7 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 space-y-5 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <h2 className="text-lg font-black uppercase tracking-wider text-white">
          1. Brand &amp; Operator Details
        </h2>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Selected Casino Theme
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white focus:outline-none focus:border-yellow-400"
            >
              {designs.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name} ({d.subtitle})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Desired Casino Brand Name *
              </label>
              <input
                required
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Royal VIP Casino"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Target Domain (Optional)
              </label>
              <input
                type="text"
                value={domainPreference}
                onChange={(e) => setDomainPreference(e.target.value)}
                placeholder="e.g. royalvip.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Operator Full Name *
            </label>
            <input
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Smith"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Email Address *
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                WhatsApp / Phone *
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0199"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-black uppercase text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 transition-all"
        >
          <Lock size={14} className="stroke-[2.5]" />
          <span>Confirm $500 Refundable Reservation</span>
        </button>
      </div>

      {/* Right Order Summary */}
      <div className="lg:col-span-5 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 space-y-5 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200">
          Reservation Summary
        </h3>

        <div className="relative w-full aspect-[460/190] rounded-xl overflow-hidden border border-purple-500/40">
          <Image
            src={selectedDesign.image}
            alt={selectedDesign.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-purple-950">
            <span className="text-gray-400">Design Package:</span>
            <span className="font-bold text-white">${packageTotal.toLocaleString()} USD</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-purple-950">
            <span className="text-gray-400">Holding Deposit Due Today:</span>
            <span className="font-bold text-green-400">${reservationFee} USD</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-gray-400">Balance on Setup Completion:</span>
            <span className="font-bold text-yellow-400">${balanceRemaining.toLocaleString()} USD</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1.5 text-[11px] text-gray-300">
          <div className="flex items-center gap-2 text-green-400 font-bold">
            <ShieldCheck size={14} />
            <span>100% Risk-Free Guarantee</span>
          </div>
          <p className="leading-relaxed">
            Your $500 holding deposit is fully refundable within 7 days if you decide not to proceed.
          </p>
        </div>
      </div>

    </form>
  );
}

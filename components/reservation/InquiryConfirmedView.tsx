"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { CasinoDesign } from "@/types";

interface InquiryConfirmedViewProps {
  selectedDesign: CasinoDesign;
  inquiryRef: string;
}

export default function InquiryConfirmedView({
  selectedDesign,
  inquiryRef,
}: InquiryConfirmedViewProps) {
  return (
    <div className="max-w-xl mx-auto rounded-3xl bg-[#090214] border border-purple-800/60 p-8 sm:p-10 text-center space-y-5 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
      <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center">
        <CheckCircle2 size={32} />
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white uppercase">Inquiry Received</h2>
        <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
          Reference Number: {inquiryRef}
        </p>
      </div>

      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
        Your design inquiry for <strong className="text-white">{selectedDesign.name}</strong> has been logged in our enterprise portal. A sales coordinator will contact you to discuss custom options and quote finalization.
      </p>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/designs"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 flex items-center justify-center gap-1.5"
        >
          <span>Explore Other Themes</span>
          <ArrowRight size={13} />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-purple-950/60 border border-purple-800/50"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

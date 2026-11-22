"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CheckCircle2, ArrowRight, Crown } from "lucide-react";
import { CasinoDesign, AddonModule } from "@/types";

interface InquiryConfirmedViewProps {
  selectedDesign: CasinoDesign;
  inquiryRef: string;
  packageTotal?: number;
  selectedModules?: AddonModule[];
}

export default function InquiryConfirmedView({
  selectedDesign,
  inquiryRef,
  packageTotal,
  selectedModules = [],
}: InquiryConfirmedViewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const tween = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 28, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="panel panel-gold relative max-w-xl mx-auto p-8 sm:p-10 text-center space-y-6 overflow-hidden"
    >
      <div className="panel-sheen" aria-hidden="true" />
      <div className="panel-rim" aria-hidden="true" />

      <div className="relative z-10 w-16 h-16 rounded-full border border-emerald-400/55 bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(52,211,153,0.3)]">
        <CheckCircle2 size={34} />
      </div>

      <div className="relative z-10 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#f5c451]/45 bg-[#240942]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffe28a]">
          <Crown size={12} />
          <span>Royal Casino Club VIP Desk</span>
        </div>
        <h2 className="font-philosopher text-3xl font-bold italic uppercase text-white">
          Inquiry <span className="gold-text">Received</span>
        </h2>
        <p className="text-xs font-bold text-[#ffe28a] uppercase tracking-wider font-mono">
          Reference Number: {inquiryRef}
        </p>
      </div>

      <p className="relative z-10 text-xs sm:text-sm text-white/75 leading-relaxed">
        Your design inquiry for <strong className="text-white">{selectedDesign.name}</strong>
        {selectedModules.length > 0 && (
          <>
            {" "}
            with{" "}
            <strong className="text-[#ffe28a]">
              {selectedModules.map((m) => m.name).join(", ")}
            </strong>
          </>
        )}{" "}
        has been logged in our enterprise portal.
        {packageTotal ? (
          <>
            {" "}
            Estimated package total:{" "}
            <strong className="text-white">${packageTotal.toLocaleString()} USD</strong>.
          </>
        ) : null}{" "}
        A launch coordinator will contact you shortly to finalize your quote.
      </p>

      <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/confirmation/submission?ref=${inquiryRef}`}
          className="btn-royal-gold shine w-full sm:w-auto px-6 py-3 text-xs sm:text-sm uppercase tracking-wider"
        >
          <span>View Official Inquiry Receipt</span>
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/designs"
          className="btn btn-neon w-full sm:w-auto text-xs font-semibold"
        >
          <span>Explore Themes</span>
        </Link>
      </div>
    </div>
  );
}

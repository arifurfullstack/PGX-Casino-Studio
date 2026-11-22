"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { CustomerInquiry } from "@/types";
import { SITE_CONFIG } from "@/config/site-config";

interface InquiryConfirmationViewProps {
  inquiry: CustomerInquiry;
}

export default function InquiryConfirmationView({
  inquiry,
}: InquiryConfirmationViewProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello ALL I GAMING, I have submitted an inquiry for ${inquiry.selectedDesignName} under Ref: ${inquiry.referenceNumber}. I'd like to discuss the next steps.`
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/60 border border-yellow-500/40">
          <CheckCircle2 size={13} className="text-[#FFD700]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
            Inquiry Dossier Logged
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
          Inquiry <span className="text-[#FFD700]">Received</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
          Thank you, <strong className="text-white">{inquiry.fullName}</strong>. Your turnkey online casino project specifications have been dispatched to our enterprise solutions team.
        </p>
      </div>

      {/* Main Dossier Summary Card */}
      <div className="rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-10 shadow-[0_0_35px_rgba(168,85,247,0.2)] space-y-8">
        
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-900/50">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              Inquiry Reference Number
            </span>
            <span className="font-mono text-xl sm:text-2xl font-black text-yellow-300">
              {inquiry.referenceNumber}
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              Submission Date
            </span>
            <span className="text-xs text-gray-300">
              {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : "Just now"}
            </span>
          </div>
        </div>

        {/* 2-Column: Customer Details & Selected Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-[#04010a] border border-purple-900/40 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Customer Details
            </span>
            <p className="text-white font-bold text-sm">{inquiry.fullName}</p>
            {inquiry.companyName && <p className="text-purple-300">Company: {inquiry.companyName}</p>}
            <p className="text-gray-300">Email: {inquiry.email}</p>
            <p className="text-gray-300">Phone: {inquiry.phoneNumber}</p>
            {inquiry.whatsappNumber && (
              <p className="text-emerald-400">WhatsApp: {inquiry.whatsappNumber}</p>
            )}
            <p className="text-gray-400 pt-1">
              Intended Launch: <strong className="text-white capitalize">{inquiry.intendedTimeline?.replace(/_/g, " ") || "Immediately"}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#04010a] border border-purple-900/40 space-y-3 text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Requested Platform Setup
            </span>
            <p className="text-white font-bold text-sm">{inquiry.selectedDesignName}</p>
            {inquiry.selectedAddonIds && inquiry.selectedAddonIds.length > 0 ? (
              <div className="text-purple-300">
                <span>Selected Add-ons:</span>
                <ul className="list-disc list-inside mt-1 text-gray-300">
                  {inquiry.selectedAddonIds.map((addon) => (
                    <li key={addon} className="capitalize">{addon.replace(/-/g, " ")}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400">Starter Casino Package ($15,000 USD)</p>
            )}
            <div className="pt-2 border-t border-purple-900/40 flex justify-between items-baseline">
              <span className="text-gray-400">Estimated Total:</span>
              <span className="text-base font-black text-yellow-400">${inquiry.totalPrice.toLocaleString()} USD</span>
            </div>
          </div>
        </div>

        {/* Project Requirements Notes if present */}
        {inquiry.projectRequirements && (
          <div className="p-4 rounded-2xl bg-[#04010a] border border-purple-900/40 text-xs space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Specified Requirements / Scope
            </span>
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              {inquiry.projectRequirements}
            </p>
          </div>
        )}

        {/* Optional 5-Day Reservation Upsell Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-purple-900/40 to-[#120428] border-2 border-[#FFD700] space-y-3 shadow-[0_0_25px_rgba(255,215,0,0.2)]">
          <div className="flex items-center gap-2 text-yellow-400">
            <Sparkles size={16} />
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Optional 5-Day Reservation &amp; 5% Price Guarantee
            </h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Want to lock in exclusive rights to <strong>{inquiry.selectedDesignName}</strong> and secure a guaranteed{" "}
            <strong className="text-[#34d399]">5% discount (saving ${Math.round(inquiry.totalPrice * 0.05).toLocaleString()} USD)</strong>?
            Place a <strong className="text-white">100% refundable $500 holding deposit</strong> valid for 120 hours.
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <Link
              href={`/select-design?design=${inquiry.selectedDesignId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            >
              <span>Lock 5-Day Hold for $500 (Refundable)</span>
              <ArrowRight size={14} />
            </Link>
            <span className="text-[11px] text-gray-400">Credited to final balance upon agreement.</span>
          </div>
        </div>

        {/* Next Steps 3-Item Process */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            What Happens Next?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#04010a] border border-purple-900/40 space-y-1">
              <span className="text-[10px] font-bold text-yellow-400 uppercase">Step 1 • Review</span>
              <p className="text-white font-semibold">Technical Dossier</p>
              <p className="text-[11px] text-gray-400">Our team prepares your modular turnkey architecture breakdown.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#04010a] border border-purple-900/40 space-y-1">
              <span className="text-[10px] font-bold text-yellow-400 uppercase">Step 2 • Outreach</span>
              <p className="text-white font-semibold">Consultation Call</p>
              <p className="text-[11px] text-gray-400">Direct outreach via WhatsApp or Email within 4 business hours.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#04010a] border border-purple-900/40 space-y-1">
              <span className="text-[10px] font-bold text-yellow-400 uppercase">Step 3 • Deployment</span>
              <p className="text-white font-semibold">Turnkey Staging</p>
              <p className="text-[11px] text-gray-400">White-label branding and production launch in 21–30 calendar days.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-900/50">
          <Link
            href="/designs"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Explore other casino themes
          </Link>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <MessageSquare size={15} />
            <span>Chat with Solutions Director</span>
          </a>
        </div>

      </div>
    </div>
  );
}

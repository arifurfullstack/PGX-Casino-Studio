"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CustomerInquiry } from "@/types";
import { SITE_CONFIG } from "@/config/site-config";

interface InquiryConfirmationViewProps {
  inquiry: CustomerInquiry;
}

export default function InquiryConfirmationView({
  inquiry,
}: InquiryConfirmationViewProps) {
  const t = useTranslations("reservation.confirmation");
  const tCommon = useTranslations("common");
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
            {t("inqBadge")}
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
          {t("inqHeadingPrefix")} <span className="text-[#FFD700]">{t("inqHeadingHighlight")}</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
          {t("inqSubtitle", { name: inquiry.fullName })}
        </p>
      </div>

      {/* Main Dossier Summary Card */}
      <div className="rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-10 shadow-[0_0_35px_rgba(168,85,247,0.2)] space-y-8">
        
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-900/50">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              {t("inqRefLabel")}
            </span>
            <span className="font-mono text-xl sm:text-2xl font-black text-yellow-300">
              {inquiry.referenceNumber}
            </span>
          </div>

          <div className="text-start sm:text-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              {t("submissionDate")}
            </span>
            <span className="text-xs text-gray-300">
              {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : t("justNow")}
            </span>
          </div>
        </div>

        {/* 2-Column: Customer Details & Selected Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-[#04010a] border border-purple-900/40 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {t("customerDetails")}
            </span>
            <p className="text-white font-bold text-sm">{inquiry.fullName}</p>
            {inquiry.companyName && <p className="text-purple-300">{t("companyLabel", { company: inquiry.companyName })}</p>}
            <p className="text-gray-300">{t("emailLabel", { email: inquiry.email })}</p>
            <p className="text-gray-300">{t("phoneLabel", { phone: inquiry.phoneNumber })}</p>
            {inquiry.whatsappNumber && (
              <p className="text-emerald-400">{t("whatsappLabel", { wa: inquiry.whatsappNumber })}</p>
            )}
            <p className="text-gray-400 pt-1">
              {t("intendedLaunch")} <strong className="text-white capitalize">{inquiry.intendedTimeline?.replace(/_/g, " ") || "Immediately"}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#04010a] border border-purple-900/40 space-y-3 text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {t("requestedSetup")}
            </span>
            <p className="text-white font-bold text-sm">{inquiry.selectedDesignName}</p>
            {inquiry.selectedAddonIds && inquiry.selectedAddonIds.length > 0 ? (
              <div className="text-purple-300">
                <span>{t("selectedAddons")}</span>
                <ul className="list-disc list-inside mt-1 text-gray-300">
                  {inquiry.selectedAddonIds.map((addon) => (
                    <li key={addon} className="capitalize">{addon.replace(/-/g, " ")}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400">{t("starterPackageDefault")}</p>
            )}
            <div className="pt-2 border-t border-purple-900/40 flex justify-between items-baseline">
              <span className="text-gray-400">{t("estimatedTotal")}</span>
              <span className="text-base font-black text-yellow-400">${inquiry.totalPrice.toLocaleString()} {tCommon("usd")}</span>
            </div>
          </div>
        </div>

        {/* Project Requirements Notes if present */}
        {inquiry.projectRequirements && (
          <div className="p-4 rounded-2xl bg-[#04010a] border border-purple-900/40 text-xs space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {t("specifiedRequirements")}
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
              {t("upsellTitle")}
            </h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {t("upsellBody", {
              design: inquiry.selectedDesignName,
              savings: Math.round(inquiry.totalPrice * 0.1).toLocaleString(),
            })}
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <Link
              href={`/select-design?design=${inquiry.selectedDesignId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            >
              <span>{t("upsellCta")}</span>
              <ArrowRight size={14} className="rtl-flip" />
            </Link>
            <span className="text-[11px] text-gray-400">{t("upsellCredited")}</span>
          </div>
        </div>

        {/* Next Steps 3-Item Process */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            {t("whatNext")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#04010a] border border-purple-900/40 space-y-1">
              <span className="text-[10px] font-bold text-yellow-400 uppercase">{t("step1Tag")}</span>
              <p className="text-white font-semibold">{t("step1Title")}</p>
              <p className="text-[11px] text-gray-400">{t("step1Desc")}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#04010a] border border-purple-900/40 space-y-1">
              <span className="text-[10px] font-bold text-yellow-400 uppercase">{t("step2Tag")}</span>
              <p className="text-white font-semibold">{t("step2Title")}</p>
              <p className="text-[11px] text-gray-400">{t("step2Desc")}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#04010a] border border-purple-900/40 space-y-1">
              <span className="text-[10px] font-bold text-yellow-400 uppercase">{t("step3Tag")}</span>
              <p className="text-white font-semibold">{t("step3Title")}</p>
              <p className="text-[11px] text-gray-400">{t("step3Desc")}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-900/50">
          <Link
            href="/designs"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            {t("browseMore")}
          </Link>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <MessageSquare size={15} />
            <span>{t("chatWhatsapp")}</span>
          </a>
        </div>

      </div>
    </div>
  );
}

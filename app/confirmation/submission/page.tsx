import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getInquiryByReferenceNumber } from "@/services/inquiryService";
import InquiryConfirmationView from "@/components/confirmation/InquiryConfirmationView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inquiry Submitted",
  description:
    "Official submission receipt for your Royal Casino Club turnkey online casino platform quotation.",
};

interface InquiryConfirmationPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function InquiryConfirmationPage({
  searchParams,
}: InquiryConfirmationPageProps) {
  const params = await searchParams;
  const ref = params.ref;

  const [inquiry, t] = await Promise.all([
    ref ? getInquiryByReferenceNumber(ref) : Promise.resolve(null),
    getTranslations("reservation.confirmation"),
  ]);

  if (!inquiry) {
    return (
      <main className="min-h-screen pt-16 pb-24 bg-[#04010a] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl bg-[#090214] border border-purple-900/60 p-8 text-center space-y-4 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
          <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 mx-auto flex items-center justify-center">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-xl font-black text-white">{t("inquiryNotFoundTitle")}</h1>
          <p className="text-xs text-gray-400">
            {t("inquiryNotFoundBody", { ref: ref || "None" })}
          </p>
          <div className="pt-2">
            <Link
              href="/designs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            >
              <span>{t("exploreThemes")}</span>
              <ArrowRight size={14} className="rtl-flip" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-24 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InquiryConfirmationView inquiry={inquiry} />
      </div>
    </main>
  );
}

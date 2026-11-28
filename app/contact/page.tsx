import { Crown, Mail, Phone, Send, MessageSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/config/site-config";
import ContactForm from "@/components/contact/ContactForm";
import { getAllActiveDesigns } from "@/services/casinoService";

export const metadata = {
  title: "Contact Us & Request a Quote",
  description:
    "Request a custom turnkey online casino quote from Royal Casino Club. 24/7 B2B consultations via WhatsApp, Telegram, or email.",
};

interface ContactPageProps {
  searchParams: Promise<{ design?: string; module?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [{ design, module }, activeDesigns, t] = await Promise.all([
    searchParams,
    getAllActiveDesigns(),
    getTranslations("pages.contact"),
  ]);
  const designOptions = activeDesigns.map((d) => ({ id: d.slug, name: d.name }));

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              {t("badge")}
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            {t("headingPrefix")} <span className="text-[#FFD700]">{t("headingHighlight")}</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 2-Column: Form & Direct Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Form */}
          <div className="lg:col-span-8">
            <ContactForm
              initialDesign={design}
              initialModule={module}
              designs={designOptions}
            />
          </div>

          {/* Right Direct Channels */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-[#090214] border border-purple-900/60 p-6 space-y-6 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                {t("directChannels")}
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-[11px]">{t("emailInquiries")}</p>
                    <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-white hover:text-yellow-400 transition-colors font-medium">
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-[11px]">{t("whatsappBusiness")}</p>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:text-yellow-400 transition-colors font-medium"
                    >
                      {SITE_CONFIG.contact.whatsapp}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Send size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-[11px]">{t("telegramOfficial")}</p>
                    <span className="text-white font-medium">{SITE_CONFIG.contact.telegram}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MessageSquare size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-[11px]">{t("supportAvailability")}</p>
                    <span className="text-white font-medium">{t("supportHours")}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-950/40 to-[#0e0320] border border-purple-500/30 p-5 space-y-2 text-xs text-gray-300">
              <p className="font-bold text-yellow-400 uppercase tracking-wider">{t("depositTitle")}</p>
              <p className="leading-relaxed">
                {t("depositBody")}
              </p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

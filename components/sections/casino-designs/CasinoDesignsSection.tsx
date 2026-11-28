"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { CasinoDesign } from "@/types";
import { DEFAULT_CASINO_DESIGNS } from "@/config/default-designs";
import { resolveShowcaseImage } from "./CasinoDesignCard";
import WebsiteDemoModal from "@/components/designs/WebsiteDemoModal";

interface CasinoDesignsSectionProps {
  designs?: CasinoDesign[];
}

export default function CasinoDesignsSection({
  designs,
}: CasinoDesignsSectionProps) {
  const t = useTranslations("home.designsSection");
  const tCommon = useTranslations("common");
  const [activeDemoDesign, setActiveDemoDesign] = useState<CasinoDesign | null>(
    null
  );

  // Display up to 8 active designs from MongoDB (with graceful fallback)
  const featuredDesigns = useMemo(() => {
    const source = designs && designs.length > 0 ? designs : DEFAULT_CASINO_DESIGNS;
    return source.slice(0, 8);
  }, [designs]);

  const getSelectLink = (slug: string) => `/select-design?design=${slug}`;

  return (
    <section id="designs" className="py-10 sm:py-14 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              {t("headingPrefix")} <span className="gold-text">{t("headingHighlight")}</span>
            </span>
          </h2>

          <Link href="/designs" className="btn btn-gold mx-auto mt-6">
            <span>{t("viewAll")}</span>
            <ArrowRight className="h-4 w-4 rtl-flip" />
          </Link>
        </div>

        {/* 2 Rows × 4 Featured High-Resolution Casino Design Cards */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDesigns.map((design) => {
            const cardImage = resolveShowcaseImage(design);
            const pageCount = design.previewImages?.length || 0;

            return (
              <div
                key={design.id || design.slug}
                className="group panel panel-gold panel-interactive overflow-hidden hover:-translate-y-1.5"
              >
                <div className="panel-sheen z-20" aria-hidden="true" />
                <div className="panel-rim z-20" aria-hidden="true" />

                <div
                  onClick={() => setActiveDemoDesign(design)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveDemoDesign(design);
                    }
                  }}
                  aria-label={`Open interactive demo of ${design.name}`}
                  className="relative aspect-[3/2] w-full overflow-hidden bg-[#150726] cursor-pointer"
                >
                  <Image
                    src={cardImage}
                    alt={`${design.name} design`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#150726] via-[#150726]/45 to-transparent pointer-events-none" />
                  {pageCount > 1 && (
                    <span className="absolute top-3 right-3 z-20 rounded-full border border-[#f5c451]/45 bg-[#120424]/85 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ffe28a] backdrop-blur-md">
                      {tCommon("pagesCount", { count: pageCount })}
                    </span>
                  )}
                </div>

                <h3 className="relative z-10 px-4 pt-4 text-center text-xl xl:text-2xl font-bold text-white font-philosopher transition-colors duration-500 group-hover:text-[#ffe28a]">
                  {design.name}
                </h3>

                <div className="relative z-10 flex items-center justify-center gap-2.5 px-4 pb-5 pt-3.5">
                  <button
                    type="button"
                    onClick={() => setActiveDemoDesign(design)}
                    className="btn btn-neon btn-sm !px-3.5 xl:!px-4 text-xs xl:text-sm font-semibold cursor-pointer"
                  >
                    <span>{t("viewDemo")}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    href={getSelectLink(design.slug)}
                    className="btn btn-gold btn-sm !px-3.5 xl:!px-4 text-xs xl:text-sm font-bold"
                  >
                    <span>{t("selectDesign")}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive Protected Website Demo Popup Modal */}
      <WebsiteDemoModal
        design={activeDemoDesign}
        onClose={() => setActiveDemoDesign(null)}
      />
    </section>
  );
}

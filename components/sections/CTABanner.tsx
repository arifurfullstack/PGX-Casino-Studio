"use client";

import Image from "next/image";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTABanner() {
  const t = useTranslations("home.ctaBanner");

  return (
    <section className="pb-16 pt-8 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="panel flex flex-col items-center gap-5 px-6 py-6 text-center lg:flex-row lg:gap-10 lg:px-10 lg:py-6 lg:text-start">
          <div className="relative h-auto w-56 shrink-0">
            <Image
              src="/images/cta-art.jpg"
              alt="Royal Casino Club Aces & Chips"
              width={452}
              height={212}
              className="h-auto w-56 shrink-0 mix-blend-lighten"
              style={{
                maskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
              }}
            />
          </div>

          <div className="flex-1">
            <h2 className="font-bold uppercase italic leading-none font-philosopher">
              <span className="silver-text block text-[clamp(1.3rem,3vw,1.7rem)]">
                {t("line1")}
              </span>
              <span className="gold-text mt-1.5 block text-[clamp(1.9rem,5vw,2.9rem)]">
                {t("line2")}
              </span>
            </h2>
            <p className="mt-2 text-white/80 text-sm sm:text-base italic">
              {t("subtitle")}
            </p>
          </div>

          <Link
            href="/select-design"
            className="btn btn-gold shine shrink-0 !min-h-[58px] !px-7 text-lg sm:text-xl font-bold flex items-center gap-2.5 shadow-xl"
          >
            <Crown className="h-6 w-6 fill-current" />
            <span>{t("cta")}</span>
            <ArrowRight className="h-5 w-5 rtl-flip" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Crown, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/config/site-config";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import BrandLogo from "./BrandLogo";
import MobileNav from "./MobileNav";

const NAV_KEY_BY_HREF: Record<string, string> = {
  "/": "home",
  "/designs": "designs",
  "/packages": "packages",
  "/modules": "modules",
  "/how-it-works": "howItWorks",
  "/Royal-Casino-Club-Proposal.pdf": "proposal",
  "/about": "about",
  "/contact": "contact",
};

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) return null;
  const isDemoPage = pathname.startsWith("/designs/") && pathname !== "/designs";
  const isHome = pathname === "/";

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        isHome ? "fixed top-0 left-0 right-0" : "sticky top-0 w-full"
      } ${
        isScrolled || !isHome
          ? "bg-[#060112]/92 border-b border-purple-900/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.85)] py-2"
          : "bg-transparent border-b border-transparent pt-3 pb-2"
      }`}
    >
      <div className="max-w-[1672px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 flex items-center justify-between gap-3">
        {/* Brand Logo - Royal Casino Club */}
        <BrandLogo sizeClassName="w-20 sm:w-24 lg:w-[104px] xl:w-[115px] shrink-0" priority />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-7 text-[12.5px] xl:text-[13.5px] 2xl:text-[14.5px] font-semibold min-w-0">
          {SITE_CONFIG.navItems.map((item) => {
            const navKey = NAV_KEY_BY_HREF[item.href];
            const label = navKey ? t(`links.${navKey}`) : item.label;
            const isActive =
              !item.external &&
              (item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href));

            const linkClass = `relative py-1.5 whitespace-nowrap transition-colors duration-200 tracking-wide ${
              isActive
                ? "text-[#FFD700] font-bold drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]"
                : "text-white/95 hover:text-[#FFD700]"
            }`;

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <span>{label}</span>
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass}
              >
                <span>{label}</span>
                {isActive && <span className="gold-lens-flare" />}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Action Buttons & Mobile Nav */}
        <div className="flex items-center gap-2 xl:gap-3 relative z-10 shrink-0">
          <LanguageSwitcher variant="desktop" />

          <Link
            href="/portal"
            className="group/portal hidden lg:inline-flex btn-nav-portal !px-3.5 xl:!px-5 text-[12.5px] xl:text-[13.5px] whitespace-nowrap"
            title={t("portalTitle")}
          >
            <UserRound
              size={15}
              strokeWidth={1.85}
              className="text-[#f5c451] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/portal:scale-110"
            />
            <span>{t("clientPortal")}</span>
          </Link>

          {isDemoPage ? (
            <Link
              href="/designs"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-200 hover:text-white bg-purple-950/70 hover:bg-purple-900 rounded-full border border-purple-500/50 transition-all shadow-[0_0_12px_rgba(168,85,247,0.25)] whitespace-nowrap"
            >
              <ArrowLeft size={13} className="rtl-flip" />
              <span>{t("backToDesigns")}</span>
            </Link>
          ) : (
            <Link
              href="/select-design"
              className="group/cta hidden lg:inline-flex btn-nav-gold !px-3.5 xl:!px-5 text-[12.5px] xl:text-[13.5px] whitespace-nowrap"
            >
              <Crown
                size={15}
                className="fill-[#261100] text-[#261100] stroke-[1.75] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:scale-110"
              />
              <span>{t("reserveCasino")}</span>
              <ArrowRight
                size={15}
                strokeWidth={2.2}
                className="text-[#261100] rtl-flip transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0.5"
              />
            </Link>
          )}

          <MobileNav items={SITE_CONFIG.navItems} />
        </div>
      </div>
    </header>
  );
}

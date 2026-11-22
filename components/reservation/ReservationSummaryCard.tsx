"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ShieldCheck,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
  Crown,
  Clock,
  Globe,
  MessageCircle,
  Layers,
  Percent,
} from "lucide-react";
import {
  CasinoDesign,
  AddonModule,
  PricingConfig,
  StarterPackage,
} from "@/types";
import { SITE_CONFIG } from "@/config/site-config";

interface ReservationSummaryCardProps {
  selectedDesign: CasinoDesign;
  selectedModules: AddonModule[];
  onRemoveAddon: (addonId: string) => void;
  starterPackage: StarterPackage;
  pricingConfig: PricingConfig;
  packageTotal: number;
  brandName: string;
  domainPreference: string;
  previewMode: "hold" | "standard";
  onPreviewModeChange: (mode: "hold" | "standard") => void;
}

function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const valRef = useRef({ value: target });

  useEffect(() => {
    const tween = gsap.to(valRef.current, {
      value: target,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        setDisplay(Math.round(valRef.current.value));
      },
    });
    return () => {
      tween.kill();
    };
  }, [target]);

  return display;
}

export default function ReservationSummaryCard({
  selectedDesign,
  selectedModules,
  onRemoveAddon,
  starterPackage,
  pricingConfig,
  packageTotal,
  brandName,
  domainPreference,
  previewMode,
  onPreviewModeChange,
}: ReservationSummaryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);
  const [slideSelection, setSlideSelection] = useState<{ slug: string; idx: number }>({
    slug: selectedDesign.slug,
    idx: 0,
  });
  const [showIncluded, setShowIncluded] = useState(false);

  const activeImageIdx =
    slideSelection.slug === selectedDesign.slug ? slideSelection.idx : 0;

  const previewSlides = [
    { id: "hero", title: "Theme Showcase", url: selectedDesign.image },
    ...(selectedDesign.previewImages || []).filter(
      (img) => img.url && img.url !== selectedDesign.image
    ),
  ];

  // Smooth GSAP transition when switching design or gallery view
  useEffect(() => {
    if (!previewWrapRef.current) return;
    const tween = gsap.fromTo(
      previewWrapRef.current,
      { opacity: 0.4, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, [selectedDesign.slug, activeImageIdx]);

  const activeSlide = previewSlides[activeImageIdx] || previewSlides[0];

  const discountPercent = pricingConfig.reservationDiscountPercent;
  const reservationFee = pricingConfig.reservationFee;
  const holdDays = Math.max(1, Math.round(pricingConfig.reservationDurationHours / 24));
  const discountAmount = Math.round((packageTotal * discountPercent) / 100);
  const discountedTotal = packageTotal - discountAmount;
  const remainingBalance = Math.max(0, discountedTotal - reservationFee);

  const animatedTotal = useAnimatedNumber(packageTotal);
  const animatedDiscount = useAnimatedNumber(discountAmount);
  const animatedDiscounted = useAnimatedNumber(discountedTotal);
  const animatedBalance = useAnimatedNumber(remainingBalance);

  const cleanDomain = domainPreference
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "");

  const whatsappSummary = `Hi Royal Casino Club! I'm configuring my turnkey casino:\n• Theme: ${selectedDesign.name}${
    brandName ? `\n• Brand: ${brandName}` : ""
  }${cleanDomain ? `\n• Target Domain: ${cleanDomain}` : ""}${
    selectedModules.length > 0
      ? `\n• Add-Ons: ${selectedModules.map((m) => m.name).join(", ")}`
      : "\n• Package: Starter Turnkey Package"
  }\n• Standard Total: $${packageTotal.toLocaleString()} USD (${discountPercent}% hold lock: $${discountedTotal.toLocaleString()} USD)`;

  const whatsappHref = `${SITE_CONFIG.contact.whatsappLink}?text=${encodeURIComponent(
    whatsappSummary
  )}`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    gsap.to(card, {
      rotateY: relX * 3.2,
      rotateX: -relY * 2.6,
      transformPerspective: 1200,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
      {/* Main Sticky Luxury Summary Panel */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="js-res-summary-reveal panel panel-gold panel-interactive relative overflow-hidden p-5 sm:p-7 space-y-5 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="panel-sheen z-20" aria-hidden="true" />
        <div className="panel-rim z-20" aria-hidden="true" />

        {/* Subtle Top Header */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#f5c451]/60 bg-[#2a0a4a] shadow-[0_0_16px_rgba(245,196,81,0.28)]">
              <Crown className="h-4 w-4 text-[#ffd75e] fill-[#ffd75e]/20" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5c451]">
                Live Platform Blueprint
              </p>
              <h3 className="font-philosopher text-lg sm:text-xl font-bold italic text-white leading-tight">
                {selectedDesign.name}
              </h3>
            </div>
          </div>

          <Link
            href={`/designs/${selectedDesign.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neon btn-sm !px-3 !py-1.5 text-[11px] font-semibold shrink-0"
          >
            <span>Live Demo</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        {/* Live Branded Visual Stage */}
        <div className="relative z-10 space-y-2.5">
          <div
            ref={previewWrapRef}
            className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden border bg-[#120424] theme-card-${selectedDesign.slug}`}
          >
            <Image
              src={activeSlide.url}
              alt={`${selectedDesign.name} — ${activeSlide.title}`}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            {/* Vignette Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090214]/90 via-transparent to-[#090214]/35" />

            {/* Live Brand Identity Overlay Badge (updates dynamically as operator types) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f5c451]/55 bg-[#120424]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ffe7a3] backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffd75e] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ffd75e]" />
                </span>
                {brandName.trim() ? brandName.trim() : "Your Brand Preview"}
              </span>

              {cleanDomain && (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-400/40 bg-[#120424]/85 px-2.5 py-1 text-[10px] font-medium text-purple-200 backdrop-blur-md truncate max-w-[160px]">
                  <Globe className="h-3 w-3 text-[#f5c451] shrink-0" />
                  <span className="truncate">{cleanDomain}</span>
                </span>
              )}
            </div>

            {/* Bottom Caption Strip */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-[11px] font-medium text-white/75 line-clamp-1">
                  {selectedDesign.subtitle || "Turnkey Luxury Online Casino Theme"}
                </p>
              </div>
              <span className="rounded-md bg-black/60 border border-white/15 px-2 py-0.5 text-[10px] font-semibold text-white/80 backdrop-blur-sm shrink-0">
                {activeSlide.title}
              </span>
            </div>
          </div>

          {/* Multi-View Gallery Switcher if Preview Images Exist */}
          {previewSlides.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {previewSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() =>
                    setSlideSelection({ slug: selectedDesign.slug, idx })
                  }
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border whitespace-nowrap ${
                    idx === activeImageIdx
                      ? "border-[#f5c451] bg-[#f5c451]/15 text-[#ffe28a] shadow-[0_0_12px_rgba(245,196,81,0.25)]"
                      : "border-purple-500/25 bg-[#120424]/70 text-white/65 hover:text-white hover:border-purple-400/50"
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Pricing Comparison Toggle (Hold Lock vs Standard) */}
        <div className="relative z-10 rounded-2xl border border-purple-400/25 bg-[#0e031d]/80 p-1.5 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => onPreviewModeChange("hold")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition-all ${
              previewMode === "hold"
                ? "bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100] shadow-[0_0_18px_rgba(245,196,81,0.45)]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Percent className="h-3.5 w-3.5" />
            <span>{discountPercent}% Off Hold Lock</span>
          </button>
          <button
            type="button"
            onClick={() => onPreviewModeChange("standard")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition-all ${
              previewMode === "standard"
                ? "bg-purple-600/40 border border-purple-400/60 text-white shadow-[0_0_14px_rgba(168,85,247,0.35)]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Standard Inquiry</span>
          </button>
        </div>

        {/* Live Animated Pricing Breakdown */}
        <div className="relative z-10 space-y-2.5 text-xs sm:text-[13px]">
          <div className="flex items-center justify-between py-1.5 border-b border-purple-500/20">
            <span className="text-white/70">Starter Turnkey Platform</span>
            <span className="font-bold text-white tabular-nums">
              ${pricingConfig.starterPackagePrice.toLocaleString()} USD
            </span>
          </div>

          {/* Selected Add-On Modules List with Quick Remove */}
          {selectedModules.length > 0 && (
            <div className="space-y-1.5 py-1.5 border-b border-purple-500/20">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold text-[#f5c451]">
                <span>Selected Add-On Modules ({selectedModules.length})</span>
                <span className="tabular-nums">
                  +${selectedModules.reduce((s, m) => s + m.price, 0).toLocaleString()} USD
                </span>
              </div>
              <div className="space-y-1.5 pt-1">
                {selectedModules.map((mod) => (
                  <div
                    key={mod.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-purple-500/25 bg-[#17062d]/75 px-3 py-1.5"
                  >
                    <span className="text-white/90 font-medium truncate">
                      {mod.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-[#ffe28a] tabular-nums">
                        +${mod.price.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveAddon(mod.id)}
                        title={`Remove ${mod.name}`}
                        className="rounded-full p-0.5 text-white/45 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-1.5 border-b border-purple-500/20">
            <span className="text-white/70">Standard Package Price</span>
            <span
              className={`font-bold tabular-nums ${
                previewMode === "hold"
                  ? "line-through text-white/45"
                  : "text-white text-base"
              }`}
            >
              ${animatedTotal.toLocaleString()} USD
            </span>
          </div>

          {previewMode === "hold" ? (
            <>
              <div className="flex items-center justify-between py-1 text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{discountPercent}% Reservation Savings</span>
                </span>
                <span className="tabular-nums">
                  -${animatedDiscount.toLocaleString()} USD
                </span>
              </div>

              <div className="rounded-2xl border border-[#f5c451]/45 bg-gradient-to-br from-[#2a0a4a]/80 via-[#1a0533]/85 to-[#120324]/90 p-4 space-y-3 shadow-[0_0_24px_rgba(245,196,81,0.14)]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                    Locked Package Total
                  </span>
                  <span className="font-philosopher text-2xl sm:text-[1.75rem] font-bold italic gold-text tabular-nums">
                    ${animatedDiscounted.toLocaleString()}{" "}
                    <span className="text-xs font-sans not-italic text-white/80">USD</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10 text-[11px]">
                  <div className="rounded-xl bg-[#0b0317]/75 border border-emerald-400/30 p-2.5">
                    <p className="text-white/60 uppercase text-[10px] tracking-wider">
                      Refundable Hold
                    </p>
                    <p className="mt-0.5 text-sm font-black text-emerald-400 tabular-nums">
                      ${reservationFee.toLocaleString()} USD
                    </p>
                    <p className="text-[10px] text-white/50">100% Credited</p>
                  </div>

                  <div className="rounded-xl bg-[#0b0317]/75 border border-[#f5c451]/30 p-2.5">
                    <p className="text-white/60 uppercase text-[10px] tracking-wider">
                      On Handover
                    </p>
                    <p className="mt-0.5 text-sm font-black text-[#ffe28a] tabular-nums">
                      ${animatedBalance.toLocaleString()} USD
                    </p>
                    <p className="text-[10px] text-white/50">
                      {pricingConfig.ggrOperatorShare}% GGR Yours
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-purple-400/30 bg-[#140529]/80 p-4 space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/75">
                  Standard Quote Total
                </span>
                <span className="font-philosopher text-2xl font-bold italic text-white tabular-nums">
                  ${animatedTotal.toLocaleString()}{" "}
                  <span className="text-xs font-sans not-italic text-white/70">USD</span>
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Submit with $0 upfront to receive a custom proposal, or unlock{" "}
                <strong className="text-emerald-400">
                  -${animatedDiscount.toLocaleString()} USD ({discountPercent}% off)
                </strong>{" "}
                on the next step with a refundable ${reservationFee} hold.
              </p>
            </div>
          )}
        </div>

        {/* Collapsible Starter Package Includes Drawer */}
        <div className="relative z-10 rounded-2xl border border-purple-500/25 bg-[#120424]/70 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowIncluded((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#ffe28a] hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#f5c451]" />
              <span>Included In Base Package ({starterPackage.includes.length})</span>
            </span>
            <span className="text-[11px] text-white/60">
              {showIncluded ? "Hide" : "View"}
            </span>
          </button>

          {showIncluded && (
            <ul className="px-4 pb-3.5 pt-1 space-y-2 border-t border-purple-500/20 text-xs">
              {starterPackage.includes.map((item) => (
                <li key={item.title} className="flex items-start gap-2 text-white/85">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#f5c451] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-white">{item.title}</strong>
                    {item.sub && (
                      <span className="block text-[11px] text-white/55">{item.sub}</span>
                    )}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-emerald-300/90 pt-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Operator GGR Split:{" "}
                  <strong>
                    {pricingConfig.ggrOperatorShare}% Profit Yours /{" "}
                    {pricingConfig.ggrCompanyShare}% Platform
                  </strong>
                </span>
              </li>
            </ul>
          )}
        </div>

        {/* 100% Risk-Free Guarantee Strip */}
        <div className="relative z-10 rounded-2xl border border-emerald-400/25 bg-emerald-950/20 p-3.5 space-y-1.5 text-[11.5px] text-white/75">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>100% Risk-Free Holding Guarantee</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#ffe28a]">
              <Clock className="h-3 w-3" />
              {holdDays}-Day Lock
            </span>
          </div>
          <p className="leading-relaxed">
            Reserving unlocks {discountPercent}% off the entire package and protects{" "}
            <strong className="text-white">{selectedDesign.name}</strong> for{" "}
            {pricingConfig.reservationDurationHours} hours. Holding fee is 100% refundable.
          </p>
        </div>

        {/* Direct WhatsApp Concierge Quick-Share */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 group/wa flex items-center justify-between gap-3 rounded-2xl border border-purple-400/30 bg-[#17052c]/80 px-4 py-3 text-xs transition-all duration-300 hover:border-[#f5c451]/70 hover:bg-[#230942]/85 hover:shadow-[0_0_22px_rgba(245,196,81,0.18)]"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-[#f5c451]/40 bg-[#2a0a4a] text-[#f5c451]">
              <MessageCircle className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block font-bold text-white group-hover/wa:text-[#ffe28a] transition-colors">
                Need Custom Quote or Live Walkthrough?
              </span>
              <span className="block text-[11px] text-white/60 truncate">
                Share this exact {selectedDesign.name} build on WhatsApp
              </span>
            </span>
          </span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/45 group-hover/wa:text-[#f5c451]" />
        </a>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Sparkles,
  Crown,
  X,
  LayoutGrid,
  Columns2,
  ArrowUpDown,
  ExternalLink,
  ArrowRight,
  Scale,
  ShieldCheck,
  Clock,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CasinoDesign, PricingConfig } from "@/types";
import { DEFAULT_PRICING_CONFIG } from "@/config/default-package";
import { SITE_CONFIG } from "@/config/site-config";
import CasinoDesignCard, {
  resolveShowcaseImage,
} from "@/components/sections/casino-designs/CasinoDesignCard";
import WebsiteDemoModal from "@/components/designs/WebsiteDemoModal";

interface DesignsCatalogProps {
  initialDesigns: CasinoDesign[];
  pricingConfig?: PricingConfig;
  initialCategory?: string;
  initialQuery?: string;
}

const CATEGORIES = ["All", "Luxury", "Neon", "VIP", "Classic", "Futuristic"] as const;
type CategoryName = (typeof CATEGORIES)[number];
type SortOption = "featured" | "name_asc" | "name_desc";

const AMBIENT_ORBS = [
  { left: "5%", top: "10%", size: 6, color: "rgba(255, 224, 130, 0.9)" },
  { left: "18%", top: "55%", size: 5, color: "rgba(232, 121, 249, 0.85)" },
  { left: "48%", top: "6%", size: 7, color: "rgba(245, 196, 81, 0.85)" },
  { left: "88%", top: "14%", size: 6, color: "rgba(255, 215, 94, 0.95)" },
  { left: "93%", top: "62%", size: 5, color: "rgba(217, 70, 239, 0.85)" },
  { left: "66%", top: "90%", size: 6, color: "rgba(255, 232, 150, 0.85)" },
];

function getDesignCategories(design: CasinoDesign): CategoryName[] {
  const matched = new Set<CategoryName>();
  const slug = design.slug.toLowerCase();
  const tags = (design.tags || []).map((t) => t.toLowerCase());

  if (
    slug.includes("royal") ||
    slug.includes("prestige") ||
    slug.includes("diamond") ||
    tags.includes("luxury")
  ) {
    matched.add("Luxury");
  }
  if (
    slug.includes("neon") ||
    slug.includes("cosmic") ||
    slug.includes("lucky") ||
    tags.includes("neon")
  ) {
    matched.add("Neon");
  }
  if (
    slug.includes("emerald") ||
    slug.includes("elite") ||
    slug.includes("ruby") ||
    tags.includes("vip")
  ) {
    matched.add("VIP");
  }
  if (
    slug.includes("crown") ||
    slug.includes("lucky") ||
    slug.includes("gold") ||
    tags.includes("classic")
  ) {
    matched.add("Classic");
  }
  if (
    slug.includes("cosmic") ||
    slug.includes("mystic") ||
    slug.includes("ocean") ||
    tags.includes("futuristic")
  ) {
    matched.add("Futuristic");
  }

  if (matched.size === 0) matched.add("Luxury");
  return Array.from(matched);
}

export default function DesignsCatalog({
  initialDesigns,
  pricingConfig = DEFAULT_PRICING_CONFIG,
  initialCategory,
  initialQuery = "",
}: DesignsCatalogProps) {
  const t = useTranslations("designs.catalog");
  const tCommon = useTranslations("common");
  const validInitialCat: CategoryName = CATEGORIES.includes(
    initialCategory as CategoryName
  )
    ? (initialCategory as CategoryName)
    : "All";

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName>(validInitialCat);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "showcase">("grid");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickPreviewDesign, setQuickPreviewDesign] =
    useState<CasinoDesign | null>(null);
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);
  const [demoModalDesign, setDemoModalDesign] = useState<CasinoDesign | null>(null);

  // GSAP Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const floatingPropRef = useRef<HTMLDivElement>(null);
  const previewModalRef = useRef<HTMLDivElement>(null);
  const compareModalRef = useRef<HTMLDivElement>(null);
  const isFirstFilterRender = useRef(true);

  // Live category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryName, number> = {
      All: initialDesigns.length,
      Luxury: 0,
      Neon: 0,
      VIP: 0,
      Classic: 0,
      Futuristic: 0,
    };
    initialDesigns.forEach((d) => {
      getDesignCategories(d).forEach((cat) => {
        counts[cat] += 1;
      });
    });
    return counts;
  }, [initialDesigns]);

  // Filtered + sorted designs
  const filteredDesigns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = initialDesigns.filter((d) => {
      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        (d.subtitle || "").toLowerCase().includes(q) ||
        (d.tags || []).some((t) => t.toLowerCase().includes(q));

      if (!matchesSearch) return false;
      if (selectedCategory === "All") return true;
      return getDesignCategories(d).includes(selectedCategory);
    });

    if (sortBy === "name_asc") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "name_desc") {
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    }
    return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [initialDesigns, selectedCategory, searchQuery, sortBy]);

  const comparedDesigns = useMemo(
    () =>
      compareSlugs
        .map((slug) => initialDesigns.find((d) => d.slug === slug))
        .filter((d): d is CasinoDesign => Boolean(d)),
    [compareSlugs, initialDesigns]
  );

  // Dynamic URL Sync for shareable filter states
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}`
    );
  }, [selectedCategory, searchQuery]);

  // Master GSAP Entrance, Ambient Motion & 60fps Cursor Spotlight
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stage = stageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".js-designs-hero", {
          opacity: 0,
          y: 28,
          duration: 0.78,
          stagger: 0.08,
        })
          .from(
            ".js-designs-stat",
            {
              opacity: 0,
              y: 16,
              scale: 0.95,
              duration: 0.55,
              stagger: 0.07,
            },
            "-=0.45"
          )
          .from(
            ".js-designs-toolbar",
            {
              opacity: 0,
              y: 22,
              duration: 0.65,
            },
            "-=0.35"
          )
          .from(
            ".js-catalog-card",
            {
              opacity: 0,
              y: 34,
              scale: 0.95,
              duration: 0.65,
              stagger: { amount: 0.45, from: "start" },
            },
            "-=0.35"
          );

        /* Ambient Stardust Orbs */
        gsap.utils.toArray<HTMLElement>(".js-designs-orb").forEach((orb, i) => {
          gsap.to(orb, {
            y: i % 2 === 0 ? -16 : 16,
            x: i % 3 === 0 ? 12 : -10,
            opacity: 0.35,
            scale: 1.4,
            duration: 3 + (i % 4) * 0.65,
            delay: i * 0.22,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        /* Floating Luxury Prop */
        if (floatingPropRef.current) {
          gsap.to(floatingPropRef.current, {
            y: -10,
            rotation: -2.5,
            duration: 3.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        /* 60fps Interactive Cursor Spotlight */
        const spotX = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "x", {
              duration: 0.45,
              ease: "power2.out",
            })
          : null;
        const spotY = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "y", {
              duration: 0.45,
              ease: "power2.out",
            })
          : null;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          if (spotX && spotY) {
            spotX(e.clientX - rect.left - 280);
            spotY(e.clientY - rect.top - 280);
          }
        };

        stage.addEventListener("mousemove", handleMouseMove);
        return () => {
          stage.removeEventListener("mousemove", handleMouseMove);
        };
      }, stage);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // GSAP Smooth Staggered Re-Entrance on Filter / Sort / View Mode Change
  useEffect(() => {
    if (isFirstFilterRender.current) {
      isFirstFilterRender.current = false;
      return;
    }
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".js-catalog-card");
    if (!cards.length) return;

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 22, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: { amount: 0.25, from: "start" },
        ease: "power2.out",
        overwrite: "auto",
      }
    );
    return () => {
      tween.kill();
    };
  }, [selectedCategory, searchQuery, sortBy, viewMode]);

  // GSAP Entrance for Quick Preview Modal
  useEffect(() => {
    if (!quickPreviewDesign || !previewModalRef.current) return;
    const tween = gsap.fromTo(
      previewModalRef.current,
      { opacity: 0, y: 24, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.25)" }
    );
    return () => {
      tween.kill();
    };
  }, [quickPreviewDesign]);

  // GSAP Entrance for Compare Modal
  useEffect(() => {
    if (!isCompareOpen || !compareModalRef.current) return;
    const tween = gsap.fromTo(
      compareModalRef.current,
      { opacity: 0, y: 24, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.25)" }
    );
    return () => {
      tween.kill();
    };
  }, [isCompareOpen]);

  const toggleCompare = (design: CasinoDesign) => {
    setCompareSlugs((prev) => {
      if (prev.includes(design.slug)) {
        return prev.filter((s) => s !== design.slug);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), design.slug];
      }
      return [...prev, design.slug];
    });
  };

  const openQuickPreview = (design: CasinoDesign) => {
    setPreviewSlideIdx(0);
    setQuickPreviewDesign(design);
  };

  const discountPercent = pricingConfig.reservationDiscountPercent;
  const starterPrice = pricingConfig.starterPackagePrice;
  const discountedPrice = Math.round(starterPrice * (1 - discountPercent / 100));
  const holdDays = Math.max(1, Math.round(pricingConfig.reservationDurationHours / 24));

  const quickPreviewSlides = useMemo(() => {
    if (!quickPreviewDesign) return [];
    const primary = resolveShowcaseImage(quickPreviewDesign);
    const list = [
      { id: "primary", title: "Storefront Showcase", url: primary },
      ...(quickPreviewDesign.image !== primary
        ? [{ id: "card-art", title: "Brand Art Card", url: quickPreviewDesign.image }]
        : []),
      ...(quickPreviewDesign.previewImages || []).filter(
        (img) =>
          img.url &&
          img.url !== primary &&
          img.url !== quickPreviewDesign.image
      ),
    ];
    return list;
  }, [quickPreviewDesign]);

  const activePreviewSlide =
    quickPreviewSlides[previewSlideIdx] || quickPreviewSlides[0];

  return (
    <div ref={stageRef} className="relative space-y-10 sm:space-y-12">
      {/* Interactive Cursor-Tracking Champagne-Gold Spotlight & Ambient Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-12 -inset-y-8 overflow-hidden select-none"
      >
        <div
          ref={spotlightRef}
          className="hidden lg:block absolute top-0 left-0 h-[560px] w-[560px] rounded-full blur-[110px] opacity-35 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 215, 94, 0.28) 0%, rgba(217, 70, 239, 0.16) 46%, transparent 72%)",
          }}
        />
        {AMBIENT_ORBS.map((orb, idx) => (
          <span
            key={idx}
            className="js-designs-orb absolute rounded-full"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              boxShadow: `0 0 ${orb.size * 3}px ${orb.color}`,
            }}
          />
        ))}
      </div>

      {/* =====================================================================
          HERO HEADER — EXACT HOMEPAGE ROYAL EDITORIAL DNA
          ===================================================================== */}
      <header className="relative z-10 text-center max-w-4xl mx-auto space-y-4">
        {/* Decorative Floating Luxury Cards Accent (Desktop) */}
        <div
          ref={floatingPropRef}
          aria-hidden="true"
          className="hidden xl:block pointer-events-none absolute -top-6 -left-36 w-[160px] aspect-[560/490] opacity-85 select-none will-change-transform"
        >
          <div
            className="absolute inset-2 rounded-full blur-[30px] opacity-75"
            style={{
              background:
                "radial-gradient(circle, rgba(245, 196, 81, 0.3) 0%, rgba(192, 38, 211, 0.25) 60%, transparent 80%)",
            }}
          />
          <Image
            src="/images/cards-chips.png"
            alt=""
            fill
            sizes="160px"
            className="object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.85)]"
          />
        </div>

        <div className="js-designs-hero inline-flex items-center gap-2 rounded-full border border-[#f5c451]/45 bg-[#1a0730]/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffe28a] backdrop-blur-md shadow-[0_0_24px_rgba(245,196,81,0.18)]">
          <Crown className="h-3.5 w-3.5 text-[#ffd75e] fill-[#ffd75e]/30" />
          <span>{t("badge")}</span>
        </div>

        <h1 className="js-designs-hero flourish font-philosopher text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold uppercase italic leading-tight tracking-wide">
          <span>
            {t("headingPrefix")} <span className="gold-text">{t("headingHighlight")}</span>
          </span>
        </h1>

        <p className="js-designs-hero mx-auto max-w-2xl text-sm sm:text-base text-white/75 leading-relaxed">
          {t("subtitle", {
            count: initialDesigns.length,
            price: starterPrice.toLocaleString(),
            discount: discountPercent,
            fee: pricingConfig.reservationFee.toLocaleString(),
          })}
        </p>

        {/* Dynamic Live Pricing & Turnkey Highlights Strip */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <div className="js-designs-stat inline-flex items-center gap-2 rounded-full border border-[#f5c451]/40 bg-[#17062d]/80 px-4 py-1.5 text-xs backdrop-blur-md">
            <Crown className="h-3.5 w-3.5 text-[#f5c451]" />
            <span className="text-white/75">{t("starterPriceLabel")}</span>
            <strong className="text-[#ffe28a] font-bold">
              ${starterPrice.toLocaleString()} {tCommon("usd")}
            </strong>
          </div>

          <div className="js-designs-stat inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-[#120424]/80 px-4 py-1.5 text-xs backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-white/75">
              <strong className="text-emerald-400">
                {t("holdLockDiscount", { discount: discountPercent })}
              </strong>{" "}
              (${pricingConfig.reservationFee.toLocaleString()} {tCommon("usd")})
            </span>
          </div>

          <div className="js-designs-stat inline-flex items-center gap-2 rounded-full border border-purple-400/35 bg-[#120424]/80 px-4 py-1.5 text-xs backdrop-blur-md">
            <Clock className="h-3.5 w-3.5 text-[#d58cff]" />
            <span className="text-white/75">
              <strong className="text-white">
                {t("yoursPercent", { share: pricingConfig.ggrOperatorShare })}
              </strong>
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================================
          LUXURY GLASS FILTER, SEARCH, SORT & VIEW TOOLBAR
          ===================================================================== */}
      <section className="js-designs-toolbar panel relative z-10 overflow-hidden p-4 sm:p-5 space-y-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-px left-[10%] right-[10%] h-[1.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 232, 150, 0.85), transparent)",
          }}
        />

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Dynamic Category Pills with Live Counts */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100] shadow-[0_0_20px_rgba(245,196,81,0.5)] border border-[#fff2b2]"
                      : "border border-purple-400/30 bg-[#140528]/80 text-white/75 hover:border-[#f5c451]/65 hover:text-[#ffe28a]"
                  }`}
                >
                  <span>{t(`categories.${cat}`)}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                      active
                        ? "bg-black/15 text-[#261100]"
                        : "bg-purple-500/20 text-white/60"
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search + Sort + View Mode Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
                className="input !min-h-[42px] !py-2 !ps-10 !pe-9 !rounded-full text-xs sm:text-sm placeholder:text-white/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label={t("clear")}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-white/50 hover:text-white cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <ArrowUpDown className="pointer-events-none absolute start-3.5 h-3.5 w-3.5 text-[#f5c451]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input !min-h-[42px] !py-2 !ps-9 !pe-8 !rounded-full text-xs font-semibold text-white/90 cursor-pointer"
              >
                <option value="featured" className="bg-[#120424]">
                  {t("sort.featured")}
                </option>
                <option value="name_asc" className="bg-[#120424]">
                  {t("sort.nameAsc")}
                </option>
                <option value="name_desc" className="bg-[#120424]">
                  {t("sort.nameDesc")}
                </option>
              </select>
            </div>

            {/* Grid vs Showcase Layout Switcher */}
            <div className="inline-flex items-center rounded-full border border-purple-400/30 bg-[#120424]/85 p-1 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100]"
                    : "text-white/65 hover:text-white"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("gridView")}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("showcase")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "showcase"
                    ? "bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100]"
                    : "text-white/65 hover:text-white"
                }`}
              >
                <Columns2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("showcaseView")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Results Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-purple-500/20 pt-3 text-xs text-white/65">
          <span>
            {t("showing", { filtered: filteredDesigns.length, total: initialDesigns.length })}
            {selectedCategory !== "All" && (
              <>
                {" "}
                <strong className="text-[#ffe28a]">
                  {t("inCategory", { category: t(`categories.${selectedCategory}`) })}
                </strong>
              </>
            )}
          </span>
          <span className="text-[11px] text-white/55">
            {t("tip")}
          </span>
        </div>
      </section>

      {/* =====================================================================
          DYNAMIC CASINO DESIGN CARDS GRID (EXACT HOMEPAGE CARD DNA)
          ===================================================================== */}
      {filteredDesigns.length > 0 ? (
        <div
          ref={gridRef}
          className={`relative z-10 grid gap-6 lg:gap-7 ${
            viewMode === "showcase"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {filteredDesigns.map((design) => (
            <CasinoDesignCard
              key={design.id}
              design={design}
              categoryLabel={getDesignCategories(design)[0]}
              viewMode={viewMode}
              isCompared={compareSlugs.includes(design.slug)}
              onToggleCompare={toggleCompare}
              onQuickPreview={openQuickPreview}
              onOpenDemo={setDemoModalDesign}
            />
          ))}
        </div>
      ) : (
        <div className="panel relative z-10 py-16 px-6 text-center space-y-4">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#f5c451]/45 bg-[#240942] text-[#ffd75e]">
            <Sparkles size={26} />
          </div>
          <div className="space-y-1">
            <h3 className="font-philosopher text-2xl font-bold text-white">
              {t("emptyTitle")}
            </h3>
            <p className="text-sm text-white/65">
              {t("emptySubtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="btn btn-gold btn-sm mx-auto cursor-pointer"
          >
            {t("resetFilters")}
          </button>
        </div>
      )}

      {/* =====================================================================
          BOTTOM LUXURY CONCIERGE BANNER (MATCHING HOMEPAGE CTA)
          ===================================================================== */}
      <section className="panel panel-gold relative z-10 overflow-hidden p-7 sm:p-10">
        <div className="panel-sheen" aria-hidden="true" />
        <div className="panel-rim" aria-hidden="true" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-start">
          <div className="space-y-2 max-w-2xl">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f5c451]">
              <Crown className="h-3.5 w-3.5" />
              <span>{t("bannerBadge")}</span>
            </p>
            <h2 className="font-philosopher text-2xl sm:text-3xl font-bold italic uppercase text-white">
              {t("bannerHeadingPrefix")} <span className="gold-text">{t("bannerHeadingHighlight")}</span>
            </h2>
            <p className="text-sm text-white/75 leading-relaxed">
              {t("bannerBody", {
                discount: discountPercent,
                discountedPrice: discountedPrice.toLocaleString(),
                days: holdDays,
              })}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/select-design"
              className="btn-royal-gold shine w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider"
            >
              <span>{tCommon("reserveCasino")}</span>
              <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>
            <a
              href={`${SITE_CONFIG.contact.whatsappLink}?text=${encodeURIComponent(
                "Hi Royal Casino Club, I'm browsing your casino designs and would like a personalized recommendation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-neon w-full sm:w-auto text-xs sm:text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4 text-[#f5c451]" />
              <span>{t("chatWhatsapp")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FLOATING COMPARE / SHORTLIST DOCK (APPEARS WHEN 1-3 DESIGNS SAVED)
          ===================================================================== */}
      {comparedDesigns.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl">
          <div className="panel panel-gold flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 shadow-[0_18px_50px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ffe28a]">
                <Scale className="h-4 w-4" />
                {t("compareLabel", { count: comparedDesigns.length })}
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                {comparedDesigns.map((d) => (
                  <span
                    key={d.slug}
                    className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 bg-[#17062d] px-2.5 py-1 text-[11px] font-semibold text-white"
                  >
                    <span>{d.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleCompare(d)}
                      aria-label={`Remove ${d.name}`}
                      className="text-white/50 hover:text-white cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ms-auto">
              <button
                type="button"
                onClick={() => setCompareSlugs([])}
                className="text-xs text-white/55 hover:text-white px-2 py-1 cursor-pointer"
              >
                {t("clear")}
              </button>
              <button
                type="button"
                onClick={() => setIsCompareOpen(true)}
                className="btn btn-gold btn-sm !py-1.5 !px-4 text-xs cursor-pointer"
              >
                <span>{t("compareNow")}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl-flip" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INSTANT QUICK-PREVIEW LIGHTBOX MODAL
          ===================================================================== */}
      {quickPreviewDesign && activePreviewSlide && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setQuickPreviewDesign(null)}
          className="fixed inset-0 z-50 bg-[#05010c]/88 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            ref={previewModalRef}
            onClick={(e) => e.stopPropagation()}
            className="panel panel-gold relative max-w-3xl w-full p-5 sm:p-7 space-y-5 my-auto overflow-hidden"
          >
            <div className="panel-sheen" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setQuickPreviewDesign(null)}
              aria-label="Close quick preview"
              className="absolute top-4 right-4 z-20 p-2 rounded-full border border-purple-400/30 bg-[#1a0730]/90 text-white/70 hover:text-white hover:border-[#f5c451] cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="relative z-10 pr-10 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c451]">
                {getDesignCategories(quickPreviewDesign).join(" • ")} Theme
              </p>
              <h3 className="font-philosopher text-2xl sm:text-3xl font-bold italic text-white">
                {quickPreviewDesign.name}
              </h3>
              {quickPreviewDesign.subtitle && (
                <p className="text-xs sm:text-sm text-white/70">
                  {quickPreviewDesign.subtitle}
                </p>
              )}
            </div>

            {/* Preview Image Stage */}
            <div className="relative z-10 space-y-3">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#f5c451]/45 bg-[#120424]">
                <Image
                  src={activePreviewSlide.url}
                  alt={`${quickPreviewDesign.name} — ${activePreviewSlide.title}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover object-center"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-black/70 border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
                  {activePreviewSlide.title}
                </span>
              </div>

              {quickPreviewSlides.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
                  {quickPreviewSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setPreviewSlideIdx(idx)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer ${
                        idx === previewSlideIdx
                          ? "border-[#f5c451] bg-[#f5c451]/20 text-[#ffe28a]"
                          : "border-purple-400/30 bg-[#120424]/80 text-white/65 hover:text-white"
                      }`}
                    >
                      {slide.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing & Included Highlights */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-purple-400/25 bg-[#120424]/80 p-3">
                <p className="text-white/55 text-[10px] uppercase tracking-wider">
                  {t("starterPackage")}
                </p>
                <p className="mt-0.5 font-philosopher text-lg font-bold text-white">
                  ${starterPrice.toLocaleString()} {tCommon("usd")}
                </p>
              </div>
              <div className="rounded-xl border border-emerald-400/30 bg-[#120424]/80 p-3">
                <p className="text-white/55 text-[10px] uppercase tracking-wider">
                  {t("withHoldLock", { discount: discountPercent })}
                </p>
                <p className="mt-0.5 font-philosopher text-lg font-bold text-emerald-400">
                  ${discountedPrice.toLocaleString()} {tCommon("usd")}
                </p>
              </div>
              <div className="rounded-xl border border-[#f5c451]/35 bg-[#120424]/80 p-3">
                <p className="text-white/55 text-[10px] uppercase tracking-wider">
                  {t("includesLabel")}
                </p>
                <p className="mt-0.5 font-semibold text-[#ffe28a] flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{t("includesSummary")}</span>
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 pt-1">
              <Link
                href={`/select-design?design=${quickPreviewDesign.slug}`}
                className="btn-royal-gold shine w-full sm:flex-1 py-3 px-5 text-xs sm:text-sm uppercase tracking-wider"
              >
                <span>{t("selectCustomize", { name: quickPreviewDesign.name })}</span>
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  const target = quickPreviewDesign;
                  setQuickPreviewDesign(null);
                  setDemoModalDesign(target);
                }}
                className="btn btn-neon w-full sm:w-auto text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <span>{t("openInteractiveDemo")}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SIDE-BY-SIDE COMPARE MODAL (UP TO 3 THEMES)
          ===================================================================== */}
      {isCompareOpen && comparedDesigns.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsCompareOpen(false)}
          className="fixed inset-0 z-50 bg-[#05010c]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            ref={compareModalRef}
            onClick={(e) => e.stopPropagation()}
            className="panel panel-gold relative max-w-5xl w-full p-5 sm:p-7 space-y-6 my-auto overflow-hidden"
          >
            <div className="panel-sheen" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setIsCompareOpen(false)}
              aria-label={tCommon("close")}
              className="absolute top-4 end-4 z-20 p-2 rounded-full border border-purple-400/30 bg-[#1a0730]/90 text-white/70 hover:text-white hover:border-[#f5c451] cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="relative z-10 pe-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c451]">
                {t("comparisonEyebrow")}
              </p>
              <h3 className="font-philosopher text-2xl sm:text-3xl font-bold italic text-white">
                {t("comparisonTitlePrefix")} <span className="gold-text">{t("comparisonTitleHighlight")}</span>
              </h3>
            </div>

            <div
              className={`relative z-10 grid gap-5 ${
                comparedDesigns.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : comparedDesigns.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {comparedDesigns.map((design) => (
                <div
                  key={design.slug}
                  className="rounded-2xl border border-purple-400/35 bg-[#120424]/85 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[3/2] w-full bg-[#0b0218]">
                      <Image
                        src={resolveShowcaseImage(design)}
                        alt={design.name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2.5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#f5c451]">
                          {getDesignCategories(design).join(" • ")}
                        </p>
                        <h4 className="font-philosopher text-xl font-bold text-white">
                          {design.name}
                        </h4>
                        <p className="text-xs text-white/65 mt-0.5">
                          {design.subtitle || t("defaultSubtitle")}
                        </p>
                      </div>

                      <ul className="space-y-1.5 pt-2 border-t border-purple-500/20 text-xs text-white/80">
                        <li className="flex justify-between">
                          <span className="text-white/55">{t("starterPriceLabel")}</span>
                          <strong className="text-white">
                            ${starterPrice.toLocaleString()} {tCommon("usd")}
                          </strong>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-white/55">{t("holdLockDiscount", { discount: discountPercent })}</span>
                          <strong className="text-emerald-400">
                            ${discountedPrice.toLocaleString()} {tCommon("usd")}
                          </strong>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-white/55">{t("operatorGgr")}</span>
                          <strong className="text-[#ffe28a]">
                            {t("yoursPercent", { share: pricingConfig.ggrOperatorShare })}
                          </strong>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex flex-col gap-2">
                    <Link
                      href={`/select-design?design=${design.slug}`}
                      className="btn btn-gold btn-sm w-full text-xs font-bold"
                    >
                      <span>{t("selectTheme", { name: design.name })}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCompareOpen(false);
                        setDemoModalDesign(design);
                      }}
                      className="btn btn-neon btn-sm w-full text-xs font-semibold cursor-pointer"
                    >
                      <span>{t("liveDemo")}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          RESPONSIVE PROTECTED INTERACTIVE WEBSITE DEMO MODAL
          ===================================================================== */}
      <WebsiteDemoModal
        design={demoModalDesign}
        onClose={() => setDemoModalDesign(null)}
      />
    </div>
  );
}

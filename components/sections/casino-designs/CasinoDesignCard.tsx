"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ExternalLink, Eye, Scale, Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { CasinoDesign } from "@/types";

interface CasinoDesignCardProps {
  design: CasinoDesign;
  categoryLabel?: string;
  viewMode?: "grid" | "showcase";
  isCompared?: boolean;
  onToggleCompare?: (design: CasinoDesign) => void;
  onQuickPreview?: (design: CasinoDesign) => void;
  onOpenDemo?: (design: CasinoDesign) => void;
}

const KNOWN_LOCAL_DESIGN_SLUGS = new Set([
  "cosmic-casino",
  "diamond-palace",
  "elite-casino",
  "emerald-club",
  "golden-crown",
  "lucky-spin",
  "mystic-casino",
  "neon-vegas",
  "ocean-casino",
  "prestige-gold",
  "royal-prestige",
  "ruby-casino",
]);

export function resolveShowcaseImage(design: CasinoDesign): string {
  // Match the crisp homepage CasinoDesignsSection artwork for built-in themes,
  // while preserving custom admin-uploaded images (e.g. Cloudinary URLs).
  if (
    design.image.startsWith("/images/card-") &&
    KNOWN_LOCAL_DESIGN_SLUGS.has(design.slug)
  ) {
    return `/images/design-${design.slug}.png`;
  }
  return design.image;
}

export default function CasinoDesignCard({
  design,
  categoryLabel,
  viewMode = "grid",
  isCompared = false,
  onToggleCompare,
  onQuickPreview,
  onOpenDemo,
}: CasinoDesignCardProps) {
  const tCommon = useTranslations("common");
  const cardRef = useRef<HTMLDivElement>(null);
  const showcaseImage = resolveShowcaseImage(design);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 4,
      rotateX: -y * 3.5,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`js-catalog-card group panel panel-gold panel-interactive relative overflow-hidden flex flex-col hover:-translate-y-1.5 will-change-transform ${
        isCompared ? "ring-2 ring-[#ffd75e] shadow-[0_0_32px_rgba(245,196,81,0.4)]" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="panel-sheen z-20" aria-hidden="true" />
      <div className="panel-rim z-20" aria-hidden="true" />

      {/* Upper High-Resolution Artwork Stage (Matches Homepage CasinoDesignsSection) */}
      <div
        className={`relative w-full overflow-hidden bg-[#150726] ${
          viewMode === "showcase" ? "aspect-[16/9]" : "aspect-[3/2]"
        }`}
      >
        <Image
          src={showcaseImage}
          alt={`${design.name} casino design`}
          fill
          unoptimized
          sizes={
            viewMode === "showcase"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          }
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />

        {/* Smooth Bottom Blend into Panel Velvet */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#150726] via-[#150726]/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#090214]/70 to-transparent" />

        {/* Top Floating Controls: Category Pill + Quick Preview + Compare Toggle */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2">
          {categoryLabel ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#f5c451]/45 bg-[#120424]/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ffe28a] backdrop-blur-md">
              <Sparkles className="h-2.5 w-2.5 text-[#ffd75e]" />
              {categoryLabel}
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1.5">
            {onQuickPreview && (
              <button
                type="button"
                onClick={() => onQuickPreview(design)}
                title={`Quick preview ${design.name}`}
                className="grid h-8 w-8 place-items-center rounded-full border border-purple-300/35 bg-[#120424]/85 text-white/85 backdrop-blur-md transition-all hover:scale-105 hover:border-[#f5c451] hover:text-[#ffe28a] cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
            )}

            {onToggleCompare && (
              <button
                type="button"
                onClick={() => onToggleCompare(design)}
                title={
                  isCompared
                    ? `Remove ${design.name} from compare`
                    : `Compare ${design.name}`
                }
                aria-pressed={isCompared}
                className={`inline-flex h-8 items-center gap-1 rounded-full border px-2.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                  isCompared
                    ? "border-[#ffd75e] bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100] shadow-[0_0_14px_rgba(245,196,81,0.5)]"
                    : "border-purple-300/35 bg-[#120424]/85 text-white/80 hover:border-[#f5c451] hover:text-[#ffe28a]"
                }`}
              >
                {isCompared ? (
                  <>
                    <Check className="h-3 w-3 stroke-[3]" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Scale className="h-3 w-3" />
                    <span className="hidden sm:inline">Compare</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Title & Subtitle (Matches Homepage CasinoDesignsSection) */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-4 pt-4 pb-5">
        <div className="text-center space-y-1">
          <h3 className="font-philosopher text-xl xl:text-2xl font-bold text-white transition-colors duration-500 group-hover:text-[#ffe28a] leading-tight">
            {design.name}
          </h3>
          {design.subtitle && (
            <p className="text-xs xl:text-[13px] text-white/65 line-clamp-1">
              {design.subtitle}
            </p>
          )}
        </div>

        {/* Homepage-Matched Dual Action Pill Buttons */}
        <div className="flex items-center justify-center gap-2.5 pt-4">
          {onOpenDemo ? (
            <button
              type="button"
              onClick={() => onOpenDemo(design)}
              title={`View live interactive demo of ${design.name}`}
              className="btn btn-neon btn-sm !px-3.5 xl:!px-4 text-xs xl:text-sm font-semibold flex-1 cursor-pointer"
            >
              <span>{tCommon("viewDemo")}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </button>
          ) : (
            <Link
              href={`/designs/${design.slug}`}
              title={`View live interactive demo of ${design.name}`}
              className="btn btn-neon btn-sm !px-3.5 xl:!px-4 text-xs xl:text-sm font-semibold flex-1"
            >
              <span>{tCommon("viewDemo")}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </Link>
          )}

          <Link
            href={`/select-design?design=${design.slug}`}
            title={`Select and reserve ${design.name}`}
            className="btn btn-gold btn-sm !px-3.5 xl:!px-4 text-xs xl:text-sm font-bold flex-1"
          >
            <span>{tCommon("selectDesign")}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

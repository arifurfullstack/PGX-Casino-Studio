"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  X,
  Lock,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Crown,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
  Menu,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CasinoDesign, DesignPreviewImage } from "@/types";
import ProtectedDemoCanvas from "./ProtectedDemoCanvas";

interface WebsiteDemoModalProps {
  design: CasinoDesign | null;
  onClose: () => void;
  initialPageId?: string;
  allowUnsavedAdminPreview?: boolean;
}

type ViewportMode = "desktop" | "tablet" | "mobile";

interface NormalizedDemoPage {
  id: string;
  title: string;
  pagePath: string;
  url?: string;
  order: number;
}

function slugifyPath(title: string, index: number): string {
  const lower = title.toLowerCase().trim();
  if (
    index === 0 &&
    (lower.includes("home") || lower.includes("landing") || lower.includes("showcase"))
  ) {
    return "/";
  }
  const slug = lower
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug ? `/${slug}` : `/page-${index + 1}`;
}

export default function WebsiteDemoModal({
  design,
  onClose,
  initialPageId,
  allowUnsavedAdminPreview = false,
}: WebsiteDemoModalProps) {
  const t = useTranslations("designs.demo.modal");
  const tCommon = useTranslations("common");
  const [activeIndex, setActiveIndex] = useState(0);
  const [historyStack, setHistoryStack] = useState<number[]>([0]);
  const [historyPos, setHistoryPos] = useState(0);
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Build ordered list of website pages from admin-uploaded previewImages
  const pages: NormalizedDemoPage[] = useMemo(() => {
    if (!design) return [];
    const sorted = [...(design.previewImages || [])]
      .filter((p): p is DesignPreviewImage => Boolean(p && p.id && p.url))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (sorted.length > 0) {
      return sorted.map((p, idx) => ({
        id: p.id,
        title: p.title || `Page ${idx + 1}`,
        pagePath: p.pagePath?.trim()
          ? p.pagePath.startsWith("/")
            ? p.pagePath.trim()
            : `/${p.pagePath.trim()}`
          : slugifyPath(p.title || `Page ${idx + 1}`, idx),
        url: allowUnsavedAdminPreview ? p.url : undefined,
        order: p.order ?? idx + 1,
      }));
    }

    // Fallback if admin hasn't uploaded demo pages yet
    return [
      {
        id: "__primary__",
        title: "Homepage",
        pagePath: "/",
        url: allowUnsavedAdminPreview ? design.image : undefined,
        order: 1,
      },
    ];
  }, [design, allowUnsavedAdminPreview]);

  // Reset modal state whenever a different design is opened
  useEffect(() => {
    if (!design) return;
    const startIdx = initialPageId
      ? Math.max(
          0,
          pages.findIndex((p) => p.id === initialPageId)
        )
      : 0;
    setActiveIndex(startIdx);
    setHistoryStack([startIdx]);
    setHistoryPos(0);
    setViewportMode("desktop");
    setMobileMenuOpen(false);
    setShowScrollTop(false);
  }, [design, initialPageId, pages]);

  // Lock background page scroll while modal is open
  useEffect(() => {
    if (!design) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [design]);

  // Scroll viewport back to top on page change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  }, [activeIndex]);

  const navigateToIndex = (nextIdx: number) => {
    if (nextIdx < 0 || nextIdx >= pages.length) return;
    setActiveIndex(nextIdx);
    setHistoryStack((prev) => {
      const sliced = prev.slice(0, historyPos + 1);
      if (sliced[sliced.length - 1] === nextIdx) return sliced;
      return [...sliced, nextIdx];
    });
    setHistoryPos((pos) => pos + 1);
  };

  const canGoBack = historyPos > 0;
  const canGoForward = historyPos < historyStack.length - 1;

  const handleBack = () => {
    if (!canGoBack) return;
    const nextPos = historyPos - 1;
    setHistoryPos(nextPos);
    setActiveIndex(historyStack[nextPos]);
  };

  const handleForward = () => {
    if (!canGoForward) return;
    const nextPos = historyPos + 1;
    setHistoryPos(nextPos);
    setActiveIndex(historyStack[nextPos]);
  };

  // Keyboard navigation + anti-save / anti-print / anti-inspect shortcuts
  useEffect(() => {
    if (!design) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlOrMeta = e.ctrlKey || e.metaKey;

      // Block Save, Print, View-Source, DevTools shortcuts while previewing protected demo
      if (
        (ctrlOrMeta && (key === "s" || key === "p" || key === "u")) ||
        (ctrlOrMeta && e.shiftKey && (key === "i" || key === "j" || key === "c")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && pages.length > 1) {
        const next = (activeIndex + 1) % pages.length;
        navigateToIndex(next);
      } else if (e.key === "ArrowLeft" && pages.length > 1) {
        const prev = (activeIndex - 1 + pages.length) % pages.length;
        navigateToIndex(prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [design, activeIndex, pages.length, onClose]);

  if (!design) return null;

  const activePage = pages[activeIndex] || pages[0];
  const nextPage = pages.length > 1 ? pages[(activeIndex + 1) % pages.length] : null;
  const prevPage =
    pages.length > 1 ? pages[(activeIndex - 1 + pages.length) % pages.length] : null;

  const simulatedUrl = `https://${design.slug}.royalcasinoclub.demo${
    activePage?.pagePath === "/" ? "" : activePage?.pagePath || ""
  }`;

  const viewportMaxWidthClass =
    viewportMode === "mobile"
      ? "max-w-[390px] border-x border-purple-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      : viewportMode === "tablet"
      ? "max-w-[780px] border-x border-purple-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      : "max-w-full";

  const blockContextMenu = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${design.name} interactive website demo`}
      onContextMenu={blockContextMenu}
      onDragStart={blockContextMenu}
      onClick={onClose}
      className="demo-modal-protected fixed inset-0 z-[100] flex items-center justify-center bg-[#04010a]/90 backdrop-blur-md p-0 sm:p-3 lg:p-5 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onContextMenu={blockContextMenu}
        className={`relative flex flex-col overflow-hidden bg-[#0a0316] border border-[#f5c451]/45 shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(168,85,247,0.22)] transition-all duration-300 ${
          isFullscreen
            ? "w-screen h-[100dvh] rounded-none"
            : "w-full h-[100dvh] sm:h-[92dvh] sm:max-w-[1440px] sm:rounded-2xl"
        }`}
      >
        {/* ================================================================
            1. SIMULATED BROWSER CHROME BAR
            ================================================================ */}
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-[#120624] border-b border-purple-500/30">
          {/* Left: Traffic Lights + Browser Back / Forward / Refresh */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
              <button
                type="button"
                onClick={onClose}
                title="Close Demo"
                className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110 cursor-pointer"
              />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <button
                type="button"
                onClick={() => setIsFullscreen((f) => !f)}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="h-3 w-3 rounded-full bg-[#28c840] hover:brightness-110 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleBack}
                disabled={!canGoBack}
                aria-label="Previous visited page"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleForward}
                disabled={!canGoForward}
                aria-label="Next visited page"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                aria-label="Reload preview"
                title="Reload current page"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <RotateCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Center: Simulated Live HTTPS Address Bar */}
          <div className="order-3 sm:order-2 w-full sm:w-auto sm:flex-1 sm:max-w-xl">
            <div className="flex items-center gap-2 rounded-full border border-purple-400/25 bg-[#070210] px-3 py-1.5 text-[11px] sm:text-xs text-white/75">
              <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
              <span className="truncate font-mono text-white/80">{simulatedUrl}</span>
              <span className="ms-auto hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 shrink-0">
                <ShieldCheck className="h-3 w-3" />
                {t("protected")}
              </span>
            </div>
          </div>

          {/* Right: Viewport Switcher + Fullscreen + Select CTA + Close */}
          <div className="order-2 sm:order-3 flex items-center gap-1.5 sm:gap-2">
            {/* Desktop / Tablet / Mobile Switcher (hidden on small screens) */}
            <div className="hidden lg:flex items-center rounded-full border border-purple-400/30 bg-[#070210] p-0.5">
              {(
                [
                  { mode: "desktop", icon: Monitor, label: "Desktop View" },
                  { mode: "tablet", icon: Tablet, label: "Tablet View" },
                  { mode: "mobile", icon: Smartphone, label: "Mobile View" },
                ] as const
              ).map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewportMode(mode)}
                  title={label}
                  aria-label={label}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    viewportMode === mode
                      ? "bg-[#f5c451] text-[#261100]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen((f) => !f)}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="hidden sm:grid h-8 w-8 place-items-center rounded-full border border-purple-400/30 bg-[#1a0730] text-white/75 hover:border-[#f5c451] hover:text-[#ffe28a] cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>

            <Link
              href={`/select-design?design=${design.slug}`}
              className="btn btn-gold btn-sm !px-3 sm:!px-4 !py-1.5 text-[11px] sm:text-xs font-bold shrink-0"
            >
              <span>{tCommon("selectDesign")}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl-flip" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close demo modal"
              title="Close (Esc)"
              className="grid h-8 w-8 place-items-center rounded-full border border-purple-400/35 bg-[#1a0730] text-white/80 hover:border-[#f5c451] hover:text-white cursor-pointer shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ================================================================
            2. SIMULATED LIVE WEBSITE NAVIGATION BAR (DYNAMIC ADMIN PAGES)
            ================================================================ */}
        <div className="shrink-0 bg-[#0d031d]/95 border-b border-[#f5c451]/25 px-3 sm:px-5 py-2.5">
          <div className="mx-auto flex items-center justify-between gap-3">
            {/* Simulated Brand Logo */}
            <button
              type="button"
              onClick={() => navigateToIndex(0)}
              className="flex items-center gap-2 text-left shrink-0 cursor-pointer group"
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg border border-[#f5c451]/50 bg-gradient-to-b from-[#2b0b4d] to-[#130426] shadow-[0_0_12px_rgba(245,196,81,0.25)]">
                <Crown className="h-4 w-4 text-[#ffd75e] fill-[#ffd75e]/30" />
              </div>
              <div className="leading-tight">
                <p className="font-philosopher text-sm sm:text-base font-bold text-white group-hover:text-[#ffe28a] transition-colors">
                  {design.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5c451]/80">
                  {t("liveUiDemo")} • {tCommon("pagesCount", { count: pages.length })}
                </p>
              </div>
            </button>

            {/* Desktop / Tablet Horizontal Website Nav Links */}
            <nav
              aria-label="Demo website pages"
              className="hidden md:flex items-center gap-1 overflow-x-auto max-w-[65%] py-0.5"
            >
              {pages.map((page, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => navigateToIndex(idx)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100] font-bold shadow-[0_0_14px_rgba(245,196,81,0.45)]"
                        : "text-white/75 hover:text-[#ffe28a] hover:bg-purple-500/15"
                    }`}
                  >
                    {page.title}
                  </button>
                );
              })}
            </nav>

            {/* Page Counter + Mobile Menu Button */}
            <div className="flex items-center gap-2 shrink-0">
              {pages.length > 1 && (
                <span className="hidden sm:inline-flex items-center rounded-full border border-purple-400/25 bg-[#16062c] px-2.5 py-1 text-[11px] font-semibold text-white/70">
                  {activeIndex + 1} / {pages.length}
                </span>
              )}

              {pages.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  aria-label="Toggle demo pages menu"
                  className="md:hidden inline-flex items-center gap-1.5 rounded-full border border-[#f5c451]/40 bg-[#1a0730] px-3 py-1.5 text-xs font-semibold text-[#ffe28a] cursor-pointer"
                >
                  <Menu className="h-3.5 w-3.5" />
                  <span>Pages</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Horizontal Quick-Switch Strip (Always Accessible on Touch) */}
          {pages.length > 1 && (
            <div className="mt-2.5 flex md:hidden items-center gap-1.5 overflow-x-auto pb-1">
              {pages.map((page, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => navigateToIndex(idx)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100] font-bold"
                        : "border border-purple-400/25 bg-[#16062c] text-white/75"
                    }`}
                  >
                    {page.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* Optional Mobile Dropdown Drawer */}
          {mobileMenuOpen && pages.length > 1 && (
            <div className="mt-2 md:hidden rounded-xl border border-purple-500/30 bg-[#140529] p-2 space-y-1">
              {pages.map((page, idx) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => navigateToIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
                    idx === activeIndex
                      ? "bg-[#f5c451]/20 text-[#ffe28a] border border-[#f5c451]/40"
                      : "text-white/75 hover:bg-white/5"
                  }`}
                >
                  <span>{page.title}</span>
                  <span className="font-mono text-[10px] text-white/45">{page.pagePath}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================================================================
            3. SCROLLABLE FULL-PAGE WEBSITE VIEWPORT (PROTECTED CANVAS)
            ================================================================ */}
        <div
          ref={scrollContainerRef}
          onScroll={(e) => {
            setShowScrollTop(e.currentTarget.scrollTop > 320);
          }}
          className="relative flex-1 overflow-y-auto overflow-x-hidden bg-[#06010d]"
        >
          <div
            className={`mx-auto w-full min-h-full transition-all duration-300 bg-[#0b0218] ${viewportMaxWidthClass}`}
          >
            {activePage && (
              <ProtectedDemoCanvas
                key={`${design.slug}-${activePage.id}-${reloadKey}`}
                designSlug={design.slug}
                pageId={activePage.id}
                pageTitle={activePage.title}
                showWatermark={true}
                adminDirectUrl={allowUnsavedAdminPreview ? activePage.url : undefined}
              />
            )}

            {/* Simulated Website Footer Bar — Natural Page-to-Page Exploration */}
            <div className="border-t border-purple-500/25 bg-[#0c0319] px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  {t("viewingOf", { page: activePage?.title || "", design: design.name })}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {prevPage && (
                  <button
                    type="button"
                    onClick={() =>
                      navigateToIndex((activeIndex - 1 + pages.length) % pages.length)
                    }
                    className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/35 bg-[#16062c] px-3.5 py-1.5 text-xs font-semibold text-white/85 hover:border-[#f5c451] hover:text-[#ffe28a] cursor-pointer"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 rtl-flip" />
                    <span>{prevPage.title}</span>
                  </button>
                )}

                {nextPage && (
                  <button
                    type="button"
                    onClick={() => navigateToIndex((activeIndex + 1) % pages.length)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#f5c451]/50 bg-[#1f0a3a] px-3.5 py-1.5 text-xs font-semibold text-[#ffe28a] hover:bg-[#2a0f4d] cursor-pointer"
                  >
                    <span>{t("nextPage", { page: nextPage.title })}</span>
                    <ChevronRight className="h-3.5 w-3.5 rtl-flip" />
                  </button>
                )}

                <Link
                  href={`/select-design?design=${design.slug}`}
                  className="btn btn-gold btn-sm !px-4 !py-1.5 text-xs font-bold"
                >
                  <span>{t("reserveDesign", { design: design.name })}</span>
                  <ArrowRight className="h-3.5 w-3.5 rtl-flip" />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Scroll-to-Top Button inside Viewport */}
          {showScrollTop && (
            <button
              type="button"
              onClick={() =>
                scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Scroll to top of demo page"
              className="fixed sm:absolute bottom-5 right-5 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#f5c451]/60 bg-[#17062d]/90 text-[#ffe28a] shadow-[0_6px_20px_rgba(0,0,0,0.75)] backdrop-blur-md hover:scale-105 cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

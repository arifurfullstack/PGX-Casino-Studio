"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Heart, Play, ChevronLeft, ChevronRight, Crown, Sparkles, Layers, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { CasinoDesign } from "@/types";
import ProtectedDemoCanvas from "./ProtectedDemoCanvas";
import WebsiteDemoModal from "./WebsiteDemoModal";

interface CasinoPreviewStageProps {
  design: CasinoDesign;
}

const FEATURED_GAMES = [
  { id: "sweet-bonanza", name: "Sweet Bonanza", image: "/images/game-sweet-bonanza.png" },
  { id: "gates-of-olympus", name: "Gates of Olympus", image: "/images/game-gates-of-olympus.png" },
  { id: "sugar-rush", name: "Sugar Rush", image: "/images/game-sugar-rush.png" },
  { id: "big-bass-bonanza", name: "Big Bass Bonanza", image: "/images/game-big-bass-bonanza.png" },
  { id: "buffalo-king", name: "Buffalo King", image: "/images/game-buffalo-king.png" },
  { id: "book-of-dead", name: "Book of Dead", image: "/images/game-book-of-dead.png" },
  { id: "fortune-dragon", name: "Fortune Dragon", image: "/images/game-fortune-dragon.png" },
  { id: "hot-fruits", name: "Hot Fruits", image: "/images/game-hot-fruits.png" },
  { id: "jokers-jewels", name: "Joker's Jewels", image: "/images/game-jokers-jewels.png" },
  { id: "wolf-gold", name: "Wolf Gold", image: "/images/game-wolf-gold.png" },
];

const CATEGORIES = [
  { id: "slots", label: "Slots", image: "/images/demo-cat-slots.png" },
  { id: "live", label: "Live Dealer Casino", image: "/images/demo-cat-live.png" },
  { id: "sports", label: "Sportsbook", image: "/images/demo-cat-sports.png" },
  { id: "poker", label: "Poker Platform", image: "/images/demo-cat-poker.png" },
];

export default function CasinoPreviewStage({ design }: CasinoPreviewStageProps) {
  const t = useTranslations("designs.demo");
  const [activeTab, setActiveTab] = useState("home");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeModalGame, setActiveModalGame] = useState<string | null>(null);
  const [selectedPreviewId, setSelectedPreviewId] = useState<string | null>(
    design.previewImages && design.previewImages.length > 0
      ? design.previewImages[0].id
      : null
  );
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const previewList = [...(design.previewImages || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const selectedPreview = previewList.find((p) => p.id === selectedPreviewId) || null;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="demo-no-save w-full flex-1 rounded-2xl bg-[#030007] border-2 border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.35)] overflow-hidden flex flex-col"
    >
      {/* 1. Multi-PNG Suite Switcher Bar */}
      {previewList.length > 0 && (
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#06010d] border-b border-purple-900/50 overflow-x-auto text-[11px]">
          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider px-1.5 flex items-center gap-1 shrink-0">
            <Layers size={12} className="text-[#FFD700]" />
            <span>{t("demoPages")}</span>
          </span>
          {previewList.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreviewId(p.id)}
              type="button"
              className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                selectedPreviewId === p.id
                  ? "bg-gradient-to-b from-[#FFE259] to-[#FFA700] text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                  : "bg-purple-950/60 text-gray-300 hover:text-white"
              }`}
            >
              {p.title}
            </button>
          ))}
          <button
            onClick={() => setSelectedPreviewId(null)}
            type="button"
            className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
              selectedPreviewId === null
                ? "bg-gradient-to-b from-[#FFE259] to-[#FFA700] text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                : "bg-purple-950/60 text-gray-300 hover:text-white"
            }`}
          >
            {t("interactiveLobby")}
          </button>
          <button
            onClick={() => setIsWebsiteModalOpen(true)}
            type="button"
            className="ms-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#f5c451]/45 bg-[#1a0730] text-[#ffe28a] font-bold hover:bg-[#2a0c4a] shrink-0 cursor-pointer"
          >
            <Maximize2 size={11} />
            <span>{t("fullBrowserDemo")}</span>
          </button>
        </div>
      )}

      {/* 2. Casino Simulation Header */}
      <div className="bg-[#0b0114]/95 border-b border-purple-900/60 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <Crown size={18} className="text-yellow-400 fill-yellow-400 shrink-0" />
          <div>
            <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1">
              <span>{design.name}</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-purple-300 font-semibold">{t("casinoLabel")}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-gray-300">
          {(["home", "slots", "live", "sports", "poker"] as const).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => {
                setSelectedPreviewId(null);
                setActiveTab(tabKey);
              }}
              type="button"
              className={`py-1 transition-colors ${
                activeTab === tabKey && !selectedPreviewId
                  ? "text-yellow-400 border-b border-yellow-400 font-bold"
                  : "hover:text-white"
              }`}
            >
              {t(`tabs.${tabKey}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-500/40 text-gray-300 flex items-center justify-center hover:text-white"
            title={t("searchGames")}
          >
            <Search size={13} />
          </button>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-[10px] sm:text-[11px] font-bold text-yellow-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span>{t("turnkeyDemo")}</span>
          </span>
        </div>
      </div>

      {/* 3. Main Stage Content */}
      {selectedPreview ? (
        <div className="relative w-full max-h-[75vh] overflow-y-auto bg-[#0c0218]">
          <ProtectedDemoCanvas
            key={`${design.slug}-${selectedPreview.id}`}
            designSlug={design.slug}
            pageId={selectedPreview.id}
            pageTitle={selectedPreview.title}
            showWatermark={true}
          />
        </div>
      ) : (
        <>
          {/* Casino Hero Interactive Banner */}
          <div className="relative w-full aspect-[781/197] bg-[#0c0218] overflow-hidden group">
            <Image
              src="/images/demo-hero-banner-clean.png"
              alt="Welcome to Royal Prestige Casino"
              fill
              className="object-cover"
              priority
            />
            <button
              type="button"
              aria-label="Previous Slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 border border-yellow-400/50 text-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next Slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 border border-yellow-400/50 text-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* 4 Category Quick-Select Cards */}
          <div className="p-2.5 sm:p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="relative rounded-xl overflow-hidden border border-purple-500/40 hover:border-yellow-400 shadow-[0_0_12px_rgba(168,85,247,0.2)] aspect-[180/75] cursor-pointer group transition-all"
                onClick={() => setActiveTab(cat.label)}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Featured Games Section Header */}
          <div className="px-3 sm:px-4 pt-1 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-yellow-400 rounded-full" />
              <h3 className="text-xs sm:text-sm font-bold tracking-wider text-white">
                {t("featuredGames")}
              </h3>
            </div>
            <button
              type="button"
              className="text-[11px] font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors"
            >
              <span>{t("viewAllGames")}</span>
              <span className="text-xs rtl-flip">→</span>
            </button>
          </div>

          {/* 10-Game Grid (2 rows x 5 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5 px-3 sm:px-4 pb-4">
            {FEATURED_GAMES.map((game) => {
              const isFav = favorites.includes(game.id);
              return (
                <div
                  key={game.id}
                  onClick={() => setActiveModalGame(game.name)}
                  className="group relative rounded-xl overflow-hidden border border-purple-600/50 hover:border-yellow-400 bg-[#090214] aspect-[146/103] cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all"
                >
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-fill group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(game.id, e)}
                    className="absolute top-1.5 right-1.5 z-10 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-purple-200 hover:text-red-400 transition-colors"
                  >
                    <Heart
                      size={11}
                      className={isFav ? "text-red-500 fill-red-500" : ""}
                    />
                  </button>

                  {/* Hover Play Demo Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                    <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                      <Play size={12} className="fill-black ml-0.5" />
                    </div>
                    <span className="text-[9px] font-bold uppercase text-yellow-300 tracking-wider">
                      {t("instantPlay")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Demo Modal Simulation */}
      {activeModalGame && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalGame(null)}
        >
          <div
            className="rounded-2xl bg-[#0d031e] border-2 border-yellow-400/80 p-6 max-w-sm w-full space-y-4 text-center shadow-[0_0_40px_rgba(255,215,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-yellow-400/20 border border-yellow-400 text-yellow-400 mx-auto flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">{activeModalGame}</h4>
              <p className="text-xs text-purple-300 mt-1">{t("liveSimulation")}</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {t("simulationBody")}
            </p>
            <button
              type="button"
              onClick={() => setActiveModalGame(null)}
              className="w-full py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110"
            >
              {t("closeDemo")}
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Protected Website Demo Modal */}
      <WebsiteDemoModal
        design={isWebsiteModalOpen ? design : null}
        initialPageId={selectedPreview?.id}
        onClose={() => setIsWebsiteModalOpen(false)}
      />
    </div>
  );
}

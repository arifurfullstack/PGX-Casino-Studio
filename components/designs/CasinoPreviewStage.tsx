"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Heart, Play, ChevronLeft, ChevronRight, Crown, Sparkles, Layers } from "lucide-react";
import { CasinoDesign } from "@/types";

interface CasinoPreviewStageProps {
  design: CasinoDesign;
}

const FEATURED_GAMES = [
  { id: "sweet-bonanza", name: "Sweet Bonanza", image: "/images/game-sweet-bonanza.png", rtp: "96.5%" },
  { id: "gates-of-olympus", name: "Gates of Olympus", image: "/images/game-gates-of-olympus.png", rtp: "96.5%" },
  { id: "sugar-rush", name: "Sugar Rush", image: "/images/game-sugar-rush.png", rtp: "96.5%" },
  { id: "big-bass-bonanza", name: "Big Bass Bonanza", image: "/images/game-big-bass-bonanza.png", rtp: "96.7%" },
  { id: "buffalo-king", name: "Buffalo King", image: "/images/game-buffalo-king.png", rtp: "96.0%" },
  { id: "book-of-dead", name: "Book of Dead", image: "/images/game-book-of-dead.png", rtp: "96.2%" },
  { id: "fortune-dragon", name: "Fortune Dragon", image: "/images/game-fortune-dragon.png", rtp: "96.8%" },
  { id: "hot-fruits", name: "Hot Fruits", image: "/images/game-hot-fruits.png", rtp: "97.1%" },
  { id: "jokers-jewels", name: "Joker's Jewels", image: "/images/game-jokers-jewels.png", rtp: "96.5%" },
  { id: "wolf-gold", name: "Wolf Gold", image: "/images/game-wolf-gold.png", rtp: "96.0%" },
];

const CATEGORIES = [
  { id: "slots", label: "Slots", image: "/images/cat-slots.png" },
  { id: "live", label: "Live Dealer Casino", image: "/images/cat-live.png" },
  { id: "sports", label: "Sportsbook", image: "/images/cat-sports.png" },
  { id: "poker", label: "Poker Platform", image: "/images/cat-poker.png" },
];

export default function CasinoPreviewStage({ design }: CasinoPreviewStageProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeModalGame, setActiveModalGame] = useState<string | null>(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState<string | null>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const previewList = design.previewImages || [];

  return (
    <div className="flex-1 rounded-2xl bg-[#030007] border-2 border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.35)] overflow-hidden flex flex-col">
      {/* 1. Multi-PNG Suite Switcher Bar (if previews exist) */}
      {previewList.length > 0 && (
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#06010d] border-b border-purple-900/50 overflow-x-auto text-[11px]">
          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider px-1.5 flex items-center gap-1 shrink-0">
            <Layers size={12} className="text-[#FFD700]" />
            <span>Theme Views:</span>
          </span>
          <button
            onClick={() => setSelectedPreviewUrl(null)}
            type="button"
            className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 ${
              selectedPreviewUrl === null
                ? "bg-gradient-to-b from-[#FFE259] to-[#FFA700] text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                : "bg-purple-950/60 text-gray-300 hover:text-white"
            }`}
          >
            Live Simulation
          </button>
          {previewList.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreviewUrl(p.url)}
              type="button"
              className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 ${
                selectedPreviewUrl === p.url
                  ? "bg-gradient-to-b from-[#FFE259] to-[#FFA700] text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                  : "bg-purple-950/60 text-gray-300 hover:text-white"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      {/* 2. Casino Simulation Header */}
      <div className="bg-[#0b0114]/95 border-b border-purple-900/60 px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Crown size={18} className="text-yellow-400 fill-yellow-400" />
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1">
              <span>{design.name}</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-purple-300 font-semibold">Casino</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-gray-300">
          {["Home", "Slots", "Live Dealer Casino", "Sportsbook", "Poker Platform"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedPreviewUrl(null);
                setActiveTab(tab);
              }}
              type="button"
              className={`py-1 transition-colors ${
                activeTab === tab && !selectedPreviewUrl
                  ? "text-yellow-400 border-b border-yellow-400 font-bold"
                  : "hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-500/40 text-gray-300 flex items-center justify-center hover:text-white"
            title="Search Games"
          >
            <Search size={13} />
          </button>
          <button
            type="button"
            onClick={() => alert("Simulation: Player Login Dialog")}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-gray-200 border border-purple-600/60 hover:bg-purple-900/40"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => alert("Simulation: Player Registration Dialog")}
            className="px-3 py-1 rounded-md text-[11px] font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110"
          >
            Register
          </button>
        </div>
      </div>

      {/* 3. Main Stage Content: Switch between uploaded PNG Preview and Live Simulation */}
      {selectedPreviewUrl ? (
        <div className="relative w-full aspect-[16/10] bg-[#0c0218] overflow-hidden flex items-center justify-center p-4">
          <Image
            src={selectedPreviewUrl}
            alt={design.name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      ) : (
        <>
          {/* Casino Hero Interactive Banner */}
          <div className="relative w-full aspect-[1548/440] bg-[#0c0218] overflow-hidden group">
            <Image
              src="/images/casino-demo-hero-royal-hd.png"
              alt="Casino Hero Banner"
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

          {/* Category Cards */}
          <div className="p-3 sm:p-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="relative rounded-xl overflow-hidden border border-purple-500/40 hover:border-yellow-400/80 shadow-[0_0_12px_rgba(168,85,247,0.2)] aspect-[174/60] cursor-pointer group transition-all"
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

          {/* Featured Games Grid */}
          <div className="px-3 sm:px-4 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-yellow-400 rounded-full" />
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Featured Games
                </h3>
              </div>
              <button
                type="button"
                className="text-[11px] font-bold text-yellow-400 hover:underline flex items-center gap-1"
              >
                <span>View All Games</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5">
              {FEATURED_GAMES.map((game) => {
                const isFav = favorites.includes(game.id);
                return (
                  <div
                    key={game.id}
                    onClick={() => setActiveModalGame(game.name)}
                    className="group relative rounded-xl overflow-hidden border border-purple-600/40 hover:border-yellow-400/80 bg-[#090214] aspect-[140/80] cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.15)] hover:shadow-[0_0_18px_rgba(255,215,0,0.4)] transition-all"
                  >
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

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

                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                      <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                        <Play size={12} className="fill-black ml-0.5" />
                      </div>
                      <span className="text-[9px] font-bold uppercase text-yellow-300 tracking-wider">
                        Instant Play
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
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
              <p className="text-xs text-purple-300 mt-1">Live Turnkey Game Simulation</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              In production, this launches the licensed Pragmatic Play / Evolution Gaming iframe with real wallet synchronization.
            </p>
            <button
              type="button"
              onClick={() => setActiveModalGame(null)}
              className="w-full py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110"
            >
              Close Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

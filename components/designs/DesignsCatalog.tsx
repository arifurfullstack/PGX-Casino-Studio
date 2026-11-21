"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";
import { CasinoDesign } from "@/types";
import CasinoDesignCard from "@/components/sections/casino-designs/CasinoDesignCard";

interface DesignsCatalogProps {
  initialDesigns: CasinoDesign[];
}

const CATEGORIES = ["All", "Luxury", "Neon", "VIP", "Classic", "Futuristic"];

export default function DesignsCatalog({ initialDesigns }: DesignsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDesigns = useMemo(() => {
    return initialDesigns.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.subtitle || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === "All") return matchesSearch;
      if (selectedCategory === "Luxury") {
        return matchesSearch && (d.slug.includes("royal") || d.slug.includes("prestige") || d.slug.includes("diamond"));
      }
      if (selectedCategory === "Neon") {
        return matchesSearch && (d.slug.includes("neon") || d.slug.includes("cosmic") || d.slug.includes("lucky"));
      }
      if (selectedCategory === "VIP") {
        return matchesSearch && (d.slug.includes("emerald") || d.slug.includes("elite") || d.slug.includes("ruby"));
      }
      if (selectedCategory === "Classic") {
        return matchesSearch && (d.slug.includes("crown") || d.slug.includes("lucky") || d.slug.includes("gold"));
      }
      if (selectedCategory === "Futuristic") {
        return matchesSearch && (d.slug.includes("cosmic") || d.slug.includes("mystic") || d.slug.includes("ocean"));
      }
      return matchesSearch;
    });
  }, [initialDesigns, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#090214]/80 border border-purple-900/40 backdrop-blur-md">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-black shadow-[0_0_12px_rgba(255,215,0,0.4)]"
                  : "bg-purple-950/40 text-gray-300 hover:text-white border border-purple-800/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search designs..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>
      </div>

      {/* Grid of Designs */}
      {filteredDesigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredDesigns.map((design) => (
            <CasinoDesignCard key={design.id} design={design} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <Sparkles className="mx-auto text-yellow-400" size={32} />
          <p className="text-base font-bold text-gray-300">No casino designs match your filter.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-yellow-400 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

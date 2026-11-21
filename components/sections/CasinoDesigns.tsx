"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CasinoDesign {
  id: string;
  name: string;
  image: string;
}

const casinoDesigns: CasinoDesign[] = [
  { id: "royal-prestige", name: "Royal Prestige", image: "/images/card-royal-prestige-hd.png" },
  { id: "neon-vegas", name: "Neon Vegas", image: "/images/card-neon-vegas-hd.png" },
  { id: "emerald-club", name: "Emerald Club", image: "/images/card-emerald-club-hd.png" },
  { id: "elite-casino", name: "Elite Casino", image: "/images/card-elite-casino-hd.png" },
  { id: "diamond-palace", name: "Diamond Palace", image: "/images/card-diamond-palace-hd.png" },
  { id: "cosmic-casino", name: "Cosmic Casino", image: "/images/card-cosmic-casino-hd.png" },
  { id: "golden-crown", name: "Golden Crown", image: "/images/card-golden-crown-hd.png" },
  { id: "lucky-spin", name: "Lucky Spin", image: "/images/card-lucky-spin-hd.png" },
  { id: "prestige-gold", name: "Prestige Gold", image: "/images/card-prestige-gold-hd.png" },
  { id: "ruby-casino", name: "Ruby Casino", image: "/images/card-ruby-casino-hd.png" },
  { id: "ocean-casino", name: "Ocean Casino", image: "/images/card-ocean-casino-hd.png" },
  { id: "mystic-casino", name: "Mystic Casino", image: "/images/card-mystic-casino-hd.png" },
];

export default function CasinoDesigns() {
  return (
    <section id="designs" className="py-6 sm:py-8 relative">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            CHOOSE YOUR CASINO DESIGN
          </h2>

          <a
            href="#designs"
            className="group inline-flex items-center gap-1 text-[11px] font-bold text-[#FFD700] hover:text-[#FFE57F] transition-colors"
          >
            <span>View All Designs</span>
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform stroke-[2.5]"
            />
          </a>
        </div>

        {/* 12 Cards Grid (4 Columns x 3 Rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {casinoDesigns.map((design) => (
            <div
              key={design.id}
              className="group relative rounded-xl overflow-hidden border border-purple-500/40 hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.55)] transition-all duration-300"
            >
              {/* Full Card Rendered Image (Artwork + Title + Tablet + Stylized Buttons) */}
              <div className="relative w-full aspect-[230/122]">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Interactive Clickable Overlays for View Demo & Select Design */}
                <div className="absolute bottom-1.5 left-2 right-2 h-7 flex items-center gap-2 z-10">
                  {/* View Demo Hitbox */}
                  <button
                    type="button"
                    title={`View Demo for ${design.name}`}
                    className="flex-1 h-full rounded bg-transparent hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
                    onClick={() => alert(`Opening demo for ${design.name}`)}
                  />
                  {/* Select Design Hitbox */}
                  <button
                    type="button"
                    title={`Select Design ${design.name}`}
                    className="flex-1 h-full rounded bg-transparent hover:bg-yellow-400/20 active:bg-yellow-400/30 transition-colors cursor-pointer"
                    onClick={() => alert(`Selected ${design.name}!`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send, ArrowLeft, Check, Plus, TrendingUp } from "lucide-react";
import { CasinoDesign } from "@/types";

interface AddonModule {
  id: string;
  name: string;
  price: number;
  avatar: string;
}

const AVAILABLE_ADDONS: AddonModule[] = [
  {
    id: "live-dealer",
    name: "Live Dealer Casino",
    price: 10000,
    avatar: "/images/addon-live-dealer.png",
  },
  {
    id: "sportsbook",
    name: "Sportsbook",
    price: 10000,
    avatar: "/images/addon-sportsbook.png",
  },
  {
    id: "poker",
    name: "Poker Platform",
    price: 20000,
    avatar: "/images/addon-poker.png",
  },
  {
    id: "sweepstakes",
    name: "Sweepstakes",
    price: 25000,
    avatar: "/images/addon-sweepstakes.png",
  },
];

interface DemoSidebarProps {
  design: CasinoDesign;
}

export default function DemoSidebar({ design }: DemoSidebarProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const basePrice = 15000;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = basePrice + addonsTotal;

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-4 lg:sticky lg:top-24">
      <div className="rounded-2xl bg-[#090214] border border-purple-500/40 p-4 sm:p-5 shadow-[0_0_25px_rgba(168,85,247,0.25)] space-y-4">
        
        {/* Title */}
        <h2 className="text-base sm:text-lg font-black tracking-wide text-white uppercase drop-shadow">
          Casino Design Demo
        </h2>

        {/* Selected Design Mini Preview Card */}
        <div className="relative rounded-xl overflow-hidden border border-purple-500/50 bg-[#0e0420] aspect-[186/76] p-2 flex items-center justify-between">
          <div className="space-y-0.5 z-10">
            <div className="text-[10px] uppercase font-bold text-yellow-400 flex items-center gap-1">
              <span>👑</span>
              <span>{design.name}</span>
            </div>
            <p className="text-[9px] text-gray-400">Selected Demo Look</p>
          </div>
          <div className="relative w-20 h-full rounded overflow-hidden">
            <Image
              src={design.image}
              alt={design.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </div>

        {/* Basic Package Highlight */}
        <div className="rounded-xl bg-gradient-to-r from-purple-950/80 to-[#120324] border border-purple-500/40 p-3 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-1.5 py-0.5 rounded font-black bg-red-600 text-yellow-300">
                777
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">
                Basic Package
              </span>
            </div>
            <span className="text-sm font-black text-yellow-400">
              ${basePrice.toLocaleString()} USD
            </span>
          </div>
          <p className="text-[10px] text-gray-400">
            Casino Table Games &amp; Online Slots Included
          </p>
        </div>

        {/* Add-On Modules Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-300 uppercase tracking-wider">
            <span>Add-On Modules</span>
            <span className="text-[10px] text-yellow-400/90 font-semibold lowercase">
              optional
            </span>
          </div>

          <div className="space-y-1.5">
            {AVAILABLE_ADDONS.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  type="button"
                  className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all text-left ${
                    isSelected
                      ? "bg-purple-900/40 border-yellow-400/80 text-white shadow-[0_0_12px_rgba(255,215,0,0.25)]"
                      : "bg-[#0c031a] border-purple-900/50 hover:border-purple-600/70 text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-purple-400/40 shrink-0">
                      <Image
                        src={addon.avatar}
                        alt={addon.name}
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold leading-tight">{addon.name}</p>
                      <p className="text-[10px] text-yellow-400 font-bold">
                        ${addon.price.toLocaleString()} USD
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-yellow-400 text-black font-black"
                        : "border border-purple-500/50 text-gray-400 hover:text-white"
                    }`}
                  >
                    {isSelected ? <Check size={12} strokeWidth={3} /> : <Plus size={12} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* GGR Revenue Share */}
        <div className="rounded-xl bg-[#0d031e] border border-purple-900/50 p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-purple-950/80 flex items-center justify-center text-yellow-400">
              <TrendingUp size={14} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-200">GGR Share</p>
              <p className="text-[10px] text-gray-400">Our Company: 25%</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-green-400">Your Share: 75%</span>
          </div>
        </div>

        {/* Total Price Bar */}
        <div className="pt-2 border-t border-purple-900/60 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-300">Total Estimate:</span>
          <span className="text-base font-black text-yellow-400 drop-shadow">
            ${totalPrice.toLocaleString()} USD
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <Link
            href={`/select-design?design=${design.slug}&total=${totalPrice}&addons=${selectedAddons.join(",")}`}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 transition-all"
          >
            <span>Select This Design</span>
            <ArrowRight size={14} strokeWidth={3} />
          </Link>

          <Link
            href={`/contact?design=${design.slug}`}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-white bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/50 flex items-center justify-center gap-2 transition-all"
          >
            <Send size={13} className="text-purple-300" />
            <span>Request a Quote</span>
          </Link>

          <Link
            href="/designs"
            className="w-full py-1.5 px-3 rounded-lg text-[11px] font-medium text-gray-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={12} />
            <span>View All Designs</span>
          </Link>
        </div>

      </div>
    </aside>
  );
}

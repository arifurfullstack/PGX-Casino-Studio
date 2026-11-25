"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Crown, User, ShieldCheck } from "lucide-react";
import { NavItem } from "@/config/site-config";

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-gray-200 hover:text-[#ffd700] hover:bg-purple-950/60 border border-purple-500/30 transition-all shadow-[0_0_12px_rgba(168,85,247,0.2)]"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={22} className="text-[#ffd700]" /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 sm:top-20 bg-[#060114]/98 border-b border-purple-800/60 backdrop-blur-2xl px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {items.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-gray-200 hover:text-[#FFD700] py-2.5 border-b border-purple-900/30 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-purple-400/40 text-xs">&rarr;</span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-gray-200 hover:text-[#FFD700] py-2.5 border-b border-purple-900/30 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-purple-400/40 text-xs">&rarr;</span>
                </Link>
              )
            )}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/select-design"
                onClick={() => setIsOpen(false)}
                className="btn-royal-gold w-full py-3.5 text-sm font-black flex items-center justify-center gap-2"
              >
                <Crown size={17} className="fill-black text-black stroke-[1.5]" />
                <span>Reserve A Casino</span>
                <ArrowRight size={15} className="stroke-[3]" />
              </Link>

              <Link
                href="/portal"
                onClick={() => setIsOpen(false)}
                className="btn-nav-portal w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <User size={15} className="text-[#FFD700]" />
                <span>Client Portal</span>
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
                <ShieldCheck size={14} className="text-[#FFD700]" />
                <span>Royal Casino Club &bull; Premium Online Solutions</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

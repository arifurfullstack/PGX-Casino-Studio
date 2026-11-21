"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { NavItem } from "@/config/site-config";

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-purple-950/50 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-14 bg-[#0a0218]/95 border-b border-purple-800/50 backdrop-blur-xl px-4 py-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-gray-300 hover:text-[#FFD700] py-2 border-b border-purple-900/30 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <Link
                href="/#designs"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] rounded-md shadow-[0_0_15px_rgba(255,215,0,0.4)]"
              >
                <span>Explore Designs</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-2">
                <ShieldCheck size={13} className="text-[#FFD700]" />
                <span>Turnkey Solutions &bull; B2B Marketplace</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

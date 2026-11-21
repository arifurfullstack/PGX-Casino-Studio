"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Casino Designs", href: "#designs", active: false },
  { label: "Packages", href: "#packages", active: false },
  { label: "Add-On Modules", href: "#packages", active: false },
  { label: "How It Works", href: "#how-it-works", active: false },
  { label: "About Us", href: "#about", active: false },
  { label: "Contact", href: "#contact", active: false },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#04010a]/95 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo */}
          <a href="#" className="flex items-center shrink-0">
            <Image
              src="/images/alli-logo-hd.png"
              alt="All I Gaming - Casino Platforms & Solutions"
              width={160}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center"
            style={{ display: "flex", alignItems: "center", gap: "22px" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[12px] font-medium transition-all ${
                  link.active
                    ? "text-[#FFD700] px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                    : "text-gray-300 hover:text-white px-1 py-1"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Request a Quote Button */}
          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-semibold text-[#FFD700] rounded-md border border-[#FFD700]/80 bg-purple-950/30 hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,0.25)] hover:shadow-[0_0_18px_rgba(255,215,0,0.5)]"
            >
              <Send size={11} className="text-[#FFD700] group-hover:text-black transition-colors" />
              <span>Request a Quote</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090214]/98 border-b border-purple-900/50 px-4 pt-2 pb-5 space-y-1.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-1.5 text-xs rounded-md font-medium ${
                link.active
                  ? "text-[#FFD700] bg-purple-900/40 border border-purple-500/40"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-semibold text-[#FFD700] rounded-md border border-[#FFD700]/80 bg-purple-950/60"
            >
              <Send size={12} />
              <span>Request a Quote</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

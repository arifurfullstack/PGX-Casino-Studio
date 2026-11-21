"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Send, User } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import MobileNav from "./MobileNav";

export default function Header() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) return null;
  const isDemoPage = pathname.startsWith("/designs/") && pathname !== "/designs";

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#04010a]/90 border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-36 sm:w-48 h-10 sm:h-12">
            <Image
              src="/images/all-i-gaming-logo-official.png"
              alt={SITE_CONFIG.name}
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-semibold text-gray-300">
          {SITE_CONFIG.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`py-1 transition-all relative ${
                  isActive
                    ? "text-[#FFD700] font-bold"
                    : "hover:text-[#FFD700] text-gray-300"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_8px_#FFD700]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Nav */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/portal"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 rounded-lg border border-purple-500/30 transition-all"
            title="B2B Client Portal"
          >
            <User size={13} className="text-[#FFD700]" />
            <span>Client Portal</span>
          </Link>

          {isDemoPage ? (
            <Link
              href="/designs"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-200 hover:text-white bg-purple-950/70 hover:bg-purple-900 rounded-lg border border-purple-500/50 transition-all shadow-[0_0_12px_rgba(168,85,247,0.25)]"
            >
              <ArrowLeft size={13} />
              <span>Back to Designs</span>
            </Link>
          ) : (
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] rounded-lg shadow-[0_0_18px_rgba(255,215,0,0.35)] hover:shadow-[0_0_24px_rgba(255,215,0,0.6)] hover:brightness-110 transition-all duration-300"
            >
              <Send size={13} className="text-black stroke-[2.5]" />
              <span>Request a Quote</span>
            </Link>
          )}

          <MobileNav items={SITE_CONFIG.navItems} />
        </div>
      </div>
    </header>
  );
}

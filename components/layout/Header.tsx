import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#04010a]/85 border-b border-purple-900/40">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-28 sm:w-32 h-8 sm:h-9">
            <Image
              src="/images/alli-logo-clean.png"
              alt={SITE_CONFIG.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-gray-300">
          {SITE_CONFIG.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[#FFD700] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Nav */}
        <div className="flex items-center gap-3">
          <Link
            href="/#designs"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] rounded-md shadow-[0_0_15px_rgba(255,215,0,0.35)] hover:shadow-[0_0_20px_rgba(255,215,0,0.6)] hover:brightness-110 transition-all duration-300"
          >
            <span>Explore Designs</span>
            <ArrowRight size={13} className="stroke-[2.5]" />
          </Link>

          <MobileNav items={SITE_CONFIG.navItems} />
        </div>
      </div>
    </header>
  );
}

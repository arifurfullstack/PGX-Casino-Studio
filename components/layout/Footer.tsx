"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, Send } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) return null;

  return (
    <footer id="contact" className="relative pt-12 pb-8 border-t border-purple-900/40 bg-[#030107]">
      {/* Top golden accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-purple-950/60">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative w-44 sm:w-52 h-12 sm:h-14">
              <Image
                src="/images/all-i-gaming-logo-official.png"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              All I Gaming provides premium turnkey B2B online casino software solutions. Choose your design, customize optional modules, and launch your branded casino.
            </p>
            <p className="text-[11px] text-[#FFD700]/80">
              *B2B software marketplace. We do not operate gambling activities.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-[#FFD700] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Business Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#FFD700] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#FFD700] shrink-0" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.whatsapp} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send size={16} className="text-[#FFD700] shrink-0" />
                <span>{SITE_CONFIG.contact.telegram} (Telegram)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© 2026 {SITE_CONFIG.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Turnkey B2B Marketplace</span>
            <span className="text-gray-600">|</span>
            <span>$500 Refundable Reservation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 4 Column Layout matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-purple-950/60">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-3">
            <div className="relative w-44 sm:w-52 h-12 sm:h-14">
              <Image
                src="/images/all-i-gaming-logo-official.png"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              All I Gaming provides premier turnkey online casino software solutions, empowering operators to launch customized, high-converting gaming brands worldwide.
            </p>
            <p className="text-[10px] text-[#FFD700]/80">
              *B2B software marketplace. We do not operate gambling activities.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#FFD700] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/designs" className="hover:text-[#FFD700] transition-colors">
                  Casino Designs
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-[#FFD700] transition-colors">
                  Add-On Modules
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#FFD700] transition-colors">
                  Starter Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/how-it-works" className="hover:text-[#FFD700] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFD700] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFD700] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-[#FFD700] transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Get in Touch */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#FFD700] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#FFD700] shrink-0" />
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
                <Send size={15} className="text-[#FFD700] shrink-0" />
                <Link href="/select-design" className="text-[#FFD700] font-bold hover:underline">
                  Reserve A Casino ($500 Hold)
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Terms matching mockup */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
          <p>© 2026 {SITE_CONFIG.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, Crown } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) return null;

  return (
    <footer className="border-t border-gold/50 bg-[#07020d]">
      <div className="mx-auto grid max-w-[1672px] gap-8 px-4 pb-8 pt-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[auto_1.5fr_1fr_1fr_1.6fr] lg:px-12">
        
        {/* Brand Logo */}
        <div className="flex items-start lg:items-center">
          <BrandLogo sizeClassName="w-40 sm:w-44 lg:w-[185px]" />
        </div>

        {/* Description */}
        <p className="text-[15px] leading-relaxed text-muted lg:border-l lg:border-line lg:pl-6">
          Royal Casino Club provides premium turnkey online casino software solutions, empowering operators to launch customized, high-converting casinos worldwide.
        </p>

        {/* Quick Links */}
        <div className="lg:border-l lg:border-line lg:pl-6">
          <h4 className="text-sm font-bold uppercase tracking-wide">Quick links</h4>
          <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
            <li>
              <Link className="hover:text-gold transition-colors" href="/#top">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold transition-colors" href="/#designs">
                Casino Designs
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold transition-colors" href="/#addons">
                Add-On Modules
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold transition-colors" href="/#packages">
                Packages
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="lg:border-l lg:border-line lg:pl-6">
          <h4 className="text-sm font-bold uppercase tracking-wide">Company</h4>
          <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
            <li>
              <Link className="hover:text-gold transition-colors" href="/#how-it-works">
                How It Works
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold transition-colors" href="/#about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold transition-colors" href="/#contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold transition-colors" href="/portal">
                Client Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="lg:border-l lg:border-line lg:pl-6">
          <h4 className="text-sm font-bold uppercase tracking-wide">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href="mailto:contact@royalcasinoclub.com" className="break-all hover:text-gold transition-colors">
                contact@royalcasinoclub.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href="https://wa.me/14167256538?text=Hi%20Royal%20Casino%20Club%2C%20I%27d%20like%20to%20know%20more."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                +1 (416) 725-6538 (WhatsApp)
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Crown className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href="https://wa.me/14167256538?text=Hi%20Royal%20Casino%20Club%2C%20I%27d%20like%20to%20reserve%20a%20casino."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gold hover:underline"
              >
                Reserve A Casino ($1,000 USD Hold)
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Sub Footer Bar */}
      <div className="mx-auto flex max-w-[1672px] flex-wrap justify-between gap-2 border-t border-gold/30 px-4 py-5 sm:px-6 lg:px-12 text-sm text-muted">
        <span>© 2026 {SITE_CONFIG.name}. All Rights Reserved.</span>
        <a
          href="https://www.huipper.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          Developed by Huipper
        </a>
      </div>
    </footer>
  );
}

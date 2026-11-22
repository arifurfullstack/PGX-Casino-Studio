"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  LayoutDashboard,
  Clock,
  FileSpreadsheet,
  Milestone,
  ExternalLink,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Building2,
  Crown,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { logoutCustomerAction } from "@/app/actions/customerAuthActions";

interface PortalSidebarProps {
  user: {
    fullName: string;
    companyName?: string;
    email: string;
  };
}

const navItems = [
  {
    href: "/portal",
    label: "Client Overview",
    caption: "Dashboard & KPI summary",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/portal/reservations",
    label: "My Reservations",
    caption: "5% price-lock & receipts",
    icon: Clock,
    exact: false,
  },
  {
    href: "/portal/quotes",
    label: "Saved Configurations",
    caption: "Custom casino packages",
    icon: FileSpreadsheet,
    exact: false,
  },
  {
    href: "/portal/milestones",
    label: "Launch Roadmap",
    caption: "5-phase turnkey delivery",
    icon: Milestone,
    exact: false,
  },
];

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function PortalSidebar({ user }: PortalSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  // GSAP sidebar entrance & subtle hover micro-interactions
  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;

    const cleanups: Array<() => void> = [];
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".js-sidebar-brand",
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: "transform,opacity" }
        )
          .fromTo(
            ".js-sidebar-profile",
            { opacity: 0, y: 14, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, clearProps: "transform,opacity" },
            "-=0.35"
          )
          .fromTo(
            ".js-sidebar-nav-item",
            { opacity: 0, x: -18 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.075,
              clearProps: "transform,opacity",
            },
            "-=0.35"
          )
          .fromTo(
            ".js-sidebar-footer",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, clearProps: "transform,opacity" },
            "-=0.25"
          );

        aside.querySelectorAll<HTMLElement>(".js-sidebar-nav-item").forEach((item) => {
          const iconBox = item.querySelector<HTMLElement>(".js-sidebar-icon");
          const arrow = item.querySelector<HTMLElement>(".js-sidebar-arrow");

          const onEnter = () => {
            gsap.to(item, { x: 4, duration: 0.28, ease: "power2.out", overwrite: "auto" });
            if (iconBox) {
              gsap.to(iconBox, { scale: 1.08, duration: 0.28, ease: "power2.out", overwrite: "auto" });
            }
            if (arrow) {
              gsap.to(arrow, { x: 3, opacity: 1, duration: 0.28, ease: "power2.out", overwrite: "auto" });
            }
          };

          const onLeave = () => {
            gsap.to(item, { x: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
            if (iconBox) {
              gsap.to(iconBox, { scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
            }
            if (arrow) {
              gsap.to(arrow, { x: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
            }
          };

          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
          });
        });
      }, aside);

      return () => {
        cleanups.forEach((fn) => fn());
        ctx.revert();
      };
    });

    return () => {
      cleanups.forEach((fn) => fn());
      mm.revert();
    };
  }, []);

  // GSAP slide-in for mobile drawer
  useEffect(() => {
    if (!mobileOpen || !mobileDrawerRef.current) return;
    gsap.fromTo(
      mobileDrawerRef.current,
      { x: -320, opacity: 0.7 },
      { x: 0, opacity: 1, duration: 0.38, ease: "power3.out" }
    );
  }, [mobileOpen]);

  const initials = getInitials(user.fullName || "VIP");

  const navContent = (
    <div className="relative flex flex-col h-full justify-between overflow-y-auto">
      {/* Subtle Top Royal Aura inside Sidebar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-52 rounded-full blur-[70px] opacity-65"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217, 70, 239, 0.32) 0%, rgba(245, 196, 81, 0.14) 55%, transparent 78%)",
        }}
      />

      <div className="relative z-10">
        {/* Brand Header */}
        <div className="px-6 pt-7 pb-6 border-b border-[#d696ff]/20">
          <div className="js-sidebar-brand flex flex-col items-start gap-3">
            <Link href="/" className="group flex items-center gap-3 w-full">
              <div className="relative w-44 h-[78px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
                <Image
                  src="/images/royal-hero/royal-hero-logo-perfect.png"
                  alt="Royal Casino Club"
                  fill
                  className="object-contain object-left drop-shadow-[0_4px_18px_rgba(245,196,81,0.35)]"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#240942]/80 border border-[#f5c451]/45 shadow-[0_0_16px_rgba(245,196,81,0.16)]">
              <Crown size={13} className="text-[#f5c451] fill-[#f5c451]/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffe28a]">
                VIP Client Portal
              </span>
            </div>
          </div>

          {/* Enlarged Luxury Client Dossier Card */}
          <div className="js-sidebar-profile group mt-5 p-4 rounded-2xl bg-gradient-to-br from-[#340d5c]/75 via-[#1b0734]/90 to-[#110422]/95 border border-[#d696ff]/40 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,244,204,0.2)] transition-all duration-400 hover:border-[#f5ce6e]/65">
            <div className="flex items-center gap-3.5">
              {/* Gold-ringed Monogram Avatar */}
              <div className="relative shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#fff3b0] via-[#f5c451] to-[#b9770a] p-[1.5px] shadow-[0_0_18px_rgba(245,196,81,0.35)]">
                <div className="w-full h-full rounded-[10px] bg-[#17052d] flex items-center justify-center font-philosopher font-bold text-base gold-text">
                  {initials}
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#140527] shadow-[0_0_10px_rgba(52,211,153,0.85)]"
                  title="Verified Operator"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-philosopher text-[17px] font-bold text-white leading-tight truncate">
                  {user.fullName}
                </p>
                {user.companyName && (
                  <p className="text-xs font-semibold text-[#f5c451] truncate flex items-center gap-1.5 mt-1">
                    <Building2 size={12} className="shrink-0" />
                    <span className="truncate">{user.companyName}</span>
                  </p>
                )}
                <p className="text-xs text-white/60 truncate mt-0.5 tabular-nums">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                <ShieldCheck size={13} className="text-emerald-400" />
                Verified Account
              </span>
              <span className="text-[#ffe28a]/85 font-semibold tracking-wide">
                B2B Suite
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-5 py-6">
          <p className="px-3 mb-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f5c451]/75 flex items-center gap-2">
            <Sparkles size={12} className="text-[#f5c451]" />
            <span>Operator Workspace</span>
          </p>

          <nav className="space-y-2.5">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`js-sidebar-nav-item group portal-nav-item flex items-center gap-3.5 px-4 py-3.5 rounded-2xl ${
                    active
                      ? "portal-nav-item-active text-[#ffe28a]"
                      : "text-white/80 hover:text-white hover:bg-[#2a0a4a]/55 hover:border-[#d696ff]/40"
                  }`}
                >
                  {/* Active Gold Edge Bar */}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-3 bottom-3 w-[3.5px] rounded-r-full bg-gradient-to-b from-[#fff3b0] via-[#f5c451] to-[#d97706] shadow-[0_0_12px_rgba(245,196,81,0.9)]"
                    />
                  )}

                  {/* Glowing Icon Medallion */}
                  <span
                    className={`js-sidebar-icon portal-icon-medallion shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                      active ? "portal-icon-medallion-active" : ""
                    }`}
                  >
                    <Icon
                      size={19}
                      className={
                        active
                          ? "gold-icon"
                          : "text-[#e5b8ff] group-hover:text-[#f5c451] transition-colors duration-300"
                      }
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[15px] font-bold leading-snug truncate transition-colors ${
                        active
                          ? "text-[#ffe28a]"
                          : "text-white/95 group-hover:text-[#ffe28a]"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-white/55 truncate mt-0.5 group-hover:text-white/75 transition-colors">
                      {item.caption}
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`js-sidebar-arrow shrink-0 transition-all ${
                      active
                        ? "text-[#f5c451] opacity-100"
                        : "text-white/35 opacity-60 group-hover:text-[#f5c451]"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Luxury Footer Actions & Concierge Desk */}
      <div className="js-sidebar-footer relative z-10 px-5 pb-6 pt-5 border-t border-[#d696ff]/20 space-y-3">
        {/* VIP Concierge Highlight */}
        <a
          href="https://wa.me/14167256538?text=Hello%20Royal%20Casino%20Club%2C%20I%20am%20in%20my%20VIP%20Client%20Portal%20and%20would%20like%20assistance."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#122625]/70 to-[#16072b]/80 border border-emerald-400/35 hover:border-emerald-300/75 shadow-[0_8px_24px_-12px_rgba(16,185,129,0.45)] hover:shadow-[0_0_24px_rgba(52,211,153,0.28)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
            <MessageSquare size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-emerald-200 group-hover:text-white transition-colors">
              VIP Account Manager
            </p>
            <p className="text-[11px] text-emerald-300/75 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              24/7 Priority WhatsApp
            </p>
          </div>
        </a>

        <Link
          href="/designs"
          className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-[#ffe28a] bg-white/[0.03] hover:bg-[#2a0a4a]/55 border border-white/10 hover:border-[#f5c451]/45 transition-all duration-300"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink size={16} className="text-[#f5c451]" />
            <span>Browse Casino Designs</span>
          </span>
          <ChevronRight
            size={15}
            className="text-white/40 group-hover:text-[#f5c451] group-hover:translate-x-0.5 transition-all"
          />
        </Link>

        <form action={logoutCustomerAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold text-rose-300 hover:text-rose-200 bg-rose-950/25 hover:bg-rose-950/55 border border-rose-500/25 hover:border-rose-400/55 transition-all duration-300 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile & Tablet Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3.5 bg-[#0e041d]/95 backdrop-blur-xl border-b border-[#d696ff]/25 sticky top-0 z-40 shadow-[0_8px_28px_rgba(0,0,0,0.65)]">
        <Link href="/portal" className="relative w-36 h-11">
          <Image
            src="/images/royal-hero/royal-hero-logo-perfect.png"
            alt="Royal Casino Club"
            fill
            className="object-contain object-left"
            unoptimized
          />
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/75 border border-[#f5c451]/40 text-xs font-bold text-[#ffe28a]">
            <Crown size={12} className="text-[#f5c451]" />
            {user.fullName}
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle portal navigation"
            className="p-2.5 text-[#ffe28a] hover:text-white rounded-xl bg-[#240942]/80 border border-[#d696ff]/45 shadow-[0_0_16px_rgba(168,85,247,0.3)] transition-all"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        >
          <div
            ref={mobileDrawerRef}
            className="portal-sidebar-surface w-[320px] max-w-[88vw] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Enlarged Luxury Sidebar */}
      <aside
        ref={asideRef}
        className="hidden lg:block w-80 xl:w-[340px] shrink-0 portal-sidebar-surface h-screen sticky top-0 z-30"
      >
        {navContent}
      </aside>
    </>
  );
}

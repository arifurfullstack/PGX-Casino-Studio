"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const initials = getInitials(user.fullName || "VIP");

  const navContent = (
    <div className="relative flex flex-col h-full justify-between overflow-y-auto">
      <div className="relative z-10">
        {/* Brand Header */}
        <div className="px-4 pt-4 pb-4 border-b border-[#d696ff]/15">
          <div className="flex flex-col items-start gap-2">
            <Link href="/" className="flex items-center w-full">
              <div className="relative w-32 h-12">
                <Image
                  src="/images/royal-hero/royal-hero-logo-perfect.png"
                  alt="Royal Casino Club"
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#240942]/80 border border-[#f5c451]/40">
              <Crown size={11} className="text-[#f5c451]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ffe28a]">
                VIP Client Portal
              </span>
            </div>
          </div>

          {/* Compact Client Profile Card */}
          <div className="mt-3.5 p-3 rounded-xl bg-[#16062b]/90 border border-[#d696ff]/25">
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#fff3b0] via-[#f5c451] to-[#b9770a] p-[1.5px]">
                <div className="w-full h-full rounded-[6px] bg-[#17052d] flex items-center justify-center font-philosopher font-bold text-xs gold-text">
                  {initials}
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#140527]"
                  title="Verified Operator"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-philosopher text-sm font-bold text-white leading-tight truncate">
                  {user.fullName}
                </p>
                {user.companyName && (
                  <p className="text-[11px] font-semibold text-[#f5c451] truncate flex items-center gap-1 mt-0.5">
                    <Building2 size={10} className="shrink-0" />
                    <span className="truncate">{user.companyName}</span>
                  </p>
                )}
                <p className="text-[11px] text-white/55 truncate tabular-nums">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
              <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                <ShieldCheck size={11} className="text-emerald-400" />
                Verified Account
              </span>
              <span className="text-[#ffe28a]/80 font-semibold">B2B Suite</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3.5 py-4">
          <p className="px-2.5 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5c451]/75 flex items-center gap-1.5">
            <Sparkles size={10} className="text-[#f5c451]" />
            <span>Operator Workspace</span>
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group portal-nav-item flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                    active
                      ? "portal-nav-item-active text-[#ffe28a]"
                      : "text-white/80 hover:text-white hover:bg-[#2a0a4a]/45 hover:border-[#d696ff]/30"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-[#fff3b0] via-[#f5c451] to-[#d97706]"
                    />
                  )}

                  <span
                    className={`portal-icon-medallion shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      active ? "portal-icon-medallion-active" : ""
                    }`}
                  >
                    <Icon
                      size={15}
                      className={
                        active
                          ? "text-[#f5c451]"
                          : "text-[#e5b8ff] group-hover:text-[#f5c451] transition-colors duration-150"
                      }
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[13px] font-bold leading-snug truncate ${
                        active
                          ? "text-[#ffe28a]"
                          : "text-white/95 group-hover:text-[#ffe28a]"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-[11px] text-white/50 truncate">
                      {item.caption}
                    </p>
                  </div>

                  <ChevronRight
                    size={14}
                    className={`shrink-0 ${
                      active
                        ? "text-[#f5c451]"
                        : "text-white/30 group-hover:text-[#f5c451]"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Actions & Concierge Desk */}
      <div className="relative z-10 px-3.5 pb-4 pt-3.5 border-t border-[#d696ff]/15 space-y-2">
        <a
          href="https://wa.me/14164770191?text=Hello%20Royal%20Casino%20Club%2C%20I%20am%20in%20my%20VIP%20Client%20Portal%20and%20would%20like%20assistance."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-950/45 border border-emerald-400/30 hover:border-emerald-300/60 transition-colors duration-150"
        >
          <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/35 flex items-center justify-center text-emerald-300">
            <MessageSquare size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-emerald-200 group-hover:text-white transition-colors">
              VIP Account Manager
            </p>
            <p className="text-[10px] text-emerald-300/75 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              24/7 Priority WhatsApp
            </p>
          </div>
        </a>

        <Link
          href="/designs"
          className="group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-white/80 hover:text-[#ffe28a] bg-white/[0.03] hover:bg-[#2a0a4a]/45 border border-white/10 hover:border-[#f5c451]/40 transition-colors duration-150"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} className="text-[#f5c451]" />
            <span>Browse Casino Designs</span>
          </span>
          <ChevronRight size={13} className="text-white/40 group-hover:text-[#f5c451]" />
        </Link>

        <form action={logoutCustomerAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-rose-300 hover:text-rose-200 bg-rose-950/25 hover:bg-rose-950/45 border border-rose-500/25 hover:border-rose-400/45 transition-colors duration-150 cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile & Tablet Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-[#0e041d]/95 border-b border-[#d696ff]/20 sticky top-0 z-40">
        <Link href="/portal" className="relative w-28 h-9">
          <Image
            src="/images/royal-hero/royal-hero-logo-perfect.png"
            alt="Royal Casino Club"
            fill
            className="object-contain object-left"
            unoptimized
          />
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/75 border border-[#f5c451]/35 text-[11px] font-bold text-[#ffe28a]">
            <Crown size={11} className="text-[#f5c451]" />
            {user.fullName}
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle portal navigation"
            className="p-2 text-[#ffe28a] hover:text-white rounded-lg bg-[#240942]/80 border border-[#d696ff]/35 transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="portal-sidebar-surface w-[260px] max-w-[85vw] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-60 xl:w-64 shrink-0 portal-sidebar-surface h-screen sticky top-0 z-30">
        {navContent}
      </aside>
    </>
  );
}

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
  Building,
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
  { href: "/portal", label: "Client Overview", icon: LayoutDashboard, exact: true },
  { href: "/portal/reservations", label: "My Reservations (5% Lock)", icon: Clock, exact: false },
  { href: "/portal/quotes", label: "Saved Configurations", icon: FileSpreadsheet, exact: false },
  { href: "/portal/milestones", label: "Launch Roadmap", icon: Milestone, exact: false },
];

export default function PortalSidebar({ user }: PortalSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-purple-900/40">
          <Link href="/portal" className="flex items-center gap-3">
            <div className="relative w-36 h-10">
              <Image
                src="/images/all-i-gaming-logo-official.png"
                alt="All I Gaming"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </Link>

          {/* User Profile Pill */}
          <div className="mt-3.5 p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30">
            <p className="text-xs font-bold text-white truncate">{user.fullName}</p>
            {user.companyName && (
              <p className="text-[10px] text-[#FFD700] truncate flex items-center gap-1 mt-0.5">
                <Building size={10} />
                <span>{user.companyName}</span>
              </p>
            )}
            <p className="text-[10px] text-gray-500 truncate font-mono">{user.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? "bg-purple-950/80 text-[#FFD700] border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} className={active ? "text-[#FFD700]" : "text-gray-400"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / VIP Account Manager */}
      <div className="p-4 border-t border-purple-900/40 space-y-2">
        <a
          href="https://wa.me/14167256556?text=Hello%20All%20I%20Gaming%2C%20I%20am%20in%20my%20B2B%20Client%20Portal%20and%20would%20like%20assistance."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-400 hover:bg-emerald-950/30 border border-emerald-500/20 transition-colors"
        >
          <MessageSquare size={14} />
          <span>VIP Account Manager</span>
        </a>

        <Link
          href="/designs"
          className="flex items-center justify-between px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={13} />
            <span>Browse More Designs</span>
          </span>
        </Link>

        <form action={logoutCustomerAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
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
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0a0316] border-b border-purple-900/50 sticky top-0 z-40">
        <div className="relative w-32 h-8">
          <Image
            src="/images/all-i-gaming-logo-official.png"
            alt="All I Gaming"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-gray-300 hover:text-white rounded-lg bg-purple-950/60 border border-purple-500/40"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-64 max-w-[80vw] h-full bg-[#0a0316] border-r border-purple-900/60"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#070110] border-r border-purple-900/40 min-h-screen sticky top-0">
        {navContent}
      </aside>
    </>
  );
}

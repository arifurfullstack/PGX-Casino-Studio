"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  MessageSquare,
  Clock,
  DollarSign,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { logoutAdminAction } from "@/app/actions/adminAuthActions";

const navItems = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/designs",
    label: "Casino Designs",
    icon: Palette,
    exact: false,
  },
  {
    href: "/admin/inquiries",
    label: "Inquiries CRM",
    icon: MessageSquare,
    exact: false,
  },
  {
    href: "/admin/reservations",
    label: "Reservations & Holds",
    icon: Clock,
    exact: false,
  },
  {
    href: "/admin/customers",
    label: "Customers",
    icon: Users,
    exact: false,
  },
  {
    href: "/admin/pricing",
    label: "Pricing & Modules",
    icon: DollarSign,
    exact: false,
  },
  {
    href: "/admin/settings",
    label: "Gateways & Email",
    icon: Settings,
    exact: false,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (itemHref: string, exact: boolean) => {
    if (exact) return pathname === itemHref;
    return pathname.startsWith(itemHref);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Admin Header / Logo */}
        <div className="p-6 border-b border-purple-900/40">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-44 h-11">
              <Image
                src="/images/all-i-gaming-logo-official.png"
                alt="All I Gaming"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
          </Link>
          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-xs font-bold text-[#FFD700] uppercase tracking-wider">
            <ShieldCheck size={15} />
            <span>Admin Control Center</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-purple-950/85 text-[#FFD700] border border-purple-500/50 shadow-[0_0_16px_rgba(168,85,247,0.28)]"
                    : "text-gray-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                }`}
              >
                <Icon size={19} className={active ? "text-[#FFD700]" : "text-gray-400"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-purple-900/40 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink size={16} />
            <span>View Live Site</span>
          </span>
          <span className="text-xs bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-md font-semibold">
            Live
          </span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
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
      {/* Mobile Top Navbar Bar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3.5 bg-[#0a0316] border-b border-purple-900/50 sticky top-0 z-40">
        <div className="relative w-36 h-9">
          <Image
            src="/images/all-i-gaming-logo-official.png"
            alt="All I Gaming"
            fill
            className="object-contain object-left"
            unoptimized
          />
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 text-gray-200 hover:text-white rounded-xl bg-purple-950/60 border border-purple-500/40 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-[#0a0316] border-r border-purple-900/60"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 xl:w-[296px] shrink-0 bg-[#070110] border-r border-purple-900/40 min-h-screen sticky top-0 self-start">
        {navContent}
      </aside>
    </>
  );
}

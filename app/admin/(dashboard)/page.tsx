import Link from "next/link";
import { Plus, Settings, ShieldCheck, CreditCard } from "lucide-react";
import { getAllInquiries } from "@/services/inquiryService";
import { getAllReservations, getExpiringReservationsCount } from "@/services/reservationService";
import { getAllDesignsAdmin } from "@/services/casinoService";
import { getPricingConfig } from "@/services/pricingService";

import OverviewKpiCards from "@/components/admin/OverviewKpiCards";
import OverviewRecentInquiries from "@/components/admin/OverviewRecentInquiries";
import OverviewActiveHolds from "@/components/admin/OverviewActiveHolds";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverviewPage() {
  const [inquiries, reservations, designs, pricingConfig] = await Promise.all([
    getAllInquiries(),
    getAllReservations(),
    getAllDesignsAdmin(),
    getPricingConfig(),
  ]);

  const newInquiriesCount = inquiries.filter((i) => i.status === "new_inquiry").length;
  const activeReservations = reservations.filter((r) => r.status === "active");
  const totalPipelineValue = activeReservations.reduce(
    (sum, r) => sum + r.discountedPrice,
    0
  );
  const activeDesignsCount = designs.filter((d) => d.status === "active").length;

  const expiringReservationsCount = getExpiringReservationsCount(activeReservations);

  const completedAgreementsCount = reservations.filter(
    (r) => r.status === "agreement_completed"
  ).length;

  const pendingRefundsCount = reservations.filter(
    (r) => r.status === "refund_pending" || r.status === "expired"
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              Operations Overview
            </h1>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Engine</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Real-time pipeline monitoring, customer inquiries, and 5-day $500 reservation holdings.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/designs/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          >
            <Plus size={15} className="stroke-[2.5]" />
            <span>Add Casino Theme</span>
          </Link>
          <Link
            href="/admin/pricing"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-gray-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 transition-all"
          >
            <Settings size={14} />
            <span>Pricing Config</span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-gray-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 transition-all"
          >
            <CreditCard size={14} />
            <span>Gateways &amp; Email</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <OverviewKpiCards
        totalInquiries={inquiries.length}
        newInquiriesCount={newInquiriesCount}
        activeReservationsCount={activeReservations.length}
        expiringReservationsCount={expiringReservationsCount}
        completedAgreementsCount={completedAgreementsCount}
        pendingRefundsCount={pendingRefundsCount}
        totalPipelineValue={totalPipelineValue}
        activeDesignsCount={activeDesignsCount}
        totalDesignsCount={designs.length}
        starterPrice={pricingConfig.starterPackagePrice}
      />

      {/* 2-Column Split: Inquiries CRM & 5-Day Holds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewRecentInquiries inquiries={inquiries} />
        <OverviewActiveHolds reservations={reservations} />
      </div>

      {/* Infrastructure & Integration Status Pill */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#FFD700]" />
          <span>
            B2B Platform Ready: <strong className="text-white">Next.js 16</strong> • MongoDB Cluster Connected • Cloudinary Multi-PNG Ready
          </span>
        </div>
        <div className="text-[11px] text-gray-500">
          Turnkey 5-day price guarantee active at 5% discount
        </div>
      </div>
    </div>
  );
}

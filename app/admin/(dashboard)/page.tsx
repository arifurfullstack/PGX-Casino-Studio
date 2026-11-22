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
    <div className="space-y-8">
      {/* Top Banner / Actions */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-6 border-b border-purple-900/40">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Operations Overview
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-xs font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Engine</span>
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mt-1.5">
            Real-time pipeline monitoring, customer inquiries, and 5-day ${pricingConfig.reservationFee} reservation holdings.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/designs/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
          >
            <Plus size={18} className="stroke-[2.5]" />
            <span>Add Casino Theme</span>
          </Link>
          <Link
            href="/admin/pricing"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 transition-all"
          >
            <Settings size={16} />
            <span>Pricing Config</span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 transition-all"
          >
            <CreditCard size={16} />
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <OverviewRecentInquiries inquiries={inquiries} />
        <OverviewActiveHolds reservations={reservations} />
      </div>

      {/* Infrastructure & Integration Status Pill */}
      <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-900/40 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={20} className="text-[#FFD700] shrink-0" />
          <span>
            B2B Platform Ready: <strong className="text-white">Next.js 16</strong> • MongoDB Cluster • Protected Demo UI Viewer Active
          </span>
        </div>
        <div className="text-xs sm:text-sm text-gray-400">
          Turnkey {Math.max(1, Math.round(pricingConfig.reservationDurationHours / 24))}-day price guarantee active at {pricingConfig.reservationDiscountPercent}% discount
        </div>
      </div>
    </div>
  );
}

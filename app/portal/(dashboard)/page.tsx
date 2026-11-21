import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  Milestone,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { getCustomerDashboardData } from "@/services/customerPortalService";

export const dynamic = "force-dynamic";

export default async function CustomerPortalOverviewPage() {
  const session = await getCustomerSession();
  if (!session) {
    redirect("/portal/login");
  }

  const data = await getCustomerDashboardData(session.email);
  const activeHold = data?.activeReservation;

  const getRemainingTime = (expiresAtStr: string) => {
    const diff = new Date(expiresAtStr).getTime() - Date.now();
    if (diff <= 0) return "Hold Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m left`;
  };

  return (
    <div className="space-y-6">
      {/* Top Greeting Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#100326] to-[#080214] border border-purple-500/40 relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-[10px] font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck size={11} />
                <span>Verified Client Portal</span>
              </span>
              {session.companyName && (
                <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                  <Building size={11} />
                  <span>{session.companyName}</span>
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Welcome back, {session.fullName}!
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Track your casino turnkey setup, active 5-day reservations, and project onboarding milestones.
            </p>
          </div>

          <Link
            href="/designs"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_15px_rgba(255,215,0,0.35)] transition-all shrink-0"
          >
            <span>Configure New Platform</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* Active 5-Day Reservation Highlight Banner */}
      {activeHold ? (
        <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 via-purple-950/40 to-[#080214] border border-[#FFD700]/50 shadow-[0_0_25px_rgba(255,215,0,0.15)] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#FFD700]" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Active 5-Day Price Lock ({activeHold.reservationId})
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[11px] font-bold text-[#FFD700] self-start sm:self-auto">
              {getRemainingTime(activeHold.expiresAt)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-purple-900/40 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 uppercase">Selected Theme:</span>
              <p className="font-bold text-white mt-0.5">{activeHold.selectedDesignName}</p>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase">Original Price:</span>
              <p className="font-medium text-gray-300 mt-0.5">${activeHold.originalPackagePrice.toLocaleString()} USD</p>
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 uppercase font-bold">5% Discount Locked:</span>
              <p className="font-bold text-emerald-400 mt-0.5">-${Math.round(activeHold.originalPackagePrice * 0.05).toLocaleString()} USD</p>
            </div>
            <div>
              <span className="text-[10px] text-[#FFD700] uppercase font-bold">Balance Due:</span>
              <p className="font-black text-[#FFD700] text-sm mt-0.5">${activeHold.remainingBalance.toLocaleString()} USD</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-300">
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-[#FFD700]" />
            <span>
              Lock in your selected casino theme with a <strong>5% discount</strong> and <strong>120-hour price freeze</strong> for a $500 refundable deposit.
            </span>
          </div>
          <Link
            href="/designs"
            className="text-xs font-bold text-[#FFD700] hover:text-[#FFE57F] inline-flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Browse Designs</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#080214] border border-purple-900/40 space-y-1">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Total Quotations
          </span>
          <p className="text-2xl font-black text-white">{data?.totalQuotesCount || 0}</p>
          <p className="text-[11px] text-gray-500">Custom packages submitted</p>
        </div>

        <div className="p-4 rounded-xl bg-[#080214] border border-purple-900/40 space-y-1">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Active 5-Day Holds
          </span>
          <p className="text-2xl font-black text-[#FFD700]">{activeHold ? 1 : 0}</p>
          <p className="text-[11px] text-gray-500">5% discount locked</p>
        </div>

        <div className="p-4 rounded-xl bg-[#080214] border border-purple-900/40 space-y-1">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Onboarding Roadmap
          </span>
          <p className="text-2xl font-black text-emerald-400">Phase 1 / 5</p>
          <p className="text-[11px] text-gray-500">Architecture &amp; design selected</p>
        </div>
      </div>

      {/* Two-Column: Roadmap Teaser & VIP Coordination */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Roadmap Snapshot */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#080214] border border-purple-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Milestone size={16} className="text-[#FFD700]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Turnkey Casino Launch Roadmap
              </h3>
            </div>
            <Link
              href="/portal/milestones"
              className="text-xs font-semibold text-[#FFD700] hover:underline"
            >
              View Full Stages →
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">Stage 1: Architecture &amp; Theme Selected</p>
                <p className="text-[11px] text-gray-400">Design look chosen, initial package quotation generated.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/30">
              <span className="w-4 h-4 rounded-full bg-yellow-400 text-black text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <p className="text-xs font-bold text-white">Stage 2: Licensing &amp; Commercial Agreement</p>
                <p className="text-[11px] text-gray-400">Contract review, formal invoice credit of $500 reservation fee.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 opacity-60">
              <span className="w-4 h-4 rounded-full bg-gray-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <p className="text-xs font-bold text-gray-300">Stage 3: Domain, DNS &amp; Custom Branding</p>
                <p className="text-[11px] text-gray-500">Custom logo insertion, brand colors, domain mapping.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: VIP Account Manager */}
        <div className="p-5 rounded-xl bg-[#080214] border border-purple-900/40 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={15} className="text-[#FFD700]" />
              <span>VIP Technical Manager</span>
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your turnkey platform deployment is backed by 24/7 dedicated engineering and commercial support.
            </p>
            <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-900/50 text-[11px] text-gray-300 space-y-1">
              <p>⚡ <strong>Direct WhatsApp:</strong> +1 (555) 019-2834</p>
              <p>✈️ <strong>Telegram:</strong> @AllIGamingOfficial</p>
              <p>📧 <strong>Email:</strong> vip@alligaming.com</p>
            </div>
          </div>

          <a
            href="https://wa.me/15550192834?text=Hello%20All%20I%20Gaming%2C%20I%20am%20reviewing%20my%20B2B%20Client%20Portal."
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 text-center transition-all shadow-[0_0_12px_rgba(255,215,0,0.3)]"
          >
            Connect with Technical Lead
          </a>
        </div>
      </div>
    </div>
  );
}

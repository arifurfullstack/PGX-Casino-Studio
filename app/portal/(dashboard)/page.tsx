import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  Milestone,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  MessageSquare,
  FileSpreadsheet,
  Crown,
  Phone,
  Send,
  Mail,
  Layers,
} from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { getCustomerDashboardData } from "@/services/customerPortalService";
import HoldCountdown from "@/components/portal/HoldCountdown";

export const dynamic = "force-dynamic";

export default async function CustomerPortalOverviewPage() {
  const session = await getCustomerSession();
  if (!session) {
    redirect("/portal/login");
  }

  const data = await getCustomerDashboardData(session.email);
  const activeHold = data?.activeReservation;
  const totalQuotes = data?.totalQuotesCount || 0;

  return (
    <div className="space-y-5">
      {/* Top Greeting Banner */}
      <section className="portal-panel p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#240942]/85 border border-[#f5c451]/45 text-[11px] font-bold text-[#ffe28a] uppercase tracking-[0.12em]">
                <ShieldCheck size={12} className="text-[#f5c451]" />
                <span>Verified Client Portal</span>
              </span>

              {session.companyName && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-[#d696ff]/25 text-xs text-white/85 font-semibold">
                  <Building2 size={12} className="text-[#d58cff]" />
                  <span>{session.companyName}</span>
                </span>
              )}
            </div>

            <h1 className="font-philosopher text-2xl sm:text-3xl font-bold italic leading-tight tracking-tight text-white">
              Welcome back, <span className="gold-text">{session.fullName}</span>!
            </h1>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl">
              Orchestrate your turnkey online casino launch, monitor active 5-day price locks, review custom configurations, and track every deployment milestone in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/designs"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffe27a] via-[#f5b82e] to-[#d48806] text-[#261100] px-4 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide border border-[#fff2b2]/70 hover:brightness-105 transition-all duration-150"
            >
              <Crown size={15} className="fill-[#261100] text-[#261100] stroke-[1.75]" />
              <span>Configure New Platform</span>
              <ArrowRight size={15} className="stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Active 5-Day Reservation Highlight OR Price-Lock Promo Banner */}
      {activeHold ? (
        <section className="portal-panel portal-panel-gold p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="portal-icon-medallion portal-icon-medallion-active w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={17} className="text-[#f5c451]" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#f5c451]">
                  Priority Price Freeze Active
                </p>
                <h2 className="font-philosopher text-lg sm:text-xl font-bold text-white tracking-wide">
                  Active 5-Day Price Lock ({activeHold.reservationId})
                </h2>
              </div>
            </div>
            <HoldCountdown expiresAt={activeHold.expiresAt} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3.5 border-t border-[#f5c451]/20">
            <div className="p-3 rounded-xl bg-[#0e041d]/70 border border-[#d696ff]/20">
              <span className="text-[11px] text-white/60 uppercase tracking-wider font-semibold">
                Selected Theme
              </span>
              <p className="font-philosopher text-base font-bold text-white mt-0.5">
                {activeHold.selectedDesignName}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#0e041d]/70 border border-[#d696ff]/20">
              <span className="text-[11px] text-white/60 uppercase tracking-wider font-semibold">
                Original Price
              </span>
              <p className="font-philosopher text-base font-bold text-white/85 mt-0.5 tabular-nums">
                ${activeHold.originalPackagePrice.toLocaleString()} USD
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/35 border border-emerald-400/30">
              <span className="text-[11px] text-emerald-300 uppercase tracking-wider font-bold">
                5% Discount Locked
              </span>
              <p className="font-philosopher text-base font-bold text-emerald-300 mt-0.5 tabular-nums">
                -${Math.round(activeHold.originalPackagePrice * 0.05).toLocaleString()} USD
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/35 border border-[#f5c451]/35">
              <span className="text-[11px] text-[#ffe28a] uppercase tracking-wider font-bold">
                Balance Due
              </span>
              <p className="font-philosopher text-lg font-bold gold-text mt-0.5 tabular-nums">
                ${activeHold.remainingBalance.toLocaleString()} USD
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="portal-panel portal-panel-gold px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <span className="portal-icon-medallion portal-icon-medallion-active w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles size={15} className="text-[#f5c451]" />
              </span>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Lock in your selected casino theme with a{" "}
                <strong className="text-[#ffe28a] font-bold">5% VIP discount</strong> and{" "}
                <strong className="text-white font-bold">120-hour price freeze</strong> for a{" "}
                <strong className="text-[#ffe28a] font-bold">$1,000 refundable deposit</strong>.
              </p>
            </div>

            <Link
              href="/designs"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-[#1a0730] border border-[#f5c451]/55 hover:border-[#ffe28a] text-xs font-semibold text-white hover:text-[#ffe28a] px-4 h-9 self-start lg:self-auto transition-colors duration-150"
            >
              <span>Browse Designs</span>
              <ArrowRight size={14} className="text-[#f5c451]" />
            </Link>
          </div>
        </section>
      )}

      {/* 3 KPI Metric Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1 */}
        <Link
          href="/portal/quotes"
          className="group portal-panel hover:border-[#f5c451]/45 p-4 sm:p-5 flex flex-col justify-between gap-3"
        >
          <div className="flex items-center justify-between gap-2.5">
            <span className="text-[11px] font-bold text-[#ffe28a]/85 uppercase tracking-[0.14em]">
              Total Quotations
            </span>
            <span className="portal-icon-medallion w-9 h-9 rounded-xl flex items-center justify-center">
              <FileSpreadsheet size={16} className="text-[#f5c451]" />
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-philosopher text-2xl sm:text-3xl font-bold text-white leading-none tabular-nums">
              {totalQuotes}
            </p>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              Custom casino packages submitted
            </p>
          </div>
        </Link>

        {/* KPI 2 */}
        <Link
          href="/portal/reservations"
          className="group portal-panel hover:border-[#f5c451]/45 p-4 sm:p-5 flex flex-col justify-between gap-3"
        >
          <div className="flex items-center justify-between gap-2.5">
            <span className="text-[11px] font-bold text-[#ffe28a]/85 uppercase tracking-[0.14em]">
              Active 5-Day Holds
            </span>
            <span className="portal-icon-medallion w-9 h-9 rounded-xl flex items-center justify-center">
              <Clock size={16} className="text-[#f5c451]" />
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-philosopher text-2xl sm:text-3xl font-bold gold-text leading-none tabular-nums">
              {activeHold ? 1 : 0}
            </p>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              5% discount &amp; price lock active
            </p>
          </div>
        </Link>

        {/* KPI 3 */}
        <Link
          href="/portal/milestones"
          className="group portal-panel hover:border-[#f5c451]/45 p-4 sm:p-5 flex flex-col justify-between gap-3"
        >
          <div className="flex items-center justify-between gap-2.5">
            <span className="text-[11px] font-bold text-[#ffe28a]/85 uppercase tracking-[0.14em]">
              Onboarding Roadmap
            </span>
            <span className="portal-icon-medallion w-9 h-9 rounded-xl flex items-center justify-center">
              <Layers size={16} className="text-[#f5c451]" />
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-philosopher text-2xl sm:text-3xl font-bold text-emerald-300 leading-none">
              Phase 1 / 5
            </p>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              Architecture &amp; design selected
            </p>
          </div>
        </Link>
      </section>

      {/* Two-Column Stage: Roadmap Snapshot & VIP Concierge */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Turnkey Casino Launch Roadmap */}
        <div className="xl:col-span-2 portal-panel p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#d696ff]/15">
            <div className="flex items-center gap-3">
              <span className="portal-icon-medallion w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <Milestone size={16} className="text-[#f5c451]" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f5c451]">
                  Delivery Pipeline
                </p>
                <h2 className="font-philosopher text-lg sm:text-xl font-bold italic text-white leading-tight">
                  Turnkey Casino Launch Roadmap
                </h2>
              </div>
            </div>

            <Link
              href="/portal/milestones"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#ffe28a] hover:text-white transition-colors self-start sm:self-auto"
            >
              <span>View Full Stages</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white/70">Current Completion Milestone</span>
              <span className="text-[#ffe28a] font-bold tabular-nums">20% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#090214]/90 border border-[#d696ff]/25 overflow-hidden p-[1.5px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-[#ffe28a] to-[#f5c451]"
                style={{ width: "20%" }}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Stage 1 */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-400/30 hover:border-emerald-300/50 transition-colors duration-150">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={16} className="text-emerald-300" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-philosopher text-sm sm:text-[15px] font-bold text-white">
                    Stage 1: Architecture &amp; Theme Selected
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-400/35">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-white/65 mt-0.5 leading-relaxed">
                  Design look chosen, turnkey configuration defined, and initial package quotation generated.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#2a0a4a]/50 border border-[#f5c451]/45 hover:border-[#ffe28a]/65 transition-colors duration-150">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#fff3b0] via-[#f5c451] to-[#d97706] text-[#261100] font-philosopher text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-philosopher text-sm sm:text-[15px] font-bold text-[#ffe28a]">
                    Stage 2: Licensing &amp; Commercial Agreement
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/85 text-[#ffe28a] border border-[#f5c451]/45">
                    In Progress
                  </span>
                </div>
                <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                  Contract review, commercial onboarding sign-off, and formal invoice credit of your $1,000 reservation fee.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-[#d696ff]/15 hover:border-[#d696ff]/35 opacity-80 hover:opacity-100 transition-colors duration-150">
              <span className="w-8 h-8 rounded-lg bg-[#240942] text-white/75 border border-[#d696ff]/30 font-philosopher text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-philosopher text-sm sm:text-[15px] font-bold text-white/90">
                    Stage 3: Domain, DNS &amp; Custom Branding
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-950/70 text-purple-200/80 border border-purple-400/25">
                    Upcoming
                  </span>
                </div>
                <p className="text-xs text-white/55 mt-0.5 leading-relaxed">
                  Custom brand logo insertion, tailored color identity, enterprise SSL, and dedicated domain mapping.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: VIP Technical Manager Concierge Card */}
        <div className="portal-panel portal-panel-gold p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="portal-icon-medallion portal-icon-medallion-active w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare size={16} className="text-[#f5c451]" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f5c451]">
                  24/7 Priority Desk
                </p>
                <h2 className="font-philosopher text-lg sm:text-xl font-bold italic text-white leading-tight">
                  VIP Technical Manager
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed">
              Your turnkey casino deployment is backed by dedicated engineering, integration specialists, and priority commercial support.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#0d031b]/80 border border-[#d696ff]/20 hover:border-[#f5c451]/40 transition-colors">
                <span className="w-8 h-8 rounded-lg bg-[#2a0a4a] border border-[#f5c451]/30 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-[#f5c451]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold">
                    Direct WhatsApp
                  </p>
                  <p className="text-xs sm:text-[13px] font-bold text-white tabular-nums">
                    +1 (416) 725-6538
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#0d031b]/80 border border-[#d696ff]/20 hover:border-[#f5c451]/40 transition-colors">
                <span className="w-8 h-8 rounded-lg bg-[#2a0a4a] border border-[#f5c451]/30 flex items-center justify-center shrink-0">
                  <Send size={14} className="text-[#f5c451]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold">
                    Telegram Concierge
                  </p>
                  <p className="text-xs sm:text-[13px] font-bold text-white truncate">
                    @RoyalCasinoClubOfficial
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#0d031b]/80 border border-[#d696ff]/20 hover:border-[#f5c451]/40 transition-colors">
                <span className="w-8 h-8 rounded-lg bg-[#2a0a4a] border border-[#f5c451]/30 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-[#f5c451]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold">
                    VIP Email
                  </p>
                  <p className="text-xs sm:text-[13px] font-bold text-white truncate">
                    contact@royalcasinoclub.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/14167256538?text=Hello%20Royal%20Casino%20Club%2C%20I%20am%20reviewing%20my%20VIP%20Client%20Portal."
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffe27a] via-[#f5b82e] to-[#d48806] text-[#261100] py-2.5 px-4 text-xs sm:text-sm font-extrabold border border-[#fff2b2]/70 hover:brightness-105 transition-all duration-150"
          >
            <span>Connect with Technical Lead</span>
            <ArrowRight size={15} className="stroke-[2.5]" />
          </a>
        </div>
      </section>
    </div>
  );
}

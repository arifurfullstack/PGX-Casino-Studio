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
    <div className="space-y-8">
      {/* Top Luxury Hero Greeting Banner */}
      <section className="js-portal-hero js-portal-card group portal-panel panel-interactive p-7 sm:p-9 xl:p-11">
        <div className="portal-card-spotlight" aria-hidden="true" />
        <div className="panel-sheen" aria-hidden="true" />
        <div className="panel-rim" aria-hidden="true" />

        {/* Soft Right Champagne-Gold Aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full blur-[110px] opacity-40 transition-opacity duration-700 group-hover:opacity-65"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 196, 81, 0.36) 0%, rgba(217, 70, 239, 0.2) 55%, transparent 75%)",
          }}
        />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-7">
          <div className="space-y-3.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#240942]/85 border border-[#f5c451]/55 text-xs font-bold text-[#ffe28a] uppercase tracking-[0.14em] shadow-[0_0_18px_rgba(245,196,81,0.2)]">
                <ShieldCheck size={14} className="text-[#f5c451]" />
                <span>Verified Client Portal</span>
              </span>

              {session.companyName && (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#d696ff]/30 text-xs sm:text-sm text-white/85 font-semibold">
                  <Building2 size={14} className="text-[#d58cff]" />
                  <span>{session.companyName}</span>
                </span>
              )}
            </div>

            <h1 className="font-philosopher text-3xl sm:text-4xl xl:text-[2.75rem] font-bold italic leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.75)]">
              Welcome back, <span className="gold-text">{session.fullName}</span>!
            </h1>

            <p className="text-sm sm:text-base xl:text-[17px] text-white/75 leading-relaxed max-w-2xl">
              Orchestrate your turnkey online casino launch, monitor active 5-day price locks, review custom configurations, and track every deployment milestone in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <Link
              href="/designs"
              className="js-portal-cta btn-royal-gold shine px-7 py-4 text-[15px] sm:text-base font-extrabold tracking-wide"
            >
              <Crown size={18} className="fill-[#261100] text-[#261100] stroke-[1.75]" />
              <span>Configure New Platform</span>
              <ArrowRight size={18} className="stroke-[2.75]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Active 5-Day Reservation Highlight OR Luxury Price-Lock Promo Banner */}
      {activeHold ? (
        <section className="js-portal-banner js-portal-card group portal-panel portal-panel-gold panel-interactive p-6 sm:p-8 space-y-5">
          <div className="portal-card-spotlight" aria-hidden="true" />
          <div className="panel-sheen" aria-hidden="true" />
          <div className="panel-rim" aria-hidden="true" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="portal-icon-medallion portal-icon-medallion-active w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={22} className="gold-icon" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5c451]">
                  Priority Price Freeze Active
                </p>
                <h2 className="font-philosopher text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
                  Active 5-Day Price Lock ({activeHold.reservationId})
                </h2>
              </div>
            </div>
            <HoldCountdown expiresAt={activeHold.expiresAt} />
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5 pt-5 border-t border-[#f5c451]/25">
            <div className="p-4 rounded-2xl bg-[#0e041d]/70 border border-[#d696ff]/25">
              <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                Selected Theme
              </span>
              <p className="font-philosopher text-lg sm:text-xl font-bold text-white mt-1">
                {activeHold.selectedDesignName}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0e041d]/70 border border-[#d696ff]/25">
              <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                Original Price
              </span>
              <p className="font-philosopher text-lg sm:text-xl font-bold text-white/85 mt-1 tabular-nums">
                ${activeHold.originalPackagePrice.toLocaleString()} USD
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/35 border border-emerald-400/35">
              <span className="text-xs text-emerald-300 uppercase tracking-wider font-bold">
                5% Discount Locked
              </span>
              <p className="font-philosopher text-lg sm:text-xl font-bold text-emerald-300 mt-1 tabular-nums">
                -${Math.round(activeHold.originalPackagePrice * 0.05).toLocaleString()} USD
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/35 border border-[#f5c451]/45">
              <span className="text-xs text-[#ffe28a] uppercase tracking-wider font-bold">
                Balance Due
              </span>
              <p className="font-philosopher text-xl sm:text-2xl font-bold gold-text mt-1 tabular-nums">
                ${activeHold.remainingBalance.toLocaleString()} USD
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="js-portal-banner js-portal-card group portal-panel portal-panel-gold panel-interactive px-6 py-5 sm:px-8 sm:py-6">
          <div className="portal-card-spotlight" aria-hidden="true" />
          <div className="panel-sheen" aria-hidden="true" />
          <div className="panel-rim" aria-hidden="true" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <span className="js-portal-float portal-icon-medallion portal-icon-medallion-active w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles size={20} className="gold-icon" />
              </span>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Lock in your selected casino theme with a{" "}
                <strong className="text-[#ffe28a] font-bold">5% VIP discount</strong> and{" "}
                <strong className="text-white font-bold">120-hour price freeze</strong> for a{" "}
                <strong className="text-[#ffe28a] font-bold">$500 refundable deposit</strong>.
              </p>
            </div>

            <Link
              href="/designs"
              className="js-portal-cta btn-nav-portal inline-flex shrink-0 text-sm px-6 h-11 self-start lg:self-auto"
            >
              <span>Browse Designs</span>
              <ArrowRight size={16} className="text-[#f5c451]" />
            </Link>
          </div>
        </section>
      )}

      {/* 3 Enlarged Luxury KPI Metric Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1 */}
        <Link
          href="/portal/quotes"
          className="js-portal-kpi js-portal-card group portal-panel panel-interactive p-7 xl:p-8 flex flex-col justify-between gap-5"
        >
          <div className="portal-card-spotlight" aria-hidden="true" />
          <div className="panel-sheen" aria-hidden="true" />
          <div className="panel-rim" aria-hidden="true" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="text-xs sm:text-[13px] font-bold text-[#ffe28a]/85 uppercase tracking-[0.16em]">
              Total Quotations
            </span>
            <span className="portal-icon-medallion w-12 h-12 rounded-2xl flex items-center justify-center">
              <FileSpreadsheet size={21} className="gold-icon" />
            </span>
          </div>

          <div className="relative z-10 space-y-1.5">
            <p
              className="js-portal-counter font-philosopher text-4xl sm:text-5xl font-bold text-white leading-none tabular-nums"
              data-target={totalQuotes}
            >
              {totalQuotes}
            </p>
            <p className="text-sm text-white/65 group-hover:text-white/85 transition-colors">
              Custom casino packages submitted
            </p>
          </div>
        </Link>

        {/* KPI 2 */}
        <Link
          href="/portal/reservations"
          className="js-portal-kpi js-portal-card group portal-panel panel-interactive p-7 xl:p-8 flex flex-col justify-between gap-5"
        >
          <div className="portal-card-spotlight" aria-hidden="true" />
          <div className="panel-sheen" aria-hidden="true" />
          <div className="panel-rim" aria-hidden="true" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="text-xs sm:text-[13px] font-bold text-[#ffe28a]/85 uppercase tracking-[0.16em]">
              Active 5-Day Holds
            </span>
            <span className="portal-icon-medallion w-12 h-12 rounded-2xl flex items-center justify-center">
              <Clock size={21} className="gold-icon" />
            </span>
          </div>

          <div className="relative z-10 space-y-1.5">
            <p
              className="js-portal-counter font-philosopher text-4xl sm:text-5xl font-bold gold-text leading-none tabular-nums"
              data-target={activeHold ? 1 : 0}
            >
              {activeHold ? 1 : 0}
            </p>
            <p className="text-sm text-white/65 group-hover:text-white/85 transition-colors">
              5% discount &amp; price lock active
            </p>
          </div>
        </Link>

        {/* KPI 3 */}
        <Link
          href="/portal/milestones"
          className="js-portal-kpi js-portal-card group portal-panel panel-interactive p-7 xl:p-8 flex flex-col justify-between gap-5"
        >
          <div className="portal-card-spotlight" aria-hidden="true" />
          <div className="panel-sheen" aria-hidden="true" />
          <div className="panel-rim" aria-hidden="true" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="text-xs sm:text-[13px] font-bold text-[#ffe28a]/85 uppercase tracking-[0.16em]">
              Onboarding Roadmap
            </span>
            <span className="portal-icon-medallion w-12 h-12 rounded-2xl flex items-center justify-center">
              <Layers size={21} className="gold-icon" />
            </span>
          </div>

          <div className="relative z-10 space-y-1.5">
            <p className="font-philosopher text-4xl sm:text-5xl font-bold text-emerald-300 leading-none drop-shadow-[0_0_18px_rgba(52,211,153,0.3)]">
              Phase 1 / 5
            </p>
            <p className="text-sm text-white/65 group-hover:text-white/85 transition-colors">
              Architecture &amp; design selected
            </p>
          </div>
        </Link>
      </section>

      {/* Two-Column Luxury Stage: Roadmap Snapshot & VIP Concierge */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-7">
        {/* Left: Turnkey Casino Launch Roadmap */}
        <div className="js-portal-panel xl:col-span-2 portal-panel p-7 sm:p-8 xl:p-9 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#d696ff]/20">
            <div className="flex items-center gap-3.5">
              <span className="portal-icon-medallion w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                <Milestone size={20} className="gold-icon" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5c451]">
                  Delivery Pipeline
                </p>
                <h2 className="font-philosopher text-2xl sm:text-[1.7rem] font-bold italic text-white leading-tight">
                  Turnkey Casino Launch Roadmap
                </h2>
              </div>
            </div>

            <Link
              href="/portal/milestones"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ffe28a] hover:text-white transition-colors self-start sm:self-auto group/link"
            >
              <span>View Full Stages</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </Link>
          </div>

          {/* Animated Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
              <span className="text-white/75">Current Completion Milestone</span>
              <span className="text-[#ffe28a] font-bold tabular-nums">20% Complete</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#090214]/90 border border-[#d696ff]/30 overflow-hidden p-[2px]">
              <div
                className="js-portal-progress h-full rounded-full bg-gradient-to-r from-emerald-400 via-[#ffe28a] to-[#f5c451] shadow-[0_0_16px_rgba(245,196,81,0.7)]"
                data-progress="20%"
                style={{ width: "20%" }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Stage 1 */}
            <div className="js-portal-row group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0f1c22]/65 to-[#120526]/75 border border-emerald-400/40 hover:border-emerald-300/75 transition-all duration-300 hover:translate-x-1">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_16px_rgba(52,211,153,0.28)]">
                <CheckCircle2 size={20} className="text-emerald-300" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-philosopher text-lg font-bold text-white">
                    Stage 1: Architecture &amp; Theme Selected
                  </h3>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-400/40">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-1 leading-relaxed">
                  Design look chosen, turnkey configuration defined, and initial package quotation generated.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="js-portal-row group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#3a0f66]/55 via-[#1c0736]/80 to-[#110422]/85 border border-[#f5c451]/55 shadow-[0_0_24px_rgba(245,196,81,0.12)] hover:border-[#ffe28a]/85 transition-all duration-300 hover:translate-x-1">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#fff3b0] via-[#f5c451] to-[#d97706] text-[#261100] font-philosopher text-base font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_18px_rgba(245,196,81,0.55)]">
                2
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-philosopher text-lg font-bold text-[#ffe28a]">
                    Stage 2: Licensing &amp; Commercial Agreement
                  </h3>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-950/85 text-[#ffe28a] border border-[#f5c451]/50 animate-pulse">
                    In Progress
                  </span>
                </div>
                <p className="text-sm text-white/75 mt-1 leading-relaxed">
                  Contract review, commercial onboarding sign-off, and formal invoice credit of your $500 reservation fee.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="js-portal-row group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-[#d696ff]/20 hover:border-[#d696ff]/45 opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-1">
              <span className="w-10 h-10 rounded-xl bg-[#240942] text-white/75 border border-[#d696ff]/35 font-philosopher text-base font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-philosopher text-lg font-bold text-white/90">
                    Stage 3: Domain, DNS &amp; Custom Branding
                  </h3>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-950/70 text-purple-200/80 border border-purple-400/25">
                    Upcoming
                  </span>
                </div>
                <p className="text-sm text-white/60 mt-1 leading-relaxed">
                  Custom brand logo insertion, tailored color identity, enterprise SSL, and dedicated domain mapping.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: VIP Technical Manager Concierge Card */}
        <div className="js-portal-panel js-portal-card group portal-panel portal-panel-gold panel-interactive p-7 sm:p-8 flex flex-col justify-between gap-6">
          <div className="portal-card-spotlight" aria-hidden="true" />
          <div className="panel-sheen" aria-hidden="true" />
          <div className="panel-rim" aria-hidden="true" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3.5">
              <span className="portal-icon-medallion portal-icon-medallion-active w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare size={21} className="gold-icon" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5c451]">
                  24/7 Priority Desk
                </p>
                <h2 className="font-philosopher text-2xl font-bold italic text-white leading-tight">
                  VIP Technical Manager
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-[15px] text-white/75 leading-relaxed">
              Your turnkey casino deployment is backed by dedicated engineering, integration specialists, and priority commercial support.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0d031b]/80 border border-[#d696ff]/25 hover:border-[#f5c451]/50 transition-colors">
                <span className="w-9 h-9 rounded-lg bg-[#2a0a4a] border border-[#f5c451]/35 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#f5c451]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-white/55 font-bold">
                    Direct WhatsApp
                  </p>
                  <p className="text-sm font-bold text-white tabular-nums">
                    +1 (416) 725-6538
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0d031b]/80 border border-[#d696ff]/25 hover:border-[#f5c451]/50 transition-colors">
                <span className="w-9 h-9 rounded-lg bg-[#2a0a4a] border border-[#f5c451]/35 flex items-center justify-center shrink-0">
                  <Send size={16} className="text-[#f5c451]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-white/55 font-bold">
                    Telegram Concierge
                  </p>
                  <p className="text-sm font-bold text-white truncate">
                    @RoyalCasinoClubOfficial
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0d031b]/80 border border-[#d696ff]/25 hover:border-[#f5c451]/50 transition-colors">
                <span className="w-9 h-9 rounded-lg bg-[#2a0a4a] border border-[#f5c451]/35 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#f5c451]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-white/55 font-bold">
                    VIP Email
                  </p>
                  <p className="text-sm font-bold text-white truncate">
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
            className="js-portal-cta relative z-10 w-full btn-royal-gold shine py-4 px-5 text-[15px] font-extrabold text-center"
          >
            <span>Connect with Technical Lead</span>
            <ArrowRight size={17} className="stroke-[2.75]" />
          </a>
        </div>
      </section>
    </div>
  );
}

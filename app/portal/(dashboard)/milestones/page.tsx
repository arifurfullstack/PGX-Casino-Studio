import { redirect } from "next/navigation";
import { Milestone, CheckCircle2, MessageSquare, Clock, Sparkles } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";

export const dynamic = "force-dynamic";

const STAGES = [
  {
    number: 1,
    title: "Architecture & Design Look Selected",
    status: "completed",
    timeline: "Days 1–3",
    description:
      "Selection of 1 of 12 luxury casino themes, optional expansion modules (Live Dealer, Sportsbook, Poker), and 5-day price lock reservation.",
    items: [
      "Theme selection verified & locked",
      "Module architecture defined ($15,000+ base)",
      "Quotation record generated",
    ],
  },
  {
    number: 2,
    title: "Commercial Agreement & Contract",
    status: "in_progress",
    timeline: "Days 4–7",
    description:
      "Formal contract execution, $500 reservation holding credited directly to your initial invoice, and commercial terms sign-off.",
    items: [
      "B2B software licensing agreement review",
      "$500 reservation fee credited to invoice",
      "Operator GGR commercial terms confirmation",
    ],
  },
  {
    number: 3,
    title: "Custom Brand Identity & Domain Mapping",
    status: "upcoming",
    timeline: "Days 8–14",
    description:
      "Operator custom logo, luxury color scheme, domain registration, enterprise SSL certificates, and high-availability cloud setup.",
    items: [
      "Custom brand logo & vector graphics deployment",
      "Dedicated operator domain & DNS routing",
      "SSL, Cloudflare enterprise security & CDN",
    ],
  },
  {
    number: 4,
    title: "Games Aggregation & Payment Integration",
    status: "upcoming",
    timeline: "Days 15–22",
    description:
      "Pragmatic Play, Evolution Gaming, and certified slot providers aggregation with crypto (USDT/BTC) and fiat payment gateways.",
    items: [
      "500+ Casino slots & table games hookup",
      "Crypto wallet & payment gateway API testing",
      "Player wallet sync & backoffice access",
    ],
  },
  {
    number: 5,
    title: "Quality Audit, Training & Production Launch",
    status: "upcoming",
    timeline: "Days 23–30",
    description:
      "End-to-end sandbox QA verification, admin backoffice operator training, and official live casino production launch to global players.",
    items: [
      "99.99% SLA stress & load verification",
      "Operator staff backoffice training",
      "Official production launch to global players",
    ],
  },
];

export default async function CustomerMilestonesPage() {
  const session = await getCustomerSession();
  if (!session) {
    redirect("/portal/login");
  }

  return (
    <div className="space-y-8">
      {/* Luxury Page Header */}
      <section className="js-portal-hero portal-panel p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <span className="portal-icon-medallion portal-icon-medallion-active w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <Milestone size={26} className="gold-icon" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5c451]">
              5-Phase Turnkey Deployment
            </p>
            <h1 className="font-philosopher text-2xl sm:text-3xl xl:text-4xl font-bold italic text-white leading-tight mt-1">
              Turnkey Platform <span className="gold-text">Launch Roadmap</span>
            </h1>
            <p className="text-sm sm:text-base text-white/70 mt-2 max-w-2xl">
              Follow your bespoke casino platform delivery across every structured engineering, branding, and go-live milestone.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/14167256538?text=Hello%20Royal%20Casino%20Club%2C%20I%20have%20a%20question%20about%20my%20onboarding%20milestones."
          target="_blank"
          rel="noreferrer"
          className="js-portal-cta btn-royal-gold shine px-6 py-3.5 text-[15px] font-extrabold shrink-0 self-start lg:self-auto"
        >
          <MessageSquare size={17} className="stroke-[2.5]" />
          <span>Technical Coordinator</span>
        </a>
      </section>

      {/* Progress Overview Panel */}
      <section className="js-portal-banner portal-panel portal-panel-gold p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-[#f5c451]" />
            <span className="font-philosopher text-xl font-bold text-white tracking-wide">
              Overall Platform Progress
            </span>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/75 border border-[#f5c451]/55 text-xs sm:text-sm font-bold text-[#ffe28a] self-start sm:self-auto">
            Stage 1 Completed (20%)
          </span>
        </div>

        <div className="w-full h-3.5 rounded-full bg-[#080212]/90 overflow-hidden border border-[#d696ff]/35 p-[2.5px]">
          <div
            className="js-portal-progress h-full bg-gradient-to-r from-emerald-400 via-[#ffe28a] to-[#f5c451] rounded-full shadow-[0_0_18px_rgba(245,196,81,0.8)]"
            data-progress="20%"
            style={{ width: "20%" }}
          />
        </div>

        <p className="text-sm text-white/75 flex items-center gap-2">
          <Clock size={15} className="text-[#f5c451] shrink-0" />
          <span>
            Estimated total turnaround from agreement completion to production launch:{" "}
            <strong className="text-white">21–30 Business Days</strong>.
          </span>
        </p>
      </section>

      {/* 5 Stages Luxury Timeline */}
      <section className="space-y-5">
        {STAGES.map((stage) => {
          const isCompleted = stage.status === "completed";
          const isInProgress = stage.status === "in_progress";

          return (
            <div
              key={stage.number}
              className={`js-portal-panel js-portal-card group portal-panel panel-interactive p-6 sm:p-8 transition-all ${
                isInProgress
                  ? "portal-panel-gold"
                  : isCompleted
                  ? "!border-emerald-400/50"
                  : "opacity-85 hover:opacity-100"
              }`}
            >
              <div className="portal-card-spotlight" aria-hidden="true" />
              <div className="panel-sheen" aria-hidden="true" />
              <div className="panel-rim" aria-hidden="true" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#d696ff]/20">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-philosopher text-lg font-bold shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 shadow-[0_0_18px_rgba(52,211,153,0.3)]"
                        : isInProgress
                        ? "bg-gradient-to-b from-[#fff3b0] via-[#f5c451] to-[#d97706] text-[#261100] shadow-[0_0_22px_rgba(245,196,81,0.65)]"
                        : "bg-[#240942] text-white/75 border border-[#d696ff]/35"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={22} className="stroke-[2.5]" /> : stage.number}
                  </div>

                  <div>
                    <h2
                      className={`font-philosopher text-xl sm:text-2xl font-bold leading-snug ${
                        isInProgress ? "gold-text" : "text-white"
                      }`}
                    >
                      Stage {stage.number}: {stage.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-[#f5c451]/85 mt-0.5">
                      Estimated Window: {stage.timeline}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border self-start sm:self-auto ${
                    isCompleted
                      ? "bg-emerald-950/90 text-emerald-300 border-emerald-400/50"
                      : isInProgress
                      ? "bg-amber-950/90 text-[#ffe28a] border-[#f5c451]/60 animate-pulse"
                      : "bg-purple-950/75 text-white/65 border-[#d696ff]/30"
                  }`}
                >
                  {stage.status.replace("_", " ")}
                </span>
              </div>

              <div className="relative z-10 pt-5 space-y-4">
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {stage.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  {stage.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#0d031b]/80 border border-[#d696ff]/25 text-xs sm:text-sm text-white/85"
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isCompleted
                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                            : "bg-[#f5c451] shadow-[0_0_8px_rgba(245,196,81,0.9)]"
                        }`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

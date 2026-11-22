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
    <div className="space-y-5">
      {/* Page Header */}
      <section className="portal-panel p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="portal-icon-medallion portal-icon-medallion-active w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
            <Milestone size={19} className="text-[#f5c451]" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f5c451]">
              5-Phase Turnkey Deployment
            </p>
            <h1 className="font-philosopher text-xl sm:text-2xl font-bold italic text-white leading-tight mt-0.5">
              Turnkey Platform <span className="gold-text">Launch Roadmap</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
              Follow your bespoke casino platform delivery across every structured engineering, branding, and go-live milestone.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/14167256538?text=Hello%20Royal%20Casino%20Club%2C%20I%20have%20a%20question%20about%20my%20onboarding%20milestones."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffe27a] via-[#f5b82e] to-[#d48806] text-[#261100] px-4 py-2.5 text-xs sm:text-sm font-extrabold border border-[#fff2b2]/70 hover:brightness-105 transition-all duration-150 shrink-0 self-start lg:self-auto"
        >
          <MessageSquare size={15} className="stroke-[2.25]" />
          <span>Technical Coordinator</span>
        </a>
      </section>

      {/* Progress Overview Panel */}
      <section className="portal-panel portal-panel-gold p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[#f5c451]" />
            <span className="font-philosopher text-base sm:text-lg font-bold text-white tracking-wide">
              Overall Platform Progress
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/75 border border-[#f5c451]/45 text-xs font-bold text-[#ffe28a] self-start sm:self-auto">
            Stage 1 Completed (20%)
          </span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-[#080212]/90 overflow-hidden border border-[#d696ff]/25 p-[2px]">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-[#ffe28a] to-[#f5c451] rounded-full"
            style={{ width: "20%" }}
          />
        </div>

        <p className="text-xs text-white/75 flex items-center gap-1.5">
          <Clock size={13} className="text-[#f5c451] shrink-0" />
          <span>
            Estimated total turnaround from agreement completion to production launch:{" "}
            <strong className="text-white">21–30 Business Days</strong>.
          </span>
        </p>
      </section>

      {/* 5 Stages Timeline */}
      <section className="space-y-3.5">
        {STAGES.map((stage) => {
          const isCompleted = stage.status === "completed";
          const isInProgress = stage.status === "in_progress";

          return (
            <div
              key={stage.number}
              className={`portal-panel p-4 sm:p-5 ${
                isInProgress
                  ? "portal-panel-gold"
                  : isCompleted
                  ? "!border-emerald-400/40"
                  : "opacity-85 hover:opacity-100"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#d696ff]/15">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-philosopher text-sm font-bold shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50"
                        : isInProgress
                        ? "bg-gradient-to-b from-[#fff3b0] via-[#f5c451] to-[#d97706] text-[#261100]"
                        : "bg-[#240942] text-white/75 border border-[#d696ff]/30"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={17} className="stroke-[2.5]" /> : stage.number}
                  </div>

                  <div>
                    <h2
                      className={`font-philosopher text-base sm:text-lg font-bold leading-snug ${
                        isInProgress ? "gold-text" : "text-white"
                      }`}
                    >
                      Stage {stage.number}: {stage.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#f5c451]/85">
                      Estimated Window: {stage.timeline}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border self-start sm:self-auto ${
                    isCompleted
                      ? "bg-emerald-950/90 text-emerald-300 border-emerald-400/45"
                      : isInProgress
                      ? "bg-amber-950/90 text-[#ffe28a] border-[#f5c451]/50"
                      : "bg-purple-950/75 text-white/65 border-[#d696ff]/25"
                  }`}
                >
                  {stage.status.replace("_", " ")}
                </span>
              </div>

              <div className="pt-3.5 space-y-3">
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {stage.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {stage.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0d031b]/80 border border-[#d696ff]/20 text-xs text-white/80"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isCompleted ? "bg-emerald-400" : "bg-[#f5c451]"
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

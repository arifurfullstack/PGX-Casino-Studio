import { redirect } from "next/navigation";
import { Milestone, CheckCircle2, MessageSquare } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";

export const dynamic = "force-dynamic";

const STAGES = [
  {
    number: 1,
    title: "Architecture & Design Look Selected",
    status: "completed",
    timeline: "Days 1–3",
    description: "Selection of 1 of 12 casino themes, optional expansion modules (Live Dealer, Sportsbook, Poker), and price lock reservation.",
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
    description: "Formal contract execution, $500 reservation holding credited to initial invoice, and commercial terms sign-off.",
    items: [
      "B2B software licensing agreement review",
      "$500 reservation fee credited to invoice",
      "75% Operator / 25% All I Gaming GGR rev-share confirmation",
    ],
  },
  {
    number: 3,
    title: "Custom Brand Identity & Domain Mapping",
    status: "upcoming",
    timeline: "Days 8–14",
    description: "Operator's custom logo, color scheme, domain registration, SSL certificates, and cloud infrastructure setup.",
    items: [
      "Custom brand logo and vector graphics deployment",
      "Dedicated operator domain & DNS routing",
      "SSL, Cloudflare enterprise security & CDN",
    ],
  },
  {
    number: 4,
    title: "Games Aggregation & Payment Integration",
    status: "upcoming",
    timeline: "Days 15–22",
    description: "Pragmatic Play, Evolution Gaming, and certified slot providers aggregation with crypto (USDT/BTC) and fiat gateway integration.",
    items: [
      "500+ Casino slots & table games hookup",
      "Crypto wallet & payment gateway API testing",
      "Player wallet synchronization & backoffice access",
    ],
  },
  {
    number: 5,
    title: "Quality Audit, Training & Production Launch",
    status: "upcoming",
    timeline: "Days 23–30",
    description: "End-to-end sandbox testing, admin backoffice operator training, and live casino launch to players.",
    items: [
      "99.99% SLA stress & load verification",
      "Operator staff backoffice administration training",
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <Milestone size={20} className="text-[#FFD700]" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Turnkey Platform Launch Roadmap
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Track your casino platform delivery across the 5 structured turnkey deployment phases.
          </p>
        </div>

        <a
          href="https://wa.me/14167256556?text=Hello%20All%20I%20Gaming%2C%20I%20have%20a%20question%20about%20my%20onboarding%20milestones."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_12px_rgba(255,215,0,0.3)] self-start sm:self-auto"
        >
          <MessageSquare size={13} className="stroke-[2.5]" />
          <span>Technical Coordinator</span>
        </a>
      </div>

      {/* Progress Overview Bar */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-purple-950/60 via-[#100326] to-[#080214] border border-purple-500/40 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-white uppercase tracking-wider">Overall Platform Progress</span>
          <span className="text-[#FFD700]">Stage 1 Completed (20%)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-purple-900/50">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-[#FFD700] w-[20%] rounded-full shadow-[0_0_12px_#FFD700]" />
        </div>
        <p className="text-[11px] text-gray-400">
          Estimated total turnaround from agreement completion to production launch: <strong>21–30 Business Days</strong>.
        </p>
      </div>

      {/* 5 Stages Timeline */}
      <div className="space-y-4">
        {STAGES.map((stage) => {
          const isCompleted = stage.status === "completed";
          const isInProgress = stage.status === "in_progress";

          return (
            <div
              key={stage.number}
              className={`p-5 rounded-xl border transition-all ${
                isInProgress
                  ? "bg-[#0b021a] border-yellow-400/60 shadow-[0_0_25px_rgba(255,215,0,0.15)]"
                  : isCompleted
                  ? "bg-[#080214] border-emerald-500/40"
                  : "bg-[#06010f] border-purple-900/30 opacity-70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-900/30">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500 text-black"
                        : isInProgress
                        ? "bg-gradient-to-b from-[#FFE259] to-[#FFA700] text-black shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                        : "bg-purple-950 text-gray-400 border border-purple-500/30"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={16} className="stroke-[3]" /> : stage.number}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{stage.title}</h3>
                    <p className="text-[10px] text-gray-400">{stage.timeline}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border self-start sm:self-auto ${
                    isCompleted
                      ? "bg-emerald-950 text-emerald-300 border-emerald-500/40"
                      : isInProgress
                      ? "bg-amber-950 text-amber-300 border-amber-500/40 animate-pulse"
                      : "bg-gray-900 text-gray-500 border-gray-700"
                  }`}
                >
                  {stage.status.replace("_", " ")}
                </span>
              </div>

              <div className="pt-3 space-y-2">
                <p className="text-xs text-gray-300 leading-relaxed">{stage.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-gray-400">
                  {stage.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 p-1.5 rounded bg-[#04010a] border border-purple-900/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

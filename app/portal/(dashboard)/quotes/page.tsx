import Link from "next/link";
import { redirect } from "next/navigation";
import { FileSpreadsheet, ArrowRight, Plus, Sparkles } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { getCustomerDashboardData } from "@/services/customerPortalService";

export const dynamic = "force-dynamic";

export default async function CustomerQuotesPage() {
  const session = await getCustomerSession();
  if (!session) {
    redirect("/portal/login");
  }

  const data = await getCustomerDashboardData(session.email);
  const inquiries = data?.inquiries || [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <section className="portal-panel p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="portal-icon-medallion portal-icon-medallion-active w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
            <FileSpreadsheet size={19} className="text-[#f5c451]" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f5c451]">
              Custom Casino Package Estimates
            </p>
            <h1 className="font-philosopher text-xl sm:text-2xl font-bold italic text-white leading-tight mt-0.5">
              Saved <span className="gold-text">Configurations</span> &amp; Quotations
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
              Review all custom turnkey casino platform package valuations and module selections tailored for your gaming brand.
            </p>
          </div>
        </div>

        <Link
          href="/designs"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffe27a] via-[#f5b82e] to-[#d48806] text-[#261100] px-4 py-2.5 text-xs sm:text-sm font-extrabold border border-[#fff2b2]/70 hover:brightness-105 transition-all duration-150 shrink-0 self-start lg:self-auto"
        >
          <Plus size={15} className="stroke-[2.5]" />
          <span>New Configuration</span>
        </Link>
      </section>

      {/* Quotes List */}
      {inquiries.length === 0 ? (
        <section className="portal-panel p-7 sm:p-10 text-center space-y-3.5">
          <span className="portal-icon-medallion w-12 h-12 rounded-xl mx-auto flex items-center justify-center">
            <Sparkles size={20} className="text-[#f5c451]" />
          </span>
          <h2 className="font-philosopher text-xl sm:text-2xl font-bold text-white">
            No Quotations Saved Yet
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            Browse our 12 turnkey casino designs and select optional expansion modules — Live Dealer, Sportsbook, Poker, or Sweepstakes — to calculate your custom platform investment.
          </p>
          <div className="pt-1">
            <Link
              href="/designs"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffe27a] via-[#f5b82e] to-[#d48806] text-[#261100] px-5 py-2.5 text-xs sm:text-sm font-extrabold border border-[#fff2b2]/70 hover:brightness-105 transition-all duration-150"
            >
              <span>Browse Casino Catalog</span>
              <ArrowRight size={15} className="stroke-[2.5]" />
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            return (
              <div
                key={inq.id}
                className="portal-panel p-4 sm:p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-[#d696ff]/15">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-philosopher text-lg font-bold text-[#e5b8ff] tabular-nums">
                      {inq.referenceNumber}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950/90 text-[#ffe28a] border border-[#f5c451]/35 uppercase tracking-wider">
                      {inq.status.replace("_", " ")}
                    </span>
                  </div>

                  <span className="text-xs text-white/60 tabular-nums">
                    Submitted on {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#0d031b]/75 border border-[#d696ff]/20">
                    <span className="text-[11px] text-white/55 uppercase font-bold tracking-wider">
                      Casino Look Selected
                    </span>
                    <p className="font-philosopher text-base font-bold text-white mt-0.5">
                      {inq.selectedDesignName}
                    </p>
                    {inq.selectedAddonIds?.length > 0 ? (
                      <p className="text-[11px] text-[#d58cff] font-semibold mt-1 capitalize">
                        Modules: {inq.selectedAddonIds.join(", ").replace(/-/g, " ")}
                      </p>
                    ) : (
                      <p className="text-[11px] text-white/55 mt-1">Standard Starter Package</p>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-[#0d031b]/75 border border-[#d696ff]/20">
                    <span className="text-[11px] text-white/55 uppercase font-bold tracking-wider">
                      Target Launch Timeline
                    </span>
                    <p className="font-philosopher text-base font-bold text-white/90 mt-0.5 capitalize">
                      {inq.intendedTimeline?.replace(/_/g, " ") || "Flexible"}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/35 border border-[#f5c451]/35">
                    <span className="text-[11px] text-[#ffe28a] uppercase font-bold tracking-wider">
                      Total Package Valuation
                    </span>
                    <p className="font-philosopher text-xl font-bold gold-text mt-0.5 tabular-nums">
                      ${inq.totalPrice.toLocaleString()} USD
                    </p>
                  </div>
                </div>

                {inq.projectRequirements && (
                  <div className="p-3 rounded-xl bg-[#090214]/85 border border-[#d696ff]/20 text-xs text-white/80 leading-relaxed">
                    <strong className="text-[#ffe28a] font-bold">Custom Requirements:</strong>{" "}
                    {inq.projectRequirements}
                  </div>
                )}

                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <span className="text-xs text-white/60">
                    Need revisions or custom expansion module additions?
                  </span>
                  <Link
                    href={`/select-design?design=${inq.selectedDesignId}&total=${inq.totalPrice}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1a0730] border border-[#f5c451]/55 hover:border-[#ffe28a] text-xs font-semibold text-white hover:text-[#ffe28a] px-4 h-9 self-start sm:self-auto transition-colors duration-150"
                  >
                    <span>Re-Configure or Reserve (5% Off)</span>
                    <ArrowRight size={13} className="text-[#f5c451]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

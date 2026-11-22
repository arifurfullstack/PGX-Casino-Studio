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
    <div className="space-y-8">
      {/* Luxury Page Header */}
      <section className="js-portal-hero portal-panel p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <span className="portal-icon-medallion portal-icon-medallion-active w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <FileSpreadsheet size={26} className="gold-icon" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5c451]">
              Custom Casino Package Estimates
            </p>
            <h1 className="font-philosopher text-2xl sm:text-3xl xl:text-4xl font-bold italic text-white leading-tight mt-1">
              Saved <span className="gold-text">Configurations</span> &amp; Quotations
            </h1>
            <p className="text-sm sm:text-base text-white/70 mt-2 max-w-2xl">
              Review all custom turnkey casino platform package valuations and module selections tailored for your gaming brand.
            </p>
          </div>
        </div>

        <Link
          href="/designs"
          className="js-portal-cta btn-royal-gold shine px-6 py-3.5 text-[15px] font-extrabold shrink-0 self-start lg:self-auto"
        >
          <Plus size={18} className="stroke-[2.75]" />
          <span>New Configuration</span>
        </Link>
      </section>

      {/* Quotes List */}
      {inquiries.length === 0 ? (
        <section className="js-portal-panel portal-panel p-10 sm:p-14 text-center space-y-5">
          <span className="js-portal-float portal-icon-medallion w-16 h-16 rounded-2xl mx-auto flex items-center justify-center">
            <Sparkles size={28} className="gold-icon" />
          </span>
          <h2 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
            No Quotations Saved Yet
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Browse our 12 turnkey casino designs and select optional expansion modules — Live Dealer, Sportsbook, Poker, or Sweepstakes — to calculate your custom platform investment.
          </p>
          <div className="pt-2">
            <Link
              href="/designs"
              className="js-portal-cta btn-royal-gold shine px-8 py-4 text-[15px] font-extrabold"
            >
              <span>Browse Casino Catalog</span>
              <ArrowRight size={18} className="stroke-[2.75]" />
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inq) => {
            return (
              <div
                key={inq.id}
                className="js-portal-panel js-portal-card group portal-panel panel-interactive p-6 sm:p-8 space-y-6"
              >
                <div className="portal-card-spotlight" aria-hidden="true" />
                <div className="panel-sheen" aria-hidden="true" />
                <div className="panel-rim" aria-hidden="true" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#d696ff]/20">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-philosopher text-xl font-bold text-[#e5b8ff] tabular-nums">
                      {inq.referenceNumber}
                    </span>
                    <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-purple-950/90 text-[#ffe28a] border border-[#f5c451]/40 uppercase tracking-wider">
                      {inq.status.replace("_", " ")}
                    </span>
                  </div>

                  <span className="text-sm text-white/65 tabular-nums">
                    Submitted on {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-4 rounded-2xl bg-[#0d031b]/75 border border-[#d696ff]/25">
                    <span className="text-xs text-white/55 uppercase font-bold tracking-wider">
                      Casino Look Selected
                    </span>
                    <p className="font-philosopher text-lg sm:text-xl font-bold text-white mt-1">
                      {inq.selectedDesignName}
                    </p>
                    {inq.selectedAddonIds?.length > 0 ? (
                      <p className="text-xs text-[#d58cff] font-semibold mt-1.5 capitalize">
                        Modules: {inq.selectedAddonIds.join(", ").replace(/-/g, " ")}
                      </p>
                    ) : (
                      <p className="text-xs text-white/55 mt-1.5">Standard Starter Package</p>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d031b]/75 border border-[#d696ff]/25">
                    <span className="text-xs text-white/55 uppercase font-bold tracking-wider">
                      Target Launch Timeline
                    </span>
                    <p className="font-philosopher text-lg sm:text-xl font-bold text-white/90 mt-1 capitalize">
                      {inq.intendedTimeline?.replace(/_/g, " ") || "Flexible"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/35 border border-[#f5c451]/45">
                    <span className="text-xs text-[#ffe28a] uppercase font-bold tracking-wider">
                      Total Package Valuation
                    </span>
                    <p className="font-philosopher text-2xl sm:text-3xl font-bold gold-text mt-1 tabular-nums">
                      ${inq.totalPrice.toLocaleString()} USD
                    </p>
                  </div>
                </div>

                {inq.projectRequirements && (
                  <div className="relative z-10 p-4 rounded-2xl bg-[#090214]/85 border border-[#d696ff]/25 text-sm text-white/80 leading-relaxed">
                    <strong className="text-[#ffe28a] font-bold">Custom Requirements:</strong>{" "}
                    {inq.projectRequirements}
                  </div>
                )}

                <div className="relative z-10 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm text-white/60">
                    Need revisions or custom expansion module additions?
                  </span>
                  <Link
                    href={`/select-design?design=${inq.selectedDesignId}&total=${inq.totalPrice}`}
                    className="js-portal-cta btn-nav-portal inline-flex text-sm px-5 h-11 self-start sm:self-auto"
                  >
                    <span>Re-Configure or Reserve (5% Off)</span>
                    <ArrowRight size={15} className="text-[#f5c451]" />
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

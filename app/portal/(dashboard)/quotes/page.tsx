import Link from "next/link";
import { redirect } from "next/navigation";
import { FileSpreadsheet, ArrowRight, Plus } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-[#FFD700]" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Saved Configurations &amp; Quotations
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Review all custom casino platform package estimates generated for your gaming brand.
          </p>
        </div>

        <Link
          href="/designs"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_12px_rgba(255,215,0,0.3)] self-start sm:self-auto"
        >
          <Plus size={14} className="stroke-[2.5]" />
          <span>New Configuration</span>
        </Link>
      </div>

      {/* Quotes List */}
      {inquiries.length === 0 ? (
        <div className="p-8 rounded-xl bg-[#080214] border border-purple-900/40 text-center space-y-3">
          <FileSpreadsheet size={32} className="mx-auto text-purple-400/60" />
          <h2 className="text-sm font-bold text-white">No Quotations Saved Yet</h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Browse our 12 turnkey casino designs and select optional expansion modules to calculate your custom platform price.
          </p>
          <Link
            href="/designs"
            className="inline-block mt-2 px-4 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700]"
          >
            Browse Casino Catalog →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            return (
              <div
                key={inq.id}
                className="p-5 rounded-xl bg-[#080214] border border-purple-900/50 space-y-3 shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-900/30">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-purple-300">
                      {inq.referenceNumber}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-950 text-purple-200 border border-purple-500/30 uppercase">
                      {inq.status.replace("_", " ")}
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400">
                    Submitted on {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">
                      Casino Look Selected
                    </span>
                    <p className="font-bold text-white mt-0.5">{inq.selectedDesignName}</p>
                    {inq.selectedAddonIds?.length > 0 ? (
                      <p className="text-[11px] text-purple-300 mt-1">
                        Modules: {inq.selectedAddonIds.join(", ").replace(/-/g, " ")}
                      </p>
                    ) : (
                      <p className="text-[11px] text-gray-500 mt-1">Standard Starter Package</p>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">
                      Target Launch Timeline
                    </span>
                    <p className="text-gray-300 mt-0.5 capitalize">
                      {inq.intendedTimeline?.replace(/_/g, " ")}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">
                      Total Package Valuation
                    </span>
                    <p className="text-base font-black text-[#FFD700] mt-0.5">
                      ${inq.totalPrice.toLocaleString()} USD
                    </p>
                  </div>
                </div>

                {inq.projectRequirements && (
                  <div className="p-2.5 rounded bg-[#04010a] border border-purple-900/30 text-[11px] text-gray-300">
                    <strong className="text-gray-400">Custom Requirements:</strong> {inq.projectRequirements}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">
                    Need revisions or custom module additions?
                  </span>
                  <Link
                    href={`/select-design?design=${inq.selectedDesignId}&total=${inq.totalPrice}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FFD700] hover:text-[#FFE57F] transition-colors"
                  >
                    <span>Re-Configure or Reserve (5% Off)</span>
                    <ArrowRight size={13} />
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

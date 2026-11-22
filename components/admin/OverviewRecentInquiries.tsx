import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { CustomerInquiry } from "@/types";

interface OverviewRecentInquiriesProps {
  inquiries: CustomerInquiry[];
}

const statusBadges: Record<string, { label: string; color: string }> = {
  new_inquiry: { label: "New Inquiry", color: "bg-blue-950/80 text-blue-300 border-blue-500/40" },
  contacted: { label: "Contacted", color: "bg-purple-950/80 text-purple-300 border-purple-500/40" },
  reviewing_requirements: { label: "Reviewing", color: "bg-amber-950/80 text-amber-300 border-amber-500/40" },
  agreement_completed: { label: "Agreement Signed", color: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" },
  cancelled: { label: "Cancelled", color: "bg-red-950/80 text-red-300 border-red-500/40" },
};

export default function OverviewRecentInquiries({ inquiries }: OverviewRecentInquiriesProps) {
  const recent = inquiries.slice(0, 5);

  return (
    <div className="p-6 rounded-2xl bg-[#080214] border border-purple-900/40">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <MessageSquare size={20} className="text-[#FFD700]" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Recent Customer Inquiries
          </h2>
        </div>
        <Link
          href="/admin/inquiries"
          className="text-sm font-semibold text-[#FFD700] hover:text-[#FFE57F] inline-flex items-center gap-1.5 transition-colors"
        >
          <span>View All ({inquiries.length})</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="py-12 text-center text-gray-400 text-sm">
          No inquiries submitted yet.
        </div>
      ) : (
        <div className="divide-y divide-purple-900/30">
          {recent.map((inq) => {
            const badge = statusBadges[inq.status] || {
              label: inq.status,
              color: "bg-gray-800 text-gray-300 border-gray-600",
            };

            return (
              <div
                key={inq.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.03] px-3 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-white">{inq.fullName}</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                    <span className="text-gray-500 font-mono">{inq.referenceNumber}</span>
                    <span>•</span>
                    <span className="text-[#FFD700] font-medium">{inq.selectedDesignName}</span>
                    <span>•</span>
                    <span>${inq.totalPrice.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="text-right sm:shrink-0">
                  <span className="text-xs text-gray-400">
                    {new Date(inq.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

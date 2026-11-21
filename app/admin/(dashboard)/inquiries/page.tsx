import { MessageSquare } from "lucide-react";
import { getAllInquiries } from "@/services/inquiryService";
import InquiriesTable from "@/components/admin/inquiries/InquiriesTable";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-[#FFD700]" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Customer Inquiries CRM
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Track quotation requests, contact leads on WhatsApp or Email, and log client negotiation notes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-200">
            Total Leads: <strong className="text-[#FFD700]">{inquiries.length}</strong>
          </span>
        </div>
      </div>

      <InquiriesTable initialInquiries={inquiries} />
    </div>
  );
}

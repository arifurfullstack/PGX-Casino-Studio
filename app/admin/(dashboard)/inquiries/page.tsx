import { MessageSquare } from "lucide-react";
import { getAllInquiries } from "@/services/inquiryService";
import InquiriesTable from "@/components/admin/inquiries/InquiriesTable";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2.5">
            <MessageSquare size={26} className="text-[#FFD700]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Customer Inquiries CRM
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mt-1.5">
            Track quotation requests, contact leads on WhatsApp or Email, and log client negotiation notes.
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-sm">
          <span className="px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-500/35 text-purple-200 font-medium">
            Total Leads: <strong className="text-[#FFD700]">{inquiries.length}</strong>
          </span>
        </div>
      </div>

      <InquiriesTable initialInquiries={inquiries} />
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Search,
  MessageSquare,
  Mail,
  FileText,
  X,
  Save,
  Loader2,
  Download,
} from "lucide-react";
import { CustomerInquiry, InquiryStatus } from "@/types";
import { updateInquiryStatusAction } from "@/app/actions/adminInquiryActions";

interface InquiriesTableProps {
  initialInquiries: CustomerInquiry[];
}

const statusOptions: { value: InquiryStatus; label: string; color: string }[] = [
  { value: "new_inquiry", label: "New Inquiry", color: "bg-blue-950 text-blue-300 border-blue-500/40" },
  { value: "contacted", label: "Contacted", color: "bg-purple-950 text-purple-300 border-purple-500/40" },
  { value: "reviewing_requirements", label: "Reviewing", color: "bg-amber-950 text-amber-300 border-amber-500/40" },
  { value: "agreement_completed", label: "Agreement Signed", color: "bg-emerald-950 text-emerald-300 border-emerald-500/40" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-950 text-red-300 border-red-500/40" },
];

export default function InquiriesTable({ initialInquiries }: InquiriesTableProps) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.phoneNumber.includes(search) ||
      inq.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inq.selectedDesignName.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "all") return true;
    return inq.status === activeTab;
  });

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    await updateInquiryStatusAction(id, newStatus);
  };

  const exportInquiriesToCsv = () => {
    const headers = [
      "Reference",
      "Full Name",
      "Email",
      "Phone",
      "WhatsApp",
      "Company",
      "Design Name",
      "Timeline",
      "Total Price",
      "Status",
      "Date",
      "Project Requirements",
      "Admin Notes",
    ];
    const rows = filtered.map((i) => [
      i.referenceNumber,
      `"${i.fullName.replace(/"/g, '""')}"`,
      i.email,
      i.phoneNumber,
      i.whatsappNumber || "",
      `"${(i.companyName || "").replace(/"/g, '""')}"`,
      `"${(i.selectedDesignName || "").replace(/"/g, '""')}"`,
      i.intendedTimeline,
      i.totalPrice,
      i.status,
      i.createdAt,
      `"${(i.projectRequirements || "").replace(/"/g, '""')}"`,
      `"${(i.adminNotes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDetailsModal = (inq: CustomerInquiry) => {
    setSelectedInquiry(inq);
    setEditingNotes(inq.adminNotes || "");
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    await updateInquiryStatusAction(selectedInquiry.id, selectedInquiry.status, editingNotes);
    setInquiries((prev) =>
      prev.map((i) => (i.id === selectedInquiry.id ? { ...i, adminNotes: editingNotes } : i))
    );
    setSavingNotes(false);
    setSelectedInquiry(null);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["all", "new_inquiry", "contacted", "reviewing_requirements", "agreement_completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-purple-950 text-[#FFD700] border border-purple-500/50"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, ref, or theme..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-[#080214] border border-purple-500/35 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700]"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={exportInquiriesToCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#FFD700] bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 transition-all shrink-0 cursor-pointer"
            title="Export filtered inquiries to CSV"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="overflow-x-auto rounded-2xl border border-purple-900/40 bg-[#080214] shadow-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-purple-950/45 text-xs font-bold uppercase tracking-wider text-gray-300 border-b border-purple-900/40">
            <tr>
              <th className="py-4 px-5">Ref &amp; Date</th>
              <th className="py-4 px-5">Customer</th>
              <th className="py-4 px-5">Design &amp; Package</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/25">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                  No inquiries found matching your filters.
                </td>
              </tr>
            ) : (
              filtered.map((inq) => {
                const whatsappUrl = `https://wa.me/${(inq.whatsappNumber || inq.phoneNumber).replace(/[^0-9]/g, "")}`;

                return (
                  <tr key={inq.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Reference & Date */}
                    <td className="py-4 px-5">
                      <p className="font-mono text-purple-300 font-bold text-sm">{inq.referenceNumber}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Customer Info */}
                    <td className="py-4 px-5">
                      <p className="font-bold text-white text-sm">{inq.fullName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{inq.email}</p>
                      {inq.companyName && (
                        <p className="text-xs text-[#FFD700] mt-0.5">{inq.companyName}</p>
                      )}
                    </td>

                    {/* Theme & Value */}
                    <td className="py-4 px-5">
                      <p className="font-semibold text-white text-sm">{inq.selectedDesignName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ${inq.totalPrice.toLocaleString()} USD
                        {inq.selectedAddonIds?.length > 0 && (
                          <span className="text-purple-300"> (+{inq.selectedAddonIds.length} modules)</span>
                        )}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-5">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                        className="px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/40 text-xs font-semibold text-gray-200 focus:outline-none focus:border-[#FFD700]"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Contact & Details Action */}
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Chat on WhatsApp"
                          className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/35 transition-colors"
                        >
                          <MessageSquare size={15} />
                        </a>
                        <a
                          href={`mailto:${inq.email}?subject=All I Gaming Proposal - ${inq.referenceNumber}`}
                          title="Send Email"
                          className="p-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-blue-400 border border-blue-500/35 transition-colors"
                        >
                          <Mail size={15} />
                        </a>
                        <button
                          onClick={() => openDetailsModal(inq)}
                          title="View Full Notes & Requirements"
                          className="p-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-[#FFD700] border border-purple-500/35 transition-colors cursor-pointer"
                        >
                          <FileText size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Details & Admin Notes Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0316] border border-purple-500/40 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-[0_0_35px_rgba(168,85,247,0.3)]">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Inquiry: {selectedInquiry.referenceNumber}
                </h3>
                <p className="text-[11px] text-gray-400">{selectedInquiry.fullName}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 uppercase text-[10px] font-bold">Timeline:</span>
                <p className="text-white capitalize">{selectedInquiry.intendedTimeline?.replace(/_/g, " ")}</p>
              </div>

              <div>
                <span className="text-gray-400 uppercase text-[10px] font-bold">Customer Project Requirements:</span>
                <div className="mt-1 p-2.5 rounded bg-[#04010a] border border-purple-900/50 text-gray-200 text-xs whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {selectedInquiry.projectRequirements || "No extra project requirements entered by customer."}
                </div>
              </div>

              <div>
                <span className="text-gray-400 uppercase text-[10px] font-bold">Internal Admin Notes:</span>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record call notes, proposal sent, or client negotiation status..."
                  rows={3}
                  className="mt-1 w-full p-2.5 rounded bg-[#04010a] border border-purple-500/40 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-900/40">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white bg-white/5"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110"
              >
                {savingNotes ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

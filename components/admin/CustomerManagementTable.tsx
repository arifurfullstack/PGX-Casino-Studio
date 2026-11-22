"use client";

import { useState, useTransition } from "react";
import {
  Search,
  Users,
  ShieldCheck,
  Building2,
  Mail,
  MessageCircle,
  Clock,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { AdminCustomerRecord } from "@/services/adminCustomerService";
import { toggleCustomerStatusAction } from "@/app/actions/adminCustomerActions";
import CustomerDossierModal from "./CustomerDossierModal";

interface CustomerManagementTableProps {
  initialCustomers: AdminCustomerRecord[];
}

export default function CustomerManagementTable({ initialCustomers }: CustomerManagementTableProps) {
  const [customers, setCustomers] = useState<AdminCustomerRecord[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "registered" | "holds" | "suspended">("all");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomerRecord | null>(null);
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.companyName.toLowerCase().includes(q) ||
      c.phoneNumber.includes(q);

    if (!matchSearch) return false;
    if (filter === "registered") return c.isRegistered;
    if (filter === "holds") return c.hasActiveHold;
    if (filter === "suspended") return c.status === "suspended";
    return true;
  });

  const handleToggleStatus = (email: string, currentStatus: "active" | "suspended") => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    startTransition(async () => {
      const res = await toggleCustomerStatusAction(email, newStatus);
      if (res.success) {
        setCustomers((prev) =>
          prev.map((c) => (c.email === email ? { ...c, status: newStatus } : c))
        );
        setActionMessage(`Updated ${email} status to ${newStatus}`);
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  const handleExportCSV = () => {
    const headers = [
      "Full Name",
      "Company",
      "Email",
      "Phone",
      "WhatsApp",
      "Registered",
      "Status",
      "Inquiries Count",
      "Reservations Count",
      "Total Pipeline ($)",
      "Active 5-Day Hold",
      "Last Activity",
    ];

    const rows = filteredCustomers.map((c) => [
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${c.companyName.replace(/"/g, '""')}"`,
      `"${c.email}"`,
      `"${c.phoneNumber}"`,
      `"${c.whatsappNumber}"`,
      c.isRegistered ? "Yes" : "No",
      c.status,
      c.inquiriesCount,
      c.reservationsCount,
      c.totalPipelineValue,
      c.hasActiveHold ? "Active Hold" : "None",
      `"${new Date(c.lastActivityDate).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `alligaming_customers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {actionMessage && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, client name, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-purple-950/20 border border-purple-900/50 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["all", "registered", "holds", "suspended"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                filter === tab
                  ? "bg-purple-900/60 text-[#FFD700] border border-purple-500/40"
                  : "bg-white/5 text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              {tab === "holds" ? "Active Holds" : tab}
            </button>
          ))}

          <button
            onClick={handleExportCSV}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/50 border border-purple-500/35 text-sm font-bold text-gray-200 hover:text-[#FFD700] transition-colors shrink-0 cursor-pointer"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#0b0114] border border-purple-900/40 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-purple-900/40 bg-purple-950/40 text-gray-300 font-bold uppercase tracking-wider text-xs">
                <th className="py-4 px-5">Operator / Client</th>
                <th className="py-4 px-5">Contact</th>
                <th className="py-4 px-5">Account Type</th>
                <th className="py-4 px-5">Activity &amp; Pipeline</th>
                <th className="py-4 px-5">Hold Status</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/50 text-gray-300">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-14 text-gray-400">
                    <Users size={36} className="mx-auto mb-2.5 opacity-30 text-purple-400" />
                    <p className="font-semibold text-base">No customers match this filter</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.email} className="hover:bg-purple-950/20 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-white flex items-center gap-2 text-sm">
                        <Building2 size={15} className="text-[#FFD700] shrink-0" />
                        <span>{cust.companyName}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{cust.fullName}</p>
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5 text-gray-200 text-sm">
                        <Mail size={14} className="text-purple-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{cust.email}</span>
                      </div>
                      {cust.whatsappNumber && (
                        <a
                          href={`https://wa.me/${cust.whatsappNumber.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-green-400 hover:underline mt-1"
                        >
                          <MessageCircle size={13} className="shrink-0" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </td>

                    <td className="py-4 px-5">
                      {cust.isRegistered ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-300">
                          <ShieldCheck size={13} />
                          <span>Portal Client</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/30 text-xs font-medium text-gray-400">
                          <span>Quote Lead</span>
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-[#FFD700] text-sm">
                        ${cust.totalPipelineValue.toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {cust.inquiriesCount} quotes · {cust.reservationsCount} reservations
                      </p>
                    </td>

                    <td className="py-4 px-5">
                      {cust.hasActiveHold ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-bold text-yellow-400">
                          <Clock size={12} />
                          <span>120h Hold Active</span>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">None</span>
                      )}
                    </td>

                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleToggleStatus(cust.email, cust.status)}
                        disabled={isPending || !cust.isRegistered}
                        title={cust.isRegistered ? "Click to toggle Active/Suspended" : "Unregistered lead"}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          cust.status === "active"
                            ? "bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-red-500/20"
                            : "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-green-500/20"
                        } ${!cust.isRegistered ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {cust.status === "active" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        <span className="uppercase">{cust.status}</span>
                      </button>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-900/40 border border-purple-500/35 text-xs sm:text-sm font-semibold text-gray-200 hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-colors cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>View Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerDossierModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}

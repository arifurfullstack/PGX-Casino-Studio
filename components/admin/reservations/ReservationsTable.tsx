"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Clock,
  Search,
  Download,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import { Reservation, ReservationStatus } from "@/types";
import { updateReservationStatusAction } from "@/app/actions/adminReservationActions";

interface ReservationsTableProps {
  initialReservations: Reservation[];
}

function subscribeToClock(callback: () => void) {
  const timer = setInterval(callback, 60000);
  return () => clearInterval(timer);
}

function getNowSnapshot() {
  return Date.now();
}

function getNowServerSnapshot() {
  return 0;
}

export default function ReservationsTable({ initialReservations }: ReservationsTableProps) {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const now = useSyncExternalStore(subscribeToClock, getNowSnapshot, getNowServerSnapshot);

  const getRemainingTime = (expiresAtStr: string) => {
    if (!now) return { text: "Calculating...", isExpired: false };
    const diff = new Date(expiresAtStr).getTime() - now;
    if (diff <= 0) return { text: "Expired", isExpired: true };
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { text: `${hours}h ${mins}m left`, isExpired: false };
  };

  const filtered = reservations.filter((r) => {
    const matchesSearch =
      r.reservationId.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      r.selectedDesignName.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "all") return true;
    return r.status === filter;
  });

  const exportReservationsToCsv = () => {
    const headers = [
      "Reservation ID",
      "Customer Name",
      "Email",
      "Phone",
      "Design Name",
      "Original Price",
      "Discount %",
      "Discounted Price",
      "Reservation Fee",
      "Remaining Balance",
      "Payment Status",
      "Status",
      "Start Time",
      "Expires At",
    ];
    const rows = filtered.map((r) => [
      r.reservationId,
      `"${r.customerName.replace(/"/g, '""')}"`,
      r.customerEmail,
      r.customerPhone,
      `"${r.selectedDesignName.replace(/"/g, '""')}"`,
      r.originalPackagePrice,
      r.discountPercent,
      r.discountedPrice,
      r.reservationFee,
      r.remainingBalance,
      r.paymentStatus,
      r.status,
      r.startTime,
      r.expiresAt,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reservations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = async (
    reservationId: string,
    newStatus: ReservationStatus,
    paymentStatus?: "paid" | "refunded"
  ) => {
    setUpdatingId(reservationId);
    setReservations((prev) =>
      prev.map((r) =>
        r.reservationId === reservationId
          ? { ...r, status: newStatus, ...(paymentStatus && { paymentStatus }) }
          : r
      )
    );

    await updateReservationStatusAction(reservationId, newStatus, paymentStatus);
    setUpdatingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {["all", "active", "agreement_completed", "expired", "refunded"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === tab
                  ? "bg-purple-950 text-[#FFD700] border border-purple-500/50"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search booking ID, customer, theme..."
              className="w-full px-3 py-1.5 pl-8 rounded-lg bg-[#080214] border border-purple-500/30 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
            />
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={exportReservationsToCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#FFD700] bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 transition-all shrink-0"
            title="Export filtered reservations to CSV"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-purple-900/40 bg-[#080214]">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-purple-950/40 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-purple-900/40">
            <tr>
              <th className="py-3 px-4">Booking &amp; Hold Time</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Design Theme</th>
              <th className="py-3 px-4">Financials (5% Lock)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/20">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No reservations found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const { text: timeText, isExpired } = getRemainingTime(r.expiresAt);
                const isWorking = updatingId === r.reservationId;

                return (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Booking & Hold Time */}
                    <td className="py-3 px-4">
                      <p className="font-mono text-purple-300 font-bold">{r.reservationId}</p>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <Clock size={11} className={isExpired ? "text-red-400" : "text-[#FFD700]"} />
                        <span className={isExpired ? "text-red-400 font-semibold" : "text-gray-300"}>
                          {r.status === "active" ? timeText : r.status.replace("_", " ")}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <p className="font-bold text-white">{r.customerName}</p>
                      <p className="text-[11px] text-gray-400">{r.customerEmail}</p>
                      <p className="text-[10px] text-gray-500">{r.customerPhone}</p>
                    </td>

                    {/* Theme */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{r.selectedDesignName}</p>
                      {r.selectedAddons?.length > 0 && (
                        <p className="text-[10px] text-purple-300">
                          +{r.selectedAddons.length} expansion modules
                        </p>
                      )}
                    </td>

                    {/* Financials Breakdown */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        <p className="text-gray-400">Total: ${r.originalPackagePrice.toLocaleString()}</p>
                        <p className="text-emerald-400 font-semibold">5% Off: -${Math.round(r.originalPackagePrice * 0.05).toLocaleString()}</p>
                        <p className="text-white font-bold">
                          Balance Due: ${r.remainingBalance.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-[#FFD700] font-mono">$500 fee paid</p>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          r.status === "active"
                            ? "bg-purple-950 text-purple-300 border-purple-500/40"
                            : r.status === "agreement_completed"
                            ? "bg-emerald-950 text-emerald-300 border-emerald-500/40"
                            : r.status === "refunded"
                            ? "bg-blue-950 text-blue-300 border-blue-500/40"
                            : "bg-red-950 text-red-300 border-red-500/40"
                        }`}
                      >
                        {r.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {r.status === "active" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(r.reservationId, "agreement_completed")}
                              disabled={isWorking}
                              className="px-2.5 py-1 rounded text-[11px] font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all flex items-center gap-1"
                              title="Sign Agreement &amp; Credit $500 to Invoice"
                            >
                              <CheckCircle size={11} className="stroke-[2.5]" />
                              <span>Complete</span>
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(r.reservationId, "refunded", "refunded")}
                              disabled={isWorking}
                              className="px-2 py-1 rounded text-[11px] font-semibold text-blue-300 bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 transition-colors flex items-center gap-1"
                              title="Refund $500 Holding Fee"
                            >
                              <RotateCcw size={11} />
                              <span>Refund</span>
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(r.reservationId, "expired")}
                              disabled={isWorking}
                              className="px-2 py-1 rounded text-[11px] font-semibold text-red-300 bg-red-950/60 hover:bg-red-900 border border-red-500/40 transition-colors"
                              title="Mark Expired"
                            >
                              Expire
                            </button>
                          </>
                        )}
                        {r.status !== "active" && (
                          <span className="text-[11px] text-gray-500 italic">Archived</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

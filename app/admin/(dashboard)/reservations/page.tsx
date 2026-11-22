import { Clock } from "lucide-react";
import { getAllReservations } from "@/services/reservationService";
import ReservationsTable from "@/components/admin/reservations/ReservationsTable";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await getAllReservations();
  const activeCount = reservations.filter((r) => r.status === "active").length;
  const lockedValue = reservations
    .filter((r) => r.status === "active")
    .reduce((sum, r) => sum + r.discountedPrice, 0);

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2.5">
            <Clock size={26} className="text-[#FFD700]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              5-Day Price Locks &amp; Reservations
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mt-1.5">
            Monitor $500 reservation holdings, 120-hour price lock countdowns, and record agreement sign-offs or refunds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-500/35 text-purple-200 font-medium">
            Active Holds: <strong className="text-[#FFD700]">{activeCount}</strong>
          </span>
          <span className="px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/35 text-emerald-200 font-medium">
            Locked Value: <strong className="text-white">${lockedValue.toLocaleString()} USD</strong>
          </span>
        </div>
      </div>

      <ReservationsTable initialReservations={reservations} />
    </div>
  );
}

import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Crown,
  DollarSign,
} from "lucide-react";
import { getReservationById } from "@/services/reservationService";
import { getPublicPaymentConfig } from "@/services/integrationService";
import StandaloneReservationPay from "@/components/reservation/StandaloneReservationPay";

export const dynamic = "force-dynamic";

interface StandaloneReservationPageProps {
  params: Promise<{ id: string }>;
}

export default async function StandaloneReservationPage({
  params,
}: StandaloneReservationPageProps) {
  const { id } = await params;
  const [reservation, paymentConfig] = await Promise.all([
    getReservationById(id),
    getPublicPaymentConfig(),
  ]);

  if (!reservation) {
    return (
      <main className="min-h-screen pt-16 pb-24 bg-[#04010a] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl bg-[#090214] border border-purple-900/60 p-8 text-center space-y-4 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
          <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 mx-auto flex items-center justify-center">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-xl font-black text-white">Reservation Not Found</h1>
          <p className="text-xs text-gray-400">
            The reservation identifier <code className="text-purple-300 font-mono">{id}</code> could not be found or has been archived.
          </p>
          <div className="pt-2">
            <Link
              href="/designs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            >
              <span>Browse Casino Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isAlreadyPaid = reservation.status === "active" || reservation.status === "agreement_completed";
  const isExpired = reservation.status === "expired" || reservation.status === "cancelled";

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-24 bg-[#04010a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Turnkey Holding Dossier
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Secure 5-Day <span className="text-[#FFD700]">Reservation Hold</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Reference: <strong className="text-yellow-400 font-mono">{reservation.reservationId}</strong> • Client: <strong className="text-white">{reservation.customerName}</strong>
          </p>
        </div>

        {/* If Already Paid */}
        {isAlreadyPaid && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#090214] border-2 border-[#34d399] text-center space-y-4 shadow-[0_0_40px_rgba(52,211,153,0.2)]">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-[#34d399] mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Holding Deposit Already Secured!
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              Your 5-day price lock and 5% discount for <strong>{reservation.selectedDesignName}</strong> are active.
            </p>
            <div className="pt-2">
              <Link
                href={`/confirmation/reservation?id=${reservation.reservationId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                <span>View Official Reservation Receipt</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* If Expired */}
        {isExpired && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#090214] border-2 border-red-500/60 text-center space-y-4 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 mx-auto flex items-center justify-center">
              <Clock size={36} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              120-Hour Holding Period Expired
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              This reservation hold has concluded and the 5% discount incentive has been released. The $500 deposit was initiated for refund.
            </p>
            <div className="pt-2">
              <Link
                href="/designs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-[#FFD700] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                <span>Start New Platform Selection</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* If Pending Payment -> Show 2-Column Checkout */}
        {!isAlreadyPaid && !isExpired && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Reservation Package Summary */}
            <div className="lg:col-span-5 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="space-y-1 pb-4 border-b border-purple-900/40">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Target Casino Solution
                </span>
                <h3 className="text-xl font-black text-white">
                  {reservation.selectedDesignName}
                </h3>
                {reservation.selectedAddons && reservation.selectedAddons.length > 0 && (
                  <p className="text-xs text-purple-300">
                    Includes: {reservation.selectedAddons.join(", ")}
                  </p>
                )}
              </div>

              {/* Financial Calculation Table */}
              <div className="p-4 rounded-xl bg-[#04010a] border border-purple-900/50 space-y-3">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Standard Package Price:</span>
                  <span className="line-through">${reservation.originalPackagePrice.toLocaleString()} USD</span>
                </div>

                <div className="flex justify-between text-xs text-[#34d399] font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles size={13} />
                    <span>5% Exclusive Reservation Discount:</span>
                  </span>
                  <span>-${Math.round((reservation.originalPackagePrice * reservation.discountPercent) / 100).toLocaleString()} USD</span>
                </div>

                <div className="flex justify-between text-xs text-white font-bold pt-2 border-t border-purple-900/40">
                  <span>Locked Turnkey Total:</span>
                  <span className="text-sm text-yellow-400">${reservation.discountedPrice.toLocaleString()} USD</span>
                </div>

                <div className="flex justify-between text-xs text-white font-bold pt-1">
                  <span>Holding Deposit (Due Now):</span>
                  <span className="text-sm text-[#FFD700]">${reservation.reservationFee} USD</span>
                </div>

                <div className="flex justify-between text-[11px] text-gray-400 pt-2 border-t border-purple-900/40">
                  <span>Remaining Handover Balance:</span>
                  <span>${reservation.remainingBalance.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Commercial Terms Badges */}
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-yellow-400 shrink-0" />
                  <span>Guarantees 5-day (120h) exclusivity and pricing hold.</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-[#34d399] shrink-0" />
                  <span>$500 is 100% refundable if no agreement is finalized.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-purple-400 shrink-0" />
                  <span>Deposit is fully credited toward final package invoice.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Payment Form */}
            <div className="lg:col-span-7 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
              <StandaloneReservationPay
                reservation={reservation}
                paymentConfig={paymentConfig}
              />
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

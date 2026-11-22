import { getAllActiveDesigns } from "@/services/casinoService";
import { getPublicPaymentConfig } from "@/services/integrationService";
import ReservationFlow from "@/components/reservation/ReservationFlow";
import { Crown } from "lucide-react";

export const metadata = {
  title: "Reserve Casino Design | All I Gaming",
  description: "Reserve your online casino design with a $500 refundable deposit.",
};

interface SelectDesignPageProps {
  searchParams: Promise<{ design?: string; total?: string; addons?: string }>;
}

export default async function SelectDesignPage({ searchParams }: SelectDesignPageProps) {
  const { design, total, addons } = await searchParams;
  const [designs, paymentConfig] = await Promise.all([
    getAllActiveDesigns(),
    getPublicPaymentConfig(),
  ]);

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Design Reservation
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Secure Your <span className="text-[#FFD700]">Platform Look</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Lock in your chosen theme and begin the turnkey setup. Holding fee is 100% refundable.
          </p>
        </div>

        {/* Reservation Flow */}
        <ReservationFlow
          designs={designs}
          initialDesignSlug={design}
          initialTotal={total ? parseInt(total, 10) : 15000}
          initialAddons={addons}
          paymentConfig={paymentConfig}
        />

      </div>
    </main>
  );
}

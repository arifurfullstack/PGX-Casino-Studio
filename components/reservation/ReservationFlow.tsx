"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { CasinoDesign } from "@/types";
import { submitInquiryAction, createReservationAction } from "@/app/actions/inquiryActions";
import ReservationOfferModal from "./ReservationOfferModal";
import ReservationConfirmedView from "./ReservationConfirmedView";
import InquiryConfirmedView from "./InquiryConfirmedView";
import ReservationSummaryCard from "./ReservationSummaryCard";

interface ReservationFlowProps {
  designs: CasinoDesign[];
  initialDesignSlug?: string;
  initialTotal?: number;
  initialAddons?: string;
}

export default function ReservationFlow({
  designs,
  initialDesignSlug = "royal-prestige",
  initialTotal = 15000,
  initialAddons = "",
}: ReservationFlowProps) {
  const [selectedSlug, setSelectedSlug] = useState(initialDesignSlug);
  const [brandName, setBrandName] = useState("");
  const [domainPreference, setDomainPreference] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [inquiryData, setInquiryData] = useState<{ id: string; ref: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewState, setViewState] = useState<"form" | "inquiry_confirmed" | "reservation_active">("form");
  const [reservationDetails, setReservationDetails] = useState<{
    reservationId: string;
    discountedPrice: number;
    remainingBalance: number;
    expiresAt: string;
  } | null>(null);

  const selectedDesign = designs.find((d) => d.slug === selectedSlug) || designs[0];
  const packageTotal = initialTotal;
  const addonIds = initialAddons ? initialAddons.split(",").filter(Boolean) : [];

  // Step 1: Submit Selection Form -> Open Modal
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await submitInquiryAction({
      fullName,
      email,
      phoneNumber: phone,
      whatsappNumber: whatsapp || phone,
      companyName,
      intendedTimeline: "immediately",
      projectRequirements: `Brand: ${brandName || "TBD"} | Domain: ${domainPreference || "TBD"}`,
      selectedDesignId: selectedDesign.id,
      selectedDesignName: selectedDesign.name,
      selectedAddonIds: addonIds,
      totalPrice: packageTotal,
    });

    setLoading(false);

    if (res.success && res.inquiryId) {
      setInquiryData({ id: res.inquiryId, ref: res.referenceNumber || "AIG-REQ" });
      setIsModalOpen(true);
    } else {
      alert(res.error || "Submission failed. Please try again.");
    }
  };

  // Option A: Reserve Now ($500)
  const handleConfirmReservation = async () => {
    if (!inquiryData) return;
    setLoading(true);

    const res = await createReservationAction({
      inquiryId: inquiryData.id,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      selectedDesignName: selectedDesign.name,
      selectedAddons: addonIds,
      originalPackagePrice: packageTotal,
    });

    setLoading(false);
    setIsModalOpen(false);

    if (res.success && res.reservationId) {
      setReservationDetails({
        reservationId: res.reservationId,
        discountedPrice: res.discountedPrice || Math.round(packageTotal * 0.95),
        remainingBalance: res.remainingBalance || Math.round(packageTotal * 0.95) - 500,
        expiresAt: res.expiresAt || new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
      });
      setViewState("reservation_active");
    } else {
      alert(res.error || "Failed to activate reservation.");
    }
  };

  // Option B: Continue without reserving
  const handleContinueWithoutReserving = () => {
    setIsModalOpen(false);
    setViewState("inquiry_confirmed");
  };

  // 1. Confirmed Reservation Screen (Option A)
  if (viewState === "reservation_active" && reservationDetails) {
    return (
      <ReservationConfirmedView
        selectedDesign={selectedDesign}
        reservationDetails={reservationDetails}
        packageTotal={packageTotal}
        email={email}
        phone={phone}
      />
    );
  }

  // 2. Confirmed Standard Inquiry Screen (Option B)
  if (viewState === "inquiry_confirmed" && inquiryData) {
    return (
      <InquiryConfirmedView
        selectedDesign={selectedDesign}
        inquiryRef={inquiryData.ref}
      />
    );
  }

  // 3. Main Form
  return (
    <>
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Input Fields */}
        <div className="lg:col-span-7 rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 space-y-5 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black uppercase tracking-wider text-white">
              Operator &amp; Brand Details
            </h2>
            <span className="text-[11px] text-yellow-400 font-semibold">*Required Fields</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Selected Casino Theme
              </label>
              <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white focus:outline-none focus:border-yellow-400"
              >
                {designs.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name} ({d.subtitle})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Casino Brand Name *
                </label>
                <input
                  required
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Royal VIP Casino"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Target Domain (Optional)
                </label>
                <input
                  type="text"
                  value={domainPreference}
                  onChange={(e) => setDomainPreference(e.target.value)}
                  placeholder="e.g. royalvip.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Operator Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Gaming Holdings Ltd."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  WhatsApp / Phone *
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 0199"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Lock size={14} className="stroke-[2.5]" />
            <span>{loading ? "Processing..." : "Submit Selection & View Reservation Offer"}</span>
          </button>
        </div>

        {/* Right Package Summary */}
        <ReservationSummaryCard
          selectedDesign={selectedDesign}
          packageTotal={packageTotal}
          addonCount={addonIds.length}
        />
      </form>

      {/* Reservation Incentive Modal Popup */}
      <ReservationOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        originalPrice={packageTotal}
        designName={selectedDesign.name}
        onConfirmReservation={handleConfirmReservation}
        onContinueWithoutReserving={handleContinueWithoutReserving}
        loading={loading}
      />
    </>
  );
}

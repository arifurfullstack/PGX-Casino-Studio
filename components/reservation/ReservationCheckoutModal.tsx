"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Lock,
  X,
  CreditCard,
  QrCode,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { CasinoDesign, PublicPaymentConfig, PricingConfig } from "@/types";
import { DEFAULT_PRICING_CONFIG } from "@/config/default-package";
import {
  initiateStripePaymentAction,
  submitCryptoPaymentAction,
} from "@/app/actions/adminIntegrationActions";

interface ReservationCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: CasinoDesign;
  packageTotal: number;
  pricingConfig?: PricingConfig;
  customerName: string;
  customerEmail: string;
  reservationId: string;
  paymentConfig: PublicPaymentConfig;
  onPaymentSuccess: (txId?: string) => void;
}

export default function ReservationCheckoutModal({
  isOpen,
  onClose,
  design,
  packageTotal,
  pricingConfig = DEFAULT_PRICING_CONFIG,
  customerName,
  customerEmail,
  reservationId,
  paymentConfig,
  onPaymentSuccess,
}: ReservationCheckoutModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"crypto" | "stripe" | "demo">("crypto");
  const cryptoOptions = ([
    { id: "usdc" as const, label: "USDC (ERC20)", networkCode: "USDC-ERC20", address: paymentConfig.crypto.usdcAddress },
    { id: "btc" as const, label: "BTC", networkCode: "BTC", address: paymentConfig.crypto.btcAddress },
    { id: "trc20" as const, label: "USDT (TRC20)", networkCode: "USDT-TRC20", address: paymentConfig.crypto.usdtTrc20Address },
    { id: "erc20" as const, label: "USDT (ERC20)", networkCode: "USDT-ERC20", address: paymentConfig.crypto.usdtErc20Address },
  ]).filter((opt) => Boolean(opt.address && opt.address.trim()));

  const [selectedCrypto, setSelectedCrypto] = useState<"usdc" | "btc" | "trc20" | "erc20">(
    cryptoOptions[0]?.id || "usdc"
  );
  const [txHash, setTxHash] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const tween = gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 28, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.48, ease: "back.out(1.25)" }
    );
    return () => {
      tween.kill();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const discountPercent = pricingConfig.reservationDiscountPercent;
  const discountAmount = Math.round((packageTotal * discountPercent) / 100);
  const discountedTotal = packageTotal - discountAmount;
  const depositFee = pricingConfig.reservationFee;
  const balanceOnContract = Math.max(0, discountedTotal - depositFee);
  const holdDays = Math.max(1, Math.round(pricingConfig.reservationDurationHours / 24));

  const activeCryptoOption =
    cryptoOptions.find((opt) => opt.id === selectedCrypto) || cryptoOptions[0];

  const getAddress = () => activeCryptoOption?.address || "";

  const handleCopyAddress = () => {
    const addr = getAddress();
    if (addr) {
      navigator.clipboard.writeText(addr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Submit Crypto TxID
  const handleCryptoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setErrorMessage(
        `Please accept the ${holdDays}-day refundable reservation holding terms before continuing.`
      );
      return;
    }
    if (!txHash.trim()) {
      setErrorMessage("Please enter your transaction hash (TxID) for verification.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const network = activeCryptoOption?.networkCode || "USDC-ERC20";

    const res = await submitCryptoPaymentAction(reservationId, txHash.trim(), network);
    setLoading(false);

    if (res.success) {
      onPaymentSuccess(txHash);
    } else {
      setErrorMessage(res.error || "Payment recording failed. Please try again.");
    }
  };

  // Initiate Stripe Checkout
  const handleStripeCheckout = async () => {
    if (!termsAccepted) {
      setErrorMessage(
        `Please accept the ${holdDays}-day refundable reservation holding terms before continuing.`
      );
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const res = await initiateStripePaymentAction({
      reservationId,
      customerEmail,
      customerName,
      designName: design.name,
    });

    setLoading(false);

    if (res.success && res.url) {
      window.location.href = res.url;
    } else {
      setErrorMessage(res.error || "Failed to initialize Stripe checkout session.");
    }
  };

  // Test Simulation Mode
  const handleSimulatePayment = async () => {
    if (!termsAccepted) {
      setErrorMessage(
        `Please accept the ${holdDays}-day refundable reservation holding terms before continuing.`
      );
      return;
    }
    setLoading(true);
    const simulatedTx = "SIM_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    await submitCryptoPaymentAction(reservationId, simulatedTx, "TEST-SIMULATION");
    setLoading(false);
    onPaymentSuccess(simulatedTx);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#05010c]/90 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain"
    >
      <div
        ref={modalRef}
        className="panel panel-gold relative max-w-xl w-full p-5 sm:p-7 space-y-5 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-sheen" aria-hidden="true" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full border border-purple-400/30 bg-[#1a0730]/85 text-white/60 hover:text-white hover:border-[#f5c451]/60 transition-colors"
          title="Close Checkout"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="relative z-10 text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a0a4a]/90 border border-[#f5c451]/60 text-[#ffe28a] text-[10px] font-bold uppercase tracking-[0.16em]">
            <Lock size={12} className="text-[#ffd75e]" />
            <span>Secure {holdDays}-Day Holding Checkout</span>
          </div>
          <h2 className="font-philosopher text-2xl sm:text-3xl font-bold uppercase italic tracking-wide text-white">
            Reserve <span className="gold-text">{design.name}</span>
          </h2>
          <p className="text-xs text-white/70">
            Booking Reference:{" "}
            <strong className="text-[#ffe28a] font-mono">{reservationId}</strong>
          </p>
        </div>

        {/* Financial Breakdown Table */}
        <div className="relative z-10 rounded-2xl bg-[#0e031d]/90 border border-purple-400/30 p-4 space-y-2 text-xs">
          <div className="flex justify-between items-center text-white/60">
            <span>Standard Package Total:</span>
            <span className="line-through tabular-nums">
              ${packageTotal.toLocaleString()} USD
            </span>
          </div>
          <div className="flex justify-between items-center text-emerald-400 font-bold">
            <span>Exclusive {discountPercent}% Reservation Discount:</span>
            <span className="tabular-nums">-${discountAmount.toLocaleString()} USD</span>
          </div>
          <div className="flex justify-between items-center py-2 border-y border-purple-500/25 font-bold text-white">
            <span>Discounted Locked Price:</span>
            <span className="font-philosopher text-lg italic gold-text tabular-nums">
              ${discountedTotal.toLocaleString()} USD
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px]">
            <div className="p-2.5 rounded-xl bg-[#18062f]/80 border border-emerald-400/30">
              <span className="text-white/60 block text-[10px] uppercase">
                Holding Fee Today:
              </span>
              <span className="text-sm font-black text-emerald-400 tabular-nums">
                ${depositFee.toLocaleString()} USD
              </span>
              <span className="text-[10px] text-white/50 block">100% Refundable</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#18062f]/80 border border-[#f5c451]/35">
              <span className="text-white/60 block text-[10px] uppercase">
                Balance on Handover:
              </span>
              <span className="text-sm font-black text-[#ffe28a] tabular-nums">
                ${balanceOnContract.toLocaleString()} USD
              </span>
              <span className="text-[10px] text-white/50 block">Deposit Credited</span>
            </div>
          </div>
        </div>

        {/* Payment Gateway Tabs */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#120424]/90 border border-purple-400/30">
            <button
              type="button"
              onClick={() => setActiveTab("crypto")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "crypto"
                  ? "bg-gradient-to-b from-[#ffe27a] to-[#e69d12] text-[#261100] shadow-md"
                  : "text-white/65 hover:text-white"
              }`}
            >
              <QrCode size={13} />
              <span>Crypto (USDT / BTC)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("stripe")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "stripe"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md"
                  : "text-white/65 hover:text-white"
              }`}
            >
              <CreditCard size={13} />
              <span>Card (Stripe)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("demo")}
              className={`py-2 px-3 rounded-xl text-[11px] font-bold transition-all ${
                activeTab === "demo"
                  ? "bg-white/15 text-white border border-white/30"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Demo
            </button>
          </div>

          {/* TAB 1: CRYPTO DETAILS */}
          {activeTab === "crypto" && (
            <div className="p-4 rounded-2xl bg-[#0b0218]/90 border border-purple-400/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70 font-semibold">Select Network:</span>
                <div className="flex items-center gap-1 flex-wrap justify-end">
                  {cryptoOptions.map((net) => (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => setSelectedCrypto(net.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        selectedCrypto === net.id
                          ? "bg-[#ffd75e] text-[#261100]"
                          : "bg-purple-950/70 text-white/65 hover:text-white"
                      }`}
                    >
                      {net.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/65 uppercase tracking-wider flex items-center justify-between">
                  <span>Transfer Exactly ${depositFee.toLocaleString()} USD To Address:</span>
                  {copied && <span className="text-emerald-400 text-[10px]">Copied!</span>}
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#120424] border border-purple-400/35 font-mono text-xs text-[#ffe28a] break-all select-all">
                  <span className="flex-1">
                    {getAddress() || "Address not configured in Admin"}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="p-1.5 rounded-lg bg-purple-900/70 hover:bg-purple-800 text-white shrink-0 transition-colors"
                    title="Copy Address"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <form onSubmit={handleCryptoSubmit} className="space-y-2 pt-1">
                <label className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">
                  Transaction Hash / TxID (Proof of Transfer) *
                </label>
                <input
                  required
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="e.g. 8f6b1e32d5c4..."
                  className="input !min-h-[42px] !py-2 text-xs font-mono placeholder:text-white/35"
                />
              </form>
            </div>
          )}

          {/* TAB 2: STRIPE DETAILS */}
          {activeTab === "stripe" && (
            <div className="p-5 rounded-2xl bg-[#0b0218]/90 border border-purple-400/30 text-center space-y-3">
              <CreditCard size={30} className="mx-auto text-[#f5c451]" />
              <h3 className="font-philosopher text-lg font-bold text-white">
                Credit / Debit Card Checkout
              </h3>
              <p className="text-xs text-white/70 max-w-sm mx-auto">
                Pay the 100% refundable{" "}
                <strong className="text-white">${depositFee.toLocaleString()} USD</strong> holding
                deposit with Visa, Mastercard, or American Express via Stripe.
              </p>
              {!paymentConfig.stripe.enabled && (
                <p className="text-[11px] text-[#ffe28a] font-medium">
                  Stripe card processing is currently in setup mode. Use Crypto or Demo Simulation.
                </p>
              )}
            </div>
          )}

          {/* TAB 3: DEMO TEST MODE */}
          {activeTab === "demo" && (
            <div className="p-4 rounded-2xl bg-[#0b0218]/90 border border-purple-400/30 space-y-1.5 text-center text-xs">
              <p className="text-white font-semibold">Test &amp; Onboarding Simulation</p>
              <p className="text-white/60 text-[11px]">
                Simulate an immediate ${depositFee.toLocaleString()} reservation confirmation
                without sending live funds to verify the {pricingConfig.reservationDurationHours}
                -hour hold timer and receipt.
              </p>
            </div>
          )}
        </div>

        {/* Mandatory Terms Acceptance */}
        <label className="relative z-10 flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#150529]/80 border border-purple-400/30 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              if (e.target.checked) setErrorMessage(null);
            }}
            className="mt-0.5 w-4 h-4 rounded accent-[#f5c451] cursor-pointer"
          />
          <span className="text-[11px] text-white/75 leading-relaxed">
            I explicitly accept the{" "}
            <strong className="text-white">
              {holdDays}-Day Refundable Reservation Holding Terms
            </strong>
            . The ${depositFee.toLocaleString()} USD deposit locks my package price and{" "}
            {discountPercent}% discount for {pricingConfig.reservationDurationHours} hours, is
            credited 100% toward my invoice upon agreement execution, or refunded in full.
          </span>
        </label>

        {errorMessage && (
          <div className="relative z-10 p-3 rounded-xl bg-red-950/80 border border-red-400/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="relative z-10">
          {activeTab === "crypto" && (
            <button
              type="button"
              onClick={handleCryptoSubmit}
              disabled={loading}
              className="btn-royal-gold shine w-full py-3.5 px-6 text-xs sm:text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              <span>
                {loading
                  ? "Recording Transfer..."
                  : `Confirm $${depositFee.toLocaleString()} Crypto Deposit & Lock`}
              </span>
            </button>
          )}

          {activeTab === "stripe" && (
            <button
              type="button"
              onClick={handleStripeCheckout}
              disabled={loading || !paymentConfig.stripe.enabled}
              className="btn btn-neon w-full !py-3.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ExternalLink size={16} />}
              <span>
                {loading
                  ? "Redirecting..."
                  : `Pay $${depositFee.toLocaleString()} USD with Card (Stripe)`}
              </span>
            </button>
          )}

          {activeTab === "demo" && (
            <button
              type="button"
              onClick={handleSimulatePayment}
              disabled={loading}
              className="btn-royal-gold shine w-full py-3 px-6 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              <span>Simulate ${depositFee.toLocaleString()} Reservation (Demo Mode)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

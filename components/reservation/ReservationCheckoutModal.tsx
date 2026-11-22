"use client";

import { useState } from "react";
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
import { CasinoDesign, PublicPaymentConfig } from "@/types";
import {
  initiateStripePaymentAction,
  submitCryptoPaymentAction,
} from "@/app/actions/adminIntegrationActions";

interface ReservationCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: CasinoDesign;
  packageTotal: number;
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
  customerName,
  customerEmail,
  reservationId,
  paymentConfig,
  onPaymentSuccess,
}: ReservationCheckoutModalProps) {
  const [activeTab, setActiveTab] = useState<"crypto" | "stripe" | "demo">("crypto");
  const [selectedCrypto, setSelectedCrypto] = useState<"trc20" | "erc20" | "btc">("trc20");
  const [txHash, setTxHash] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const discountAmount = Math.round((packageTotal * 5) / 100);
  const discountedTotal = packageTotal - discountAmount;
  const depositFee = 500;
  const balanceOnContract = discountedTotal - depositFee;

  const getAddress = () => {
    if (selectedCrypto === "trc20") return paymentConfig.crypto.usdtTrc20Address;
    if (selectedCrypto === "erc20") return paymentConfig.crypto.usdtErc20Address;
    return paymentConfig.crypto.btcAddress;
  };

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
      setErrorMessage("Please accept the 5-day refundable reservation holding terms before continuing.");
      return;
    }
    if (!txHash.trim()) {
      setErrorMessage("Please enter your transaction hash (TxID) for verification.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const network =
      selectedCrypto === "trc20"
        ? "USDT-TRC20"
        : selectedCrypto === "erc20"
        ? "USDT-ERC20"
        : "BTC";

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
      setErrorMessage("Please accept the 5-day refundable reservation holding terms before continuing.");
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
      setErrorMessage("Please accept the 5-day refundable reservation holding terms before continuing.");
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
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="relative max-w-xl w-full rounded-3xl bg-gradient-to-b from-[#140428] via-[#0b0217] to-[#04010a] border-2 border-[#FFD700] p-5 sm:p-7 space-y-5 shadow-[0_0_60px_rgba(255,215,0,0.35)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-purple-950/80 text-gray-400 hover:text-white transition-colors"
          title="Close Checkout"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400 text-yellow-400 text-[10px] font-black uppercase tracking-wider">
            <Lock size={12} />
            <span>Secure 5-Day Holding Checkout</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Reserve <span className="text-[#FFD700]">{design.name}</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-300">
            Booking Reference: <strong className="text-yellow-400 font-mono">{reservationId}</strong>
          </p>
        </div>

        {/* Financial Breakdown Table */}
        <div className="rounded-xl bg-[#080214] border border-purple-900/60 p-3.5 space-y-2 text-xs">
          <div className="flex justify-between items-center text-gray-400">
            <span>Standard Package Total:</span>
            <span className="line-through">${packageTotal.toLocaleString()} USD</span>
          </div>
          <div className="flex justify-between items-center text-emerald-400 font-bold">
            <span>Exclusive 5% Reservation Discount:</span>
            <span>-${discountAmount.toLocaleString()} USD</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-y border-purple-900/60 font-black text-white">
            <span>Discounted Locked Price:</span>
            <span className="text-yellow-400">${discountedTotal.toLocaleString()} USD</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-800/40">
              <span className="text-gray-400 block text-[10px] uppercase">Holding Fee Today:</span>
              <span className="text-sm font-black text-emerald-400">${depositFee} USD</span>
              <span className="text-[10px] text-gray-400 block">100% Refundable</span>
            </div>
            <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-800/40">
              <span className="text-gray-400 block text-[10px] uppercase">Balance on Handover:</span>
              <span className="text-sm font-black text-yellow-400">${balanceOnContract.toLocaleString()} USD</span>
              <span className="text-[10px] text-gray-400 block">Deposit Credited</span>
            </div>
          </div>
        </div>

        {/* Payment Gateway Tabs */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-purple-950/50 border border-purple-900/50">
            <button
              type="button"
              onClick={() => setActiveTab("crypto")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "crypto"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <QrCode size={13} />
              <span>Crypto (USDT / BTC)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("stripe")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "stripe"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <CreditCard size={13} />
              <span>Credit Card (Stripe)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("demo")}
              className={`py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                activeTab === "demo"
                  ? "bg-white/20 text-white border border-white/40"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Test Demo
            </button>
          </div>

          {/* TAB 1: CRYPTO DETAILS */}
          {activeTab === "crypto" && (
            <div className="p-4 rounded-xl bg-[#06010f] border border-purple-900/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-semibold">Select Network:</span>
                <div className="flex items-center gap-1">
                  {(["trc20", "erc20", "btc"] as const).map((net) => (
                    <button
                      key={net}
                      type="button"
                      onClick={() => setSelectedCrypto(net)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                        selectedCrypto === net
                          ? "bg-[#FFD700] text-black"
                          : "bg-purple-950/60 text-gray-400 hover:text-white"
                      }`}
                    >
                      {net === "trc20" ? "USDT (TRC20)" : net === "erc20" ? "USDT (ERC20)" : "BTC"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallet Address Box */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Transfer Exactly $500 USD To Address:</span>
                  {copied && <span className="text-emerald-400 text-[10px]">Copied to clipboard!</span>}
                </label>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0e0420] border border-purple-600/40 font-mono text-xs text-yellow-300 break-all select-all">
                  <span className="flex-1">{getAddress() || "Address not configured in Admin"}</span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="p-1.5 rounded-md bg-purple-900/60 hover:bg-purple-800 text-white shrink-0 transition-colors"
                    title="Copy Address"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* TxHash Input Form */}
              <form onSubmit={handleCryptoSubmit} className="space-y-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                    Transaction Hash / TxID (Proof of Transfer) *
                  </label>
                  <input
                    required
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="e.g. 8f6b1e32d5c4..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0e0420] border border-purple-600/40 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: STRIPE DETAILS */}
          {activeTab === "stripe" && (
            <div className="p-5 rounded-xl bg-[#06010f] border border-purple-900/60 text-center space-y-3">
              <CreditCard size={32} className="mx-auto text-purple-400" />
              <h3 className="text-sm font-bold text-white">Credit / Debit Card Checkout</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Pay the 100% refundable <strong>$500 USD</strong> holding deposit with Visa, Mastercard, or American Express via Stripe.
              </p>
              {!paymentConfig.stripe.enabled && (
                <p className="text-[11px] text-amber-400/90 font-medium">
                  Note: Stripe card processing is currently in setup mode. Please use Crypto or contact our sales team.
                </p>
              )}
            </div>
          )}

          {/* TAB 3: DEMO TEST MODE */}
          {activeTab === "demo" && (
            <div className="p-4 rounded-xl bg-[#06010f] border border-purple-900/60 space-y-2 text-center text-xs">
              <p className="text-gray-300 font-semibold">Test &amp; Onboarding Simulation</p>
              <p className="text-gray-500 text-[11px]">
                Simulate an immediate $500 reservation confirmation without sending live funds to verify the 120-hour hold timer and email receipt.
              </p>
            </div>
          )}
        </div>

        {/* Mandatory Terms & Conditions Acceptance Checkbox */}
        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              if (e.target.checked) setErrorMessage(null);
            }}
            className="mt-0.5 w-4 h-4 rounded bg-[#0e0420] border-purple-500 text-yellow-400 focus:ring-yellow-400 cursor-pointer"
          />
          <span className="text-[11px] text-gray-300 leading-relaxed">
            I explicitly accept the <strong>5-Day Refundable Reservation Holding Terms</strong>. I understand that the $500 USD deposit locks my selected package price and 5% discount for 120 hours, is credited 100% toward my project invoice upon agreement execution, or is refunded in full if an agreement is not finalized.
          </span>
        </label>

        {errorMessage && (
          <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button */}
        {activeTab === "crypto" && (
          <button
            type="button"
            onClick={handleCryptoSubmit}
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            <span>{loading ? "Recording Transfer..." : "Confirm $500 Crypto Deposit & Lock"}</span>
          </button>
        )}

        {activeTab === "stripe" && (
          <button
            type="button"
            onClick={handleStripeCheckout}
            disabled={loading || !paymentConfig.stripe.enabled}
            className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ExternalLink size={16} />}
            <span>{loading ? "Redirecting..." : "Pay $500 USD with Card (Stripe)"}</span>
          </button>
        )}

        {activeTab === "demo" && (
          <button
            type="button"
            onClick={handleSimulatePayment}
            disabled={loading}
            className="w-full py-2.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
            <span>Simulate $500 Reservation (Demo Mode)</span>
          </button>
        )}
      </div>
    </div>
  );
}

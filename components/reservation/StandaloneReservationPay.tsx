"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  QrCode,
  Copy,
  Check,
  CreditCard,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Reservation, PublicPaymentConfig } from "@/types";
import {
  initiateStripePaymentAction,
  submitCryptoPaymentAction,
} from "@/app/actions/adminIntegrationActions";

interface StandaloneReservationPayProps {
  reservation: Reservation;
  paymentConfig: PublicPaymentConfig;
}

export default function StandaloneReservationPay({
  reservation,
  paymentConfig,
}: StandaloneReservationPayProps) {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState<"crypto" | "stripe">("crypto");
  const walletOptions = ([
    { id: "usdc" as const, label: "USDC (ERC-20)", network: "Ethereum (ERC-20)", address: paymentConfig.crypto.usdcAddress },
    { id: "btc" as const, label: "Bitcoin (BTC)", network: "Bitcoin Native", address: paymentConfig.crypto.btcAddress },
    { id: "usdt_trc20" as const, label: "USDT TRC-20", network: "Tron (TRC-20)", address: paymentConfig.crypto.usdtTrc20Address },
    { id: "usdt_erc20" as const, label: "USDT ERC-20", network: "Ethereum (ERC-20)", address: paymentConfig.crypto.usdtErc20Address },
  ]).filter((w) => Boolean(w.address && w.address.trim()));

  const [selectedCrypto, setSelectedCrypto] = useState<"usdc" | "btc" | "usdt_trc20" | "usdt_erc20">(
    walletOptions[0]?.id || "usdc"
  );
  const [txHash, setTxHash] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const activeWallet =
    walletOptions.find((w) => w.id === selectedCrypto) ||
    walletOptions[0] || {
      label: "USDC (ERC-20)",
      address: paymentConfig.crypto.usdcAddress,
      network: "Ethereum (ERC-20)",
    };

  const handleCryptoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!termsAccepted) {
      setErrorMsg("Please accept the 5-day refundable reservation terms.");
      return;
    }

    if (!txHash.trim()) {
      setErrorMsg("Please enter your Transaction Hash / ID.");
      return;
    }

    setSubmitting(true);
    const res = await submitCryptoPaymentAction({
      reservationId: reservation.reservationId,
      cryptoNetwork: selectedCrypto,
      txHash: txHash.trim(),
    });

    setSubmitting(false);
    if (res.success) {
      router.push(`/confirmation/reservation?id=${reservation.reservationId}`);
    } else {
      setErrorMsg(res.error || "Failed to record crypto transaction. Please retry.");
    }
  };

  const handleStripeCheckout = async () => {
    setErrorMsg(null);
    if (!termsAccepted) {
      setErrorMsg("Please accept the 5-day refundable reservation terms.");
      return;
    }

    setSubmitting(true);
    const res = await initiateStripePaymentAction({
      reservationId: reservation.reservationId,
      customerEmail: reservation.customerEmail,
      customerName: reservation.customerName,
      designName: reservation.selectedDesignName,
      returnUrl: typeof window !== "undefined" ? window.location.origin : undefined,
    });

    if (res.success && res.url) {
      window.location.href = res.url;
    } else {
      setSubmitting(false);
      setErrorMsg(res.error || "Failed to initialize Stripe checkout.");
    }
  };

  const handleTestSimulation = async () => {
    setErrorMsg(null);
    if (!termsAccepted) {
      setErrorMsg("Please accept the 5-day refundable reservation terms.");
      return;
    }

    setSubmitting(true);
    const res = await submitCryptoPaymentAction({
      reservationId: reservation.reservationId,
      cryptoNetwork: "test_manual",
      txHash: `SIMULATED_TEST_${Date.now()}`,
    });

    setSubmitting(false);
    if (res.success) {
      router.push(`/confirmation/reservation?id=${reservation.reservationId}`);
    } else {
      setErrorMsg(res.error || "Simulation failed.");
    }
  };

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Mandatory Terms Acceptance */}
      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-purple-500 text-yellow-500 focus:ring-0 bg-[#080214]"
          />
          <span className="text-xs text-gray-300 leading-relaxed">
            I understand this <strong className="text-white">$500 USD holding deposit</strong> locks
            my selected casino theme and exclusive 5% package discount for exactly 120 hours. If no
            turnkey agreement is executed, the deposit is{" "}
            <strong className="text-[#34d399]">100% refundable</strong> back to my original payment
            method per ALL I GAMING commercial policy.
          </span>
        </label>
      </div>

      {/* Payment Method Selector Tabs */}
      <div className="flex rounded-xl bg-purple-950/40 p-1 border border-purple-900/40 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("crypto")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === "crypto"
              ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <QrCode size={15} />
          <span>Crypto (USDT / BTC)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stripe")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === "stripe"
              ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <CreditCard size={15} />
          <span>Credit Card (Stripe)</span>
        </button>
      </div>

      {/* CRYPTO TAB */}
      {activeTab === "crypto" && (
        <div className="space-y-4">
          {/* Sub-network Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {walletOptions.map((coin) => (
              <button
                key={coin.id}
                type="button"
                onClick={() => setSelectedCrypto(coin.id)}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                  selectedCrypto === coin.id
                    ? "bg-purple-900/60 border-yellow-400 text-yellow-300"
                    : "bg-[#04010a] border-purple-900/40 text-gray-400 hover:border-purple-600/50"
                }`}
              >
                {coin.label}
              </button>
            ))}
          </div>

          {/* Wallet Address Box */}
          <div className="p-4 rounded-xl bg-[#04010a] border border-purple-900/50 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Send Exactly: <strong className="text-white">$500.00 USD ({activeWallet.label})</strong></span>
              <span className="text-[10px] text-purple-300">Network: {activeWallet.network}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#0c031c] p-2.5 rounded-lg border border-purple-500/30">
              <span className="font-mono text-xs text-yellow-300 select-all truncate flex-1">
                {activeWallet.address}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(activeWallet.address, "addr")}
                className="p-1.5 rounded bg-purple-950 hover:bg-purple-900 text-yellow-400 transition-colors shrink-0"
                title="Copy Address"
              >
                {copiedKey === "addr" ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* TxHash Submission Form */}
          <form onSubmit={handleCryptoSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                Your Payment Transaction Hash / TxID *
              </label>
              <input
                type="text"
                required
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="Paste the transfer transaction hash / ID"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/40 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !termsAccepted}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#FFE259] to-[#FFA700] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Transfer...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Confirm $500 Crypto Deposit</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* STRIPE TAB */}
      {activeTab === "stripe" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#04010a] border border-purple-900/50 space-y-2 text-center">
            <CreditCard size={28} className="text-[#FFD700] mx-auto" />
            <h4 className="text-sm font-bold text-white">Stripe 256-bit Encrypted Checkout</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Securely reserve your casino theme with Visa, Mastercard, or American Express. The $500 deposit is fully refundable.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStripeCheckout}
            disabled={submitting || !termsAccepted}
            className="w-full py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#FFE259] to-[#FFA700] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Redirecting to Stripe...</span>
              </>
            ) : (
              <>
                <ExternalLink size={16} />
                <span>Proceed to Stripe Card Checkout ($500)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Test Mode / Simulation Bypass */}
      <div className="pt-2 border-t border-purple-900/30 text-center">
        <button
          type="button"
          onClick={handleTestSimulation}
          disabled={submitting || !termsAccepted}
          className="text-[11px] text-gray-400 hover:text-yellow-400 transition-colors disabled:opacity-50"
        >
          ⚡ Demo / Testing? Click here to simulate instant $500 reservation lock
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Mail,
  QrCode,
  Send,
  Eye,
  EyeOff,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { IntegrationConfigData } from "@/types";
import {
  saveIntegrationConfigAction,
  testEmailAction,
} from "@/app/actions/adminIntegrationActions";

interface GatewaysAndEmailSettingsProps {
  initialConfig: IntegrationConfigData;
}

export default function GatewaysAndEmailSettings({
  initialConfig,
}: GatewaysAndEmailSettingsProps) {
  const [config, setConfig] = useState<IntegrationConfigData>(initialConfig);
  const [activeTab, setActiveTab] = useState<"payment" | "email" | "modules">("payment");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  // Test email state
  const [testEmailAddress, setTestEmailAddress] = useState(config.email.adminAlertEmail || "");
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    const res = await saveIntegrationConfigAction(config);
    setSaving(false);

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      alert("Failed to save integration settings: " + res.error);
    }
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress.trim()) {
      alert("Please enter an email address to send the test notification.");
      return;
    }

    setSendingTest(true);
    setTestResult(null);

    const res = await testEmailAction(testEmailAddress.trim());
    setSendingTest(false);

    if (res.success) {
      setTestResult({
        success: true,
        message: `Success! A test email has been delivered to ${testEmailAddress} via ${config.email.activeProvider.toUpperCase()}.`,
      });
    } else {
      setTestResult({
        success: false,
        message: res.error || "Failed to send test email. Please check your credentials.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-lg">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>Integration settings successfully updated in MongoDB! Changes take effect immediately without server restarts.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-900/40 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("payment")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "payment"
              ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <CreditCard size={14} />
          <span>Payment Gateways (Crypto &amp; Stripe)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("email")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "email"
              ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Mail size={14} />
          <span>Email &amp; Notifications (Resend / Mailgun / SMTP)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("modules")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "modules"
              ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <DollarSign size={14} />
          <span>Module Pricing Manager</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: PAYMENT GATEWAYS */}
        {/* ========================================================================= */}
        {activeTab === "payment" && (
          <div className="space-y-6">
            {/* Active Gateway Selector */}
            <div className="p-4 rounded-xl bg-[#080214] border border-purple-900/40 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#FFD700]" />
                <span>Primary Reservation Gateway</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "crypto", label: "Crypto (USDT / BTC)", desc: "Direct multi-chain wallet addresses" },
                  { id: "stripe", label: "Credit Card (Stripe)", desc: "Visa, Mastercard, Amex checkout" },
                  { id: "manual", label: "Manual / Test Simulation", desc: "For client demo without real payment" },
                ].map((g) => (
                  <label
                    key={g.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      config.payment.activeGateway === g.id
                        ? "bg-purple-950/80 border-[#FFD700] text-white shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                        : "bg-[#04010a] border-purple-900/40 text-gray-400 hover:border-purple-600/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="activeGateway"
                      value={g.id}
                      checked={config.payment.activeGateway === g.id}
                      onChange={() =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            activeGateway: g.id as "crypto" | "stripe" | "manual",
                          },
                        })
                      }
                      className="hidden"
                    />
                    <div className="font-bold text-xs text-white">{g.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{g.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Crypto Wallets Configuration */}
              <div className="p-5 rounded-xl bg-[#080214] border border-purple-900/40 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
                  <div className="flex items-center gap-2">
                    <QrCode size={16} className="text-[#FFD700]" />
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                      Crypto Wallets (USDT &amp; BTC)
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">Mode:</span>
                    <select
                      value={config.payment.crypto.mode}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            crypto: {
                              ...config.payment.crypto,
                              mode: e.target.value as "test" | "live",
                            },
                          },
                        })
                      }
                      className="px-2 py-0.5 rounded bg-[#04010a] border border-purple-500/40 text-[10px] text-white"
                    >
                      <option value="test">Test Mode</option>
                      <option value="live">Live Production</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Merchant / Desk Name
                    </label>
                    <input
                      type="text"
                      value={config.payment.crypto.merchantName}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            crypto: { ...config.payment.crypto, merchantName: e.target.value },
                          },
                        })
                      }
                      placeholder="All I Gaming Holding Desk"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs font-medium focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      USDT (TRC20 - Tron) Deposit Address
                    </label>
                    <input
                      type="text"
                      value={config.payment.crypto.usdtTrc20Address}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            crypto: { ...config.payment.crypto, usdtTrc20Address: e.target.value },
                          },
                        })
                      }
                      placeholder="TYDny59kU..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-yellow-300 font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      USDT (ERC20 - Ethereum) Deposit Address
                    </label>
                    <input
                      type="text"
                      value={config.payment.crypto.usdtErc20Address}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            crypto: { ...config.payment.crypto, usdtErc20Address: e.target.value },
                          },
                        })
                      }
                      placeholder="0x71C..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-yellow-300 font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Bitcoin (BTC) Deposit Address
                    </label>
                    <input
                      type="text"
                      value={config.payment.crypto.btcAddress}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            crypto: { ...config.payment.crypto, btcAddress: e.target.value },
                          },
                        })
                      }
                      placeholder="bc1q..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-yellow-300 font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Buyer Payment Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={config.payment.crypto.instructions}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            crypto: { ...config.payment.crypto, instructions: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs resize-none focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                </div>
              </div>

              {/* Stripe Configuration */}
              <div className="p-5 rounded-xl bg-[#080214] border border-purple-900/40 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-[#FFD700]" />
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                      Stripe Card Gateway
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-gray-400 flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.payment.stripe.enabled}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            payment: {
                              ...config.payment,
                              stripe: { ...config.payment.stripe, enabled: e.target.checked },
                            },
                          })
                        }
                        className="rounded"
                      />
                      <span>Enable Stripe</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Publishable Key
                    </label>
                    <input
                      type="text"
                      value={config.payment.stripe.publishableKey}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            stripe: { ...config.payment.stripe, publishableKey: e.target.value },
                          },
                        })
                      }
                      placeholder="pk_test_..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-gray-400 uppercase">
                        Secret Key
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowSecrets(!showSecrets)}
                        className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        {showSecrets ? <EyeOff size={11} /> : <Eye size={11} />}
                        <span>{showSecrets ? "Hide" : "Reveal"}</span>
                      </button>
                    </div>
                    <input
                      type={showSecrets ? "text" : "password"}
                      value={config.payment.stripe.secretKey}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            stripe: { ...config.payment.stripe, secretKey: e.target.value },
                          },
                        })
                      }
                      placeholder="sk_test_..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Webhook Signing Secret
                    </label>
                    <input
                      type={showSecrets ? "text" : "password"}
                      value={config.payment.stripe.webhookSecret}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            stripe: { ...config.payment.stripe, webhookSecret: e.target.value },
                          },
                        })
                      }
                      placeholder="whsec_..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Webhook Endpoint URL: <code className="text-purple-300">/api/webhooks/stripe</code></p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Currency Code
                    </label>
                    <input
                      type="text"
                      value={config.payment.stripe.currency}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          payment: {
                            ...config.payment,
                            stripe: { ...config.payment.stripe, currency: e.target.value.toLowerCase() },
                          },
                        })
                      }
                      placeholder="usd"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs font-mono uppercase focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EMAIL & NOTIFICATIONS */}
        {/* ========================================================================= */}
        {activeTab === "email" && (
          <div className="space-y-6">
            {/* Provider Selector */}
            <div className="p-4 rounded-xl bg-[#080214] border border-purple-900/40 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} className="text-[#FFD700]" />
                <span>Active Transactional Email Provider</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "resend", label: "Resend", sub: "REST API via resend.com" },
                  { id: "mailgun", label: "Mailgun", sub: "REST API via mailgun.com" },
                  { id: "smtp", label: "Custom SMTP", sub: "Standard TLS/SSL server" },
                  { id: "disabled", label: "Disabled", sub: "Log to console only" },
                ].map((p) => (
                  <label
                    key={p.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      config.email.activeProvider === p.id
                        ? "bg-purple-950/80 border-[#FFD700] text-white shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                        : "bg-[#04010a] border-purple-900/40 text-gray-400 hover:border-purple-600/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="activeEmailProvider"
                      value={p.id}
                      checked={config.email.activeProvider === p.id}
                      onChange={() =>
                        setConfig({
                          ...config,
                          email: {
                            ...config.email,
                            activeProvider: p.id as "resend" | "mailgun" | "smtp",
                          },
                        })
                      }
                      className="hidden"
                    />
                    <div className="font-bold text-xs text-white">{p.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{p.sub}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sender & Recipient Routing */}
              <div className="p-5 rounded-xl bg-[#080214] border border-purple-900/40 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-purple-900/30">
                  Sender &amp; Alert Routing
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      value={config.email.fromName}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          email: { ...config.email, fromName: e.target.value },
                        })
                      }
                      placeholder="All I Gaming Concierge"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      From Email (Authorized Sender)
                    </label>
                    <input
                      type="email"
                      value={config.email.fromEmail}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          email: { ...config.email, fromEmail: e.target.value },
                        })
                      }
                      placeholder="sales@alligaming.com"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                      Admin Alert Recipient Email
                    </label>
                    <input
                      type="email"
                      value={config.email.adminAlertEmail}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          email: { ...config.email, adminAlertEmail: e.target.value },
                        })
                      }
                      placeholder="admin@alligaming.com"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Receives instant alerts when new inquiries or $500 reservation deposits are submitted.</p>
                  </div>
                </div>
              </div>

              {/* Provider Specific Credentials */}
              <div className="p-5 rounded-xl bg-[#080214] border border-purple-900/40 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-purple-900/30">
                  {config.email.activeProvider === "resend"
                    ? "Resend API Setup"
                    : config.email.activeProvider === "mailgun"
                    ? "Mailgun API Setup"
                    : config.email.activeProvider === "smtp"
                    ? "Custom SMTP Setup"
                    : "Provider Inactive"}
                </h3>

                {config.email.activeProvider === "resend" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                        Resend API Key
                      </label>
                      <input
                        type={showSecrets ? "text" : "password"}
                        value={config.email.resend.apiKey}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: {
                              ...config.email,
                              resend: { apiKey: e.target.value },
                            },
                          })
                        }
                        placeholder="re_..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>
                  </div>
                )}

                {config.email.activeProvider === "mailgun" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                        Mailgun API Key
                      </label>
                      <input
                        type={showSecrets ? "text" : "password"}
                        value={config.email.mailgun.apiKey}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: {
                              ...config.email,
                              mailgun: { ...config.email.mailgun, apiKey: e.target.value },
                            },
                          })
                        }
                        placeholder="key-..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                        Mailgun Sending Domain
                      </label>
                      <input
                        type="text"
                        value={config.email.mailgun.domain}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: {
                              ...config.email,
                              mailgun: { ...config.email.mailgun, domain: e.target.value },
                            },
                          })
                        }
                        placeholder="mg.alligaming.com"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                        Region
                      </label>
                      <select
                        value={config.email.mailgun.region}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: {
                              ...config.email,
                              mailgun: {
                                ...config.email.mailgun,
                                region: e.target.value as "us" | "eu",
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs"
                      >
                        <option value="us">United States (Default)</option>
                        <option value="eu">Europe (EU Endpoint)</option>
                      </select>
                    </div>
                  </div>
                )}

                {config.email.activeProvider === "smtp" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                          SMTP Host
                        </label>
                        <input
                          type="text"
                          value={config.email.smtp.host}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              email: {
                                ...config.email,
                                smtp: { ...config.email.smtp, host: e.target.value },
                              },
                            })
                          }
                          placeholder="smtp.mailgun.org"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                          Port
                        </label>
                        <input
                          type="number"
                          value={config.email.smtp.port}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              email: {
                                ...config.email,
                                smtp: { ...config.email.smtp, port: Number(e.target.value) },
                              },
                            })
                          }
                          placeholder="587"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={config.email.smtp.user}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: {
                              ...config.email,
                              smtp: { ...config.email.smtp, user: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                        Password
                      </label>
                      <input
                        type={showSecrets ? "text" : "password"}
                        value={config.email.smtp.pass}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: {
                              ...config.email,
                              smtp: { ...config.email.smtp, pass: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>
                  </div>
                )}

                {config.email.activeProvider === "disabled" && (
                  <p className="text-xs text-gray-500 italic">
                    Transactional emails are currently disabled. Notifications will be logged in server output only.
                  </p>
                )}
              </div>
            </div>

            {/* Test Email Utility Section */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-purple-950/40 via-[#100326] to-[#080214] border border-purple-500/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Send size={14} className="text-[#FFD700]" />
                    <span>Live Email Verification Tool</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Send a test message immediately to verify that your active provider credentials deliver successfully.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    placeholder="Enter test recipient email..."
                    className="px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs w-64 focus:outline-none focus:border-[#FFD700]"
                  />
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={sendingTest || config.email.activeProvider === "disabled"}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 disabled:opacity-50 transition-all shrink-0"
                  >
                    {sendingTest ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                    <span>{sendingTest ? "Sending..." : "Send Test Email"}</span>
                  </button>
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    testResult.success
                      ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300"
                      : "bg-red-950/80 border border-red-500/50 text-red-300"
                  }`}
                >
                  {testResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MODULE PRICING (PRD Section 14.3) */}
        {/* ========================================================================= */}
        {activeTab === "modules" && (
          <div className="p-5 rounded-xl bg-[#080214] border border-purple-900/40 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <DollarSign size={16} className="text-[#FFD700]" />
                  <span>Expansion Add-On Module Pricing</span>
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Customize the pricing of individual casino expansion modules directly from the dashboard.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(config.addonModules || []).map((mod, idx) => (
                <div
                  key={mod.id}
                  className="p-3.5 rounded-xl bg-[#04010a] border border-purple-900/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{mod.name}</span>
                    <label className="text-[10px] text-gray-400 flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mod.isEnabled}
                        onChange={(e) => {
                          const updated = [...(config.addonModules || [])];
                          updated[idx] = { ...updated[idx], isEnabled: e.target.checked };
                          setConfig({ ...config, addonModules: updated });
                        }}
                        className="rounded"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">$</span>
                    <input
                      type="number"
                      step={500}
                      value={mod.price}
                      onChange={(e) => {
                        const updated = [...(config.addonModules || [])];
                        updated[idx] = { ...updated[idx], price: Number(e.target.value) };
                        setConfig({ ...config, addonModules: updated });
                      }}
                      className="w-full px-3 py-1.5 pl-7 rounded-lg bg-[#0e0420] border border-purple-500/30 text-yellow-400 font-bold text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Save Button */}
        <div className="flex items-center justify-between pt-2 border-t border-purple-900/40">
          <p className="text-[11px] text-gray-500">
            All credentials and settings are persisted in MongoDB collection <code className="text-purple-400">integration_configs</code>.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} className="stroke-[2.5]" />}
            <span>{saving ? "Saving Changes..." : "Save Integration Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

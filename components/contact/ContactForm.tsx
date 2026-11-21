"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitInquiryAction } from "@/app/actions/inquiryActions";
import { TimelineOption } from "@/types";

interface ContactFormProps {
  initialDesign?: string;
  initialModule?: string;
}

const DESIGNS_LIST = [
  { id: "royal-prestige", name: "Royal Prestige" },
  { id: "neon-vegas", name: "Neon Vegas" },
  { id: "emerald-club", name: "Emerald Club" },
  { id: "elite-casino", name: "Elite Casino" },
  { id: "diamond-palace", name: "Diamond Palace" },
  { id: "cosmic-casino", name: "Cosmic Casino" },
  { id: "golden-crown", name: "Golden Crown" },
  { id: "lucky-spin", name: "Lucky Spin" },
  { id: "prestige-gold", name: "Prestige Gold" },
  { id: "ruby-casino", name: "Ruby Casino" },
  { id: "ocean-casino", name: "Ocean Casino" },
  { id: "mystic-casino", name: "Mystic Casino" },
];

export default function ContactForm({ initialDesign, initialModule }: ContactFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedDesignId, setSelectedDesignId] = useState(initialDesign || "royal-prestige");
  const [timeline, setTimeline] = useState<TimelineOption>("immediately");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(initialModule ? [initialModule] : []);
  const [projectRequirements, setProjectRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; ref?: string; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const designObj = DESIGNS_LIST.find((d) => d.id === selectedDesignId);

    const res = await submitInquiryAction({
      fullName,
      email,
      phoneNumber,
      whatsappNumber,
      companyName,
      intendedTimeline: timeline,
      projectRequirements,
      selectedDesignId,
      selectedDesignName: designObj ? designObj.name : "Custom Selection",
      selectedAddonIds: selectedAddons,
      totalPrice: 15000,
    });

    setLoading(false);
    if (res.success) {
      setResult({ success: true, ref: res.referenceNumber });
    } else {
      setResult({ success: false, error: res.error });
    }
  };

  if (result?.success) {
    return (
      <div className="rounded-3xl bg-[#090214] border-2 border-yellow-400 p-8 text-center space-y-4 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
        <div className="w-16 h-16 rounded-full bg-yellow-400/20 text-yellow-400 mx-auto flex items-center justify-center">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-black text-white">Inquiry Received Successfully!</h3>
        <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider">
          Reference: {result.ref}
        </p>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. An All I Gaming enterprise technical coordinator will contact you via Email and WhatsApp within 4 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-10 space-y-6 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
      {result?.error && (
        <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Full Name *</label>
          <input
            required
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Business Email *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Phone / WhatsApp *</label>
          <input
            required
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Target Casino Design</label>
          <select
            value={selectedDesignId}
            onChange={(e) => setSelectedDesignId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white focus:outline-none focus:border-yellow-400"
          >
            {DESIGNS_LIST.map((d) => (
              <option key={d.id} value={d.id} className="bg-[#0e0420] text-white">
                {d.name} ($15,000 USD)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Project Requirements / Notes</label>
        <textarea
          rows={4}
          value={projectRequirements}
          onChange={(e) => setProjectRequirements(e.target.value)}
          placeholder="Describe your target market, target languages, crypto/fiat requirements..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0420] border border-purple-600/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {loading ? <span>Submitting Request...</span> : (
          <>
            <span>Submit Quotation Request</span>
            <Send size={14} className="stroke-[2.5]" />
          </>
        )}
      </button>
    </form>
  );
}

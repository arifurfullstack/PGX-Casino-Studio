"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Crown,
  Lock,
  Sparkles,
  Check,
  Search,
  Video,
  Trophy,
  Spade,
  Coins,
  Ticket,
  Dices,
  Layers,
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import {
  CasinoDesign,
  TimelineOption,
  PublicPaymentConfig,
  AddonModule,
  PricingConfig,
  StarterPackage,
} from "@/types";
import {
  DEFAULT_ADDON_MODULES,
  DEFAULT_PRICING_CONFIG,
} from "@/config/default-package";
import {
  submitInquiryAction,
  createReservationAction,
} from "@/app/actions/inquiryActions";
import ReservationOfferModal from "./ReservationOfferModal";
import ReservationCheckoutModal from "./ReservationCheckoutModal";
import ReservationConfirmedView from "./ReservationConfirmedView";
import InquiryConfirmedView from "./InquiryConfirmedView";

interface ReservationFlowProps {
  designs: CasinoDesign[];
  addonModules?: AddonModule[];
  starterPackage?: StarterPackage;
  pricingConfig?: PricingConfig;
  initialDesignSlug?: string;
  initialTotal?: number;
  initialAddons?: string;
  paymentConfig?: PublicPaymentConfig;
}

const FALLBACK_PAYMENT_CONFIG: PublicPaymentConfig = {
  activeGateway: "stripe",
  crypto: {
    enabled: true,
    mode: "live",
    merchantName: "Royal Casino Club Holding Desk",
    usdtTrc20Address: "",
    usdtErc20Address: "",
    usdcAddress: "0x4520FBE6d418c1bAcE97A1E517e5Be2d78eb9598",
    btcAddress: "3DyMA7VZavn4iA4m4scrjMHJyaEn1XRmaz",
    instructions:
      "Send the exact holding deposit in USDC (ERC20) or equivalent BTC. Submit your Transaction Hash (TxID) below for instant verification.",
  },
  stripe: {
    enabled: true,
    mode: "live",
    publishableKey: "",
    currency: "usd",
  },
};

const TIMELINE_OPTIONS: { value: TimelineOption; label: string; badge: string }[] = [
  { value: "immediately", label: "Immediately", badge: "Priority" },
  { value: "within_30_days", label: "Within 30 Days", badge: "Fast-Track" },
  { value: "within_1_3_months", label: "1–3 Months", badge: "Planned" },
  { value: "within_3_6_months", label: "3–6 Months", badge: "Roadmap" },
  { value: "just_exploring", label: "Just Exploring", badge: "Discovery" },
];

const REQUIREMENT_CHIPS = [
  "Crypto Payments (USDT/BTC)",
  "Fiat & Card Gateways",
  "Evolution & Pragmatic Slots",
  "VIP Loyalty & Rakeback",
  "Multi-Language UI",
  "Custom Brand Logo & Domain",
];

const AMBIENT_ORBS = [
  { left: "4%", top: "12%", size: 6, color: "rgba(255, 224, 130, 0.9)" },
  { left: "16%", top: "64%", size: 5, color: "rgba(232, 121, 249, 0.85)" },
  { left: "46%", top: "8%", size: 7, color: "rgba(245, 196, 81, 0.85)" },
  { left: "89%", top: "16%", size: 6, color: "rgba(255, 215, 94, 0.95)" },
  { left: "94%", top: "58%", size: 5, color: "rgba(217, 70, 239, 0.85)" },
  { left: "62%", top: "88%", size: 6, color: "rgba(255, 232, 150, 0.85)" },
];

function AddonIcon({ iconKey }: { iconKey: AddonModule["iconKey"] }) {
  switch (iconKey) {
    case "video":
      return <Video className="gold-icon h-5 w-5" />;
    case "trophy":
      return <Trophy className="gold-icon h-5 w-5" />;
    case "spade":
      return <Spade className="gold-icon h-5 w-5" />;
    case "coins":
      return <Coins className="gold-icon h-5 w-5" />;
    case "ticket":
      return <Ticket className="gold-icon h-5 w-5" />;
    case "dices":
      return <Dices className="gold-icon h-5 w-5" />;
    default:
      return <Crown className="gold-icon h-5 w-5" />;
  }
}

export default function ReservationFlow({
  designs,
  addonModules = DEFAULT_ADDON_MODULES.filter((m) => m.isEnabled),
  pricingConfig = DEFAULT_PRICING_CONFIG,
  initialDesignSlug,
  initialAddons = "",
  paymentConfig = FALLBACK_PAYMENT_CONFIG,
}: ReservationFlowProps) {
  // Match initial design by slug OR id (handles both /select-design?design=ruby-casino and ?design=<id>)
  const resolvedInitialDesign = useMemo(() => {
    if (initialDesignSlug) {
      const match = designs.find(
        (d) => d.slug === initialDesignSlug || d.id === initialDesignSlug
      );
      if (match) return match.slug;
    }
    return designs[0]?.slug || "royal-prestige";
  }, [designs, initialDesignSlug]);

  const resolvedInitialAddons = useMemo(() => {
    if (!initialAddons) return [];
    const validIds = new Set(addonModules.map((m) => m.id));
    return initialAddons
      .split(",")
      .map((s) => s.trim())
      .filter((id) => id && validIds.has(id));
  }, [initialAddons, addonModules]);

  const [selectedSlug, setSelectedSlug] = useState(resolvedInitialDesign);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(resolvedInitialAddons);
  const [themeQuery, setThemeQuery] = useState("");
  const [showAllThemes, setShowAllThemes] = useState(false);

  // Operator Form State
  const [brandName, setBrandName] = useState("");
  const [domainPreference, setDomainPreference] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [intendedTimeline, setIntendedTimeline] =
    useState<TimelineOption>("immediately");
  const [projectRequirements, setProjectRequirements] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Submission / Modal States
  const [inquiryData, setInquiryData] = useState<{
    id: string;
    ref: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewState, setViewState] = useState<
    "form" | "inquiry_confirmed" | "reservation_active"
  >("form");
  const [reservationDetails, setReservationDetails] = useState<{
    reservationId: string;
    discountedPrice: number;
    remainingBalance: number;
    expiresAt: string;
  } | null>(null);

  // GSAP Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const floatingPropRef = useRef<HTMLDivElement>(null);

  const selectedDesign =
    designs.find((d) => d.slug === selectedSlug) || designs[0];

  const selectedModules = useMemo(
    () => addonModules.filter((m) => selectedAddonIds.includes(m.id)),
    [addonModules, selectedAddonIds]
  );

  const addonsTotal = useMemo(
    () => selectedModules.reduce((sum, mod) => sum + mod.price, 0),
    [selectedModules]
  );

  const packageTotal = pricingConfig.starterPackagePrice + addonsTotal;

  // Filtered designs for visual picker
  const filteredDesigns = useMemo(() => {
    const q = themeQuery.trim().toLowerCase();
    if (!q) return designs;
    return designs.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        (d.subtitle || "").toLowerCase().includes(q) ||
        (d.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [designs, themeQuery]);

  const visibleDesigns = useMemo(() => {
    if (showAllThemes || themeQuery.trim().length > 0) return filteredDesigns;
    const baseSlice = filteredDesigns.slice(0, 6);
    if (selectedDesign && !baseSlice.some((d) => d.slug === selectedDesign.slug)) {
      return [selectedDesign, ...baseSlice.slice(0, 5)];
    }
    return baseSlice;
  }, [filteredDesigns, showAllThemes, themeQuery, selectedDesign]);

  // Dynamic URL Sync (keeps ?design=...&addons=... live & shareable without page reload)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (selectedSlug) params.set("design", selectedSlug);
    if (selectedAddonIds.length > 0) {
      params.set("addons", selectedAddonIds.join(","));
      params.set("total", String(packageTotal));
    } else {
      params.delete("addons");
      params.delete("total");
    }
    const qs = params.toString();
    const nextUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", nextUrl);
  }, [selectedSlug, selectedAddonIds, packageTotal]);

  // Dynamic Form Completion Progress
  const completionPercent = useMemo(() => {
    let score = 20; // Design already selected
    if (brandName.trim()) score += 20;
    if (fullName.trim()) score += 20;
    if (email.trim() && email.includes("@")) score += 20;
    if (phone.trim()) score += 20;
    return score;
  }, [brandName, fullName, email, phone]);

  // Active Step Tracker (1 = Configure, 2 = Details, 3 = Lock & Reserve)
  const activeStep = useMemo(() => {
    if (isModalOpen || isCheckoutOpen || viewState !== "form") return 3;
    if (brandName.trim() || fullName.trim() || email.trim() || phone.trim()) return 2;
    return 1;
  }, [isModalOpen, isCheckoutOpen, viewState, brandName, fullName, email, phone]);

  // GSAP Progress Bar Tween
  useEffect(() => {
    if (!progressBarRef.current) return;
    gsap.to(progressBarRef.current, {
      width: `${completionPercent}%`,
      duration: 0.55,
      ease: "power3.out",
    });
  }, [completionPercent]);

  // Master GSAP Entrance, Ambient Loops & 60fps Interactive Cursor Spotlight
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stage = stageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* 1. Hero & Panel Cinematic Entrance Timeline */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".js-res-hero-stagger", {
          opacity: 0,
          y: 28,
          duration: 0.78,
          stagger: 0.08,
        })
          .from(
            ".js-res-step-pill",
            {
              opacity: 0,
              y: 18,
              scale: 0.94,
              duration: 0.6,
              stagger: 0.09,
            },
            "-=0.45"
          )
          .from(
            ".js-res-panel-reveal",
            {
              opacity: 0,
              y: 34,
              duration: 0.85,
              stagger: 0.12,
            },
            "-=0.42"
          )
          .from(
            ".js-res-summary-reveal",
            {
              opacity: 0,
              x: 28,
              scale: 0.97,
              duration: 0.85,
            },
            "-=0.72"
          );

        /* 2. Floating Stardust Orbs */
        gsap.utils.toArray<HTMLElement>(".js-res-orb").forEach((orb, idx) => {
          gsap.to(orb, {
            y: idx % 2 === 0 ? -16 : 16,
            x: idx % 3 === 0 ? 12 : -10,
            opacity: 0.35,
            scale: 1.4,
            duration: 3 + (idx % 4) * 0.65,
            delay: idx * 0.22,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        /* 3. Ambient Floating Luxury Cards/Crown Accent */
        if (floatingPropRef.current) {
          gsap.to(floatingPropRef.current, {
            y: -10,
            rotation: 2.5,
            duration: 3.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        /* 4. 60fps Interactive Cursor-Tracking Champagne-Gold Spotlight */
        const spotX = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "x", {
              duration: 0.45,
              ease: "power2.out",
            })
          : null;
        const spotY = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "y", {
              duration: 0.45,
              ease: "power2.out",
            })
          : null;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          if (spotX && spotY) {
            spotX(e.clientX - rect.left - 280);
            spotY(e.clientY - rect.top - 280);
          }
        };

        stage.addEventListener("mousemove", handleMouseMove);
        return () => {
          stage.removeEventListener("mousemove", handleMouseMove);
        };
      }, stage);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [viewState]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const toggleRequirementChip = (chip: string) => {
    setProjectRequirements((prev) => {
      if (prev.includes(chip)) {
        return prev
          .replace(new RegExp(`(•\\s*)?${chip.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[,;\\n\\s]*`, "g"), "")
          .trim();
      }
      return prev.trim() ? `${prev.trim()}\n• ${chip}` : `• ${chip}`;
    });
  };

  // Step 1: Submit Selection Form -> Open Modal
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const effectiveWhatsapp = sameAsPhone ? phone : whatsapp || phone;
    const fullNotes = [
      brandName ? `Brand: ${brandName}` : null,
      domainPreference ? `Domain: ${domainPreference}` : null,
      projectRequirements ? `Details: ${projectRequirements}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const res = await submitInquiryAction({
      fullName,
      email,
      phoneNumber: phone,
      whatsappNumber: effectiveWhatsapp,
      companyName,
      intendedTimeline,
      projectRequirements: fullNotes || "Turnkey Casino Setup",
      selectedDesignId: selectedDesign.id,
      selectedDesignName: selectedDesign.name,
      selectedAddonIds,
      totalPrice: packageTotal,
    });

    setLoading(false);

    if (res.success && res.inquiryId) {
      setInquiryData({
        id: res.inquiryId,
        ref: res.referenceNumber || "AIG-REQ",
      });
      setIsModalOpen(true);
    } else {
      setErrorMessage(
        res.error || "Submission failed. Please verify your details and try again."
      );
    }
  };

  // Option A: Reserve Now
  const handleConfirmReservation = async () => {
    if (!inquiryData) return;
    setErrorMessage(null);
    setLoading(true);

    const res = await createReservationAction({
      inquiryId: inquiryData.id,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      selectedDesignName: selectedDesign.name,
      selectedAddons: selectedAddonIds,
      originalPackagePrice: packageTotal,
    });

    setLoading(false);
    setIsModalOpen(false);

    const discountMultiplier =
      1 - pricingConfig.reservationDiscountPercent / 100;
    const fallbackDiscounted = Math.round(packageTotal * discountMultiplier);
    const fallbackRemaining = Math.max(
      0,
      fallbackDiscounted - pricingConfig.reservationFee
    );
    const fallbackExpiresAt = new Date(
      Date.now() + pricingConfig.reservationDurationHours * 3600 * 1000
    ).toISOString();

    if (res.success && res.reservationId) {
      setReservationDetails({
        reservationId: res.reservationId,
        discountedPrice: res.discountedPrice ?? fallbackDiscounted,
        remainingBalance: res.remainingBalance ?? fallbackRemaining,
        expiresAt: res.expiresAt || fallbackExpiresAt,
      });
      setIsCheckoutOpen(true);
    } else {
      setErrorMessage(
        res.error || "Failed to initialize reservation checkout. Please retry."
      );
    }
  };

  // Option B: Continue without reserving
  const handleContinueWithoutReserving = () => {
    setIsModalOpen(false);
    setViewState("inquiry_confirmed");
  };

  const holdDays = Math.max(
    1,
    Math.round(pricingConfig.reservationDurationHours / 24)
  );

  // 1. Confirmed Reservation Screen (Option A)
  if (viewState === "reservation_active" && reservationDetails) {
    return (
      <div className="py-6 sm:py-10">
        <ReservationConfirmedView
          selectedDesign={selectedDesign}
          reservationDetails={reservationDetails}
          packageTotal={packageTotal}
          pricingConfig={pricingConfig}
          email={email}
          phone={phone}
        />
      </div>
    );
  }

  // 2. Confirmed Standard Inquiry Screen (Option B)
  if (viewState === "inquiry_confirmed" && inquiryData) {
    return (
      <div className="py-6 sm:py-10">
        <InquiryConfirmedView
          selectedDesign={selectedDesign}
          inquiryRef={inquiryData.ref}
          packageTotal={packageTotal}
          selectedModules={selectedModules}
        />
      </div>
    );
  }

  // 3. Main Luxury Dynamic Reservation Experience
  return (
    <div ref={stageRef} className="relative space-y-10 sm:space-y-12">
      {/* Interactive Cursor-Tracking Champagne-Gold Spotlight & Ambient Stardust Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-12 -inset-y-8 overflow-hidden select-none"
      >
        <div
          ref={spotlightRef}
          className="hidden lg:block absolute top-0 left-0 h-[560px] w-[560px] rounded-full blur-[110px] opacity-35 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 215, 94, 0.28) 0%, rgba(217, 70, 239, 0.16) 46%, transparent 72%)",
          }}
        />

        {AMBIENT_ORBS.map((orb, idx) => (
          <span
            key={idx}
            className="js-res-orb absolute rounded-full"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              boxShadow: `0 0 ${orb.size * 3}px ${orb.color}`,
            }}
          />
        ))}
      </div>

      {/* =====================================================================
          HERO HEADER — EXACT HOMEPAGE FLOURISH + EDITORIAL PHILOSOPHER DNA
          ===================================================================== */}
      <header className="relative z-10 text-center max-w-4xl mx-auto space-y-4">
        {/* Decorative Peeking Cards & Crown Cluster (Desktop Subtle Accent) */}
        <div
          ref={floatingPropRef}
          aria-hidden="true"
          className="hidden xl:block pointer-events-none absolute -top-6 -right-36 w-[160px] aspect-[560/490] opacity-85 select-none will-change-transform"
        >
          <div
            className="absolute inset-2 rounded-full blur-[30px] opacity-75"
            style={{
              background:
                "radial-gradient(circle, rgba(245, 196, 81, 0.32) 0%, rgba(192, 38, 211, 0.25) 60%, transparent 80%)",
            }}
          />
          <Image
            src="/images/cards-chips.png"
            alt=""
            fill
            sizes="160px"
            className="object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.85)]"
          />
        </div>

        <div className="js-res-hero-stagger inline-flex items-center gap-2 rounded-full border border-[#f5c451]/45 bg-[#1a0730]/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffe28a] backdrop-blur-md shadow-[0_0_24px_rgba(245,196,81,0.18)]">
          <Crown className="h-3.5 w-3.5 text-[#ffd75e] fill-[#ffd75e]/30" />
          <span>Royal Casino Design Reservation Desk</span>
        </div>

        <h1 className="js-res-hero-stagger flourish font-philosopher text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold uppercase italic leading-tight tracking-wide">
          <span>
            Secure Your <span className="gold-text">Platform Look</span>
          </span>
        </h1>

        <p className="js-res-hero-stagger mx-auto max-w-2xl text-sm sm:text-base text-white/75 leading-relaxed">
          Select your luxury storefront theme, configure optional expansion modules in real time, and lock{" "}
          <span className="font-semibold text-[#ffe28a]">
            {pricingConfig.reservationDiscountPercent}% off for {holdDays} days
          </span>{" "}
          with a 100% refundable{" "}
          <span className="font-semibold text-white">
            ${pricingConfig.reservationFee.toLocaleString()} USD
          </span>{" "}
          holding deposit.
        </p>

        {/* Dynamic 3-Step Journey Tracker (Matches Homepage HowItWorks Medallions) */}
        <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {[
            {
              step: 1,
              title: "Theme & Modules",
              sub: `${selectedDesign.name}${
                selectedModules.length > 0
                  ? ` + ${selectedModules.length} Add-On${selectedModules.length > 1 ? "s" : ""}`
                  : ""
              }`,
              icon: Monitor,
            },
            {
              step: 2,
              title: "Operator Details",
              sub:
                completionPercent === 100
                  ? "Ready to submit"
                  : `${completionPercent}% profile complete`,
              icon: User,
            },
            {
              step: 3,
              title: `Lock ${pricingConfig.reservationDiscountPercent}% Hold`,
              sub: `$${pricingConfig.reservationFee} refundable deposit`,
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeStep === item.step;
            const isComplete = activeStep > item.step || (item.step === 2 && completionPercent === 100);
            return (
              <div
                key={item.step}
                className={`js-res-step-pill flex items-center gap-3 rounded-2xl border px-4 py-3 text-left backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? "border-[#f5c451]/75 bg-gradient-to-r from-[#2e0b4e]/85 to-[#1a0532]/90 shadow-[0_0_24px_rgba(245,196,81,0.2)]"
                    : isComplete
                    ? "border-emerald-400/45 bg-[#16062c]/75"
                    : "border-purple-400/25 bg-[#120424]/70"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border ${
                    isComplete
                      ? "border-emerald-400/70 bg-emerald-500/15 text-emerald-400"
                      : isActive
                      ? "border-[#f5c451] bg-[#36105a] text-[#ffd75e] shadow-[0_0_14px_rgba(245,196,81,0.4)]"
                      : "border-purple-400/35 bg-[#22083c] text-white/60"
                  }`}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-white truncate">
                    {item.step}. {item.title}
                  </p>
                  <p className="text-[11px] text-white/60 truncate">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {/* =====================================================================
          MAIN SINGLE-COLUMN LUXURY WORKSPACE (CONFIGURATOR + OPERATOR FORM)
          ===================================================================== */}
      <form
        onSubmit={handleFormSubmit}
        className="relative z-10 mx-auto max-w-4xl space-y-7"
      >
        <div className="space-y-7">
          {/* -----------------------------------------------------------------
              CARD 1: VISUAL CASINO THEME PICKER (FULLY DYNAMIC)
              ----------------------------------------------------------------- */}
          <section className="js-res-panel-reveal panel relative overflow-hidden p-5 sm:p-7 space-y-5">
            <div className="panel-sheen" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-px left-[12%] right-[12%] h-[1.5px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 232, 150, 0.85), transparent)",
              }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c451]">
                  Step 01 • Visual Theme Selection
                </p>
                <h2 className="mt-0.5 font-philosopher text-xl sm:text-2xl font-bold italic text-white">
                  Choose Your <span className="gold-text">Casino Design</span>
                </h2>
              </div>

              {/* Dynamic Search Filter */}
              <div className="relative w-full sm:w-56">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" />
                <input
                  type="text"
                  value={themeQuery}
                  onChange={(e) => setThemeQuery(e.target.value)}
                  placeholder="Search themes..."
                  aria-label="Search casino themes"
                  className="input !min-h-[40px] !py-2 !pl-9 !pr-3 !rounded-full text-xs placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Interactive Visual Design Cards Grid */}
            {visibleDesigns.length > 0 ? (
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {visibleDesigns.map((design) => {
                  const isSelected = design.slug === selectedDesign.slug;
                  return (
                    <button
                      key={design.slug}
                      type="button"
                      onClick={() => setSelectedSlug(design.slug)}
                      className={`group/theme relative rounded-2xl overflow-hidden border text-left transition-all duration-300 ${
                        isSelected
                          ? `border-[#f5c451] bg-[#240942]/95 shadow-[0_0_26px_rgba(245,196,81,0.35)] -translate-y-0.5 theme-card-${design.slug}`
                          : "border-purple-400/25 bg-[#120424]/75 hover:border-[#f5c451]/60 hover:-translate-y-0.5 hover:bg-[#1c0735]/85"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0219]">
                        <Image
                          src={design.image}
                          alt={design.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 50vw, 220px"
                          className="object-cover object-center transition-transform duration-500 group-hover/theme:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120424] via-transparent to-transparent" />

                        {isSelected && (
                          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-[#ffe27a] to-[#e69d12] px-2 py-0.5 text-[10px] font-black uppercase text-[#261100] shadow-md">
                            <Check className="h-3 w-3 stroke-[3]" />
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 sm:p-3">
                        <p
                          className={`font-philosopher text-sm sm:text-[15px] font-bold leading-tight truncate transition-colors ${
                            isSelected
                              ? "text-[#ffe28a]"
                              : "text-white group-hover/theme:text-[#ffe28a]"
                          }`}
                        >
                          {design.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/55 truncate">
                          {design.subtitle || "Turnkey VIP Theme"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="relative z-10 rounded-2xl border border-purple-500/25 bg-[#120424]/70 p-6 text-center text-xs text-white/65">
                No themes matched &ldquo;{themeQuery}&rdquo;.{" "}
                <button
                  type="button"
                  onClick={() => setThemeQuery("")}
                  className="text-[#ffe28a] font-bold underline underline-offset-4"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Show All / Collapse Toggle */}
            {filteredDesigns.length > 6 && !themeQuery.trim() && (
              <div className="relative z-10 flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowAllThemes((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/35 bg-[#180530]/80 px-4 py-1.5 text-xs font-semibold text-white/85 hover:border-[#f5c451]/70 hover:text-[#ffe28a] transition-all"
                >
                  {showAllThemes ? (
                    <>
                      <span>Show Fewer Designs</span>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Explore All {filteredDesigns.length} Casino Designs</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </section>

          {/* -----------------------------------------------------------------
              CARD 2: DYNAMIC MODULAR ADD-ON CONFIGURATOR
              ----------------------------------------------------------------- */}
          <section className="js-res-panel-reveal panel relative overflow-hidden p-5 sm:p-7 space-y-5">
            <div className="panel-sheen" aria-hidden="true" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c451]">
                  Step 02 • Optional Expansion Modules
                </p>
                <h2 className="mt-0.5 font-philosopher text-xl sm:text-2xl font-bold italic text-white">
                  Customize Your <span className="gold-text">Package</span>
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/65">
                <Layers className="h-3.5 w-3.5 text-[#f5c451]" />
                {selectedAddonIds.length === 0
                  ? "Starter Package Only"
                  : `${selectedAddonIds.length} Module${
                      selectedAddonIds.length > 1 ? "s" : ""
                    } Active (+$${addonsTotal.toLocaleString()})`}
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {addonModules.map((mod) => {
                const isSelected = selectedAddonIds.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleAddon(mod.id)}
                    aria-pressed={isSelected}
                    className={`group/addon relative flex flex-col justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-[#f5c451] bg-gradient-to-br from-[#35115a]/85 via-[#22083f]/90 to-[#16052c]/95 shadow-[0_0_24px_rgba(245,196,81,0.22),inset_0_1px_0_rgba(255,243,196,0.3)] -translate-y-0.5"
                        : "border-purple-400/25 bg-[#130426]/75 hover:border-[#f5c451]/55 hover:bg-[#1d0738]/85"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-all ${
                            isSelected
                              ? "border-[#f5c451]/80 bg-[#3e1368] shadow-[0_0_16px_rgba(245,196,81,0.35)]"
                              : "border-purple-400/35 bg-[#240942]"
                          }`}
                        >
                          <AddonIcon iconKey={mod.iconKey} />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-philosopher text-base font-bold text-white leading-tight group-hover/addon:text-[#ffe28a] transition-colors">
                            {mod.name}
                          </h3>
                          <p className="text-xs font-extrabold text-[#ffe28a] tabular-nums">
                            +${mod.price.toLocaleString()} USD
                          </p>
                        </div>
                      </div>

                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${
                          isSelected
                            ? "border-[#ffd75e] bg-[#ffd75e] text-[#261100]"
                            : "border-purple-400/40 bg-[#0d031b] text-transparent"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                    </div>

                    {mod.description && (
                      <p className="text-xs text-white/65 leading-relaxed">
                        {mod.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* -----------------------------------------------------------------
              CARD 3: OPERATOR & BRAND DETAILS FORM (HOMEPAGE GLASS FORM DNA)
              ----------------------------------------------------------------- */}
          <section className="js-res-panel-reveal panel relative overflow-hidden p-5 sm:p-8 space-y-6">
            <div className="panel-sheen" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-px left-[12%] right-[12%] h-[1.5px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 232, 150, 0.9), transparent)",
                filter: "drop-shadow(0 0 8px rgba(245, 196, 81, 0.65))",
              }}
            />

            {/* Header + GSAP Animated Completion Progress Bar */}
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c451]">
                    Step 03 • Operator Onboarding Profile
                  </p>
                  <h2 className="mt-0.5 font-philosopher text-xl sm:text-2xl font-bold italic text-white">
                    Operator &amp; <span className="gold-text">Brand Details</span>
                  </h2>
                </div>
                <span className="rounded-full border border-[#f5c451]/40 bg-[#230940]/80 px-3 py-1 text-[11px] font-bold text-[#ffe28a]">
                  {completionPercent}% Complete
                </span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-purple-950/80 overflow-hidden border border-purple-500/20">
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full bg-gradient-to-r from-[#d946ef] via-[#f5c451] to-[#fff0a8] shadow-[0_0_12px_rgba(245,196,81,0.7)]"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="relative z-10 flex items-center gap-2.5 rounded-2xl border border-red-400/50 bg-red-950/60 px-4 py-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="relative z-10 space-y-4">
              {/* Row 1: Brand Name & Target Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                  <span className="flex items-center gap-1.5">
                    <Crown className="h-3.5 w-3.5 text-[#f5c451]" />
                    Casino Brand Name <span className="text-[#ffd75e]">*</span>
                  </span>
                  <input
                    required
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Royal VIP Casino"
                    className="input font-normal text-sm placeholder:text-white/35"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-[#f5c451]" />
                    Target Domain{" "}
                    <span className="font-normal normal-case text-white/45">
                      (optional)
                    </span>
                  </span>
                  <input
                    type="text"
                    value={domainPreference}
                    onChange={(e) => setDomainPreference(e.target.value)}
                    placeholder="e.g. royalvip.com"
                    className="input font-normal text-sm placeholder:text-white/35"
                  />
                </label>
              </div>

              {/* Row 2: Full Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#f5c451]" />
                    Operator Full Name <span className="text-[#ffd75e]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Smith"
                    className="input font-normal text-sm placeholder:text-white/35"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-[#f5c451]" />
                    Business / Company{" "}
                    <span className="font-normal normal-case text-white/45">
                      (optional)
                    </span>
                  </span>
                  <input
                    autoComplete="organization"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Gaming Holdings Ltd."
                    className="input font-normal text-sm placeholder:text-white/35"
                  />
                </label>
              </div>

              {/* Row 3: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#f5c451]" />
                    Email Address <span className="text-[#ffd75e]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="input font-normal text-sm placeholder:text-white/35"
                  />
                </label>

                <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#f5c451]" />
                    Phone Number <span className="text-[#ffd75e]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="tel"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (416) 555-0199"
                    className="input font-normal text-sm placeholder:text-white/35"
                  />
                </label>
              </div>

              {/* Row 4: Dynamic WhatsApp Same-as-Phone Toggle */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                    <MessageSquare className="h-3.5 w-3.5 text-[#f5c451]" />
                    WhatsApp Number
                  </span>
                  <label className="inline-flex items-center gap-2 text-xs text-white/75 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sameAsPhone}
                      onChange={(e) => setSameAsPhone(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-purple-400/50 bg-[#0d031b] accent-[#f5c451] cursor-pointer"
                    />
                    <span>Same as phone number</span>
                  </label>
                </div>

                {!sameAsPhone && (
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Enter separate WhatsApp number"
                    className="input font-normal text-sm placeholder:text-white/35"
                  />
                )}
              </div>

              {/* Row 5: Interactive Launch Timeline Pills */}
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
                  <Clock className="h-3.5 w-3.5 text-[#f5c451]" />
                  When Are You Looking to Launch?{" "}
                  <span className="text-[#ffd75e]">*</span>
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {TIMELINE_OPTIONS.map((opt) => {
                    const active = intendedTimeline === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setIntendedTimeline(opt.value)}
                        className={`rounded-xl border px-2.5 py-2.5 text-center transition-all duration-200 ${
                          active
                            ? "border-[#f5c451] bg-gradient-to-b from-[#3b1264]/90 to-[#22073d]/95 text-[#ffe28a] shadow-[0_0_16px_rgba(245,196,81,0.28)]"
                            : "border-purple-400/25 bg-[#100420]/75 text-white/70 hover:border-purple-300/50 hover:text-white"
                        }`}
                      >
                        <span className="block text-[11px] font-bold leading-tight">
                          {opt.label}
                        </span>
                        <span
                          className={`mt-0.5 block text-[9px] uppercase tracking-wider ${
                            active ? "text-[#f5c451]" : "text-white/40"
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 6: Quick Requirement Chips + Textarea */}
              <div className="space-y-2.5">
                <span className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-white/85">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#f5c451]" />
                    Project Requirements{" "}
                    <span className="font-normal normal-case text-white/45">
                      (optional)
                    </span>
                  </span>
                  <span className="text-[10px] font-normal normal-case text-white/50">
                    Tap tags to quick-add
                  </span>
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {REQUIREMENT_CHIPS.map((chip) => {
                    const active = projectRequirements.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleRequirementChip(chip)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-all ${
                          active
                            ? "border-[#f5c451] bg-[#f5c451]/15 text-[#ffe28a]"
                            : "border-purple-400/25 bg-[#120424]/75 text-white/65 hover:border-purple-300/50 hover:text-white"
                        }`}
                      >
                        {active ? "✓ " : "+ "}
                        {chip}
                      </button>
                    );
                  })}
                </div>

                <textarea
                  rows={3}
                  value={projectRequirements}
                  onChange={(e) => setProjectRequirements(e.target.value)}
                  placeholder="Mention target geography, preferred game providers, crypto/fiat payment preferences, or compliance needs..."
                  className="input font-normal text-sm placeholder:text-white/35 resize-none"
                />
              </div>
            </div>

            {/* Signature Royal Gold CTA Submit Button */}
            <div className="relative z-10 pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-royal-gold shine w-full py-4 px-6 text-sm sm:text-base uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                <Lock className="h-4 w-4 stroke-[2.5]" />
                <span>
                  {loading
                    ? "Initializing Your Reservation Desk..."
                    : `Continue With ${selectedDesign.name}`}
                </span>
                {!loading && <ArrowRight className="h-4 w-4 stroke-[2.5]" />}
              </button>

              <p className="text-center text-[11.5px] text-white/55">
                Next step lets you either{" "}
                <strong className="text-[#ffe28a]">
                  lock {pricingConfig.reservationDiscountPercent}% off with a refundable $
                  {pricingConfig.reservationFee} hold
                </strong>{" "}
                or continue as a free standard inquiry.
              </p>
            </div>
          </section>
        </div>
      </form>

      {/* Reservation Incentive Modal Popup */}
      <ReservationOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        originalPrice={packageTotal}
        designName={selectedDesign.name}
        pricingConfig={pricingConfig}
        onConfirmReservation={handleConfirmReservation}
        onContinueWithoutReserving={handleContinueWithoutReserving}
        loading={loading}
      />

      {/* Reservation Checkout & Terms Modal */}
      {reservationDetails && (
        <ReservationCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          design={selectedDesign}
          packageTotal={packageTotal}
          pricingConfig={pricingConfig}
          customerName={fullName}
          customerEmail={email}
          reservationId={reservationDetails.reservationId}
          paymentConfig={paymentConfig}
          onPaymentSuccess={() => {
            setIsCheckoutOpen(false);
            setViewState("reservation_active");
          }}
        />
      )}
    </div>
  );
}

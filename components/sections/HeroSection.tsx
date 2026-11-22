"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Layers, Dices, Puzzle, BarChart3, Headphones } from "lucide-react";

const features = [
  {
    icon: Crown,
    title: "Premium",
    subtitle: "Casino Designs",
    href: "/designs",
    badge: "12 Themes",
  },
  {
    icon: Layers,
    title: "Turnkey",
    subtitle: "Setup",
    href: "/packages",
    badge: "Full Launch",
  },
  {
    icon: Dices,
    title: "Casino Games",
    subtitle: "Included",
    href: "/packages",
    badge: "Slots & Tables",
  },
  {
    icon: Puzzle,
    title: "Add-On",
    subtitle: "Modules",
    href: "/modules",
    badge: "Sports & Live",
  },
  {
    icon: BarChart3,
    title: "Scalable &",
    subtitle: "Flexible",
    href: "/modules",
    badge: "Cloud Scale",
  },
  {
    icon: Headphones,
    title: "Professional",
    subtitle: "Support",
    href: "/contact",
    badge: "24/7 VIP",
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* =========================================================================
          FULL-BLEED HERO AMBIENT BACKDROP (fills entire viewport width on wide screens)
          Eliminates blank black side margins with matching royal purple/magenta/gold ribbons
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        {/* Softly extended ambient hero hall color bleed across full viewport width */}
        <Image
          src="/images/royal-hero/royal-hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top scale-110 blur-[34px] opacity-75 saturate-125"
        />

        {/* Deep royal obsidian-violet atmospheric tint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(16, 4, 34, 0.68) 0%, rgba(16, 4, 34, 0.18) 22%, rgba(16, 4, 34, 0.18) 78%, rgba(16, 4, 34, 0.65) 100%)",
          }}
        />

        {/* Left & Right Wing Neon Purple, Magenta & Warm Gold Glow Clouds */}
        <div
          className="absolute -left-[8%] top-[8%] h-[640px] w-[620px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(224, 36, 255, 0.34) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 74%)",
          }}
        />
        <div
          className="absolute -left-[4%] bottom-[6%] h-[460px] w-[520px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(192, 38, 211, 0.32) 0%, rgba(107, 33, 168, 0.16) 52%, transparent 75%)",
          }}
        />
        <div
          className="absolute -right-[8%] top-[10%] h-[600px] w-[620px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 196, 81, 0.26) 0%, rgba(192, 38, 211, 0.2) 52%, transparent 75%)",
          }}
        />
        <div
          className="absolute -right-[5%] bottom-[8%] h-[480px] w-[540px] rounded-full blur-[115px]"
          style={{
            background:
              "radial-gradient(circle, rgba(217, 70, 239, 0.28) 0%, rgba(245, 158, 11, 0.16) 52%, transparent 76%)",
          }}
        />

        {/* Full-Width Sweeping Luminous Silk Ribbons (matching HomepageBackground style) */}
        <svg
          className="absolute inset-0 h-full w-full opacity-90"
          viewBox="0 0 1920 960"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hero-wing-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e024ff" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#f5a6ff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-wing-gold" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f5c451" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#d946ef" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-wing-glow-wide" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            <filter id="hero-wing-glow-crisp" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Left Wing Upper Sweeping Neon Magenta Ribbon */}
          <path
            d="M -100 410 C 60 250, 240 160, 480 110"
            stroke="url(#hero-wing-purple)"
            strokeWidth="36"
            strokeLinecap="round"
            filter="url(#hero-wing-glow-wide)"
            opacity="0.65"
          />
          <path
            d="M -100 410 C 60 250, 240 160, 480 110"
            stroke="#f7c8ff"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#hero-wing-glow-crisp)"
            opacity="0.8"
          />

          {/* Left Wing Lower Sweeping Neon Purple Arc */}
          <path
            d="M -120 710 C 80 780, 240 845, 450 885"
            stroke="url(#hero-wing-purple)"
            strokeWidth="40"
            strokeLinecap="round"
            filter="url(#hero-wing-glow-wide)"
            opacity="0.55"
          />
          <path
            d="M -120 710 C 80 780, 240 845, 450 885"
            stroke="#f5c8ff"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#hero-wing-glow-crisp)"
            opacity="0.65"
          />

          {/* Right Wing Warm Champagne-Gold & Magenta Light Sweep */}
          <path
            d="M 2020 290 C 1860 390, 1730 510, 1520 620"
            stroke="url(#hero-wing-gold)"
            strokeWidth="38"
            strokeLinecap="round"
            filter="url(#hero-wing-glow-wide)"
            opacity="0.6"
          />
          <path
            d="M 2020 290 C 1860 390, 1730 510, 1520 620"
            stroke="#fff3b0"
            strokeWidth="2.2"
            strokeLinecap="round"
            filter="url(#hero-wing-glow-crisp)"
            opacity="0.7"
          />

          {/* Right Wing Lower Neon Violet-Gold Ribbon */}
          <path
            d="M 2040 760 C 1860 815, 1700 845, 1480 870"
            stroke="url(#hero-wing-gold)"
            strokeWidth="34"
            strokeLinecap="round"
            filter="url(#hero-wing-glow-wide)"
            opacity="0.5"
          />
        </svg>

        {/* Subtle Golden & Lavender Stardust on the Wings */}
        <div
          className="absolute inset-0 opacity-65 animate-rcc-stardust"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 4% 24%, rgba(255, 224, 130, 0.95) 50%, transparent 100%),
              radial-gradient(2px 2px at 7% 58%, rgba(232, 121, 249, 0.9) 50%, transparent 100%),
              radial-gradient(1.5px 1.5px at 3% 78%, rgba(255, 215, 94, 0.85) 50%, transparent 100%),
              radial-gradient(2px 2px at 96% 22%, rgba(255, 224, 130, 0.95) 50%, transparent 100%),
              radial-gradient(2px 2px at 93% 54%, rgba(245, 196, 81, 0.85) 50%, transparent 100%),
              radial-gradient(2px 2px at 97% 76%, rgba(232, 121, 249, 0.9) 50%, transparent 100%)
            `,
          }}
        />
      </div>

      {/* =========================================================================
          DESKTOP PIXEL-PERFECT STAGE (lg: and above)
          Matches 1672 x 941 reference image with 1:1 asset layering & proportions
          ========================================================================= */}
      <div className="hidden lg:block relative z-10 w-full max-w-[1672px] mx-auto aspect-[1672/941] select-none">
        {/* Layer 1: Opulent Grand Casino Ambient Background (feathered seamlessly on >1672px) */}
        <div className="hero-stage-bg-feather absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/royal-hero/royal-hero-bg.png"
            alt="Opulent Royal Casino Club Grand Chandelier Hall"
            fill
            priority
            sizes="1672px"
            className="object-cover object-top"
          />
        </div>

        {/* Ambient Subtle Glow Accents */}
        <div className="absolute top-[25%] left-[2%] w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-[1] animate-royal-pulse" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none z-[1]" />
        <div className="absolute top-[20%] right-[25%] w-[350px] h-[350px] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none z-[1]" />

        {/* Layer 2: Female Model (Layered behind Casino Objects) */}
        <div
          className="absolute z-10 pointer-events-none transition-transform duration-700 ease-out hover:scale-[1.01]"
          style={{
            left: "45.2%",
            top: "13.4%",
            width: "31.2%",
            height: "69.0%",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/royal-hero/royal-hero-model.png"
              alt="Glamorous Royal Casino Hostess in Shimmering Gold Gown"
              fill
              priority
              sizes="(max-width: 1672px) 31vw, 520px"
              className="object-contain object-bottom drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
            />
          </div>
        </div>

        {/* Layer 3: Casino Objects (Slot Machine 777, Roulette, Chips, Cards, Dice on Circular Stage) */}
        <div
          className="absolute z-20 pointer-events-none transition-transform duration-700 ease-out hover:scale-[1.01]"
          style={{
            left: "53.6%",
            top: "18.8%",
            width: "47.4%",
            height: "63.2%",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/royal-hero/royal-hero-objects.png"
              alt="Royal Casino 777 Slot Machine, Gold Roulette, Cards and Purple Gold Chips"
              fill
              priority
              sizes="(max-width: 1672px) 48vw, 795px"
              className="object-contain object-bottom drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>

        {/* Layer 4: Luxury Headline Asset (Animated + Interactive Hover) */}
        <div
          className="group/headline hero-headline-enter absolute z-30 cursor-pointer"
          style={{
            left: "5.0%",
            top: "19.5%",
            width: "41.5%",
            height: "38.0%",
          }}
        >
          {/* Soft ambient chandelier-gold aura behind headline that blooms on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-full opacity-45 blur-[48px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/headline:scale-110 group-hover/headline:opacity-90"
            style={{
              background:
                "radial-gradient(ellipse at 42% 52%, rgba(255, 215, 94, 0.32) 0%, rgba(224, 36, 255, 0.16) 52%, transparent 76%)",
            }}
          />

          <div className="hero-headline-stage relative w-full h-full">
            <Image
              src="/images/royal-hero/royal-hero-headline.png"
              alt="Launch Your Own Premium Online Casino - Starting at $15,000"
              fill
              priority
              sizes="(max-width: 1672px) 42vw, 695px"
              className="hero-headline-img object-contain object-left"
            />
            {/* Pixel-masked champagne-gold light glint sweep (ambient + hover) */}
            <div className="hero-headline-mask-left" aria-hidden="true" />
          </div>
        </div>

        {/* Tagline & Subtitle Paragraph Description */}
        <div
          className="absolute z-20 text-left"
          style={{
            left: "6.2%",
            top: "54.8%",
            width: "41%",
          }}
        >
          <p className="text-[#ffd700] text-[12px] xl:text-[13.5px] 2xl:text-[15px] font-extrabold uppercase tracking-[0.05em] leading-snug mb-1.5 xl:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] [text-shadow:0_0_16px_rgba(255,215,0,0.35)]">
            WHITE-LABEL TURN KEY CASINO, NO LICENSE REQUIRED!
          </p>
          <p className="text-gray-100 text-[13.5px] xl:text-[15px] 2xl:text-[16.5px] font-normal leading-[1.38] tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Choose Your Design, Launch with Casino Slots &amp; Game Tables,
            <br className="hidden sm:inline" />
            and Build Your Casino Brand with a Complete Platform Solution.
          </p>
        </div>

        {/* Dual CTA Buttons */}
        <div
          className="absolute z-30 flex items-center gap-4"
          style={{
            left: "6.2%",
            top: "68.2%",
          }}
        >
          {/* Primary Gold Pill: Browse Casino Designs -> */}
          <Link
            href="/designs"
            className="btn-royal-gold px-7 py-3.5 text-[15.5px] font-black tracking-tight"
          >
            <span>Browse Casino Designs</span>
            <ArrowRight size={18} className="stroke-[3]" />
          </Link>

          {/* Secondary Purple Neon Pill: Crown + Reserve A Casino */}
          <Link
            href="/select-design"
            className="btn-royal-purple-neon px-7 py-3.5 text-[15.5px] font-extrabold tracking-wide"
          >
            <Crown size={20} className="fill-[#ffd700] text-[#ffd700] stroke-[1.5]" />
            <span>Reserve A Casino</span>
          </Link>
        </div>

        {/* Layer 5: Bottom Features Strip (Pixel-Perfect Pill Bar) */}
        <div
          className="absolute z-30 left-1/2 -translate-x-1/2"
          style={{
            top: "78.2%",
            width: "94.5%",
            aspectRatio: "2132 / 220",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/royal-hero/royal-hero-strip-pill.png"
              alt="Royal Casino Club Features: Premium Casino Designs, Turnkey Setup, Casino Games Included, Add-On Modules, Scalable & Flexible, Professional Support"
              fill
              priority
              sizes="1580px"
              className="object-contain object-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
            />

            {/* Interactive Clickable Hotspots mapped directly across the 6 features */}
            <div className="absolute inset-0 grid grid-cols-6 z-40">
              {features.map((feat, idx) => (
                <Link
                  key={idx}
                  href={feat.href}
                  className="group relative h-full flex items-center justify-center rounded-2xl hover:bg-white/[0.04] transition-all duration-300"
                  title={`${feat.title} ${feat.subtitle} - Click to learn more`}
                >
                  <span className="sr-only">
                    {feat.title} {feat.subtitle}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-[#1a0a2a]/95 text-[#ffd700] text-[11px] font-bold px-3 py-1 rounded-full border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] pointer-events-none transition-all duration-200 transform -translate-y-1 group-hover:translate-y-0 whitespace-nowrap">
                    {feat.badge} &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE & TABLET RESPONSIVE STAGE (< lg)
          Clean adaptation with identical assets, typography, and luxury neon effects
          ========================================================================= */}
      <div className="lg:hidden relative z-10 pt-28 sm:pt-32 pb-14 px-4 sm:px-6 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Soft readability scrim over full-bleed hero backdrop on mobile/tablet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 inset-y-0 z-0 bg-gradient-to-b from-[#0a0214]/55 via-[#0a0214]/35 to-transparent"
        />

        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Headline Image Responsive Scale (Animated + Interactive Hover) */}
          <div className="group/headline hero-headline-enter relative w-full max-w-md sm:max-w-lg aspect-[1448/1086] mb-2 cursor-pointer">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-full opacity-45 blur-[40px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/headline:scale-110 group-hover/headline:opacity-90"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(255, 215, 94, 0.3) 0%, rgba(224, 36, 255, 0.16) 52%, transparent 76%)",
              }}
            />
            <div className="hero-headline-stage relative w-full h-full">
              <Image
                src="/images/royal-hero/royal-hero-headline.png"
                alt="Launch Your Own Premium Online Casino - Starting at $15,000"
                fill
                priority
                sizes="(max-width: 768px) 95vw, 500px"
                className="hero-headline-img object-contain object-center"
              />
              <div className="hero-headline-mask-center" aria-hidden="true" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-[#ffd700] text-xs sm:text-sm font-extrabold uppercase tracking-[0.05em] leading-snug max-w-lg mt-2 mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] [text-shadow:0_0_16px_rgba(255,215,0,0.35)]">
            WHITE-LABEL TURN KEY CASINO, NO LICENSE REQUIRED!
          </p>

          {/* Subtitle */}
          <p className="text-gray-200 text-xs sm:text-sm font-medium leading-relaxed max-w-lg mb-6">
            Choose Your Design, Launch with Casino Slots &amp; Game Tables, and Build Your Casino Brand with a Complete Platform Solution.
          </p>

          {/* Dual CTAs Stacked / Wrapped */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-8">
            <Link
              href="/designs"
              className="btn-royal-gold w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-black text-center"
            >
              <span>Browse Casino Designs</span>
              <ArrowRight size={16} className="stroke-[3]" />
            </Link>

            <Link
              href="/select-design"
              className="btn-royal-purple-neon w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-center"
            >
              <Crown size={16} className="fill-[#ffd700] text-[#ffd700] stroke-[1.5]" />
              <span>Reserve A Casino</span>
            </Link>
          </div>

          {/* Responsive Showcase Visual: Model + Casino Objects Composite */}
          <div className="relative w-full max-w-lg aspect-[16/10] my-4 overflow-hidden rounded-2xl border border-purple-700/30 bg-[#0d0322]/60 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.25)]">
            <Image
              src="/images/royal-hero/royal-hero-bg.png"
              alt="Casino stage background"
              fill
              className="object-cover opacity-60"
            />
            {/* Model */}
            <div className="absolute left-[5%] bottom-0 w-[48%] h-[92%]">
              <Image
                src="/images/royal-hero/royal-hero-model.png"
                alt="Casino Dealer Model"
                fill
                className="object-contain object-bottom"
              />
            </div>
            {/* Objects */}
            <div className="absolute right-[0%] bottom-0 w-[64%] h-[88%]">
              <Image
                src="/images/royal-hero/royal-hero-objects.png"
                alt="Casino 777 Slot Machine & Roulette"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Responsive Features Grid (2 Columns on mobile, 3 on tablet) */}
          <div className="w-full mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <Link
                    key={idx}
                    href={feat.href}
                    className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#120329]/80 border border-purple-600/40 hover:border-[#ffd700]/70 hover:bg-purple-950/40 backdrop-blur-md transition-all duration-300 text-left shadow-[0_0_15px_rgba(168,85,247,0.15)] group"
                  >
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-purple-950/90 border border-purple-500/40 text-[#FFD700] group-hover:scale-110 transition-transform">
                      <Icon size={16} className="stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                        {feat.title}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-[#ffd700] leading-tight truncate font-semibold">
                        {feat.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Bottom Fade into Homepage Royal Violet Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-b from-transparent via-[#0a0214]/70 to-[#0a0214]"
      />
    </section>
  );
}

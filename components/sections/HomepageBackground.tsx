"use client";

/**
 * Luxury Royal Casino Club Homepage Background
 * Multi-layered deep obsidian-violet canvas with sweeping luminous magenta/purple
 * and golden-amber light ribbons, ambient neon clouds, and subtle bokeh stardust.
 */
export default function HomepageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Base Deep Royal Obsidian-Violet Vertical Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #07020d 0%, #100420 18%, #090213 38%, #120424 58%, #080210 78%, #130425 94%, #07020d 100%)",
        }}
      />

      {/* 2. Section-Aligned Ambient Neon Purple, Magenta & Gold Glow Clouds */}
      {/* Starter Package Aura */}
      <div
        className="absolute top-[11%] left-1/2 -translate-x-1/2 h-[620px] w-[1150px] max-w-[140vw] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217, 70, 239, 0.26) 0%, rgba(126, 34, 206, 0.16) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute top-[14%] -left-[12%] h-[520px] w-[520px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(224, 36, 255, 0.25) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 75%)",
        }}
      />

      {/* Choose Your Casino Design Aura (Purple Left + Warm Gold Right) */}
      <div
        className="absolute top-[27%] -left-[10%] h-[620px] w-[640px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(192, 38, 211, 0.26) 0%, rgba(107, 33, 168, 0.12) 55%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-[31%] -right-[8%] h-[600px] w-[620px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 196, 81, 0.22) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 74%)",
        }}
      />

      {/* How It Works Intense Magenta-Violet Halo */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 h-[540px] w-[1100px] max-w-[135vw] rounded-full blur-[135px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(224, 36, 255, 0.28) 0%, rgba(147, 51, 234, 0.18) 45%, transparent 72%)",
        }}
      />

      {/* Features & Benefits Royal Violet Side Glows */}
      <div
        className="absolute top-[61%] -left-[12%] h-[640px] w-[640px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.24) 0%, rgba(107, 33, 168, 0.12) 55%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-[64%] -right-[10%] h-[580px] w-[580px] rounded-full blur-[145px]"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 70, 239, 0.22) 0%, rgba(126, 34, 206, 0.1) 55%, transparent 75%)",
        }}
      />

      {/* About / FAQ / Contact Warm Gold + Violet Depth */}
      <div
        className="absolute top-[78%] -right-[8%] h-[520px] w-[560px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 196, 81, 0.16) 0%, rgba(192, 38, 211, 0.14) 50%, transparent 75%)",
        }}
      />

      {/* Bottom CTA Banner Neon Magenta Halo */}
      <div
        className="absolute bottom-[1%] left-1/2 -translate-x-1/2 h-[520px] w-[1180px] max-w-[140vw] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(224, 36, 255, 0.30) 0%, rgba(147, 51, 234, 0.18) 45%, transparent 74%)",
        }}
      />

      {/* 3. Sweeping Luminous Neon Purple & Golden Silk Light Ribbons (SVG) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-90"
        viewBox="0 0 1440 4200"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glowing Magenta/Purple Ribbon Gradients */}
          <linearGradient id="rcc-ribbon-purple-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e024ff" stopOpacity="0" />
            <stop offset="22%" stopColor="#e024ff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f5a6ff" stopOpacity="0.95" />
            <stop offset="78%" stopColor="#9333ea" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="rcc-ribbon-purple-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c026d3" stopOpacity="0" />
            <stop offset="25%" stopColor="#d946ef" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6b21a8" stopOpacity="0" />
          </linearGradient>

          {/* Signature Golden-Amber Silk Ribbon Gradient */}
          <linearGradient id="rcc-ribbon-gold-1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.95" />
            <stop offset="28%" stopColor="#f5c451" stopOpacity="0.85" />
            <stop offset="62%" stopColor="#d97706" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="rcc-ribbon-gold-soft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5c451" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffd75e" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </linearGradient>

          {/* Gaussian Blur Filters for Neon Glow */}
          <filter id="rcc-glow-wide" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
          <filter id="rcc-glow-med" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="rcc-glow-crisp" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* --- Ribbon Group A: Behind Starter Package (Upper Left -> Center Right) --- */}
        <g opacity="0.85">
          <path
            d="M -120 760 C 160 580, 520 620, 860 760 C 1140 875, 1340 810, 1580 680"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="44"
            strokeLinecap="round"
            filter="url(#rcc-glow-wide)"
            opacity="0.55"
          />
          <path
            d="M -120 760 C 160 580, 520 620, 860 760 C 1140 875, 1340 810, 1580 680"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#rcc-glow-med)"
            opacity="0.8"
          />
          <path
            d="M -120 760 C 160 580, 520 620, 860 760 C 1140 875, 1340 810, 1580 680"
            stroke="#f7c8ff"
            strokeWidth="1.6"
            strokeLinecap="round"
            filter="url(#rcc-glow-crisp)"
            opacity="0.7"
          />
        </g>

        {/* --- Ribbon Group B: Behind Casino Designs (Left Magenta Wave) --- */}
        <g opacity="0.85">
          <path
            d="M -140 1320 C 140 1120, 420 1160, 740 1290 C 980 1390, 1250 1360, 1560 1210"
            stroke="url(#rcc-ribbon-purple-2)"
            strokeWidth="52"
            strokeLinecap="round"
            filter="url(#rcc-glow-wide)"
            opacity="0.5"
          />
          <path
            d="M -140 1320 C 140 1120, 420 1160, 740 1290 C 980 1390, 1250 1360, 1560 1210"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#rcc-glow-med)"
            opacity="0.75"
          />
          <path
            d="M -100 1355 C 160 1175, 450 1215, 760 1330"
            stroke="#f5c8ff"
            strokeWidth="1.4"
            strokeLinecap="round"
            filter="url(#rcc-glow-crisp)"
            opacity="0.55"
          />
        </g>

        {/* --- Ribbon Group C: Signature Flowing Golden Swoosh (Right Edge -> How It Works) --- */}
        <g opacity="0.95">
          <path
            d="M 1540 1420 C 1360 1620, 1180 1730, 920 1790 C 680 1845, 480 1920, 260 2060"
            stroke="url(#rcc-ribbon-gold-1)"
            strokeWidth="42"
            strokeLinecap="round"
            filter="url(#rcc-glow-wide)"
            opacity="0.5"
          />
          <path
            d="M 1540 1420 C 1360 1620, 1180 1730, 920 1790 C 680 1845, 480 1920, 260 2060"
            stroke="url(#rcc-ribbon-gold-1)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#rcc-glow-med)"
            opacity="0.8"
          />
          <path
            d="M 1540 1420 C 1360 1620, 1180 1730, 920 1790 C 680 1845, 480 1920, 260 2060"
            stroke="#fff6cc"
            strokeWidth="2.2"
            strokeLinecap="round"
            filter="url(#rcc-glow-crisp)"
            opacity="0.85"
          />
          {/* Secondary companion gold silk strand */}
          <path
            d="M 1560 1495 C 1390 1675, 1220 1775, 980 1825"
            stroke="url(#rcc-ribbon-gold-1)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#rcc-glow-crisp)"
            opacity="0.6"
          />
        </g>

        {/* --- Ribbon Group D: How It Works -> Features Neon Magenta Sweep --- */}
        <g opacity="0.85">
          <path
            d="M -120 2040 C 180 2200, 560 2180, 920 2040 C 1180 1940, 1380 1980, 1580 2140"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="48"
            strokeLinecap="round"
            filter="url(#rcc-glow-wide)"
            opacity="0.5"
          />
          <path
            d="M -120 2040 C 180 2200, 560 2180, 920 2040 C 1180 1940, 1380 1980, 1580 2140"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="5.5"
            strokeLinecap="round"
            filter="url(#rcc-glow-med)"
            opacity="0.75"
          />
          <path
            d="M -120 2040 C 180 2200, 560 2180, 920 2040 C 1180 1940, 1380 1980, 1580 2140"
            stroke="#f7c8ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#rcc-glow-crisp)"
            opacity="0.65"
          />
        </g>

        {/* --- Ribbon Group E: Lower Sections (FAQ / Contact) Twin Purple & Gold Waves --- */}
        <g opacity="0.8">
          <path
            d="M -140 2880 C 180 2720, 540 2780, 880 2930 C 1140 3045, 1360 2980, 1580 2820"
            stroke="url(#rcc-ribbon-purple-2)"
            strokeWidth="46"
            strokeLinecap="round"
            filter="url(#rcc-glow-wide)"
            opacity="0.45"
          />
          <path
            d="M -140 2880 C 180 2720, 540 2780, 880 2930 C 1140 3045, 1360 2980, 1580 2820"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#rcc-glow-med)"
            opacity="0.65"
          />
          <path
            d="M 1560 3260 C 1280 3420, 940 3400, 620 3270 C 340 3160, 100 3220, -140 3380"
            stroke="url(#rcc-ribbon-gold-soft)"
            strokeWidth="36"
            strokeLinecap="round"
            filter="url(#rcc-glow-wide)"
            opacity="0.45"
          />
          <path
            d="M 1560 3260 C 1280 3420, 940 3400, 620 3270 C 340 3160, 100 3220, -140 3380"
            stroke="url(#rcc-ribbon-gold-soft)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#rcc-glow-crisp)"
            opacity="0.65"
          />
        </g>

        {/* --- Ribbon Group F: Bottom CTA Banner Luminous Magenta Arc --- */}
        <g opacity="0.9">
          <path
            d="M -120 3980 C 260 3820, 660 3800, 1040 3920 C 1240 3985, 1400 3950, 1580 3850"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="56"
            strokeLinecap="round"
            filter="url(#rcc-glow-wide)"
            opacity="0.55"
          />
          <path
            d="M -120 3980 C 260 3820, 660 3800, 1040 3920 C 1240 3985, 1400 3950, 1580 3850"
            stroke="url(#rcc-ribbon-purple-1)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#rcc-glow-med)"
            opacity="0.8"
          />
        </g>
      </svg>

      {/* 4. Subtle Golden & Lavender Stardust / Bokeh Particles */}
      <div
        className="absolute inset-0 opacity-60 animate-rcc-stardust"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 8% 14%, rgba(255, 224, 130, 0.9) 50%, transparent 100%),
            radial-gradient(2px 2px at 19% 26%, rgba(232, 121, 249, 0.85) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 84% 18%, rgba(255, 215, 94, 0.9) 50%, transparent 100%),
            radial-gradient(2.5px 2.5px at 92% 33%, rgba(255, 232, 150, 0.8) 45%, transparent 100%),
            radial-gradient(1.5px 1.5px at 14% 41%, rgba(245, 196, 81, 0.85) 50%, transparent 100%),
            radial-gradient(2px 2px at 78% 46%, rgba(240, 171, 252, 0.85) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 26% 58%, rgba(255, 224, 130, 0.8) 50%, transparent 100%),
            radial-gradient(2.5px 2.5px at 88% 62%, rgba(217, 70, 239, 0.75) 45%, transparent 100%),
            radial-gradient(1.5px 1.5px at 11% 73%, rgba(240, 171, 252, 0.85) 50%, transparent 100%),
            radial-gradient(2px 2px at 82% 79%, rgba(255, 215, 94, 0.85) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 22% 89%, rgba(255, 224, 130, 0.85) 50%, transparent 100%),
            radial-gradient(2px 2px at 74% 94%, rgba(232, 121, 249, 0.9) 50%, transparent 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />

      {/* 5. Soft Edge Vignette for Luxury Contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(4, 1, 10, 0.55) 100%)",
        }}
      />
    </div>
  );
}

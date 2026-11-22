"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AMBIENT_ORBS = [
  { left: "12%", top: "16%", size: 6, color: "rgba(255, 224, 130, 0.9)" },
  { left: "38%", top: "8%", size: 5, color: "rgba(232, 121, 249, 0.85)" },
  { left: "72%", top: "14%", size: 7, color: "rgba(245, 196, 81, 0.88)" },
  { left: "89%", top: "36%", size: 5, color: "rgba(213, 140, 255, 0.85)" },
  { left: "24%", top: "68%", size: 6, color: "rgba(255, 215, 94, 0.8)" },
  { left: "64%", top: "82%", size: 5, color: "rgba(224, 36, 255, 0.82)" },
  { left: "84%", top: "76%", size: 6, color: "rgba(255, 236, 179, 0.85)" },
];

export default function PortalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".js-portal-bg-cloud").forEach((cloud, i) => {
          gsap.to(cloud, {
            x: i % 2 === 0 ? 28 : -24,
            y: i % 2 === 0 ? -18 : 20,
            scale: 1.06,
            duration: 9 + i * 2.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        gsap.utils.toArray<HTMLElement>(".js-portal-bg-orb").forEach((orb, i) => {
          gsap.to(orb, {
            y: i % 2 === 0 ? -18 : 16,
            x: i % 3 === 0 ? 12 : -10,
            opacity: 0.95,
            scale: 1.25,
            duration: 3.8 + i * 0.65,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.35,
          });
        });
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Base Royal Obsidian-Violet Vertical Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #07020d 0%, #110422 26%, #090214 55%, #120425 84%, #07020d 100%)",
        }}
      />

      {/* Ambient Neon Purple, Magenta & Champagne Gold Glow Clouds */}
      <div
        className="js-portal-bg-cloud absolute -top-[10%] left-[22%] h-[560px] w-[900px] rounded-full blur-[145px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217, 70, 239, 0.22) 0%, rgba(126, 34, 206, 0.14) 48%, transparent 74%)",
        }}
      />
      <div
        className="js-portal-bg-cloud absolute top-[18%] -right-[8%] h-[560px] w-[580px] rounded-full blur-[145px]"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 196, 81, 0.18) 0%, rgba(192, 38, 211, 0.14) 50%, transparent 75%)",
        }}
      />
      <div
        className="js-portal-bg-cloud absolute bottom-[4%] left-[14%] h-[520px] w-[620px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(107, 33, 168, 0.12) 52%, transparent 75%)",
        }}
      />

      {/* Sweeping Luminous Silk Ribbons matching HomepageBackground */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1600 1000"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="portal-ribbon-purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e024ff" stopOpacity="0" />
            <stop offset="28%" stopColor="#e024ff" stopOpacity="0.72" />
            <stop offset="56%" stopColor="#f5a6ff" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="portal-ribbon-gold" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#f5c451" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#d97706" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </linearGradient>
          <filter id="portal-glow-wide" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
          <filter id="portal-glow-crisp" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <path
          d="M -120 260 C 260 120, 680 150, 1080 280 C 1320 355, 1500 310, 1740 190"
          stroke="url(#portal-ribbon-purple)"
          strokeWidth="42"
          strokeLinecap="round"
          filter="url(#portal-glow-wide)"
          opacity="0.45"
        />
        <path
          d="M -120 260 C 260 120, 680 150, 1080 280 C 1320 355, 1500 310, 1740 190"
          stroke="#f7c8ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#portal-glow-crisp)"
          opacity="0.52"
        />

        <path
          d="M 1720 420 C 1420 580, 1080 650, 720 710 C 420 760, 180 840, -100 940"
          stroke="url(#portal-ribbon-gold)"
          strokeWidth="36"
          strokeLinecap="round"
          filter="url(#portal-glow-wide)"
          opacity="0.4"
        />
        <path
          d="M 1720 420 C 1420 580, 1080 650, 720 710 C 420 760, 180 840, -100 940"
          stroke="#fff6cc"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#portal-glow-crisp)"
          opacity="0.58"
        />
      </svg>

      {/* Subtle Floating Stardust Orbs */}
      {AMBIENT_ORBS.map((orb, idx) => (
        <span
          key={idx}
          className="js-portal-bg-orb absolute rounded-full opacity-45"
          style={{
            left: orb.left,
            top: orb.top,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: orb.color,
            boxShadow: `0 0 14px ${orb.color}`,
          }}
        />
      ))}

      {/* Soft Luxury Contrast Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 52%, rgba(4, 1, 10, 0.62) 100%)",
        }}
      />
    </div>
  );
}

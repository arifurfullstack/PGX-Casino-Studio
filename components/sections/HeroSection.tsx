"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const HERO_PARTICLES = [
  { left: "12%", top: "22%", size: 5, color: "rgba(255, 224, 130, 0.9)" },
  { left: "28%", top: "14%", size: 4, color: "rgba(232, 121, 249, 0.85)" },
  { left: "43%", top: "26%", size: 6, color: "rgba(255, 215, 94, 0.95)" },
  { left: "51%", top: "16%", size: 5, color: "rgba(255, 240, 180, 0.9)" },
  { left: "58%", top: "36%", size: 4, color: "rgba(245, 196, 81, 0.85)" },
  { left: "67%", top: "18%", size: 6, color: "rgba(255, 224, 130, 0.95)" },
  { left: "78%", top: "24%", size: 5, color: "rgba(232, 121, 249, 0.85)" },
  { left: "89%", top: "32%", size: 6, color: "rgba(255, 215, 94, 0.9)" },
  { left: "47%", top: "64%", size: 4, color: "rgba(255, 232, 150, 0.85)" },
  { left: "92%", top: "66%", size: 5, color: "rgba(217, 70, 239, 0.85)" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  /* Separated transform wrappers (Scroll vs Mouse Parallax vs Ambient Float/Hover) */
  const bgScrollRef = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const wingsParallaxRef = useRef<HTMLDivElement>(null);

  const modelScrollRef = useRef<HTMLDivElement>(null);
  const modelParallaxRef = useRef<HTMLDivElement>(null);
  const modelHoverRef = useRef<HTMLDivElement>(null);
  const modelHaloRef = useRef<HTMLDivElement>(null);
  const modelOrbitRef = useRef<SVGSVGElement>(null);

  const objectsScrollRef = useRef<HTMLDivElement>(null);
  const objectsParallaxRef = useRef<HTMLDivElement>(null);
  const objectsHoverRef = useRef<HTMLDivElement>(null);
  const objectsHaloRef = useRef<HTMLDivElement>(null);

  const headlineScrollRef = useRef<HTMLDivElement>(null);
  const headlineParallaxRef = useRef<HTMLDivElement>(null);
  const copyScrollRef = useRef<HTMLDivElement>(null);
  const ctaScrollRef = useRef<HTMLDivElement>(null);

  const stripScrollRef = useRef<HTMLDivElement>(null);
  const stripParallaxRef = useRef<HTMLDivElement>(null);
  const stripHighlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* =========================================================================
           1. CINEMATIC ABOVE-THE-FOLD LUXURY ENTRANCE TIMELINE
           ========================================================================= */
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (bgParallaxRef.current) {
          intro.fromTo(
            bgParallaxRef.current,
            { scale: 1.08, opacity: 0.75 },
            { scale: 1, opacity: 1, duration: 1.45, ease: "power2.out" },
            0
          );
        }

        if (headlineParallaxRef.current) {
          intro.from(
            headlineParallaxRef.current,
            { opacity: 0, y: 28, scale: 0.96, duration: 0.95 },
            0.08
          );
        }

        if (modelParallaxRef.current) {
          intro.from(
            modelParallaxRef.current,
            { opacity: 0, y: 42, x: 18, scale: 0.95, duration: 1.15 },
            0.16
          );
        }

        if (objectsParallaxRef.current) {
          intro.from(
            objectsParallaxRef.current,
            { opacity: 0, y: 50, x: 30, scale: 0.93, duration: 1.1 },
            0.26
          );
        }

        intro.from(
          ".js-hero-copy",
          { opacity: 0, y: 20, duration: 0.72, stagger: 0.1 },
          0.34
        );

        intro.from(
          ".js-hero-cta",
          {
            opacity: 0,
            y: 22,
            scale: 0.94,
            duration: 0.72,
            stagger: 0.11,
            ease: "back.out(1.45)",
          },
          0.46
        );

        if (stripParallaxRef.current) {
          intro.from(
            stripParallaxRef.current,
            { opacity: 0, y: 30, scale: 0.97, duration: 0.9 },
            0.55
          );
        }

        /* Mobile hero staggered entrance */
        intro.from(
          ".js-hero-mobile-stagger",
          { opacity: 0, y: 24, duration: 0.75, stagger: 0.08 },
          0.1
        );

        /* =========================================================================
           2. CONTINUOUS AMBIENT LUXURY MOTION GRAPHICS (SMOOTH BREATHING & GLOW)
           ========================================================================= */
        gsap.to(".js-hero-model-float", {
          y: -7,
          duration: 4.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(".js-hero-objects-float", {
          y: -9,
          rotation: 0.45,
          duration: 4.7,
          delay: 0.55,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        if (modelOrbitRef.current) {
          gsap.to(modelOrbitRef.current, {
            rotation: 360,
            duration: 54,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          });
        }

        gsap.utils.toArray<HTMLElement>(".js-hero-particle").forEach((dot, i) => {
          gsap.to(dot, {
            y: i % 2 === 0 ? -24 : -16,
            x: i % 3 === 0 ? 10 : -9,
            opacity: 0.22,
            scale: 1.5,
            duration: 2.9 + (i % 4) * 0.65,
            delay: i * 0.22,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        /* =========================================================================
           3. CINEMATIC SCROLL-LINKED DEPTH PARALLAX (ScrollTrigger scrub)
           ========================================================================= */
        const scrollCfg = {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        };

        if (bgScrollRef.current) {
          gsap.to(bgScrollRef.current, {
            yPercent: 14,
            scale: 1.07,
            ease: "none",
            scrollTrigger: scrollCfg,
          });
        }

        if (modelScrollRef.current) {
          gsap.to(modelScrollRef.current, {
            y: -48,
            scale: 1.03,
            ease: "none",
            scrollTrigger: scrollCfg,
          });
        }

        if (objectsScrollRef.current) {
          gsap.to(objectsScrollRef.current, {
            y: -86,
            x: 18,
            ease: "none",
            scrollTrigger: scrollCfg,
          });
        }

        if (headlineScrollRef.current) {
          gsap.to(headlineScrollRef.current, {
            y: -62,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: scrollCfg,
          });
        }

        if (copyScrollRef.current) {
          gsap.to(copyScrollRef.current, {
            y: -50,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: scrollCfg,
          });
        }

        if (ctaScrollRef.current) {
          gsap.to(ctaScrollRef.current, {
            y: -42,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: scrollCfg,
          });
        }

        if (stripScrollRef.current) {
          gsap.to(stripScrollRef.current, {
            y: -26,
            ease: "none",
            scrollTrigger: scrollCfg,
          });
        }

        /* =========================================================================
           4. SUBTLE 60FPS MULTI-LAYER 3D MOUSE PARALLAX & SPOTLIGHT (quickTo)
           ========================================================================= */
        const bgX = bgParallaxRef.current
          ? gsap.quickTo(bgParallaxRef.current, "x", { duration: 1.25, ease: "power3.out" })
          : null;
        const bgY = bgParallaxRef.current
          ? gsap.quickTo(bgParallaxRef.current, "y", { duration: 1.25, ease: "power3.out" })
          : null;

        const wingsX = wingsParallaxRef.current
          ? gsap.quickTo(wingsParallaxRef.current, "x", { duration: 1.3, ease: "power3.out" })
          : null;

        const modelX = modelParallaxRef.current
          ? gsap.quickTo(modelParallaxRef.current, "x", { duration: 1.0, ease: "power3.out" })
          : null;
        const modelY = modelParallaxRef.current
          ? gsap.quickTo(modelParallaxRef.current, "y", { duration: 1.0, ease: "power3.out" })
          : null;
        const modelRotY = modelParallaxRef.current
          ? gsap.quickTo(modelParallaxRef.current, "rotateY", { duration: 1.05, ease: "power3.out" })
          : null;

        const objX = objectsParallaxRef.current
          ? gsap.quickTo(objectsParallaxRef.current, "x", { duration: 0.9, ease: "power3.out" })
          : null;
        const objY = objectsParallaxRef.current
          ? gsap.quickTo(objectsParallaxRef.current, "y", { duration: 0.9, ease: "power3.out" })
          : null;
        const objRotY = objectsParallaxRef.current
          ? gsap.quickTo(objectsParallaxRef.current, "rotateY", { duration: 0.95, ease: "power3.out" })
          : null;

        const headX = headlineParallaxRef.current
          ? gsap.quickTo(headlineParallaxRef.current, "x", { duration: 1.05, ease: "power3.out" })
          : null;
        const headY = headlineParallaxRef.current
          ? gsap.quickTo(headlineParallaxRef.current, "y", { duration: 1.05, ease: "power3.out" })
          : null;

        const stripX = stripParallaxRef.current
          ? gsap.quickTo(stripParallaxRef.current, "x", { duration: 1.1, ease: "power3.out" })
          : null;

        const spotX = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "x", { duration: 0.75, ease: "power2.out" })
          : null;
        const spotY = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "y", { duration: 0.75, ease: "power2.out" })
          : null;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          bgX?.(relX * -7);
          bgY?.(relY * -4);
          wingsX?.(relX * -5);

          modelX?.(relX * 6);
          modelY?.(relY * 3.5);
          modelRotY?.(relX * 1.0);

          objX?.(relX * 10);
          objY?.(relY * 5);
          objRotY?.(relX * 1.4);

          headX?.(relX * 3.5);
          headY?.(relY * 2);
          stripX?.(relX * 2.5);

          if (spotX && spotY) {
            spotX(e.clientX - rect.left - 280);
            spotY(e.clientY - rect.top - 280);
          }
        };

        const handleMouseLeave = () => {
          bgX?.(0);
          bgY?.(0);
          wingsX?.(0);
          modelX?.(0);
          modelY?.(0);
          modelRotY?.(0);
          objX?.(0);
          objY?.(0);
          objRotY?.(0);
          headX?.(0);
          headY?.(0);
          stripX?.(0);
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          section.removeEventListener("mousemove", handleMouseMove);
          section.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* =========================================================================
     INTERACTIVE GSAP HOVER HANDLERS (Model, Casino Objects, Magnetic CTAs, Strip)
     ========================================================================= */
  const handleModelHover = (enter: boolean) => {
    if (modelHoverRef.current) {
      gsap.to(modelHoverRef.current, {
        scale: enter ? 1.028 : 1,
        y: enter ? -4 : 0,
        filter: enter
          ? "brightness(1.06) drop-shadow(0 14px 38px rgba(255, 215, 94, 0.28))"
          : "brightness(1) drop-shadow(0 10px 35px rgba(0, 0, 0, 0.85))",
        duration: enter ? 0.65 : 0.75,
        ease: "power3.out",
      });
    }
    if (modelHaloRef.current) {
      gsap.to(modelHaloRef.current, {
        opacity: enter ? 0.85 : 0.45,
        scale: enter ? 1.1 : 1,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  };

  const handleObjectsHover = (enter: boolean) => {
    if (objectsHoverRef.current) {
      gsap.to(objectsHoverRef.current, {
        scale: enter ? 1.024 : 1,
        y: enter ? -3 : 0,
        rotation: enter ? 0.35 : 0,
        filter: enter
          ? "brightness(1.05) drop-shadow(0 18px 44px rgba(224, 36, 255, 0.28))"
          : "brightness(1) drop-shadow(0 15px 40px rgba(0, 0, 0, 0.9))",
        duration: enter ? 0.6 : 0.75,
        ease: "power3.out",
      });
    }
    if (objectsHaloRef.current) {
      gsap.to(objectsHaloRef.current, {
        opacity: enter ? 0.8 : 0.4,
        scale: enter ? 1.1 : 1,
        duration: 0.65,
        ease: "power3.out",
      });
    }
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.09;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    gsap.to(el, {
      x: gsap.utils.clamp(-4, 4, x),
      y: gsap.utils.clamp(-3, 3, y),
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.42)",
      overwrite: "auto",
    });
  };

  const handleStripHover = (idx: number) => {
    if (!stripHighlightRef.current) return;
    gsap.to(stripHighlightRef.current, {
      opacity: 1,
      xPercent: idx * 100,
      duration: 0.42,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleStripLeave = () => {
    if (!stripHighlightRef.current) return;
    gsap.to(stripHighlightRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* =========================================================================
          FULL-BLEED HERO AMBIENT BACKDROP (fills entire viewport width on wide screens)
          Eliminates blank black side margins with matching royal purple/magenta/gold ribbons
          ========================================================================= */}
      <div
        ref={wingsParallaxRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 inset-y-0 z-0 overflow-hidden select-none will-change-transform"
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

      {/* Interactive Cursor-Tracking Champagne-Gold Atmospheric Spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute top-0 left-0 z-[15] h-[560px] w-[560px] rounded-full blur-[120px] opacity-20 mix-blend-screen will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 94, 0.34) 0%, rgba(224, 36, 255, 0.16) 46%, transparent 72%)",
        }}
      />

      {/* =========================================================================
          DESKTOP PIXEL-PERFECT STAGE (lg: and above)
          Matches 1672 x 941 reference image with 1:1 asset layering & GSAP 3D depth
          ========================================================================= */}
      <div
        ref={stageRef}
        className="hidden lg:block relative z-10 w-full max-w-[1672px] mx-auto aspect-[1672/941] select-none [perspective:1400px]"
      >
        {/* Layer 1: Opulent Grand Casino Ambient Background (Scroll + Mouse Parallax) */}
        <div
          ref={bgScrollRef}
          className="hero-stage-bg-feather absolute inset-0 z-0 pointer-events-none will-change-transform"
        >
          <div ref={bgParallaxRef} className="relative w-full h-full scale-[1.03] will-change-transform">
            <Image
              src="/images/royal-hero/royal-hero-bg.png"
              alt="Opulent Royal Casino Club Grand Chandelier Hall"
              fill
              priority
              sizes="1672px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Ambient Subtle Glow Accents & Floating GSAP Golden Stardust Particles */}
        <div className="absolute top-[25%] left-[2%] w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-[1] animate-royal-pulse" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none z-[1]" />
        <div className="absolute top-[20%] right-[25%] w-[350px] h-[350px] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none z-[1]" />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[12] overflow-hidden">
          {HERO_PARTICLES.map((p, idx) => (
            <span
              key={idx}
              className="js-hero-particle absolute rounded-full will-change-transform"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 3.2}px ${p.color}`,
              }}
            />
          ))}
        </div>

        {/* Layer 2: Female Model (Layered behind Casino Objects — Interactive GSAP Hover, Float, Mouse & Scroll Parallax) */}
        <div
          ref={modelScrollRef}
          className="absolute z-10 will-change-transform"
          style={{
            left: "45.2%",
            top: "13.4%",
            width: "31.2%",
            height: "69.0%",
          }}
        >
          <div
            ref={modelParallaxRef}
            onMouseEnter={() => handleModelHover(true)}
            onMouseLeave={() => handleModelHover(false)}
            className="relative w-full h-full cursor-pointer will-change-transform [transform-style:preserve-3d]"
          >
            {/* Delicate Rotating Champagne-Gold Art-Deco Halo Behind Model */}
            <svg
              ref={modelOrbitRef}
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="pointer-events-none absolute left-[46%] top-[32%] -translate-x-1/2 -translate-y-1/2 w-[92%] h-auto opacity-30"
            >
              <defs>
                <linearGradient id="hero-model-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#f5c451" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#e024ff" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <circle
                cx="200"
                cy="200"
                r="172"
                fill="none"
                stroke="url(#hero-model-ring)"
                strokeWidth="1.2"
                strokeDasharray="16 12 4 12"
              />
              <circle cx="200" cy="28" r="3.5" fill="#fff3b0" />
              <circle cx="372" cy="200" r="2.8" fill="#f5c451" />
            </svg>

            {/* Warm Chandelier Gold Backlight Aura that Blooms on Hover */}
            <div
              ref={modelHaloRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 top-[8%] bottom-[12%] rounded-full blur-[65px] opacity-45 will-change-transform"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 42%, rgba(255, 215, 94, 0.42) 0%, rgba(224, 36, 255, 0.24) 54%, transparent 78%)",
              }}
            />

            {/* Floating + Hover-Zooming Model PNG */}
            <div className="js-hero-model-float relative w-full h-full will-change-transform">
              <div ref={modelHoverRef} className="relative w-full h-full will-change-transform">
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
          </div>
        </div>

        {/* Layer 3: Casino Objects (Slot Machine 777, Roulette, Chips, Cards, Dice — Deeper Foreground Parallax + Hover Jackpot Glow) */}
        <div
          ref={objectsScrollRef}
          className="absolute z-20 will-change-transform"
          style={{
            left: "53.6%",
            top: "18.8%",
            width: "47.4%",
            height: "63.2%",
          }}
        >
          <div
            ref={objectsParallaxRef}
            onMouseEnter={() => handleObjectsHover(true)}
            onMouseLeave={() => handleObjectsHover(false)}
            className="relative w-full h-full cursor-pointer will-change-transform [transform-style:preserve-3d]"
          >
            {/* Jackpot Magenta & Gold Pedestal Aura on Hover */}
            <div
              ref={objectsHaloRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-[16%] bottom-[6%] rounded-full blur-[70px] opacity-40 will-change-transform"
              style={{
                background:
                  "radial-gradient(ellipse at 54% 58%, rgba(224, 36, 255, 0.36) 0%, rgba(255, 215, 94, 0.26) 52%, transparent 78%)",
              }}
            />

            <div className="js-hero-objects-float relative w-full h-full will-change-transform">
              <div ref={objectsHoverRef} className="relative w-full h-full will-change-transform">
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
          </div>
        </div>

        {/* Layer 4: Luxury Headline Asset (GSAP Entrance + Scroll Parallax + Masked Gold Glint Hover) */}
        <div
          ref={headlineScrollRef}
          className="absolute z-30 will-change-transform"
          style={{
            left: "2.0%",
            top: "6.5%",
            width: "45.0%",
            height: "60.0%",
          }}
        >
          <div
            ref={headlineParallaxRef}
            className="group/headline relative w-full h-full cursor-pointer will-change-transform"
          >
            {/* Soft ambient chandelier-gold aura behind headline that blooms on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-full opacity-45 blur-[48px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/headline:scale-110 group-hover/headline:opacity-95"
              style={{
                background:
                  "radial-gradient(ellipse at 42% 52%, rgba(255, 215, 94, 0.34) 0%, rgba(224, 36, 255, 0.18) 52%, transparent 76%)",
              }}
            />

            <div className="hero-headline-stage relative w-full h-full">
              <Image
                src="/images/royal-hero/royal-hero-headline.png"
                alt="Launch Your Own Premium Online Casino - Starting at $15,000"
                fill
                priority
                sizes="(max-width: 1672px) 45vw, 755px"
                className="hero-headline-img object-contain object-left"
              />
              {/* Pixel-masked champagne-gold light glint sweep (ambient + hover) */}
              <div className="hero-headline-mask-left" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Tagline & Subtitle Paragraph Description */}
        <div
          ref={copyScrollRef}
          className="absolute z-20 text-left will-change-transform"
          style={{
            left: "4.9%",
            top: "56.6%",
            width: "42.5%",
          }}
        >
          <p className="js-hero-copy text-[#ffd700] text-[clamp(11.5px,1.02vw,17px)] font-extrabold uppercase tracking-[0.045em] leading-snug mb-1.5 xl:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] [text-shadow:0_0_16px_rgba(255,215,0,0.35)]">
            WHITE-LABEL TURN KEY CASINO, NO LICENSE REQUIRED!
          </p>
          <p className="js-hero-copy text-gray-100 text-[clamp(12px,1.12vw,18.5px)] font-normal leading-[1.38] tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Choose Your Design, Launch with Casino Slots &amp; Game Tables,
            <br className="hidden sm:inline" />
            and Build Your Casino Brand with a Complete Platform Solution.
          </p>
        </div>

        {/* Dual Magnetic Luxury CTA Buttons */}
        <div
          ref={ctaScrollRef}
          className="absolute z-30 flex items-center gap-3 xl:gap-4 will-change-transform"
          style={{
            left: "4.9%",
            top: "68.2%",
          }}
        >
          {/* Primary Gold Pill: Browse Casino Designs -> */}
          <Link
            href="/designs"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="js-hero-cta group/cta btn-royal-gold shine px-5 xl:px-7 2xl:px-8 py-2.5 xl:py-3.5 text-[clamp(12.5px,1.02vw,16.5px)] font-black tracking-tight will-change-transform"
          >
            <span>Browse Casino Designs</span>
            <ArrowRight
              size={18}
              className="stroke-[3] transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Link>

          {/* Secondary Purple Neon Pill: Crown + Reserve A Casino */}
          <Link
            href="/select-design"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="js-hero-cta group/cta btn-royal-purple-neon px-5 xl:px-7 2xl:px-8 py-2.5 xl:py-3.5 text-[clamp(12.5px,1.02vw,16.5px)] font-extrabold tracking-wide will-change-transform"
          >
            <Crown
              size={20}
              className="fill-[#ffd700] text-[#ffd700] stroke-[1.5] transition-transform duration-300 group-hover/cta:scale-115 group-hover/cta:-rotate-6"
            />
            <span>Reserve A Casino</span>
          </Link>
        </div>

        {/* Layer 5: Bottom Features Strip (Pixel-Perfect Pill Bar + Gliding GSAP Spotlight Highlight) */}
        <div
          ref={stripScrollRef}
          className="absolute z-30 left-1/2 -translate-x-1/2 will-change-transform"
          style={{
            top: "78.2%",
            width: "94.5%",
            aspectRatio: "2132 / 220",
          }}
        >
          <div ref={stripParallaxRef} className="relative w-full h-full will-change-transform">
            <Image
              src="/images/royal-hero/royal-hero-strip-pill.png"
              alt="Royal Casino Club Features: Premium Casino Designs, Turnkey Setup, Casino Games Included, Add-On Modules, Scalable & Flexible, Professional Support"
              fill
              priority
              sizes="1580px"
              className="object-contain object-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
            />

            {/* Gliding GSAP Champagne-Gold Hover Spotlight across the 6 Feature Slots */}
            <div className="pointer-events-none absolute inset-[10%_1.8%] z-30 overflow-hidden rounded-full">
              <div
                ref={stripHighlightRef}
                className="h-full w-1/6 rounded-2xl opacity-0 will-change-transform"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(255, 224, 130, 0.22) 0%, rgba(224, 36, 255, 0.14) 55%, transparent 82%)",
                  boxShadow: "inset 0 0 18px rgba(255, 215, 94, 0.25)",
                }}
              />
            </div>

            {/* Interactive Clickable Hotspots mapped directly across the 6 features */}
            <div
              onMouseLeave={handleStripLeave}
              className="absolute inset-0 grid grid-cols-6 z-40"
            >
              {features.map((feat, idx) => (
                <Link
                  key={idx}
                  href={feat.href}
                  onMouseEnter={() => handleStripHover(idx)}
                  className="group relative h-full flex items-center justify-center rounded-2xl transition-all duration-300"
                  title={`${feat.title} ${feat.subtitle} - Click to learn more`}
                >
                  <span className="sr-only">
                    {feat.title} {feat.subtitle}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-9 bg-[#1a0a2a]/95 text-[#ffd700] text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-[#f5c451]/60 shadow-[0_6px_22px_rgba(0,0,0,0.65),0_0_18px_rgba(245,196,81,0.35)] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform translate-y-1.5 scale-95 group-hover:translate-y-0 group-hover:scale-100 whitespace-nowrap">
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
          Clean adaptation with identical assets, typography, and GSAP stagger
          ========================================================================= */}
      <div className="lg:hidden relative z-10 pt-[76px] sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Soft readability scrim over full-bleed hero backdrop on mobile/tablet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 inset-y-0 z-0 bg-gradient-to-b from-[#0a0214]/65 via-[#0a0214]/40 to-transparent"
        />

        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Headline Image Responsive Scale (trimmed vertical margin to offset PNG transparent padding) */}
          <div className="js-hero-mobile-stagger group/headline relative w-[108%] max-w-[460px] sm:max-w-[560px] md:max-w-[620px] aspect-[1448/1086] -mt-[8%] -mb-[10%] sm:-mt-[9%] sm:-mb-[10%] cursor-pointer">
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
                sizes="(max-width: 640px) 96vw, (max-width: 1024px) 620px, 620px"
                className="hero-headline-img object-contain object-center"
              />
              <div className="hero-headline-mask-center" aria-hidden="true" />
            </div>
          </div>

          {/* Tagline */}
          <p className="js-hero-mobile-stagger text-[#ffd700] text-[13px] sm:text-[15px] md:text-base font-extrabold uppercase tracking-[0.045em] leading-snug max-w-md sm:max-w-xl mt-2 mb-2 px-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] [text-shadow:0_0_16px_rgba(255,215,0,0.35)]">
            WHITE-LABEL TURN KEY CASINO, NO LICENSE REQUIRED!
          </p>

          {/* Subtitle */}
          <p className="js-hero-mobile-stagger text-gray-100/95 text-[13.5px] sm:text-[15px] md:text-base font-normal leading-relaxed max-w-md sm:max-w-xl mb-6 px-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Choose Your Design, Launch with Casino Slots &amp; Game Tables, and Build Your Casino Brand with a Complete Platform Solution.
          </p>

          {/* Dual CTAs Stacked on Mobile / Side-by-Side on sm+ */}
          <div className="js-hero-mobile-stagger flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-lg mb-7">
            <Link
              href="/designs"
              className="btn-royal-gold shine w-full sm:w-auto min-h-[48px] px-6 sm:px-7 py-3.5 text-sm sm:text-[15px] font-black text-center"
            >
              <span>Browse Casino Designs</span>
              <ArrowRight size={17} className="stroke-[3]" />
            </Link>

            <Link
              href="/select-design"
              className="btn-royal-purple-neon w-full sm:w-auto min-h-[48px] px-6 sm:px-7 py-3.5 text-sm sm:text-[15px] font-extrabold text-center"
            >
              <Crown size={18} className="fill-[#ffd700] text-[#ffd700] stroke-[1.5]" />
              <span>Reserve A Casino</span>
            </Link>
          </div>

          {/* Responsive Showcase Visual: Model + Casino Objects Composite */}
          <div className="js-hero-mobile-stagger relative w-full max-w-lg md:max-w-2xl aspect-[16/10] my-2 sm:my-4 overflow-hidden rounded-2xl border border-purple-700/35 bg-[#0d0322]/65 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.28)]">
            <Image
              src="/images/royal-hero/royal-hero-bg.png"
              alt="Casino stage background"
              fill
              sizes="(max-width: 640px) 94vw, 672px"
              className="object-cover opacity-60"
            />
            {/* Model */}
            <div className="js-hero-model-float absolute left-[4%] bottom-0 w-[48%] h-[94%]">
              <Image
                src="/images/royal-hero/royal-hero-model.png"
                alt="Casino Dealer Model"
                fill
                sizes="(max-width: 640px) 46vw, 320px"
                className="object-contain object-bottom"
              />
            </div>
            {/* Objects */}
            <div className="js-hero-objects-float absolute right-[0%] bottom-0 w-[64%] h-[90%]">
              <Image
                src="/images/royal-hero/royal-hero-objects.png"
                alt="Casino 777 Slot Machine & Roulette"
                fill
                sizes="(max-width: 640px) 62vw, 430px"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Responsive Features Grid (2 Columns on mobile, 3 on tablet) */}
          <div className="js-hero-mobile-stagger w-full mt-5 sm:mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <Link
                    key={idx}
                    href={feat.href}
                    className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#120329]/85 border border-purple-600/40 hover:border-[#ffd700]/70 hover:bg-purple-950/40 backdrop-blur-md transition-all duration-300 text-left shadow-[0_0_15px_rgba(168,85,247,0.15)] group"
                  >
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-950/90 border border-purple-500/40 text-[#FFD700] group-hover:scale-110 transition-transform">
                      <Icon size={16} className="stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11.5px] sm:text-xs font-bold text-white leading-tight truncate">
                        {feat.title}
                      </p>
                      <p className="text-[10.5px] sm:text-[11px] text-[#ffd700] leading-tight truncate font-semibold">
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

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Crown, Send, Sparkles, ArrowUpRight } from "lucide-react";

const FLOATING_ORBS = [
  { left: "6%", top: "14%", size: 6, color: "rgba(255, 224, 130, 0.9)", delay: 0 },
  { left: "19%", top: "78%", size: 5, color: "rgba(232, 121, 249, 0.85)", delay: 0.7 },
  { left: "34%", top: "10%", size: 7, color: "rgba(245, 196, 81, 0.85)", delay: 1.3 },
  { left: "48%", top: "86%", size: 5, color: "rgba(255, 236, 179, 0.9)", delay: 0.4 },
  { left: "58%", top: "16%", size: 6, color: "rgba(192, 132, 252, 0.85)", delay: 1.8 },
  { left: "88%", top: "24%", size: 7, color: "rgba(255, 215, 94, 0.95)", delay: 0.9 },
  { left: "94%", top: "68%", size: 5, color: "rgba(232, 121, 249, 0.85)", delay: 1.5 },
  { left: "76%", top: "90%", size: 6, color: "rgba(245, 196, 81, 0.85)", delay: 2.1 },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const modelWrapRef = useRef<HTMLDivElement>(null);
  const modelImgRef = useRef<HTMLDivElement>(null);
  const modelHaloRef = useRef<HTMLDivElement>(null);
  const orbitRingRef = useRef<SVGSVGElement>(null);
  const bottomPropsRef = useRef<HTMLDivElement>(null);
  const topRightPropsRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* 1. Full-bleed luxury chandelier backdrop scroll parallax */
        if (bgRef.current) {
          gsap.fromTo(
            bgRef.current,
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.03,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.15,
              },
            }
          );
        }

        /* 2. Scroll-triggered cinematic entrance timeline */
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        introTl
          .from(".js-contact-model-reveal", {
            opacity: 0,
            y: 52,
            scale: 0.93,
            duration: 1.05,
            ease: "power3.out",
          })
          .from(
            ".js-contact-stagger",
            {
              opacity: 0,
              y: 26,
              duration: 0.72,
              stagger: 0.09,
              ease: "power3.out",
            },
            "-=0.72"
          )
          .from(
            ".js-contact-props-reveal",
            {
              opacity: 0,
              y: 38,
              scale: 0.86,
              rotation: -5,
              duration: 0.9,
              stagger: 0.14,
              ease: "back.out(1.4)",
            },
            "-=0.55"
          )
          .from(
            ".js-contact-form-reveal",
            {
              opacity: 0,
              y: 44,
              scale: 0.96,
              duration: 0.95,
              ease: "power3.out",
            },
            "-=0.78"
          )
          .from(
            ".js-contact-field",
            {
              opacity: 0,
              y: 16,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.55"
          );

        /* 3. Scroll-scrubbed depth parallax on VIP model & floating luxury props */
        if (modelWrapRef.current) {
          gsap.fromTo(
            modelWrapRef.current,
            { y: 24 },
            {
              y: -24,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            }
          );
        }

        if (bottomPropsRef.current) {
          gsap.fromTo(
            bottomPropsRef.current,
            { y: 34, rotation: -3 },
            {
              y: -28,
              rotation: 3,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.95,
              },
            }
          );
        }

        if (topRightPropsRef.current) {
          gsap.fromTo(
            topRightPropsRef.current,
            { y: -22, rotation: 5 },
            {
              y: 26,
              rotation: -4,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.05,
              },
            }
          );
        }

        /* 4. Continuous ambient motion-graphics loops */
        if (modelImgRef.current) {
          gsap.to(modelImgRef.current, {
            y: -8,
            duration: 3.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        if (orbitRingRef.current) {
          gsap.to(orbitRingRef.current, {
            rotation: 360,
            duration: 46,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          });
        }

        gsap.to(".js-contact-prop-float-a", {
          y: -10,
          rotation: 2.2,
          duration: 3.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(".js-contact-prop-float-b", {
          y: -12,
          rotation: -2.8,
          duration: 3.5,
          delay: 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.utils.toArray<HTMLElement>(".js-contact-orb").forEach((orb, i) => {
          gsap.to(orb, {
            y: i % 2 === 0 ? -18 : 16,
            x: i % 3 === 0 ? 12 : -10,
            opacity: 0.28,
            scale: 1.45,
            duration: 2.8 + (i % 4) * 0.7,
            delay: i * 0.25,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        /* 5. Interactive 60fps multi-layer mouse parallax & spotlight */
        const bgX = bgRef.current
          ? gsap.quickTo(bgRef.current, "x", { duration: 0.9, ease: "power3.out" })
          : null;
        const modelX = modelImgRef.current
          ? gsap.quickTo(modelImgRef.current, "x", { duration: 0.65, ease: "power3.out" })
          : null;
        const bottomPropX = bottomPropsRef.current
          ? gsap.quickTo(bottomPropsRef.current, "x", { duration: 0.55, ease: "power3.out" })
          : null;
        const topPropX = topRightPropsRef.current
          ? gsap.quickTo(topRightPropsRef.current, "x", { duration: 0.55, ease: "power3.out" })
          : null;
        const spotX = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "x", { duration: 0.45, ease: "power2.out" })
          : null;
        const spotY = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "y", { duration: 0.45, ease: "power2.out" })
          : null;

        const handleSectionMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          bgX?.(relX * -22);
          modelX?.(relX * 18);
          bottomPropX?.(relX * 28);
          topPropX?.(relX * -24);

          if (spotX && spotY) {
            spotX(e.clientX - rect.left - 260);
            spotY(e.clientY - rect.top - 260);
          }

          if (modelHaloRef.current) {
            gsap.to(modelHaloRef.current, {
              x: relX * -14,
              y: relY * -12,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const handleSectionMouseLeave = () => {
          bgX?.(0);
          modelX?.(0);
          bottomPropX?.(0);
          topPropX?.(0);
        };

        section.addEventListener("mousemove", handleSectionMouseMove);
        section.addEventListener("mouseleave", handleSectionMouseLeave);

        return () => {
          section.removeEventListener("mousemove", handleSectionMouseMove);
          section.removeEventListener("mouseleave", handleSectionMouseLeave);
        };
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* Hover motion-graphics handlers */
  const handleModelEnter = () => {
    if (modelImgRef.current) {
      gsap.to(modelImgRef.current, {
        scale: 1.045,
        duration: 0.55,
        ease: "power3.out",
      });
    }
    if (modelHaloRef.current) {
      gsap.to(modelHaloRef.current, {
        opacity: 1,
        scale: 1.12,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  const handleModelLeave = () => {
    if (modelImgRef.current) {
      gsap.to(modelImgRef.current, {
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
      });
    }
    if (modelHaloRef.current) {
      gsap.to(modelHaloRef.current, {
        opacity: 0.78,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
      });
    }
  };

  const handlePropsHover = (target: HTMLElement | null, enter: boolean, dir = 1) => {
    if (!target) return;
    gsap.to(target, {
      scale: enter ? 1.09 : 1,
      rotation: enter ? 4 * dir : 0,
      duration: enter ? 0.45 : 0.6,
      ease: enter ? "back.out(1.7)" : "power3.out",
    });
  };

  const handleFormMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const card = formCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 4.5,
      rotateX: -y * 4.5,
      transformPerspective: 1100,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (topRightPropsRef.current) {
      gsap.to(topRightPropsRef.current, {
        scale: 1.07,
        y: -10,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  const handleFormMouseLeave = () => {
    if (formCardRef.current) {
      gsap.to(formCardRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (topRightPropsRef.current) {
      gsap.to(topRightPropsRef.current, {
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Royal Casino Club,
Name: ${name}
Phone/WhatsApp: ${phone}
Email: ${email || "N/A"}
Message: ${message || "I am interested in launching an online casino."}`;

    const url = `https://wa.me/14164770191?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-16 sm:py-24"
    >
      {/* =========================================================================
          LAYER 0: FULL-BLEED LUXURY VIP LOUNGE BACKDROP + GSAP MOTION GRAPHICS
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        {/* Parallax Chandelier & Velvet Lounge Backdrop */}
        <div ref={bgRef} className="absolute -inset-x-8 -inset-y-12 will-change-transform">
          <Image
            src="/images/contact-bg-luxury.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-55 saturate-115"
          />
        </div>

        {/* Seamless Vertical & Edge Vignette Integration into Royal Obsidian Canvas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #07020d 0%, rgba(12, 4, 24, 0.56) 18%, rgba(11, 3, 22, 0.48) 52%, rgba(12, 4, 24, 0.6) 82%, #07020d 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 35%, rgba(7, 2, 13, 0.72) 100%)",
          }}
        />

        {/* Ambient Royal Violet & Champagne-Gold Stage Clouds */}
        <div
          className="absolute -left-[6%] top-[12%] h-[520px] w-[520px] rounded-full blur-[130px] opacity-65"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 196, 81, 0.22) 0%, rgba(192, 38, 211, 0.22) 48%, transparent 76%)",
          }}
        />
        <div
          className="absolute -right-[6%] bottom-[8%] h-[540px] w-[540px] rounded-full blur-[135px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(245, 196, 81, 0.16) 52%, transparent 78%)",
          }}
        />

        {/* Interactive Cursor-Tracking Champagne-Gold Spotlight */}
        <div
          ref={spotlightRef}
          className="hidden lg:block absolute top-0 left-0 h-[520px] w-[520px] rounded-full blur-[95px] opacity-40 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 215, 94, 0.28) 0%, rgba(217, 70, 239, 0.16) 45%, transparent 72%)",
          }}
        />

        {/* Luxury Motion-Graphics SVG Silk Light Arcs */}
        <svg
          className="absolute inset-0 h-full w-full opacity-75"
          viewBox="0 0 1600 820"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="contact-gold-arc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5c451" stopOpacity="0" />
              <stop offset="28%" stopColor="#fff1b0" stopOpacity="0.6" />
              <stop offset="55%" stopColor="#f5c451" stopOpacity="0.45" />
              <stop offset="82%" stopColor="#d946ef" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="contact-purple-arc" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" stopOpacity="0" />
              <stop offset="35%" stopColor="#d946ef" stopOpacity="0.55" />
              <stop offset="68%" stopColor="#f5c451" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
            </linearGradient>
            <filter id="contact-arc-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          <path
            d="M -80 620 C 260 490, 560 540, 880 650 C 1180 750, 1400 680, 1680 540"
            stroke="url(#contact-gold-arc)"
            strokeWidth="16"
            strokeLinecap="round"
            filter="url(#contact-arc-glow)"
            opacity="0.48"
          />
          <path
            d="M -80 620 C 260 490, 560 540, 880 650 C 1180 750, 1400 680, 1680 540"
            stroke="url(#contact-gold-arc)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.72"
          />
          <path
            d="M 1660 150 C 1340 240, 1080 180, 760 120 C 440 60, 180 110, -80 230"
            stroke="url(#contact-purple-arc)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#contact-arc-glow)"
            opacity="0.4"
          />
          <path
            d="M 1660 150 C 1340 240, 1080 180, 760 120 C 440 60, 180 110, -80 230"
            stroke="url(#contact-purple-arc)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        {/* Animated Floating Gold & Amethyst Stardust Orbs */}
        {FLOATING_ORBS.map((orb, idx) => (
          <span
            key={idx}
            className="js-contact-orb absolute rounded-full"
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

      {/* =========================================================================
          MAIN FOREGROUND CONTENT: VIP MODEL + CONCIERGE INFO + 3D LUXURY FORM
          ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center xl:gap-10">
          {/* LEFT STAGE (7 cols): VIP Model Portrait + Get in Touch + Floating Luxury Props */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-6">
              {/* VIP Concierge Female Model Visual (fills top-left & left editorial space) */}
              <div
                ref={modelWrapRef}
                onMouseEnter={handleModelEnter}
                onMouseLeave={handleModelLeave}
                className="js-contact-model-reveal group/model relative mx-auto w-full max-w-[290px] sm:max-w-[330px] md:col-span-5 md:max-w-none cursor-pointer select-none"
              >
                <div className="relative mx-auto aspect-[896/1200] w-full max-w-[340px]">
                  {/* Rotating Art-Deco Champagne-Gold Orbital Halo */}
                  <svg
                    ref={orbitRingRef}
                    aria-hidden="true"
                    viewBox="0 0 360 360"
                    className="pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[108%] h-auto opacity-55"
                  >
                    <defs>
                      <linearGradient id="vip-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.9" />
                        <stop offset="45%" stopColor="#f5c451" stopOpacity="0.45" />
                        <stop offset="80%" stopColor="#d946ef" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#f5c451" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="180"
                      cy="180"
                      r="152"
                      fill="none"
                      stroke="url(#vip-ring-grad)"
                      strokeWidth="1.2"
                      strokeDasharray="14 10 3 10"
                    />
                    <circle
                      cx="180"
                      cy="180"
                      r="134"
                      fill="none"
                      stroke="url(#vip-ring-grad)"
                      strokeWidth="0.7"
                      opacity="0.5"
                    />
                    <circle cx="180" cy="28" r="3.5" fill="#fff3b0" />
                    <circle cx="332" cy="180" r="2.8" fill="#e879f9" />
                    <circle cx="66" cy="282" r="3" fill="#f5c451" />
                  </svg>

                  {/* Warm Golden Chandelier & Royal Magenta Backlight Aura */}
                  <div
                    ref={modelHaloRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-3 top-[10%] bottom-[14%] rounded-full blur-[54px] opacity-78 will-change-transform"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 42%, rgba(255, 215, 94, 0.34) 0%, rgba(217, 70, 239, 0.24) 52%, transparent 78%)",
                    }}
                  />

                  {/* Transparent VIP Model Portrait */}
                  <div
                    ref={modelImgRef}
                    className="relative h-full w-full will-change-transform"
                  >
                    <Image
                      src="/images/contact-model-vip.webp"
                      alt="Royal Casino Club VIP Concierge Hostess"
                      fill
                      sizes="(max-width: 768px) 320px, (max-width: 1280px) 280px, 340px"
                      className="object-contain object-bottom drop-shadow-[0_20px_42px_rgba(0,0,0,0.78)]"
                    />
                  </div>

                  {/* Subtle Champagne-Gold Floor Reflection Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-8 bottom-4 h-9 rounded-full blur-[22px] opacity-75"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(245, 196, 81, 0.38) 0%, rgba(192, 38, 211, 0.22) 55%, transparent 82%)",
                    }}
                  />

                  {/* Floating Luxury VIP Concierge Status Pill */}
                  <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f5c451]/55 bg-[#120424]/85 px-3.5 py-1.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.65),0_0_18px_rgba(245,196,81,0.22)] transition-all duration-300 group-hover/model:border-[#ffe28a] group-hover/model:shadow-[0_0_24px_rgba(245,196,81,0.45)]">
                    <span className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-[#ffe7a3]">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5c451] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffd75e]" />
                      </span>
                      VIP Concierge Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Contact Info + Bottom Luxury Casino Props Cluster */}
              <div className="md:col-span-7 flex flex-col">
                <div className="js-contact-stagger inline-flex w-fit items-center gap-2 rounded-full border border-[#f5c451]/40 bg-[#1a0730]/75 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffe28a] backdrop-blur-md shadow-[0_0_18px_rgba(245,196,81,0.16)]">
                  <Sparkles className="h-3.5 w-3.5 text-[#f5c451]" />
                  <span>Direct Operator Desk</span>
                </div>

                <h2 className="js-contact-stagger mt-3.5 text-[clamp(2rem,4vw,2.85rem)] font-bold uppercase italic leading-tight text-white font-philosopher drop-shadow-[0_4px_20px_rgba(0,0,0,0.75)]">
                  Get in <span className="gold-text">touch</span>
                </h2>

                <p className="js-contact-stagger mt-2.5 max-w-md text-sm sm:text-base leading-relaxed text-white/75">
                  Tell us which design you like and which modules you need. We reply directly on WhatsApp.
                </p>

                <ul className="mt-5 space-y-3 text-sm sm:text-base">
                  <li className="js-contact-stagger">
                    <a
                      href="mailto:contact@royalcasinoclub.com"
                      className="group/link flex items-center justify-between gap-3 rounded-2xl border border-purple-400/25 bg-[#16052a]/70 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:translate-x-1.5 hover:border-[#f5c451]/65 hover:bg-[#22093f]/80 hover:shadow-[0_0_24px_rgba(245,196,81,0.18)]"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#f5c451]/35 bg-[#2a0a4a]/90 text-[#f5c451] transition-transform duration-300 group-hover/link:scale-110">
                          <Mail className="h-4 w-4" />
                        </span>
                        <span className="truncate font-semibold text-white/95 group-hover/link:text-[#ffe28a] transition-colors">
                          contact@royalcasinoclub.com
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[#f5c451]" />
                    </a>
                  </li>

                  <li className="js-contact-stagger">
                    <a
                      href="https://wa.me/14164770191?text=Hi%20Royal%20Casino%20Club%2C%20I%27d%20like%20to%20know%20more."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between gap-3 rounded-2xl border border-purple-400/25 bg-[#16052a]/70 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:translate-x-1.5 hover:border-[#f5c451]/65 hover:bg-[#22093f]/80 hover:shadow-[0_0_24px_rgba(245,196,81,0.18)]"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#f5c451]/35 bg-[#2a0a4a]/90 text-[#f5c451] transition-transform duration-300 group-hover/link:scale-110">
                          <Phone className="h-4 w-4" />
                        </span>
                        <span className="truncate font-semibold text-white/95 group-hover/link:text-[#ffe28a] transition-colors">
                          +1 (416) 477-0191 (WhatsApp)
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[#f5c451]" />
                    </a>
                  </li>

                  <li className="js-contact-stagger">
                    <Link
                      href="/select-design"
                      className="group/link flex items-center justify-between gap-3 rounded-2xl border border-[#f5c451]/45 bg-gradient-to-r from-[#2c0d49]/85 via-[#21083a]/85 to-[#1b0630]/85 px-4 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(245,196,81,0.12)] transition-all duration-300 hover:translate-x-1.5 hover:border-[#ffe28a] hover:shadow-[0_0_28px_rgba(245,196,81,0.3)]"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#f5c451]/60 bg-[#3a165e] text-[#ffd75e] shadow-[0_0_12px_rgba(245,196,81,0.35)] transition-transform duration-300 group-hover/link:scale-110">
                          <Crown className="h-4 w-4 fill-[#ffd75e]" />
                        </span>
                        <span className="truncate font-bold text-[#ffd75e] group-hover/link:text-[#fff3b0] transition-colors">
                          Reserve A Casino ($1,000 USD Hold)
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#f5c451]/75 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[#fff3b0]" />
                    </Link>
                  </li>
                </ul>

                {/* Floating Luxury Casino Graphics Cluster (fills bottom-left blank space) */}
                <div
                  ref={bottomPropsRef}
                  onMouseEnter={(e) => handlePropsHover(e.currentTarget, true, 1)}
                  onMouseLeave={(e) => handlePropsHover(e.currentTarget, false, 1)}
                  className="js-contact-props-reveal relative mt-5 flex items-center justify-center sm:justify-start cursor-pointer select-none will-change-transform"
                >
                  <div className="js-contact-prop-float-a relative w-[240px] sm:w-[270px] aspect-[1200/896]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-4 rounded-full blur-[38px] opacity-75"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(245, 196, 81, 0.3) 0%, rgba(192, 38, 211, 0.26) 55%, transparent 80%)",
                      }}
                    />
                    <Image
                      src="/images/contact-luxury-props.webp"
                      alt="Luxury Gold Aces, Royal Crown, VIP Chips and Amethyst Dice"
                      fill
                      sizes="270px"
                      className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.82)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT STAGE (5 cols): Interactive 3D Luxury Form Card + Floating Top-Right Casino Graphic */}
          <div className="lg:col-span-5 relative">
            {/* Peeking Top-Right Floating Luxury Cards & Crown Chips (fills top-right blank space) */}
            <div
              ref={topRightPropsRef}
              onMouseEnter={(e) => handlePropsHover(e.currentTarget, true, -1)}
              onMouseLeave={(e) => handlePropsHover(e.currentTarget, false, -1)}
              className="js-contact-props-reveal hidden sm:block absolute -top-14 -right-5 xl:-right-10 z-20 w-[168px] lg:w-[185px] xl:w-[205px] aspect-[560/490] cursor-pointer select-none will-change-transform"
            >
              <div className="js-contact-prop-float-b relative h-full w-full">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-full blur-[32px] opacity-80"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(217, 70, 239, 0.4) 0%, rgba(245, 196, 81, 0.26) 55%, transparent 80%)",
                  }}
                />
                <Image
                  src="/images/cards-chips.png"
                  alt="Royal Casino Aces, Crown Chips and Dice"
                  fill
                  sizes="205px"
                  className="object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.85)]"
                />
              </div>
            </div>

            {/* Ambient Neon Glow Cushion Behind Form */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] blur-[44px] opacity-55"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 25%, rgba(245, 196, 81, 0.22) 0%, rgba(168, 85, 247, 0.28) 50%, transparent 78%)",
              }}
            />

            {/* Interactive 3D Glassmorphic WhatsApp Concierge Form */}
            <form
              ref={formCardRef}
              onSubmit={handleSubmit}
              onMouseMove={handleFormMouseMove}
              onMouseLeave={handleFormMouseLeave}
              className="js-contact-form-reveal card panel-interactive relative z-10 grid gap-4 rounded-[2rem] border border-[#d696ff]/45 p-6 sm:p-8 backdrop-blur-xl will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 28px 65px -20px rgba(0, 0, 0, 0.9), 0 0 32px rgba(168, 60, 255, 0.28), inset 0 1px 0 rgba(255, 243, 196, 0.22)",
              }}
            >
              {/* Delicate Champagne-Gold Top Rim Accent */}
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

              <div className="js-contact-field relative">
                <h3 className="text-2xl sm:text-[1.7rem] font-bold text-white font-philosopher">
                  Send us a <span className="gold-text">message</span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-white/60">
                  Instant priority response from our VIP launch team.
                </p>
              </div>

              <label className="js-contact-field relative grid gap-1.5 text-sm font-semibold text-white/90">
                <span>Your name</span>
                <input
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input font-normal text-white placeholder:text-white/40"
                />
              </label>

              <label className="js-contact-field relative grid gap-1.5 text-sm font-semibold text-white/90">
                <span>Phone / WhatsApp</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (416) 555-0123"
                  className="input font-normal text-white placeholder:text-white/40"
                />
              </label>

              <label className="js-contact-field relative grid gap-1.5 text-sm font-semibold text-white/90">
                <span>
                  Email <span className="font-normal text-white/50">(optional)</span>
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="input font-normal text-white placeholder:text-white/40"
                />
              </label>

              <label className="js-contact-field relative grid gap-1.5 text-sm font-semibold text-white/90">
                <span>How can we help?</span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your casino goals..."
                  className="input font-normal text-white placeholder:text-white/40"
                />
              </label>

              <button
                type="submit"
                className="js-contact-field btn btn-primary shine relative mt-2 text-base font-bold shadow-lg"
              >
                <Send className="h-4 w-4" />
                <span>Send on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Sparkles, Dices, Monitor, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    tag: "Rapid Launch",
    title: "Fast Setup",
    desc: "Get online quickly and start operating.",
  },
  {
    icon: Sparkles,
    tag: "White-Label",
    title: "Your Brand",
    desc: "Fully tailored with your name, colors, and identity.",
  },
  {
    icon: Dices,
    tag: "Top Providers",
    title: "Proven Games",
    desc: "High-performing slots and popular table games.",
  },
  {
    icon: Monitor,
    tag: "Responsive UI",
    title: "Multi-Device",
    desc: "Optimized for desktop, mobile and tablet.",
  },
  {
    icon: Globe,
    tag: "Multi-Currency",
    title: "Global Ready",
    desc: "Support for multiple currencies and regions.",
  },
  {
    icon: Headphones,
    tag: "24/7 VIP Desk",
    title: "Ongoing Support",
    desc: "Technical assistance and platform updates.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });

        tl.from(".js-feat-heading", {
          opacity: 0,
          y: 26,
          duration: 0.75,
          ease: "power3.out",
        }).from(
          ".js-feat-card",
          {
            opacity: 0,
            y: 34,
            scale: 0.95,
            duration: 0.75,
            stagger: { each: 0.08, from: "start" },
            ease: "power3.out",
          },
          "-=0.45"
        );
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* Calm, Executive Specular Velvet Spotlight + Subtle 3D Tilt on Card Hover */
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = x / rect.width - 0.5;
    const relY = y / rect.height - 0.5;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    gsap.to(card, {
      y: -6,
      rotateY: relX * 3.4,
      rotateX: -relY * 3.0,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section ref={sectionRef} className="py-10 sm:py-16 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="js-feat-heading text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              Features &amp; <span className="gold-text">benefits</span>
            </span>
          </h2>
        </div>

        <div className="mt-9 lg:mt-11 grid gap-5 lg:gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                className="js-feat-card group panel panel-interactive relative overflow-hidden cursor-pointer p-6 lg:p-8 xl:p-9 text-center will-change-transform"
                style={{
                  ["--mx" as string]: "50%",
                  ["--my" as string]: "30%",
                }}
              >
                {/* Cursor-Tracking Specular Champagne-Gold Interior Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(280px circle at var(--mx) var(--my), rgba(255, 224, 130, 0.16), rgba(217, 70, 239, 0.09) 46%, transparent 74%)",
                  }}
                />

                <div className="panel-sheen" aria-hidden="true" />
                <div className="panel-rim" aria-hidden="true" />

                {/* Subtle Luxury Index Numeral in Top-Right Corner */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-4 right-5 font-philosopher text-xs font-bold tracking-[0.2em] text-[#f5c451]/35 transition-colors duration-400 group-hover:text-[#ffe28a]/85"
                >
                  0{idx + 1}
                </span>

                {/* Icon Medallion with Soft Ambient Gold Halo */}
                <div className="relative mx-auto w-fit">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 rounded-full blur-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-90"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255, 215, 94, 0.35) 0%, rgba(217, 70, 239, 0.2) 55%, transparent 80%)",
                    }}
                  />
                  <span className="relative mx-auto grid h-13 w-13 lg:h-15 lg:w-15 place-items-center rounded-2xl border border-[#d58cff]/85 bg-[#2a0a4a]/95 shadow-[0_0_16px_rgba(190,90,255,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-108 group-hover:border-[#f5ce6e] group-hover:bg-[#38105d] group-hover:shadow-[0_0_26px_rgba(245,196,81,0.55),inset_0_0_14px_rgba(245,196,81,0.24)]">
                    <Icon className="gold-icon h-6 w-6 lg:h-7 lg:w-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
                  </span>
                </div>

                {/* Delicate Luxury Category Tag */}
                <p className="relative mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5c451]/70 transition-colors duration-300 group-hover:text-[#ffe28a]">
                  {feat.tag}
                </p>

                <h3 className="relative mt-1.5 text-xl lg:text-2xl font-bold text-white font-philosopher transition-colors duration-500 ease-out group-hover:text-[#ffe28a]">
                  {feat.title}
                </h3>

                {/* Signature Expanding Champagne-Gold Accent Line */}
                <div
                  aria-hidden="true"
                  className="relative mx-auto mt-2.5 h-[1.5px] w-8 rounded-full opacity-45 transition-all duration-500 group-hover:w-16 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #ffd75e, transparent)",
                  }}
                />

                <p className="relative mt-3 text-sm lg:text-base text-white/70 transition-colors duration-500 ease-out group-hover:text-white/95">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Layers, Send, ChevronsRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "1. Choose a Design",
    desc: "Pick from our premium casino looks.",
    icon: Monitor,
  },
  {
    num: "02",
    title: "2. Customize Your Package",
    desc: "Start with the $15,000 package and add optional modules.",
    icon: Layers,
  },
  {
    num: "03",
    title: "3. Reserve & Launch",
    desc: "Reserve your casino, we set it up, brand it, and get you live!",
    icon: Send,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* 1. Sequential Left-to-Right Luxury Launch Journey Reveal */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });

        tl.fromTo(
          ".js-hiw-heading",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }
        )
          .fromTo(
            ".js-hiw-step",
            { opacity: 0, y: 34, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.14,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            "-=0.4"
          )
          .fromTo(
            ".js-hiw-chevron",
            { opacity: 0, scale: 0.8 },
            {
              opacity: 0.85,
              scale: 1,
              duration: 0.45,
              stagger: 0.15,
              ease: "back.out(1.6)",
              clearProps: "transform,opacity",
            },
            "-=0.55"
          );

        /* 2. Flowing Champagne-Gold Pulse Across the Connector Chevrons (desktop only) */
        if (window.innerWidth >= 1024) {
          gsap.to(".js-hiw-chevron", {
            x: 6,
            opacity: 1,
            duration: 1.3,
            stagger: { each: 0.35, repeat: -1, yoyo: true },
            ease: "sine.inOut",
          });

          /* 3. Subtle Floating Motion on the Step Medallion Icons (desktop only) */
          gsap.to(".js-hiw-icon", {
            y: -4,
            duration: 2.8,
            stagger: { each: 0.45, repeat: -1, yoyo: true },
            ease: "sine.inOut",
          });
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* Calm, Luxury Specular Spotlight + Gentle 3D Hover Tilt per Step Card (desktop pointer only) */
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
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
      rotateY: relX * 3.2,
      rotateX: -relY * 2.8,
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
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-12 sm:py-16 relative z-10"
    >
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="js-hiw-heading text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              <span className="gold-text">How it works</span>
            </span>
          </h2>
        </div>

        <div className="mt-8 lg:mt-14 grid items-stretch gap-x-4 xl:gap-x-6 gap-y-3 sm:gap-y-4 lg:gap-y-12 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:px-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="contents">
                <div
                  onMouseMove={handleCardMove}
                  onMouseLeave={handleCardLeave}
                  className="js-hiw-step group h-full cursor-pointer will-change-transform"
                  style={{
                    ["--mx" as string]: "50%",
                    ["--my" as string]: "30%",
                  }}
                >
                  <div className="panel panel-interactive relative h-full !rounded-2xl lg:-skew-x-[10deg]">
                    {/* Specular Mouse-Tracking Champagne-Gold Glass Sheen */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(280px circle at var(--mx) var(--my), rgba(255, 224, 130, 0.16), rgba(217, 70, 239, 0.08) 45%, transparent 72%)",
                      }}
                    />

                    <div className="panel-sheen" aria-hidden="true" />
                    <div className="panel-rim" aria-hidden="true" />

                    {/* Etched Watermark Step Numeral Inside Card */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 bottom-2 lg:right-5 lg:bottom-1.5 font-philosopher text-[3.5rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.2rem] font-bold italic leading-none text-[#f5c451]/[0.06] transition-all duration-500 group-hover:text-[#f5c451]/[0.14] lg:skew-x-[10deg] select-none"
                    >
                      {step.num}
                    </span>

                    <div className="relative flex items-center gap-4 p-5 sm:p-6 text-left lg:block lg:px-6 lg:pb-8 lg:pt-11 xl:px-10 xl:pb-10 xl:pt-13 lg:text-center lg:skew-x-[10deg]">
                      {/* Luxury Icon Medallion (Inline Left on Mobile, Floating Top Center on Desktop) */}
                      <span className="js-hiw-icon relative shrink-0 lg:absolute lg:-top-7 xl:-top-8 lg:left-1/2 grid h-12 w-12 sm:h-14 sm:w-14 xl:h-16 xl:w-16 lg:-translate-x-1/2 place-items-center rounded-full border border-[#d58cff]/90 bg-[#2a0a4a] shadow-[0_0_22px_rgba(190,90,255,0.55)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:border-[#f5ce6e] group-hover:bg-[#38105d] group-hover:shadow-[0_0_30px_rgba(245,196,81,0.6),inset_0_0_16px_rgba(245,196,81,0.28)]">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-1.5 rounded-full border border-[#f5c451]/0 transition-all duration-500 group-hover:border-[#f5c451]/45 group-hover:scale-105"
                        />
                        <Icon className="gold-icon h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5c451]/75 transition-colors duration-300 group-hover:text-[#ffe28a]">
                          Step {step.num}
                        </span>

                        <h3 className="gold-text mt-0.5 lg:mt-1 font-philosopher text-[1.25rem] sm:text-[1.4rem] lg:text-[clamp(1.35rem,2vw,1.75rem)] font-bold italic leading-tight transition-all duration-500 group-hover:brightness-115">
                          {step.title}
                        </h3>

                        <p className="mt-1.5 lg:mx-auto lg:mt-2.5 max-w-[300px] xl:max-w-[340px] leading-snug text-white/80 text-sm sm:text-base xl:text-lg transition-colors duration-500 group-hover:text-white/95">
                          {step.desc}
                        </p>

                        {/* Expanding Champagne-Gold Signature Accent Line */}
                        <div
                          aria-hidden="true"
                          className="mt-3 lg:mx-auto lg:mt-4 h-[1.5px] w-10 rounded-full opacity-55 transition-all duration-500 group-hover:w-20 group-hover:opacity-100"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, #ffd75e, transparent)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center">
                    <ChevronsRight
                      aria-hidden="true"
                      className="js-hiw-chevron gold-icon h-6 w-6 rotate-90 lg:rotate-0 lg:h-9 lg:w-9 xl:h-11 xl:w-11 opacity-75 will-change-transform"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

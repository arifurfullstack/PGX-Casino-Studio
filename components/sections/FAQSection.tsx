"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqs = [
  {
    q: "How much does it cost to launch a casino?",
    a: "The Starter Package is $15,000 USD. It includes your selected casino design, online casino slots, casino game tables and your casino branding (logo, colors and domain setup).",
  },
  {
    q: "What is included in the Starter Package?",
    a: "Your selected casino design, online casino slots, casino game tables (e.g. Blackjack, Roulette, Baccarat) and your casino branding: logo, colors and domain setup.",
  },
  {
    q: "Which add-on modules are available?",
    a: "Live Dealer Tables, Sportsbook, Poker Platform and Sweepstakes. They are optional and quoted separately, so message us with the ones you want.",
  },
  {
    q: "How do I reserve a casino?",
    a: "Choose a design and message us on WhatsApp. A $1,000 hold reserves your casino, then we set it up, brand it and get you live.",
  },
  {
    q: "Can I see a design before I choose?",
    a: 'Yes. Tap "View Demo" on any design and we will send you its live demo on WhatsApp.',
  },
  {
    q: "Will the casino carry my own brand?",
    a: "Yes. It launches with your name, logo, colors and your own domain.",
  },
  {
    q: "What is the GGR split?",
    a: "Platform gets 25%, 75% Profit is yours!",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftModelRef = useRef<HTMLDivElement>(null);
  const rightModelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* Scroll-triggered entrance for heading, accordion items, and flanking VIP models */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });

        tl.from(".js-faq-heading", {
          opacity: 0,
          y: 26,
          duration: 0.75,
          ease: "power3.out",
        })
          .from(
            ".js-faq-item",
            {
              opacity: 0,
              y: 20,
              duration: 0.55,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.45"
          )
          .from(
            ".js-faq-wing-left",
            {
              opacity: 0,
              x: -44,
              scale: 0.94,
              duration: 0.95,
              ease: "power3.out",
            },
            "-=0.65"
          )
          .from(
            ".js-faq-wing-right",
            {
              opacity: 0,
              x: 44,
              scale: 0.94,
              duration: 0.95,
              ease: "power3.out",
            },
            "-=0.85"
          );

        /* Scroll-scrubbed gentle parallax drift on both flanking portraits */
        if (leftModelRef.current) {
          gsap.fromTo(
            leftModelRef.current,
            { y: 26 },
            {
              y: -26,
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

        if (rightModelRef.current) {
          gsap.fromTo(
            rightModelRef.current,
            { y: -22 },
            {
              y: 28,
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

        /* Smooth 60fps mouse parallax on left & right VIP models */
        const leftX = leftModelRef.current
          ? gsap.quickTo(leftModelRef.current, "x", { duration: 0.7, ease: "power3.out" })
          : null;
        const rightX = rightModelRef.current
          ? gsap.quickTo(rightModelRef.current, "x", { duration: 0.7, ease: "power3.out" })
          : null;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          leftX?.(relX * 20);
          rightX?.(relX * -20);
        };

        const handleMouseLeave = () => {
          leftX?.(0);
          rightX?.(0);
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

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-12 sm:py-16 lg:py-20"
    >
      {/* Subtle Ambient Gold & Royal Violet Stage Glow across the FAQ Wings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <div
          className="hidden lg:block absolute left-[4%] top-1/2 -translate-y-1/2 h-[480px] w-[420px] rounded-full blur-[120px] opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 196, 81, 0.2) 0%, rgba(192, 38, 211, 0.22) 48%, transparent 76%)",
          }}
        />
        <div
          className="hidden lg:block absolute right-[4%] top-1/2 -translate-y-1/2 h-[480px] w-[420px] rounded-full blur-[120px] opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 196, 81, 0.2) 0%, rgba(168, 85, 247, 0.24) 48%, transparent 76%)",
          }}
        />
      </div>

      {/* 3-Column Editorial Layout on Desktop (Left Model | Center FAQ | Right Model) */}
      <div className="relative z-10 mx-auto max-w-[1580px] px-4 sm:px-6 lg:px-6 xl:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(220px,1fr)_minmax(540px,730px)_minmax(220px,1fr)] xl:gap-8">
          {/* LEFT LUXURY MODEL WING */}
          <div
            ref={leftModelRef}
            aria-hidden="true"
            className="js-faq-wing-left hidden lg:flex relative items-center justify-center self-center select-none will-change-transform"
          >
            <div className="faq-model-float-left group/left relative w-full max-w-[300px] xl:max-w-[375px] 2xl:max-w-[410px] aspect-[896/1200] transition-transform duration-500 hover:scale-[1.035]">
              {/* Warm Champagne-Gold & Magenta Backlight Halo */}
              <div
                className="pointer-events-none absolute inset-x-6 top-[12%] bottom-[16%] rounded-full blur-[55px] opacity-80 transition-opacity duration-500 group-hover/left:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at 52% 42%, rgba(255, 215, 94, 0.26) 0%, rgba(217, 70, 239, 0.22) 52%, transparent 78%)",
                }}
              />

              {/* Subtle Vertical Champagne-Gold Luxury Rim Accent */}
              <div
                className="pointer-events-none absolute left-[14%] top-[14%] bottom-[18%] w-px opacity-35"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(245, 196, 81, 0.85) 35%, rgba(217, 70, 239, 0.65) 70%, transparent 100%)",
                }}
              />

              {/* Transparent Feathered Editorial Portrait */}
              <div className="relative h-full w-full">
                <Image
                  src="/images/faq-model-left.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1280px) 280px, (max-width: 1536px) 375px, 410px"
                  className="object-contain object-bottom drop-shadow-[0_18px_38px_rgba(0,0,0,0.72)]"
                />
              </div>

              {/* Subtle Floor Gold Shimmer Under Portrait */}
              <div
                className="pointer-events-none absolute inset-x-10 bottom-3 h-8 rounded-full blur-[22px] opacity-65"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(245, 196, 81, 0.32) 0%, rgba(168, 85, 247, 0.2) 55%, transparent 80%)",
                }}
              />
            </div>
          </div>

          {/* CENTER FAQ ACCORDION COLUMN */}
          <div className="mx-auto w-full max-w-3xl">
            <div className="js-faq-heading text-center">
              <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
                <span>
                  Questions, <span className="gold-text">answered</span>
                </span>
              </h2>
            </div>

            <div className="mt-7 space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="js-faq-item panel panel-interactive group !rounded-xl px-5 py-1 transition-all duration-200"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-semibold text-white [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <span className="text-2xl leading-none text-[#f5c451] transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-4 text-white/75 text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* RIGHT LUXURY MODEL WING */}
          <div
            ref={rightModelRef}
            aria-hidden="true"
            className="js-faq-wing-right hidden lg:flex relative items-center justify-center self-center select-none will-change-transform"
          >
            <div className="faq-model-float-right group/right relative w-full max-w-[300px] xl:max-w-[375px] 2xl:max-w-[410px] aspect-[896/1200] transition-transform duration-500 hover:scale-[1.035]">
              {/* Warm Champagne-Gold & Royal Purple Backlight Halo */}
              <div
                className="pointer-events-none absolute inset-x-6 top-[12%] bottom-[16%] rounded-full blur-[55px] opacity-80 transition-opacity duration-500 group-hover/right:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at 48% 42%, rgba(255, 215, 94, 0.26) 0%, rgba(168, 85, 247, 0.24) 52%, transparent 78%)",
                }}
              />

              {/* Subtle Vertical Champagne-Gold Luxury Rim Accent */}
              <div
                className="pointer-events-none absolute right-[14%] top-[14%] bottom-[18%] w-px opacity-35"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(245, 196, 81, 0.85) 35%, rgba(168, 85, 247, 0.65) 70%, transparent 100%)",
                }}
              />

              {/* Transparent Feathered Editorial Portrait */}
              <div className="relative h-full w-full">
                <Image
                  src="/images/faq-model-right.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1280px) 280px, (max-width: 1536px) 375px, 410px"
                  className="object-contain object-bottom drop-shadow-[0_18px_38px_rgba(0,0,0,0.72)]"
                />
              </div>

              {/* Subtle Floor Gold Shimmer Under Portrait */}
              <div
                className="pointer-events-none absolute inset-x-10 bottom-3 h-8 rounded-full blur-[22px] opacity-65"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(245, 196, 81, 0.32) 0%, rgba(217, 70, 239, 0.2) 55%, transparent 80%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

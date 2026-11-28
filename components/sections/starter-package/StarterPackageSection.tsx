"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Video, Trophy, Spade, Gift, Crown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StarterPackageSection() {
  const t = useTranslations("home.starterPackage");
  const tCommon = useTranslations("common");

  const includedItems = [
    { title: t("included.designTitle"), detail: null },
    { title: t("included.slotsTitle"), detail: null },
    { title: t("included.tablesTitle"), detail: t("included.tablesDetail") },
    { title: t("included.brandingTitle"), detail: t("included.brandingDetail") },
  ];

  const addonModules = [
    { name: t("addons.liveDealer"), icon: Video, query: "Live Dealer Tables" },
    { name: t("addons.poker"), icon: Spade, query: "Poker Platform" },
    { name: t("addons.sportsbook"), icon: Trophy, query: "Sportsbook" },
    { name: t("addons.sweepstakes"), icon: Gift, query: "Sweepstakes & Social" },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const vaultRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const crownScrollRef = useRef<HTMLDivElement>(null);
  const crownFloatRef = useRef<HTMLDivElement>(null);
  const crownHaloRef = useRef<HTMLDivElement>(null);
  const crownRingRef = useRef<SVGSVGElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);

  const getWhatsAppLink = (moduleName: string) =>
    `https://wa.me/14164770191?text=${encodeURIComponent(
      `Hi Royal Casino Club, I'd like to add the ${moduleName} module to my casino.`
    )}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* 1. Cinematic Vault Scroll Entrance (fromTo + clearProps prevents CSS transition opacity lock) */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            once: true,
          },
        });

        tl.fromTo(
          ".js-sp-vault",
          { opacity: 0, y: 32, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out", clearProps: "opacity" }
        )
          .fromTo(
            ".js-sp-crown",
            { opacity: 0, scale: 0.88, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.4)",
              clearProps: "opacity",
            },
            "-=0.55"
          )
          .fromTo(
            ".js-sp-col1",
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            "-=0.55"
          )
          .fromTo(
            ".js-sp-check",
            { opacity: 0, x: -14 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.07,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            "-=0.45"
          )
          .fromTo(
            ".js-sp-addon",
            { opacity: 0, y: 18, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.07,
              ease: "back.out(1.35)",
              clearProps: "transform,opacity",
            },
            "-=0.45"
          );

        /* Smooth luxury price counter roll-up ($0 -> $15,000) */
        if (priceRef.current) {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: 15000,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
            onUpdate: () => {
              if (priceRef.current) {
                priceRef.current.textContent = `$${Math.round(counter.value).toLocaleString("en-US")}`;
              }
            },
          });
        }

        /* 2. Continuous Ambient Crown Motion & Rotating Gold Halo */
        if (crownFloatRef.current) {
          gsap.to(crownFloatRef.current, {
            y: -7,
            duration: 3.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        if (crownRingRef.current) {
          gsap.to(crownRingRef.current, {
            rotation: 360,
            duration: 42,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          });
        }

        /* 3. Subtle Scroll Depth Parallax on the Royal Crown */
        if (crownScrollRef.current) {
          gsap.fromTo(
            crownScrollRef.current,
            { y: 14 },
            {
              y: -14,
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

        /* 4. Silky Calm Mouse Spotlight & Whisper-Subtle 3D Tilt on the Vault */
        const vault = vaultRef.current;
        if (vault) {
          const spotX = spotlightRef.current
            ? gsap.quickTo(spotlightRef.current, "x", { duration: 0.65, ease: "power2.out" })
            : null;
          const spotY = spotlightRef.current
            ? gsap.quickTo(spotlightRef.current, "y", { duration: 0.65, ease: "power2.out" })
            : null;
          const rotX = gsap.quickTo(vault, "rotateX", { duration: 0.9, ease: "power3.out" });
          const rotY = gsap.quickTo(vault, "rotateY", { duration: 0.9, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const rect = vault.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            rotY(relX * 2.2);
            rotX(-relY * 2.0);
            spotX?.(e.clientX - rect.left - 240);
            spotY?.(e.clientY - rect.top - 240);
          };

          const onEnter = () => {
            if (spotlightRef.current) {
              gsap.to(spotlightRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
            }
          };

          const onLeave = () => {
            rotX(0);
            rotY(0);
            if (spotlightRef.current) {
              gsap.to(spotlightRef.current, { opacity: 0, duration: 0.55, ease: "power2.out" });
            }
          };

          vault.addEventListener("mousemove", onMove);
          vault.addEventListener("mouseenter", onEnter);
          vault.addEventListener("mouseleave", onLeave);

          return () => {
            vault.removeEventListener("mousemove", onMove);
            vault.removeEventListener("mouseenter", onEnter);
            vault.removeEventListener("mouseleave", onLeave);
          };
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const handleCrownHover = (enter: boolean) => {
    if (crownFloatRef.current) {
      gsap.to(crownFloatRef.current, {
        scale: enter ? 1.07 : 1,
        duration: 0.55,
        ease: "power3.out",
      });
    }
    if (crownHaloRef.current) {
      gsap.to(crownHaloRef.current, {
        opacity: enter ? 1 : 0.65,
        scale: enter ? 1.18 : 1,
        duration: 0.55,
        ease: "power3.out",
      });
    }
  };

  const handleAddonHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    gsap.to(e.currentTarget, {
      y: enter ? -5 : 0,
      scale: enter ? 1.03 : 1,
      duration: enter ? 0.42 : 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="pt-5 pb-10 sm:pt-6 sm:pb-14 relative z-20 [perspective:1400px]"
    >
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        {/* Minimal Luxury Ornamental Crest Divider bridging Hero & Starter Vault */}
        <div
          aria-hidden="true"
          className="mb-5 sm:mb-6 flex items-center justify-center gap-2.5 sm:gap-5 select-none"
        >
          <span className="h-px flex-1 max-w-[260px] bg-gradient-to-r from-transparent via-[#f5c451]/55 to-[#f5c451]/90" />
          <svg
            viewBox="0 0 28 16"
            className="hidden sm:block h-3.5 w-6 shrink-0 text-[#f5c451] drop-shadow-[0_0_8px_rgba(245,196,81,0.55)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 8L8 3L14 8L8 13L2 8Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(245,196,81,0.18)" />
            <path d="M14 8L20 3L26 8L20 13L14 8Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(217,70,239,0.22)" />
            <circle cx="14" cy="8" r="2" fill="#fff3b0" />
          </svg>
          <span className="inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full border border-[#f5c451]/40 bg-[#1a072e]/75 px-3 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.26em] text-[#ffe28a]/95 shadow-[0_0_20px_rgba(245,196,81,0.16),inset_0_1px_0_rgba(255,243,196,0.2)] backdrop-blur-md">
            <Crown className="h-3 w-3 shrink-0 fill-[#ffd75e] text-[#ffd75e]" />
            <span>{t("ribbon")}</span>
            <span className="text-[#e879f9]">◆</span>
          </span>
          <svg
            viewBox="0 0 28 16"
            className="hidden sm:block h-3.5 w-6 shrink-0 text-[#f5c451] drop-shadow-[0_0_8px_rgba(245,196,81,0.55)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 8L8 3L14 8L8 13L2 8Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(217,70,239,0.22)" />
            <path d="M14 8L20 3L26 8L20 13L14 8Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(245,196,81,0.18)" />
            <circle cx="14" cy="8" r="2" fill="#fff3b0" />
          </svg>
          <span className="h-px flex-1 max-w-[260px] bg-gradient-to-l from-transparent via-[#f5c451]/55 to-[#f5c451]/90" />
        </div>

        <div
          ref={vaultRef}
          className="js-sp-vault panel panel-interactive relative overflow-hidden grid gap-6 sm:gap-8 p-5 sm:p-6 lg:grid-cols-[1.25fr_1fr_1.2fr] lg:items-center lg:gap-0 lg:p-8 xl:p-9 will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            boxShadow:
              "0 28px 70px -24px rgba(0, 0, 0, 0.88), 0 0 36px rgba(168, 60, 255, 0.28), inset 0 1px 0 rgba(255, 243, 196, 0.22)",
          }}
        >
          {/* Ambient Champagne-Gold Top & Bottom Hairline Bezels */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-[10%] right-[10%] h-[1.5px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 232, 150, 0.85), rgba(217, 70, 239, 0.45), transparent)",
              filter: "drop-shadow(0 0 8px rgba(245, 196, 81, 0.6))",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[18%] right-[18%] h-px opacity-55"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245, 196, 81, 0.65), transparent)",
            }}
          />

          {/* Silky Cursor-Tracking Interior Champagne-Gold Velvet Spotlight */}
          <div
            ref={spotlightRef}
            aria-hidden="true"
            className="pointer-events-none hidden lg:block absolute top-0 left-0 h-[480px] w-[480px] rounded-full blur-[95px] opacity-0 will-change-transform"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 218, 110, 0.16) 0%, rgba(217, 70, 239, 0.12) 45%, transparent 72%)",
            }}
          />

          {/* Col 1: Crown Image & Pricing Overview */}
          <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left lg:gap-7 lg:pr-8 xl:pr-10">
            <div
              ref={crownScrollRef}
              onMouseEnter={() => handleCrownHover(true)}
              onMouseLeave={() => handleCrownHover(false)}
              className="js-sp-crown relative h-auto w-32 shrink-0 lg:w-40 cursor-pointer select-none will-change-transform"
            >
              {/* Subtle Rotating Champagne-Gold Art-Deco Halo Behind Crown */}
              <svg
                ref={crownRingRef}
                aria-hidden="true"
                viewBox="0 0 200 200"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[118%] h-auto opacity-45"
              >
                <defs>
                  <linearGradient id="sp-crown-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#f5c451" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#d946ef" stopOpacity="0.55" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="86"
                  fill="none"
                  stroke="url(#sp-crown-ring)"
                  strokeWidth="1.1"
                  strokeDasharray="10 8 3 8"
                />
                <circle cx="100" cy="14" r="2.8" fill="#fff3b0" />
                <circle cx="186" cy="100" r="2.4" fill="#e879f9" />
              </svg>

              {/* Golden Royal Glow Behind Crown */}
              <div
                ref={crownHaloRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-full blur-[28px] opacity-65 will-change-transform"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 215, 94, 0.38) 0%, rgba(217, 70, 239, 0.28) 56%, transparent 80%)",
                }}
              />

              <div ref={crownFloatRef} className="relative will-change-transform">
                <Image
                  src="/images/crown.jpg"
                  alt="Royal Casino Club Crown"
                  width={240}
                  height={288}
                  className="h-auto w-32 shrink-0 mix-blend-lighten lg:w-40"
                  style={{
                    maskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            <div>
              <p className="js-sp-col1 shine inline-flex items-center gap-1.5 rounded-full border border-[#f5c451]/75 bg-[#23093d]/80 px-3 py-1 text-xs xl:text-sm font-bold uppercase italic tracking-wider text-[#ffe28a] shadow-[0_0_16px_rgba(245,196,81,0.22)]">
                <Crown className="h-3.5 w-3.5 fill-[#ffd75e] text-[#ffd75e]" />
                <span>{t("badge")}</span>
              </p>

              <p className="js-sp-col1 mt-2.5 font-display font-bold italic leading-none">
                <span
                  ref={priceRef}
                  className="gold-text text-[clamp(2.6rem,5vw,3.85rem)] drop-shadow-[0_4px_20px_rgba(245,196,81,0.28)]"
                >
                  $15,000
                </span>{" "}
                <span className="text-xl xl:text-2xl text-white/90">{tCommon("usd")}</span>
              </p>

              <h3 className="js-sp-col1 mt-2 text-xl xl:text-[1.4rem] font-bold leading-snug text-white font-philosopher">
                {t("heading")}
              </h3>

              <p className="js-sp-col1 mt-1.5 text-sm text-white/75 leading-relaxed max-w-xs">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Col 2: What's Included */}
          <div className="relative z-10 pt-6 lg:pt-0 lg:px-8 xl:px-10">
            {/* Subtle Gold-to-Violet Horizontal Divider on Mobile/Tablet */}
            <div
              aria-hidden="true"
              className="lg:hidden pointer-events-none absolute top-0 left-2 right-2 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(245, 196, 81, 0.45) 30%, rgba(192, 132, 252, 0.35) 70%, transparent 100%)",
              }}
            />
            {/* Subtle Gold-to-Violet Vertical Divider on Desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block pointer-events-none absolute start-0 top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(245, 196, 81, 0.45) 30%, rgba(192, 132, 252, 0.35) 70%, transparent 100%)",
              }}
            />

            <h3 className="js-sp-col1 flex items-center gap-2 text-base sm:text-lg xl:text-xl font-bold uppercase tracking-wide text-[#f5c451]">
              <Sparkles className="h-4 w-4 text-[#ffd75e]" />
              <span>{t("includedTitle")}</span>
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm sm:text-base xl:text-[16.5px]">
              {includedItems.map((item, idx) => (
                <li
                  key={idx}
                  className="js-sp-check group/item flex items-start gap-3 rounded-xl px-2.5 py-1.5 -mx-2.5 transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#f5c451]/45 bg-[#2a0a4a]/80 text-[#f5c451] shadow-[0_0_12px_rgba(245,196,81,0.2)] transition-all duration-300 group-hover/item:border-[#ffe28a] group-hover/item:shadow-[0_0_18px_rgba(245,196,81,0.45)]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold leading-snug text-white group-hover/item:text-[#fff3cc] transition-colors">
                    {item.title}
                    {item.detail && (
                      <span className="block text-xs xl:text-sm font-normal text-white/60">
                        {item.detail}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Available Add-On Modules */}
          <div id="addons" className="relative z-10 pt-6 lg:pt-0 lg:ps-8 xl:ps-10">
            {/* Subtle Gold-to-Violet Horizontal Divider on Mobile/Tablet */}
            <div
              aria-hidden="true"
              className="lg:hidden pointer-events-none absolute top-0 left-2 right-2 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(245, 196, 81, 0.45) 30%, rgba(192, 132, 252, 0.35) 70%, transparent 100%)",
              }}
            />
            {/* Subtle Gold-to-Violet Vertical Divider on Desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block pointer-events-none absolute start-0 top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(245, 196, 81, 0.45) 30%, rgba(192, 132, 252, 0.35) 70%, transparent 100%)",
              }}
            />

            <h3 className="js-sp-col1 text-base sm:text-lg xl:text-xl font-bold uppercase tracking-wide text-[#f5c451]">
              {t("addonsTitle")}
            </h3>

            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {addonModules.map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <li key={idx} className="js-sp-addon">
                    <a
                      href={getWhatsAppLink(mod.query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => handleAddonHover(e, true)}
                      onMouseLeave={(e) => handleAddonHover(e, false)}
                      className="group/addon panel panel-interactive relative flex h-full min-h-[98px] sm:min-h-[112px] flex-col items-center justify-center gap-2 sm:gap-2.5 overflow-hidden !rounded-xl px-2.5 py-3 sm:py-3.5 text-center text-[12.5px] sm:text-[13px] xl:text-sm font-semibold leading-tight will-change-transform"
                    >
                      <div className="panel-sheen" aria-hidden="true" />
                      <div className="panel-rim" aria-hidden="true" />
                      <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-[#d58cff]/55 bg-[#2a0a4a]/90 shadow-[0_0_12px_rgba(190,90,255,0.35)] transition-all duration-400 group-hover/addon:scale-110 group-hover/addon:border-[#f5c451] group-hover/addon:shadow-[0_0_18px_rgba(245,196,81,0.5)]">
                        <Icon className="gold-icon h-4 w-4 xl:h-5 xl:w-5 shrink-0" />
                      </span>
                      <span className="relative text-white/95 transition-colors duration-300 group-hover/addon:text-[#ffe28a]">
                        {mod.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="js-sp-col1 mt-4 text-xs xl:text-sm text-white/70 leading-relaxed">
              {t("addonsNote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

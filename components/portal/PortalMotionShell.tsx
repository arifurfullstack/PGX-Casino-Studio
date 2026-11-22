"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface PortalMotionShellProps {
  children: React.ReactNode;
}

export default function PortalMotionShell({ children }: PortalMotionShellProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        const heroes = root.querySelectorAll(".js-portal-hero");
        if (heroes.length) {
          tl.fromTo(
            heroes,
            { opacity: 0, y: 24, scale: 0.985 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              clearProps: "transform,opacity",
            }
          );
        }

        const banners = root.querySelectorAll(".js-portal-banner");
        if (banners.length) {
          tl.fromTo(
            banners,
            { opacity: 0, y: 20, scale: 0.99 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.62,
              clearProps: "transform,opacity",
            },
            heroes.length ? "-=0.45" : 0
          );
        }

        const kpis = root.querySelectorAll(".js-portal-kpi");
        if (kpis.length) {
          tl.fromTo(
            kpis,
            { opacity: 0, y: 26, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.1,
              clearProps: "transform,opacity",
            },
            "-=0.42"
          );
        }

        const panels = root.querySelectorAll(".js-portal-panel");
        if (panels.length) {
          tl.fromTo(
            panels,
            { opacity: 0, y: 28, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.11,
              clearProps: "transform,opacity",
            },
            "-=0.38"
          );
        }

        const rows = root.querySelectorAll(".js-portal-row");
        if (rows.length) {
          tl.fromTo(
            rows,
            { opacity: 0, x: -14 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.075,
              clearProps: "transform,opacity",
            },
            "-=0.45"
          );
        }

        // Animated KPI counters
        root.querySelectorAll<HTMLElement>(".js-portal-counter").forEach((el) => {
          const target = Number(el.dataset.target || "0");
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          if (!Number.isFinite(target)) return;

          const state = { val: 0 };
          gsap.to(state, {
            val: target,
            duration: 1.05,
            delay: 0.2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(state.val).toLocaleString()}${suffix}`;
            },
          });
        });

        // Animated progress bars
        root.querySelectorAll<HTMLElement>(".js-portal-progress").forEach((bar) => {
          const targetWidth = bar.dataset.progress || "20%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetWidth,
              duration: 1.15,
              delay: 0.25,
              ease: "power3.out",
            }
          );
        });

        // Ambient float on decorative badges/icons
        const floaters = root.querySelectorAll(".js-portal-float");
        if (floaters.length) {
          gsap.to(floaters, {
            y: -6,
            duration: 3.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.4,
          });
        }

        // Silky interactive GSAP card hover elevation + dynamic radial spotlight
        root.querySelectorAll<HTMLElement>(".js-portal-card").forEach((card) => {
          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
            card.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
          };

          const onEnter = () => {
            gsap.to(card, {
              y: -5,
              duration: 0.42,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const onLeave = () => {
            gsap.to(card, {
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);

          cleanups.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          });
        });

        // Subtle magnetic hover effect on primary CTA buttons
        root.querySelectorAll<HTMLElement>(".js-portal-cta").forEach((btn) => {
          const onEnter = () => {
            gsap.to(btn, {
              scale: 1.03,
              y: -2,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          const onLeave = () => {
            gsap.to(btn, {
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          };
          btn.addEventListener("mouseenter", onEnter);
          btn.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            btn.removeEventListener("mouseenter", onEnter);
            btn.removeEventListener("mouseleave", onLeave);
          });
        });
      }, root);

      return () => {
        cleanups.forEach((fn) => fn());
        ctx.revert();
      };
    });

    return () => {
      cleanups.forEach((fn) => fn());
      mm.revert();
    };
  }, [pathname]);

  return (
    <div ref={rootRef} className="w-full space-y-8">
      {children}
    </div>
  );
}

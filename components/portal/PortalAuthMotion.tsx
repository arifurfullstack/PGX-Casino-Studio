"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PortalAuthMotion({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".js-auth-card",
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.78, clearProps: "transform,opacity" }
        ).fromTo(
          ".js-auth-stagger",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            clearProps: "transform,opacity",
          },
          "-=0.45"
        );
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return <div ref={wrapRef}>{children}</div>;
}

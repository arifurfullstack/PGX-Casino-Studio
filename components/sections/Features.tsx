"use client";

import { Zap, Sparkles, Dices, Monitor, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Setup",
    desc: "Get online quickly and start operating.",
  },
  {
    icon: Sparkles,
    title: "Your Brand",
    desc: "Fully tailored with your name, colors, and identity.",
  },
  {
    icon: Dices,
    title: "Proven Games",
    desc: "High-performing slots and popular table games.",
  },
  {
    icon: Monitor,
    title: "Multi-Device",
    desc: "Optimized for desktop, mobile and tablet.",
  },
  {
    icon: Globe,
    title: "Global Ready",
    desc: "Support for multiple currencies and regions.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    desc: "Technical assistance and platform updates.",
  },
];

export default function Features() {
  return (
    <section className="py-10 sm:py-14 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              Features &amp; <span className="gold-text">benefits</span>
            </span>
          </h2>
        </div>

        <div className="mt-8 lg:mt-10 grid gap-5 lg:gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group panel panel-interactive cursor-pointer p-6 lg:p-8 xl:p-9 text-center hover:-translate-y-1.5"
              >
                <div className="panel-sheen" aria-hidden="true" />
                <div className="panel-rim" aria-hidden="true" />
                <span className="relative mx-auto grid h-12 w-12 lg:h-14 lg:w-14 place-items-center rounded-xl border border-[#d58cff]/90 bg-[#2a0a4a] shadow-[0_0_14px_rgba(190,90,255,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-[#f5ce6e] group-hover:bg-[#38105d] group-hover:shadow-[0_0_22px_rgba(245,196,81,0.5),inset_0_0_12px_rgba(245,196,81,0.2)]">
                  <Icon className="lucide gold-icon h-6 w-6 lg:h-7 lg:w-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                </span>

                <h3 className="relative mt-4 lg:mt-5 text-xl lg:text-2xl font-bold text-white font-philosopher transition-colors duration-500 ease-out group-hover:text-[#ffe28a]">
                  {feat.title}
                </h3>
                <p className="relative mt-1.5 text-sm lg:text-base text-white/70 transition-colors duration-500 ease-out group-hover:text-white/95">
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

"use client";

import Image from "next/image";
import { CheckCircle2, Video, Trophy, Spade, Gift, Crown } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";

const addonModules = [
  {
    name: "Live Dealer Tables",
    icon: Video,
    query: "Live Dealer Tables",
  },
  {
    name: "Poker Platform",
    icon: Spade,
    query: "Poker Platform",
  },
  {
    name: "Sportsbook",
    icon: Trophy,
    query: "Sportsbook",
  },
  {
    name: "Sweepstakes & Social",
    icon: Gift,
    query: "Sweepstakes & Social",
  },
];

export default function StarterPackageSection() {
  const getWhatsAppLink = (moduleName: string) =>
    `https://wa.me/14167256538?text=${encodeURIComponent(
      `Hi Royal Casino Club, I'd like to add the ${moduleName} module to my casino.`
    )}`;

  return (
    <section id="packages" className="py-8 sm:py-12 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="panel grid gap-8 p-6 lg:grid-cols-[1.3fr_1fr_1.2fr] lg:gap-0 lg:p-9 xl:p-10">
          {/* Col 1: Crown Image & Pricing Overview */}
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left lg:gap-7 lg:pr-8 xl:pr-10">
            <div className="relative h-auto w-28 shrink-0 lg:w-36">
              <Image
                src="/images/crown.jpg"
                alt="Royal Casino Club Crown"
                width={240}
                height={288}
                className="float h-auto w-28 shrink-0 mix-blend-lighten lg:w-36"
                style={{
                  maskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
                }}
              />
            </div>

            <div>
              <p className="inline-flex items-center gap-1.5 rounded-md border border-[#f5c451]/80 px-2.5 py-0.5 text-sm font-bold uppercase italic text-[#f5c451]">
                <Crown className="h-4 w-4 fill-[#f5c451]" /> Starter Package
              </p>

              <p className="mt-2 font-display font-bold italic leading-none">
                <span className="gold-text text-[clamp(2.6rem,5vw,3.8rem)]">$15,000</span>{" "}
                <span className="text-xl xl:text-2xl text-white/90">USD</span>
              </p>

              <h3 className="mt-2.5 text-[1.35rem] xl:text-[1.55rem] font-bold leading-tight text-white font-philosopher">
                Launch Your Own Branded Online Casino
              </h3>

              <p className="mt-2 text-sm xl:text-base text-white/70">
                A complete casino website with your chosen design, including casino slots and game tables.
              </p>
            </div>
          </div>

          {/* Col 2: What's Included */}
          <div className="border-line lg:border-l lg:px-8 xl:px-10">
            <h3 className="text-lg xl:text-xl font-bold uppercase text-[#f5c451]">Included:</h3>
            <ul className="mt-3.5 space-y-3 text-sm sm:text-base xl:text-[17px]">
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c451]" />
                <span className="font-semibold leading-snug text-white">
                  Your selected casino design
                </span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c451]" />
                <span className="font-semibold leading-snug text-white">
                  Online casino slots
                </span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c451]" />
                <span className="font-semibold leading-snug text-white">
                  Casino game tables
                  <span className="block text-xs xl:text-sm font-normal text-white/60">
                    (e.g. Blackjack, Roulette, Baccarat, etc.)
                  </span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c451]" />
                <span className="font-semibold leading-snug text-white">
                  Your casino branding
                  <span className="block text-xs xl:text-sm font-normal text-white/60">
                    (logo, colors, and domain setup)
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Available Add-On Modules */}
          <div id="addons" className="border-line lg:border-l lg:pl-8 xl:pl-10">
            <h3 className="text-lg xl:text-xl font-bold uppercase text-[#f5c451]">
              Available add-on modules:
            </h3>

            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {addonModules.map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <li key={idx}>
                    <a
                      href={getWhatsAppLink(mod.query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="panel flex h-full min-h-[104px] flex-col items-center justify-center gap-2 !rounded-xl px-2 py-3.5 text-center text-[13px] xl:text-sm font-semibold leading-tight transition hover:-translate-y-1 hover:border-[#f5c451]"
                    >
                      <Icon className="gold-icon h-5 w-5 xl:h-6 xl:w-6 shrink-0" />
                      <span className="text-white">{mod.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3.5 text-xs xl:text-sm text-white/70">
              Optional modules quoted separately. Message us on WhatsApp to add them to your casino.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

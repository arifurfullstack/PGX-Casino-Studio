import { StarterPackage, AddonModule, PricingConfig } from "@/types";

export const DEFAULT_STARTER_PACKAGE: StarterPackage = {
  basePrice: 15000,
  currency: "USD",
  title: "Launch Your Own Branded Online Casino",
  subtitle: "STARTER PACKAGE",
  description:
    "A complete casino website with your chosen design, including casino slots and game tables.",
  includes: [
    { title: "Your selected casino design" },
    { title: "Online casino slots" },
    {
      title: "Casino game tables",
      sub: "(e.g. Blackjack, Roulette, Baccarat, etc.)",
    },
    {
      title: "Your casino branding",
      sub: "(logo, colors, and domain setup)",
    },
  ],
  excludes: ["Live Dealer", "Sportsbook", "Poker", "Sweepstakes"],
};

export const DEFAULT_ADDON_MODULES: AddonModule[] = [
  {
    id: "live-dealer",
    name: "Live Dealer Tables",
    slug: "live-dealer",
    price: 10000,
    description: "Real-time streaming HD dealer tables and multi-seat lobbies",
    iconKey: "video",
    isEnabled: true,
    order: 1,
  },
  {
    id: "sportsbook",
    name: "Sportsbook",
    slug: "sportsbook",
    price: 10000,
    description: "Global sports events, in-play betting, live odds feed",
    iconKey: "trophy",
    isEnabled: true,
    order: 2,
  },
  {
    id: "poker",
    name: "Poker Platform",
    slug: "poker",
    price: 20000,
    description: "Texas Hold'em, Omaha, cash tables, and tournament systems",
    iconKey: "spade",
    isEnabled: true,
    order: 3,
  },
  {
    id: "sweepstakes",
    name: "Sweepstakes",
    slug: "sweepstakes",
    price: 25000,
    description: "Dual-currency social gaming compliant sweepstakes engine",
    iconKey: "coins",
    isEnabled: true,
    order: 4,
  },
];

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  starterPackagePrice: 15000,
  ggrCompanyShare: 25,
  ggrOperatorShare: 75,
  reservationFee: 1000,
  reservationDiscountPercent: 10,
  reservationDurationHours: 120, // 5 days
};

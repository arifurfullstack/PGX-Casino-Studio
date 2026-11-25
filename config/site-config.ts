export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const SITE_CONFIG = {
  name: "Royal Casino Club",
  legalName: "Royal Casino Club — Online Casino Solutions",
  tagline: "Launch Your Turnkey Online Casino",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://royalcasinoclub.com",
  description:
    "Launch a turnkey white-label online casino from $15,000 — no license required. 12+ luxury designs, slots, live dealer & 24/7 VIP support.",
  startingPriceFormatted: "$15,000 USD",
  contact: {
    email: "contact@royalcasinoclub.com",
    whatsapp: "+1 (416) 477-0191",
    whatsappLink: "https://wa.me/14164770191",
    telegram: "@RoyalCasinoClubOfficial",
    supportHours: "24/7 Global Business Inquiries",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Casino Designs", href: "/designs" },
    { label: "Packages", href: "/packages" },
    { label: "Add-On Modules", href: "/modules" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Proposal", href: "/Royal-Casino-Club-Proposal.pdf", external: true },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};

export interface NavItem {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: "ALL I GAMING",
  legalName: "All I Gaming Platform Solutions Ltd.",
  description:
    "Leading B2B turnkey online casino platform marketplace. Choose your casino design, customize optional modules, and launch your gaming brand.",
  startingPriceFormatted: "$15,000 USD",
  contact: {
    email: "contact@alligaming.com",
    whatsapp: "+1 (555) 019-2834",
    telegram: "@AllIGamingOfficial",
    supportHours: "24/7 Global Business Inquiries",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Casino Designs", href: "/#designs" },
    { label: "Packages", href: "/#packages" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Features", href: "/#features" },
    { label: "Contact Us", href: "/#contact" },
  ] as NavItem[],
};

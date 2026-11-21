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
    whatsapp: "+1 (416) 725-6556",
    telegram: "@AllIGamingOfficial",
    supportHours: "24/7 Global Business Inquiries",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Casino Designs", href: "/designs" },
    { label: "Packages", href: "/packages" },
    { label: "Add-On Modules", href: "/modules" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};

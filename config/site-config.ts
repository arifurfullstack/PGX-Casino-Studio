export interface NavItem {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: "Royal Casino Club",
  legalName: "Royal Casino Club — Online Casino Solutions",
  description:
    "Royal Casino Club provides premium turnkey online casino software solutions, empowering operators to launch customized, high-converting casinos worldwide.",
  startingPriceFormatted: "$15,000 USD",
  contact: {
    email: "contact@royalcasinoclub.com",
    whatsapp: "+1 (416) 725-6538",
    whatsappLink: "https://wa.me/14167256538",
    telegram: "@RoyalCasinoClubOfficial",
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

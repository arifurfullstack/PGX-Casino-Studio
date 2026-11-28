import type { Metadata, Viewport } from "next";
import {
  Cabin,
  Cinzel,
  Great_Vibes,
  Noto_Sans_Arabic,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
} from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LanguageWelcomeModal from "@/components/i18n/LanguageWelcomeModal";
import { SITE_CONFIG } from "@/config/site-config";
import { getLocaleDir } from "@/i18n/config";
import { resolveServerLocale } from "@/i18n/request";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const philosopher = localFont({
  src: [
    {
      path: "../public/fonts/philosopher-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/philosopher-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/philosopher-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/philosopher-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-philosopher",
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://royalcasinoclub.com";

export const viewport: Viewport = {
  themeColor: "#07020d",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: SITE_CONFIG.name,
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "turnkey online casino",
    "white-label casino",
    "online casino software",
    "launch online casino",
    "casino platform solutions",
    "Royal Casino Club",
    "iGaming turnkey platform",
    "live dealer casino",
    "sportsbook software",
  ],
  authors: [{ name: SITE_CONFIG.name, url: APP_URL }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Casino Club — Launch Your Own Premium Online Casino Starting at $15,000",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/images/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ locale, hasCookie }, messages] = await Promise.all([
    resolveServerLocale(),
    getMessages(),
  ]);
  const dir = getLocaleDir(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`dark ${cabin.variable} ${cinzel.variable} ${philosopher.variable} ${greatVibes.variable} ${notoArabic.variable} ${notoBengali.variable} ${notoDevanagari.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#07020d] text-white antialiased font-sans selection:bg-purple-600 selection:text-white flex flex-col justify-between"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Background ambient neon ribbons and glow effects */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-purple-700/15 rounded-full blur-[140px]" />
            <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/12 rounded-full blur-[160px]" />
            <div className="absolute top-[38%] left-[-10%] w-[700px] h-[700px] bg-violet-600/12 rounded-full blur-[180px]" />
            <div className="absolute bottom-[15%] right-1/4 w-[800px] h-[500px] bg-purple-700/15 rounded-full blur-[160px]" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>

          <LanguageWelcomeModal hasSavedLocale={hasCookie} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

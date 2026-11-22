import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://casino.pgxsportslounge.com"),
  title: "All I Gaming — Casino Platforms & Solutions",
  description:
    "Own your online casino starting at $15,000! Turnkey setup, premium casino designs, slots, game tables, and 24/7 support.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${cinzel.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#030108] text-white antialiased font-sans selection:bg-purple-600 selection:text-white flex flex-col justify-between"
      >
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
      </body>
    </html>
  );
}

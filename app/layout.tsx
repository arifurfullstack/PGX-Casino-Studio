import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
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
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#030108] text-white antialiased font-sans selection:bg-purple-600 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}

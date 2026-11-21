import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StarterPackageSection from "@/components/sections/starter-package/StarterPackageSection";
import CasinoDesignsSection from "@/components/sections/casino-designs/CasinoDesignsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import CTABanner from "@/components/sections/CTABanner";

import { getAllActiveDesigns } from "@/services/casinoService";
import { getStarterPackage, getAddonModules } from "@/services/pricingService";

export const revalidate = 60; // ISR cache revalidation every 60s for high throughput

export default async function Home() {
  // SSR Data Fetching via Service Layer (MongoDB with graceful fallback)
  const [designs, starterPackage, addons] = await Promise.all([
    getAllActiveDesigns(),
    Promise.resolve(getStarterPackage()),
    Promise.resolve(getAddonModules()),
  ]);

  return (
    <div
      suppressHydrationWarning
      className="relative min-h-screen bg-[#04010a] text-white overflow-hidden"
    >
      {/* Background ambient neon ribbons and glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-purple-700/15 rounded-full blur-[140px]" />
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/12 rounded-full blur-[160px]" />
        <div className="absolute top-[38%] left-[-10%] w-[700px] h-[700px] bg-violet-600/12 rounded-full blur-[180px]" />
        <div className="absolute bottom-[15%] right-1/4 w-[800px] h-[500px] bg-purple-700/15 rounded-full blur-[160px]" />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <StarterPackageSection packageData={starterPackage} addons={addons} />
          <CasinoDesignsSection designs={designs} />
          <HowItWorks />
          <Features />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </div>
  );
}

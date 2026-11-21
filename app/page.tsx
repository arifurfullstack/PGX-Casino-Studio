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
    <main>
      <HeroSection />
      <StarterPackageSection packageData={starterPackage} addons={addons} />
      <CasinoDesignsSection designs={designs} />
      <HowItWorks />
      <Features />
      <CTABanner />
    </main>
  );
}

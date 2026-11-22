import HeroSection from "@/components/sections/HeroSection";
import HomepageBackground from "@/components/sections/HomepageBackground";
import StarterPackageSection from "@/components/sections/starter-package/StarterPackageSection";
import CasinoDesignsSection from "@/components/sections/casino-designs/CasinoDesignsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import CTABanner from "@/components/sections/CTABanner";

export const revalidate = 60; // ISR cache revalidation every 60s for high throughput

export default function Home() {
  return (
    <main className="relative w-full overflow-x-clip bg-[#07020d] text-white">
      <HomepageBackground />
      <div className="relative z-10">
        <HeroSection />
        <StarterPackageSection />
        <CasinoDesignsSection />
        <HowItWorks />
        <Features />
        <AboutSection />
        <FAQSection />
        <ContactSection />
        <CTABanner />
      </div>
    </main>
  );
}

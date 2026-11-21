import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import StarterPackage from "@/components/sections/StarterPackage";
import CasinoDesigns from "@/components/sections/CasinoDesigns";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#04010a] text-white overflow-hidden">
      {/* Background ambient neon ribbons and glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top hero purple glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-purple-700/15 rounded-full blur-[140px]" />
        
        {/* Right hero magenta/purple glow */}
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/12 rounded-full blur-[160px]" />

        {/* Center swoosh glow for packages & designs */}
        <div className="absolute top-[38%] left-[-10%] w-[700px] h-[700px] bg-violet-600/12 rounded-full blur-[180px]" />
        
        {/* Lower glow for CTA */}
        <div className="absolute bottom-[15%] right-1/4 w-[800px] h-[500px] bg-purple-700/15 rounded-full blur-[160px]" />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <StarterPackage />
          <CasinoDesigns />
          <HowItWorks />
          <Features />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </div>
  );
}

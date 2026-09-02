import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductShowcaseSection } from "@/components/landing/ProductShowcaseSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { DemoCTASection } from "@/components/landing/DemoCTASection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductShowcaseSection />
        <HowItWorksSection />
        <CapabilitiesSection />
        <DemoCTASection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}

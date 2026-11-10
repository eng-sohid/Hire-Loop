import { CtaSection } from "@/components/home/cta"
import { FeaturesSection } from "@/components/home/features"
import { Footer } from "@/components/home/footer"
import { HeroSection } from "@/components/home/hero"
import { JobsSection } from "@/components/home/jobs-section"
import { Navbar } from "@/components/home/navbar"
import { PricingSection } from "@/components/home/pricing"

export default function Page() {
  return (
    <div className="dark bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <JobsSection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

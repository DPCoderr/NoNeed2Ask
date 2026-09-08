import { LandingNavbar } from "@/components/layout/landing-navbar"

import { LandingApplicationsSection } from "./landing-applications-section"
import { LandingCtaSection } from "./landing-cta-section"
import { LandingFooter } from "./landing-footer"
import { LandingHeroSection } from "./landing-hero-section"
import { LandingPublicStatusSection } from "./landing-public-status-section"
import { LandingWorkflowSection } from "./landing-workflow-section"

export function LandingPage() {
  return (
    <main className="min-h-svh bg-white text-slate-950">
      <LandingNavbar />
      <LandingHeroSection />
      <LandingWorkflowSection />
      <LandingPublicStatusSection />
      <LandingApplicationsSection />
      <LandingCtaSection />
      <LandingFooter />
    </main>
  )
}

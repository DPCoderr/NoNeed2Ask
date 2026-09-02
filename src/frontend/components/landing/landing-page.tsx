import { LandingNavbar } from "@/components/layout/landing-navbar"

import { LandingApplicationsSection } from "./landing-applications-section"
import { LandingCtaSection } from "./landing-cta-section"
import { LandingFooter } from "./landing-footer"
import { LandingHeroSection } from "./landing-hero-section"
import { LandingPublicStatusSection } from "./landing-public-status-section"
import { LandingWorkflowSection } from "./landing-workflow-section"

export function LandingPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#f8fbff] text-slate-950">
      <LandingNavbar />
      <LandingHeroSection />
      <LandingWorkflowSection />
      <LandingApplicationsSection />
      <LandingPublicStatusSection />
      <LandingCtaSection />
      <LandingFooter />
    </main>
  )
}

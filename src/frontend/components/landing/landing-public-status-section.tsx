import { Link2, LockKeyhole } from "lucide-react"

import { FeaturePoint } from "./feature-point"
import { LandingReveal } from "./landing-reveal"
import { PhoneFrame } from "./phone-frame"
import { SectionIntro } from "./section-intro"

export function LandingPublicStatusSection() {
  return (
    <section
      className="scroll-mt-24 bg-white px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      id="public-status"
    >
      <div className="mx-auto grid min-w-0 max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
        <LandingReveal>
          <SectionIntro
            description="Share a quiet, read-only summary with people you trust. They see the update—not your private notes or account details."
            eyebrow="A status page you control"
            title="Answer “How is it going?” once."
          />
          <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Public page</p>
                <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                  Visible to anyone with your link
                </p>
              </div>
              <div
                aria-label="Public sharing enabled"
                className="flex h-7 w-12 items-center justify-end rounded-full bg-primary p-1 shadow-inner"
                role="img"
              >
                <span className="size-5 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-xs font-medium text-slate-600 sm:text-sm">
              <Link2 aria-hidden="true" className="size-4 shrink-0 text-primary" />
              <span className="truncate">noneed2ask.app/status/your-name</span>
            </div>
          </div>
          <ul className="mt-6 grid gap-3.5">
            <FeaturePoint>You decide when the page is live.</FeaturePoint>
            <FeaturePoint>Private notes always stay private.</FeaturePoint>
            <FeaturePoint>Visitors never need an account.</FeaturePoint>
          </ul>
        </LandingReveal>

        <LandingReveal className="relative min-w-0 py-4" delay={100} motion="fade">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-full bg-blue-200/55 blur-3xl"
          />
          <div className="relative mx-auto max-w-[18rem] sm:max-w-[21rem]">
            <PhoneFrame
              alt="Read-only public job search page on mobile showing a calm progress summary"
              height={812}
              src="/landing/public-status-mobile.webp"
              width={360}
            />
            <div className="absolute -right-4 top-24 rounded-2xl border border-emerald-100 bg-white px-3.5 py-3 shadow-xl shadow-slate-900/10 sm:-right-20 sm:px-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-emerald-700 sm:text-sm">
                <span className="size-2 rounded-full bg-emerald-500" /> Read-only and live
              </p>
            </div>
            <div className="absolute -bottom-3 -left-4 rounded-2xl border border-blue-100 bg-white px-3.5 py-3 shadow-xl shadow-slate-900/10 sm:-left-20 sm:px-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-700 sm:text-sm">
                <LockKeyhole aria-hidden="true" className="size-4 text-primary" /> Private notes stay hidden
              </p>
            </div>
          </div>
        </LandingReveal>
      </div>
    </section>
  )
}

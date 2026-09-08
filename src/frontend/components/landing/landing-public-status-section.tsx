import { LockKeyhole } from "lucide-react"

import { FeaturePoint } from "./feature-point"
import { PhoneFrame } from "./phone-frame"
import { SectionIntro } from "./section-intro"

export function LandingPublicStatusSection() {
  return (
    <section className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-24" id="public-status">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
        <div>
          <SectionIntro
            description="Give friends and family a place to check in. Your public page shows the companies and roles you’ve applied to, your progress, and your latest application updates."
            eyebrow="What they see"
            title="Keep everyone updated, without another message."
          />
          <ul className="mt-7 grid gap-4">
            <FeaturePoint>They can open your link without an account.</FeaturePoint>
            <FeaturePoint>You can turn public sharing off at any time.</FeaturePoint>
            <FeaturePoint>Your private notes stay in your workspace.</FeaturePoint>
          </ul>
          <div className="mt-8 flex items-start gap-3 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
            <LockKeyhole aria-hidden="true" className="mt-1 size-4 shrink-0" />
            <p>Sharing is optional. When it’s on, anyone with your link can view the page. Visitors can’t make changes.</p>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-3xl bg-[#f7f8fa] px-5 py-8 sm:px-8 sm:py-10">
          <PhoneFrame
            alt="Public status page showing an upcoming interview at Northstar Labs and recent applications with their statuses"
            className="w-full max-w-[19.5rem]"
            height={1688}
            src="/landing/public-status-updates-mobile.webp"
            width={780}
          />
          <p className="mt-5 text-center text-sm text-slate-600">One page for everyone following along.</p>
        </div>
      </div>
    </section>
  )
}

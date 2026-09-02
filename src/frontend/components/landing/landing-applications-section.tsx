import { BrowserFrame } from "./browser-frame"
import { FeaturePoint } from "./feature-point"
import { LandingReveal } from "./landing-reveal"
import { SectionIntro } from "./section-intro"

export function LandingApplicationsSection() {
  return (
    <section
      className="scroll-mt-24 border-y border-blue-100/80 bg-[linear-gradient(180deg,#f2f8ff_0%,#f8fbff_100%)] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      id="applications"
    >
      <div className="mx-auto grid min-w-0 max-w-6xl gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-16">
        <LandingReveal className="min-w-0 order-2 lg:order-1" motion="fade">
          <BrowserFrame
            alt="Applications list with search, status filters, sorting, and next actions"
            height={1000}
            imageClassName="max-sm:h-[390px] max-sm:w-auto max-sm:max-w-none max-sm:object-cover max-sm:object-left-top"
            sizes="(max-width: 639px) 640px, (max-width: 1023px) 90vw, 55vw"
            src="/landing/applications-list.webp"
            width={1585}
          />
        </LandingReveal>

        <LandingReveal className="order-1 lg:order-2">
          <SectionIntro
            description="Turn scattered applications into one readable pipeline and always know what deserves your attention next."
            eyebrow="Your private workspace"
            title="Keep the search moving without keeping a spreadsheet alive."
          />
          <ul className="mt-7 grid gap-3.5">
            <FeaturePoint>Search and filter every application in seconds.</FeaturePoint>
            <FeaturePoint>Keep private notes separate from shareable updates.</FeaturePoint>
            <FeaturePoint>Bring upcoming interviews and follow-ups into view.</FeaturePoint>
          </ul>
        </LandingReveal>
      </div>
    </section>
  )
}

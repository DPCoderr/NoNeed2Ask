import { LandingReveal } from "./landing-reveal"
import { PhoneFrame } from "./phone-frame"
import { SectionIntro } from "./section-intro"

const workflowSteps = [
  {
    description:
      "Keep every role, contact moment, note, and next action in one calm workspace.",
    label: "Track privately",
    number: "01",
  },
  {
    description:
      "See what needs attention next without rebuilding a spreadsheet every week.",
    label: "Stay ahead",
    number: "02",
  },
  {
    description:
      "Give trusted people one read-only link instead of repeating the same update.",
    label: "Share calmly",
    number: "03",
  },
]

export function LandingWorkflowSection() {
  return (
    <section
      className="scroll-mt-24 bg-white px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      id="dashboard"
    >
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-blue-100 bg-[radial-gradient(circle_at_85%_20%,rgb(186_230_253_/_0.7),transparent_32%),linear-gradient(135deg,#f7fbff_0%,#eaf5ff_100%)] shadow-[0_35px_100px_-65px_rgb(30_64_175_/_0.55)] lg:grid-cols-[0.9fr_1.1fr]">
        <LandingReveal className="p-7 sm:p-10 lg:p-14">
          <SectionIntro
            description="NoNeed2Ask connects the three moments that normally live in separate tools: tracking, planning, and sharing."
            eyebrow="One calm workflow"
            title="From private tracking to a shareable update."
          />
          <ol className="mt-9 grid gap-0">
            {workflowSteps.map(({ description, label, number }, index) => (
              <li
                className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-7 last:pb-0"
                key={label}
              >
                {index < workflowSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[1.35rem] top-11 w-px bg-blue-200"
                  />
                )}
                <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-blue-200 bg-white text-xs font-bold text-primary shadow-sm">
                  {number}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                    {label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600 sm:text-base">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </LandingReveal>

        <LandingReveal
          className="relative min-h-[500px] overflow-hidden border-t border-blue-100 px-5 pb-0 pt-10 sm:min-h-[620px] sm:px-10 lg:min-h-0 lg:border-l lg:border-t-0"
          delay={100}
          motion="fade"
        >
          <div
            aria-hidden="true"
            className="absolute -right-24 top-10 size-80 rounded-full bg-blue-300/35 blur-3xl"
          />
          <p className="relative z-10 text-center text-xs font-semibold uppercase tracking-[0.18em] text-blue-900/60">
            The same search, two useful views
          </p>
          <div className="relative z-10 mx-auto mt-7 flex max-w-[31rem] items-end justify-center gap-3 sm:gap-6">
            <div className="w-[47%] max-w-[14.5rem] -rotate-2">
              <p className="mb-3 text-center text-xs font-semibold text-slate-700 sm:text-sm">
                Private dashboard
              </p>
              <PhoneFrame
                alt="NoNeed2Ask private dashboard on mobile"
                height={844}
                src="/landing/dashboard-mobile.webp"
                width={375}
              />
            </div>
            <div className="w-[47%] max-w-[14.5rem] translate-y-10 rotate-2 sm:translate-y-14">
              <p className="mb-3 text-center text-xs font-semibold text-slate-700 sm:text-sm">
                Application pipeline
              </p>
              <PhoneFrame
                alt="NoNeed2Ask application list on mobile"
                height={844}
                src="/landing/applications-mobile.webp"
                width={375}
              />
            </div>
          </div>
        </LandingReveal>
      </div>
    </section>
  )
}

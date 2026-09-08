import { PhoneFrame } from "./phone-frame"
import { SectionIntro } from "./section-intro"

const workspaceViews = [
  {
    title: "See where things stand",
    description: "Review your application statuses and keep the next steps in view.",
    alt: "Private mobile dashboard with an upcoming interview and an overview of application statuses",
    src: "/landing/dashboard-mobile-v2.webp",
  },
  {
    title: "Find the details you need",
    description: "Search and filter your applications. Keep notes with the role they belong to.",
    alt: "Mobile application list with company search, status filters, and individual job applications",
    src: "/landing/applications-mobile-v2.webp",
  },
]

export function LandingApplicationsSection() {
  return (
    <section className="scroll-mt-28 border-y border-slate-200/80 bg-[#f7f8fa] px-5 py-16 sm:px-8 sm:py-24" id="applications">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          align="center"
          description="Keep companies, roles, statuses, and notes together in your private workspace. It’s the place you come back to as your search moves forward."
          eyebrow="Just for you"
          title="Every application, in one place."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-12 sm:grid-cols-2 sm:gap-10 lg:mt-14 lg:gap-20">
          {workspaceViews.map(({ title, description, alt, src }) => (
            <div className="flex min-w-0 flex-col items-center" key={src}>
              <PhoneFrame alt={alt} className="w-full max-w-[19.5rem]" height={1688} src={src} width={780} />
              <div className="mt-6 max-w-xs text-center">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

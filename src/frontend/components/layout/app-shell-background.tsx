import { TopographyPattern } from "@/components/dashboard/topography-pattern"

export function AppShellBackground({
  hasLandingBackground,
  isDashboard,
}: {
  hasLandingBackground: boolean
  isDashboard: boolean
}) {
  if (isDashboard) {
    return (
      <>
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 bg-[linear-gradient(145deg,#f8fbff_10%,#edf7ff_52%,#f7fbff_100%)]"
        />
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[1] bg-[linear-gradient(to_right,rgb(29_112_168_/_0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(29_112_168_/_0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        />
        <TopographyPattern className="pointer-events-none fixed -right-16 top-16 z-[2] w-[min(48rem,72vw)] text-blue-900/5" />
      </>
    )
  }

  if (!hasLandingBackground) {
    return null
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
      />
      <div className="fixed inset-0 z-[1] bg-[linear-gradient(225deg,rgb(255_255_255/0.04)_0%,rgb(255_255_255/0.2)_34%,rgb(255_255_255/0.72)_62%,rgb(246_250_255/0.96)_100%)]" />
      <div className="fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0)_0%,rgb(255_255_255/0.1)_32%,rgb(246_250_255/0.86)_78%)]" />
    </>
  )
}

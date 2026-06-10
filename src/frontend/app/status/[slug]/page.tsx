import {
  Calendar03Icon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { JobSearchDistributionCard } from "@/components/dashboard/job-search-distribution-card"
import { NextActionCard } from "@/components/dashboard/next-action-card"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { RecentApplicationsCard } from "@/components/dashboard/recent-applications-card"
import { buildDashboardData } from "@/components/dashboard/dashboard-data"
import { LandingNavbar } from "@/components/layout/landing-navbar"
import { Button } from "@/components/ui/button"
import { ApiResponseError } from "@/lib/api/errors"
import { getPublicStatus } from "@/lib/api/public-status"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"
import type {
  PublicStatusEnabledResponseDto,
  PublicStatusResponseDto,
} from "@/lib/api/types"
import Image from "next/image"

const recentApplicationsLimit = 10

const backendPublicStatusBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_STATUS_BASE_URL ??
      "https://noneed2ask.onrender.com/status"
    : process.env.PUBLIC_STATUS_BASE_URL_DEV ??
      "http://localhost:5273/status"

const publicStatusNavItems = [
  { href: "#overview", label: "Overview" },
  { href: "#journey", label: "Journey" },
  { href: "#updates", label: "Updates" },
]

function StatusPageFrame({
  children,
  isAuthenticated,
}: {
  children: ReactNode
  isAuthenticated: boolean
}) {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#f6faff] text-slate-950">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
      />
      <div className="fixed inset-0 z-[1] bg-[linear-gradient(225deg,rgb(255_255_255/0.04)_0%,rgb(255_255_255/0.2)_34%,rgb(255_255_255/0.72)_62%,rgb(246_250_255/0.96)_100%)]" />
      <div className="fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0)_0%,rgb(255_255_255/0.1)_32%,rgb(246_250_255/0.86)_78%)]" />

      <LandingNavbar
        isAuthenticated={isAuthenticated}
        navItems={publicStatusNavItems}
      />

      {children}
    </main>
  )
}

function StatusPageContentFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col gap-5 px-4 py-5 sm:px-5 md:gap-5 md:px-8 md:py-8 xl:px-10">
      {children}
    </div>
  )
}

function PrivateStatusMessage({
  isAuthenticated,
  slug,
}: {
  isAuthenticated: boolean
  slug: string
}) {
  return (
    <div className="relative z-10 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-xl border border-white/80 bg-white/78 p-8 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
        <p className="text-sm font-semibold text-blue-700">
          Public status / {slug}
        </p>
        <Image src={"/1private-img.png"} height={80} width={80} alt="private image"/>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal">
          This status page is private
        </h1>
        <p className="mt-3 leading-7 text-blue-950/70">
          This status page is currently private.
        </p>
        {isAuthenticated ? (
          <Button asChild className="mt-7 rounded-lg">
            <Link href="/">
              <HugeiconsIcon icon={DashboardSquare01Icon} />
              Return to dashboard
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  )
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not scheduled"
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

function PublicStatusContent({
  applications,
  profile,
}: Pick<PublicStatusEnabledResponseDto, "applications" | "profile">) {
  const dashboardData = buildDashboardData(applications, new Date(), {
    recentLimit: recentApplicationsLimit,
  })

  return (
    <StatusPageContentFrame>
      <DashboardHeader
        actions={
          <span className="flex items-center gap-2">
            <HugeiconsIcon className="size-5" icon={Calendar03Icon} />
            Last updated {formatDate(profile.updatedAt)}
          </span>
        }
        description="A public view of the job search: visible pipeline health, next steps, and recent updates without private notes or edit controls."
        eyebrow="Public read-only dashboard"
        title={`${profile.displayName}'s Job Search`}
      />

      <OverviewStats id="overview" stats={dashboardData.overviewStats} />

      <section
        className="grid scroll-mt-28 gap-4 md:gap-4 xl:grid-cols-[1.08fr_0.94fr]"
        id="journey"
      >
        <JobSearchDistributionCard
          description="Where all visible applications stand right now."
          stages={dashboardData.pipelineStages}
          total={dashboardData.pipelineTotal}
        />
        <div className="grid">
          <NextActionCard {...dashboardData.nextAction} showActions={false} />
        </div>
      </section>

      <div className="scroll-mt-28" id="updates">
        <RecentApplicationsCard
          applications={dashboardData.recentApplications}
          description="A read-only timeline of the latest public updates."
          emptyMessage="No public applications yet."
          showViewAll={false}
          title="Recent applications"
        />
      </div>
    </StatusPageContentFrame>
  )
}

type PublicStatusPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function PublicStatusPage({
  params,
}: PublicStatusPageProps) {
  const { slug } = await params
  const currentUser = await getCurrentUserServer()
  const isAuthenticated = Boolean(currentUser)
  let publicStatus: PublicStatusResponseDto

  try {
    publicStatus = await getPublicStatus(slug, {
      baseUrl: backendPublicStatusBaseUrl,
    })
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      notFound()
    }

    throw error
  }

  if (publicStatus.kind === "disabled") {
    return (
      <StatusPageFrame isAuthenticated={isAuthenticated}>
        <PrivateStatusMessage
          isAuthenticated={isAuthenticated}
          slug={slug}
        />
      </StatusPageFrame>
    )
  }

  return (
    <StatusPageFrame isAuthenticated={isAuthenticated}>
      <PublicStatusContent
        applications={publicStatus.applications}
        profile={publicStatus.profile}
      />
    </StatusPageFrame>
  )
}

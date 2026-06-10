import {
  Calendar03Icon,
  DashboardSquare01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { NextActionCard } from "@/components/dashboard/next-action-card"
import { LandingNavbar } from "@/components/layout/landing-navbar"
import { Button } from "@/components/ui/button"
import { mockPublicStatusEnabledResponse } from "@/lib/api/fixtures"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"
import type {
  ApplicationStatus,
  PublicStatusApplicationDto,
  PublicStatusProfileDto,
} from "@/lib/api/types"

const iconPath = "/dashboard-icons"

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

const statusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  waiting_response: "Waiting",
  interview_planned: "Planned",
  interview_done: "Done",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
  paused: "Paused",
}

const journeyStages: {
  label: string
  statuses: ApplicationStatus[]
  icon: string
  accent?: string
}[] = [
  { label: "Applied", statuses: ["applied"], icon: "AppliedStatusIcon.svg" },
  { label: "Waiting", statuses: ["waiting_response"], icon: "WaitingStatusIcon.svg" },
  {
    label: "Planned",
    statuses: ["interview_planned"],
    icon: "PlannedStatusIcon.svg",
  },
  { label: "Done", statuses: ["interview_done"], icon: "DoneStatusIcon.svg" },
  { label: "Offer", statuses: ["offer"], icon: "OfferStatusIcon.svg", accent: "text-violet-700" },
]

const statusIconMap: Record<ApplicationStatus, string> = {
  applied: "AppliedStatusIcon.svg",
  waiting_response: "WaitingStatusIcon.svg",
  interview_planned: "PlannedStatusIcon.svg",
  interview_done: "DoneStatusIcon.svg",
  offer: "OfferStatusIcon.svg",
  rejected: "NextActionIcon.svg",
  ghosted: "WaitingResponsesIcon.svg",
  paused: "OfferStatusIcon.svg",
}

const activeStagePriority: ApplicationStatus[] = [
  "offer",
  "interview_planned",
  "interview_done",
  "waiting_response",
  "applied",
]

function formatDate(value: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!value) {
    return "Not scheduled"
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(new Date(value))
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not scheduled"
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

function getCurrentFocus(applications: PublicStatusApplicationDto[]) {
  return (
    applications.find((application) => application.status === "interview_planned") ??
    applications
      .filter((application) => application.nextActionAt)
      .sort(
        (first, second) =>
          new Date(second.nextActionAt ?? "").getTime() -
          new Date(first.nextActionAt ?? "").getTime()
      )[0] ??
    applications[0]
  )
}

function PublicIcon({
  alt = "",
  className,
  name,
  priority,
}: {
  alt?: string
  className?: string
  name: string
  priority?: boolean
}) {
  return (
    <Image
      alt={alt}
      className={className}
      height={112}
      priority={priority}
      src={`${iconPath}/${name}`}
      width={112}
    />
  )
}

function JourneyCard({
  applications,
}: {
  applications: PublicStatusApplicationDto[]
}) {
  const activeStatus =
    activeStagePriority.find((status) =>
      applications.some((application) => application.status === status)
    ) ?? "applied"
  const activeStage =
    journeyStages.find((stage) => stage.statuses.includes(activeStatus))?.label ??
    "Applied"

  return (
    <section className="rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-3 xl:items-center xl:gap-4">
        <div className="flex min-w-0 items-center gap-2.5 xl:gap-3">
          <PublicIcon
            className="size-8 shrink-0 text-blue-800 xl:size-9"
            name="MountainMark.svg"
          />
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-normal text-slate-950 xl:text-xl">
              Job Search Distribution
            </h2>
            <p className="mt-0.5 text-xs font-medium text-blue-950/75 xl:mt-1 xl:text-sm">
              Where all visible applications stand right now.
            </p>
          </div>
        </div>
        <span className="h-8 rounded-lg border border-blue-100 bg-white/70 px-3 py-2 text-xs font-semibold leading-none text-slate-950 xl:h-9 xl:px-4 xl:text-sm">
          All time
        </span>
      </div>

      <div className="mt-5 space-y-4 xl:mt-7 xl:space-y-5">
        {journeyStages.map((stage) => {
          const count = applications.filter((application) =>
            stage.statuses.includes(application.status)
          ).length
          const percent = applications.length
            ? Math.round((count / applications.length) * 100)
            : 0
          const isActive = stage.label === activeStage

          return (
            <div
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-2 gap-y-2 xl:grid-cols-[3rem_9.5rem_minmax(10rem,1fr)_2rem_2.75rem] xl:gap-3"
              key={stage.label}
            >
              <PublicIcon
                className="size-8 text-blue-700 xl:size-9"
                name={stage.icon}
                priority={stage.label === "Applied"}
              />
              <p
                className={`min-w-0 text-sm font-semibold ${
                  isActive ? "text-blue-700" : "text-slate-950"
                }`}
              >
                {stage.label}
              </p>
              <div className="col-span-2 h-2 overflow-hidden rounded-full bg-blue-950/10 xl:col-span-1 xl:h-2.5">
                <div
                  aria-label={`${stage.label}: ${percent}%`}
                  className={`h-full rounded-full ${
                    isActive ? "bg-blue-600" : "bg-blue-300"
                  }`}
                  role="img"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="col-span-2 flex items-center justify-between px-1 xl:contents">
                <p
                  className={`text-base font-semibold tracking-normal xl:text-right xl:text-lg ${
                    stage.accent ?? "text-slate-950"
                  }`}
                >
                  {count}
                </p>
                <p className="text-xs font-semibold text-blue-950/70 xl:text-right xl:text-sm">
                  {percent}%
                </p>
              </div>
            </div>
          )
        })}

        <div className="flex items-center justify-between border-t border-blue-950/10 pt-4 text-sm font-semibold text-slate-950">
          <span>Total</span>
          <span>3 Applications</span>
        </div>
      </div>
    </section>
  )
}

function PublicNextActionCard({
  focus,
}: {
  focus: PublicStatusApplicationDto | undefined
}) {
  if (!focus) {
    return null
  }

  const timelineValue = formatDateTime(focus.nextActionAt ?? focus.updatedAt)
  const badge = formatDate(focus.nextActionAt ?? focus.updatedAt, {
    month: "short",
    day: "numeric",
  })
  const statusLabel = statusLabels[focus.status]

  return (
    <NextActionCard
      badge={badge}
      contactDetail={focus.companyName}
      contactLabel="Company"
      contactName={focus.companyName}
      note={focus.publicNote ?? "No public note shared yet."}
      noteTitle="Shared note"
      primaryText={`${statusLabel} at ${focus.companyName}`}
      secondaryText={`${focus.jobTitle} is visible on the public tracker.`}
      showActions={false}
      timelineDetail={focus.nextActionAt ? "Next public action" : "Last public update"}
      timelineLabel={focus.nextActionAt ? "Next action" : "Timeline"}
      timelineValue={timelineValue}
    />
  )
}

function PublicOverviewStats({
  applications,
}: {
  applications: PublicStatusApplicationDto[]
}) {
  const activeCount = applications.filter(
    (application) =>
      !["rejected", "ghosted", "paused"].includes(application.status)
  ).length
  const waitingCount = applications.filter(
    (application) => application.status === "waiting_response"
  ).length
  const interviewCount = applications.filter((application) =>
    ["interview_planned", "interview_done"].includes(application.status)
  ).length
  const offerCount = applications.filter(
    (application) => application.status === "offer"
  ).length

  const stats = [
    {
      detail: [`${applications.length} visible publicly`],
      icon: "icon_map.png",
      title: "Active applications",
      value: activeCount,
    },
    {
      detail: ["Waiting for replies"],
      icon: "icon_camp.png",
      title: "Waiting responses",
      tone: "text-orange-600",
      value: waitingCount,
    },
    {
      detail: ["Planned and completed"],
      icon: "icon_mountain.png",
      title: "Interview pipeline",
      value: interviewCount,
    },
    {
      detail: ["Offer stage", "Best outcome so far"],
      icon: "icon_camp.png",
      title: "Offers",
      tone: "text-orange-600",
      value: offerCount,
    },
  ]

  return (
    <section
      className="grid scroll-mt-28 grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] gap-3 pt-1 sm:gap-4 sm:pt-2"
      id="overview"
    >
      {stats.map((stat) => (
        <article
          className="relative overflow-hidden rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:p-6"
          key={stat.title}
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-3/5 bg-gradient-to-l from-blue-200/90 via-blue-100/55 to-transparent" />
          <PublicIcon
            className={`pointer-events-none absolute right-3 top-1/2 size-24 -translate-y-1/2 object-contain opacity-95 sm:right-4 sm:size-32 lg:right-2 lg:size-28 xl:right-4 xl:size-32 ${
              stat.tone ?? "text-blue-700"
            }`}
            name={stat.icon}
            priority
          />
          <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-5">
            <div className="min-w-0 pr-24 sm:pr-36 lg:pr-24 xl:pr-32">
              <h2 className="text-sm font-semibold text-blue-950 sm:text-base">
                {stat.title}
              </h2>
              <p className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:mt-4 sm:text-4xl">
                {stat.value}
              </p>
              <div className="mt-1.5 space-y-0.5 text-xs font-medium leading-5 text-blue-950/75 sm:mt-2 sm:space-y-1 sm:text-sm">
                {stat.detail.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function getUpdateTitle(application: PublicStatusApplicationDto) {
  if (application.status === "interview_planned") {
    return `Interview planned with ${application.companyName}`
  }

  if (application.status === "interview_done") {
    return `Interview completed with ${application.companyName}`
  }

  if (application.status === "waiting_response" || application.status === "applied") {
    return `Application submitted to ${application.companyName}`
  }

  return `${statusLabels[application.status]} at ${application.companyName}`
}

function RecentUpdates({
  applications,
}: {
  applications: PublicStatusApplicationDto[]
}) {
  const sortedApplications = [...applications].sort(
    (first, second) =>
      new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime()
  )

  return (
    <section className="rounded-2xl border border-white/80 bg-white/88 p-5 shadow-xl shadow-blue-950/10 backdrop-blur-xl md:p-7">
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
          <HugeiconsIcon className="size-8" icon={Calendar03Icon} strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-normal text-slate-950">
            Recent applications
          </h2>
          <p className="mt-1 text-sm font-semibold text-blue-950/80">
            A read-only timeline of the latest public updates.
          </p>
        </div>
      </div>

      <div className="relative mt-6 space-y-0 pl-3 md:pl-10">
        {sortedApplications.length > 1 ? (
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[calc(0.75rem+1rem-0.5px)] top-7 w-px bg-blue-200 md:left-[calc(2.5rem+1rem-0.5px)]"
          />
        ) : null}
        {sortedApplications.map((application) => (
          <div
            className="grid grid-cols-[2rem_3.5rem_1fr] gap-3 md:grid-cols-[2rem_4rem_1fr_auto]"
            key={`${application.companyName}-${application.jobTitle}`}
          >
            <div className="relative z-10 flex justify-center">
              <span className="mt-7 size-3 rounded-full border-2 border-blue-500 bg-white" />
            </div>
            <div className="flex justify-center py-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-blue-50">
                <PublicIcon className="size-9" name={statusIconMap[application.status]} />
              </div>
            </div>
            <div className="min-w-0 border-b border-blue-950/10 py-4">
              <h3 className="font-semibold text-slate-950">
                {getUpdateTitle(application)}
              </h3>
              <p className="mt-1 text-sm font-medium text-blue-950/75">
                {application.jobTitle}
              </p>
            </div>
            <time
              className="col-start-3 pb-4 text-sm font-semibold text-blue-950/75 md:col-start-auto md:border-b md:border-blue-950/10 md:py-5"
              dateTime={application.updatedAt}
            >
              <HugeiconsIcon
                className="mr-2 inline size-4 align-[-2px] text-blue-900/80"
                icon={Calendar03Icon}
              />
              {formatDate(application.updatedAt)}
            </time>
          </div>
        ))}
      </div>
    </section>
  )
}

function PublicStatusHeader({
  isAuthenticated,
  profile,
}: {
  isAuthenticated: boolean
  profile: PublicStatusProfileDto
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <header className="max-w-2xl pt-1 lg:pt-2">
        <p className="flex items-center gap-3 text-sm font-semibold text-blue-700">
          <HugeiconsIcon className="size-5" icon={Shield01Icon} strokeWidth={2} />
          Public read-only dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:mt-4 lg:text-5xl">
          {profile.displayName}&apos;s Job Search
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-950/75 sm:text-base sm:leading-8 lg:mt-5">
          A public view of the job search: visible pipeline health, next steps,
          and recent updates without private notes or edit controls.
        </p>
      </header>

      <div className="flex shrink-0 flex-wrap items-center justify-start gap-3 pr-1 text-sm font-semibold text-slate-950 lg:justify-end lg:gap-4">
        <span className="flex items-center gap-2">
          <HugeiconsIcon className="size-5" icon={Calendar03Icon} />
          Last updated {formatDate(profile.updatedAt)}
        </span>
        {isAuthenticated ? (
          <Button
            asChild
            className="h-9 rounded-lg border-blue-100 bg-white/75 px-4 text-sm font-semibold text-slate-950 shadow-sm shadow-blue-950/5 hover:bg-white"
            size="sm"
            variant="outline"
          >
            <Link href="/">
              Return to dashboard
              <HugeiconsIcon
                aria-hidden="true"
                className="ml-2 size-4"
                icon={DashboardSquare01Icon}
                strokeWidth={2}
              />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  )
}

function PublicStatusContent({
  applications,
  currentFocus,
  isAuthenticated,
  profile,
}: {
  applications: PublicStatusApplicationDto[]
  currentFocus: PublicStatusApplicationDto | undefined
  isAuthenticated: boolean
  profile: PublicStatusProfileDto
}) {
  return (
    <>
      <PublicStatusHeader
        isAuthenticated={isAuthenticated}
        profile={profile}
      />

      <PublicOverviewStats applications={applications} />

      <section
        className="grid scroll-mt-28 gap-4 md:gap-4 xl:grid-cols-[1.08fr_0.94fr]"
        id="journey"
      >
        <JourneyCard applications={applications} />
        <div className="grid">
          <PublicNextActionCard focus={currentFocus} />
        </div>
      </section>
      <div className="scroll-mt-28" id="updates">
        <RecentUpdates applications={applications} />
      </div>
    </>
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
  const publicStatus = mockPublicStatusEnabledResponse

  if (publicStatus.kind === "disabled") {
    const privateMessage = (
      <PrivateStatusMessage
        isAuthenticated={isAuthenticated}
        slug={slug}
      />
    )

    return (
      <StatusPageFrame isAuthenticated={isAuthenticated}>
        {privateMessage}
      </StatusPageFrame>
    )
  }

  const { profile, applications } = publicStatus
  const currentFocus = getCurrentFocus(applications)

  const statusContent = (
    <StatusPageContentFrame>
      <PublicStatusContent
        applications={applications}
        currentFocus={currentFocus}
        isAuthenticated={isAuthenticated}
        profile={profile}
      />
    </StatusPageContentFrame>
  )

  return (
    <StatusPageFrame isAuthenticated={isAuthenticated}>
      {statusContent}
    </StatusPageFrame>
  )
}

import {
  Calendar03Icon,
  DashboardSquare01Icon,
  HeartCheckIcon,
  QuoteUpIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import { LandingNavbar } from "@/components/layout/landing-navbar"
import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"
import { authCookieName } from "@/lib/auth/cookies"
import { mockPublicStatusEnabledResponse } from "@/lib/api/fixtures"
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
              Job Search Journey
            </h2>
            <p className="mt-0.5 text-xs font-medium text-blue-950/75 xl:mt-1 xl:text-sm">
              Here&apos;s where things stand right now.
            </p>
          </div>
        </div>
        <span className="rounded-lg border border-blue-100 bg-white/70 px-3 py-1.5 text-xs font-semibold text-blue-950/75 xl:px-4 xl:py-2 xl:text-sm">
          {applications.length} tracked
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
          <span>Current stage</span>
          <span>{activeStage}</span>
        </div>
      </div>
    </section>
  )
}

function CurrentFocusCard({
  focus,
}: {
  focus: PublicStatusApplicationDto | undefined
}) {
  if (!focus) {
    return null
  }

  return (
    <section className="flex flex-col rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 xl:min-h-[22rem] xl:p-6">
      <div className="flex items-start justify-between gap-3 xl:gap-4">
        <div className="flex min-w-0 gap-3 xl:gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100/80 xl:size-14">
            <PublicIcon
              className="size-8 text-blue-700 xl:size-10"
              name={statusIconMap[focus.status]}
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-950 xl:text-xl">
              Current focus
            </h2>
            <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-slate-950 xl:mt-4 xl:text-base xl:leading-7">
              {focus.companyName}
            </p>
            <p className="mt-1 max-w-xs text-xs font-medium leading-5 text-blue-950/75 xl:mt-2 xl:text-sm xl:leading-6">
              {focus.jobTitle}
            </p>
          </div>
        </div>
        <span className="rounded-lg border border-blue-100 bg-white/70 px-3 py-1.5 text-xs font-semibold text-blue-950/75 xl:px-4 xl:py-2 xl:text-sm">
          {statusLabels[focus.status]}
        </span>
      </div>

      <div className="mt-4 grid gap-3 xl:mt-7 xl:grid-cols-2">
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 xl:p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-950/55">
            Timeline
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {formatDateTime(focus.nextActionAt ?? focus.updatedAt)}
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            {focus.nextActionAt ? "Next action" : "Last update"}
          </p>
        </div>
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 xl:p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-950/55">
            Status
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {statusLabels[focus.status]}
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            Latest public signal
          </p>
        </div>
      </div>

      {focus.publicNote ? (
        <div className="mt-3 rounded-lg border border-blue-950/10 bg-blue-50/45 p-3 xl:mt-4 xl:p-4">
          <p className="text-sm font-semibold text-slate-950">
            Shared note
          </p>
          <p className="mt-2 flex gap-3 text-sm font-medium leading-6 text-blue-950/70">
            <HugeiconsIcon
              className="mt-1 size-4 shrink-0 text-blue-700"
              icon={QuoteUpIcon}
            />
            <span>{focus.publicNote}</span>
          </p>
        </div>
      ) : null}
    </section>
  )
}

function PublicOverviewStats({
  applications,
}: {
  applications: PublicStatusApplicationDto[]
}) {
  const plannedCount = applications.filter(
    (application) => application.status === "interview_planned"
  ).length
  const activeCount = applications.filter(
    (application) =>
      !["rejected", "ghosted", "paused"].includes(application.status)
  ).length
  const offerCount = applications.filter(
    (application) => application.status === "offer"
  ).length

  const stats = [
    {
      detail: ["Applications in view", "Updated publicly"],
      icon: "AppliedStatusIcon.svg",
      title: "Tracked",
      value: applications.length,
    },
    {
      detail: ["Still moving", "Across the pipeline"],
      icon: "WaitingStatusIcon.svg",
      title: "Active",
      value: activeCount,
    },
    {
      detail: ["Interviews booked", "Next conversations"],
      icon: "PlannedStatusIcon.svg",
      title: plannedCount === 1 ? "Interview" : "Interviews",
      value: plannedCount,
    },
    {
      detail: ["Offer stage", "Best outcome so far"],
      icon: "OfferStatusIcon.svg",
      title: offerCount === 1 ? "Offer" : "Offers",
      value: offerCount,
    },
  ]

  return (
    <section
      className="grid scroll-mt-28 gap-3 pt-1 sm:gap-4 sm:pt-2 md:grid-cols-2 xl:grid-cols-4"
      id="overview"
    >
      {stats.map((stat) => (
        <article
          className="rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:p-6"
          key={stat.title}
        >
          <div className="flex items-center justify-between gap-3 sm:gap-5">
            <div className="min-w-0">
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
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100/70 sm:size-20 lg:size-24">
              <PublicIcon
                className="size-10 sm:size-12 lg:size-16"
                name={stat.icon}
              />
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
            Recent Updates
          </h2>
          <p className="mt-1 text-sm font-semibold text-blue-950/80">
            A timeline of the latest progress.
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
  profile,
}: {
  profile: PublicStatusProfileDto
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <header className="max-w-2xl pt-1 md:pt-2">
        <p className="flex items-center gap-3 text-sm font-semibold text-blue-700">
          <HugeiconsIcon className="size-5" icon={Shield01Icon} strokeWidth={2} />
          This is a public update page
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl md:mt-4 md:text-5xl">
          {profile.displayName}&apos;s Job Search
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-950/75 sm:text-base sm:leading-8 md:mt-5">
          I&apos;m on a mission to find the right role where I can build, grow,
          and make an impact.
        </p>
      </header>

      <div className="flex shrink-0 flex-wrap items-center justify-start gap-3 pr-1 text-sm font-semibold text-slate-950 md:justify-end md:gap-4">
        <HugeiconsIcon className="size-5" icon={Calendar03Icon} />
        <span>Last updated {formatDate(profile.updatedAt)}</span>
      </div>
    </div>
  )
}

function PublicStatusContent({
  applications,
  currentFocus,
  profile,
}: {
  applications: PublicStatusApplicationDto[]
  currentFocus: PublicStatusApplicationDto | undefined
  profile: PublicStatusProfileDto
}) {
  return (
    <>
      <PublicStatusHeader profile={profile} />

      <PublicOverviewStats applications={applications} />

      <section
        className="grid scroll-mt-28 gap-4 md:gap-4 xl:grid-cols-[1.08fr_0.94fr]"
        id="journey"
      >
        <JourneyCard applications={applications} />
        <div className="grid">
          <CurrentFocusCard focus={currentFocus} />
        </div>
      </section>
      <div className="scroll-mt-28" id="updates">
        <RecentUpdates applications={applications} />
      </div>

      <footer className="mb-6 mt-3 flex items-center justify-center gap-4 rounded-xl border border-white/80 bg-white/78 px-5 py-5 text-center text-base font-semibold text-slate-950 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
        <HugeiconsIcon className="size-9 shrink-0 text-blue-700" icon={HeartCheckIcon} strokeWidth={1.8} />
        <span>Thanks for following along and cheering me on!</span>
      </footer>
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
  const cookieStore = await cookies()
  const hasAuthCookie = cookieStore.has(authCookieName)
  const publicStatus = mockPublicStatusEnabledResponse

  if (publicStatus.kind === "disabled") {
    if (hasAuthCookie) {
      return (
        <PageShell
          background="landing"
          className="max-w-screen-2xl gap-5 px-4 py-5 sm:px-5 md:gap-5 md:px-8 md:py-8 xl:px-10"
        >
          <div className="mx-auto w-full max-w-3xl rounded-xl border border-white/80 bg-white/78 p-8 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
            <p className="text-sm font-semibold text-blue-700">Public status / {slug}</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal">
              This status page is private
            </h1>
            <p className="mt-3 leading-7 text-blue-950/70">{publicStatus.message}</p>
            <Button asChild className="mt-7 rounded-lg">
              <Link href="/">
                <HugeiconsIcon icon={DashboardSquare01Icon} />
                Return to dashboard
              </Link>
            </Button>
          </div>
        </PageShell>
      )
    }

    return (
      <main className="relative isolate min-h-svh overflow-hidden bg-[#f6faff] text-slate-950">
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
        />
        <div className="fixed inset-0 z-[1] bg-[linear-gradient(225deg,rgb(255_255_255/0.04)_0%,rgb(255_255_255/0.2)_34%,rgb(255_255_255/0.72)_62%,rgb(246_250_255/0.96)_100%)]" />
        <div className="fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0)_0%,rgb(255_255_255/0.1)_32%,rgb(246_250_255/0.86)_78%)]" />
        <LandingNavbar navItems={publicStatusNavItems} />
        <div className="relative z-10 px-6 py-10">
          <div className="mx-auto max-w-3xl rounded-xl border border-white/80 bg-white/78 p-8 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
            <p className="text-sm font-semibold text-blue-700">Public status / {slug}</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal">
              This status page is private
            </h1>
            <p className="mt-3 leading-7 text-blue-950/70">{publicStatus.message}</p>
          </div>
        </div>
      </main>
    )
  }

  const { profile, applications } = publicStatus
  const currentFocus = getCurrentFocus(applications)

  if (hasAuthCookie) {
    return (
      <PageShell
        background="landing"
        className="max-w-screen-2xl gap-5 px-4 py-5 sm:px-5 md:gap-5 md:px-8 md:py-8 xl:px-10"
      >
        <PublicStatusContent
          applications={applications}
          currentFocus={currentFocus}
          profile={profile}
        />
      </PageShell>
    )
  }

  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#f6faff] text-slate-950">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
      />
      <div className="fixed inset-0 z-[1] bg-[linear-gradient(225deg,rgb(255_255_255/0.04)_0%,rgb(255_255_255/0.2)_34%,rgb(255_255_255/0.72)_62%,rgb(246_250_255/0.96)_100%)]" />
      <div className="fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0)_0%,rgb(255_255_255/0.1)_32%,rgb(246_250_255/0.86)_78%)]" />

      <LandingNavbar navItems={publicStatusNavItems} />

      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col gap-5 px-4 py-5 sm:px-5 md:gap-5 md:px-8 md:py-8 xl:px-10">
        <PublicStatusContent
          applications={applications}
          currentFocus={currentFocus}
          profile={profile}
        />
      </div>
    </main>
  )
}

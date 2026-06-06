import {
  ArrowLeft01Icon,
  Calendar03Icon,
  DashboardSquare01Icon,
  Globe02Icon,
  HeartCheckIcon,
  QuoteUpIcon,
  Shield01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { authCookieName } from "@/lib/auth/cookies"
import { mockPublicStatusEnabledResponse } from "@/lib/api/fixtures"
import type { ApplicationStatus, PublicStatusApplicationDto } from "@/lib/api/types"

const iconPath = "/dashboard-icons"

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
    <section className="rounded-2xl border border-white/80 bg-white/88 p-5 shadow-xl shadow-blue-950/10 backdrop-blur-xl md:p-7">
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-50">
          <PublicIcon className="size-10" name="MountainMark.svg" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-normal text-slate-950">
            Job Search Journey
          </h2>
          <p className="mt-1 text-sm font-semibold text-blue-950/80">
            Here&apos;s where things stand right now.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto pb-1">
        <div className="relative grid min-w-[620px] grid-cols-5 gap-4 px-3">
          <div className="absolute left-[10%] right-[10%] top-[78px] h-0.5 bg-blue-950/28" />
          {journeyStages.map((stage) => {
            const count = applications.filter((application) =>
              stage.statuses.includes(application.status)
            ).length
            const isActive = stage.label === activeStage

            return (
              <div
                className="relative z-10 flex flex-col items-center text-center"
                key={stage.label}
              >
                <PublicIcon
                  className="size-16 object-contain"
                  name={stage.icon}
                  priority={stage.label === "Applied"}
                />
                <span
                  className={`mt-1 size-5 rounded-full border-2 bg-white ${
                    isActive
                      ? "border-blue-600 bg-blue-600 shadow-[0_0_0_7px_rgb(219_234_254/0.9)]"
                      : "border-blue-900/35"
                  }`}
                />
                <p
                  className={`mt-4 text-sm font-semibold ${
                    isActive ? "text-blue-700" : "text-slate-950"
                  }`}
                >
                  {stage.label}
                </p>
                <p
                  className={`mt-2 text-3xl font-semibold tracking-normal ${
                    stage.accent ?? "text-slate-950"
                  }`}
                >
                  {count}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-blue-50/85 px-4 py-3 text-center text-sm font-semibold text-blue-700">
        <HugeiconsIcon className="size-5 shrink-0" icon={SparklesIcon} strokeWidth={2} />
        <span>
          Staying focused and having great conversations. Thank you for your support!
        </span>
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
    <section className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/88 p-6 shadow-xl shadow-blue-950/10 backdrop-blur-xl md:p-8">
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex size-28 shrink-0 items-center justify-center rounded-full bg-blue-50 md:size-36">
          <PublicIcon className="size-20 md:size-24" name={statusIconMap[focus.status]} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-normal text-blue-700">
            Current focus
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-normal text-slate-950">
            {focus.companyName}
          </h2>
          <p className="mt-1 text-xl font-medium text-blue-950/80">
            {focus.jobTitle}
          </p>
          <div className="mt-4 flex w-fit max-w-full items-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-950">
            <HugeiconsIcon className="size-4 shrink-0 text-blue-700" icon={Calendar03Icon} />
            <span className="text-blue-700">{statusLabels[focus.status]}</span>
            <span aria-hidden="true" className="text-blue-950/40">
              -
            </span>
            <time className="truncate" dateTime={focus.nextActionAt ?? focus.updatedAt}>
              {formatDateTime(focus.nextActionAt ?? focus.updatedAt)}
            </time>
          </div>
          {focus.publicNote ? (
            <p className="mt-5 flex gap-3 text-base font-medium leading-7 text-blue-950/80">
              <HugeiconsIcon className="mt-1 size-5 shrink-0 text-blue-700" icon={QuoteUpIcon} />
              <span>{focus.publicNote}</span>
            </p>
          ) : null}
        </div>
      </div>

      <PublicIcon
        className="absolute bottom-0 right-5 z-0 hidden h-auto w-72 opacity-75 md:block"
        name="PineLandscape.svg"
      />
      <div
        aria-hidden="true"
        className="absolute right-44 top-12 hidden text-blue-900/70 md:block"
      >
        <span className="absolute h-2 w-5 rounded-[50%] border-t-2 border-blue-800 rotate-12" />
        <span className="absolute left-8 top-3 h-2 w-5 rounded-[50%] border-t-2 border-blue-800 -rotate-12" />
        <span className="absolute left-16 top-9 h-2 w-5 rounded-[50%] border-t-2 border-blue-800 rotate-12" />
      </div>
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
    return (
      <main className="min-h-svh bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white bg-white p-8 shadow-xl shadow-blue-950/10">
          <p className="text-sm font-semibold text-blue-700">Public status / {slug}</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal">
            This status page is private
          </h1>
          <p className="mt-3 leading-7 text-blue-950/70">{publicStatus.message}</p>
          {hasAuthCookie ? (
            <Button asChild className="mt-7 rounded-lg">
              <Link href="/">
                <HugeiconsIcon icon={DashboardSquare01Icon} />
                Return to dashboard
              </Link>
            </Button>
          ) : null}
        </div>
      </main>
    )
  }

  const { profile, applications } = publicStatus
  const currentFocus = getCurrentFocus(applications)

  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#f6faff] text-slate-950">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-[460px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
      />
      <div className="absolute inset-x-0 top-0 z-[1] h-[520px] bg-[linear-gradient(180deg,rgb(255_255_255/0)_0%,rgb(246_250_255/0.72)_70%,rgb(246_250_255)_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_left_top,rgb(255_255_255/0.9),rgb(255_255_255/0.55)_40%,rgb(255_255_255/0)_72%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 md:px-8 md:py-9">
        <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link className="flex w-fit items-center gap-3 text-lg font-semibold text-slate-950" href="/">
            <PublicIcon className="size-11" name="MountainMark.svg" priority />
            <span>NoNeed2Ask</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {hasAuthCookie ? (
              <Button
                asChild
                className="h-10 rounded-lg border-blue-100 bg-white/78 px-4 font-semibold text-slate-950 shadow-sm shadow-blue-950/10 hover:bg-white"
                variant="outline"
              >
                <Link href="/">
                  <HugeiconsIcon className="size-4" icon={ArrowLeft01Icon} />
                  Dashboard
                </Link>
              </Button>
            ) : null}
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <HugeiconsIcon className="size-5" icon={Globe02Icon} strokeWidth={2} />
              <span>Public page</span>
            </div>
          </div>
        </nav>

        <header className="max-w-2xl pt-8 md:pt-14">
          <p className="flex items-center gap-3 text-sm font-semibold text-blue-700">
            <HugeiconsIcon className="size-5" icon={Shield01Icon} strokeWidth={2} />
            This is a public update page
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-normal text-slate-950 md:text-6xl">
            {profile.displayName}&apos;s Job Search
          </h1>
          <p className="mt-5 max-w-lg text-lg font-medium leading-8 text-blue-950/80">
            I&apos;m on a mission to find the right role where I can build, grow,
            and make an impact.
          </p>
          <p className="mt-7 flex items-center gap-3 text-base font-semibold text-blue-950/85">
            <HugeiconsIcon className="size-5" icon={Calendar03Icon} />
            <span>Last updated {formatDate(profile.updatedAt)}</span>
          </p>
        </header>

        <JourneyCard applications={applications} />
        <CurrentFocusCard focus={currentFocus} />
        <RecentUpdates applications={applications} />

        <footer className="mb-6 mt-3 flex items-center justify-center gap-4 rounded-2xl bg-blue-50/90 px-5 py-6 text-center text-lg font-semibold text-slate-950 shadow-sm shadow-blue-950/5">
          <HugeiconsIcon className="size-9 shrink-0 text-blue-700" icon={HeartCheckIcon} strokeWidth={1.8} />
          <span>Thanks for following along and cheering me on!</span>
        </footer>
      </div>
    </main>
  )
}

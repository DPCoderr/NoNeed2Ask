import Link from "next/link"
import {
  ArrowLeft,
  CalendarClock,
  Clock3,
  Edit3,
  LockKeyhole,
  Share2,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { normalizeApplicationStatus } from "@/lib/api/application-status"
import type { ApplicationStatus } from "@/lib/api/types"

import { loadApplication } from "../_lib/load-application"

const statusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interview_planned: "Interview planned",
  interview_done: "Interview done",
  offer: "Offer",
  rejected: "Rejected",
  paused: "Paused",
}

const statusClasses: Record<ApplicationStatus, string> = {
  applied: "border-blue-200 bg-blue-50 text-blue-700",
  interview_planned: "border-sky-200 bg-sky-50 text-sky-700",
  interview_done: "border-indigo-200 bg-indigo-50 text-indigo-700",
  offer: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-rose-200 bg-rose-50 text-rose-700",
  paused: "border-violet-200 bg-violet-50 text-violet-700",
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not scheduled"
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not scheduled"
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

function getCompanyInitial(companyName: string) {
  return companyName.trim().charAt(0).toUpperCase() || "?"
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-white/75 p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
        <dt className="text-xs font-semibold uppercase tracking-normal">
          {label}
        </dt>
      </div>
      <dd className="mt-3 text-sm font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  )
}

function NoteBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string | null
}) {
  return (
    <section className="min-w-0 rounded-lg border border-border/80 bg-white/75 p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
        <h2 className="text-sm font-semibold text-foreground">{label}</h2>
      </div>
      <p className="mt-4 min-h-24 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
        {value ?? "No note added yet."}
      </p>
    </section>
  )
}

function SectionHeading({
  description,
  title,
}: {
  description: string
  title: string
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

type ApplicationDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params
  const application = await loadApplication(id)
  const status = normalizeApplicationStatus(application.status)

  return (
    <PageShell
      background="landing"
      className="max-w-none gap-6 px-4 py-4 sm:px-5 md:px-8 xl:px-10 xl:py-6"
    >
      <Card className="mx-auto w-full max-w-5xl rounded-2xl border-white/80 bg-white/92 shadow-xl shadow-blue-950/10 backdrop-blur-xl">
        <CardHeader className="border-b border-border/70">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-xl font-semibold text-blue-800 shadow-sm">
                {getCompanyInitial(application.companyName)}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-blue-700">
                    Private application
                  </p>
                  <span
                    className={`inline-flex w-fit items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}
                  >
                    {statusLabels[status]}
                  </span>
                </div>
                <CardTitle className="mt-2 break-words text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl xl:text-4xl">
                  {application.companyName}
                </CardTitle>
                <p className="mt-2 text-base font-medium leading-7 text-blue-950/75">
                  {application.jobTitle}
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:w-auto lg:min-w-64">
              <Button
                asChild
                className="h-10 rounded-lg px-4 sm:col-span-1"
                variant="outline"
              >
                <Link href="/applications">
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  Back
                </Link>
              </Button>
              <Button
                asChild
                className="h-10 rounded-lg px-4 sm:col-span-1"
              >
                <Link href={`/applications/${application.id}/update`}>
                  <Edit3 aria-hidden="true" className="size-4" />
                  Edit
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="bg-muted/20 p-5 sm:p-6">
          <section>
            <SectionHeading
              description="The dates you can act on stay prominent, with notes close by for context."
              title="Application details"
            />

            <dl className="mt-5 grid gap-3 md:grid-cols-2">
              <DetailItem
                icon={CalendarClock}
                label="Last contact"
                value={formatDateTime(application.lastContactAt)}
              />
              <DetailItem
                icon={Clock3}
                label="Next action"
                value={formatDateTime(application.nextActionAt)}
              />
            </dl>

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              <NoteBlock
                icon={Share2}
                label="Public note"
                value={application.publicNote}
              />
              <NoteBlock
                icon={LockKeyhole}
                label="Private note"
                value={application.privateNote}
              />
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 border-t border-border/70 bg-white/80 sm:flex-row sm:items-center sm:justify-between">
          <dl className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
            <div>
              <dt className="inline font-medium">Created: </dt>
              <dd className="inline">{formatDate(application.createdAt)}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Updated: </dt>
              <dd className="inline">{formatDate(application.updatedAt)}</dd>
            </div>
          </dl>

          <Button
            asChild
            className="h-auto w-fit rounded-lg px-0 py-0 text-xs font-semibold text-destructive hover:text-destructive"
            variant="link"
          >
            <Link href={`/applications/${application.id}?delete=true`}>
              <Trash2 aria-hidden="true" className="size-3.5" />
              Delete application
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </PageShell>
  )
}

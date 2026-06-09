import type { ApplicationListSortBy, ApplicationStatus } from "@/lib/api/types"

export const pageSize = 10

export const statuses = [
  "applied",
  "waiting_response",
  "interview_planned",
  "interview_done",
  "offer",
  "rejected",
  "ghosted",
  "paused",
] satisfies ApplicationStatus[]

export const sortOptions = [
  { label: "Company", value: "company" },
  { label: "Role", value: "role" },
  { label: "Status", value: "status" },
  { label: "Last updated", value: "lastUpdated" },
] satisfies { label: string; value: ApplicationListSortBy }[]

export const sortValues = sortOptions.map((option) => option.value)

export const sortDirections = ["asc", "desc"] as const

export const statusDetails: Record<
  ApplicationStatus,
  {
    icon: string | null
    label: string
    shortLabel?: string
    className: string
  }
> = {
  applied: {
    icon: "AppliedStatusIcon.svg",
    label: "Applied",
    className: "bg-blue-50 text-blue-700",
  },
  waiting_response: {
    icon: "WaitingStatusIcon.svg",
    label: "Waiting response",
    shortLabel: "Waiting",
    className: "bg-orange-50 text-orange-700",
  },
  interview_planned: {
    icon: "PlannedStatusIcon.svg",
    label: "Interview planned",
    shortLabel: "Planned",
    className: "bg-blue-50 text-blue-700",
  },
  interview_done: {
    icon: "DoneStatusIcon.svg",
    label: "Interview done",
    shortLabel: "Done",
    className: "bg-emerald-50 text-emerald-700",
  },
  offer: {
    icon: "OfferStatusIcon.svg",
    label: "Offer",
    className: "bg-emerald-50 text-emerald-700",
  },
  rejected: {
    icon: null,
    label: "Rejected",
    className: "bg-rose-50 text-rose-700",
  },
  ghosted: {
    icon: null,
    label: "Ghosted",
    className: "bg-slate-100 text-slate-700",
  },
  paused: {
    icon: null,
    label: "Paused",
    className: "bg-violet-50 text-violet-700",
  },
}

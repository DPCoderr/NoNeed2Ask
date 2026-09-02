import {
  applicationStatusLabels,
  applicationStatuses,
} from "@/lib/api/application-status"
import type { ApplicationListSortBy, ApplicationStatus } from "@/lib/api/types"

export const pageSize = 10

export const statuses = [...applicationStatuses] satisfies ApplicationStatus[]

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
    label: applicationStatusLabels.applied,
    className: "bg-blue-50 text-blue-700",
  },
  interview_planned: {
    icon: "PlannedStatusIcon.svg",
    label: applicationStatusLabels.interview_planned,
    shortLabel: "Planned",
    className: "bg-blue-50 text-blue-700",
  },
  interview_done: {
    icon: "DoneStatusIcon.svg",
    label: applicationStatusLabels.interview_done,
    shortLabel: "Done",
    className: "bg-emerald-50 text-emerald-700",
  },
  offer: {
    icon: "OfferStatusIcon.svg",
    label: applicationStatusLabels.offer,
    className: "bg-emerald-50 text-emerald-700",
  },
  rejected: {
    icon: null,
    label: applicationStatusLabels.rejected,
    className: "bg-rose-50 text-rose-700",
  },
  paused: {
    icon: null,
    label: applicationStatusLabels.paused,
    className: "bg-violet-50 text-violet-700",
  },
}

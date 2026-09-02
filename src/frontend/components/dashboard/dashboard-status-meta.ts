import type { DashboardGlyphName } from "@/components/dashboard/dashboard-glyph"
import { applicationStatusLabels } from "@/lib/api/application-status"
import type { ApplicationStatus } from "@/lib/api/types"

export type DashboardStatusMeta = {
  barClassName: string
  headerClassName: string
  icon: DashboardGlyphName
  iconBackgroundClassName: string
  iconClassName: string
  label: string
}

export const dashboardStatusOrder = [
  "applied",
  "interview_planned",
  "interview_done",
  "offer",
  "rejected",
  "paused",
] satisfies ApplicationStatus[]

export const dashboardStatusMeta: Record<
  ApplicationStatus,
  DashboardStatusMeta
> = {
  applied: {
    label: applicationStatusLabels.applied,
    icon: "applied",
    barClassName: "bg-blue-700",
    headerClassName: "bg-blue-50 text-blue-950",
    iconBackgroundClassName: "bg-blue-50",
    iconClassName: "text-blue-700",
  },
  interview_planned: {
    label: applicationStatusLabels.interview_planned,
    icon: "planned",
    barClassName: "bg-indigo-600",
    headerClassName: "bg-indigo-50 text-indigo-950",
    iconBackgroundClassName: "bg-indigo-50",
    iconClassName: "text-indigo-600",
  },
  interview_done: {
    label: applicationStatusLabels.interview_done,
    icon: "checkpoint",
    barClassName: "bg-emerald-700",
    headerClassName: "bg-emerald-50 text-emerald-950",
    iconBackgroundClassName: "bg-emerald-50",
    iconClassName: "text-emerald-700",
  },
  offer: {
    label: applicationStatusLabels.offer,
    icon: "offer",
    barClassName: "bg-amber-500",
    headerClassName: "bg-amber-50 text-amber-950",
    iconBackgroundClassName: "bg-amber-50",
    iconClassName: "text-amber-600",
  },
  rejected: {
    label: applicationStatusLabels.rejected,
    icon: "closed-route",
    barClassName: "bg-rose-600",
    headerClassName: "bg-rose-50 text-rose-950",
    iconBackgroundClassName: "bg-rose-50",
    iconClassName: "text-rose-600",
  },
  paused: {
    label: applicationStatusLabels.paused,
    icon: "paused",
    barClassName: "bg-slate-500",
    headerClassName: "bg-slate-100 text-slate-950",
    iconBackgroundClassName: "bg-slate-100",
    iconClassName: "text-slate-600",
  },
}

export const terminalApplicationStatuses = new Set<ApplicationStatus>([
  "rejected",
  "paused",
])

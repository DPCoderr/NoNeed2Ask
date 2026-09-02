import type { DashboardGlyphName } from "@/components/dashboard/dashboard-glyph"
import type {
  ApplicationStatus,
  PrivateApplicationDto,
} from "@/lib/api/types"

export type PipelineStage = {
  barClassName: string
  count: number
  headerClassName: string
  icon: DashboardGlyphName
  iconClassName: string
  label: string
  percent: number
}

export type OverviewStat = {
  detail: string[]
  icon: DashboardGlyphName
  title: string
  tone?: string
  value: number
}

export type RecentApplication = {
  companyName: string
  dateTime: string
  id: string
  jobTitle: string
  status: ApplicationStatus
  statusIcon: DashboardGlyphName
  statusIconBackgroundClassName: string
  statusIconClassName: string
  statusLabel: string
  updatedLabel: string
}

export type DashboardNextAction = {
  badge: string
  contactDetail: string
  contactLabel: string
  contactName: string
  noteTitle: string
  notes: {
    label: string
    value: string
  }[]
  primaryText: string
  secondaryText: string
  showActions: boolean
  timelineDetail: string
  timelineLabel: string
  timelineValue: string
  title: string
}

export type DashboardData = {
  nextAction: DashboardNextAction
  overviewStats: OverviewStat[]
  pipelineStages: PipelineStage[]
  pipelineTotal: number
  recentApplications: RecentApplication[]
}

export type DashboardApplicationSource = Pick<
  PrivateApplicationDto,
  | "companyName"
  | "jobTitle"
  | "nextActionAt"
  | "publicNote"
  | "status"
  | "updatedAt"
> &
  Partial<
    Pick<
      PrivateApplicationDto,
      "createdAt" | "id" | "lastContactAt" | "privateNote"
    >
  >

export type InterviewReminder = {
  companyName: string
  dateLabel: string
  href?: string
  jobTitle: string
}

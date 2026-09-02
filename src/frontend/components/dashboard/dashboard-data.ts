import {
  dashboardStatusMeta,
  dashboardStatusOrder,
  terminalApplicationStatuses,
} from "@/components/dashboard/dashboard-status-meta"
import type {
  DashboardApplicationSource,
  DashboardData,
  DashboardNextAction,
  OverviewStat,
} from "@/components/dashboard/dashboard-types"
import { normalizeApplicationStatus } from "@/lib/api/application-status"
import type { ApplicationStatus } from "@/lib/api/types"

type BuildDashboardDataOptions = {
  recentLimit?: number
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
})

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

export function buildDashboardData(
  applications: DashboardApplicationSource[],
  now = new Date(),
  { recentLimit = 3 }: BuildDashboardDataOptions = {}
): DashboardData {
  const counts = countByStatus(applications)
  const recentApplications = getRecentApplications(applications, recentLimit)
  const pipelineStages = getPipelineStages(counts, applications.length)

  return {
    nextAction: getNextAction(applications, now),
    overviewStats: getOverviewStats(applications, counts, now),
    pipelineStages,
    pipelineTotal: applications.length,
    recentApplications,
  }
}

function countByStatus(applications: DashboardApplicationSource[]) {
  return applications.reduce<Record<ApplicationStatus, number>>(
    (counts, application) => {
      counts[normalizeApplicationStatus(application.status)] += 1
      return counts
    },
    {
      applied: 0,
      interview_planned: 0,
      interview_done: 0,
      offer: 0,
      rejected: 0,
      paused: 0,
    }
  )
}

function getPipelineStages(
  counts: Record<ApplicationStatus, number>,
  total: number
) {
  return dashboardStatusOrder.map((status) => {
    const count = counts[status]

    return {
      ...dashboardStatusMeta[status],
      count,
      percent: total === 0 ? 0 : Math.round((count / total) * 100),
    }
  })
}

function getOverviewStats(
  applications: DashboardApplicationSource[],
  counts: Record<ApplicationStatus, number>,
  now: Date
) {
  const activeApplications = applications.filter(
    (application) =>
      !terminalApplicationStatuses.has(
        normalizeApplicationStatus(application.status)
      )
  ).length
  const newThisWeek = applications.filter((application) =>
    isWithinLastDays(getCreatedAt(application), now, 7)
  ).length

  return [
    {
      detail: [`${activeApplications} active`, `${newThisWeek} new this week`],
      icon: "trailhead",
      title: "Applications",
      value: applications.length,
    },
    {
      detail: ["Upcoming interviews"],
      icon: "planned",
      title: "Interviews planned",
      value: counts.interview_planned,
    },
    {
      detail: ["Completed interviews"],
      icon: "checkpoint",
      title: "Interviews done",
      tone: "text-orange-600",
      value: counts.interview_done,
    },
    {
      detail: [
        "Offer stage",
        counts.offer > 0 ? "Best outcome so far" : "No offers yet",
      ],
      icon: "summit",
      title: "Offers",
      tone: "text-orange-600",
      value: counts.offer,
    },
  ] satisfies OverviewStat[]
}

function getRecentApplications(
  applications: DashboardApplicationSource[],
  recentLimit: number
) {
  return [...applications]
    .sort((a, b) => getTime(b.updatedAt) - getTime(a.updatedAt))
    .slice(0, recentLimit)
    .map((application) => {
      const status = normalizeApplicationStatus(application.status)
      const statusMeta = dashboardStatusMeta[status]

      return {
        status,
        companyName: application.companyName,
        dateTime: application.updatedAt,
        id: getApplicationId(application),
        jobTitle: application.jobTitle,
        statusIcon: statusMeta.icon,
        statusIconBackgroundClassName: statusMeta.iconBackgroundClassName,
        statusIconClassName: statusMeta.iconClassName,
        statusLabel: statusMeta.label,
        updatedLabel: formatDate(application.updatedAt),
      }
    })
}

function getNextAction(
  applications: DashboardApplicationSource[],
  now: Date
): DashboardNextAction {
  const nextApplication = [...applications]
    .filter((application) => {
      if (normalizeApplicationStatus(application.status) !== "interview_planned") {
        return false
      }

      if (!application.nextActionAt) {
        return false
      }

      return getTime(application.nextActionAt) >= now.getTime()
    })
    .sort((a, b) => getTime(a.nextActionAt) - getTime(b.nextActionAt))[0]

  if (!nextApplication) {
    return {
      badge: "Clear",
      contactDetail: "No company selected",
      contactLabel: "Status",
      contactName: "No interview planned",
      noteTitle: "Notes",
      notes: [
        {
          label: "Public note",
          value:
            "Add an interview date to a planned interview when you want it to show up here.",
        },
      ],
      primaryText: "No planned interview scheduled",
      secondaryText:
        "Your tracker is ready when an upcoming interview is on the calendar.",
      showActions: false,
      timelineDetail: `${applications.length} applications tracked`,
      timelineLabel: "Planned interviews",
      timelineValue: "Up to date",
      title: "Next planned interview",
    }
  }

  const nextActionDate =
    nextApplication.nextActionAt ?? nextApplication.updatedAt
  const status = normalizeApplicationStatus(nextApplication.status)
  const statusLabel = dashboardStatusMeta[status].label

  return {
    badge: formatDate(nextActionDate),
    contactDetail: nextApplication.companyName,
    contactLabel: "Application",
    contactName: nextApplication.jobTitle,
    noteTitle: "Notes",
    notes: [
      {
        label: "Public note",
        value: nextApplication.publicNote ?? "No public note added yet.",
      },
    ],
    primaryText: `Interview with ${nextApplication.companyName}`,
    secondaryText: `${statusLabel} for ${nextApplication.jobTitle}.`,
    showActions: true,
    timelineDetail: statusLabel,
    timelineLabel: "Planned for",
    timelineValue: formatDateTime(nextActionDate),
    title: "Next planned interview",
  }
}

function isWithinLastDays(value: string, now: Date, days: number) {
  const elapsedMs = now.getTime() - getTime(value)
  return elapsedMs >= 0 && elapsedMs <= days * 24 * 60 * 60 * 1000
}

function getApplicationId(application: DashboardApplicationSource) {
  return (
    application.id ??
    `${application.companyName}-${application.jobTitle}-${application.updatedAt}`
  )
}

function getCreatedAt(application: DashboardApplicationSource) {
  return application.createdAt ?? application.updatedAt
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(value))
}

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value))
}

function getTime(value: string | null) {
  return value ? new Date(value).getTime() : 0
}

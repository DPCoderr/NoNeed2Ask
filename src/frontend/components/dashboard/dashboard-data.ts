import type {
  ApplicationStatus,
  PrivateApplicationDto,
} from "@/lib/api/types";
import { normalizeApplicationStatus } from "@/lib/api/application-status";
import type { DashboardGlyphName } from "@/components/dashboard/dashboard-glyph";

export type PipelineStage = {
  barClassName: string;
  count: number;
  headerClassName: string;
  icon: DashboardGlyphName;
  iconClassName: string;
  label: string;
  percent: number;
};

export type OverviewStat = {
  detail: string[];
  icon: DashboardGlyphName;
  title: string;
  tone?: string;
  value: number;
};

export type RecentApplication = {
  companyName: string;
  dateTime: string;
  id: string;
  jobTitle: string;
  status: ApplicationStatus;
  statusIcon: DashboardGlyphName;
  statusIconBackgroundClassName: string;
  statusIconClassName: string;
  statusLabel: string;
  updatedLabel: string;
};

export type DashboardNextAction = {
  badge: string;
  contactDetail: string;
  contactLabel: string;
  contactName: string;
  noteTitle: string;
  notes: {
    label: string;
    value: string;
  }[];
  primaryText: string;
  secondaryText: string;
  showActions: boolean;
  timelineDetail: string;
  timelineLabel: string;
  timelineValue: string;
  title: string;
};

export type DashboardData = {
  nextAction: DashboardNextAction;
  overviewStats: OverviewStat[];
  pipelineStages: PipelineStage[];
  pipelineTotal: number;
  recentApplications: RecentApplication[];
};

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
  >;

type BuildDashboardDataOptions = {
  recentLimit?: number;
};

type StatusMeta = {
  barClassName: string;
  headerClassName: string;
  icon: DashboardGlyphName;
  iconBackgroundClassName: string;
  iconClassName: string;
  label: string;
};

const statusOrder = [
  "applied",
  "interview_planned",
  "interview_done",
  "offer",
  "rejected",
  "paused",
] satisfies ApplicationStatus[];

const statusMeta: Record<ApplicationStatus, StatusMeta> = {
  applied: {
    label: "Applied",
    icon: "applied",
    barClassName: "bg-blue-700",
    headerClassName: "bg-blue-50 text-blue-950",
    iconBackgroundClassName: "bg-blue-50",
    iconClassName: "text-blue-700",
  },
  interview_planned: {
    label: "Interview planned",
    icon: "planned",
    barClassName: "bg-indigo-600",
    headerClassName: "bg-indigo-50 text-indigo-950",
    iconBackgroundClassName: "bg-indigo-50",
    iconClassName: "text-indigo-600",
  },
  interview_done: {
    label: "Interview done",
    icon: "checkpoint",
    barClassName: "bg-emerald-700",
    headerClassName: "bg-emerald-50 text-emerald-950",
    iconBackgroundClassName: "bg-emerald-50",
    iconClassName: "text-emerald-700",
  },
  offer: {
    label: "Offer",
    icon: "offer",
    barClassName: "bg-amber-500",
    headerClassName: "bg-amber-50 text-amber-950",
    iconBackgroundClassName: "bg-amber-50",
    iconClassName: "text-amber-600",
  },
  rejected: {
    label: "Rejected",
    icon: "closed-route",
    barClassName: "bg-rose-600",
    headerClassName: "bg-rose-50 text-rose-950",
    iconBackgroundClassName: "bg-rose-50",
    iconClassName: "text-rose-600",
  },
  paused: {
    label: "Paused",
    icon: "paused",
    barClassName: "bg-slate-500",
    headerClassName: "bg-slate-100 text-slate-950",
    iconBackgroundClassName: "bg-slate-100",
    iconClassName: "text-slate-600",
  },
};

const terminalStatuses = new Set<ApplicationStatus>([
  "rejected",
  "paused",
]);

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function buildDashboardData(
  applications: DashboardApplicationSource[],
  now = new Date(),
  { recentLimit = 3 }: BuildDashboardDataOptions = {}
): DashboardData {
  const counts = countByStatus(applications);
  const recentApplications = getRecentApplications(applications, recentLimit);
  const pipelineStages = getPipelineStages(counts, applications.length);

  return {
    nextAction: getNextAction(applications, now),
    overviewStats: getOverviewStats(applications, counts, now),
    pipelineStages,
    pipelineTotal: applications.length,
    recentApplications,
  };
}

function countByStatus(applications: DashboardApplicationSource[]) {
  return applications.reduce<Record<ApplicationStatus, number>>(
    (counts, application) => {
      counts[normalizeApplicationStatus(application.status)] += 1;
      return counts;
    },
    {
      applied: 0,
      interview_planned: 0,
      interview_done: 0,
      offer: 0,
      rejected: 0,
      paused: 0,
    }
  );
}

function getPipelineStages(
  counts: Record<ApplicationStatus, number>,
  total: number
) {
  return statusOrder.map((status) => {
    const count = counts[status];

    return {
      ...statusMeta[status],
      count,
      percent: total === 0 ? 0 : Math.round((count / total) * 100),
    };
  });
}

function getOverviewStats(
  applications: DashboardApplicationSource[],
  counts: Record<ApplicationStatus, number>,
  now: Date
) {
  const activeApplications = applications.filter(
    (application) =>
      !terminalStatuses.has(normalizeApplicationStatus(application.status))
  ).length;
  const newThisWeek = applications.filter((application) =>
    isWithinLastDays(getCreatedAt(application), now, 7)
  ).length;

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
      detail: ["Offer stage", counts.offer > 0 ? "Best outcome so far" : "No offers yet"],
      icon: "summit",
      title: "Offers",
      tone: "text-orange-600",
      value: counts.offer,
    },
  ] satisfies OverviewStat[];
}

function getRecentApplications(
  applications: DashboardApplicationSource[],
  recentLimit: number
) {
  return [...applications]
    .sort((a, b) => getTime(b.updatedAt) - getTime(a.updatedAt))
    .slice(0, recentLimit)
    .map((application) => ({
      status: normalizeApplicationStatus(application.status),
      companyName: application.companyName,
      dateTime: application.updatedAt,
      id: getApplicationId(application),
      jobTitle: application.jobTitle,
      statusIcon: statusMeta[normalizeApplicationStatus(application.status)].icon,
      statusIconBackgroundClassName:
        statusMeta[normalizeApplicationStatus(application.status)]
          .iconBackgroundClassName,
      statusIconClassName:
        statusMeta[normalizeApplicationStatus(application.status)].iconClassName,
      statusLabel: statusMeta[normalizeApplicationStatus(application.status)].label,
      updatedLabel: formatDate(application.updatedAt),
    }));
}

function getNextAction(
  applications: DashboardApplicationSource[],
  now: Date
): DashboardNextAction {
  const nextApplication = [...applications]
    .filter((application) => {
      if (normalizeApplicationStatus(application.status) !== "interview_planned") {
        return false;
      }

      if (!application.nextActionAt) {
        return false;
      }

      return getTime(application.nextActionAt) >= now.getTime();
    })
    .sort((a, b) => getTime(a.nextActionAt) - getTime(b.nextActionAt))[0];

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
          value: "Add an interview date to a planned interview when you want it to show up here.",
        },
      ],
      primaryText: "No planned interview scheduled",
      secondaryText: "Your tracker is ready when an upcoming interview is on the calendar.",
      showActions: false,
      timelineDetail: `${applications.length} applications tracked`,
      timelineLabel: "Planned interviews",
      timelineValue: "Up to date",
      title: "Next planned interview",
    };
  }

  const nextActionDate = nextApplication.nextActionAt ?? nextApplication.updatedAt;
  const nextApplicationStatus = normalizeApplicationStatus(nextApplication.status);
  const statusLabel = statusMeta[nextApplicationStatus].label;

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
  };
}

function isWithinLastDays(value: string, now: Date, days: number) {
  const elapsedMs = now.getTime() - getTime(value);
  return elapsedMs >= 0 && elapsedMs <= days * 24 * 60 * 60 * 1000;
}

function getApplicationId(application: DashboardApplicationSource) {
  return (
    application.id ??
    `${application.companyName}-${application.jobTitle}-${application.updatedAt}`
  );
}

function getCreatedAt(application: DashboardApplicationSource) {
  return application.createdAt ?? application.updatedAt;
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

function getTime(value: string | null) {
  return value ? new Date(value).getTime() : 0;
}

import type {
  ApplicationStatus,
  PrivateApplicationDto,
} from "@/lib/api/types";

export type PipelineStage = {
  barClassName: string;
  count: number;
  icon: string;
  label: string;
  percent: number;
};

export type OverviewStat = {
  detail: string[];
  icon: string;
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
  statusIcon: string;
  statusLabel: string;
  updatedLabel: string;
};

export type DashboardNextAction = {
  badge: string;
  contactDetail: string;
  contactLabel: string;
  contactName: string;
  note: string;
  noteTitle: string;
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

type StatusMeta = {
  barClassName: string;
  icon: string;
  label: string;
};

const statusOrder = [
  "applied",
  "waiting_response",
  "interview_planned",
  "interview_done",
  "offer",
  "rejected",
  "ghosted",
  "paused",
] satisfies ApplicationStatus[];

const statusMeta: Record<ApplicationStatus, StatusMeta> = {
  applied: {
    label: "Applied",
    icon: "AppliedStatusIcon.svg",
    barClassName: "bg-blue-700",
  },
  waiting_response: {
    label: "Waiting response",
    icon: "WaitingStatusIcon.svg",
    barClassName: "bg-orange-600",
  },
  interview_planned: {
    label: "Interview planned",
    icon: "PlannedStatusIcon.svg",
    barClassName: "bg-indigo-600",
  },
  interview_done: {
    label: "Interview done",
    icon: "DoneStatusIcon.svg",
    barClassName: "bg-emerald-700",
  },
  offer: {
    label: "Offer",
    icon: "OfferStatusIcon.svg",
    barClassName: "bg-violet-700",
  },
  rejected: {
    label: "Rejected",
    icon: "DoneStatusIcon.svg",
    barClassName: "bg-rose-600",
  },
  ghosted: {
    label: "Ghosted",
    icon: "WaitingStatusIcon.svg",
    barClassName: "bg-slate-500",
  },
  paused: {
    label: "Paused",
    icon: "PlannedStatusIcon.svg",
    barClassName: "bg-teal-600",
  },
};

const terminalStatuses = new Set<ApplicationStatus>([
  "rejected",
  "ghosted",
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
  applications: PrivateApplicationDto[],
  now = new Date()
): DashboardData {
  const counts = countByStatus(applications);
  const recentApplications = getRecentApplications(applications);
  const pipelineStages = getPipelineStages(counts, applications.length);

  return {
    nextAction: getNextAction(applications, now),
    overviewStats: getOverviewStats(applications, counts, now),
    pipelineStages,
    pipelineTotal: applications.length,
    recentApplications,
  };
}

function countByStatus(applications: PrivateApplicationDto[]) {
  return applications.reduce<Record<ApplicationStatus, number>>(
    (counts, application) => {
      counts[application.status] += 1;
      return counts;
    },
    {
      applied: 0,
      waiting_response: 0,
      interview_planned: 0,
      interview_done: 0,
      offer: 0,
      rejected: 0,
      ghosted: 0,
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
  applications: PrivateApplicationDto[],
  counts: Record<ApplicationStatus, number>,
  now: Date
) {
  const activeApplications = applications.filter(
    (application) => !terminalStatuses.has(application.status)
  ).length;
  const newThisWeek = applications.filter((application) =>
    isWithinLastDays(application.createdAt, now, 7)
  ).length;
  const interviewCount = counts.interview_planned + counts.interview_done;

  return [
    {
      detail: [`${newThisWeek} new this week`],
      icon: "icon_map.png",
      title: "Active applications",
      value: activeApplications,
    },
    {
      detail: [getWaitingDetail(applications, now)],
      icon: "icon_camp.png",
      title: "Waiting responses",
      tone: "text-orange-600",
      value: counts.waiting_response,
    },
    {
      detail: [
        `${counts.interview_planned} upcoming`,
        `${counts.interview_done} completed`,
      ],
      icon: "icon_mountain.png",
      title: "Interview pipeline",
      value: interviewCount,
    },
    {
      detail: ["Offer stage", counts.offer > 0 ? "Best outcome so far" : "No offers yet"],
      icon: "icon_camp.png",
      title: "Offers",
      tone: "text-orange-600",
      value: counts.offer,
    },
  ] satisfies OverviewStat[];
}

function getRecentApplications(applications: PrivateApplicationDto[]) {
  return [...applications]
    .sort((a, b) => getTime(b.updatedAt) - getTime(a.updatedAt))
    .slice(0, 3)
    .map((application) => ({
      companyName: application.companyName,
      dateTime: application.updatedAt,
      id: application.id,
      jobTitle: application.jobTitle,
      status: application.status,
      statusIcon: statusMeta[application.status].icon,
      statusLabel: statusMeta[application.status].label,
      updatedLabel: formatDate(application.updatedAt),
    }));
}

function getNextAction(
  applications: PrivateApplicationDto[],
  now: Date
): DashboardNextAction {
  const nextApplication = [...applications]
    .filter((application) => {
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
      contactName: "Nothing scheduled",
      note: "Add a next action to an application when you want it to show up here.",
      noteTitle: "Suggested follow-up",
      primaryText: "No next action scheduled",
      secondaryText: "Your tracker is ready when there is something to follow up.",
      showActions: false,
      timelineDetail: `${applications.length} applications tracked`,
      timelineLabel: "Pipeline",
      timelineValue: "Up to date",
      title: "Next action",
    };
  }

  const nextActionDate = nextApplication.nextActionAt ?? nextApplication.updatedAt;
  const statusLabel = statusMeta[nextApplication.status].label;

  return {
    badge: formatDate(nextActionDate),
    contactDetail: nextApplication.companyName,
    contactLabel: "Application",
    contactName: nextApplication.jobTitle,
    note:
      nextApplication.privateNote ??
      nextApplication.publicNote ??
      "Review your notes and follow up with the next useful step.",
    noteTitle: "Suggested follow-up",
    primaryText: `Follow up with ${nextApplication.companyName}`,
    secondaryText: `${statusLabel} for ${nextApplication.jobTitle}.`,
    showActions: true,
    timelineDetail: statusLabel,
    timelineLabel: "Next action",
    timelineValue: formatDateTime(nextActionDate),
    title: "Next action",
  };
}

function getWaitingDetail(applications: PrivateApplicationDto[], now: Date) {
  const waitingApplications = applications.filter(
    (application) => application.status === "waiting_response"
  );

  if (waitingApplications.length === 0) {
    return "No waiting responses";
  }

  const oldestWaitingDate = waitingApplications.reduce((oldest, application) => {
    const contactDate = application.lastContactAt ?? application.createdAt;
    return getTime(contactDate) < getTime(oldest) ? contactDate : oldest;
  }, waitingApplications[0].lastContactAt ?? waitingApplications[0].createdAt);

  return `${daysBetween(oldestWaitingDate, now)} days oldest`;
}

function isWithinLastDays(value: string, now: Date, days: number) {
  const elapsedMs = now.getTime() - getTime(value);
  return elapsedMs >= 0 && elapsedMs <= days * 24 * 60 * 60 * 1000;
}

function daysBetween(value: string, now: Date) {
  const elapsedMs = now.getTime() - getTime(value);
  return Math.max(0, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)));
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

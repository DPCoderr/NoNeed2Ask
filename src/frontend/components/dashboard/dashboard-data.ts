export const pipelineStages = [
  {
    label: "Applied",
    count: 12,
    percent: 52,
    icon: "AppliedStatusIcon.svg",
    barClassName: "bg-blue-700",
  },
  {
    label: "Waiting response",
    count: 7,
    percent: 30,
    icon: "WaitingStatusIcon.svg",
    barClassName: "bg-orange-600",
  },
  {
    label: "Interview planned",
    count: 3,
    percent: 13,
    icon: "PlannedStatusIcon.svg",
    barClassName: "bg-indigo-600",
  },
  {
    label: "Interview done",
    count: 1,
    percent: 4,
    icon: "DoneStatusIcon.svg",
    barClassName: "bg-emerald-700",
  },
  {
    label: "Offer",
    count: 0,
    percent: 0,
    icon: "OfferStatusIcon.svg",
    barClassName: "bg-violet-700",
  },
];

export const pipelineTotal = pipelineStages.reduce(
  (total, stage) => total + stage.count,
  0
);

export const overviewStats = [
  {
    detail: ["4 new this week"],
    icon: "ActiveApplicationsIcon.svg",
    title: "Active applications",
    value: 12,
  },
  {
    detail: ["2 upcoming", "1 completed"],
    icon: "InterviewPipelineIcon.svg",
    title: "Interview pipeline",
    value: 3,
  },
  {
    detail: ["Avg. response time", "5.4 days"],
    icon: "WaitingResponsesIcon.svg",
    title: "Waiting responses",
    tone: "text-orange-600",
    value: 7,
  },
];

export const recentApplications = [
  {
    companyName: "Northstar Labs",
    jobTitle: "Senior Frontend Engineer",
    status: "Interview planned",
    detail: "May 24 at 2:30 PM",
    updated: "Updated May 22",
    icon: "AppliedStatusIcon.svg",
    statusIcon: "InterviewPipelineIcon.svg",
  },
  {
    companyName: "Atlas Works",
    jobTitle: "Full Stack Developer",
    status: "Interview done",
    detail: "May 21",
    updated: "Updated May 21",
    icon: "MountainMark.svg",
    statusIcon: "DoneStatusIcon.svg",
  },
  {
    companyName: "Summit Agency",
    jobTitle: "UI/UX Designer",
    status: "Waiting response",
    detail: "Applied May 19",
    updated: "Updated May 19",
    icon: "PlannedStatusIcon.svg",
    statusIcon: "WaitingStatusIcon.svg",
  },
  {
    companyName: "Pine Technologies",
    jobTitle: "Frontend Developer",
    status: "Paused",
    detail: "On hold",
    updated: "Updated May 18",
    icon: "OfferStatusIcon.svg",
    statusIcon: "NextActionIcon.svg",
  },
];

export type RecentApplication = (typeof recentApplications)[number];

import type { DashboardApplicationSource, InterviewReminder } from "@/components/dashboard/dashboard-types";
import type { AuthMeResponseDto } from "@/lib/api/auth";
import type { ApplicationStatus } from "@/lib/api/types";

export const previewUser: AuthMeResponseDto = { id: "preview-user", username: "Alex", email: "alex@example.com" };
export const previewDate = new Date("2026-09-06T09:00:00Z");

const statuses: ApplicationStatus[] = [
  "interview_planned", "applied", "interview_done", "offer", "paused", "rejected",
  "applied", "applied", "applied", "applied", "applied", "applied", "applied",
  "interview_planned", "interview_planned", "interview_planned", "interview_done", "rejected",
];
const companies = ["Northstar Labs", "Kindred Health", "Atlas Works", "Forma Studio", "Orbit", "Oak & Field"];
const roles = ["Senior Frontend Engineer", "Product Engineer", "Full Stack Developer"];

export const previewApplications: DashboardApplicationSource[] = statuses.map((status, index) => ({
  id: `preview-${index + 1}`,
  companyName: companies[index % companies.length],
  jobTitle: roles[index % roles.length],
  status,
  publicNote: null,
  privateNote: "Private sample note. Never shown on a public page.",
  createdAt: "2026-08-18T09:00:00Z",
  updatedAt: new Date(previewDate.getTime() - index * 86400000).toISOString(),
  nextActionAt: status === "interview_planned" ? "2026-09-09T10:30:00Z" : null,
}));

export const previewInterview: InterviewReminder = {
  companyName: "Northstar Labs",
  jobTitle: "Senior Frontend Engineer",
  dateLabel: "Wed, Sep 9 · 10:30 AM",
  href: "/applications/preview-1",
};

export const previewScenarios = ["Populated", "Empty", "No interview", "Loading", "Error", "Sharing unavailable", "Sharing saving", "Long names"] as const;
export type PreviewScenario = typeof previewScenarios[number];

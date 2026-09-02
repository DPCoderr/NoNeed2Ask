import type { ApplicationStatus } from "./types"

export const applicationStatuses = [
  "applied",
  "interview_planned",
  "interview_done",
  "offer",
  "rejected",
  "paused",
] as const satisfies readonly ApplicationStatus[]

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interview_planned: "Interview planned",
  interview_done: "Interview done",
  offer: "Offer",
  rejected: "Rejected",
  paused: "Paused",
}

export function normalizeApplicationStatus(status: string): ApplicationStatus {
  if (status === "waiting_response" || status === "ghosted") {
    return "applied"
  }

  if (applicationStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus
  }

  return "applied"
}

import type { ApplicationStatus } from "./types"

export const applicationStatuses = [
  "applied",
  "interview_planned",
  "interview_done",
  "offer",
  "rejected",
  "paused",
] as const satisfies readonly ApplicationStatus[]

export function normalizeApplicationStatus(status: string): ApplicationStatus {
  if (status === "waiting_response" || status === "ghosted") {
    return "applied"
  }

  if (applicationStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus
  }

  return "applied"
}

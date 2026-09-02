import { describe, expect, it } from "vitest"

import { buildDashboardData } from "@/components/dashboard/dashboard-data"
import type { DashboardApplicationSource } from "@/components/dashboard/dashboard-types"

const now = new Date("2026-09-02T12:00:00.000Z")

function application(
  overrides: Partial<DashboardApplicationSource> = {}
): DashboardApplicationSource {
  return {
    companyName: "Acme",
    jobTitle: "Engineer",
    nextActionAt: null,
    publicNote: null,
    status: "applied",
    updatedAt: "2026-09-01T12:00:00.000Z",
    ...overrides,
  }
}

describe("buildDashboardData", () => {
  it("keeps the existing empty dashboard state", () => {
    const result = buildDashboardData([], now)

    expect(result.pipelineTotal).toBe(0)
    expect(result.pipelineStages.every((stage) => stage.percent === 0)).toBe(true)
    expect(result.nextAction).toMatchObject({
      badge: "Clear",
      contactName: "No interview planned",
      showActions: false,
      timelineDetail: "0 applications tracked",
    })
  })

  it("counts statuses and limits recent applications after sorting", () => {
    const result = buildDashboardData(
      [
        application({ id: "old", updatedAt: "2026-08-29T12:00:00.000Z" }),
        application({
          id: "offer",
          status: "offer",
          updatedAt: "2026-09-02T10:00:00.000Z",
        }),
        application({
          id: "done",
          status: "interview_done",
          updatedAt: "2026-09-01T16:00:00.000Z",
        }),
      ],
      now,
      { recentLimit: 2 }
    )

    expect(result.pipelineStages.find((stage) => stage.label === "Offer")?.count).toBe(1)
    expect(result.recentApplications.map(({ id }) => id)).toEqual([
      "offer",
      "done",
    ])
  })

  it("selects the earliest future planned interview", () => {
    const result = buildDashboardData(
      [
        application({
          companyName: "Later Ltd",
          status: "interview_planned",
          nextActionAt: "2026-09-10T09:00:00.000Z",
        }),
        application({
          companyName: "Soon Inc",
          jobTitle: "Product Engineer",
          publicNote: "Prepare the demo",
          status: "interview_planned",
          nextActionAt: "2026-09-03T09:00:00.000Z",
        }),
        application({
          companyName: "Past Corp",
          status: "interview_planned",
          nextActionAt: "2026-09-01T09:00:00.000Z",
        }),
      ],
      now
    )

    expect(result.nextAction).toMatchObject({
      contactDetail: "Soon Inc",
      contactName: "Product Engineer",
      primaryText: "Interview with Soon Inc",
      showActions: true,
      timelineDetail: "Interview planned",
    })
    expect(result.nextAction.notes[0]?.value).toBe("Prepare the demo")
  })
})

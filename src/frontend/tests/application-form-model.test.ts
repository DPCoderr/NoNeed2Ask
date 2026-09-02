import { describe, expect, it } from "vitest"

import {
  getApplicationFormDefaultValues,
  getDateTimeValue,
  toApplicationRequest,
} from "@/app/(dashboard)/applications/_components/application-form/application-form-model"
import type { PrivateApplicationDto } from "@/lib/api/types"

const application: PrivateApplicationDto = {
  id: "app_1",
  companyName: "Northstar Labs",
  jobTitle: "Frontend Engineer",
  status: "interview_planned",
  publicNote: null,
  privateNote: "Prepare questions",
  lastContactAt: "2026-09-01T10:15:30.000Z",
  nextActionAt: null,
  createdAt: "2026-08-20T08:00:00.000Z",
  updatedAt: "2026-09-01T10:15:30.000Z",
}

describe("application form model", () => {
  it("returns the unchanged create defaults", () => {
    expect(getApplicationFormDefaultValues()).toEqual({
      companyName: "",
      jobTitle: "",
      status: "applied",
      publicNote: "",
      privateNote: "",
      lastContactAt: "",
      nextActionAt: "",
    })
  })

  it("maps an application to local form values", () => {
    const values = getApplicationFormDefaultValues(application)
    const localDate = new Date(application.lastContactAt!)
    const expectedDate = [
      localDate.getFullYear(),
      String(localDate.getMonth() + 1).padStart(2, "0"),
      String(localDate.getDate()).padStart(2, "0"),
    ].join("-")

    expect(values).toMatchObject({
      companyName: application.companyName,
      jobTitle: application.jobTitle,
      status: application.status,
      publicNote: "",
      privateNote: application.privateNote,
      nextActionAt: "",
    })
    expect(values.lastContactAt).toBe(
      `${expectedDate}T${String(localDate.getHours()).padStart(2, "0")}:${String(
        localDate.getMinutes()
      ).padStart(2, "0")}:${String(localDate.getSeconds()).padStart(2, "0")}`
    )
  })

  it("trims text and converts optional fields for the API", () => {
    const result = toApplicationRequest({
      companyName: "  Acme  ",
      jobTitle: " Engineer ",
      status: "offer",
      publicNote: "  Shareable  ",
      privateNote: "   ",
      lastContactAt: "2026-09-02T09:30:00",
      nextActionAt: "",
    })

    expect(result).toEqual({
      companyName: "Acme",
      jobTitle: "Engineer",
      status: "offer",
      publicNote: "Shareable",
      privateNote: null,
      lastContactAt: new Date("2026-09-02T09:30:00").toISOString(),
      nextActionAt: null,
    })
  })

  it("uses the existing default time when only a date is selected", () => {
    expect(getDateTimeValue("2026-09-02", "")).toBe(
      "2026-09-02T09:00:00"
    )
    expect(getDateTimeValue("", "12:00:00")).toBe("")
  })
})

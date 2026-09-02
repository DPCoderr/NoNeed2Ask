import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ApplicationDetail } from "@/app/(dashboard)/applications/[id]/_components/application-detail"
import { LandingPage } from "@/components/landing/landing-page"
import type { PrivateApplicationDto } from "@/lib/api/types"

const application: PrivateApplicationDto = {
  id: "app_1",
  companyName: "Northstar Labs",
  jobTitle: "Senior Frontend Engineer",
  status: "interview_planned",
  publicNote: "Interview scheduled",
  privateNote: "Prepare architecture examples",
  lastContactAt: "2026-09-01T10:00:00.000Z",
  nextActionAt: "2026-09-05T10:00:00.000Z",
  createdAt: "2026-08-20T08:00:00.000Z",
  updatedAt: "2026-09-01T10:00:00.000Z",
}

describe("landing page", () => {
  it("keeps every major section and call to action", () => {
    render(<LandingPage />)

    expect(
      screen.getByRole("heading", { level: 1, name: /Track applications/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: "From private tracking to a shareable update.",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: "Keep the search moving without keeping a spreadsheet alive.",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Answer “How is it going?” once." })
    ).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: /Create your tracker/i })).toHaveLength(2)
    expect(screen.getByText("A calm place for the job search.")).toBeInTheDocument()
    expect(document.querySelector("#dashboard")).toBeInTheDocument()
    expect(document.querySelector("#applications")).toBeInTheDocument()
    expect(document.querySelector("#public-status")).toBeInTheDocument()
  })
})

describe("application detail", () => {
  it("keeps status, notes, dates, and actions visible", () => {
    render(<ApplicationDetail application={application} />)

    expect(screen.getByText(application.companyName)).toBeInTheDocument()
    expect(screen.getByText("Interview planned")).toBeInTheDocument()
    expect(screen.getByText(application.publicNote!)).toBeInTheDocument()
    expect(screen.getByText(application.privateNote!)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
      "href",
      "/applications/app_1/update"
    )
    expect(
      screen.getByRole("link", { name: "Delete application" })
    ).toHaveAttribute("href", "/applications/app_1?delete=true")
  })
})

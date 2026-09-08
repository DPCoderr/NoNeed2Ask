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
  it("explains sharing before the private workspace and keeps the navigation destinations", () => {
    render(<LandingPage />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Your job search. One link to keep everyone updated." })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: "How it works",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: "Every application, in one place.",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Keep everyone updated, without another message." })
    ).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: /Create your tracker/i })).toHaveLength(2)
    for (const link of screen.getAllByRole("link", { name: /Create your tracker/i })) {
      expect(link).toHaveAttribute("href", "/register")
    }
    expect(screen.getByRole("link", { name: "See what they’ll see" })).toHaveAttribute("href", "#public-status")
    expect(screen.getByText(`© ${new Date().getFullYear()} NoNeed2Ask`)).toBeInTheDocument()
    expect(screen.getByText("Made by DPCoderr")).toBeInTheDocument()
    expect(document.querySelector("#dashboard")).toBeInTheDocument()
    expect(document.querySelector("#applications")).toBeInTheDocument()
    expect(document.querySelector("#public-status")).toBeInTheDocument()
    expect(Array.from(document.querySelectorAll("section[id]"), (section) => section.id)).toEqual([
      "dashboard", "public-status", "applications",
    ])
    expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute("href", "/#dashboard")
    expect(screen.getByRole("link", { name: "Private tracker" })).toHaveAttribute("href", "/#applications")
    expect(screen.getByRole("link", { name: "Public status" })).toHaveAttribute("href", "/#public-status")
    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute("href", "/login")
  })

  it("makes public visibility and private notes explicit", () => {
    render(<LandingPage />)

    expect(screen.getByText(/anyone with your link can view the page/)).toBeInTheDocument()
    expect(screen.getByText("Your private notes stay in your workspace.")).toBeInTheDocument()
    expect(screen.getByText("They can open your link without an account.")).toBeInTheDocument()
    expect(screen.getByText("You can turn public sharing off at any time.")).toBeInTheDocument()
  })
})

describe("application detail", () => {
  it("keeps status, notes, dates, and actions visible", () => {
    render(<ApplicationDetail application={application} />)

    expect(screen.getByText(application.companyName)).toBeInTheDocument()
    expect(screen.getByText("Interview planned")).toBeInTheDocument()
    expect(screen.getByText(application.publicNote!)).toBeInTheDocument()
    expect(screen.getByText(application.privateNote!)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Edit application" })).toHaveAttribute(
      "href",
      "/applications/app_1/update"
    )
    expect(
      screen.getByRole("link", { name: "Delete application" })
    ).toHaveAttribute("href", "/applications/app_1?delete=true")
  })
})

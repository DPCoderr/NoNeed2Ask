import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactNode } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ApplicationForm } from "@/app/(dashboard)/applications/_components/application-form/application-form"

const mocks = vi.hoisted(() => ({
  createApplication: vi.fn(),
  push: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  updateApplication: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mocks.back,
    push: mocks.push,
    refresh: mocks.refresh,
  }),
}))

vi.mock("@/lib/api/applications", async (importOriginal) => {
  const original = await importOriginal<
    typeof import("@/lib/api/applications")
  >()

  return {
    ...original,
    createApplication: mocks.createApplication,
    updateApplication: mocks.updateApplication,
  }
})

function QueryWrapper({
  children,
  client,
}: {
  children: ReactNode
  client: QueryClient
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe("ApplicationForm", () => {
  beforeEach(() => {
    mocks.createApplication.mockReset()
    mocks.updateApplication.mockReset()
    mocks.push.mockReset()
    mocks.refresh.mockReset()
    mocks.back.mockReset()
  })

  it("validates each step and keeps the create confirmation flow", async () => {
    const user = userEvent.setup()
    const queryClient = new QueryClient({
      defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
    })
    const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries")
    mocks.createApplication.mockResolvedValue({ id: "created-1" })

    render(
      <QueryWrapper client={queryClient}>
        <ApplicationForm mode="create" />
      </QueryWrapper>
    )

    await user.click(screen.getByRole("button", { name: "Next" }))
    expect(await screen.findByText("Company name is required.")).toBeInTheDocument()
    expect(screen.getByText("Role is required.")).toBeInTheDocument()

    await user.type(screen.getByLabelText("Company name"), "  Acme  ")
    await user.type(screen.getByLabelText("Role"), " Engineer ")
    await user.click(screen.getByRole("button", { name: "Next" }))
    expect(screen.getByText("Choose the current application status.")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Next" }))
    expect(screen.getByText("Add optional dates for contact and follow-up.")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Next" }))
    await user.type(screen.getByLabelText("Public note"), "  Shareable update  ")
    await user.click(
      screen.getByRole("button", { name: "Create application" })
    )

    const dialog = await screen.findByRole("alertdialog")
    expect(within(dialog).getByText("Create this application?")).toBeInTheDocument()
    await user.click(
      within(dialog).getByRole("button", { name: "Create application" })
    )

    await waitFor(() => {
      expect(mocks.createApplication).toHaveBeenCalledWith({
        companyName: "Acme",
        jobTitle: "Engineer",
        status: "applied",
        publicNote: "Shareable update",
        privateNote: null,
        lastContactAt: null,
        nextActionAt: null,
      })
    })
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["applications"],
    })
    expect(mocks.push).toHaveBeenCalledWith("/applications/created-1")
    expect(mocks.refresh).toHaveBeenCalled()
  })
})

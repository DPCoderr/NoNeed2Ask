import { afterEach, describe, expect, it, vi } from "vitest"

import DashboardLayout from "@/app/(dashboard)/layout"
import { warmBackend } from "@/app/(dashboard)/_lib/warm-backend"
import { LandingPage } from "@/components/landing/landing-page"
import { AppShell } from "@/components/layout/app-shell"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"
import { after } from "next/server"

vi.mock("server-only", () => ({}))
vi.mock("next/server", () => ({ after: vi.fn() }))
vi.mock("@/lib/auth/get-current-user-server", () => ({
  getCurrentUserServer: vi.fn(),
}))
vi.mock("@/lib/server/backend-urls", () => ({
  backendUrls: { auth: "https://backend.example/auth" },
}))
vi.mock("@/components/landing/landing-page", () => ({ LandingPage: vi.fn() }))
vi.mock("@/components/layout/app-shell", () => ({ AppShell: vi.fn() }))

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe("landing backend warm-up", () => {
  it("returns the landing page before making the scheduled backend request", async () => {
    vi.mocked(getCurrentUserServer).mockResolvedValue(null)
    const fetchMock = vi.fn().mockResolvedValue(new Response("Healthy"))
    vi.stubGlobal("fetch", fetchMock)

    const page = await DashboardLayout({ children: null })

    expect(page.type).toBe(LandingPage)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(after).toHaveBeenCalledExactlyOnceWith(warmBackend)
    await warmBackend()
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
      new URL("https://backend.example/alive"),
      { cache: "no-store", signal: expect.any(AbortSignal) }
    )
  })

  it("does not schedule another request for an authenticated visitor", async () => {
    vi.mocked(getCurrentUserServer).mockResolvedValue({
      id: "user-1", username: "demo", email: "demo@example.com",
    })

    const page = await DashboardLayout({ children: null })

    expect(page.type).toBe(AppShell)
    expect(after).not.toHaveBeenCalled()
  })

  it.each([new Error("offline"), new DOMException("Timed out", "TimeoutError")])(
    "contains connection failures and timeouts without retrying",
    async (error) => {
      const fetchMock = vi.fn().mockRejectedValue(error)
      vi.stubGlobal("fetch", fetchMock)
      vi.spyOn(console, "warn").mockImplementation(() => undefined)

      await expect(warmBackend()).resolves.toBeUndefined()
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(console.warn).toHaveBeenCalled()
    }
  )

  it("logs an unsuccessful response without throwing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })))
    vi.spyOn(console, "warn").mockImplementation(() => undefined)

    await expect(warmBackend()).resolves.toBeUndefined()
    expect(console.warn).toHaveBeenCalledWith("Backend warm-up failed.", { status: 503 })
  })
})

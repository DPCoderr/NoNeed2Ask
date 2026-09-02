import type { NextRequest } from "next/server"
import { afterEach, describe, expect, it, vi } from "vitest"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"

function request(method = "GET", search = "?page=2") {
  return {
    headers: new Headers({
      "content-length": "12",
      host: "frontend.local",
      origin: "https://frontend.local",
      "x-request-id": "request-1",
    }),
    method,
    nextUrl: { search },
    text: vi.fn().mockResolvedValue('{"name":"Acme"}'),
  } as unknown as NextRequest
}

describe("proxyBackendRequest", () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it("forwards query, method, body, and safe request headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("created", {
        headers: {
          "content-length": "7",
          "content-type": "text/plain",
          "x-upstream": "kept",
        },
        status: 201,
      })
    )
    vi.stubGlobal("fetch", fetchMock)

    const response = await proxyBackendRequest(
      request("POST"),
      new URL("https://api.example.com/applications"),
      "Unavailable"
    )
    const [url, options] = fetchMock.mock.calls[0]!

    expect(String(url)).toBe("https://api.example.com/applications?page=2")
    expect(options).toMatchObject({
      body: '{"name":"Acme"}',
      cache: "no-store",
      method: "POST",
    })
    expect((options.headers as Headers).get("host")).toBeNull()
    expect((options.headers as Headers).get("origin")).toBeNull()
    expect((options.headers as Headers).get("x-request-id")).toBe("request-1")
    expect(response.status).toBe(201)
    expect(response.headers.get("content-length")).toBeNull()
    expect(response.headers.get("x-upstream")).toBe("kept")
    expect(await response.text()).toBe("created")
  })

  it("does not send a body for GET requests", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal("fetch", fetchMock)

    const currentRequest = request()
    await proxyBackendRequest(
      currentRequest,
      new URL("https://api.example.com/applications"),
      "Unavailable"
    )

    expect(currentRequest.text).not.toHaveBeenCalled()
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({ body: undefined })
  })

  it("maps an unavailable upstream to the existing 502 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")))
    vi.spyOn(console, "error").mockImplementation(() => undefined)

    const response = await proxyBackendRequest(
      request(),
      new URL("https://api.example.com/applications"),
      "Applications service is unavailable."
    )

    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({
      message: "Applications service is unavailable.",
    })
  })
})

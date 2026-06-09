import type { NextRequest } from "next/server"

const backendApplicationsBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.APPLICATIONS_BASE_URL ?? "https://noneed2ask.onrender.com/applications"
    : process.env.APPLICATIONS_BASE_URL_DEV ?? "http://localhost:5273/applications"

const excludedResponseHeaders = new Set([
  "content-encoding",
  "content-length",
  "set-cookie",
  "access-control-allow-credentials",
  "access-control-allow-headers",
  "access-control-allow-methods",
  "access-control-allow-origin",
])

function createBackendHeaders(request: NextRequest) {
  const headers = new Headers(request.headers)

  headers.delete("host")
  headers.delete("origin")
  headers.delete("referer")
  headers.delete("content-length")

  return headers
}

function getSetCookieHeaders(response: Response) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[]
  }

  return headers.getSetCookie?.() ?? []
}

function createFrontendHeaders(backendResponse: Response) {
  const headers = new Headers()

  backendResponse.headers.forEach((value, key) => {
    if (!excludedResponseHeaders.has(key)) {
      headers.set(key, value)
    }
  })

  for (const cookie of getSetCookieHeaders(backendResponse)) {
    headers.append("Set-Cookie", cookie)
  }

  return headers
}

async function proxyApplicationsRequest(request: NextRequest) {
  const upstreamUrl = new URL(backendApplicationsBaseUrl)
  upstreamUrl.search = request.nextUrl.search
  const isBodyMethod = request.method !== "GET" && request.method !== "HEAD"

  let upstreamResponse: Response

  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: createBackendHeaders(request),
      cache: "no-store",
      body: isBodyMethod ? await request.text() : undefined,
    })
  } catch (error) {
    console.error("Applications proxy request failed.", error)

    return Response.json(
      { message: "Applications service is unavailable." },
      { status: 502 }
    )
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: createFrontendHeaders(upstreamResponse),
  })
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  return proxyApplicationsRequest(request)
}

export async function POST(request: NextRequest) {
  return proxyApplicationsRequest(request)
}

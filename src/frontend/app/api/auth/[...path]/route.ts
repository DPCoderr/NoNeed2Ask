import type { NextRequest } from "next/server"

const backendAuthBaseUrl =
  process.env.AUTH_BASE_URL ?? "https://noneed2ask.onrender.com/auth"

const excludedResponseHeaders = new Set([
  "content-length",
  "set-cookie",
  "access-control-allow-credentials",
  "access-control-allow-headers",
  "access-control-allow-methods",
  "access-control-allow-origin",
])

type RouteContext = {
  params: Promise<{
    path: string[]
  }>
}

function createBackendHeaders(request: NextRequest) {
  const headers = new Headers(request.headers)

  headers.delete("host")
  headers.delete("origin")
  headers.delete("referer")

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

async function proxyAuthRequest(request: NextRequest, context: RouteContext) {
  const { path } = await context.params
  const upstreamUrl = new URL(path.join("/"), `${backendAuthBaseUrl}/`)
  upstreamUrl.search = request.nextUrl.search
  const hasBody = request.method !== "GET" && request.method !== "HEAD"

  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers: createBackendHeaders(request),
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  })

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: createFrontendHeaders(upstreamResponse),
  })
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyAuthRequest(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyAuthRequest(request, context)
}

import type { NextRequest } from "next/server"

const backendAuthBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.AUTH_BASE_URL ?? "https://noneed2ask.onrender.com/auth"
    : process.env.AUTH_BASE_URL_DEV ?? "http://localhost:5273/auth"

const excludedResponseHeaders = new Set([
  "content-encoding",
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

async function proxyAuthRequest(request: NextRequest, context: RouteContext) {
  const { path } = await context.params
  const upstreamUrl = new URL(path.join("/"), `${backendAuthBaseUrl}/`)
  upstreamUrl.search = request.nextUrl.search
  const hasBody = request.method !== "GET" && request.method !== "HEAD"
  const body = hasBody ? await request.text() : undefined

  let upstreamResponse: Response

  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: createBackendHeaders(request),
      body,
      cache: "no-store",
    })
  } catch (error) {
    console.error("Auth proxy request failed.", error)

    return Response.json(
      { message: "Authentication service is unavailable." },
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

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyAuthRequest(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyAuthRequest(request, context)
}

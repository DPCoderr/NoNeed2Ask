import type { NextRequest } from "next/server"

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

export async function proxyBackendRequest(
  request: NextRequest,
  upstreamUrl: URL,
  unavailableMessage: string
) {
  upstreamUrl.search = request.nextUrl.search
  const hasBody = request.method !== "GET" && request.method !== "HEAD"

  let upstreamResponse: Response

  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: createBackendHeaders(request),
      body: hasBody ? await request.text() : undefined,
      cache: "no-store",
    })
  } catch (error) {
    console.error(unavailableMessage, error)

    return Response.json(
      { message: unavailableMessage },
      { status: 502 }
    )
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: createFrontendHeaders(upstreamResponse),
  })
}

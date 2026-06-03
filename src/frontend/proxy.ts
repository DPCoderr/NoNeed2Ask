import { NextResponse, type NextRequest } from "next/server"

import { authCookieName } from "@/lib/auth/cookies"

function isPrivateRoute(pathname: string) {
  return (
    pathname === "/applications" ||
    pathname.startsWith("/applications/") ||
    pathname === "/settings"
  )
}

function isAuthRoute(pathname: string) {
  return pathname === "/login" || pathname === "/register"
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request
  const hasAuthCookie = request.cookies.has(authCookieName)

  if (isPrivateRoute(nextUrl.pathname) && !hasAuthCookie) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("returnTo", `${nextUrl.pathname}${nextUrl.search}`)

    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute(nextUrl.pathname) && hasAuthCookie) {
    return NextResponse.redirect(new URL("/applications", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login", "/register", "/applications/:path*", "/settings"],
}

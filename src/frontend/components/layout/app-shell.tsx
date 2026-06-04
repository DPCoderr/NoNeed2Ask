"use client"

import { usePathname } from "next/navigation"
import { Fragment, type ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { mockPrivateApplications } from "@/lib/api/fixtures"
import { cn } from "@/lib/utils"

const segmentLabels: Record<string, string> = {
  dashboard: "Dashboard",
  applications: "Applications",
  settings: "Settings",
  status: "Public status",
  login: "Log in",
  register: "Register",
  "daniel-job-search": "Daniel job search",
}

function getBreadcrumbs(pathname: string) {
  if (pathname === "/") {
    return [{ href: "/", label: "Dashboard" }]
  }

  const segments = pathname.split("/").filter(Boolean)

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`
    const application = mockPrivateApplications.find((item) => item.id === segment)

    return {
      href,
      label:
        application?.companyName ??
        segmentLabels[segment] ??
        decodeURIComponent(segment),
    }
  })
}

export function AppShell({
  children,
  hasAuthCookie,
}: {
  children: ReactNode
  hasAuthCookie: boolean
}) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const isHomeRoute = pathname === "/"
  const isAuthRoute = pathname === "/login" || pathname === "/register"
  const isPublicStatusRoute = pathname.startsWith("/status/")
  const hasLandingBackground =
    isHomeRoute || pathname === "/applications" || pathname.startsWith("/applications/")

  if (isPublicStatusRoute || isAuthRoute || (isHomeRoute && !hasAuthCookie)) {
    return children
  }

  return (
    <SidebarProvider
      className={cn(
        hasLandingBackground && "relative isolate overflow-hidden bg-transparent"
      )}
    >
      {hasLandingBackground ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/40 via-white/12 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[2] h-56 bg-gradient-to-b from-transparent via-slate-900/5 to-slate-900/10" />
        </>
      ) : null}
      <div className="relative z-10 flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="relative overflow-hidden">
          <header
            className={cn(
              "relative z-10 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
              hasLandingBackground
                ? "border-transparent bg-transparent"
                : "bg-background"
            )}
          >
            <div className="flex min-w-0 items-center gap-3 px-8">
              <SidebarTrigger className="-ml-1 bg-white/60 text-slate-950 shadow-sm shadow-slate-950/10 hover:bg-white/80" />
              <Separator
                className="mx-2 bg-slate-900/25 data-[orientation=vertical]:!self-center data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
              <Breadcrumb>
                <BreadcrumbList
                  className={cn(
                    hasLandingBackground && "text-slate-700"
                  )}
                >
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      className={cn(
                        hasLandingBackground &&
                          "font-medium text-slate-700 hover:text-slate-950"
                      )}
                      href="/"
                    >
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbs[0]?.href !== "/" && (
                    <BreadcrumbSeparator className="hidden text-slate-500 md:block" />
                  )}
                  {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1

                    if (breadcrumb.href === "/") {
                      return null
                    }

                    return (
                      <Fragment key={breadcrumb.href}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage
                              className={cn(
                                hasLandingBackground && "text-slate-950"
                              )}
                            >
                              {breadcrumb.label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              className={cn(
                                hasLandingBackground &&
                                  "font-medium text-slate-700 hover:text-slate-950"
                              )}
                              href={breadcrumb.href}
                            >
                              {breadcrumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && (
                          <BreadcrumbSeparator className="text-slate-500" />
                        )}
                      </Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

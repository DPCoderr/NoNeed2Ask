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
import type { AuthMeResponseDto } from "@/lib/api/auth"
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
  currentUser,
}: {
  children: ReactNode
  currentUser: AuthMeResponseDto
}) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const hasLandingBackground =
    pathname === "/" ||
    pathname === "/applications" ||
    pathname.startsWith("/applications/")

  return (
    <SidebarProvider
      className={cn(
        "h-svh min-h-svh overflow-hidden",
        hasLandingBackground && "relative isolate overflow-hidden bg-[#f6faff]"
      )}
    >
      {hasLandingBackground ? (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/bg-userpage-light.jpg')",
            }}
          />
          <div className="fixed inset-0 z-[1] bg-[linear-gradient(225deg,rgb(255_255_255/0.04)_0%,rgb(255_255_255/0.2)_34%,rgb(255_255_255/0.72)_62%,rgb(246_250_255/0.96)_100%)]" />
          <div className="fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0)_0%,rgb(255_255_255/0.1)_32%,rgb(246_250_255/0.86)_78%)]" />
        </>
      ) : null}
      <div className="relative z-10 flex h-full min-h-0 w-full">
        <AppSidebar currentUser={currentUser} />
        <SidebarInset className="relative min-h-0 overflow-hidden">
          <header
            className={cn(
              "app-safe-header relative z-10 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:md:h-12",
              hasLandingBackground
                ? "border-transparent bg-transparent"
                : "bg-background"
            )}
          >
            <div className="app-safe-inline flex min-w-0 items-center gap-3 px-5 md:px-8">
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
          <div className="min-h-0 flex-1 overflow-y-auto">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

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
import { mockIsSignedIn } from "@/lib/auth/session"
import { mockPrivateApplications } from "@/lib/api/fixtures"

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

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const isPublicRoute =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/status/")

  if (isPublicRoute && !mockIsSignedIn) {
    return children
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex min-w-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:!self-center data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs[0]?.href !== "/" && (
                  <BreadcrumbSeparator className="hidden md:block" />
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
                          <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={breadcrumb.href}>
                            {breadcrumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

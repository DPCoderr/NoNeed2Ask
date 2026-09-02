"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import type { AuthMeResponseDto } from "@/lib/api/auth"
import { cn } from "@/lib/utils"

import { AppBreadcrumbs } from "./app-breadcrumbs"
import { AppShellBackground } from "./app-shell-background"

export function AppShell({
  children,
  currentUser,
}: {
  children: ReactNode
  currentUser: AuthMeResponseDto
}) {
  const pathname = usePathname()
  const isDashboard = pathname === "/"
  const hasLandingBackground =
    isDashboard ||
    pathname === "/applications" ||
    pathname.startsWith("/applications/")

  return (
    <SidebarProvider
      className={cn(
        "h-svh min-h-svh overflow-hidden",
        hasLandingBackground && "relative isolate overflow-hidden bg-[#f8fbff]"
      )}
    >
      <AppShellBackground
        hasLandingBackground={hasLandingBackground}
        isDashboard={isDashboard}
      />
      <div className="relative z-10 flex h-full min-h-0 w-full">
        <AppSidebar currentUser={currentUser} />
        <SidebarInset className="relative min-h-0 overflow-hidden">
          <header
            className={cn(
              "app-safe-header relative z-10 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:md:h-12",
              hasLandingBackground
                ? cn(
                    "bg-transparent",
                    isDashboard ? "border-blue-950/8" : "border-transparent"
                  )
                : "bg-background"
            )}
          >
            <div className="app-safe-inline flex min-w-0 items-center gap-3 px-5 md:px-8">
              <SidebarTrigger className="-ml-1 bg-white/60 text-slate-950 shadow-sm shadow-slate-950/10 hover:bg-white/80" />
              <Separator
                className="mx-2 bg-slate-900/25 data-[orientation=vertical]:!self-center data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
              <AppBreadcrumbs
                hasLandingBackground={hasLandingBackground}
                isDashboard={isDashboard}
                pathname={pathname}
              />
            </div>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { AuthMeResponseDto } from "@/lib/api/auth";

import { AppBreadcrumbs } from "./app-breadcrumbs";
import { WorkspaceBackground } from "./workspace-background";

export function AppShell({ children, currentUser, sidebar, pathname: pathnameOverride }: {
  children: ReactNode;
  currentUser: AuthMeResponseDto;
  sidebar?: ReactNode;
  pathname?: string;
}) {
  const currentPathname = usePathname();
  const pathname = pathnameOverride ?? currentPathname;
  const background = pathname === "/" ? "dashboard" : pathname === "/applications" ? "applications" : null;

  return (
    <SidebarProvider className="h-svh min-h-svh overflow-hidden bg-[#f7f8fa]">
      <a href="#app-main-content" className="sr-only z-[60] rounded-lg bg-white px-4 py-3 text-sm text-slate-900 shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      {sidebar ?? <AppSidebar currentUser={currentUser} />}
      <SidebarInset className="min-h-0 overflow-hidden">
        <header className="app-safe-header flex h-16 shrink-0 items-center border-b border-slate-200/80 bg-white/70">
          <div className="flex w-full min-w-0 items-center gap-4 px-4 sm:px-7 xl:px-9">
            <SidebarTrigger id="app-sidebar-trigger" className="size-11 shrink-0 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900" />
            <span aria-hidden="true" className="h-4 w-px bg-slate-200" />
            <div className="min-w-0 flex-1 overflow-hidden">
              <AppBreadcrumbs hasLandingBackground={false} isDashboard={pathname === "/"} pathname={pathname} />
            </div>
            <span className="hidden shrink-0 text-xs text-slate-500 sm:block">Personal workspace</span>
          </div>
        </header>
        <div id="app-main-content" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto outline-none">
          {background ? <WorkspaceBackground variant={background}>{children}</WorkspaceBackground> : children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

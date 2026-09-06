"use client";

import { Briefcase02Icon, DashboardSquare01Icon, Setting07Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

import { AppSidebarFrame } from "./app-sidebar-frame";

const routes = [
  { href: "/", label: "Overview", icon: DashboardSquare01Icon },
  { href: "/applications", label: "Applications", icon: Briefcase02Icon },
];

export function AppSidebarView({ pathname, account }: { pathname: string; account: ReactNode }) {
  const { isMobile, setOpenMobile } = useSidebar();
  function handleNavigation() {
    if (isMobile) setOpenMobile(false);
  }

  return (
    <AppSidebarFrame>
      <SidebarHeader className="h-16 justify-center px-4">
        <Link href="/" onClick={handleNavigation} className="flex min-h-11 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-600" aria-label="NoNeed2Ask home">
          <Image src="/logo-mark.webp" width={30} height={30} alt="" className="shrink-0" />
          <span className="text-[15px] font-semibold tracking-[-0.04em] text-slate-800 group-data-[collapsible=icon]/sidebar-wrapper:sr-only">NoNeed2Ask<span className="text-[#315e96]">.</span></span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3 pt-7">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 group-data-[collapsible=icon]/sidebar-wrapper:sr-only">Workspace</p>
        <nav aria-label="Main navigation">
          <SidebarMenu>
            {routes.map((route) => {
              const isActive = route.href === "/" ? pathname === "/" : pathname.startsWith(route.href);
              return (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild isActive={isActive} tooltip={route.label} className="h-11 gap-3 px-3 text-[13px] text-slate-500 hover:bg-slate-50 data-[active=true]:bg-[#edf3fa] data-[active=true]:text-[#315e96] data-[active=true]:shadow-none">
                    <Link href={route.href} onClick={handleNavigation} aria-current={isActive ? "page" : undefined}>
                      <HugeiconsIcon icon={route.icon} strokeWidth={1.7} />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </nav>
      </SidebarContent>
      <SidebarFooter className="gap-3 px-3 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip="Settings" className="h-11 gap-3 px-3 text-[13px] text-slate-500 hover:bg-slate-50 data-[active=true]:bg-[#edf3fa] data-[active=true]:text-[#315e96] data-[active=true]:shadow-none">
              <Link href="/settings" onClick={handleNavigation} aria-current={pathname === "/settings" ? "page" : undefined}>
                <HugeiconsIcon icon={Setting07Icon} strokeWidth={1.7} /><span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="border-t border-slate-100 pt-3">{account}</div>
      </SidebarFooter>
    </AppSidebarFrame>
  );
}

"use client";

import {
  Briefcase02Icon,
  DashboardSquare01Icon,
  Globe02Icon,
  Logout02Icon,
  Setting07Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const mainRoutes = [
  { href: "/", label: "Home", icon: DashboardSquare01Icon },
  {
    href: "/applications",
    label: "Applications",
    icon: Briefcase02Icon,
  },
  // { href: "/settings", label: "Settings", icon: Setting07Icon },
  {
    href: "/status/daniel-job-search",
    label: "Public status",
    icon: Globe02Icon,
  },
];

const authRoutes = [
  { href: "/settings", label: "Settings", icon: Setting07Icon },
  { href: "/logout", label: "Logout", icon: Logout02Icon },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          className="flex h-10 items-center gap-2 rounded-lg px-2 font-semibold transition-colors hover:bg-sidebar-accent"
          href="/"
        >
          <Image
            src="/logo-transparent.png"
            height={36}
            width={36}
            alt="NoNeed2Ask logo"
          />
          <span className="truncate group-data-[collapsible=icon]/sidebar-wrapper:sr-only">
            NoNeed2Ask
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainRoutes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(pathname, route.href)}
                  >
                    <Link href={route.href}>
                      <HugeiconsIcon icon={route.icon} />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authRoutes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(pathname, route.href)}
                  >
                    <Link href={route.href}>
                      <HugeiconsIcon icon={route.icon} />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

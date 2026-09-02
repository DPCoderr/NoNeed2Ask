"use client";

import {
  Briefcase02Icon,
  DashboardSquare01Icon,
  Logout02Icon,
  Setting07Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { logout, type AuthMeResponseDto } from "@/lib/api/auth";
import { cn } from "@/lib/utils";

const workspaceRoutes = [
  { href: "/", label: "Home", icon: DashboardSquare01Icon },
  {
    href: "/applications",
    label: "Applications",
    icon: Briefcase02Icon,
  },
  // { href: "/settings", label: "Settings", icon: Setting07Icon },
];

const accountRoutes = [
  { href: "/settings", label: "Settings", icon: Setting07Icon },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({
  currentUser,
}: {
  currentUser: AuthMeResponseDto;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const accountEmail = currentUser.email;
  function handleSidebarNavigation() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutError(null);
    handleSidebarNavigation();

    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch {
      setLogoutError("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          className="flex h-10 items-center gap-2 rounded-lg px-2 font-semibold transition-colors hover:bg-sidebar-accent"
          href="/"
          onClick={handleSidebarNavigation}
        >
          <Image
            src="/logo-mark.webp"
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
              {workspaceRoutes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      route.href === "/" &&
                        "relative data-[active=true]:bg-blue-50 data-[active=true]:text-blue-950 data-[active=true]:shadow-none data-[active=true]:before:absolute data-[active=true]:before:inset-y-1.5 data-[active=true]:before:left-0 data-[active=true]:before:w-0.5 data-[active=true]:before:bg-blue-700"
                    )}
                    isActive={isActiveRoute(pathname, route.href)}
                  >
                    <Link href={route.href} onClick={handleSidebarNavigation}>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  isActive={isActiveRoute(pathname, "/settings")}
                  tooltip="Settings"
                  type="button"
                >
                  <HugeiconsIcon icon={Setting07Icon} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={"start"}
                className="min-w-64"
                side={"top"}
                sideOffset={8}
              >
                <DropdownMenuLabel className="flex min-w-0 items-center gap-2.5 text-sm font-medium">
                  <HugeiconsIcon className="size-4 shrink-0" icon={UserIcon} />
                  <span className="truncate">
                    {accountEmail ?? "Signed in"}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {accountRoutes.map((route) => (
                  <DropdownMenuItem asChild key={route.href}>
                    <Link href={route.href} onClick={handleSidebarNavigation}>
                      <HugeiconsIcon icon={route.icon} />
                      <span>{route.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  variant="destructive"
                >
                  <HugeiconsIcon icon={Logout02Icon} />
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        {logoutError ? (
          <p className="px-2 text-xs text-destructive">{logoutError}</p>
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
}

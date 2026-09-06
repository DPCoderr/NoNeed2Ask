"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { AppAccountMenu } from "@/components/layout/app-account-menu";
import { AppSidebarView } from "@/components/layout/app-sidebar-view";
import { useSidebar } from "@/components/ui/sidebar";
import { logout, type AuthMeResponseDto } from "@/lib/api/auth";

export function AppSidebar({ currentUser }: { currentUser: AuthMeResponseDto }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  function handleSidebarNavigation() {
    if (isMobile) setOpenMobile(false);
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
    <AppSidebarView pathname={pathname} account={
      <AppAccountMenu currentUser={currentUser} isLoggingOut={isLoggingOut} logoutError={logoutError} onLogout={handleLogout} onNavigate={handleSidebarNavigation} />
    } />
  );
}

"use client";

import { AppAccountMenu } from "@/components/layout/app-account-menu";
import { AppSidebarView } from "@/components/layout/app-sidebar-view";
import { useSidebar } from "@/components/ui/sidebar";

import { previewUser } from "../_lib/preview-data";

export function PreviewSidebar({ pathname, onNotice }: { pathname: string; onNotice: (message: string) => void }) {
  const { setOpenMobile } = useSidebar();

  return (
    <AppSidebarView pathname={pathname} account={
      <AppAccountMenu currentUser={previewUser} isLoggingOut={false} logoutError={null} onNavigate={() => setOpenMobile(false)} onLogout={() => {
        setOpenMobile(false);
        onNotice("Logout preview: your real session has not been changed.");
      }} />
    } />
  );
}

"use client";

import type { ReactNode } from "react";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export function AppSidebarFrame({ children }: { children: ReactNode }) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" aria-describedby={undefined} className="app-safe-sidebar w-72! max-w-[85vw] bg-white motion-reduce:animate-none! motion-reduce:transition-none" onCloseAutoFocus={(event) => {
          event.preventDefault();
          document.getElementById("app-sidebar-trigger")?.focus();
        }}>
          <SheetTitle className="sr-only">Workspace navigation</SheetTitle>
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sidebar aria-label="Workspace navigation" className="h-svh rounded-none border-slate-200/80 bg-white shadow-none backdrop-blur-none data-[state=expanded]:w-[224px] motion-reduce:transition-none">
      {children}
    </Sidebar>
  );
}

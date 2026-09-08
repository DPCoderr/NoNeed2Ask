import Link from "next/link";
import type { ReactNode } from "react";
import { LandingNavbar } from "@/components/layout/landing-navbar";

import { PublicStatusBackground } from "./public-status-background";
import navbarStyles from "./public-status-navbar.module.css";

export function PublicStatusFrame({ children, isAuthenticated = false, navigation = true }: {
  children: ReactNode;
  isAuthenticated?: boolean;
  navigation?: boolean;
}) {
  return (
    <div className="relative isolate flex min-h-svh flex-col bg-[#f7f8fa] text-slate-800">
      <PublicStatusBackground />
      <a href="#public-content" className="sr-only z-[150] rounded-lg bg-white p-3 text-sm focus:not-sr-only focus:fixed focus:p-3 focus:left-4 focus:top-4 focus:ring-2 focus:ring-blue-600">Skip to content</a>
      <LandingNavbar
        navItems={[]}
        isAuthenticated={isAuthenticated}
        actions={navigation ? undefined : <></>}
        className={navbarStyles.navbar}
      />
      <main id="public-content" tabIndex={-1} className="mx-auto w-full max-w-[1120px] flex-1 px-5 pb-12 pt-28 outline-none sm:px-8 sm:pt-32">
        {children}
      </main>
      <footer className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-6 text-xs leading-5 text-slate-600 sm:px-8">
        <span>A little clarity on the job search.</span>
        <span>Shared with <Link prefetch={false} href="/" className="rounded font-medium text-slate-600 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-600">NoNeed2Ask</Link></span>
      </footer>
    </div>
  );
}

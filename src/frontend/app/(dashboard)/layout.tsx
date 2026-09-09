import type { ReactNode } from "react";
import { after } from "next/server";

import { AppShell } from "@/components/layout/app-shell";
import { LandingPage } from "@/components/landing/landing-page";
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server";
import { warmBackend } from "./_lib/warm-backend";

export const maxDuration = 60;

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUserServer();

  if (!user) {
    after(warmBackend);
    return <LandingPage />;
  }

  return <AppShell currentUser={user}>{children}</AppShell>;
}

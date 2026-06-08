import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { LandingPage } from "@/components/landing/landing-page";
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUserServer();

  if (!user) {
    return <LandingPage />;
  }

  const queryClient = new QueryClient();
  queryClient.setQueryData(["auth", "me"], user);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppShell>{children}</AppShell>
    </HydrationBoundary>
  );
}

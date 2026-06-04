import { cookies } from "next/headers";

import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { LandingPage } from "@/components/landing/landing-page";
import { authCookieName } from "@/lib/auth/cookies";

export default async function HomePage() {
  const cookieStore = await cookies();

  if (!cookieStore.has(authCookieName)) {
    return <LandingPage />;
  }

  return <DashboardHome />;
}

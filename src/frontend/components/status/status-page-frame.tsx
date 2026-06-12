import type { ReactNode } from "react";

import { LandingNavbar } from "@/components/layout/landing-navbar";

const publicStatusNavItems = [
  { href: "#overview", label: "Overview" },
  { href: "#journey", label: "Journey" },
  { href: "#updates", label: "Updates" },
];

export function StatusPageFrame({
  children,
  isAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
}) {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#f6faff] text-slate-950">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
      />
      <div className="fixed inset-0 z-[1] bg-[linear-gradient(225deg,rgb(255_255_255/0.04)_0%,rgb(255_255_255/0.2)_34%,rgb(255_255_255/0.72)_62%,rgb(246_250_255/0.96)_100%)]" />
      <div className="fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0)_0%,rgb(255_255_255/0.1)_32%,rgb(246_250_255/0.86)_78%)]" />

      <LandingNavbar
        isAuthenticated={isAuthenticated}
        navItems={publicStatusNavItems}
      />

      <div className="relative z-10 pt-24 md:pt-28">{children}</div>
    </main>
  );
}

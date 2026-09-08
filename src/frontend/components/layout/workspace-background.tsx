import type { ReactNode } from "react";

import { PublicStatusBackground } from "@/components/status/public-status-background";

export function WorkspaceBackground({ children, variant }: { children: ReactNode; variant: "dashboard" | "applications" }) {
  return (
    <div className="relative isolate min-h-full bg-[#f7f8fa]" data-workspace-background={variant}>
      <PublicStatusBackground />
      {children}
    </div>
  );
}

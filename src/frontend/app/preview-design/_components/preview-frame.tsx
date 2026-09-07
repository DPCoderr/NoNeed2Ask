"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { previewUser } from "../_lib/preview-data";
import { PreviewSidebar } from "./preview-sidebar";
import { PreviewControls } from "./preview-controls";

export function PreviewFrame<T extends string>({ pageName, children, scenarios, scenario, onScenarioChange, notice, onNotice }: {
  pageName: "dashboard" | "applications";
  children: ReactNode;
  scenarios: readonly T[];
  scenario: T;
  onScenarioChange: (scenario: T) => void;
  notice: string;
  onNotice: (message: string) => void;
}) {
  const router = useRouter();
  const pathname = pageName === "dashboard" ? "/" : "/applications";
  function handlePreviewLink(event: MouseEvent<HTMLDivElement>) {
    const href = (event.target as Element).closest("a")?.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    event.preventDefault();
    if (href === "/" || href === "/applications") {
      router.push(href === "/" ? "/preview-design/dashboard" : "/preview-design/applications");
      return;
    }
    onNotice(`Preview destination: ${href}. Navigation stays local for this design review.`);
  }
  return (
    <div onClickCapture={handlePreviewLink}>
      <AppShell currentUser={previewUser} pathname={pathname} sidebar={<PreviewSidebar pathname={pathname} onNotice={onNotice} />}>
        {children}
        <PreviewControls pageName={pageName} scenarios={scenarios} scenario={scenario} onScenarioChange={onScenarioChange} notice={notice} onDismiss={() => onNotice("")} />
      </AppShell>
    </div>
  );
}

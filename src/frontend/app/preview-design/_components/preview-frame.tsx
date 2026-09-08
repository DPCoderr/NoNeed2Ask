"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { previewUser } from "../_lib/preview-data";
import { PreviewSidebar } from "./preview-sidebar";
import { PreviewControls } from "./preview-controls";

export function PreviewFrame<T extends string>({ pageName, children, scenarios, scenario, onScenarioChange, notice, onNotice }: {
  pageName: "dashboard" | "applications" | "public-page" | "application-create" | "application-detail" | "application-update";
  children: ReactNode;
  scenarios: readonly T[];
  scenario: T;
  onScenarioChange: (scenario: T) => void;
  notice: string;
  onNotice: (message: string) => void;
}) {
  const router = useRouter();
  const pathname = pageName === "dashboard" ? "/" : pageName === "applications" ? "/applications" : pageName === "application-create" ? "/applications/create" : pageName === "application-update" ? "/applications/preview/update" : "/applications/preview";
  function handlePreviewLink(event: MouseEvent<HTMLDivElement>) {
    const href = (event.target as Element).closest("a")?.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    event.preventDefault();
    if (pageName !== "public-page" && (href === "/" || href === "/applications")) {
      router.push(href === "/" ? "/preview-design/dashboard" : "/preview-design/applications");
      return;
    }
    onNotice(`Preview destination: ${href}. Navigation stays local for this design review.`);
  }
  const controls = <PreviewControls pageName={pageName} scenarios={scenarios} scenario={scenario} onScenarioChange={onScenarioChange} notice={notice} onDismiss={() => onNotice("")} />;
  if (pageName === "public-page") {
    return <div onClickCapture={handlePreviewLink} className="bg-[#f7f8fa]">{children}<div className="border-t border-slate-200 pt-6 [&_aside]:text-slate-600">{controls}</div></div>;
  }
  return (
    <div onClickCapture={handlePreviewLink}>
      <AppShell currentUser={previewUser} pathname={pathname} sidebar={<PreviewSidebar pathname={pathname} onNotice={onNotice} />}>
        {children}
        {controls}
      </AppShell>
    </div>
  );
}

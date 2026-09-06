"use client";

import { useState, type MouseEvent } from "react";

import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import { OwnerDashboard } from "@/components/dashboard/owner/owner-dashboard";
import { OwnerDashboardState } from "@/components/dashboard/owner/owner-dashboard-state";
import { AppShell } from "@/components/layout/app-shell";

import { previewApplications, previewDate, previewInterview, previewUser, type PreviewScenario } from "../_lib/preview-data";
import { PreviewControls } from "./preview-controls";
import { PreviewSharing } from "./preview-sharing";
import { PreviewSidebar } from "./preview-sidebar";

export function DashboardPreview() {
  const [scenario, setScenario] = useState<PreviewScenario>("Populated");
  const [notice, setNotice] = useState("");
  const isLong = scenario === "Long names";
  const applications = scenario === "Empty" ? [] : previewApplications.map((application) => ({
    ...application,
    ...(isLong ? { companyName: "Northstar International Research & Technology Collective", jobTitle: "Senior Frontend Engineer, Accessibility & Design Systems" } : {}),
  }));
  const data = buildDashboardData(applications, previewDate);
  const interview = scenario === "Empty" || scenario === "No interview" ? undefined : {
    ...previewInterview,
    ...(isLong ? { companyName: applications[0].companyName, jobTitle: applications[0].jobTitle } : {}),
  };

  function handlePreviewLink(event: MouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest("a");
    const href = link?.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    event.preventDefault();
    setNotice(`Preview destination: ${href}. Navigation stays local for this design review.`);
  }

  return (
    <div onClickCapture={handlePreviewLink}>
      <AppShell currentUser={previewUser} pathname="/" sidebar={<PreviewSidebar onNotice={setNotice} />}>
        {scenario === "Loading" || scenario === "Error" ? (
          <OwnerDashboardState state={scenario} userDisplayName={previewUser.username} onRetry={() => setScenario("Populated")} />
        ) : (
          <OwnerDashboard data={data} userDisplayName={isLong ? "Alexandra van der Meer-Janssen" : previewUser.username} nextInterview={interview} sharing={<PreviewSharing key={scenario} unavailable={scenario === "Sharing unavailable"} saving={scenario === "Sharing saving"} />} />
        )}
        <PreviewControls scenario={scenario} onScenarioChange={(value) => { setScenario(value); setNotice(""); }} notice={notice} onDismiss={() => setNotice("")} />
      </AppShell>
    </div>
  );
}

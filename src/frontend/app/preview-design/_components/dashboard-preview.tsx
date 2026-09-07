"use client";

import { useState } from "react";
import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import { OwnerDashboard } from "@/components/dashboard/owner/owner-dashboard";
import { OwnerDashboardState } from "@/components/dashboard/owner/owner-dashboard-state";
import { previewApplications, previewDate, previewInterview, previewScenarios, previewUser, type PreviewScenario } from "../_lib/preview-data";
import { PreviewFrame } from "./preview-frame";
import { PreviewSharing } from "./preview-sharing";

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
  return (
    <PreviewFrame pageName="dashboard" scenarios={previewScenarios} scenario={scenario} onScenarioChange={(value) => { setScenario(value); setNotice(""); }} notice={notice} onNotice={setNotice}>
      {scenario === "Loading" || scenario === "Error" ? (
        <OwnerDashboardState state={scenario} userDisplayName={previewUser.username} onRetry={() => setScenario("Populated")} />
      ) : (
        <OwnerDashboard data={data} userDisplayName={isLong ? "Alexandra van der Meer-Janssen" : previewUser.username} nextInterview={interview} sharing={<PreviewSharing key={scenario} unavailable={scenario === "Sharing unavailable"} saving={scenario === "Sharing saving"} />} />
      )}
    </PreviewFrame>
  );
}

"use client";

import { useState } from "react";
import { PreviewFrame } from "./preview-frame";
import { PublicPagePreviewContent } from "./public-page-preview-content";
import { publicPreviewScenarios, type PublicPreviewScenario } from "../_lib/public-page-preview-data";

export function PublicPagePreview() {
  const [scenario, setScenario] = useState<PublicPreviewScenario>("Populated");
  const [notice, setNotice] = useState("");
  return (
    <PreviewFrame pageName="public-page" scenarios={publicPreviewScenarios} scenario={scenario} onScenarioChange={(value) => { setScenario(value); setNotice(""); }} notice={notice} onNotice={setNotice}>
      <PublicPagePreviewContent scenario={scenario} onRetry={() => { setScenario("Populated"); setNotice("The sample status page has been loaded. No request was sent."); }} />
    </PreviewFrame>
  );
}

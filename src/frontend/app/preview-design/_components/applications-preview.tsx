"use client";

import { useState } from "react";
import { ApplicationsPageLayout } from "@/app/(dashboard)/applications/_components/applications-page-layout";
import { ApplicationsListView, type ApplicationsListActions } from "@/app/(dashboard)/applications/_components/applications-list-view";
import type { ResolvedApplicationListRequest } from "@/app/(dashboard)/applications/_lib/application-list-query";
import { applicationScenarios, getPreviewApplicationPage, getPreviewRows, initialApplicationRequest, type ApplicationPreviewScenario } from "../_lib/applications-preview-data";
import { PreviewFrame } from "./preview-frame";
import { PreviewApplicationActions } from "./preview-application-actions";

export function ApplicationsPreview() {
  const [scenario, setScenario] = useState<ApplicationPreviewScenario>("Populated");
  const [request, setRequest] = useState(initialApplicationRequest);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const rows = getPreviewRows(scenario).filter((row) => !deletedIds.includes(row.id));
  const applications = getPreviewApplicationPage(rows, request);

  function updateRequest(next: Partial<ResolvedApplicationListRequest>) {
    setRequest((current) => ({ ...current, ...next, page: next.page ?? 1 }));
  }
  function changeScenario(next: ApplicationPreviewScenario) {
    setScenario(next);
    setDeletedIds([]);
    setNotice("");
    setRequest({ ...initialApplicationRequest, search: next === "No results" ? "No matching company" : "" });
  }
  function deleteRow(id: string) {
    const remaining = rows.filter((row) => row.id !== id);
    const nextPage = getPreviewApplicationPage(remaining, request);
    setDeletedIds((ids) => [...ids, id]);
    updateRequest({ page: Math.max(1, Math.min(request.page, nextPage.totalPages)) });
    setNotice("Application removed from this preview only.");
  }
  const actions: ApplicationsListActions = {
    changeSearch: (search) => updateRequest({ search: search.trim() }),
    changeStatus: (status) => updateRequest({ status }),
    changeSort: updateRequest,
    changePage: (page) => updateRequest({ page }),
    prefetchPage: () => {},
  };
  return (
    <PreviewFrame pageName="applications" scenarios={applicationScenarios} scenario={scenario} onScenarioChange={changeScenario} notice={notice} onNotice={setNotice}>
      <ApplicationsPageLayout>
        <ApplicationsListView applications={applications} request={request} actions={actions} isLoading={scenario === "Loading"} isError={scenario === "Error"} onRetry={() => changeScenario("Populated")} renderActions={(application) => <PreviewApplicationActions key={scenario + application.id} application={application} failDelete={scenario === "Delete error"} onDelete={deleteRow} onNotice={setNotice} />} />
      </ApplicationsPageLayout>
    </PreviewFrame>
  );
}

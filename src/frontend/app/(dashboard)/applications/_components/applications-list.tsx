"use client";

import { useApplicationsList } from "../_lib/use-applications-list";
import { ApplicationsListView } from "./applications-list-view";

export function ApplicationsList() {
  const { actions, applications, isError, isLoading, isFetching, request, retry } = useApplicationsList();
  return <ApplicationsListView applications={applications} request={request} actions={actions} isError={isError} isLoading={isLoading} isFetching={isFetching} onRetry={retry} />;
}

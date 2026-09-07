"use client";

import { useState } from "react";
import { ApplicationActionsView } from "@/app/(dashboard)/applications/_components/applications-results/application-actions-view";
import type { PrivateApplicationDto } from "@/lib/api/types";

export function PreviewApplicationActions({ application, failDelete, onDelete, onNotice }: {
  application: PrivateApplicationDto;
  failDelete: boolean;
  onDelete: (id: string) => void;
  onNotice: (message: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <ApplicationActionsView companyName={application.companyName} isDeleteOpen={open} onDeleteOpenChange={setOpen} isDeleting={false} isDeleteError={failed} onEdit={() => onNotice(`Preview: edit ${application.companyName}. The edit page will be designed in a later round.`)} onDelete={() => {
      if (failDelete) { setFailed(true); return; }
      setOpen(false);
      onDelete(application.id);
    }} />
  );
}

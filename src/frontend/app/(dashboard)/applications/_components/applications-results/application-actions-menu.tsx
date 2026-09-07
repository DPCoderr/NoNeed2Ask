"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteApplication } from "@/lib/api/applications";
import type { PrivateApplicationDto } from "@/lib/api/types";
import { ApplicationActionsView } from "./application-actions-view";

export function ApplicationActionsMenu({ application }: { application: PrivateApplicationDto }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: () => deleteApplication(application.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["applications"] });
      setIsDeleteOpen(false);
    },
  });
  return (
    <ApplicationActionsView companyName={application.companyName} isDeleteOpen={isDeleteOpen} onDeleteOpenChange={setIsDeleteOpen} isDeleting={deleteMutation.isPending} isDeleteError={deleteMutation.isError} onDelete={() => deleteMutation.mutate()} onEdit={() => router.push(`/applications/${application.id}/update`)} />
  );
}

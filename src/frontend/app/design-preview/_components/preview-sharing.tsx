"use client";

import { useState } from "react";

import { OwnerSharingPanel } from "@/components/dashboard/owner/owner-sharing-panel";
import { OwnerPublicPreviewLink } from "@/components/dashboard/owner/owner-public-preview-link";
import { PublicProfileSharingControl } from "@/components/dashboard/public-profile-sharing-control";

export function PreviewSharing({ unavailable, saving }: { unavailable: boolean; saving: boolean }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <OwnerSharingPanel>
      <PublicProfileSharingControl enabled={enabled && !unavailable} onCheckedChange={setEnabled} disabled={unavailable || saving} appearance="compact" />
      {enabled && !unavailable && <OwnerPublicPreviewLink href="/status/alex-job-search" />}
      {unavailable && <span className="text-xs text-slate-500">Sharing is currently unavailable.</span>}
      {saving && <span role="status" className="text-xs text-slate-500">Saving…</span>}
    </OwnerSharingPanel>
  );
}

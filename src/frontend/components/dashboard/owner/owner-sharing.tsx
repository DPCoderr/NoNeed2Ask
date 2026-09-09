"use client";

import { useState } from "react";

import type { DashboardHeaderProps } from "../dashboard-header";
import { PublicProfileSharingSwitch } from "../public-profile-sharing-switch";
import { OwnerSharingPanel } from "./owner-sharing-panel";
import { OwnerPublicPreviewLink } from "./owner-public-preview-link";

export function OwnerSharing({ isPublicProfileAvailable, isPublicSharingEnabled, publicPageId }: DashboardHeaderProps) {
  const [isEnabled, setIsEnabled] = useState(Boolean(isPublicSharingEnabled));

  return (
    <OwnerSharingPanel>
      <PublicProfileSharingSwitch disabled={!isPublicProfileAvailable} initialEnabled={Boolean(isPublicSharingEnabled)} onEnabledChange={setIsEnabled} appearance="compact" />
      {isPublicProfileAvailable && isEnabled && publicPageId && (
        <OwnerPublicPreviewLink href={`/status/${publicPageId}`} />
      )}
      {!isPublicProfileAvailable && <span className="text-xs text-slate-500">Sharing is currently unavailable.</span>}
    </OwnerSharingPanel>
  );
}

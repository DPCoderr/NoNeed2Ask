"use client"

import { useMutation } from "@tanstack/react-query"
import * as React from "react"

import { PublicProfileSharingControl } from "./public-profile-sharing-control"
import { updatePublicProfileSettings } from "@/lib/api/public-profile"

export function PublicProfileSharingSwitch({
  disabled = false,
  initialEnabled,
  onEnabledChange,
  appearance = "default",
}: {
  disabled?: boolean
  initialEnabled: boolean
  onEnabledChange?: (enabled: boolean) => void
  appearance?: "default" | "compact"
}) {
  const [isEnabled, setIsEnabled] = React.useState(initialEnabled)

  const updateMutation = useMutation({
    mutationFn: (request: { isPublicSharingEnabled: boolean }) =>
      updatePublicProfileSettings(request),
    onError: (_error, request) => {
      const revertedEnabled = !request.isPublicSharingEnabled

      setIsEnabled(revertedEnabled)
      onEnabledChange?.(revertedEnabled)
    },
  })

  function handleCheckedChange(checked: boolean) {
    if (disabled) {
      return
    }

    setIsEnabled(checked)
    onEnabledChange?.(checked)
    updateMutation.mutate({ isPublicSharingEnabled: checked })
  }

  return (
    <PublicProfileSharingControl enabled={isEnabled} disabled={disabled || updateMutation.isPending} onCheckedChange={handleCheckedChange} appearance={appearance} />
  )
}

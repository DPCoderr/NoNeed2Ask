"use client"

import { useMutation } from "@tanstack/react-query"
import * as React from "react"

import { Switch } from "@/components/ui/switch"
import { updatePublicProfileSettings } from "@/lib/api/public-profile"

export function PublicProfileSharingSwitch({
  disabled = false,
  initialEnabled,
  onEnabledChange,
}: {
  disabled?: boolean
  initialEnabled: boolean
  onEnabledChange?: (enabled: boolean) => void
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
    <div className="flex h-9 items-center gap-2 rounded-lg border border-blue-100 bg-white/75 px-3 shadow-sm shadow-blue-950/5">
      <span>Public page {isEnabled ? "on" : "off"}</span>
      <Switch
        aria-label="Toggle public status page"
        checked={isEnabled}
        disabled={disabled || updateMutation.isPending}
        onCheckedChange={handleCheckedChange}
        size="sm"
      />
    </div>
  )
}

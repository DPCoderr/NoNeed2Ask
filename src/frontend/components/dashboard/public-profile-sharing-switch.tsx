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
    <div className="flex h-10 items-center gap-2.5 px-2.5 text-sm text-blue-950/70">
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

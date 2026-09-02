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
    <div className="flex h-11 min-w-0 items-center justify-between gap-1 px-1.5 text-sm text-blue-950/70 sm:gap-2 sm:px-3">
      <span className="whitespace-nowrap font-medium">
        Public page
        <span className="sr-only"> {isEnabled ? "on" : "off"}</span>
      </span>
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

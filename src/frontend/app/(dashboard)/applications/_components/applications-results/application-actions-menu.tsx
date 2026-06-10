"use client"

import {
  Cancel01Icon,
  Delete02Icon,
  MoreVerticalIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { deleteApplication } from "@/lib/api/applications"
import type { PrivateApplicationDto } from "@/lib/api/types"

export function ApplicationActionsMenu({
  application,
}: {
  application: PrivateApplicationDto
}) {
  const [selectedAction, setSelectedAction] = React.useState("")
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const deleteMutation = useMutation({
    mutationFn: () => deleteApplication(application.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["applications"] })
      setIsDeleteOpen(false)
    },
  })
  const isDeleting = deleteMutation.isPending

  async function handleDelete() {
    await deleteMutation.mutateAsync()
    setSelectedAction("")
  }

  function handleActionChange(action: string) {
    setSelectedAction(action)

    if (action === "update") {
      router.push(`/applications/${application.id}/update`)
      return
    }

    if (action === "delete") {
      setIsDeleteOpen(true)
      return
    }

    setSelectedAction("")
  }

  return (
    <AlertDialog
      open={isDeleteOpen}
      onOpenChange={(open) => {
        setIsDeleteOpen(open)

        if (!open) {
          setSelectedAction("")
        }
      }}
    >
      <Select onValueChange={handleActionChange} value={selectedAction}>
        <SelectTrigger
          aria-label={`Actions for ${application.companyName}`}
          className="size-8 justify-center border-transparent bg-transparent px-0 shadow-none hover:bg-blue-50 [&>svg:last-child]:hidden"
        >
          <SelectValue
            placeholder={
              <span className="flex items-center justify-center">
                <span className="sr-only">Actions</span>
                <HugeiconsIcon
                  aria-hidden="true"
                  className="size-4 text-blue-950"
                  icon={MoreVerticalIcon}
                  strokeWidth={2}
                />
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent align="end" className="min-w-44">
          <SelectItem
            className="font-semibold text-blue-700 focus:bg-blue-50 focus:text-blue-700 [&_svg:not([class*='text-'])]:text-blue-700"
            value="update"
          >
            <HugeiconsIcon
              aria-hidden="true"
              className="size-4"
              icon={PencilEdit02Icon}
              strokeWidth={2}
            />
            Update
          </SelectItem>
          <SelectItem
            className="font-semibold text-red-600 focus:bg-red-50 focus:text-red-700 [&_svg:not([class*='text-'])]:text-red-600"
            disabled={isDeleting}
            value="delete"
          >
            <HugeiconsIcon
              aria-hidden="true"
              className="size-4"
              icon={Delete02Icon}
              strokeWidth={2}
            />
            Delete
          </SelectItem>
          <SelectSeparator />
          <SelectItem value="cancel">
            <HugeiconsIcon
              aria-hidden="true"
              className="size-4"
              icon={Cancel01Icon}
              strokeWidth={2}
            />
            Cancel
          </SelectItem>
        </SelectContent>
      </Select>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this application?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {application.companyName} from your tracker.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {deleteMutation.isError ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            We could not delete this application. Please try again.
          </p>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} type="button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault()
              void handleDelete()
            }}
            type="button"
            variant="destructive"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

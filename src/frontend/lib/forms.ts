import {
  type FieldValues,
  type Path,
  type UseFormSetError,
} from "react-hook-form"

import { ApiResponseError } from "@/lib/api/errors"

export function applyApiFormErrors<TValues extends FieldValues>({
  error,
  fallbackMessage,
  fieldNames = {},
  setError,
}: {
  error: unknown
  fallbackMessage: string
  fieldNames?: Record<string, Path<TValues>>
  setError: UseFormSetError<TValues>
}) {
  if (!(error instanceof ApiResponseError)) {
    setError("root", {
      message: fallbackMessage,
    })
    return
  }

  const rootMessages: string[] = []

  if (error.errors) {
    Object.entries(error.errors).forEach(([field, messages]) => {
      const formField = fieldNames[field]

      if (formField) {
        setError(formField, {
          type: "server",
          message: messages.join(" "),
        })
      } else {
        rootMessages.push(...messages)
      }
    })
  }

  if (rootMessages.length > 0 || !error.errors) {
    setError("root", {
      message: rootMessages.join(" ") || error.message || fallbackMessage,
    })
  }
}

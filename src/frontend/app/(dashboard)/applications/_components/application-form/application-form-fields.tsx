"use client"

import { FieldGroup } from "@/components/ui/field"

import { ApplicationDatesStep } from "./application-dates-step"
import { ApplicationDetailsStep } from "./application-details-step"
import { ApplicationNotesStep } from "./application-notes-step"
import { ApplicationProgressStep } from "./application-progress-step"

export function ApplicationFormFields({
  currentStep,
  disabled,
  rootError,
}: {
  currentStep: number
  disabled: boolean
  rootError?: string
}) {
  return (
    <FieldGroup className="gap-8">
      {currentStep === 0 ? <ApplicationDetailsStep disabled={disabled} /> : null}
      {currentStep === 1 ? <ApplicationProgressStep disabled={disabled} /> : null}
      {currentStep === 2 ? <ApplicationDatesStep disabled={disabled} /> : null}
      {currentStep === 3 ? <ApplicationNotesStep disabled={disabled} /> : null}
      {rootError ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {rootError}
        </p>
      ) : null}
    </FieldGroup>
  )
}

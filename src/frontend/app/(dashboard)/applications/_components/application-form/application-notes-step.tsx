"use client"

import { useFormContext } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import type { CreateApplicationFormValues } from "@/lib/validation/applications"

import { ApplicationFormSection } from "./application-form-section"

export function ApplicationNotesStep({ disabled }: { disabled: boolean }) {
  const {
    formState: { errors },
    register,
  } = useFormContext<CreateApplicationFormValues>()

  return (
    <ApplicationFormSection
      description="Notes are optional. Public notes can be shown on your status page."
      title="Notes"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Field data-invalid={!!errors.publicNote}>
          <FieldLabel htmlFor="publicNote">Public note</FieldLabel>
          <Textarea
            aria-invalid={!!errors.publicNote}
            className="min-h-32 resize-y rounded-md border-input bg-background"
            disabled={disabled}
            id="publicNote"
            placeholder="Visible on your public status page"
            {...register("publicNote")}
          />
          <FieldError errors={[errors.publicNote]} />
        </Field>

        <Field data-invalid={!!errors.privateNote}>
          <FieldLabel htmlFor="privateNote">Private note</FieldLabel>
          <Textarea
            aria-invalid={!!errors.privateNote}
            className="min-h-32 resize-y rounded-md border-input bg-background"
            disabled={disabled}
            id="privateNote"
            placeholder="Only visible to you"
            {...register("privateNote")}
          />
          <FieldError errors={[errors.privateNote]} />
        </Field>
      </div>
    </ApplicationFormSection>
  )
}

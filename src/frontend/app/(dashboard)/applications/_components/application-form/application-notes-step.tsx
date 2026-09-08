"use client"

import { LockKeyhole } from "lucide-react"
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
      <aside className="flex items-start gap-3 rounded-xl bg-[#edf2f7] p-4 text-sm leading-6 text-slate-600">
        <LockKeyhole aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#315e96]" />
        <div>
          <h3 className="font-semibold text-slate-800">Your notes, your space</h3>
          <p>Public notes can appear on your shared status page. Keep interview preparation and personal thoughts in your private note.</p>
        </div>
      </aside>
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

"use client"

import { Controller, useFormContext } from "react-hook-form"

import type { CreateApplicationFormValues } from "@/lib/validation/applications"

import { ApplicationDateField } from "./application-date-field"
import { ApplicationFormSection } from "./application-form-section"

export function ApplicationDatesStep({ disabled }: { disabled: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateApplicationFormValues>()

  return (
    <ApplicationFormSection title="Dates">
      <div className="grid gap-5 lg:grid-cols-2">
        <Controller
          control={control}
          name="lastContactAt"
          render={({ field }) => (
            <ApplicationDateField
              disabled={disabled}
              error={errors.lastContactAt}
              label="Last contact"
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="nextActionAt"
          render={({ field }) => (
            <ApplicationDateField
              disabled={disabled}
              error={errors.nextActionAt}
              label="Next action"
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </div>
    </ApplicationFormSection>
  )
}

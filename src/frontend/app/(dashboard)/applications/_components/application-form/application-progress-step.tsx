"use client"

import { Controller, useFormContext } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ApplicationStatus } from "@/lib/api/types"
import type { CreateApplicationFormValues } from "@/lib/validation/applications"

import { statusDetails, statuses } from "../../application-list-config"
import { ApplicationFormSection } from "./application-form-section"

export function ApplicationProgressStep({ disabled }: { disabled: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateApplicationFormValues>()

  return (
    <ApplicationFormSection title="Progress">
      <div className="grid gap-5 md:grid-cols-2">
        <Field data-invalid={!!errors.status}>
          <FieldLabel>Status</FieldLabel>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                disabled={disabled}
                onValueChange={(value) =>
                  field.onChange(value as ApplicationStatus)
                }
                value={field.value}
              >
                <SelectTrigger
                  aria-invalid={!!errors.status}
                  className="h-10 w-full rounded-md border-input bg-background"
                  onBlur={field.onBlur}
                  ref={field.ref}
                >
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusDetails[status].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.status]} />
        </Field>
      </div>
    </ApplicationFormSection>
  )
}

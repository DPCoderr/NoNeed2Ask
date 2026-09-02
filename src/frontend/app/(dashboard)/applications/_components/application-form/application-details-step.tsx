"use client"

import { useFormContext } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { CreateApplicationFormValues } from "@/lib/validation/applications"

import { ApplicationFormSection } from "./application-form-section"

export function ApplicationDetailsStep({ disabled }: { disabled: boolean }) {
  const {
    formState: { errors },
    register,
  } = useFormContext<CreateApplicationFormValues>()

  return (
    <ApplicationFormSection title="Application details">
      <div className="grid gap-5 md:grid-cols-2">
        <Field data-invalid={!!errors.companyName}>
          <FieldLabel htmlFor="companyName">Company name</FieldLabel>
          <Input
            aria-invalid={!!errors.companyName}
            autoComplete="organization"
            className="h-10 rounded-md border-input bg-background"
            disabled={disabled}
            id="companyName"
            placeholder="Acme"
            {...register("companyName")}
          />
          <FieldError errors={[errors.companyName]} />
        </Field>

        <Field data-invalid={!!errors.jobTitle}>
          <FieldLabel htmlFor="jobTitle">Role</FieldLabel>
          <Input
            aria-invalid={!!errors.jobTitle}
            autoComplete="organization-title"
            className="h-10 rounded-md border-input bg-background"
            disabled={disabled}
            id="jobTitle"
            placeholder="Frontend engineer"
            {...register("jobTitle")}
          />
          <FieldError errors={[errors.jobTitle]} />
        </Field>
      </div>
    </ApplicationFormSection>
  )
}

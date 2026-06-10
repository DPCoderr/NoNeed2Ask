"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, type FieldPath, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  createApplication,
  updateApplication,
} from "@/lib/api/applications"
import { normalizeApplicationStatus } from "@/lib/api/application-status"
import type {
  ApplicationStatus,
  CreateApplicationRequestDto,
  PrivateApplicationDto,
  UpdateApplicationRequestDto,
} from "@/lib/api/types"
import { applyApiFormErrors } from "@/lib/forms"
import {
  createApplicationFormSchema,
  type CreateApplicationFormValues,
} from "@/lib/validation/applications"

import { statusDetails, statuses } from "../application-list-config"

type ApplicationFormProps =
  | {
      mode: "create"
      application?: never
    }
  | {
      mode: "update"
      application: PrivateApplicationDto
    }

const fieldNames = {
  CompanyName: "companyName",
  JobTitle: "jobTitle",
  Status: "status",
  PublicNote: "publicNote",
  PrivateNote: "privateNote",
  LastContactAt: "lastContactAt",
  NextActionAt: "nextActionAt",
} satisfies Record<string, keyof CreateApplicationFormValues>

const formSteps = [
  {
    description: "Add the company and role you want to track.",
    fields: ["companyName", "jobTitle"],
    title: "Application details",
  },
  {
    description: "Choose the current application status.",
    fields: ["status"],
    title: "Progress",
  },
  {
    description: "Add optional dates for contact and follow-up.",
    fields: ["lastContactAt", "nextActionAt"],
    title: "Dates",
  },
  {
    description: "Add any public or private notes.",
    fields: ["publicNote", "privateNote"],
    title: "Notes",
  },
] satisfies {
  description: string
  fields: FieldPath<CreateApplicationFormValues>[]
  title: string
}[]

function optionalTrimmedValue(value: string) {
  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : null
}

function optionalDateTimeValue(value: string) {
  return value ? new Date(value).toISOString() : null
}

function formatDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function formatTimeInputValue(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${hours}:${minutes}:${seconds}`
}

function toDateTimeInputValue(value: string | null) {
  if (!value) {
    return ""
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? ""
    : `${formatDateInputValue(date)}T${formatTimeInputValue(date)}`
}

function getDefaultValues(
  application?: PrivateApplicationDto
): CreateApplicationFormValues {
  if (!application) {
    return {
      companyName: "",
      jobTitle: "",
      status: "applied",
      publicNote: "",
      privateNote: "",
      lastContactAt: "",
      nextActionAt: "",
    }
  }

  return {
    companyName: application.companyName,
    jobTitle: application.jobTitle,
    status: normalizeApplicationStatus(application.status),
    publicNote: application.publicNote ?? "",
    privateNote: application.privateNote ?? "",
    lastContactAt: toDateTimeInputValue(application.lastContactAt),
    nextActionAt: toDateTimeInputValue(application.nextActionAt),
  }
}

function getDateValue(value: string) {
  return value.split("T")[0] ?? ""
}

function getTimeValue(value: string) {
  return value.split("T")[1]?.slice(0, 8) ?? ""
}

function getSelectedDate(value: string) {
  const dateValue = getDateValue(value)

  if (!dateValue) {
    return undefined
  }

  const date = new Date(`${dateValue}T00:00`)

  return Number.isNaN(date.getTime()) ? undefined : date
}

function getDateTimeValue(dateValue: string, timeValue: string) {
  if (!dateValue) {
    return ""
  }

  return `${dateValue}T${timeValue || "09:00:00"}`
}

function toCreateApplicationRequest(
  values: CreateApplicationFormValues
): CreateApplicationRequestDto | UpdateApplicationRequestDto {
  return {
    companyName: values.companyName.trim(),
    jobTitle: values.jobTitle.trim(),
    status: values.status,
    publicNote: optionalTrimmedValue(values.publicNote),
    privateNote: optionalTrimmedValue(values.privateNote),
    lastContactAt: optionalDateTimeValue(values.lastContactAt),
    nextActionAt: optionalDateTimeValue(values.nextActionAt),
  }
}

function ApplicationDateField({
  disabled,
  error,
  label,
  name,
  value,
  onBlur,
  onChange,
}: {
  disabled: boolean
  error: { message?: string } | undefined
  label: string
  name: string
  value: string
  onBlur: () => void
  onChange: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const dateValue = getDateValue(value)
  const timeValue = getTimeValue(value)
  const selectedDate = getSelectedDate(value)
  const datePickerId = `${name}-date`
  const timePickerId = `${name}-time`

  return (
    <Field className="gap-3" data-invalid={!!error}>
      <FieldLabel>{label}</FieldLabel>
      <FieldGroup className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8.5rem]">
        <Field className="gap-2">
          <FieldLabel htmlFor={datePickerId}>Date</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                aria-invalid={!!error}
                className="h-10 w-full justify-between rounded-md bg-background px-3 font-normal"
                disabled={disabled}
                id={datePickerId}
                type="button"
                variant="outline"
              >
                {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                <HugeiconsIcon
                  aria-hidden="true"
                  className="size-4 opacity-60"
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto overflow-hidden p-0"
            >
              <Calendar
                captionLayout="dropdown"
                defaultMonth={selectedDate}
                disabled={disabled}
                mode="single"
                onSelect={(date) => {
                  onChange(
                    date
                      ? getDateTimeValue(formatDateInputValue(date), timeValue)
                      : ""
                  )
                  setOpen(false)
                }}
                selected={selectedDate}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor={timePickerId}>Time</FieldLabel>
          <Input
            aria-invalid={!!error}
            className="h-10 rounded-md border-input bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            disabled={disabled}
            id={timePickerId}
            onBlur={onBlur}
            onChange={(event) =>
              onChange(
                getDateTimeValue(
                  dateValue || formatDateInputValue(new Date()),
                  event.target.value
                )
              )
            }
            step="1"
            type="time"
            value={timeValue}
          />
        </Field>
      </FieldGroup>
      {value ? (
        <Button
          className="h-auto w-fit px-0 py-0 text-xs"
          disabled={disabled}
          onClick={() => onChange("")}
          type="button"
          variant="link"
        >
          Clear date and time
        </Button>
      ) : null}
      <FieldError errors={[error]} />
    </Field>
  )
}

function ApplicationFormSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description?: string
  title: string
}) {
  return (
    <FieldSet className="gap-4">
      <div>
        <FieldLegend>{title}</FieldLegend>
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </div>
      {children}
    </FieldSet>
  )
}

function ApplicationForm({ mode, application }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const saveApplicationMutation = useMutation({
    mutationFn: async (
      request: CreateApplicationRequestDto | UpdateApplicationRequestDto
    ) => {
      if (mode === "update") {
        await updateApplication(application.id, request)
        return application
      }

      return createApplication(request)
    },
    onSuccess: async (savedApplication) => {
      await queryClient.invalidateQueries({ queryKey: ["applications"] })
      router.push(`/applications/${savedApplication.id}`)
      router.refresh()
    },
  })
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    trigger,
  } = useForm<CreateApplicationFormValues>({
    defaultValues: getDefaultValues(application),
    resolver: zodResolver(createApplicationFormSchema),
  })
  const isSaving = isSubmitting || saveApplicationMutation.isPending
  const isUpdate = mode === "update"
  const actionLabel = isUpdate ? "Save changes" : "Create application"
  const confirmTitle = isUpdate
    ? "Save these changes?"
    : "Create this application?"
  const confirmDescription = isUpdate
    ? "This will update the application with the details shown in the form."
    : "This will save the application and add it to your list."
  const pendingLabel = isUpdate ? "Saving..." : "Creating..."
  const currentStepDetails = formSteps[currentStep] ?? formSteps[0]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === formSteps.length - 1

  async function handleNextStep() {
    clearErrors("root")
    const isCurrentStepValid = await trigger(currentStepDetails.fields, {
      shouldFocus: true,
    })

    if (isCurrentStepValid) {
      setCurrentStep((step) => Math.min(step + 1, formSteps.length - 1))
    }
  }

  function handlePreviousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  async function handleOpenConfirmDialog() {
    clearErrors("root")
    const isCurrentStepValid = await trigger(currentStepDetails.fields, {
      shouldFocus: true,
    })

    if (isCurrentStepValid) {
      setIsConfirmOpen(true)
    }
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) {
      return
    }

    if (isLastStep) {
      await handleOpenConfirmDialog()
      return
    }

    await handleNextStep()
  }

  async function onSubmit(values: CreateApplicationFormValues) {
    clearErrors("root")

    try {
      await saveApplicationMutation.mutateAsync(
        toCreateApplicationRequest(values)
      )
    } catch (caughtError) {
      applyApiFormErrors({
        error: caughtError,
        fallbackMessage: isUpdate
          ? "We could not update this application. Please try again."
          : "We could not create this application. Please try again.",
        fieldNames,
        setError,
      })
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleFormSubmit}
    >
      <Card className="rounded-2xl border-white/80 bg-white/90 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
        <CardHeader className="border-b">
          <CardTitle>{currentStepDetails.title}</CardTitle>
          <CardDescription>{currentStepDetails.description}</CardDescription>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {formSteps.map((step, index) => (
              <button
                aria-current={index === currentStep ? "step" : undefined}
                className={`h-1.5 rounded-full transition ${
                  index <= currentStep ? "bg-primary" : "bg-muted"
                }`}
                disabled={isSaving}
                key={step.title}
                onClick={async () => {
                  if (index <= currentStep) {
                    setCurrentStep(index)
                    return
                  }

                  const isCurrentStepValid = await trigger(
                    currentStepDetails.fields,
                    { shouldFocus: true }
                  )

                  if (isCurrentStepValid) {
                    setCurrentStep(index)
                  }
                }}
                type="button"
              >
                <span className="sr-only">
                  Step {index + 1}: {step.title}
                </span>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <FieldGroup className="gap-8">
            {currentStep === 0 ? (
              <ApplicationFormSection title="Application details">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field data-invalid={!!errors.companyName}>
                    <FieldLabel htmlFor="companyName">Company name</FieldLabel>
                    <Input
                      aria-invalid={!!errors.companyName}
                      autoComplete="organization"
                      className="h-10 rounded-md border-input bg-background"
                      disabled={isSaving}
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
                      disabled={isSaving}
                      id="jobTitle"
                      placeholder="Frontend engineer"
                      {...register("jobTitle")}
                    />
                    <FieldError errors={[errors.jobTitle]} />
                  </Field>
                </div>
              </ApplicationFormSection>
            ) : null}

            {currentStep === 1 ? (
              <ApplicationFormSection title="Progress">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field data-invalid={!!errors.status}>
                    <FieldLabel>Status</FieldLabel>
                    <Controller
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <Select
                          disabled={isSaving}
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
            ) : null}

            {currentStep === 2 ? (
              <ApplicationFormSection title="Dates">
                <div className="grid gap-5 lg:grid-cols-2">
                  <Controller
                    control={control}
                    name="lastContactAt"
                    render={({ field }) => (
                      <ApplicationDateField
                        disabled={isSaving}
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
                        disabled={isSaving}
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
            ) : null}

            {currentStep === 3 ? (
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
                      disabled={isSaving}
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
                      disabled={isSaving}
                      id="privateNote"
                      placeholder="Only visible to you"
                      {...register("privateNote")}
                    />
                    <FieldError errors={[errors.privateNote]} />
                  </Field>
                </div>
              </ApplicationFormSection>
            ) : null}

            {errors.root?.message ? (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errors.root.message}
              </p>
            ) : null}
          </FieldGroup>
        </CardContent>

        <CardFooter className="border-t bg-muted/20">
          <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              className="h-10 rounded-lg px-4"
              disabled={isSaving}
              type="button"
              variant="outline"
              onClick={isFirstStep ? () => router.back() : handlePreviousStep}
            >
              {isFirstStep ? "Cancel" : "Back"}
            </Button>
            {isLastStep ? (
              <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <Button
                  className="h-10 rounded-lg px-4"
                  disabled={isSaving}
                  onClick={handleOpenConfirmDialog}
                  type="button"
                >
                  {actionLabel}
                </Button>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {confirmDescription}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSaving} type="button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={isSaving}
                      onClick={() => void handleSubmit(onSubmit)()}
                      type="button"
                    >
                      {isSaving ? pendingLabel : actionLabel}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                className="h-10 rounded-lg px-4"
                disabled={isSaving}
                onClick={handleNextStep}
                type="button"
              >
                Next
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}

export function ApplicationCreateForm() {
  return <ApplicationForm mode="create" />
}

export function ApplicationUpdateForm({
  application,
}: {
  application: PrivateApplicationDto
}) {
  return <ApplicationForm application={application} mode="update" />
}

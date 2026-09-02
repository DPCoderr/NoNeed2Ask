"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { useForm } from "react-hook-form"

import {
  createApplication,
  updateApplication,
} from "@/lib/api/applications"
import type {
  CreateApplicationRequestDto,
  UpdateApplicationRequestDto,
} from "@/lib/api/types"
import { applyApiFormErrors } from "@/lib/forms"
import { queryKeys } from "@/lib/query-keys"
import {
  createApplicationFormSchema,
  type CreateApplicationFormValues,
} from "@/lib/validation/applications"

import {
  applicationFormFieldNames,
  applicationFormSteps,
  getApplicationFormDefaultValues,
  toApplicationRequest,
  type ApplicationFormProps,
} from "./application-form-model"

export function useApplicationForm({ mode, application }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
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
      await queryClient.invalidateQueries({
        queryKey: queryKeys.applications.all,
      })
      router.push(`/applications/${savedApplication.id}`)
      router.refresh()
    },
  })
  const form = useForm<CreateApplicationFormValues>({
    defaultValues: getApplicationFormDefaultValues(application),
    resolver: zodResolver(createApplicationFormSchema),
  })
  const isSaving = form.formState.isSubmitting || saveApplicationMutation.isPending
  const isUpdate = mode === "update"
  const currentStepDetails =
    applicationFormSteps[currentStep] ?? applicationFormSteps[0]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === applicationFormSteps.length - 1

  async function validateCurrentStep() {
    form.clearErrors("root")

    return form.trigger(currentStepDetails.fields, { shouldFocus: true })
  }

  async function handleNextStep() {
    if (await validateCurrentStep()) {
      setCurrentStep((step) => Math.min(step + 1, applicationFormSteps.length - 1))
    }
  }

  function handlePreviousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  async function handleStepChange(step: number) {
    if (step <= currentStep) {
      setCurrentStep(step)
      return
    }

    if (await validateCurrentStep()) {
      setCurrentStep(step)
    }
  }

  async function handleOpenConfirmDialog() {
    if (await validateCurrentStep()) {
      setIsConfirmOpen(true)
    }
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
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
    form.clearErrors("root")

    try {
      await saveApplicationMutation.mutateAsync(toApplicationRequest(values))
    } catch (caughtError) {
      applyApiFormErrors({
        error: caughtError,
        fallbackMessage: isUpdate
          ? "We could not update this application. Please try again."
          : "We could not create this application. Please try again.",
        fieldNames: applicationFormFieldNames,
        setError: form.setError,
      })
    }
  }

  return {
    actionLabel: isUpdate ? "Save changes" : "Create application",
    confirmDescription: isUpdate
      ? "This will update the application with the details shown in the form."
      : "This will save the application and add it to your list.",
    confirmTitle: isUpdate ? "Save these changes?" : "Create this application?",
    currentStep,
    form,
    handleConfirm: () => void form.handleSubmit(onSubmit)(),
    handleFormSubmit,
    handleNext: isLastStep ? handleOpenConfirmDialog : handleNextStep,
    handlePreviousStep,
    handleStepChange,
    isConfirmOpen,
    isFirstStep,
    isLastStep,
    isSaving,
    pendingLabel: isUpdate ? "Saving..." : "Creating...",
    setIsConfirmOpen,
    router,
  }
}

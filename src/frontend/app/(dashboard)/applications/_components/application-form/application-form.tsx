"use client"

import { FormProvider } from "react-hook-form"

import { Card, CardContent } from "@/components/ui/card"

import { ApplicationFormActions } from "./application-form-actions"
import { ApplicationFormFields } from "./application-form-fields"
import type { ApplicationFormProps } from "./application-form-model"
import { ApplicationFormProgress } from "./application-form-progress"
import { useApplicationForm } from "./use-application-form"

export function ApplicationForm(props: ApplicationFormProps) {
  const controller = useApplicationForm(props)

  return (
    <FormProvider {...controller.form}>
      <form noValidate onSubmit={controller.handleFormSubmit}>
        <Card className="gap-0 overflow-visible rounded-2xl border-slate-200 bg-white py-0 shadow-none">
          <ApplicationFormProgress
            currentStep={controller.currentStep}
          />
          <CardContent className="px-5 py-6 sm:px-7">
            <ApplicationFormFields
              currentStep={controller.currentStep}
              disabled={controller.isSaving}
              rootError={controller.form.formState.errors.root?.message}
            />
          </CardContent>
          <ApplicationFormActions
            actionLabel={controller.actionLabel}
            confirmDescription={controller.confirmDescription}
            confirmTitle={controller.confirmTitle}
            isConfirmOpen={controller.isConfirmOpen}
            isFirstStep={controller.isFirstStep}
            isLastStep={controller.isLastStep}
            isSaving={controller.isSaving}
            onCancel={props.onCancel ?? (() => controller.router.back())}
            onConfirm={controller.handleConfirm}
            onConfirmOpenChange={controller.setIsConfirmOpen}
            onNext={controller.handleNext}
            onPrevious={controller.handlePreviousStep}
            pendingLabel={controller.pendingLabel}
          />
        </Card>
      </form>
    </FormProvider>
  )
}

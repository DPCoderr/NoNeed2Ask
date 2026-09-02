import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { applicationFormSteps } from "./application-form-model"

export function ApplicationFormProgress({
  currentStep,
  disabled,
  onStepChange,
}: {
  currentStep: number
  disabled: boolean
  onStepChange: (step: number) => void | Promise<void>
}) {
  const currentStepDetails =
    applicationFormSteps[currentStep] ?? applicationFormSteps[0]

  return (
    <CardHeader className="border-b">
      <CardTitle>{currentStepDetails.title}</CardTitle>
      <CardDescription>{currentStepDetails.description}</CardDescription>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {applicationFormSteps.map((step, index) => (
          <button
            aria-current={index === currentStep ? "step" : undefined}
            className={`h-1.5 rounded-full transition ${
              index <= currentStep ? "bg-primary" : "bg-muted"
            }`}
            disabled={disabled}
            key={step.title}
            onClick={() => void onStepChange(index)}
            type="button"
          >
            <span className="sr-only">
              Step {index + 1}: {step.title}
            </span>
          </button>
        ))}
      </div>
    </CardHeader>
  )
}

import { Check } from "lucide-react"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { applicationFormSteps } from "./application-form-model"

export function ApplicationFormProgress({ currentStep }: { currentStep: number }) {
  const current = applicationFormSteps[currentStep] ?? applicationFormSteps[0]
  return (
    <CardHeader className="gap-0 border-b border-slate-200 px-5 py-6 sm:px-7">
      <ol aria-label="Application form steps" className="mb-7 grid grid-cols-4 gap-1 sm:gap-3">
        {applicationFormSteps.map((step, index) => (
          <li key={step.title}
            aria-current={index === currentStep ? "step" : undefined}
            aria-label={`Step ${index + 1}: ${step.title}`}
            className={`flex min-h-16 min-w-0 items-center justify-center flex-col gap-2 rounded-lg px-1 py-2 text-xs ${index === currentStep ? "bg-blue-50 text-blue-800" : "text-slate-500"}`}>
            <span aria-hidden="true" className={`flex size-7 items-center justify-center rounded-full border ${index <= currentStep ? "border-[#315e96] bg-[#315e96] text-white" : "border-slate-200 bg-white"}`}>
              {index < currentStep ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span>{["Details", "Progress", "Dates", "Notes"][index]}</span>
          </li>
        ))}
      </ol>
      <p className="mb-2 text-xs text-slate-500">Step {currentStep + 1} of {applicationFormSteps.length}</p>
      <CardTitle className="text-xl tracking-tight text-slate-800">{current.title}</CardTitle>
      <CardDescription className="mt-2 leading-6 text-slate-600">{current.description}</CardDescription>
    </CardHeader>
  )
}

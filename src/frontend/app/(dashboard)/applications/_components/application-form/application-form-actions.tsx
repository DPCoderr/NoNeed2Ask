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
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"

export function ApplicationFormActions({
  actionLabel,
  confirmDescription,
  confirmTitle,
  isConfirmOpen,
  isFirstStep,
  isLastStep,
  isSaving,
  pendingLabel,
  onCancel,
  onConfirm,
  onConfirmOpenChange,
  onNext,
  onPrevious,
}: {
  actionLabel: string
  confirmDescription: string
  confirmTitle: string
  isConfirmOpen: boolean
  isFirstStep: boolean
  isLastStep: boolean
  isSaving: boolean
  pendingLabel: string
  onCancel: () => void
  onConfirm: () => void
  onConfirmOpenChange: (open: boolean) => void
  onNext: () => void | Promise<void>
  onPrevious: () => void
}) {
  return (
    <CardFooter className="rounded-b-2xl border-t border-slate-200 bg-slate-50/60 px-5 py-5 sm:px-7">
      <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          className="h-11 rounded-lg px-5"
          disabled={isSaving}
          type="button"
          variant="outline"
          onClick={isFirstStep ? onCancel : onPrevious}
        >
          {isFirstStep ? "Cancel" : "Back"}
        </Button>
        {isLastStep ? (
          <AlertDialog open={isConfirmOpen} onOpenChange={onConfirmOpenChange}>
            <Button
              className="h-11 rounded-lg px-5"
              disabled={isSaving}
              onClick={onNext}
              type="button"
            >
              {actionLabel}
            </Button>
            <AlertDialogContent className="rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
                <AlertDialogDescription>
                  {confirmDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="rounded-lg"
                  disabled={isSaving}
                  type="button"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="rounded-lg"
                  disabled={isSaving}
                  onClick={onConfirm}
                  type="button"
                >
                  {isSaving ? pendingLabel : actionLabel}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            className="h-11 rounded-lg px-5"
            disabled={isSaving}
            onClick={onNext}
            type="button"
          >
            Next
          </Button>
        )}
      </div>
    </CardFooter>
  )
}

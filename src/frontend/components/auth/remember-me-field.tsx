import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

export function RememberMeField({
  checked,
  disabled,
  inputRef,
  onBlur,
  onChange,
}: {
  checked: boolean
  disabled: boolean
  inputRef: (instance: HTMLButtonElement | null) => void
  onBlur: () => void
  onChange: (checked: boolean | "indeterminate") => void
}) {
  return (
    <Field className="w-fit gap-2" orientation="horizontal">
      <Checkbox
        checked={checked}
        disabled={disabled}
        id="rememberMe"
        onBlur={onBlur}
        onCheckedChange={onChange}
        ref={inputRef}
      />
      <FieldLabel className="font-normal" htmlFor="rememberMe">
        Remember me
      </FieldLabel>
    </Field>
  )
}

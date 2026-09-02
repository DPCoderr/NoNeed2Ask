"use client"

import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { format } from "date-fns"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  formatDateInputValue,
  getDateTimeValue,
  getDateValue,
  getSelectedDate,
  getTimeValue,
} from "./application-form-model"

export function ApplicationDateField({
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
  const [open, setOpen] = useState(false)
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
            <PopoverContent align="start" className="w-auto overflow-hidden p-0">
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

import { z } from "zod"

import { applicationStatuses } from "@/lib/api/application-status"

const optionalDateTime = z.string().refine(
  (value) => !value || !Number.isNaN(new Date(value).getTime()),
  "Enter a valid date and time."
)

export const createApplicationFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required.")
    .max(200, "Company name must be 200 characters or fewer."),
  jobTitle: z
    .string()
    .trim()
    .min(1, "Role is required.")
    .max(200, "Role must be 200 characters or fewer."),
  status: z.enum(applicationStatuses),
  publicNote: z
    .string()
    .max(2000, "Public note must be 2000 characters or fewer."),
  privateNote: z
    .string()
    .max(4000, "Private note must be 4000 characters or fewer."),
  lastContactAt: optionalDateTime,
  nextActionAt: optionalDateTime,
})

export type CreateApplicationFormValues = z.infer<
  typeof createApplicationFormSchema
>

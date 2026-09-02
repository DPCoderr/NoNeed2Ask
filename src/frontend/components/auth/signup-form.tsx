"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

import { AuthFormCard } from "@/components/auth/auth-form-card"
import { RememberMeField } from "@/components/auth/remember-me-field"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { register as registerAccount } from "@/lib/api/auth"
import { applyApiFormErrors } from "@/lib/forms"
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/lib/validation/auth"

const serverFieldNames = {
  Email: "email",
  Password: "password",
  Username: "username",
  email: "email",
  password: "password",
  username: "username",
} as const

export function SignupForm(props: React.ComponentProps<"div">) {
  const router = useRouter()
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
    resolver: zodResolver(registerFormSchema),
  })

  async function onSubmit(values: RegisterFormValues) {
    form.clearErrors()

    try {
      await registerAccount({
        username: values.username,
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      })
      router.replace("/")
      router.refresh()
    } catch (caughtError) {
      applyApiFormErrors({
        error: caughtError,
        fallbackMessage: "Something went wrong. Please try again.",
        fieldNames: serverFieldNames,
        setError: form.setError,
      })
    }
  }

  return (
    <AuthFormCard
      description="Enter your email below to create your account"
      title="Create your account"
      {...props}
    >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field data-invalid={!!form.formState.errors.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              aria-invalid={!!form.formState.errors.username}
              autoComplete="username"
              disabled={form.formState.isSubmitting}
              id="username"
              placeholder="John"
              type="text"
              {...form.register("username")}
            />
            <FieldError errors={[form.formState.errors.username]} />
          </Field>
          <Field data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              aria-invalid={!!form.formState.errors.email}
              autoComplete="email"
              disabled={form.formState.isSubmitting}
              id="email"
              placeholder="m@example.com"
              type="email"
              {...form.register("email")}
            />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>
          <Field>
            <Field className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!form.formState.errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  aria-invalid={!!form.formState.errors.password}
                  autoComplete="new-password"
                  disabled={form.formState.isSubmitting}
                  id="password"
                  type="password"
                  {...form.register("password")}
                />
                <FieldError errors={[form.formState.errors.password]} />
              </Field>
              <Field data-invalid={!!form.formState.errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input
                  aria-invalid={!!form.formState.errors.confirmPassword}
                  autoComplete="new-password"
                  disabled={form.formState.isSubmitting}
                  id="confirmPassword"
                  type="password"
                  {...form.register("confirmPassword")}
                />
                <FieldError errors={[form.formState.errors.confirmPassword]} />
              </Field>
            </Field>
            <FieldDescription>Must be at least 6 characters long.</FieldDescription>
          </Field>
          <Controller
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <RememberMeField
                checked={field.value}
                disabled={form.formState.isSubmitting}
                inputRef={field.ref}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            )}
          />
          <Field>
            {form.formState.errors.root?.message ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            ) : null}
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting
                ? "Creating account..."
                : "Create Account"}
            </Button>
            <FieldDescription className="text-center">
              Already have an account? <Link href="/login">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormCard>
  )
}

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
import { login } from "@/lib/api/auth"
import { applyApiFormErrors } from "@/lib/forms"
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/lib/validation/auth"

export function LoginForm(props: React.ComponentProps<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(values: LoginFormValues) {
    form.clearErrors("root")

    try {
      await login(values)
      const returnTo = searchParams.get("returnTo")
      const safeReturnTo =
        returnTo?.startsWith("/") && !returnTo.startsWith("//")
          ? returnTo
          : "/"

      router.replace(safeReturnTo)
      router.refresh()
    } catch (caughtError) {
      applyApiFormErrors({
        error: caughtError,
        fallbackMessage: "Something went wrong. Please try again.",
        setError: form.setError,
      })
    }
  }

  return (
    <AuthFormCard
      description="Login with your account"
      title="Welcome back"
      {...props}
    >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
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
          <Field data-invalid={!!form.formState.errors.password}>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                className="ml-auto text-sm underline-offset-4 hover:underline"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              aria-invalid={!!form.formState.errors.password}
              autoComplete="current-password"
              disabled={form.formState.isSubmitting}
              id="password"
              type="password"
              {...form.register("password")}
            />
            <FieldError errors={[form.formState.errors.password]} />
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
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link href="/register">Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormCard>
  )
}

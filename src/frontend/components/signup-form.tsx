"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { register as registerAccount } from "@/lib/api"
import { applyApiFormErrors } from "@/lib/forms"
import { cn } from "@/lib/utils"
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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const {
    formState: { errors, isSubmitting },
    clearErrors,
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormValues>({
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
    clearErrors()

    try {
      await registerAccount({
        username: values.username,
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      })

      router.push("/applications")
      router.refresh()
    } catch (caughtError) {
      applyApiFormErrors({
        error: caughtError,
        fallbackMessage: "Something went wrong. Please try again.",
        fieldNames: serverFieldNames,
        setError,
      })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            Create your account
          </CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.username}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="John"
                  autoComplete="username"
                  aria-invalid={!!errors.username}
                  disabled={isSubmitting}
                  {...register("username")}
                />
                <FieldError errors={[errors.username]} />
              </Field>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  disabled={isSubmitting}
                  {...register("email")}
                />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field>
                <Field className="grid gap-4 sm:grid-cols-2">
                  <Field data-invalid={!!errors.password}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      aria-invalid={!!errors.password}
                      disabled={isSubmitting}
                      {...register("password")}
                    />
                    <FieldError errors={[errors.password]} />
                  </Field>
                  <Field data-invalid={!!errors.confirmPassword}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      aria-invalid={!!errors.confirmPassword}
                      disabled={isSubmitting}
                      {...register("confirmPassword")}
                    />
                    <FieldError errors={[errors.confirmPassword]} />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 6 characters long.
                </FieldDescription>
              </Field>
              <Field className="flex-row items-center gap-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="size-4 rounded border-border"
                  disabled={isSubmitting}
                  {...register("rememberMe")}
                />
                <FieldLabel htmlFor="rememberMe" className="font-normal">
                  Remember me
                </FieldLabel>
              </Field>
              <Field>
                {errors.root?.message ? (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {errors.root.message}
                  </p>
                ) : null}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

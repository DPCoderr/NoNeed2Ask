"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type Resolver, useForm } from "react-hook-form"

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
import { ApiResponseError, login } from "@/lib/api"
import { cn } from "@/lib/utils"
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/lib/validation/auth"

const loginFormResolver: Resolver<LoginFormValues> = async (values) => {
  const validationResult = loginFormSchema.safeParse(values)

  if (validationResult.success) {
    return {
      values: validationResult.data,
      errors: {},
    }
  }

  return {
    values: {},
    errors: validationResult.error.issues.reduce(
      (fieldErrors, issue) => {
        const field = issue.path[0]

        if (field === "email" || field === "password") {
          fieldErrors[field] = {
            type: "validation",
            message: issue.message,
          }
        }

        return fieldErrors
      },
      {} as Record<
        keyof Pick<LoginFormValues, "email" | "password">,
        { type: string; message: string }
      >
    ),
  }
}

export function LoginForm({
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
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: loginFormResolver,
  })

  async function onSubmit(values: LoginFormValues) {
    clearErrors("root")

    try {
      await login(values)

      router.push("/applications")
      router.refresh()
    } catch (caughtError) {
      setError("root", {
        message:
          caughtError instanceof ApiResponseError
            ? caughtError.message
            : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
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
              <Field data-invalid={!!errors.password}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  disabled={isSubmitting}
                  {...register("password")}
                />
                <FieldError errors={[errors.password]} />
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
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Sign up</Link>
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

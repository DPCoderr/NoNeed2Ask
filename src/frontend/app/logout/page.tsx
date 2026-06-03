"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { logout } from "@/lib/api"

export default function LogoutPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    async function signOut() {
      try {
        await logout()
        router.replace("/")
        router.refresh()
      } catch {
        if (isActive) {
          setError("Logout failed. Please try again.")
        }
      }
    }

    void signOut()

    return () => {
      isActive = false
    }
  }, [router])

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 text-center">
      <div className="max-w-sm">
        <h1 className="text-xl font-semibold">Logging out...</h1>
        {error ? (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            You will be returned to the landing page.
          </p>
        )}
      </div>
    </main>
  )
}

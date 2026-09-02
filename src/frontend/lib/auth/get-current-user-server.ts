import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import type { AuthMeResponseDto } from "@/lib/api/auth";
import { authCookieName } from "@/lib/auth/cookies";
import { backendUrls } from "@/lib/server/backend-urls";

export const getCurrentUserServer = cache(async function getCurrentUserServer() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(authCookieName);

  if (!authCookie) {
    return null;
  }

  try {
    const response = await fetch(`${backendUrls.auth}/me`, {
      method: "GET",
      headers: {
        Cookie: `${authCookie.name}=${authCookie.value}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn("Current user lookup failed.", {
        status: response.status,
        statusText: response.statusText,
      });

      return null;
    }

    return (await response.json()) as AuthMeResponseDto;
  } catch {
    return null;
  }
});

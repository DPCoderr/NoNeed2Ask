import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import type { AuthMeResponseDto } from "@/lib/api/auth";
import { authCookieName } from "@/lib/auth/cookies";

const backendAuthBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.AUTH_BASE_URL ?? "https://noneed2ask.onrender.com/auth"
    : process.env.AUTH_BASE_URL_DEV ?? "http://localhost:5273/auth";

export const getCurrentUserServer = cache(async function getCurrentUserServer() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(authCookieName);

  if (!authCookie) {
    return null;
  }

  try {
    const response = await fetch(`${backendAuthBaseUrl}/me`, {
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

import "server-only";

import { cookies } from "next/headers";

import { ApiResponseError } from "@/lib/api/errors";
import type { AuthMeResponseDto } from "@/lib/api/auth";
import { getPublicProfileSettings } from "@/lib/api/public-profile";
import type { PublicProfileSettingsDto } from "@/lib/api/types";
import { authCookieName } from "@/lib/auth/cookies";
import { backendUrls } from "@/lib/server/backend-urls";

export type DashboardPublicProfileSettings = PublicProfileSettingsDto & {
  isSettingsAvailable: boolean;
};

export async function getDashboardPublicProfileSettings(
  user: Pick<AuthMeResponseDto, "id" | "username">
): Promise<DashboardPublicProfileSettings | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(authCookieName);

  if (!authCookie) {
    return null;
  }

  try {
    const settings = await getPublicProfileSettings({
      url: backendUrls.publicProfileSettings,
      headers: {
        Cookie: `${authCookie.name}=${authCookie.value}`,
      },
    });

    return {
      ...settings,
      isSettingsAvailable: true,
    };
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      const now = new Date().toISOString();

      return {
        userId: user.id,
        publicSlug: `${slugify(user.username)}-job-search`,
        isPublicSharingEnabled: false,
        createdAt: now,
        updatedAt: now,
        isSettingsAvailable: false,
      };
    }

    throw error;
  }
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "user";
}

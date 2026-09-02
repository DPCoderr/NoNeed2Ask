import "server-only";

import { cookies } from "next/headers";

import { listApplications } from "@/lib/api/applications";
import { authCookieName } from "@/lib/auth/cookies";
import { backendUrls } from "@/lib/server/backend-urls";

const applicationListRequest = {
  sortBy: "lastUpdated",
  sortDirection: "desc",
} as const;

export async function getDashboardApplications() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(authCookieName);

  if (!authCookie) {
    return [];
  }

  const requestOptions = {
    baseUrl: ensureTrailingSlash(backendUrls.applications),
    headers: {
      Cookie: `${authCookie.name}=${authCookie.value}`,
    },
  };

  const firstPage = await listApplications(
    { ...applicationListRequest, page: 1 },
    requestOptions
  );
  const remainingPages = Array.from(
    { length: Math.max(firstPage.totalPages - 1, 0) },
    (_, index) => index + 2
  );

  const otherPages = await Promise.all(
    remainingPages.map((page) =>
      listApplications({ ...applicationListRequest, page }, requestOptions)
    )
  );

  return [firstPage, ...otherPages].flatMap((page) => page.items);
}

function ensureTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}

import type { ApplicationListRequestDto } from "@/lib/api/types"

const applicationsRootKey = ["applications"] as const

export const queryKeys = {
  applications: {
    all: applicationsRootKey,
    detail: (id: string) => [...applicationsRootKey, "detail", id] as const,
    list: (request: ApplicationListRequestDto) =>
      [
        ...applicationsRootKey,
        "list",
        {
          page: request.page ?? 1,
          search: request.search?.trim() ?? "",
          sortBy: request.sortBy ?? "lastUpdated",
          sortDirection: request.sortDirection ?? "desc",
          status: request.status ?? [],
        },
      ] as const,
  },
  auth: {
    session: ["auth", "session"] as const,
  },
} as const

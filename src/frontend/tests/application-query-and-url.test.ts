import { describe, expect, it } from "vitest"

import {
  applicationListQueryKey,
  toApplicationListRequest,
} from "@/app/(dashboard)/applications/_lib/application-list-query"
import {
  createApplicationListUrl,
  createApplicationUrl,
} from "@/lib/api/applications"
import { queryKeys } from "@/lib/query-keys"

describe("application list query state", () => {
  it("normalizes invalid pages and whitespace", () => {
    expect(
      toApplicationListRequest({
        page: 0,
        search: "  frontend  ",
        sortBy: "lastUpdated",
        sortDirection: "desc",
        status: ["applied"],
      })
    ).toEqual({
      page: 1,
      pageSize: 10,
      search: "frontend",
      sortBy: "lastUpdated",
      sortDirection: "desc",
      status: ["applied"],
    })
  })

  it("uses the centralized stable query key", () => {
    const request = { page: 2, search: "  Acme " } as const

    expect(applicationListQueryKey(request)).toEqual(
      queryKeys.applications.list(request)
    )
    expect(queryKeys.applications.all).toEqual(["applications"])
  })
})

describe("application URLs", () => {
  it("keeps the existing list query shape", () => {
    expect(
      createApplicationListUrl({
        page: 2,
        search: "  product engineer ",
        status: ["applied", "offer"],
        sortBy: "company",
        sortDirection: "asc",
      })
    ).toBe(
      "/api/applications?page=2&status=applied&status=offer&search=product+engineer&sortBy=company&sortDirection=asc"
    )
  })

  it("encodes ids for relative and absolute detail URLs", () => {
    expect(createApplicationUrl("id/with space")).toBe(
      "/api/applications/id%2Fwith%20space"
    )
    expect(
      createApplicationUrl(
        "id/with space",
        "https://api.example.com/applications/"
      )
    ).toBe("https://api.example.com/applications/id%2Fwith%20space")
  })
})

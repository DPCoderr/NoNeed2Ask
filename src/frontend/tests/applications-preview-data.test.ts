import { describe, expect, it } from "vitest";
import { applicationPreviewRows, getPreviewApplicationPage, initialApplicationRequest } from "@/app/preview-design/_lib/applications-preview-data";

describe("local application preview", () => {
  it("combines search and status filters without changing source data", () => {
    const page = getPreviewApplicationPage(applicationPreviewRows, { ...initialApplicationRequest, search: "NORTHSTAR", status: ["interview_planned"] });
    expect(page.totalItems).toBe(1);
    expect(page.items[0].companyName).toBe("Northstar Labs");
    expect(applicationPreviewRows).toHaveLength(18);
  });
  it("sorts before paginating and reports the final partial page", () => {
    const page = getPreviewApplicationPage(applicationPreviewRows, { ...initialApplicationRequest, sortBy: "company", sortDirection: "asc", page: 2 });
    expect(page.totalPages).toBe(2);
    expect(page.items).toHaveLength(8);
    const sorted = [...applicationPreviewRows].sort((a, b) => a.companyName.localeCompare(b.companyName));
    expect(page.items).toEqual(sorted.slice(10));
  });
});

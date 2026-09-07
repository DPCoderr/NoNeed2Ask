import type { ApplicationListResponseDto, PrivateApplicationDto } from "@/lib/api/types";
import type { ResolvedApplicationListRequest } from "@/app/(dashboard)/applications/_lib/application-list-query";
import { pageSize } from "@/app/(dashboard)/applications/application-list-config";
import { previewApplications } from "./preview-data";

const companies = ["Northstar Labs", "Kindred Health", "Atlas Works", "Forma Studio", "Orbit", "Oak & Field", "Monograph", "Linear Path", "Evergreen", "Daybreak", "Common Ground", "Brightside", "Fieldwork", "Meridian", "Juniper", "Relay", "Paperplane", "Horizon"];
export const applicationPreviewRows: PrivateApplicationDto[] = previewApplications.map((application, index) => ({
  ...application,
  id: application.id!,
  companyName: companies[index],
  createdAt: application.createdAt!,
  privateNote: application.privateNote ?? null,
  lastContactAt: null,
}));

export const applicationScenarios = ["Populated", "Empty", "No results", "Loading", "Error", "Long names", "Many pages", "Delete error"] as const;
export type ApplicationPreviewScenario = typeof applicationScenarios[number];
export const initialApplicationRequest: ResolvedApplicationListRequest = { page: 1, pageSize, status: [], search: "", sortBy: "lastUpdated", sortDirection: "desc" };

export function getPreviewApplicationPage(rows: PrivateApplicationDto[], request: ResolvedApplicationListRequest): ApplicationListResponseDto {
  const search = request.search.toLowerCase().trim();
  const filtered = rows.filter((row) => (!request.status.length || request.status.includes(row.status)) && (!search || (row.companyName + " " + row.jobTitle).toLowerCase().includes(search)));
  const field = { company: "companyName", role: "jobTitle", status: "status", lastUpdated: "updatedAt" } as const;
  filtered.sort((a, b) => a[field[request.sortBy]].localeCompare(b[field[request.sortBy]]) * (request.sortDirection === "asc" ? 1 : -1));
  return { items: filtered.slice((request.page - 1) * request.pageSize, request.page * request.pageSize), page: request.page, pageSize: request.pageSize, totalItems: filtered.length, totalPages: Math.ceil(filtered.length / request.pageSize) };
}

export function getPreviewRows(scenario: ApplicationPreviewScenario) {
  if (scenario === "Empty" || scenario === "Error") return [];
  if (scenario === "Many pages") return Array.from({ length: 83 }, (_, index) => ({ ...applicationPreviewRows[index % applicationPreviewRows.length], id: `many-${index}`, companyName: `${companies[index % companies.length]} ${index + 1}` }));
  if (scenario === "Long names") return applicationPreviewRows.map((row) => ({ ...row, companyName: "Northstar International Research & Technology Collective", jobTitle: "Senior Frontend Engineer, Accessibility & Design Systems" }));
  return applicationPreviewRows;
}

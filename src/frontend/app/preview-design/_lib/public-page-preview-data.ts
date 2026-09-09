import type { PublicStatusApplicationDto, PublicStatusProfileDto } from "@/lib/api/types";

export const publicPreviewDate = new Date("2026-09-07T09:00:00Z");
export const publicPreviewProfile: PublicStatusProfileDto = {
  publicPageId: "aee53011-d8b3-42aa-82b5-aaf58a1eb81f", displayName: "Alex Morgan", isPublicSharingEnabled: true, updatedAt: "2026-09-07T08:30:00Z",
};
export const publicPreviewApplications: PublicStatusApplicationDto[] = [
  { companyName: "Northstar Labs", jobTitle: "Senior Frontend Engineer", status: "interview_planned", nextActionAt: "2026-09-09T10:30:00Z", updatedAt: "2026-09-07T08:30:00Z", publicNote: "Looking forward to meeting the team." },
  { companyName: "Kindred Health", jobTitle: "Product Engineer", status: "applied", nextActionAt: null, updatedAt: "2026-09-06T09:00:00Z", publicNote: null },
  { companyName: "Atlas Works", jobTitle: "Full Stack Developer", status: "interview_done", nextActionAt: null, updatedAt: "2026-09-05T09:00:00Z", publicNote: null },
  { companyName: "Forma Studio", jobTitle: "Frontend Developer", status: "offer", nextActionAt: null, updatedAt: "2026-09-04T09:00:00Z", publicNote: null },
  { companyName: "Orbit", jobTitle: "Software Engineer", status: "paused", nextActionAt: null, updatedAt: "2026-09-03T09:00:00Z", publicNote: null },
  { companyName: "Oak & Field", jobTitle: "Product Engineer", status: "rejected", nextActionAt: null, updatedAt: "2026-09-02T09:00:00Z", publicNote: null },
  { companyName: "Common Ground", jobTitle: "Frontend Engineer", status: "applied", nextActionAt: null, updatedAt: "2026-09-01T09:00:00Z", publicNote: null },
  { companyName: "Brightside", jobTitle: "Software Engineer", status: "applied", nextActionAt: null, updatedAt: "2026-08-31T09:00:00Z", publicNote: null },
];
export const publicPreviewScenarios = ["Populated", "Private", "Private · signed in", "Empty", "No interview", "Loading", "Error", "Not found", "Long text"] as const;
export type PublicPreviewScenario = typeof publicPreviewScenarios[number];

export function getPublicPreviewData(scenario: PublicPreviewScenario) {
  const profile = scenario === "Long text" ? { ...publicPreviewProfile, displayName: "Alexandra Morgan-Sutherland van der Meer" } : publicPreviewProfile;
  let applications = scenario === "Empty" ? [] : publicPreviewApplications;
  if (scenario === "No interview") applications = applications.map((application) => ({ ...application, nextActionAt: null }));
  if (scenario === "Long text") applications = applications.map((application, index) => ({
    ...application,
    companyName: index === 0 ? "NorthstarInternationalTechnologyAndResearchCollective" : `${application.companyName} — International Technology & Research Division`,
    jobTitle: "Senior Frontend Engineer, Accessibility & Cross-Platform Design Systems for Global Product Experiences",
  }));
  return { applications, profile };
}

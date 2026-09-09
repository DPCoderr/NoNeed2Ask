import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import { OwnerDashboard } from "@/components/dashboard/owner/owner-dashboard";
import { OwnerSharing } from "@/components/dashboard/owner/owner-sharing";
import { mockPrivateApplications } from "@/lib/api/fixtures";

const { updateSettings } = vi.hoisted(() => ({ updateSettings: vi.fn() }));
vi.mock("@/lib/api/public-profile", () => ({ updatePublicProfileSettings: updateSettings }));

describe("owner dashboard", () => {
  it("keeps application destinations and the existing recent-item limit", () => {
    const data = buildDashboardData(mockPrivateApplications);
    render(<OwnerDashboard data={data} userDisplayName="Alex" nextInterview={{ companyName: "Northstar Labs", jobTitle: "Engineer", dateLabel: "Sep 12", href: "/applications/app_001" }} sharing={<span>Sharing controls</span>} />);

    expect(screen.getByRole("link", { name: "Add application" })).toHaveAttribute("href", "/applications/create");
    expect(screen.getByRole("link", { name: "View all" })).toHaveAttribute("href", "/applications");
    expect(screen.getByRole("link", { name: "View application" })).toHaveAttribute("href", "/applications/app_001");
    const recent = within(screen.getByRole("list", { name: "Recent applications" }));
    expect(recent.getAllByRole("listitem")).toHaveLength(3);
    for (const application of data.recentApplications) {
      expect(recent.getByRole("link", { name: new RegExp(application.companyName) })).toHaveAttribute("href", `/applications/${application.id}`);
    }
    expect(screen.queryByText(mockPrivateApplications[0].privateNote!)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 }).closest("header")).toContainElement(screen.getByText("Sharing controls"));
  });

  it("renders a zero-data overview without inventing an appointment", () => {
    render(<OwnerDashboard data={buildDashboardData([])} userDisplayName="Alex" sharing={null} />);
    expect(screen.getByRole("img", { name: "0 applications distributed across 6 statuses" })).toBeInTheDocument();
    expect(screen.getByText(/No upcoming interview scheduled/)).toBeInTheDocument();
    expect(screen.getByText(/Add your first application/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View application" })).not.toBeInTheDocument();
  });
});

function renderSharing(available = true) {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  render(<QueryClientProvider client={client}><OwnerSharing isPublicProfileAvailable={available} isPublicSharingEnabled={false} publicPageId="aee53011-d8b3-42aa-82b5-aaf58a1eb81f" /></QueryClientProvider>);
}

describe("owner sharing", () => {
  it("preserves the request, pending state, and preview visibility", async () => {
    const user = userEvent.setup();
    let finish!: () => void;
    updateSettings.mockImplementationOnce(() => new Promise<void>((resolve) => { finish = resolve; }));
    renderSharing();
    expect(screen.queryByRole("link", { name: "Preview page" })).not.toBeInTheDocument();
    expect(screen.getByRole("switch")).not.toBeChecked();

    await user.click(screen.getByRole("switch"));
    await waitFor(() => expect(updateSettings).toHaveBeenCalledWith({ isPublicSharingEnabled: true }));
    expect(screen.getByRole("switch")).toBeDisabled();
    expect(screen.getByRole("switch")).toBeChecked();
    expect(screen.getByRole("link", { name: "Preview page" })).toHaveAttribute("href", "/status/aee53011-d8b3-42aa-82b5-aaf58a1eb81f");
    await act(async () => finish());
    await waitFor(() => expect(screen.getByRole("switch")).toBeEnabled());
  });

  it("restores the switch and hides preview when saving fails", async () => {
    updateSettings.mockRejectedValueOnce(new Error("offline"));
    renderSharing();
    await userEvent.setup().click(screen.getByRole("switch"));
    await waitFor(() => expect(screen.getByRole("switch")).not.toBeChecked());
    expect(screen.queryByRole("link", { name: "Preview page" })).not.toBeInTheDocument();
  });

  it("cannot mutate unavailable sharing settings", async () => {
    renderSharing(false);
    await userEvent.setup().click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toBeDisabled();
    expect(updateSettings).not.toHaveBeenCalled();
  });
});

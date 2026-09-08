import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PublicStatusContent } from "@/components/status/public-status-content";
import { PublicPagePreview } from "@/app/preview-design/_components/public-page-preview";
import { publicPreviewApplications, publicPreviewDate, publicPreviewProfile } from "@/app/preview-design/_lib/public-page-preview-data";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }), usePathname: () => "/preview-design/public-page" }));

describe("public status presentation", () => {
  it("closes the navigation with Escape and returns focus to its trigger", async () => {
    const user = userEvent.setup();
    render(<PublicPagePreview />);
    const trigger = screen.getByRole("button", { name: "Toggle navigation menu" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const links = screen.getAllByRole("link", { name: "Log in" });
    links.at(-1)?.focus();
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(screen.getAllByRole("link", { name: "Log in" })).toHaveLength(1);
  });

  it("preserves sorting, the ten-item limit, next interview and public-only fields", () => {
    const applications = Array.from({ length: 12 }, (_, index) => ({
      ...publicPreviewApplications[0], companyName: `Company ${index}`, updatedAt: `2026-08-${String(index + 1).padStart(2, "0")}T09:00:00Z`,
      nextActionAt: index === 5 ? "2026-09-08T10:30:00Z" : "2026-09-09T10:30:00Z", privateNote: "Never publish this private note", id: "private-id", userId: "private-user",
    }));
    render(<PublicStatusContent applications={applications} profile={publicPreviewProfile} now={publicPreviewDate} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(10);
    expect(within(items[0]).getByRole("heading", { name: "Company 11" })).toBeInTheDocument();
    expect(within(items[9]).getByRole("heading", { name: "Company 2" })).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Up next" })).getByRole("heading", { name: "Company 5" })).toBeInTheDocument();
    expect(screen.getByText("12", { selector: "p > span" })).toBeInTheDocument();
    expect(document.body.innerHTML).not.toMatch(/Never publish|private-id|private-user/);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    for (const id of ["overview", "journey", "updates"]) expect(document.getElementById(id)).toBeInTheDocument();
  });

  it("keeps privacy, empty and loading states free of profile/application details", async () => {
    const user = userEvent.setup();
    render(<PublicPagePreview />);
    const scenario = screen.getByRole("combobox", { name: "Preview scenario" });
    await user.selectOptions(scenario, "Private");
    expect(screen.getByRole("heading", { name: "This status page is private" })).toBeInTheDocument();
    expect(screen.queryByText(/Alex Morgan/)).not.toBeInTheDocument();
    expect(screen.queryByText("Northstar Labs")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Return to dashboard" })).not.toBeInTheDocument();
    await user.selectOptions(scenario, "Private · signed in");
    expect(screen.getByRole("link", { name: "Return to dashboard" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Applications" })).toHaveAttribute("href", "/applications");
    await user.click(screen.getByRole("link", { name: "Return to dashboard" }));
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("Preview destination: /");
    await user.selectOptions(scenario, "Empty");
    expect(screen.getByRole("heading", { name: "No public applications yet" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "No upcoming interview" })).toBeInTheDocument();
    await user.selectOptions(scenario, "Loading");
    expect(screen.getByRole("status", { name: "Loading public status" })).toBeInTheDocument();
    expect(screen.queryByText(/Alex Morgan/)).not.toBeInTheDocument();
  });

  it("retries locally and keeps navigation inside the preview", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<PublicPagePreview />);
    await user.selectOptions(screen.getByRole("combobox", { name: "Preview scenario" }), "Error");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByRole("heading", { name: "Alex Morgan's job search" })).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Log in" }));
    expect(screen.getByRole("status")).toHaveTextContent("Preview destination: /login");
    expect(push).not.toHaveBeenCalled();
    await user.selectOptions(screen.getByRole("combobox", { name: "Preview page" }), "applications");
    expect(push).toHaveBeenCalledWith("/preview-design/applications");
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});

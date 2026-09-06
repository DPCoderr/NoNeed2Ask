import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const mocks = vi.hoisted(() => ({ logout: vi.fn(), replace: vi.fn(), refresh: vi.fn() }));
vi.mock("@/lib/api/auth", () => ({ logout: mocks.logout }));
vi.mock("next/navigation", () => ({ usePathname: () => "/applications", useRouter: () => ({ replace: mocks.replace, refresh: mocks.refresh }) }));

async function openAccountMenu() {
  const user = userEvent.setup();
  render(<SidebarProvider><AppSidebar currentUser={{ id: "1", username: "Alex", email: "alex@example.com" }} /></SidebarProvider>);
  await user.click(screen.getByRole("button", { name: "Account menu" }));
  return user;
}

describe("app sidebar", () => {
  it("keeps routes, active navigation and successful logout behavior", async () => {
    mocks.logout.mockResolvedValueOnce(undefined);
    const user = await openAccountMenu();
    expect(screen.getByRole("menuitem", { name: "Settings" })).toHaveAttribute("href", "/settings");
    await user.click(screen.getByRole("menuitem", { name: "Logout" }));
    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/"));
    expect(mocks.refresh).toHaveBeenCalledOnce();
    expect(screen.getByRole("link", { name: "Applications" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/");
  });

  it("keeps the account signed in and allows retry after logout fails", async () => {
    mocks.logout.mockRejectedValueOnce(new Error("offline"));
    const user = await openAccountMenu();
    await user.click(screen.getByRole("menuitem", { name: "Logout" }));
    await screen.findByRole("alert");
    expect(mocks.replace).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Account menu" }));
    expect(screen.getByRole("menuitem", { name: "Logout" })).not.toHaveAttribute("data-disabled");
  });
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ApplicationActionsMenu } from "@/app/(dashboard)/applications/_components/applications-results/application-actions-menu";
import { mockPrivateApplications } from "@/lib/api/fixtures";

const mocks = vi.hoisted(() => ({ deleteApplication: vi.fn(), push: vi.fn() }));
vi.mock("@/lib/api/applications", () => ({ deleteApplication: mocks.deleteApplication }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));

async function openMenu() {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const invalidate = vi.spyOn(client, "invalidateQueries");
  render(<QueryClientProvider client={client}><ApplicationActionsMenu application={mockPrivateApplications[0]} /></QueryClientProvider>);
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Actions for Northstar Labs" }));
  return { user, invalidate };
}

describe("application actions", () => {
  it("preserves the edit destination", async () => {
    const { user } = await openMenu();
    await user.click(screen.getByRole("menuitem", { name: "Edit application" }));
    expect(mocks.push).toHaveBeenCalledWith("/applications/app_001/update");
  });

  it("requires the dialog confirmation and preserves deletion and invalidation", async () => {
    mocks.deleteApplication.mockResolvedValueOnce(undefined);
    const { user, invalidate } = await openMenu();
    await user.click(screen.getByRole("menuitem", { name: "Delete application" }));
    const dialog = within(screen.getByRole("alertdialog"));
    expect(mocks.deleteApplication).not.toHaveBeenCalled();
    await user.click(dialog.getByRole("button", { name: "Delete" }));
    await waitFor(() => expect(invalidate).toHaveBeenCalledWith({ queryKey: ["applications"] }));
    expect(mocks.deleteApplication).toHaveBeenCalledWith("app_001");
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  });

  it("shows a failed deletion without closing the dialog", async () => {
    mocks.deleteApplication.mockRejectedValueOnce(new Error("offline"));
    const { user } = await openMenu();
    await user.click(screen.getByRole("menuitem", { name: "Delete application" }));
    await user.click(within(screen.getByRole("alertdialog")).getByRole("button", { name: "Delete" }));
    await screen.findByRole("alert");
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mocks.deleteApplication).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByRole("button", { name: "Actions for Northstar Labs" })).toHaveFocus());
  });
});

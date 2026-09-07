import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ApplicationsToolbar } from "@/app/(dashboard)/applications/_components/applications-toolbar/applications-toolbar";
import { ApplicationsListView } from "@/app/(dashboard)/applications/_components/applications-list-view";
import { ApplicationsPagination } from "@/app/(dashboard)/applications/_components/applications-results/applications-pagination";
import type { ResolvedApplicationListRequest } from "@/app/(dashboard)/applications/_lib/application-list-query";
import type { ApplicationListResponseDto } from "@/lib/api/types";

const request: ResolvedApplicationListRequest = { page: 1, pageSize: 10, search: "", status: [], sortBy: "lastUpdated", sortDirection: "desc" };
const empty: ApplicationListResponseDto = { items: [], page: 1, pageSize: 10, totalItems: 0, totalPages: 0 };

describe("application toolbar", () => {
  it("submits searches and preserves multiple selected statuses", async () => {
    const user = userEvent.setup();
    const search = vi.fn();
    const status = vi.fn();
    render(<ApplicationsToolbar request={{ ...request, status: ["applied"] }} onSearchChange={search} onStatusChange={status} onSortChange={vi.fn()} />);
    await user.type(screen.getByRole("searchbox"), "Northstar");
    expect(search).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(search).toHaveBeenCalledWith("Northstar");
    await user.click(screen.getByRole("button", { name: "Interview planned" }));
    expect(status).toHaveBeenLastCalledWith(["applied", "interview_planned"]);
    await user.click(screen.getByRole("button", { name: "Applied" }));
    expect(status).toHaveBeenLastCalledWith([]);
  });

  it("reflects updated URL search and sort values on rerender", () => {
    const props = { onSearchChange: vi.fn(), onStatusChange: vi.fn(), onSortChange: vi.fn() };
    const { rerender } = render(<ApplicationsToolbar request={request} {...props} />);
    rerender(<ApplicationsToolbar request={{ ...request, search: "Atlas", sortBy: "company", sortDirection: "asc" }} {...props} />);
    expect(screen.getByRole("searchbox")).toHaveValue("Atlas");
    expect(screen.getByRole("combobox", { name: "Sort applications by" })).toHaveTextContent("Company");
    expect(screen.getByRole("combobox", { name: "Sort direction" })).toHaveTextContent("Ascending");
  });
});

describe("application list states", () => {
  const actions = { changeSearch: vi.fn(), changeStatus: vi.fn(), changeSort: vi.fn(), changePage: vi.fn(), prefetchPage: vi.fn() };
  it("distinguishes first-use, no matches, loading and error", async () => {
    const retry = vi.fn();
    const props = { applications: empty, request, actions, onRetry: retry };
    const { rerender } = render(<ApplicationsListView {...props} />);
    expect(screen.getByText("Your next chapter starts here.")).toBeInTheDocument();
    rerender(<ApplicationsListView {...props} request={{ ...request, search: "missing" }} />);
    expect(screen.getByText("No applications found.")).toBeInTheDocument();
    rerender(<ApplicationsListView {...props} isLoading />);
    expect(screen.getByLabelText("Loading applications")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("Your next chapter starts here.")).not.toBeInTheDocument();
    rerender(<ApplicationsListView {...props} isError />);
    expect(screen.getByRole("alert")).toHaveTextContent("couldn’t be loaded");
    await userEvent.setup().click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it("disables page navigation at boundaries and keeps prefetch callbacks", async () => {
    const change = vi.fn();
    const prefetch = vi.fn();
    render(<ApplicationsPagination applications={{ ...empty, totalItems: 21, totalPages: 3 }} onPageChange={change} onPagePrefetch={prefetch} />);
    const navigation = within(screen.getByRole("navigation", { name: "Application pages" }));
    expect(navigation.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(navigation.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
    await userEvent.setup().hover(navigation.getByRole("button", { name: "Next page" }));
    expect(prefetch).toHaveBeenCalledWith(2);
    await userEvent.setup().click(navigation.getByRole("button", { name: "Next page" }));
    expect(change).toHaveBeenCalledWith(2);
  });
});

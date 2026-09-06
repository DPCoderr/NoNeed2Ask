import { afterEach, describe, expect, it, vi } from "vitest";

const { notFound } = vi.hoisted(() => ({ notFound: vi.fn(() => { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); }) }));
vi.mock("next/navigation", () => ({ notFound }));
vi.mock("@/app/design-preview/_components/dashboard-preview", () => ({ DashboardPreview: () => null }));

import DesignPreviewPage from "@/app/design-preview/page";

afterEach(() => vi.unstubAllEnvs());

describe("design preview boundary", () => {
  it("returns 404 in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(DesignPreviewPage()).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it("is available in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    await expect(DesignPreviewPage()).resolves.toBeTruthy();
    expect(notFound).not.toHaveBeenCalled();
  });
});

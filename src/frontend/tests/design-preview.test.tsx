import { afterEach, describe, expect, it, vi } from "vitest";

const { notFound } = vi.hoisted(() => ({ notFound: vi.fn(() => { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); }) }));
vi.mock("next/navigation", () => ({ notFound }));
vi.mock("@/app/preview-design/_components/dashboard-preview", () => ({ DashboardPreview: () => null }));
vi.mock("@/app/preview-design/_components/applications-preview", () => ({ ApplicationsPreview: () => null }));
vi.mock("@/app/preview-design/_components/public-page-preview", () => ({ PublicPagePreview: () => null }));

import DesignPreviewPage from "@/app/design-preview/page";
import PreviewDesignPage from "@/app/preview-design/[pageName]/page";

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

  it.each(["dashboard", "applications", "public-page", "unknown"])("rejects %s previews in production", async (pageName) => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(PreviewDesignPage({ params: Promise.resolve({ pageName }) })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it.each(["dashboard", "applications", "public-page"])("renders the %s development preview", async (pageName) => {
    vi.stubEnv("NODE_ENV", "development");
    await expect(PreviewDesignPage({ params: Promise.resolve({ pageName }) })).resolves.toBeTruthy();
  });

  it("returns 404 for unknown preview pages", async () => {
    vi.stubEnv("NODE_ENV", "development");
    await expect(PreviewDesignPage({ params: Promise.resolve({ pageName: "unknown" }) })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});

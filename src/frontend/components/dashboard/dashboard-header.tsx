"use client";

import { useState, type ReactNode } from "react";

import { PublicProfileSharingSwitch } from "@/components/dashboard/public-profile-sharing-switch";
import { PreviewPublicPageButton } from "@/components/dashboard/preview-public-page-button";

export type DashboardHeaderProps = {
  actions?: ReactNode;
  description?: string;
  eyebrow?: string;
  isPublicProfileAvailable?: boolean;
  isPublicSharingEnabled?: boolean;
  publicSlug?: string;
  title?: string;
  userDisplayName?: string;
};

export function DashboardHeader({
  actions,
  description,
  eyebrow = "Private dashboard",
  isPublicProfileAvailable,
  isPublicSharingEnabled,
  publicSlug,
  title,
  userDisplayName,
}: DashboardHeaderProps) {
  const [isPublicSharingPreviewEnabled, setIsPublicSharingPreviewEnabled] =
    useState(Boolean(isPublicSharingEnabled));
  const headerTitle = title ?? `Welcome back, ${userDisplayName}`;
  const headerDescription =
    description ??
    "Your applications, upcoming interview, and latest progress at a glance.";
  const headerActions =
    actions ??
    (publicSlug ? (
      <>
        <PublicProfileSharingSwitch
          disabled={!isPublicProfileAvailable}
          initialEnabled={Boolean(isPublicSharingEnabled)}
          onEnabledChange={setIsPublicSharingPreviewEnabled}
        />
        {isPublicProfileAvailable && isPublicSharingPreviewEnabled ? (
          <PreviewPublicPageButton
            isAvailable={Boolean(isPublicProfileAvailable)}
            publicSlug={publicSlug}
          />
        ) : null}
      </>
    ) : null);

  return (
    <section className="py-3 sm:py-5 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:py-6">
      <header className="min-w-0 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl text-balance break-words text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-[2.8rem] lg:text-5xl">
          {headerTitle}
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {headerDescription}
        </p>
      </header>

      {headerActions ? (
        <div className="mt-4 w-full shrink-0 sm:mt-6 lg:ml-auto lg:mt-0 lg:max-w-sm">
          <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-900/55">
            Sharing
          </p>
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 rounded-2xl border border-blue-100 bg-white p-3 text-sm font-semibold text-slate-900 shadow-[0_18px_55px_-40px_rgb(30_64_175_/_0.55)]">
            {headerActions}
          </div>
        </div>
      ) : null}
    </section>
  );
}

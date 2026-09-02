"use client";

import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, type ReactNode } from "react";

import { PublicProfileSharingSwitch } from "@/components/dashboard/public-profile-sharing-switch";
import { Button } from "@/components/ui/button";

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

const previewButtonClassName =
  "h-10 rounded-xl border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-800 shadow-none hover:border-blue-300 hover:bg-blue-100 hover:text-blue-950";

function PreviewPublicPageButton({
  isAvailable,
  publicSlug,
}: {
  isAvailable: boolean;
  publicSlug: string;
}) {
  const content = (
    <>
      Preview public page
      <HugeiconsIcon
        aria-hidden="true"
        className="ml-2 size-4"
        icon={ArrowUpRight01Icon}
        strokeWidth={2}
      />
    </>
  );

  if (!isAvailable) {
    return (
      <Button
        className={previewButtonClassName}
        disabled
        size="sm"
        variant="outline"
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      asChild
      className={previewButtonClassName}
      size="sm"
      variant="outline"
    >
      <Link href={`/status/${publicSlug}`}>{content}</Link>
    </Button>
  );
}

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
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-blue-200/80 bg-[linear-gradient(135deg,#f8fbff_0%,#eaf5ff_58%,#f6fbff_100%)] px-6 py-7 shadow-[0_30px_90px_-60px_rgb(30_64_175_/_0.65)] sm:px-9 sm:py-8 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-10 lg:py-9">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgb(29_112_168_/_0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgb(29_112_168_/_0.055)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(105deg,black,transparent_78%)]" />
      <div aria-hidden="true" className="absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-cyan-200/55 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 left-1/4 -z-10 size-80 rounded-full bg-blue-200/45 blur-3xl" />

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
        <div className="mt-7 w-full max-w-sm shrink-0 lg:mt-0">
          <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-900/55">
            Sharing
          </p>
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-white/85 p-2.5 text-sm font-semibold text-slate-900 shadow-[0_18px_55px_-40px_rgb(30_64_175_/_0.55)] backdrop-blur">
            {headerActions}
          </div>
        </div>
      ) : null}
    </section>
  );
}

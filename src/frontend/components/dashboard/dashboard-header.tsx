import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";

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
  "h-9 rounded-lg border-blue-100 bg-white/75 px-4 text-sm font-semibold text-slate-950 shadow-sm shadow-blue-950/5 hover:bg-white";

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
  const headerTitle = title ?? `Welcome back, ${userDisplayName}`;
  const headerDescription =
    description ??
    "A private command center for the job search: pipeline health, follow-ups, and public status visibility.";
  const headerActions =
    actions ??
    (publicSlug ? (
      <>
        <PublicProfileSharingSwitch
          disabled={!isPublicProfileAvailable}
          initialEnabled={Boolean(isPublicSharingEnabled)}
        />
        <PreviewPublicPageButton
          isAvailable={Boolean(isPublicProfileAvailable)}
          publicSlug={publicSlug}
        />
      </>
    ) : null);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <header className="max-w-2xl pt-1 lg:pt-2">
        <p className="text-sm font-semibold text-blue-700">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:mt-4 lg:text-5xl">
          {headerTitle}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-950/75 sm:text-base sm:leading-8 lg:mt-5">
          {headerDescription}
        </p>
      </header>

      {headerActions ? (
        <div className="flex shrink-0 flex-wrap items-center justify-start gap-3 pr-1 text-sm font-semibold text-slate-950 lg:justify-end lg:gap-4 ">
          {headerActions}
        </div>
      ) : null}
    </div>
  );
}

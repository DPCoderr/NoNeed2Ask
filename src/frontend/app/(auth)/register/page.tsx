import Image from "next/image";
import { Suspense } from "react";

import { SignupForm } from "@/components/signup-form";
import { LandingNavbar } from "@/components/layout/landing-navbar";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
      <Image
        src="/bg-landing-noneed2ask.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/25 to-background/70" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent via-background/75 to-background" />

      <LandingNavbar />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-start justify-center px-6 pb-12 pt-32 md:px-8 md:pb-16 md:pt-36 lg:items-center lg:py-28">
        <div className="flex w-full max-w-sm flex-col gap-5">
          <Suspense>
            <SignupForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

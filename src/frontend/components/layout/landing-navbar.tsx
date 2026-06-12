"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LandingNavItem = {
  href: string;
  label: string;
};

type LandingNavbarProps = {
  isAuthenticated?: boolean;
  navItems?: LandingNavItem[];
};

const defaultNavItems = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#applications", label: "Applications" },
  { href: "#public-status", label: "Public page" },
];

export function LandingNavbar({
  isAuthenticated = false,
  navItems = defaultNavItems,
}: LandingNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-4 top-4 z-50 mx-auto max-w-6xl border border-white/70 bg-white/90 shadow-lg shadow-foreground/5 backdrop-blur-xl",
        isMenuOpen ? "rounded-3xl" : "rounded-full",
      )}
    >
      <div className="flex w-full items-center justify-between px-4 py-2.5 md:px-5">
        <Link
          className="flex items-center gap-3 font-semibold text-foreground"
          href="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/logo-transparent.png"
            height={36}
            width={36}
            alt="NoNeed2Ask logo"
          />
          <span>NoNeed2Ask</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a
              className="transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {isAuthenticated ? (
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild size="lg">
              <Link href="/">Dashboard</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/50"
            >
              <Link href="/applications">Applications</Link>
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild size="lg">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/50"
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}

        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden"
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={cn(
                "h-0.5 w-5 rounded-full bg-current transition-transform",
                isMenuOpen && "translate-y-1 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-5 rounded-full bg-current transition-transform",
                isMenuOpen && "-translate-y-1 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-border/60 px-4 pb-4 pt-2 md:hidden">
          <nav className="grid gap-1 text-sm font-medium text-muted-foreground">
            {navItems.map((item) => (
              <a
                className="rounded-2xl px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {isAuthenticated ? (
            <div className="mt-3 grid gap-2">
              <Button asChild size="lg">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href="/applications"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Applications
                </Link>
              </Button>
            </div>
          ) : (
            <div className="mt-3 grid gap-2">
              <Button asChild size="lg">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
}

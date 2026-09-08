"use client";

import { useRef, useState, type ReactNode } from "react";
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
  actions?: ReactNode;
  className?: string;
};

const defaultNavItems = [
  { href: "/#dashboard", label: "How it works" },
  { href: "/#applications", label: "Private tracker" },
  { href: "/#public-status", label: "Public status" },
];

export function LandingNavbar({
  isAuthenticated = false,
  navItems = defaultNavItems,
  actions,
  className,
}: LandingNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  function closeMenu() {
    setIsMenuOpen(false);
    if (isMenuOpen) menuTrigger.current?.focus();
  }

  return (
    <header
      onKeyDown={(event) => { if (event.key === "Escape" && isMenuOpen) { event.preventDefault(); closeMenu(); } }}
      className={cn(
        "landing-safe-nav fixed inset-x-4 top-4 z-[100] mx-auto max-w-6xl border border-slate-200 bg-white shadow-[0_14px_45px_-24px_rgb(15_45_75_/_0.45)]",
        isMenuOpen ? "rounded-3xl" : "rounded-full",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between px-4 py-2.5 md:px-5">
        <Link
          className="flex items-center gap-3 font-semibold text-foreground"
          href="/"
          onClick={closeMenu}
        >
          <Image src="/logo-mark.webp" height={36} width={36} alt="" />
          <span>NoNeed2Ask</span>
        </Link>

        {navItems.length > 0 && <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <a
              className="transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>}

        {actions ?? (isAuthenticated ? (
          <div className="hidden items-center gap-2 lg:flex">
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
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              asChild
              className="bg-white/40"
              size="lg"
              variant="outline"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="shadow-sm shadow-blue-950/10" size="lg">
              <Link href="/register">Create tracker</Link>
            </Button>
          </div>
        ))}

        {!actions && <button
          ref={menuTrigger}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
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
        </button>}
      </div>

      {isMenuOpen ? (
        <div className="border-t border-border/60 px-4 pb-4 pt-2 lg:hidden">
          <nav className="grid gap-1 text-sm font-medium text-muted-foreground">
            {navItems.map((item) => (
              <a
                className="rounded-2xl px-3 py-2 transition-colors hover:bg-muted hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {isAuthenticated ? (
            <div className="mt-3 grid gap-2">
              <Button asChild size="lg">
                <Link href="/" onClick={closeMenu}>
                  Dashboard
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href="/applications"
                  onClick={closeMenu}
                >
                  Applications
                </Link>
              </Button>
            </div>
          ) : (
            <div className="mt-3 grid gap-2">
              <Button asChild size="lg" variant="outline">
                <Link href="/login" onClick={closeMenu}>
                  Log in
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/register" onClick={closeMenu}>
                  Create tracker
                </Link>
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
}

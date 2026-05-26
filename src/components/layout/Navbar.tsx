"use client";

import { navLinkIdleStyles, navLinkStyles, navPillStyles } from "@/components/layout/nav-styles";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function Navbar() {
  const [activeId, setActiveId] = useState<string>(siteConfig.nav[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateActiveSection = useCallback(() => {
    const sections = siteConfig.nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const offset = 120;
    let current: string = siteConfig.nav[0].id;

    for (const section of sections) {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) {
        current = section.id;
      }
    }

    setActiveId(current);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => updateActiveSection());
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [updateActiveSection]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        aria-label="Main navigation"
        className="pointer-events-auto w-full max-w-2xl lg:max-w-3xl"
      >
        <div
          className={cn(
            "flex items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3",
            navPillStyles,
          )}
        >
          <Link
            href="/"
            className="shrink-0 font-futura text-sm font-semibold tracking-tight text-foreground transition-opacity duration-300 hover:opacity-70 sm:text-[15px]"
          >
            {siteConfig.logo}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      navLinkStyles,
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : navLinkIdleStyles,
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 md:hidden",
              mobileOpen
                ? "bg-foreground text-background"
                : "text-foreground/80 hover:bg-black/5",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="relative block h-3.5 w-3.5">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-3.5 bg-current transition-all duration-300",
                  mobileOpen ? "top-[6px] rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[6px] block h-0.5 w-3.5 bg-current transition-all duration-300",
                  mobileOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-3.5 bg-current transition-all duration-300",
                  mobileOpen ? "top-[6px] -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "mt-3 overflow-hidden transition-all duration-300 ease-out md:hidden",
            mobileOpen
              ? "max-h-64 opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          <ul className={cn("flex flex-col gap-1 p-2", navPillStyles)}>
            {siteConfig.nav.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-3 text-center text-sm font-medium transition-all duration-300 ease-out",
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : navLinkIdleStyles,
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

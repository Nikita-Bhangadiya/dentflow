"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/** DentFlow wordmark + logo mark: solid orange (brand), bold */
export function DentFlowBrand({
  variant = "sidebar",
  className,
}: {
  variant?: "sidebar" | "navbar";
  className?: string;
}) {
  const isNavbar = variant === "navbar";

  return (
    <Link
      href="/dashboard"
      className={cn(
        "inline-flex items-center gap-2 font-heading font-bold tracking-tight no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
        isNavbar ? "text-lg" : "text-xl",
        "text-foreground",
        className
      )}
      aria-label="DentFlow – Dashboard"
    >
      {/* D mark only: filled glass style like Sign out (btn-dora-glass) */}
      <span className="brand-d-mark flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white" aria-hidden>
        <span className="brand-d-mark-inner flex h-full w-full items-center justify-center rounded-[10px]">
          <DentFlowMark className="h-4 w-4" />
        </span>
      </span>
      <span className="text-[var(--brand-gradient-start)]">DentFlow</span>
    </Link>
  );
}

/** Logo mark: clean “D” for DentFlow, reads well at small size */
function DentFlowMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Upright D: stem + curved right */}
      <path d="M8 4v16 M8 4c0 0 8 0 8 8s-8 8-8 8" />
    </svg>
  );
}

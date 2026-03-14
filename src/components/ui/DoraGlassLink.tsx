"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";

const rotatingBorderStyle = {
  background: `conic-gradient(from 0deg,
    transparent 0deg,
    transparent 255deg,
    var(--dora-ring-1) 268deg,
    var(--dora-ring-2) 280deg,
    var(--dora-ring-3) 292deg,
    var(--dora-ring-4) 302deg,
    var(--dora-ring-3) 312deg,
    var(--dora-ring-2) 324deg,
    var(--dora-ring-1) 336deg,
    transparent 348deg,
    transparent 360deg
  )`,
  willChange: "transform",
};

interface DoraGlassLinkProps extends ComponentProps<typeof Link> {
  variant?: "primary" | "ghost";
  innerClassName?: string;
}

export function DoraGlassLink({
  className = "",
  innerClassName = "",
  variant = "primary",
  children,
  ...props
}: DoraGlassLinkProps) {
  const reduceMotion = useReducedMotion();

  const variantClasses = variant === "primary" 
    ? "bg-gradient-to-r from-[var(--dora-start)] to-[var(--dora-end)]" 
    : "bg-white/5 backdrop-blur-md hover:bg-white/10";

  return (
    <Link
      className={`btn-dora-glass inline-flex group ${className}`.trim()}
      {...props}
    >
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-[-2px] z-0 rounded-[9999px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={rotatingBorderStyle}
        animate={{ rotate: reduceMotion ? 0 : 360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <span className={`btn-dora-glass-inner !m-[2px] ${variantClasses} ${innerClassName}`.trim()}>
        {children}
      </span>
    </Link>
  );
}

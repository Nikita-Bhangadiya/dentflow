"use client";

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

interface DoraGlassButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "ghost";
  innerClassName?: string;
  showSweep?: boolean;
}

export function DoraGlassButton({
  className = "",
  innerClassName = "",
  variant = "primary",
  showSweep = true,
  children,
  ...props
}: DoraGlassButtonProps) {
  const reduceMotion = useReducedMotion();

  const variantClasses = variant === "primary" 
    ? "bg-gradient-to-r from-[var(--dora-start)] to-[var(--dora-end)] text-white" 
    : "bg-white/5 backdrop-blur-md hover:bg-white/10 text-foreground";

  // Use the brand ring only for primary; ghost gets a simple white/10 border style ring
  const outerRingClasses = variant === "primary"
    ? "btn-dora-glass"
    : "relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]";

  return (
    <button
      className={`${outerRingClasses} group ${className}`.trim()}
      {...props}
    >
      {showSweep && variant === "primary" && (
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
      )}
      <span className={`flex items-center justify-center gap-2 rounded-full ${variant === "primary" ? "btn-dora-glass-inner !m-[2px]" : ""} ${variantClasses} ${innerClassName}`.trim()}>
        {children}
      </span>
    </button>
  );
}

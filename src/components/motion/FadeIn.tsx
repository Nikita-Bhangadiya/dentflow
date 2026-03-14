"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={cn("text-foreground", className)}
    >
      {children}
    </m.div>
  );
}

"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function SlideUp({ children, delay = 0, className }: SlideUpProps) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      initial={{
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 32,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

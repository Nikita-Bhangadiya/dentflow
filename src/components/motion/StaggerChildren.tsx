"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StaggerChildren({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-foreground", className)}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("text-foreground", className)}>{children}</div>;
}

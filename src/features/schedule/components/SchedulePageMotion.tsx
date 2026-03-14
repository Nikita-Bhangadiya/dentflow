"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import type { ReactNode } from "react";

export function SchedulePageMotion({ children }: { children: ReactNode }) {
  return <FadeIn className="space-y-6">{children}</FadeIn>;
}

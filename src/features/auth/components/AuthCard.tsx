import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function AuthCard({ title, subtitle, children, className }: AuthCardProps) {
  return (
    <FadeIn className="w-full max-w-md">
      <div className={cn("glass-surface w-full rounded-[32px] p-8 sm:p-10 space-y-6", className)}>
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </FadeIn>
  );
}

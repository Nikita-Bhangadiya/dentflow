"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LocationSummary } from "@/features/dashboard/types";

interface LocationCardProps {
  loc: LocationSummary;
}

export function LocationCard({ loc }: LocationCardProps) {
  const progressPct = Math.min(
    100,
    Math.round((loc.productionCents / Math.max(loc.dailyGoalCents, 1)) * 100)
  );
  const productionDollars = (loc.productionCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const goalDollars = (loc.dailyGoalCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const needsAttention = loc.needsAction > 0;

  return (
    <m.div
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className={cn(
        "app-card-light rounded-2xl p-5 space-y-3 border-l-4 transition-shadow hover:shadow-lg",
        needsAttention ? "border-l-destructive/70" : "border-l-transparent"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">{loc.name}</h3>
          {loc.city ? (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {loc.city}
            </p>
          ) : null}
        </div>
        {loc.highRiskCount > 0 ? (
          <span className="shrink-0 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-sm font-semibold text-destructive">
            {loc.highRiskCount} high risk
          </span>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Patients today</p>
          <p className="text-xl font-bold tabular-nums bg-brand-gradient bg-clip-text text-transparent">{loc.totalPatients}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">In chair</p>
          <p className="text-xl font-bold tabular-nums text-foreground">{loc.withProvider}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Production</p>
          <p className="text-lg font-bold tabular-nums text-foreground">{productionDollars}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Needs action</p>
          <p
            className={cn(
              "text-xl font-bold tabular-nums",
              needsAttention ? "text-destructive" : "text-foreground"
            )}
          >
            {loc.needsAction}
          </p>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Daily goal</span>
          <span className="tabular-nums">{progressPct}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-brand-gradient transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-right text-sm text-muted-foreground">Goal: {goalDollars}</p>
      </div>
      <Link
        href={`/dashboard/schedule?location=${encodeURIComponent(loc.id)}`}
        className="btn-dora-glass btn-dora-glass-sm mt-2 inline-flex items-center gap-1.5 no-underline text-sm"
      >
        <span className="btn-dora-glass-inner">View schedule →</span>
      </Link>
    </m.div>
  );
}

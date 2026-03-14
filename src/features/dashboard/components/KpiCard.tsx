import { cn } from "@/lib/utils";
import type { KpiData } from "@/features/dashboard/types";

interface KpiCardProps {
  kpi: KpiData;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const isAlert = Boolean(kpi.alert);
  return (
    <div
      className={cn(
        "app-card-light rounded-2xl p-5 space-y-2 border-l-4 transition-shadow",
        isAlert
          ? "border-l-destructive border-destructive/50 ring-1 ring-destructive/30"
          : "border-l-transparent"
      )}
    >
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
      <p
        className={cn(
          "text-3xl font-bold tabular-nums tracking-tight",
          isAlert ? "text-destructive" : "text-foreground"
        )}
      >
        {kpi.value}
      </p>
      {kpi.subtext ? <p className="text-sm text-muted-foreground">{kpi.subtext}</p> : null}
      {isAlert && kpi.alertText ? (
        <p className="text-sm font-semibold text-destructive">{kpi.alertText}</p>
      ) : null}
    </div>
  );
}

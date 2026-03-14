import { FadeIn } from "@/components/motion/FadeIn";
import { getAnalytics } from "@/features/analytics/queries/getAnalytics";
import { ThroughputChart } from "@/features/analytics/components/ThroughputChart";
import type { LocationMetric } from "@/features/analytics/types";

export async function AnalyticsPage() {
  const { locationMetrics, hourlyData } = await getAnalytics();

  return (
    <div className="space-y-8 text-foreground">
      <FadeIn>
        <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
        <p className="mt-1 text-muted-foreground">Today&apos;s throughput and location metrics</p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Locations</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {locationMetrics.map((loc: LocationMetric) => (
            <div
              key={loc.name}
              className="glass-surface rounded-2xl p-4 transition-shadow hover:shadow-lg duration-200"
            >
              <h3 className="font-semibold">{loc.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {loc.totalPatients} patients · {loc.checkedOut} checked out · {loc.noShowRiskCount} no-show risk
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Collection rate: {loc.collectionRate.toFixed(0)}% · Production: {loc.productionK > 0 ? `$${loc.productionK}k` : "—"}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Hourly throughput</h2>
        <div className="glass-surface rounded-2xl p-4">
          <ThroughputChart data={hourlyData} />
        </div>
      </FadeIn>
    </div>
  );
}

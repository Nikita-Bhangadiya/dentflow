import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { getDashboardData } from "@/features/dashboard/queries/getDashboardData";
import { KpiCard } from "@/features/dashboard/components/KpiCard";
import { LocationCard } from "@/features/dashboard/components/LocationCard";

export default async function DashboardPage() {
  const data = await getDashboardData();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{data.org.name}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Operations overview · {today}</p>
        </div>
      </FadeIn>

      <StaggerChildren>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {data.kpis.map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} />
          ))}
        </div>
      </StaggerChildren>

      <FadeIn delay={0.2}>
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Locations</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.locations.map((loc) => (
              <LocationCard key={loc.id} loc={loc} />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

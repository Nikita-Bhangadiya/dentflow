import { FlowBoard } from "@/features/schedule/components/FlowBoard";
import { ScheduleLocationFilter } from "@/features/schedule/components/ScheduleLocationFilter";
import { SchedulePageMotion } from "@/features/schedule/components/SchedulePageMotion";
import type { LocationOption } from "@/features/schedule/queries/getLocations";
import type { AppointmentRow } from "@/features/schedule/types";

interface SchedulePageProps {
  locations: LocationOption[];
  appointments: AppointmentRow[];
  selectedLocationId: string | null;
}

export default function SchedulePage({
  locations,
  appointments,
  selectedLocationId,
}: SchedulePageProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const locationLabel =
    selectedLocationId && locations.length
      ? locations.find((l) => l.id === selectedLocationId)?.name ?? "All locations"
      : "All locations";
  const needsEligibilityCount = appointments.filter(
    (a) => a.workflow_status === "needs_eligibility"
  ).length;

  return (
    <SchedulePageMotion>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Schedule</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {locationLabel} · {today} · {appointments.length} appointments
              {needsEligibilityCount > 0 && (
                <span className="ml-1 font-medium text-foreground">
                  · {needsEligibilityCount} need eligibility
                </span>
              )}
            </p>
          </div>
          <ScheduleLocationFilter
            locations={locations}
            selectedLocationId={selectedLocationId}
          />
        </div>
        <FlowBoard initial={appointments} />
      </div>
    </SchedulePageMotion>
  );
}

import SchedulePage from "@/features/schedule/components/SchedulePage";
import { getLocations } from "@/features/schedule/queries/getLocations";
import { getTodayAppointments } from "@/features/schedule/queries/getTodayAppointments";

interface PageProps {
  searchParams: Promise<{ location?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const locationId = resolved.location ?? null;
  const [locations, appointments] = await Promise.all([
    getLocations(),
    getTodayAppointments(locationId ?? undefined),
  ]);
  return (
    <SchedulePage
      locations={locations}
      appointments={appointments}
      selectedLocationId={locationId}
    />
  );
}

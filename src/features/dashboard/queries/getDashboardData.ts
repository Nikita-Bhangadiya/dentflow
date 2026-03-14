import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";
import type { DashboardData, KpiData, LocationSummary } from "@/features/dashboard/types";

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const tomorrow = new Date(todayStart);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .select("id, name")
    .limit(1)
    .single();

  if (orgError) {
    console.error("[getDashboardData] organizations error:", orgError.message);
  }

  if (!org) {
    return {
      org: { name: "DentFlow" },
      kpis: [
        { label: "Patients Today", value: 0, subtext: "Across all locations" },
        { label: "In Chair", value: 0, subtext: "Currently with provider" },
        { label: "Needs Action", value: 0, subtext: "Forms, eligibility, checkout" },
        { label: "No-Show Risk", value: 0, subtext: "High-risk patients today" },
      ],
      locations: [],
    };
  }

  // Select only columns that exist in migration 002 (003 adds city, daily_goal_cents, chair_count, production_amount_cents)
  const [locationsResult, appointmentsResult] = await Promise.all([
    supabase
      .from("locations")
      .select("id, name")
      .eq("organization_id", org.id)
      .order("name"),
    supabase
      .from("appointments")
      .select("id, location_id, workflow_status, patient:patients(no_show_risk)")
      .gte("scheduled_at", todayStart.toISOString())
      .lt("scheduled_at", tomorrow.toISOString()),
  ]);

  if (locationsResult.error) {
    console.error("[getDashboardData] locations error:", locationsResult.error.message);
  }
  if (appointmentsResult.error) {
    console.error("[getDashboardData] appointments error:", appointmentsResult.error.message);
  }

  const locations = locationsResult.data ?? [];
  const appointmentRows = appointmentsResult.data ?? [];

  type LocationRow = { id: string; name: string };
  type AppointmentAggregate = Pick<
    Tables<"appointments">,
    "id" | "location_id" | "workflow_status"
  > & {
    patient: Pick<Tables<"patients">, "no_show_risk"> | null;
  };

  const appointments = appointmentRows as AppointmentAggregate[];
  const needsActionStatuses = new Set(["needs_forms", "needs_eligibility", "pending_checkout"]);

  const locationMap = new Map<string, LocationSummary>();
  for (const location of locations as LocationRow[]) {
    locationMap.set(location.id, {
      id: location.id,
      name: location.name,
      city: null,
      totalPatients: 0,
      checkedOut: 0,
      withProvider: 0,
      needsAction: 0,
      productionCents: 0,
      dailyGoalCents: 800_000,
      highRiskCount: 0,
      chairCount: 4,
    });
  }

  for (const appointment of appointments) {
    const location = locationMap.get(appointment.location_id);
    if (!location) {
      continue;
    }

    location.totalPatients += 1;
    if (appointment.workflow_status === "checked_out") {
      location.checkedOut += 1;
      location.productionCents += 0;
    }
    if (appointment.workflow_status === "with_provider") {
      location.withProvider += 1;
    }
    if (needsActionStatuses.has(appointment.workflow_status)) {
      location.needsAction += 1;
    }
    if (appointment.patient?.no_show_risk === "high") {
      location.highRiskCount += 1;
    }
  }

  const locationData = Array.from(locationMap.values());
  const totalPatients = locationData.reduce((sum, location) => sum + location.totalPatients, 0);
  const inChair = locationData.reduce((sum, location) => sum + location.withProvider, 0);
  const needsAction = locationData.reduce((sum, location) => sum + location.needsAction, 0);
  const highRisk = locationData.reduce((sum, location) => sum + location.highRiskCount, 0);

  const kpis: KpiData[] = [
    { label: "Patients Today", value: totalPatients, subtext: "Across all locations" },
    { label: "In Chair", value: inChair, subtext: "Currently with provider" },
    {
      label: "Needs Action",
      value: needsAction,
      subtext: "Forms, eligibility, checkout",
      alert: needsAction > 0,
      alertText: needsAction > 0 ? "Front desk follow-up required" : undefined,
    },
    {
      label: "No-Show Risk",
      value: highRisk,
      subtext: "High-risk patients today",
      alert: highRisk > 0,
      alertText: highRisk > 0 ? "Monitor patient engagement" : undefined,
    },
  ];

  return {
    org: { name: org.name },
    kpis,
    locations: locationData,
  };
}

import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { LocationMetric, HourlySlot } from "@/features/analytics/types";

export async function getAnalytics(): Promise<{
  locationMetrics: LocationMetric[];
  hourlyData: HourlySlot[];
}> {
  const supabase = await createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);
  const start = todayStart.toISOString();
  const end = todayEnd.toISOString();

  const { data: locations } = await supabase.from("locations").select("id, name").order("name");
  const { data: appointmentsRaw } = await supabase
    .from("appointments")
    .select("id, location_id, scheduled_at, workflow_status, patient_id")
    .gte("scheduled_at", start)
    .lt("scheduled_at", end);

  type ApptRow = { id: string; location_id: string; scheduled_at: string; workflow_status: string; patient_id: string };
  const appointments = (appointmentsRaw ?? []) as ApptRow[];

  const patientIds = [...new Set(appointments.map((a) => a.patient_id))];
  const { data: patientsRaw } =
    patientIds.length > 0
      ? await supabase.from("patients").select("id, no_show_risk").in("id", patientIds)
      : { data: [] };
  type PatientRow = { id: string; no_show_risk: string };
  const patients = (patientsRaw ?? []) as PatientRow[];
  const riskByPatientId = new Map(patients.map((p) => [p.id, p.no_show_risk]));

  type LocRow = { id: string; name: string };
  const locationMetrics: LocationMetric[] = ((locations ?? []) as LocRow[]).map((loc) => {
    const locAppointments = appointments.filter((a) => a.location_id === loc.id);
    const checkedOut = locAppointments.filter((a) => a.workflow_status === "checked_out").length;
    const noShowRiskCount = locAppointments.filter(
      (a) => riskByPatientId.get(a.patient_id) === "high"
    ).length;
    return {
      name: loc.name,
      totalPatients: locAppointments.length,
      checkedOut,
      noShowRiskCount,
      productionK: 0,
      collectionRate: locAppointments.length > 0 ? (checkedOut / locAppointments.length) * 100 : 0,
    };
  });

  const hours: HourlySlot[] = [];
  for (let h = 8; h <= 17; h++) {
    const hourLabel = `${h.toString().padStart(2, "0")}:00`;
    const hourStart = new Date(todayStart);
    hourStart.setHours(h, 0, 0, 0);
    const hourEnd = new Date(hourStart);
    hourEnd.setHours(h + 1, 0, 0, 0);
    const count = (appointments ?? []).filter((a) => {
      const t = new Date(a.scheduled_at).getTime();
      return t >= hourStart.getTime() && t < hourEnd.getTime();
    }).length;
    hours.push({ hour: hourLabel, patients: count });
  }

  return { locationMetrics, hourlyData: hours };
}

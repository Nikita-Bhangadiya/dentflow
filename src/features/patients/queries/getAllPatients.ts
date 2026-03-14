import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { PatientListRow } from "@/features/patients/types";

export async function getAllPatients(): Promise<PatientListRow[]> {
  const supabase = await createClient();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  // Fetch all patients
  const { data: patientsRaw } = await supabase
    .from("patients")
    .select(
      "id, full_name, no_show_risk, insurance_status, balance_cents, treatment_plan_value_cents, last_visit_date, phone"
    )
    .order("full_name");

  type PatientRow = {
    id: string;
    full_name: string;
    no_show_risk: string;
    insurance_status: string;
    balance_cents: number;
    treatment_plan_value_cents: number;
    last_visit_date: string | null;
    phone: string | null;
  };

  const patients = (patientsRaw ?? []) as PatientRow[];

  // Fetch today's appointments with location and provider
  const { data: apptRaw } = await supabase
    .from("appointments")
    .select(
      "patient_id, workflow_status, visit_type, location:locations(name), provider:providers(full_name)"
    )
    .gte("scheduled_at", todayStart.toISOString())
    .lt("scheduled_at", todayEnd.toISOString());

  type ApptRow = {
    patient_id: string;
    workflow_status: string;
    visit_type: string;
    location: { name: string } | null;
    provider: { full_name: string } | null;
  };

  const appts = (apptRaw ?? []) as ApptRow[];
  const apptByPatient = new Map<string, ApptRow>();
  for (const a of appts) {
    if (!apptByPatient.has(a.patient_id)) apptByPatient.set(a.patient_id, a);
  }

  return patients.map((p) => {
    const appt = apptByPatient.get(p.id);
    return {
      id: p.id,
      full_name: p.full_name,
      no_show_risk: p.no_show_risk,
      insurance_status: p.insurance_status,
      balance_cents: p.balance_cents,
      treatment_plan_value_cents: p.treatment_plan_value_cents,
      last_visit_date: p.last_visit_date,
      phone: p.phone,
      todayStatus: appt?.workflow_status ?? null,
      todayVisitType: appt?.visit_type ?? null,
      locationName: appt?.location?.name ?? null,
      providerName: appt?.provider?.full_name ?? null,
    };
  });
}

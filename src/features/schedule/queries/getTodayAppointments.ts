import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";
import type { AppointmentRow } from "@/features/schedule/types";

export async function getTodayAppointments(locationId?: string): Promise<AppointmentRow[]> {
  const supabase = await createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const tomorrowStart = new Date(todayStart.getTime() + 86400000);

  // Select only columns that exist in migration 002 (003 adds visit_type, duration_minutes, production_amount_cents, notes_status; patients/providers get extra cols in 003)
  let query = supabase
    .from("appointments")
    .select(
      `
      id,
      scheduled_at,
      workflow_status,
      patient:patients(id, full_name, no_show_risk, risk_score),
      provider:providers(id, full_name),
      location:locations(id, name),
      tasks(id, title, completed)
    `
    )
    .gte("scheduled_at", todayStart.toISOString())
    .lt("scheduled_at", tomorrowStart.toISOString())
    .order("scheduled_at", { ascending: true });

  if (locationId) {
    query = query.eq("location_id", locationId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[getTodayAppointments] Supabase error:", error.message);
    return [];
  }

  type QueryRow = Pick<Tables<"appointments">, "id" | "scheduled_at" | "workflow_status"> & {
    patient: Pick<Tables<"patients">, "id" | "full_name" | "no_show_risk" | "risk_score"> | null;
    provider: Pick<Tables<"providers">, "id" | "full_name"> | null;
    location: Pick<Tables<"locations">, "id" | "name"> | null;
    tasks: Pick<Tables<"tasks">, "id" | "title" | "completed">[] | null;
  };

  const rows = (data ?? []) as QueryRow[];
  const result: AppointmentRow[] = [];

  for (const row of rows) {
    if (!row.patient || !row.provider || !row.location) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[getTodayAppointments] Skipping appointment with missing relation:", row.id);
      }
      continue;
    }
    result.push({
      id: row.id,
      scheduled_at: row.scheduled_at,
      workflow_status: row.workflow_status,
      visit_type: "exam",
      duration_minutes: 60,
      production_amount_cents: 0,
      notes_status: "unsigned",
      patient: {
        ...row.patient,
        balance_cents: 0,
        insurance_status: "unverified",
        phone: null,
        email: null,
      },
      provider: {
        ...row.provider,
        specialty: "general_dentist",
      },
      location: row.location,
      tasks: row.tasks ?? [],
    });
  }

  return result;
}

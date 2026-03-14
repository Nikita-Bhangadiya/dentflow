import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { PatientDetailResponse } from "@/features/patients/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: patientId } = await params;
  const { searchParams } = new URL(_request.url);
  const appointmentId = searchParams.get("appointmentId");

  const supabase = await createClient();

  const [patientRes, tasksRes, commsRes] = await Promise.all([
    supabase.from("patients").select("*").eq("id", patientId).single(),
    appointmentId
      ? supabase.from("tasks").select("*").eq("appointment_id", appointmentId).order("created_at")
      : Promise.resolve({ data: [] }),
    supabase
      .from("communications")
      .select("id, channel, direction, content, created_at")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const response: PatientDetailResponse = {
    patient: patientRes.data as PatientDetailResponse["patient"],
    tasks: (tasksRes.data ?? []) as PatientDetailResponse["tasks"],
    communications: (commsRes.data ?? []) as PatientDetailResponse["communications"],
  };

  return NextResponse.json(response);
}

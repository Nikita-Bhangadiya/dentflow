"use server";

import { createClient } from "@/lib/supabase/server";

export async function sendReminder(
  patientId: string,
  orgId: string,
  message: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const db = supabase as unknown as { from: (t: string) => { insert: (v: object) => Promise<{ error: { message: string } | null }> } };
  const { error } = await db.from("communications").insert({
    patient_id: patientId,
    organization_id: orgId,
    channel: "sms",
    direction: "outbound",
    content: message,
  });

  if (error) return { error: error.message };
  return {};
}

"use server";

import { createClient } from "@/lib/supabase/server";

export async function completeTask(taskId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const db = supabase as unknown as { from: (t: string) => { update: (v: object) => { eq: (c: string, v: string) => Promise<{ error: { message: string } | null }> } } };
  const { error } = await db.from("tasks").update({ completed: true }).eq("id", taskId);

  if (error) return { error: error.message };
  return {};
}

import { createClient } from "@/lib/supabase/server";
import type { VisitorNameRow } from "../types";

export async function getVisitorName(
  anonymousId: string | null
): Promise<VisitorNameRow | null> {
  if (!anonymousId) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("visitor_names")
    .select("id, anonymous_id, name, created_at, updated_at")
    .eq("anonymous_id", anonymousId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

import { createClient } from "@/lib/supabase/server";
import type { VisitorNameRow, VisitorNameInsert } from "../types";

export async function saveVisitorName(
  anonymousId: string,
  name: string
): Promise<VisitorNameRow> {
  const supabase = await createClient();
  const row: VisitorNameInsert = { anonymous_id: anonymousId, name };
  const { data, error } = await supabase
    .from("visitor_names")
    .upsert(row as never, { onConflict: "anonymous_id" })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as VisitorNameRow;
}

import "server-only";
import { createClient } from "@/lib/supabase/server";

export interface LocationOption {
  id: string;
  name: string;
}

export async function getLocations(): Promise<LocationOption[]> {
  const supabase = await createClient();
  const { data: org } = await supabase
    .from("organizations")
    .select("id")
    .limit(1)
    .single();
  if (!org) return [];
  const { data } = await supabase
    .from("locations")
    .select("id, name")
    .eq("organization_id", org.id)
    .order("name");
  return (data ?? []) as LocationOption[];
}

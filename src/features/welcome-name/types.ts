import type { Database } from "@/types/database.types";

export type VisitorNameRow = Database["public"]["Tables"]["visitor_names"]["Row"];
export type VisitorNameInsert =
  Database["public"]["Tables"]["visitor_names"]["Insert"];

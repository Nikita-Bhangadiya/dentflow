"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/features/auth/schemas";

export type AuthState = { error?: string };

export async function signInWithPassword(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().formErrors[0] ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

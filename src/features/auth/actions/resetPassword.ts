"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { resetPasswordSchema } from "@/features/auth/schemas";

export type ResetState = { error?: string };

export async function resetPassword(
  _prev: ResetState,
  formData: FormData
): Promise<ResetState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().formErrors[0] ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

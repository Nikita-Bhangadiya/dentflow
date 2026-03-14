"use server";

import { createClient } from "@/lib/supabase/server";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { env } from "@/lib/env.mjs";

export type ForgotState = { error?: string; success?: boolean };

export async function forgotPassword(
  _prev: ForgotState,
  formData: FormData
): Promise<ForgotState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().formErrors[0] ?? "Invalid email" };
  }

  const supabase = await createClient();
  const appUrl = env.NEXT_PUBLIC_APP_URL ?? "";
  const redirectTo = `${appUrl}/api/auth/callback?next=/reset-password`;

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

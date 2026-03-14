"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env.mjs";

export async function signInWithGoogle(): Promise<never> {
  const supabase = await createClient();
  const appUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const redirectTo = `${appUrl.replace(/\/$/, "")}/api/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.url) {
    redirect(data.url);
  }

  redirect("/login");
}

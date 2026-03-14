"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { welcomeNameSchema } from "../schemas";
import { saveVisitorName } from "../services/welcome-name.service";
import type { ActionResult } from "@/lib/types";

export async function saveWelcomeNameAction(
  _prev: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const parsed = welcomeNameSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    const message = parsed.error.flatten().fieldErrors.name?.[0] ?? "Invalid input";
    return { success: false, error: message };
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  if (!sessionId) {
    return { success: false, error: "Session required." };
  }

  try {
    await saveVisitorName(sessionId, parsed.data.name);
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save name." };
  }
}

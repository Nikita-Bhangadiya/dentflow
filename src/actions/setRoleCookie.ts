"use server";

import { cookies } from "next/headers";

export async function setRoleCookie(role: string) {
  const store = await cookies();
  store.set("dentflow_role", role, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: false,
    sameSite: "lax",
  });
}

"use client";

import Link from "next/link";
import { useActionState } from "react";
import { resetPassword } from "@/features/auth/actions/resetPassword";
import { PasswordInput } from "@/features/auth/components/PasswordInput";

export function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState(resetPassword, null);

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-4">
        <PasswordInput
          name="password"
          label="New password"
          autoComplete="new-password"
          placeholder="New password"
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Confirm password"
        />
        {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
        <button type="submit" disabled={isPending} className="btn-dora-glass w-full">
          <span className="btn-dora-glass-inner">
            {isPending ? "Updating..." : "Update password"}
          </span>
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

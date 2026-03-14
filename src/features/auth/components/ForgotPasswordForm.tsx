"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPassword } from "@/features/auth/actions/forgotPassword";

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  if (state?.success) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-foreground">Check your email for a reset link.</p>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-[var(--brand-gradient-start)] hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="w-full min-h-[44px] rounded-xl border border-input bg-background/10 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
          />
        </div>
        {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
        <button
          type="submit"
          disabled={isPending}
          className="btn-dora-glass w-full min-h-[44px] rounded-full"
        >
          <span className="btn-dora-glass-inner w-full">
            {isPending ? "Sending..." : "Send reset link"}
          </span>
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-[var(--brand-gradient-start)] hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

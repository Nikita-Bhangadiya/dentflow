"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithGoogle } from "@/features/auth/actions/signInWithGoogle";
import { signUpWithPassword } from "@/features/auth/actions/signUpWithPassword";
import { PasswordInput } from "@/features/auth/components/PasswordInput";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUpWithPassword, null);

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
        <PasswordInput
          name="password"
          label="Password"
          autoComplete="new-password"
          placeholder="Create password"
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Confirm password"
        />
        {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
        <button
          type="submit"
          disabled={isPending}
          className="btn-dora-glass w-full min-h-[44px] rounded-full"
        >
          <span className="btn-dora-glass-inner w-full">
            {isPending ? "Creating..." : "Create account"}
          </span>
        </button>
      </form>

      <form action={signInWithGoogle}>
        <button type="submit" className="auth-secondary-btn flex items-center justify-center gap-2 w-full text-sm">
          Continue with Google
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[var(--brand-gradient-start)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

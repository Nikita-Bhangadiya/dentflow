"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithGoogle } from "@/features/auth/actions/signInWithGoogle";
import { signInWithPassword } from "@/features/auth/actions/signInWithPassword";
import { PasswordInput } from "@/features/auth/components/PasswordInput";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInWithPassword, null);

  return (
    <div className="space-y-5">
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="btn-dora-glass flex items-center justify-center gap-2 w-full min-h-[44px] rounded-full"
        >
          <span className="btn-dora-glass-inner w-full">Continue with Google</span>
        </button>
      </form>

      <div className="relative">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--background))] px-2 text-xs text-muted-foreground">or</span>
        <div className="border-t border-border" />
      </div>

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
        <div className="space-y-1">
          <PasswordInput
            name="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter password"
          />
          <div className="flex justify-end pt-0.5">
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--brand-gradient-start)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
        <button
          type="submit"
          disabled={isPending}
          className="btn-dora-glass w-full min-h-[44px] rounded-full"
        >
          <span className="btn-dora-glass-inner w-full">{isPending ? "Signing in..." : "Sign in"}</span>
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-[var(--brand-gradient-start)] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

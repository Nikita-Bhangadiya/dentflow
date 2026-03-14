"use client";

import type { User } from "@supabase/supabase-js";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { RoleSwitcher } from "@/components/shared/RoleSwitcher";

interface TopNavRightProps {
  user: User | null;
  signOut: () => Promise<void>;
}

export function TopNavRight({ user, signOut }: TopNavRightProps) {
  if (!user) return null;

  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-xs leading-tight text-muted-foreground truncate max-w-[180px]" title={user.email ?? undefined}>
          {user.email}
        </span>
      </div>
      <RoleSwitcher />
      <ThemeToggle />
      <form action={signOut}>
        <button
          type="submit"
          className="btn-dora-glass min-h-[44px] rounded-full px-4"
          aria-label="Sign out"
        >
          <span className="btn-dora-glass-inner">Sign out</span>
        </button>
      </form>
    </div>
  );
}

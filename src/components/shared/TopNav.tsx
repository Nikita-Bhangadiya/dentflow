import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/features/auth/actions/signOut";
import { NavLeft } from "@/components/shared/NavLeft";
import { TopNavRight } from "@/components/shared/TopNavRight";

export async function TopNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border app-glass-panel px-4 md:px-6">
      <NavLeft />
      <TopNavRight user={user} signOut={signOut} />
    </header>
  );
}

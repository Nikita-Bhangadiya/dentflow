import { cookies } from "next/headers";
import { Check, ArrowRight } from "lucide-react";
import { DoraGlassLink } from "@/components/ui/DoraGlassLink";
import { getVisitorName } from "../queries/getVisitorName";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { WelcomeNameForm } from "./WelcomeNameForm";

export async function WelcomePage() {
  const cookieStore = await cookies();
  const anonymousId = cookieStore.get("session_id")?.value ?? null;
  const visitor = await getVisitorName(anonymousId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="w-full max-w-lg">
        <div className="glass-surface font-friendly p-8 sm:p-10 sm:rounded-3xl">
          <StaggerChildren className="flex flex-col items-center text-center gap-0">
            <StaggerItem>
              <h1 className="font-heading text-[2.25rem] font-semibold leading-tight tracking-tight text-foreground sm:text-5xl sm:leading-[1.2]">
                Welcome
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <p className="text-lg leading-[1.6] text-muted-foreground tracking-normal sm:text-xl">
                We remember you so you can pick up where you left off.
              </p>
            </StaggerItem>

            {visitor ? (
              <>
                <StaggerItem className="mt-8 w-full">
                  <p className="text-lg leading-relaxed text-foreground font-normal">
                    Hello, <span className="text-dora-name">{visitor.name}</span>.
                  </p>
                </StaggerItem>
                <StaggerItem className="mt-4 flex flex-col items-center gap-4">
                  <p
                    className="inline-flex items-center gap-2 text-sm leading-relaxed text-muted-foreground font-normal"
                    role="status"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-dora-name"
                      aria-hidden
                    />
                    Saved. We won&apos;t ask again.
                  </p>
                  <DoraGlassLink
                    href="/dashboard"
                    className="mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Go to dashboard
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </DoraGlassLink>
                </StaggerItem>
              </>
            ) : (
              <>
                <StaggerItem className="mt-8 w-full">
                  <p className="text-base leading-relaxed text-muted-foreground font-normal tracking-wide">
                    Enter your name below. We&apos;ll remember it for next time.
                  </p>
                </StaggerItem>
                <StaggerItem className="mt-8 w-full">
                  <WelcomeNameForm />
                </StaggerItem>
              </>
            )}
          </StaggerChildren>
        </div>
      </div>
    </main>
  );
}

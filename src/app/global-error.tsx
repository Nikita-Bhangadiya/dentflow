"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-foreground">
        <h1 className="font-heading text-2xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          A critical error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Try again
        </button>
      </body>
    </html>
  );
}

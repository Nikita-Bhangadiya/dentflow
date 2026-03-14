"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <p className="font-medium text-destructive">Failed to load schedule</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="min-h-[44px] text-sm text-primary hover:underline">
        Try again
      </button>
    </div>
  );
}

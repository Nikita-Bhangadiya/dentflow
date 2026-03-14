"use client";

import { useEffect } from "react";

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-destructive">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded border px-4 py-2 text-sm min-h-[44px]"
      >
        Try again
      </button>
    </div>
  );
}

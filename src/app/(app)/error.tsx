"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AppError({
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
    <div className="flex flex-col items-center gap-4 p-6">
      <p className="text-destructive">Something went wrong.</p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}

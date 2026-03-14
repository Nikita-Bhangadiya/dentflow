"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LocationOption } from "@/features/schedule/queries/getLocations";

interface ScheduleLocationFilterProps {
  locations: LocationOption[];
  selectedLocationId: string | null;
}

export function ScheduleLocationFilter({
  locations,
  selectedLocationId,
}: ScheduleLocationFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocation = (id: string | null) => {
    const url = id ? `${pathname}?location=${encodeURIComponent(id)}` : pathname;
    router.push(url);
  };

  if (locations.length <= 1) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-background/80 p-1 backdrop-blur-sm"
      role="tablist"
      aria-label="Schedule by location"
    >
      <button
        type="button"
        role="tab"
        aria-selected={!selectedLocationId}
        onClick={() => setLocation(null)}
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px] sm:min-h-0",
          !selectedLocationId
            ? "bg-brand-gradient text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        All locations
      </button>
      {locations.map((loc) => {
        const isSelected = selectedLocationId === loc.id;
        return (
          <button
            key={loc.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => setLocation(loc.id)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px] sm:min-h-0",
              isSelected
                ? "bg-brand-gradient text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {loc.name}
          </button>
        );
      })}
    </div>
  );
}

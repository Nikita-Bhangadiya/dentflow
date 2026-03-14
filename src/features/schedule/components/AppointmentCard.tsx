"use client";

import { createClient } from "@/lib/supabase/client";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { WORKFLOW_STATUSES } from "@/features/schedule/types";
import type { AppointmentRow } from "@/features/schedule/types";

interface AppointmentCardProps {
  appointment: AppointmentRow;
  onClick: () => void;
  compact?: boolean;
}

export function AppointmentCard({ appointment, onClick, compact }: AppointmentCardProps) {
  async function advanceStatus() {
    const currentIndex = WORKFLOW_STATUSES.indexOf(appointment.workflow_status);
    if (currentIndex >= WORKFLOW_STATUSES.length - 1) {
      return;
    }

    const nextStatus = WORKFLOW_STATUSES[currentIndex + 1];
    const supabase = createClient();
    await supabase.from("appointments").update({ workflow_status: nextStatus }).eq("id", appointment.id);
  }

  const time = new Date(appointment.scheduled_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const pendingTasks = appointment.tasks.filter((task) => !task.completed).length;

  return (
    <m.div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "cursor-pointer rounded-xl border app-card-light hover:border-primary/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        compact ? "p-2 space-y-1 rounded-lg" : "p-3 space-y-2"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={cn("truncate font-semibold text-foreground", compact ? "text-sm" : "text-base")}>
            {appointment.patient.full_name}
          </p>
          <p className={cn("capitalize text-muted-foreground", compact ? "text-xs" : "text-sm")}>
            {appointment.visit_type.replace(/_/g, " ")} · {time}
          </p>
        </div>
        {appointment.patient.no_show_risk === "high" ? (
          <span className="shrink-0 rounded-full border border-destructive/20 bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
            High risk
          </span>
        ) : null}
      </div>

      <div className={cn("flex flex-wrap gap-1", compact && "gap-0.5")}>
        {appointment.patient.insurance_status !== "verified" ? (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-300">
            Ins. {appointment.patient.insurance_status}
          </span>
        ) : null}
        {appointment.patient.balance_cents > 0 ? (
          <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-300">
            ${(appointment.patient.balance_cents / 100).toFixed(0)} balance
          </span>
        ) : null}
        {pendingTasks > 0 ? (
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {pendingTasks} task{pendingTasks > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>

      <div className={cn("flex items-center justify-between gap-2", compact && "gap-1")}>
        <span className="text-sm text-muted-foreground truncate min-w-0">
          {appointment.provider.full_name.split(",")[0]}
        </span>
        {appointment.workflow_status !== "checked_out" ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              void advanceStatus();
            }}
            className={cn(
              "btn-dora-glass shrink-0 rounded-full",
              compact ? "btn-dora-glass-sm min-h-[28px] px-2 text-xs" : "btn-dora-glass-sm px-4 text-sm"
            )}
          >
            <span className="btn-dora-glass-inner">Advance →</span>
          </button>
        ) : null}
      </div>
    </m.div>
  );
}

import { AppointmentCard } from "@/features/schedule/components/AppointmentCard";
import { STATUS_LABELS, STATUS_PILL_CLASS } from "@/features/schedule/types";
import type { AppointmentRow, WorkflowStatus } from "@/features/schedule/types";
import { cn } from "@/lib/utils";

interface WorkflowColumnProps {
  status: WorkflowStatus;
  appointments: AppointmentRow[];
  onCardClick: (appointment: AppointmentRow) => void;
  compact?: boolean;
}

export function WorkflowColumn({ status, appointments, onCardClick, compact }: WorkflowColumnProps) {
  const pillClass = STATUS_PILL_CLASS[status];

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col app-card-light rounded-2xl transition-all",
        compact ? "min-w-[140px] w-[140px] p-2.5 rounded-xl" : "min-w-[200px] p-3"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={cn("rounded-full px-2.5 py-1 text-sm font-medium", pillClass)}>
          {STATUS_LABELS[status]}
        </span>
        <span className="text-sm font-medium text-muted-foreground tabular-nums">{appointments.length}</span>
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 overflow-y-auto overscroll-contain",
          compact ? "mt-2 max-h-[60vh]" : "mt-3 max-h-[70vh]"
        )}
      >
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onClick={() => onCardClick(appointment)}
            compact={compact}
          />
        ))}
        {appointments.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground opacity-70">No patients</p>
        ) : null}
      </div>
    </div>
  );
}

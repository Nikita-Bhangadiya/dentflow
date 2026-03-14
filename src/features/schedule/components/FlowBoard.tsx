"use client";

import { useState, useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { BoardScrollNavigator } from "@/features/schedule/components/BoardScrollNavigator";
import { PatientSheet } from "@/features/patients/components/PatientSheet";
import { WorkflowColumn } from "@/features/schedule/components/WorkflowColumn";
import { useRealtimeSchedule } from "@/features/schedule/hooks/useRealtimeSchedule";
import { WORKFLOW_STATUSES } from "@/features/schedule/types";
import type { AppointmentRow } from "@/features/schedule/types";

interface FlowBoardProps {
  initial: AppointmentRow[];
}

const columnMotion = {
  hidden: { opacity: 0, y: 12 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: index * 0.06, ease: "easeOut" },
  }),
};

export function FlowBoard({ initial }: FlowBoardProps) {
  const appointments = useRealtimeSchedule(initial);
  const [selected, setSelected] = useState<AppointmentRow | null>(null);
  const [compact, setCompact] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const appointmentsByStatus = WORKFLOW_STATUSES.reduce(
    (accumulator, status) => {
      accumulator[status] = appointments.filter((appointment) => appointment.workflow_status === status);
      return accumulator;
    },
    {} as Record<(typeof WORKFLOW_STATUSES)[number], AppointmentRow[]>
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setCompact((c) => !c)}
          className={cn(
            "flex items-center gap-2 min-h-[36px] px-3 rounded-lg border text-sm font-medium transition-colors",
            compact
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
          aria-pressed={compact}
          aria-label={compact ? "Compact view on" : "Compact view off"}
        >
          {compact ? <LayoutList size={16} /> : <LayoutGrid size={16} />}
          {compact ? "Compact view" : "Normal view"}
        </button>
        <BoardScrollNavigator scrollRef={scrollContainerRef} className="shrink-0" />
      </div>
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden pb-4 scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex min-w-0 gap-4">
          {WORKFLOW_STATUSES.map((status, index) => (
            <m.div
              key={status}
              variants={columnMotion}
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              custom={index}
              className="shrink-0"
            >
              <WorkflowColumn
                status={status}
                appointments={appointmentsByStatus[status] ?? []}
                onCardClick={setSelected}
                compact={compact}
              />
            </m.div>
          ))}
        </div>
      </div>
      <PatientSheet appointment={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AppointmentRow, WorkflowStatus } from "@/features/schedule/types";

export function useRealtimeSchedule(initial: AppointmentRow[]) {
  const [appointments, setAppointments] = useState(initial);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "appointments" },
        (payload) => {
          setAppointments((previous) =>
            previous.map((appointment) =>
              appointment.id === payload.new.id
                ? { ...appointment, workflow_status: payload.new.workflow_status as WorkflowStatus }
                : appointment
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return appointments;
}

"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskList } from "@/features/patients/components/TaskList";
import { CommunicationTimeline } from "@/features/patients/components/CommunicationTimeline";
import { AiInsightPanel } from "@/features/patients/components/AiInsightPanel";
import type { PatientDetailResponse } from "@/features/patients/types";
import type { AppointmentRow } from "@/features/schedule/types";
import { sendReminder } from "@/features/patients/actions/sendReminder";
import { toast } from "sonner";

interface PatientSheetProps {
  appointment: AppointmentRow | null;
  onClose: () => void;
}

export function PatientSheet({ appointment, onClose }: PatientSheetProps) {
  const [detail, setDetail] = useState<PatientDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");

  useEffect(() => {
    if (!appointment?.patient?.id) {
      queueMicrotask(() => setDetail(null));
      return;
    }
    queueMicrotask(() => setLoading(true));
    const url = `/api/patients/${appointment.patient.id}/detail?appointmentId=${appointment.id}`;
    fetch(url)
      .then((r) => r.json())
      .then((data: PatientDetailResponse) => {
        setDetail(data);
      })
      .finally(() => setLoading(false));
  }, [appointment?.id, appointment?.patient?.id]);

  async function handleSendReminder() {
    if (!detail?.patient || !reminderMessage.trim()) return;
    const res = await sendReminder(
      detail.patient.id,
      detail.patient.organization_id,
      reminderMessage.trim()
    );
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Reminder sent");
      setReminderMessage("");
      setDetail((prev) =>
        prev
          ? {
              ...prev,
              communications: [
                {
                  id: crypto.randomUUID(),
                  channel: "sms",
                  direction: "outbound",
                  content: reminderMessage.trim(),
                  created_at: new Date().toISOString(),
                },
                ...prev.communications,
              ],
            }
          : null
      );
    }
  }

  const open = Boolean(appointment);

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent
        className="w-full max-w-md overflow-y-auto border-border bg-background p-0 data-[state=open]:slide-in-from-right"
        data-theme="app"
      >
        <div className="flex flex-col h-full p-6 pt-14">
          <SheetHeader className="space-y-1 text-left pb-4 border-b border-border">
            <SheetTitle className="text-xl font-semibold text-foreground">
              {appointment?.patient?.full_name ?? "Patient"}
            </SheetTitle>
          </SheetHeader>
          {loading && (
            <div className="mt-8 space-y-6 animate-pulse">
              <div className="h-24 rounded-xl bg-muted/50" />
              <div className="h-40 rounded-xl bg-muted/50" />
            </div>
          )}
          {!loading && detail?.patient && (
            <div className="mt-8 space-y-8">
              <AiInsightPanel
              patientId={detail.patient.id}
              patientName={detail.patient.full_name}
              noShowRisk={detail.patient.no_show_risk}
              taskCount={detail.tasks.length}
            />
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 p-1 rounded-xl bg-muted/50 border border-border">
                <TabsTrigger
                  value="tasks"
                  className="min-h-[44px] rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="comms"
                  className="min-h-[44px] rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Comms
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                  className="min-h-[44px] rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Info
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tasks" className="mt-6">
                <TaskList tasks={detail.tasks} />
              </TabsContent>
              <TabsContent value="comms" className="mt-6 space-y-6">
                <CommunicationTimeline communications={detail.communications} />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Send reminder..."
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    className="min-h-[44px] flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={handleSendReminder}
                    className="btn-dora-glass btn-dora-glass-sm shrink-0 rounded-full px-4"
                  >
                    <span className="btn-dora-glass-inner">Send</span>
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="info" className="mt-6">
                <div className="glass-surface rounded-2xl p-4 space-y-3 text-sm">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Risk:</span>{" "}
                    {detail.patient.no_show_risk}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Score:</span>{" "}
                    {detail.patient.risk_score ?? "—"}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

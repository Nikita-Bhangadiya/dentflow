"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiInsightPanelProps {
  patientId: string;
  patientName: string;
  noShowRisk?: string;
  taskCount?: number;
}

export function AiInsightPanel({
  patientId,
  patientName,
  noShowRisk = "low",
  taskCount = 0,
}: AiInsightPanelProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!patientId) return;
    const ac = new AbortController();
    queueMicrotask(() => {
      setText("");
      setLoading(true);
    });
    fetch("/api/ai/patient-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName,
        visitType: "check-up",
        noShowRisk,
        balanceCents: 0,
        insuranceStatus: "—",
        recommendedAction: "—",
        taskCount,
      }),
      signal: ac.signal,
    })
      .then(async (res) => {
        if (!res.ok) return;
        const reader = res.body?.getReader();
        if (!reader) return;
        const dec = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          setText(acc);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [patientId, patientName, noShowRisk, taskCount]);

  return (
    <div className="glass-surface rounded-2xl overflow-hidden border border-border min-h-[80px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 p-4 text-left font-semibold text-foreground min-h-[44px] hover:bg-accent/50 transition-colors"
      >
        <span>AI Insight</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        )}
      </button>
      {open && (
        <div className="border-t border-border px-4 pb-4 pt-2 text-sm text-muted-foreground whitespace-pre-wrap">
          {loading && !text && (
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-4/5 rounded bg-muted" />
              <div className="h-3 w-3/5 rounded bg-muted" />
            </div>
          )}
          {text && <p className="text-foreground/90">{text}</p>}
        </div>
      )}
    </div>
  );
}

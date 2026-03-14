"use client";

import { Mail, MessageSquare } from "lucide-react";
import type { CommunicationRow } from "@/features/patients/types";

interface CommunicationTimelineProps {
  communications: CommunicationRow[];
}

export function CommunicationTimeline({ communications }: CommunicationTimelineProps) {
  return (
    <ul className="space-y-3">
      {communications.map((c) => (
        <li
          key={c.id}
          className="flex gap-4 rounded-xl border border-border bg-card/50 p-4 text-sm"
        >
          <span className="shrink-0 text-muted-foreground mt-0.5">
            {c.channel === "email" ? (
              <Mail className="h-4 w-4" aria-hidden />
            ) : (
              <MessageSquare className="h-4 w-4" aria-hidden />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground capitalize">{c.direction}</p>
            <p className="mt-1 text-muted-foreground">{c.content}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(c.created_at).toLocaleString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useState } from "react";
import { completeTask } from "@/features/patients/actions/completeTask";
import type { TaskRow } from "@/features/patients/types";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: TaskRow[];
}

export function TaskList({ tasks: initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);

  async function handleToggle(taskId: string, currentlyCompleted: boolean) {
    if (currentlyCompleted) return;
    const res = await completeTask(taskId);
    if (!res.error) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
      );
    }
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={cn(
            "flex min-h-[44px] items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors",
            task.completed && "opacity-60"
          )}
        >
          <button
            type="button"
            aria-label={task.completed ? "Completed" : "Mark complete"}
            onClick={() => handleToggle(task.id, task.completed)}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-input bg-background text-foreground hover:border-primary/50 transition-colors"
          >
            {task.completed && <span className="text-primary text-xs font-bold">✓</span>}
          </button>
          <span className={cn("text-sm text-foreground", task.completed && "line-through text-muted-foreground")}>
            {task.title}
          </span>
        </li>
      ))}
    </ul>
  );
}

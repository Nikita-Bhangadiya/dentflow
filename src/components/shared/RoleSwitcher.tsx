"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Star } from "lucide-react";
import { useRole, type Role } from "@/context/RoleContext";
import { cn } from "@/lib/utils";

const ROLE_LABELS: Record<Role, string> = {
  dso_executive: "DSO Executive",
  practice_manager: "Practice Manager",
  front_desk: "Front Desk",
  provider: "Provider",
};

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  dso_executive: "All locations - Full analytics",
  practice_manager: "Single location - Ops view",
  front_desk: "Queue & workflow - Today only",
  provider: "My schedule - Clinical view",
};

export function RoleSwitcher() {
  const { activeRole, setRole } = useRole();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 min-h-[36px] px-3 rounded-full border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
      >
        <span>{ROLE_LABELS[activeRole]}</span>
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="absolute top-full right-0 z-50 mt-2 min-w-[240px] rounded-xl border border-border bg-background/90 p-2 space-y-1 shadow-lg backdrop-blur-xl">
          <p className="px-2 py-1 text-xs font-medium text-muted-foreground">Viewing as</p>
          {(Object.keys(ROLE_LABELS) as Role[]).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setRole(role, null, null, null);
                setOpen(false);
              }}
              className={cn(
                "flex w-full min-h-[44px] items-start justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                activeRole === role
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <span>
                <span className="block text-sm font-medium">{ROLE_LABELS[role]}</span>
                <span className="block text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</span>
              </span>
              {activeRole === role ? <Check size={14} className="mt-0.5 shrink-0 text-primary" /> : null}
            </button>
          ))}
          <div className="border-t border-border pt-2">
            <p className="px-2 text-xs text-muted-foreground flex items-center gap-1">
              <Star size={10} />
              Superadmin - switching enabled
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { DentFlowBrand } from "@/components/shared/DentFlowBrand";

export function NavLeft() {
  const { isOpen, toggle } = useSidebar();

  if (isOpen) {
    return <div className="min-w-0 flex-1" aria-hidden />;
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
      </button>
      <div className="min-w-0 flex items-center">
        <DentFlowBrand variant="navbar" />
      </div>
    </div>
  );
}

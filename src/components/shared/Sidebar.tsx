"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Calendar, LayoutDashboard, PanelLeftClose, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { DentFlowBrand } from "@/components/shared/DentFlowBrand";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/schedule", label: "Schedule", icon: Calendar },
  { href: "/dashboard/patients", label: "Patients", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
] as const;

const SIDEBAR_WIDTH = 224;

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
          onClick={toggle}
          aria-label="Close sidebar"
        />
      )}
      <div
        className={cn(
          "z-50 shrink-0 overflow-hidden border-r border-border app-glass-panel transition-[width] duration-300 ease-out",
          isOpen && "max-md:fixed max-md:inset-y-0 max-md:left-0"
        )}
        style={{ width: isOpen ? SIDEBAR_WIDTH : 0 }}
      >
        <aside className="flex h-full w-[224px] flex-col" aria-label="App sidebar">
          <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-3">
            <DentFlowBrand variant="sidebar" className="min-w-0" />
            <button
              type="button"
              onClick={toggle}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Main">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-gradient text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
}

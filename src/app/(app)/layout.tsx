import type { ReactNode } from "react";
import { RoleProvider } from "@/context/RoleContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Sidebar } from "@/components/shared/Sidebar";
import { TopNav } from "@/components/shared/TopNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <SidebarProvider>
        <div data-theme="app" className="app-shell-bg min-h-screen text-foreground">
          <div className="flex">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col min-w-0">
              <TopNav />
              <main className="flex-1 p-6 sm:p-8">{children}</main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </RoleProvider>
  );
}

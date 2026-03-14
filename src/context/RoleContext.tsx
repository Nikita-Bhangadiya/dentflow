"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Role = "dso_executive" | "practice_manager" | "front_desk" | "provider";

interface RoleState {
  activeRole: Role;
  activeLocationId: string | null;
  activeProviderId: string | null;
  activeProviderName: string | null;
  setRole: (
    role: Role,
    locationId?: string | null,
    providerId?: string | null,
    providerName?: string | null
  ) => void;
}

const RoleContext = createContext<RoleState | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRole] = useState<Role>("dso_executive");
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [activeProviderId, setActiveProviderId] = useState<string | null>(null);
  const [activeProviderName, setActiveProviderName] = useState<string | null>(null);

  const value = useMemo<RoleState>(
    () => ({
      activeRole,
      activeLocationId,
      activeProviderId,
      activeProviderName,
      setRole: (role, locationId = null, providerId = null, providerName = null) => {
        setActiveRole(role);
        setActiveLocationId(locationId);
        setActiveProviderId(providerId);
        setActiveProviderName(providerName);
      },
    }),
    [activeLocationId, activeProviderId, activeProviderName, activeRole]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

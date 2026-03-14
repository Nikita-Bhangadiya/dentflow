export interface KpiData {
  label: string;
  value: string | number;
  subtext?: string;
  alert?: boolean;
  alertText?: string;
}

export interface LocationSummary {
  id: string;
  name: string;
  city: string | null;
  totalPatients: number;
  checkedOut: number;
  withProvider: number;
  needsAction: number;
  productionCents: number;
  dailyGoalCents: number;
  highRiskCount: number;
  chairCount: number;
}

export interface DashboardData {
  org: { name: string };
  kpis: KpiData[];
  locations: LocationSummary[];
}

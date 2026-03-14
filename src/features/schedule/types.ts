export const WORKFLOW_STATUSES = [
  "arrived",
  "needs_forms",
  "needs_eligibility",
  "ready",
  "with_provider",
  "pending_checkout",
  "checked_out",
] as const;

export type WorkflowStatus = (typeof WORKFLOW_STATUSES)[number];

export const STATUS_LABELS: Record<WorkflowStatus, string> = {
  arrived: "Arrived",
  needs_forms: "Needs Forms",
  needs_eligibility: "Needs Eligibility",
  ready: "Ready",
  with_provider: "With Provider",
  pending_checkout: "Pending Checkout",
  checked_out: "Checked Out",
};

export const STATUS_COLORS: Record<
  WorkflowStatus,
  { bg: string; border: string; text: string }
> = {
  arrived: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
  },
  needs_forms: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-300",
  },
  needs_eligibility: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-700 dark:text-orange-300",
  },
  ready: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  with_provider: {
    bg: "bg-violet-50 dark:bg-violet-950/20",
    border: "border-violet-200 dark:border-violet-800",
    text: "text-violet-700 dark:text-violet-300",
  },
  pending_checkout: {
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-700 dark:text-yellow-300",
  },
  checked_out: {
    bg: "bg-gray-50 dark:bg-gray-950/20",
    border: "border-gray-200 dark:border-gray-700",
    text: "text-gray-500 dark:text-gray-400",
  },
};

/** Theme-aware status pill class for [data-theme="app"] (dashboard palette) */
export const STATUS_PILL_CLASS: Record<WorkflowStatus, string> = {
  arrived: "status-pill-arrived",
  needs_forms: "status-pill-forms",
  needs_eligibility: "status-pill-eligibility",
  ready: "status-pill-ready",
  with_provider: "status-pill-provider",
  pending_checkout: "status-pill-checkout",
  checked_out: "status-pill-done",
};

export interface AppointmentRow {
  id: string;
  scheduled_at: string;
  workflow_status: WorkflowStatus;
  visit_type: string;
  duration_minutes: number;
  production_amount_cents: number;
  notes_status: string;
  patient: {
    id: string;
    full_name: string;
    no_show_risk: string;
    risk_score: number;
    balance_cents: number;
    insurance_status: string;
    phone: string | null;
    email: string | null;
  };
  provider: {
    id: string;
    full_name: string;
    specialty: string;
  };
  location: {
    id: string;
    name: string;
  };
  tasks: { id: string; title: string; completed: boolean }[];
}

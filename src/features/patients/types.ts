export interface PatientDetail {
  id: string;
  full_name: string;
  no_show_risk: string;
  risk_score: number;
  organization_id: string;
  location_id: string | null;
}

export interface TaskRow {
  id: string;
  appointment_id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export interface CommunicationRow {
  id: string;
  channel: string;
  direction: string;
  content: string;
  created_at: string;
}

export interface PatientDetailResponse {
  patient: PatientDetail | null;
  tasks: TaskRow[];
  communications: CommunicationRow[];
}

-- ============================================================
-- Migration: 002_create_dentflow_schema.sql
-- Description: DentFlow core schema for organizations, locations, providers, patients, appointments, tasks, and communications.
-- ============================================================

-- ============================================================
-- TABLE(S)
-- ============================================================

CREATE TABLE IF NOT EXISTS organizations (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS locations (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID        NOT NULL REFERENCES organizations(id),
  name            TEXT        NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS providers (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID        NOT NULL REFERENCES organizations(id),
  full_name       TEXT        NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS patients (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID      NOT NULL REFERENCES organizations(id),
  location_id   UUID        REFERENCES locations(id),
  full_name     TEXT        NOT NULL,
  no_show_risk  TEXT        NOT NULL CHECK (no_show_risk IN ('low', 'medium', 'high')),
  risk_score    INT         NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID        NOT NULL REFERENCES patients(id),
  provider_id     UUID        NOT NULL REFERENCES providers(id),
  location_id     UUID        NOT NULL REFERENCES locations(id),
  scheduled_at    TIMESTAMPTZ NOT NULL,
  workflow_status TEXT        NOT NULL CHECK (
    workflow_status IN (
      'arrived',
      'needs_forms',
      'needs_eligibility',
      'ready',
      'with_provider',
      'pending_checkout',
      'checked_out'
    )
  ),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID        NOT NULL REFERENCES appointments(id),
  title          TEXT        NOT NULL,
  completed      BOOLEAN     NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS communications (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID        NOT NULL REFERENCES patients(id),
  organization_id UUID        NOT NULL REFERENCES organizations(id),
  channel         TEXT        NOT NULL,
  direction       TEXT        NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  content         TEXT        NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_locations_organization_id ON locations(organization_id);
CREATE INDEX IF NOT EXISTS idx_providers_organization_id ON providers(organization_id);
CREATE INDEX IF NOT EXISTS idx_patients_organization_id ON patients(organization_id);
CREATE INDEX IF NOT EXISTS idx_patients_location_id ON patients(location_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_provider_id ON appointments(provider_id);
CREATE INDEX IF NOT EXISTS idx_appointments_location_id ON appointments(location_id);
CREATE INDEX IF NOT EXISTS idx_tasks_appointment_id ON tasks(appointment_id);
CREATE INDEX IF NOT EXISTS idx_communications_patient_id ON communications(patient_id);
CREATE INDEX IF NOT EXISTS idx_communications_organization_id ON communications(organization_id);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_organizations_updated_at ON organizations;
CREATE TRIGGER trg_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_locations_updated_at ON locations;
CREATE TRIGGER trg_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_providers_updated_at ON providers;
CREATE TRIGGER trg_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_patients_updated_at ON patients;
CREATE TRIGGER trg_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_appointments_updated_at ON appointments;
CREATE TRIGGER trg_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_tasks_updated_at ON tasks;
CREATE TRIGGER trg_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "organizations_authenticated_select" ON organizations;
CREATE POLICY "organizations_authenticated_select"
  ON organizations FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "locations_authenticated_select" ON locations;
CREATE POLICY "locations_authenticated_select"
  ON locations FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "providers_authenticated_select" ON providers;
CREATE POLICY "providers_authenticated_select"
  ON providers FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "patients_authenticated_select" ON patients;
CREATE POLICY "patients_authenticated_select"
  ON patients FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "appointments_authenticated_select" ON appointments;
CREATE POLICY "appointments_authenticated_select"
  ON appointments FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "tasks_authenticated_select" ON tasks;
CREATE POLICY "tasks_authenticated_select"
  ON tasks FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "communications_authenticated_select" ON communications;
CREATE POLICY "communications_authenticated_select"
  ON communications FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "appointments_authenticated_update" ON appointments;
CREATE POLICY "appointments_authenticated_update"
  ON appointments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "tasks_authenticated_update" ON tasks;
CREATE POLICY "tasks_authenticated_update"
  ON tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "communications_authenticated_insert" ON communications;
CREATE POLICY "communications_authenticated_insert"
  ON communications FOR INSERT TO authenticated WITH CHECK (true);

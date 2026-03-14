ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS visit_type TEXT NOT NULL DEFAULT 'exam'
    CHECK (
      visit_type IN (
        'prophy',
        'exam',
        'filling',
        'crown',
        'extraction',
        'root_canal',
        'consult',
        'ortho_checkup',
        'perio',
        'implant'
      )
    ),
  ADD COLUMN IF NOT EXISTS duration_minutes INT NOT NULL DEFAULT 60,
  ADD COLUMN IF NOT EXISTS production_amount_cents INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS notes_status TEXT NOT NULL DEFAULT 'unsigned'
    CHECK (notes_status IN ('unsigned', 'signed', 'not_required'));

ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS insurance_status TEXT NOT NULL DEFAULT 'unverified'
    CHECK (insurance_status IN ('verified', 'pending', 'expired', 'unverified')),
  ADD COLUMN IF NOT EXISTS balance_cents INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_visit_date DATE,
  ADD COLUMN IF NOT EXISTS treatment_plan_value_cents INT NOT NULL DEFAULT 0;

ALTER TABLE providers
  ADD COLUMN IF NOT EXISTS specialty TEXT NOT NULL DEFAULT 'general_dentist'
    CHECK (
      specialty IN (
        'general_dentist',
        'hygienist',
        'orthodontist',
        'endodontist',
        'periodontist'
      )
    ),
  ADD COLUMN IF NOT EXISTS location_id UUID REFERENCES locations(id);

ALTER TABLE locations
  ADD COLUMN IF NOT EXISTS daily_goal_cents INT NOT NULL DEFAULT 800000,
  ADD COLUMN IF NOT EXISTS chair_count INT NOT NULL DEFAULT 4,
  ADD COLUMN IF NOT EXISTS city TEXT;

CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_appointments_workflow_status ON appointments(workflow_status);
CREATE INDEX IF NOT EXISTS idx_patients_insurance_status ON patients(insurance_status);

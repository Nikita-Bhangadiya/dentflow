-- ============================================================
-- Migration: 001_create_visitor_names.sql
-- Description: Visitor names keyed by anonymous_id (cookie) for welcome flow; one row per visitor.
-- ============================================================

-- ============================================================
-- TABLE(S)
-- ============================================================

CREATE TABLE IF NOT EXISTS visitor_names (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  anonymous_id UUID        NOT NULL UNIQUE,
  name         TEXT        NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_visitor_names_anonymous_id ON visitor_names(anonymous_id);

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

CREATE TRIGGER trg_visitor_names_updated_at
  BEFORE UPDATE ON visitor_names
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (Pattern C: anon app)
-- ============================================================

ALTER TABLE visitor_names ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visitor_names_anon_select"
  ON visitor_names FOR SELECT TO anon USING (true);

CREATE POLICY "visitor_names_anon_insert"
  ON visitor_names FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "visitor_names_anon_update"
  ON visitor_names FOR UPDATE TO anon USING (true) WITH CHECK (true);

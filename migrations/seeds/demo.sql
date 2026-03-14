DO $$
DECLARE
  v_org_id   UUID := gen_random_uuid();
  v_loc1_id  UUID := gen_random_uuid();
  v_loc2_id  UUID := gen_random_uuid();

  v_prov1_id UUID := gen_random_uuid();
  v_prov2_id UUID := gen_random_uuid();
  v_prov3_id UUID := gen_random_uuid();

  v_pat1_id  UUID := gen_random_uuid();
  v_pat2_id  UUID := gen_random_uuid();
  v_pat3_id  UUID := gen_random_uuid();
  v_pat4_id  UUID := gen_random_uuid();
  v_pat5_id  UUID := gen_random_uuid();
  v_pat6_id  UUID := gen_random_uuid();
  v_pat7_id  UUID := gen_random_uuid();
  v_pat8_id  UUID := gen_random_uuid();

  v_apt1_id  UUID := gen_random_uuid();
  v_apt2_id  UUID := gen_random_uuid();
  v_apt3_id  UUID := gen_random_uuid();
  v_apt4_id  UUID := gen_random_uuid();
  v_apt5_id  UUID := gen_random_uuid();
  v_apt6_id  UUID := gen_random_uuid();
  v_apt7_id  UUID := gen_random_uuid();
  v_apt8_id  UUID := gen_random_uuid();
BEGIN
  INSERT INTO organizations (id, name)
  VALUES (v_org_id, 'SmileCare Group');

  INSERT INTO locations (id, organization_id, name)
  VALUES
    (v_loc1_id, v_org_id, 'Downtown Dental'),
    (v_loc2_id, v_org_id, 'Northside Smiles');

  INSERT INTO providers (id, organization_id, full_name)
  VALUES
    (v_prov1_id, v_org_id, 'Dr. Maya Patel'),
    (v_prov2_id, v_org_id, 'Dr. Ethan Brooks'),
    (v_prov3_id, v_org_id, 'Dr. Sofia Nguyen');

  INSERT INTO patients (id, organization_id, location_id, full_name, no_show_risk, risk_score)
  VALUES
    (v_pat1_id, v_org_id, v_loc1_id, 'Ava Thompson', 'low', 12),
    (v_pat2_id, v_org_id, v_loc1_id, 'Liam Carter', 'medium', 48),
    (v_pat3_id, v_org_id, v_loc2_id, 'Noah Ramirez', 'high', 89),
    (v_pat4_id, v_org_id, v_loc2_id, 'Emma Johnson', 'medium', 54),
    (v_pat5_id, v_org_id, NULL, 'Olivia Chen', 'low', 18),
    (v_pat6_id, v_org_id, v_loc1_id, 'James Walker', 'high', 93),
    (v_pat7_id, v_org_id, NULL, 'Sophia Davis', 'medium', 61),
    (v_pat8_id, v_org_id, v_loc2_id, 'Benjamin Lee', 'low', 27);

  INSERT INTO appointments (id, patient_id, provider_id, location_id, scheduled_at, workflow_status)
  VALUES
    (v_apt1_id, v_pat1_id, v_prov1_id, v_loc1_id, date_trunc('day', now()) + interval '8 hours', 'arrived'),
    (v_apt2_id, v_pat2_id, v_prov2_id, v_loc1_id, date_trunc('day', now()) + interval '9 hours', 'needs_forms'),
    (v_apt3_id, v_pat3_id, v_prov3_id, v_loc2_id, date_trunc('day', now()) + interval '10 hours', 'needs_eligibility'),
    (v_apt4_id, v_pat4_id, v_prov1_id, v_loc2_id, date_trunc('day', now()) + interval '11 hours', 'ready'),
    (v_apt5_id, v_pat5_id, v_prov2_id, v_loc1_id, date_trunc('day', now()) + interval '12 hours', 'with_provider'),
    (v_apt6_id, v_pat6_id, v_prov3_id, v_loc1_id, date_trunc('day', now()) + interval '13 hours', 'pending_checkout'),
    (v_apt7_id, v_pat7_id, v_prov1_id, v_loc2_id, date_trunc('day', now()) + interval '14 hours', 'checked_out'),
    (v_apt8_id, v_pat8_id, v_prov2_id, v_loc2_id, date_trunc('day', now()) + interval '15 hours', 'ready');

  INSERT INTO tasks (appointment_id, title, completed)
  VALUES
    (v_apt1_id, 'Confirm patient arrival in chart', true),
    (v_apt1_id, 'Collect consent signatures', false),
    (v_apt2_id, 'Send intake packet reminder', false),
    (v_apt2_id, 'Verify photo ID at front desk', false),
    (v_apt3_id, 'Run insurance eligibility check', true),
    (v_apt3_id, 'Capture remaining subscriber details', false),
    (v_apt4_id, 'Escort patient to operatory', true),
    (v_apt4_id, 'Prepare exam tray', false),
    (v_apt5_id, 'Review treatment notes with provider', true),
    (v_apt5_id, 'Queue radiographs for review', false),
    (v_apt6_id, 'Print checkout summary', false),
    (v_apt6_id, 'Collect copay at desk', false),
    (v_apt7_id, 'Email postoperative instructions', true),
    (v_apt7_id, 'Schedule six-month recall', true),
    (v_apt8_id, 'Verify updated medical history', false),
    (v_apt8_id, 'Stage room for restorative consult', false);

  INSERT INTO communications (patient_id, organization_id, channel, direction, content)
  VALUES
    (v_pat1_id, v_org_id, 'sms', 'outbound', 'Your appointment check-in is now available.'),
    (v_pat2_id, v_org_id, 'email', 'outbound', 'Please complete your intake forms before arrival.'),
    (v_pat3_id, v_org_id, 'sms', 'inbound', 'I uploaded my new insurance card this morning.'),
    (v_pat4_id, v_org_id, 'email', 'outbound', 'Your cleaning appointment is confirmed for today.'),
    (v_pat6_id, v_org_id, 'sms', 'outbound', 'Checkout will include an updated treatment estimate.'),
    (v_pat7_id, v_org_id, 'email', 'inbound', 'Can you send me a copy of my visit summary?');
END
$$;

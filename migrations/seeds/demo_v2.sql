DO $$
DECLARE
  v_org_id   UUID := gen_random_uuid();
  v_loc1_id  UUID := gen_random_uuid();
  v_loc2_id  UUID := gen_random_uuid();
  v_loc3_id  UUID := gen_random_uuid();
  v_prov1_id UUID := gen_random_uuid();
  v_prov2_id UUID := gen_random_uuid();
  v_prov3_id UUID := gen_random_uuid();
  v_prov4_id UUID := gen_random_uuid();
  v_prov5_id UUID := gen_random_uuid();
  v_prov6_id UUID := gen_random_uuid();
  v_pat1_id  UUID := gen_random_uuid();
  v_pat2_id  UUID := gen_random_uuid();
  v_pat3_id  UUID := gen_random_uuid();
  v_pat4_id  UUID := gen_random_uuid();
  v_pat5_id  UUID := gen_random_uuid();
  v_pat6_id  UUID := gen_random_uuid();
  v_pat7_id  UUID := gen_random_uuid();
  v_pat8_id  UUID := gen_random_uuid();
  v_pat9_id  UUID := gen_random_uuid();
  v_pat10_id UUID := gen_random_uuid();
  v_pat11_id UUID := gen_random_uuid();
  v_pat12_id UUID := gen_random_uuid();
  v_pat13_id UUID := gen_random_uuid();
  v_pat14_id UUID := gen_random_uuid();
  v_pat15_id UUID := gen_random_uuid();
  v_apt1_id  UUID := gen_random_uuid();
  v_apt2_id  UUID := gen_random_uuid();
  v_apt3_id  UUID := gen_random_uuid();
  v_apt4_id  UUID := gen_random_uuid();
  v_apt5_id  UUID := gen_random_uuid();
  v_apt6_id  UUID := gen_random_uuid();
  v_apt7_id  UUID := gen_random_uuid();
  v_apt8_id  UUID := gen_random_uuid();
  v_apt9_id  UUID := gen_random_uuid();
  v_apt10_id UUID := gen_random_uuid();
  v_apt11_id UUID := gen_random_uuid();
  v_apt12_id UUID := gen_random_uuid();
  v_apt13_id UUID := gen_random_uuid();
  v_apt14_id UUID := gen_random_uuid();
  v_apt15_id UUID := gen_random_uuid();
  v_apt16_id UUID := gen_random_uuid();
  v_apt17_id UUID := gen_random_uuid();
  v_apt18_id UUID := gen_random_uuid();
BEGIN
  DELETE FROM communications;
  DELETE FROM tasks;
  DELETE FROM appointments;
  DELETE FROM patients;
  DELETE FROM providers;
  DELETE FROM locations;
  DELETE FROM organizations;

  INSERT INTO organizations (id, name)
  VALUES (v_org_id, 'SmileCare Group');

  INSERT INTO locations (id, organization_id, name, daily_goal_cents, chair_count, city)
  VALUES
    (v_loc1_id, v_org_id, 'Downtown Dental',   950000, 6, 'Austin, TX'),
    (v_loc2_id, v_org_id, 'Northside Smiles',  720000, 4, 'Austin, TX'),
    (v_loc3_id, v_org_id, 'Cedar Park Dental', 580000, 3, 'Cedar Park, TX');

  INSERT INTO providers (id, organization_id, full_name, specialty, location_id)
  VALUES
    (v_prov1_id, v_org_id, 'Dr. Maya Patel',      'general_dentist', v_loc1_id),
    (v_prov2_id, v_org_id, 'Dr. Ethan Brooks',    'general_dentist', v_loc1_id),
    (v_prov3_id, v_org_id, 'Jennifer Walsh, RDH', 'hygienist',       v_loc1_id),
    (v_prov4_id, v_org_id, 'Dr. Sofia Nguyen',    'general_dentist', v_loc2_id),
    (v_prov5_id, v_org_id, 'Marcus Johnson, RDH', 'hygienist',       v_loc2_id),
    (v_prov6_id, v_org_id, 'Dr. Aiden Park',      'general_dentist', v_loc3_id);

  INSERT INTO patients (
    id,
    organization_id,
    location_id,
    full_name,
    no_show_risk,
    risk_score,
    phone,
    email,
    date_of_birth,
    insurance_status,
    balance_cents,
    last_visit_date,
    treatment_plan_value_cents
  )
  VALUES
    (v_pat1_id,  v_org_id, v_loc1_id, 'Ava Thompson',      'low',    12, '(512) 555-0142', 'ava.thompson@email.com',  '1988-03-15', 'verified',   0,     '2025-09-12',      0),
    (v_pat2_id,  v_org_id, v_loc1_id, 'Liam Carter',       'medium', 48, '(512) 555-0278', 'liam.carter@email.com',   '1995-07-22', 'pending',    18000, '2025-06-04', 145000),
    (v_pat3_id,  v_org_id, v_loc1_id, 'Olivia Chen',       'low',     9, '(512) 555-0391', 'olivia.chen@email.com',   '1975-11-30', 'verified',   0,     '2025-11-20',      0),
    (v_pat4_id,  v_org_id, v_loc1_id, 'James Walker',      'high',   91, '(512) 555-0467', 'james.walker@email.com',  '1982-01-08', 'expired',   48000, '2024-08-14', 220000),
    (v_pat5_id,  v_org_id, v_loc1_id, 'Charlotte Brown',   'low',    22, '(512) 555-0513', 'charlotte.b@email.com',   '1991-05-19', 'verified',   0,     '2025-10-07',      0),
    (v_pat6_id,  v_org_id, v_loc1_id, 'Henry Martinez',    'medium', 55, '(512) 555-0629', 'h.martinez@email.com',    '1968-09-03', 'verified',   9500,  '2025-07-22',  89500),
    (v_pat7_id,  v_org_id, v_loc2_id, 'Noah Ramirez',      'high',   87, '(737) 555-0112', 'noah.ramirez@email.com',  '2001-12-14', 'unverified', 0,     '2024-11-01',      0),
    (v_pat8_id,  v_org_id, v_loc2_id, 'Emma Johnson',      'medium', 44, '(737) 555-0234', 'emma.j@email.com',        '1979-04-26', 'pending',   24000, '2025-05-18', 195000),
    (v_pat9_id,  v_org_id, v_loc2_id, 'Sophia Davis',      'low',    15, '(737) 555-0356', 'sophia.davis@email.com',  '1993-08-11', 'verified',   0,     '2025-12-03',      0),
    (v_pat10_id, v_org_id, v_loc2_id, 'Benjamin Lee',      'low',    27, '(737) 555-0478', 'ben.lee@email.com',       '1986-02-07', 'verified',   5500,  '2025-09-29',      0),
    (v_pat11_id, v_org_id, v_loc2_id, 'Isabella Wilson',   'medium', 62, '(737) 555-0590', 'isabella.w@email.com',    '1972-06-18', 'expired',   36000, '2024-10-15', 310000),
    (v_pat12_id, v_org_id, v_loc3_id, 'Ethan Anderson',    'low',    18, '(512) 555-0701', 'ethan.a@email.com',       '1998-10-22', 'verified',   0,     '2025-11-08',      0),
    (v_pat13_id, v_org_id, v_loc3_id, 'Mia Thomas',        'high',   78, '(512) 555-0823', 'mia.thomas@email.com',    '1964-03-30', 'pending',   12500, '2024-09-20', 185000),
    (v_pat14_id, v_org_id, v_loc3_id, 'Alexander Jackson', 'medium', 39, '(512) 555-0945', 'alex.jackson@email.com',  '1990-07-15', 'verified',   2800,  '2025-08-13',      0),
    (v_pat15_id, v_org_id, v_loc3_id, 'Grace White',       'low',     8, '(512) 555-1067', 'grace.white@email.com',   '1955-01-25', 'verified',   0,     '2025-10-31',      0);

  INSERT INTO appointments (
    id,
    patient_id,
    provider_id,
    location_id,
    scheduled_at,
    workflow_status,
    visit_type,
    duration_minutes,
    production_amount_cents,
    notes_status
  )
  VALUES
    (v_apt1_id,  v_pat1_id,  v_prov1_id, v_loc1_id, date_trunc('day', now()) + interval '8 hours',         'checked_out',      'exam',       60,  14500, 'signed'),
    (v_apt2_id,  v_pat2_id,  v_prov1_id, v_loc1_id, date_trunc('day', now()) + interval '9 hours 30 min',  'with_provider',    'filling',    60,  28500, 'unsigned'),
    (v_apt3_id,  v_pat3_id,  v_prov1_id, v_loc1_id, date_trunc('day', now()) + interval '11 hours',        'ready',            'crown',      90, 142000, 'unsigned'),
    (v_apt4_id,  v_pat4_id,  v_prov1_id, v_loc1_id, date_trunc('day', now()) + interval '13 hours',        'needs_eligibility','consult',    30,   9500, 'not_required'),
    (v_apt5_id,  v_pat5_id,  v_prov2_id, v_loc1_id, date_trunc('day', now()) + interval '8 hours 30 min',  'checked_out',      'prophy',     60,  15500, 'signed'),
    (v_apt6_id,  v_pat6_id,  v_prov2_id, v_loc1_id, date_trunc('day', now()) + interval '10 hours',        'pending_checkout', 'root_canal', 90, 118000, 'signed'),
    (v_apt7_id,  v_pat1_id,  v_prov2_id, v_loc1_id, date_trunc('day', now()) + interval '14 hours 30 min', 'arrived',          'filling',    60,  32000, 'not_required'),
    (v_apt8_id,  v_pat3_id,  v_prov3_id, v_loc1_id, date_trunc('day', now()) + interval '8 hours',         'checked_out',      'prophy',     60,  14000, 'signed'),
    (v_apt9_id,  v_pat5_id,  v_prov3_id, v_loc1_id, date_trunc('day', now()) + interval '10 hours 30 min', 'needs_forms',      'prophy',     60,  14000, 'not_required'),
    (v_apt10_id, v_pat7_id,  v_prov4_id, v_loc2_id, date_trunc('day', now()) + interval '9 hours',         'needs_forms',      'exam',       60,  14500, 'not_required'),
    (v_apt11_id, v_pat8_id,  v_prov4_id, v_loc2_id, date_trunc('day', now()) + interval '10 hours 30 min', 'with_provider',    'extraction', 45,  38000, 'unsigned'),
    (v_apt12_id, v_pat9_id,  v_prov4_id, v_loc2_id, date_trunc('day', now()) + interval '13 hours',        'arrived',          'filling',    60,  24500, 'not_required'),
    (v_apt13_id, v_pat11_id, v_prov4_id, v_loc2_id, date_trunc('day', now()) + interval '15 hours',        'arrived',          'consult',    30,   9500, 'not_required'),
    (v_apt14_id, v_pat10_id, v_prov5_id, v_loc2_id, date_trunc('day', now()) + interval '8 hours',         'checked_out',      'prophy',     60,  14500, 'signed'),
    (v_apt15_id, v_pat9_id,  v_prov5_id, v_loc2_id, date_trunc('day', now()) + interval '11 hours',        'ready',            'perio',      60,  19500, 'not_required'),
    (v_apt16_id, v_pat12_id, v_prov6_id, v_loc3_id, date_trunc('day', now()) + interval '9 hours',         'checked_out',      'prophy',     60,  14000, 'signed'),
    (v_apt17_id, v_pat13_id, v_prov6_id, v_loc3_id, date_trunc('day', now()) + interval '11 hours',        'needs_eligibility','crown',      90, 138000, 'not_required'),
    (v_apt18_id, v_pat14_id, v_prov6_id, v_loc3_id, date_trunc('day', now()) + interval '14 hours',        'arrived',          'filling',    60,  27500, 'not_required');

  INSERT INTO tasks (appointment_id, title, completed)
  VALUES
    (v_apt1_id,  'Confirm patient identity and DOB', true),
    (v_apt1_id,  'Post exam findings to chart', true),
    (v_apt2_id,  'Verify updated health history', true),
    (v_apt2_id,  'Submit insurance pre-auth for filling', false),
    (v_apt3_id,  'Prepare crown prep tray and materials', false),
    (v_apt3_id,  'Confirm lab return date with patient', false),
    (v_apt4_id,  'Call Delta Dental to verify active coverage', false),
    (v_apt4_id,  'Collect subscriber member ID from patient', false),
    (v_apt5_id,  'Update periodontal chart measurements', true),
    (v_apt5_id,  'Schedule 6-month recall appointment', true),
    (v_apt6_id,  'Collect $480 patient portion at checkout', false),
    (v_apt6_id,  'Send post-treatment care instructions via SMS', false),
    (v_apt7_id,  'Check patient in and update contact info', false),
    (v_apt7_id,  'Confirm anesthetic preference with provider', false),
    (v_apt8_id,  'Document oral hygiene instructions given', true),
    (v_apt8_id,  'Apply fluoride treatment and confirm no allergy', true),
    (v_apt9_id,  'Send digital intake packet link via SMS', false),
    (v_apt9_id,  'Obtain photo ID copy at front desk', false),
    (v_apt10_id, 'Send new patient paperwork link (3 forms)', false),
    (v_apt10_id, 'Collect copy of insurance card', false),
    (v_apt11_id, 'Confirm consent for surgical extraction signed', true),
    (v_apt11_id, 'Review post-op care and prescriptions with patient', false),
    (v_apt12_id, 'Check patient in and confirm payment method on file', false),
    (v_apt12_id, 'Prepare composite resin and curing equipment', false),
    (v_apt13_id, 'Pull prior treatment plan for provider review', false),
    (v_apt13_id, 'Print treatment estimate for patient discussion', false),
    (v_apt14_id, 'Note pocket depth measurements in chart', true),
    (v_apt14_id, 'Issue recall reminder for 6 months out', true),
    (v_apt15_id, 'Confirm scaling quadrants with provider', false),
    (v_apt15_id, 'Prepare ultrasonic scaler and irrigation solution', false),
    (v_apt16_id, 'Update blood pressure reading in medical history', true),
    (v_apt16_id, 'Apply sealants on #3 and #14 as planned', true),
    (v_apt17_id, 'Verify MetLife plan covers major restorative', false),
    (v_apt17_id, 'Get pre-authorization number before proceeding', false),
    (v_apt18_id, 'Confirm anesthetic notes from last visit', false),
    (v_apt18_id, 'Stage operatory with appropriate composite shade', false);

  INSERT INTO communications (patient_id, organization_id, channel, direction, content)
  VALUES
    (v_pat2_id,  v_org_id, 'sms',   'outbound', 'Hi Liam, your 9:30 AM filling appointment is today at Downtown Dental. Reply HELP to reschedule.'),
    (v_pat4_id,  v_org_id, 'email', 'outbound', 'James, your Cigna Dental insurance has expired. Please bring updated coverage info to your appointment today.'),
    (v_pat7_id,  v_org_id, 'sms',   'outbound', 'Hi Noah, we could not verify your insurance on file. Please call (737) 555-0100 or bring your insurance card.'),
    (v_pat7_id,  v_org_id, 'sms',   'inbound',  'I switched jobs in December. New insurance is United Healthcare, member ID UCH-449021.'),
    (v_pat8_id,  v_org_id, 'email', 'outbound', 'Emma, your pre-auth for the upper left extraction has been submitted to MetLife. Response expected in 2 to 3 days.'),
    (v_pat8_id,  v_org_id, 'email', 'inbound',  'Can you let me know what my out-of-pocket will be? I want to have payment ready.'),
    (v_pat11_id, v_org_id, 'sms',   'outbound', 'Isabella, your Delta Dental plan expired on 12/31. Your open treatment plan needs to be re-verified.'),
    (v_pat6_id,  v_org_id, 'sms',   'outbound', 'Henry, your root canal is complete. Post-op instructions were emailed. Schedule your crown follow-up within 3 weeks.'),
    (v_pat6_id,  v_org_id, 'email', 'inbound',  'Got the instructions, thanks. Is the crown covered by insurance or all out of pocket?'),
    (v_pat13_id, v_org_id, 'sms',   'outbound', 'Mia, we are verifying your MetLife major restorative benefits before today''s crown consult.'),
    (v_pat14_id, v_org_id, 'sms',   'outbound', 'Alexander, please arrive 10 minutes early so we can update your contact information.'),
    (v_pat1_id,  v_org_id, 'phone', 'outbound', 'Left voicemail confirming today''s exam and encouraging online forms completion.');
END
$$;

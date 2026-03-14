DO $$
DECLARE
  v_org_id   UUID;
  v_loc1_id  UUID; -- Downtown Dental
  v_loc2_id  UUID; -- Northside Smiles
  v_loc3_id  UUID; -- Cedar Park Dental
  v_prov1_id UUID; -- Dr. Maya Patel
  v_prov2_id UUID; -- Dr. Ethan Brooks
  v_prov3_id UUID; -- Jennifer Walsh, RDH
  v_prov4_id UUID; -- Dr. Sofia Nguyen
  v_prov5_id UUID; -- Marcus Johnson, RDH
  v_prov6_id UUID; -- Dr. Aiden Park
  v_pat1_id  UUID; -- Ava Thompson
  v_pat2_id  UUID; -- Liam Carter
  v_pat3_id  UUID; -- Olivia Chen
  v_pat4_id  UUID; -- James Walker
  v_pat5_id  UUID; -- Charlotte Brown
  v_pat6_id  UUID; -- Henry Martinez
  v_pat7_id  UUID; -- Noah Ramirez
  v_pat8_id  UUID; -- Emma Johnson
  v_pat9_id  UUID; -- Sophia Davis
  v_pat10_id UUID; -- Benjamin Lee
  v_pat11_id UUID; -- Isabella Wilson
  v_pat12_id UUID; -- Ethan Anderson
  v_pat13_id UUID; -- Mia Thomas
  v_pat14_id UUID; -- Alexander Jackson
  v_pat15_id UUID; -- Grace White
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
  v_apt19_id UUID := gen_random_uuid();
  v_apt20_id UUID := gen_random_uuid();
  v_apt21_id UUID := gen_random_uuid();
  v_apt22_id UUID := gen_random_uuid();
  v_apt23_id UUID := gen_random_uuid();
  v_apt24_id UUID := gen_random_uuid();
BEGIN
  -- ── Resolve existing IDs by name ────────────────────────────────────────────
  SELECT id INTO v_org_id   FROM organizations LIMIT 1;
  SELECT id INTO v_loc1_id  FROM locations WHERE name = 'Downtown Dental';
  SELECT id INTO v_loc2_id  FROM locations WHERE name = 'Northside Smiles';
  SELECT id INTO v_loc3_id  FROM locations WHERE name = 'Cedar Park Dental';
  SELECT id INTO v_prov1_id FROM providers WHERE full_name = 'Dr. Maya Patel';
  SELECT id INTO v_prov2_id FROM providers WHERE full_name = 'Dr. Ethan Brooks';
  SELECT id INTO v_prov3_id FROM providers WHERE full_name = 'Jennifer Walsh, RDH';
  SELECT id INTO v_prov4_id FROM providers WHERE full_name = 'Dr. Sofia Nguyen';
  SELECT id INTO v_prov5_id FROM providers WHERE full_name = 'Marcus Johnson, RDH';
  SELECT id INTO v_prov6_id FROM providers WHERE full_name = 'Dr. Aiden Park';
  SELECT id INTO v_pat1_id  FROM patients WHERE full_name = 'Ava Thompson';
  SELECT id INTO v_pat2_id  FROM patients WHERE full_name = 'Liam Carter';
  SELECT id INTO v_pat3_id  FROM patients WHERE full_name = 'Olivia Chen';
  SELECT id INTO v_pat4_id  FROM patients WHERE full_name = 'James Walker';
  SELECT id INTO v_pat5_id  FROM patients WHERE full_name = 'Charlotte Brown';
  SELECT id INTO v_pat6_id  FROM patients WHERE full_name = 'Henry Martinez';
  SELECT id INTO v_pat7_id  FROM patients WHERE full_name = 'Noah Ramirez';
  SELECT id INTO v_pat8_id  FROM patients WHERE full_name = 'Emma Johnson';
  SELECT id INTO v_pat9_id  FROM patients WHERE full_name = 'Sophia Davis';
  SELECT id INTO v_pat10_id FROM patients WHERE full_name = 'Benjamin Lee';
  SELECT id INTO v_pat11_id FROM patients WHERE full_name = 'Isabella Wilson';
  SELECT id INTO v_pat12_id FROM patients WHERE full_name = 'Ethan Anderson';
  SELECT id INTO v_pat13_id FROM patients WHERE full_name = 'Mia Thomas';
  SELECT id INTO v_pat14_id FROM patients WHERE full_name = 'Alexander Jackson';
  SELECT id INTO v_pat15_id FROM patients WHERE full_name = 'Grace White';

  -- ── Clear transactional tables only (patients/providers/locations/org intact) ─
  DELETE FROM communications;
  DELETE FROM tasks;
  DELETE FROM appointments;

  -- ── Appointments (24 total) ──────────────────────────────────────────────────
  -- Narrative: mid-afternoon snapshot.
  --   Morning block  08:00-11:59 -> checked_out
  --   Midday         11:00-12:00 -> pending_checkout (one patient settling bill)
  --   Afternoon      13:00+      -> arrived / needs_eligibility / needs_forms / with_provider
  --
  -- Production values (realistic 2024 US dental fees):
  --   crown=165000  root_canal=182000  extraction=85000  filling=38500
  --   perio=38500   prophy=18500       exam=22500         consult=15000
  INSERT INTO appointments (
    id, patient_id, provider_id, location_id,
    scheduled_at, workflow_status, visit_type,
    duration_minutes, production_amount_cents, notes_status
  ) VALUES
  -- ── Location 1: Downtown Dental ──────────────────────────────────────────────
  --   goal=950000 | checked_out=491500 (52%) | total=725000
  (v_apt1_id,  v_pat1_id,  v_prov1_id, v_loc1_id, date_trunc('day',now())+interval'8 hours',         'checked_out',      'crown',      90, 165000, 'signed'),
  (v_apt2_id,  v_pat3_id,  v_prov3_id, v_loc1_id, date_trunc('day',now())+interval'8 hours',         'checked_out',      'prophy',     60,  18500, 'signed'),
  (v_apt3_id,  v_pat5_id,  v_prov2_id, v_loc1_id, date_trunc('day',now())+interval'8 hours 30 min',  'checked_out',      'prophy',     60,  18500, 'signed'),
  (v_apt4_id,  v_pat2_id,  v_prov1_id, v_loc1_id, date_trunc('day',now())+interval'9 hours 30 min',  'checked_out',      'root_canal', 90, 182000, 'signed'),
  (v_apt5_id,  v_pat6_id,  v_prov2_id, v_loc1_id, date_trunc('day',now())+interval'9 hours 30 min',  'checked_out',      'extraction', 45,  85000, 'signed'),
  (v_apt6_id,  v_pat4_id,  v_prov3_id, v_loc1_id, date_trunc('day',now())+interval'10 hours 30 min', 'checked_out',      'exam',       60,  22500, 'signed'),
  (v_apt7_id,  v_pat3_id,  v_prov1_id, v_loc1_id, date_trunc('day',now())+interval'11 hours',        'pending_checkout', 'filling',    60,  38500, 'signed'),
  (v_apt8_id,  v_pat4_id,  v_prov1_id, v_loc1_id, date_trunc('day',now())+interval'14 hours',        'needs_eligibility','crown',      90, 165000, 'not_required'),
  (v_apt9_id,  v_pat1_id,  v_prov2_id, v_loc1_id, date_trunc('day',now())+interval'15 hours 30 min', 'arrived',          'consult',    30,  15000, 'not_required'),
  (v_apt10_id, v_pat6_id,  v_prov1_id, v_loc1_id, date_trunc('day',now())+interval'16 hours',        'arrived',          'consult',    30,  15000, 'not_required'),
  -- ── Location 2: Northside Smiles ─────────────────────────────────────────────
  --   goal=720000 | checked_out=489000 (68%) | total=584500
  (v_apt11_id, v_pat9_id,  v_prov4_id, v_loc2_id, date_trunc('day',now())+interval'8 hours',         'checked_out',      'crown',      90, 165000, 'signed'),
  (v_apt12_id, v_pat10_id, v_prov5_id, v_loc2_id, date_trunc('day',now())+interval'8 hours',         'checked_out',      'prophy',     60,  18500, 'signed'),
  (v_apt13_id, v_pat8_id,  v_prov4_id, v_loc2_id, date_trunc('day',now())+interval'9 hours 30 min',  'checked_out',      'root_canal', 90, 182000, 'signed'),
  (v_apt14_id, v_pat11_id, v_prov5_id, v_loc2_id, date_trunc('day',now())+interval'9 hours 30 min',  'checked_out',      'perio',      60,  38500, 'signed'),
  (v_apt15_id, v_pat7_id,  v_prov4_id, v_loc2_id, date_trunc('day',now())+interval'10 hours 30 min', 'checked_out',      'extraction', 45,  85000, 'signed'),
  (v_apt16_id, v_pat9_id,  v_prov5_id, v_loc2_id, date_trunc('day',now())+interval'11 hours 30 min', 'with_provider',    'perio',      60,  38500, 'unsigned'),
  (v_apt17_id, v_pat10_id, v_prov4_id, v_loc2_id, date_trunc('day',now())+interval'13 hours 30 min', 'arrived',          'filling',    60,  38500, 'not_required'),
  (v_apt18_id, v_pat7_id,  v_prov5_id, v_loc2_id, date_trunc('day',now())+interval'15 hours',        'needs_forms',      'prophy',     60,  18500, 'not_required'),
  -- ── Location 3: Cedar Park Dental ────────────────────────────────────────────
  --   goal=580000 | checked_out=307000 (53%) | total=510500
  (v_apt19_id, v_pat12_id, v_prov6_id, v_loc3_id, date_trunc('day',now())+interval'8 hours',         'checked_out',      'prophy',     60,  18500, 'signed'),
  (v_apt20_id, v_pat14_id, v_prov6_id, v_loc3_id, date_trunc('day',now())+interval'8 hours 30 min',  'checked_out',      'extraction', 45,  85000, 'signed'),
  (v_apt21_id, v_pat15_id, v_prov6_id, v_loc3_id, date_trunc('day',now())+interval'9 hours 30 min',  'checked_out',      'crown',      90, 165000, 'signed'),
  (v_apt22_id, v_pat12_id, v_prov6_id, v_loc3_id, date_trunc('day',now())+interval'10 hours 30 min', 'checked_out',      'filling',    60,  38500, 'signed'),
  (v_apt23_id, v_pat13_id, v_prov6_id, v_loc3_id, date_trunc('day',now())+interval'13 hours 30 min', 'needs_eligibility','crown',      90, 165000, 'not_required'),
  (v_apt24_id, v_pat15_id, v_prov6_id, v_loc3_id, date_trunc('day',now())+interval'15 hours',        'arrived',          'perio',      60,  38500, 'not_required');

  -- ── Tasks (48 total — 2 per appointment) ────────────────────────────────────
  INSERT INTO tasks (appointment_id, title, completed) VALUES
  (v_apt1_id,  'Confirm crown shade selection with patient', true),
  (v_apt1_id,  'Post crown prep findings to chart', true),
  (v_apt2_id,  'Update periodontal chart measurements', true),
  (v_apt2_id,  'Schedule 6-month recall appointment', true),
  (v_apt3_id,  'Review oral hygiene instructions with patient', true),
  (v_apt3_id,  'Apply fluoride treatment and confirm no allergy', true),
  (v_apt4_id,  'Verify updated health history before procedure', true),
  (v_apt4_id,  'Post root canal findings and irrigation notes to chart', true),
  (v_apt5_id,  'Confirm consent for surgical extraction signed', true),
  (v_apt5_id,  'Review post-op care and prescriptions with patient', true),
  (v_apt6_id,  'Document exam findings and X-ray review', true),
  (v_apt6_id,  'Present treatment plan estimate to patient', true),
  (v_apt7_id,  'Collect $185 patient portion at checkout', false),
  (v_apt7_id,  'Send post-treatment care instructions via SMS', false),
  (v_apt8_id,  'Call Delta Dental to verify active crown coverage', false),
  (v_apt8_id,  'Collect subscriber member ID from patient', false),
  (v_apt9_id,  'Pull prior crown notes for provider review', false),
  (v_apt9_id,  'Print updated treatment estimate for discussion', false),
  (v_apt10_id, 'Review extraction post-op healing with provider', false),
  (v_apt10_id, 'Discuss implant options and print cost estimate', false),
  (v_apt11_id, 'Confirm crown fit and occlusion check', true),
  (v_apt11_id, 'Post crown delivery findings to chart', true),
  (v_apt12_id, 'Note pocket depth measurements in chart', true),
  (v_apt12_id, 'Issue recall reminder for 6 months out', true),
  (v_apt13_id, 'Confirm consent for endodontic treatment signed', true),
  (v_apt13_id, 'Submit insurance pre-auth for root canal', true),
  (v_apt14_id, 'Document scaling quadrant in chart', true),
  (v_apt14_id, 'Schedule next perio maintenance visit', true),
  (v_apt15_id, 'Verify MetLife covers surgical extraction', true),
  (v_apt15_id, 'Review post-op instructions with patient', true),
  (v_apt16_id, 'Confirm scaling quadrants with provider', false),
  (v_apt16_id, 'Prepare ultrasonic scaler and irrigation solution', false),
  (v_apt17_id, 'Check patient in and confirm payment method on file', false),
  (v_apt17_id, 'Prepare composite resin and curing equipment', false),
  (v_apt18_id, 'Send digital intake packet link via SMS', false),
  (v_apt18_id, 'Obtain photo ID copy at front desk', false),
  (v_apt19_id, 'Update blood pressure reading in medical history', true),
  (v_apt19_id, 'Document oral hygiene instructions given', true),
  (v_apt20_id, 'Confirm consent for extraction signed', true),
  (v_apt20_id, 'Review post-op care with patient before discharge', true),
  (v_apt21_id, 'Confirm crown shade and margin fit', true),
  (v_apt21_id, 'Post crown delivery and occlusion check to chart', true),
  (v_apt22_id, 'Document composite shade selected in chart', true),
  (v_apt22_id, 'Apply sealants on #3 and #14 as planned', true),
  (v_apt23_id, 'Verify MetLife plan covers major restorative', false),
  (v_apt23_id, 'Get pre-authorization number before proceeding', false),
  (v_apt24_id, 'Confirm scaling quadrants with Dr. Park', false),
  (v_apt24_id, 'Prepare perio tray and irrigation solution', false);

  -- ── Communications (12 total) ────────────────────────────────────────────────
  INSERT INTO communications (patient_id, organization_id, channel, direction, content) VALUES
  (v_pat2_id,  v_org_id, 'sms',   'outbound', 'Hi Liam, your 9:30 AM root canal is today at Downtown Dental. Reply HELP to reschedule.'),
  (v_pat4_id,  v_org_id, 'email', 'outbound', 'James, your Cigna Dental insurance needs verification before your 2:00 PM crown. Please bring your insurance card.'),
  (v_pat4_id,  v_org_id, 'email', 'inbound',  'I have my new insurance card. Is it okay to bring it when I arrive at 2pm?'),
  (v_pat7_id,  v_org_id, 'sms',   'outbound', 'Hi Noah, we still need your intake forms before your 3:00 PM appointment. Please complete them at the link we sent.'),
  (v_pat7_id,  v_org_id, 'sms',   'inbound',  'Sorry, forgot about those. Filling them out now on my phone.'),
  (v_pat8_id,  v_org_id, 'email', 'outbound', 'Emma, your pre-auth for the root canal has been submitted to MetLife. Expected response in 2-3 business days.'),
  (v_pat8_id,  v_org_id, 'email', 'inbound',  'Can you confirm my out-of-pocket cost before I come in? I want to have payment ready.'),
  (v_pat11_id, v_org_id, 'sms',   'outbound', 'Isabella, your Delta Dental plan expired on 12/31. Please bring updated coverage info to today''s perio appointment.'),
  (v_pat13_id, v_org_id, 'sms',   'outbound', 'Mia, we are verifying your MetLife major restorative benefits before today''s 1:30 PM crown consult at Cedar Park.'),
  (v_pat6_id,  v_org_id, 'sms',   'outbound', 'Henry, your extraction is complete. Post-op instructions were emailed. Schedule your implant consult within 2 weeks.'),
  (v_pat6_id,  v_org_id, 'email', 'inbound',  'Got the instructions, thanks. Quick question - is the implant covered under my plan or all out of pocket?'),
  (v_pat1_id,  v_org_id, 'phone', 'outbound', 'Left voicemail confirming Ava''s 3:30 PM consult and requesting callback to confirm attendance.');

END
$$;

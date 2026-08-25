-- ============================================
-- Migration: Alumni tracer survey tables
-- ============================================

CREATE TABLE alumni_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_id varchar(10) NOT NULL UNIQUE,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  fname varchar(64) NOT NULL,
  lname varchar(64) NOT NULL,
  mi varchar(5),
  sex varchar(10) NOT NULL,
  contact_number varchar(15) NOT NULL,
  religion varchar(64),
  civil_status varchar(64),
  date_of_birth date NOT NULL,
  facebook_account varchar(100),
  address_country varchar(80),
  address_region varchar(80),
  address_province varchar(80),
  address_city varchar(80),
  address_barangay varchar(80),
  address_zip varchar(10),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE graduate_information (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_profile_id uuid NOT NULL REFERENCES alumni_profiles(id) ON DELETE CASCADE UNIQUE,
  year_graduated int NOT NULL,
  satisfaction_level int CHECK (satisfaction_level >= 1 AND satisfaction_level <= 5),
  pursued_further_education boolean NOT NULL DEFAULT false,
  honor varchar(100),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE current_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_profile_id uuid NOT NULL REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  job_position varchar(100) NOT NULL,
  approximate_monthly_salary int,
  company_affiliation varchar(100),
  company_address_country varchar(80),
  company_address_region varchar(80),
  company_address_province varchar(80),
  company_address_city varchar(80),
  company_address_barangay varchar(80),
  company_address_zip varchar(10),
  employment_status varchar(64) NOT NULL,
  employed_within_6mo boolean NOT NULL DEFAULT false,
  promoted_in_current_job boolean NOT NULL DEFAULT false,
  getting_jobs_related_to_experience boolean NOT NULL DEFAULT false,
  employment_type varchar(64),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE employment_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_profile_id uuid NOT NULL REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  company_name varchar(100) NOT NULL,
  employment_status varchar(64) NOT NULL,
  approximate_monthly_salary int,
  date_employed date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Trigger: updated_at on alumni_profiles
CREATE TRIGGER set_updated_at BEFORE UPDATE ON alumni_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Function: generate alumni_id
CREATE OR REPLACE FUNCTION public.generate_alumni_id()
RETURNS varchar AS $$
DECLARE
  last_num int;
  new_id varchar;
BEGIN
  SELECT COALESCE(
    MAX(CAST(SPLIT_PART(alumni_id, '-', 2) AS int)),
    0
  ) INTO last_num FROM alumni_profiles;
  new_id := 'A0-' || LPAD((last_num + 1)::text, 4, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

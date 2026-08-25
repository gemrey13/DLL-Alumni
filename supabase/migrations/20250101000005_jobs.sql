-- ============================================
-- Migration: Job board tables
-- ============================================

CREATE TABLE job_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- User skills (depends on job_categories)
CREATE TABLE user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES job_categories(id) ON DELETE CASCADE,
  UNIQUE (profile_id, category_id)
);

CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  company_name varchar(150) NOT NULL,
  starting_salary int,
  description text NOT NULL,
  location varchar(150) NOT NULL,
  job_type varchar(100) NOT NULL,
  experience_level int NOT NULL CHECK (experience_level >= 1 AND experience_level <= 3),
  status job_status NOT NULL DEFAULT 'pending',
  admin_feedback text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE job_category_assignments (
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES job_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (job_id, category_id)
);

CREATE TABLE job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status application_status NOT NULL DEFAULT 'applied',
  applied_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (job_id, user_id)
);

CREATE TABLE saved_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (job_id, user_id)
);

-- Trigger: updated_at on jobs
CREATE TRIGGER set_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

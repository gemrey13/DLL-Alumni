-- ============================================
-- Migration: User profile extension tables
-- ============================================

-- User education
CREATE TABLE user_education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  school_name varchar(255),
  course varchar(255),
  school_year varchar(50),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- User work info
CREATE TABLE user_work_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  specialty varchar(255),
  description text,
  experience text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- User languages
CREATE TABLE user_languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  UNIQUE (profile_id, name)
);

-- User account links
CREATE TABLE user_account_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

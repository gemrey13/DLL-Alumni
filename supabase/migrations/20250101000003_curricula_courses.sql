-- ============================================
-- Migration: Curricula and courses
-- ============================================

CREATE TABLE curricula (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cmo_no varchar(20) NOT NULL UNIQUE,
  description varchar(100) NOT NULL,
  start_year int NOT NULL,
  end_year int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  curriculum_id uuid NOT NULL REFERENCES curricula(id) ON DELETE CASCADE,
  course_id varchar(20) NOT NULL UNIQUE,
  course_name varchar(100) NOT NULL,
  course_desc varchar(255),
  no_units int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

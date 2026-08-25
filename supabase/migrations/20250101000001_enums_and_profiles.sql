-- ============================================
-- Migration: Enums, profiles table, and auth trigger
-- ============================================

-- Custom enums
CREATE TYPE user_role AS ENUM ('admin', 'alumni');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE job_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE application_status AS ENUM ('applied', 'withdrawn');
CREATE TYPE announcement_status AS ENUM ('draft', 'published');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'alumni',
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  avatar_url text,
  status user_status NOT NULL DEFAULT 'active',
  bio text,
  location varchar(255),
  sex varchar(20),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Function: auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, first_name, last_name, status)
  VALUES (
    NEW.id,
    'alumni',
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: updated_at on profiles
CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

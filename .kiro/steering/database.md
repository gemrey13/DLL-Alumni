---
inclusion: always
---

# Database Schema — DLL Alumni Platform

## Overview

Supabase PostgreSQL database with Row Level Security (RLS) enabled on all tables. UUIDs for primary keys, timestamps for auditing, enums for constrained values.

## Custom Types (Enums)

```sql
CREATE TYPE user_role AS ENUM ('admin', 'alumni');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE job_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE application_status AS ENUM ('applied', 'withdrawn');
CREATE TYPE announcement_status AS ENUM ('draft', 'published');
CREATE TYPE satisfaction_level AS ENUM ('1', '2', '3', '4', '5');
```

## Tables

### profiles

Extends Supabase `auth.users`. Created automatically via trigger on user signup.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, FK → auth.users(id) ON DELETE CASCADE |
| role | user_role | NOT NULL, DEFAULT 'alumni' |
| first_name | varchar(100) | NOT NULL |
| last_name | varchar(100) | NOT NULL |
| avatar_url | text | NULL |
| status | user_status | NOT NULL, DEFAULT 'active' |
| bio | text | NULL |
| location | varchar(255) | NULL |
| sex | varchar(20) | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |
| updated_at | timestamptz | NOT NULL, DEFAULT now() |

### user_education

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| profile_id | uuid | FK → profiles(id) ON DELETE CASCADE, UNIQUE |
| school_name | varchar(255) | NULL |
| course | varchar(255) | NULL |
| school_year | varchar(50) | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### user_work_info

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| profile_id | uuid | FK → profiles(id) ON DELETE CASCADE, UNIQUE |
| specialty | varchar(255) | NULL |
| description | text | NULL |
| experience | text | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### user_languages

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| profile_id | uuid | FK → profiles(id) ON DELETE CASCADE |
| name | varchar(100) | NOT NULL |
| UNIQUE | | (profile_id, name) |

### user_account_links

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| profile_id | uuid | FK → profiles(id) ON DELETE CASCADE |
| url | text | NOT NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### user_skills

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| profile_id | uuid | FK → profiles(id) ON DELETE CASCADE |
| category_id | uuid | FK → job_categories(id) ON DELETE CASCADE |
| UNIQUE | | (profile_id, category_id) |

### curricula

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| cmo_no | varchar(20) | NOT NULL, UNIQUE |
| description | varchar(100) | NOT NULL |
| start_year | int | NOT NULL |
| end_year | int | NOT NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### courses

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| curriculum_id | uuid | FK → curricula(id) ON DELETE CASCADE |
| course_id | varchar(20) | NOT NULL, UNIQUE |
| course_name | varchar(100) | NOT NULL |
| course_desc | varchar(255) | NULL |
| no_units | int | NOT NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### alumni_profiles

Admin-managed alumni data from tracer surveys.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| alumni_id | varchar(10) | NOT NULL, UNIQUE |
| course_id | uuid | FK → courses(id) ON DELETE SET NULL |
| fname | varchar(64) | NOT NULL |
| lname | varchar(64) | NOT NULL |
| mi | varchar(5) | NULL |
| sex | varchar(10) | NOT NULL |
| contact_number | varchar(15) | NOT NULL |
| religion | varchar(64) | NULL |
| civil_status | varchar(64) | NULL |
| date_of_birth | date | NOT NULL |
| facebook_account | varchar(100) | NULL |
| address_country | varchar(80) | NULL |
| address_region | varchar(80) | NULL |
| address_province | varchar(80) | NULL |
| address_city | varchar(80) | NULL |
| address_barangay | varchar(80) | NULL |
| address_zip | varchar(10) | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |
| updated_at | timestamptz | NOT NULL, DEFAULT now() |

### graduate_information

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| alumni_profile_id | uuid | FK → alumni_profiles(id) ON DELETE CASCADE, UNIQUE |
| year_graduated | int | NOT NULL |
| satisfaction_level | int | NULL, CHECK (1-5) |
| pursued_further_education | boolean | NOT NULL, DEFAULT false |
| honor | varchar(100) | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### current_jobs

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| alumni_profile_id | uuid | FK → alumni_profiles(id) ON DELETE CASCADE |
| job_position | varchar(100) | NOT NULL |
| approximate_monthly_salary | int | NULL |
| company_affiliation | varchar(100) | NULL |
| company_address_country | varchar(80) | NULL |
| company_address_region | varchar(80) | NULL |
| company_address_province | varchar(80) | NULL |
| company_address_city | varchar(80) | NULL |
| company_address_barangay | varchar(80) | NULL |
| company_address_zip | varchar(10) | NULL |
| employment_status | varchar(64) | NOT NULL |
| employed_within_6mo | boolean | NOT NULL, DEFAULT false |
| promoted_in_current_job | boolean | NOT NULL, DEFAULT false |
| getting_jobs_related_to_experience | boolean | NOT NULL, DEFAULT false |
| employment_type | varchar(64) | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### employment_records

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| alumni_profile_id | uuid | FK → alumni_profiles(id) ON DELETE CASCADE |
| company_name | varchar(100) | NOT NULL |
| employment_status | varchar(64) | NOT NULL |
| approximate_monthly_salary | int | NULL |
| date_employed | date | NOT NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### job_categories

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| name | varchar(100) | NOT NULL, UNIQUE |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### jobs

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| posted_by | uuid | FK → profiles(id) ON DELETE CASCADE |
| title | varchar(255) | NOT NULL |
| company_name | varchar(150) | NOT NULL |
| starting_salary | int | NULL |
| description | text | NOT NULL |
| location | varchar(150) | NOT NULL |
| job_type | varchar(100) | NOT NULL |
| experience_level | int | NOT NULL, CHECK (1-3) |
| status | job_status | NOT NULL, DEFAULT 'pending' |
| admin_feedback | text | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |
| updated_at | timestamptz | NOT NULL, DEFAULT now() |

### job_category_assignments

| Column | Type | Constraints |
|--------|------|-------------|
| job_id | uuid | FK → jobs(id) ON DELETE CASCADE |
| category_id | uuid | FK → job_categories(id) ON DELETE CASCADE |
| PRIMARY KEY | | (job_id, category_id) |

### job_applications

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| job_id | uuid | FK → jobs(id) ON DELETE CASCADE |
| user_id | uuid | FK → profiles(id) ON DELETE CASCADE |
| status | application_status | NOT NULL, DEFAULT 'applied' |
| applied_at | timestamptz | NOT NULL, DEFAULT now() |
| UNIQUE | | (job_id, user_id) |

### saved_jobs

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| job_id | uuid | FK → jobs(id) ON DELETE CASCADE |
| user_id | uuid | FK → profiles(id) ON DELETE CASCADE |
| saved_at | timestamptz | NOT NULL, DEFAULT now() |
| UNIQUE | | (job_id, user_id) |

### events

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| title | varchar(255) | NOT NULL |
| location | varchar(255) | NOT NULL |
| description | text | NOT NULL |
| organizer | varchar(255) | NOT NULL |
| start_date | timestamptz | NOT NULL |
| end_date | timestamptz | NOT NULL |
| poster_image_url | text | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |
| updated_at | timestamptz | NOT NULL, DEFAULT now() |

### event_participants

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| event_id | uuid | FK → events(id) ON DELETE CASCADE |
| user_id | uuid | FK → profiles(id) ON DELETE CASCADE |
| registered_at | timestamptz | NOT NULL, DEFAULT now() |
| UNIQUE | | (event_id, user_id) |

### announcements

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| title | varchar(255) | NOT NULL |
| summary | varchar(500) | NOT NULL |
| content | text | NOT NULL |
| cover_image_url | text | NULL |
| status | announcement_status | NOT NULL, DEFAULT 'draft' |
| published_at | timestamptz | NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |
| updated_at | timestamptz | NOT NULL, DEFAULT now() |

### notifications

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| user_id | uuid | FK → profiles(id) ON DELETE CASCADE |
| type | varchar(50) | NOT NULL |
| title | varchar(255) | NOT NULL |
| body | text | NULL |
| metadata | jsonb | NULL, DEFAULT '{}' |
| read | boolean | NOT NULL, DEFAULT false |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### notification_preferences

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| user_id | uuid | FK → profiles(id) ON DELETE CASCADE, UNIQUE |
| event_notifications | boolean | NOT NULL, DEFAULT true |
| announcement_notifications | boolean | NOT NULL, DEFAULT true |
| job_notifications | boolean | NOT NULL, DEFAULT true |
| system_notifications | boolean | NOT NULL, DEFAULT true |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### audit_logs

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| actor_id | uuid | FK → profiles(id) ON DELETE SET NULL |
| action | varchar(100) | NOT NULL |
| entity_type | varchar(50) | NOT NULL |
| entity_id | uuid | NULL |
| metadata | jsonb | NULL, DEFAULT '{}' |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

### system_updates

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| title | varchar(255) | NOT NULL |
| description | text | NOT NULL |
| created_at | timestamptz | NOT NULL, DEFAULT now() |

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read, created_at DESC);
CREATE INDEX idx_notifications_user_created ON notifications(user_id, created_at DESC);
CREATE INDEX idx_jobs_status_created ON jobs(status, created_at DESC);
CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX idx_alumni_profiles_alumni_id ON alumni_profiles(alumni_id);
CREATE INDEX idx_alumni_profiles_course ON alumni_profiles(course_id);
CREATE INDEX idx_event_participants_event ON event_participants(event_id);
CREATE INDEX idx_event_participants_user ON event_participants(user_id);
CREATE INDEX idx_job_applications_user ON job_applications(user_id);
CREATE INDEX idx_job_applications_job ON job_applications(job_id);
CREATE INDEX idx_saved_jobs_user ON saved_jobs(user_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_graduate_info_year ON graduate_information(year_graduated);
CREATE INDEX idx_announcements_status ON announcements(status, published_at DESC);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_user_skills_category ON user_skills(category_id);
```

## Database Functions & Triggers

### Auto-create profile on signup

```sql
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
  -- Create default notification preferences
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Auto-update updated_at timestamp

```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON alumni_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
```

### Generate alumni_id

```sql
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
```

## Row Level Security (RLS) Policies

### profiles

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

-- Users can read other profiles (for directory — limited by app logic)
CREATE POLICY "Authenticated users can read profiles"
  ON profiles FOR SELECT USING (auth.role() = 'authenticated');

-- Users can update own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Admins can update any profile (role changes, status)
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### alumni_profiles, graduate_information, current_jobs, employment_records

```sql
-- Admin-only write access (tracer survey is admin-only)
CREATE POLICY "Admins can manage alumni data"
  ON alumni_profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Authenticated users can read (for analytics queries and potential future features)
CREATE POLICY "Authenticated can read alumni profiles"
  ON alumni_profiles FOR SELECT USING (auth.role() = 'authenticated');
```

Same pattern for `graduate_information`, `current_jobs`, `employment_records`.

### jobs

```sql
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read approved jobs
CREATE POLICY "Read approved jobs"
  ON jobs FOR SELECT USING (
    status = 'approved' OR
    posted_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Authenticated users can create jobs (status defaults to pending)
CREATE POLICY "Users can create jobs"
  ON jobs FOR INSERT WITH CHECK (auth.uid() = posted_by);

-- Users can update own pending jobs
CREATE POLICY "Users can update own pending jobs"
  ON jobs FOR UPDATE USING (
    posted_by = auth.uid() AND status = 'pending'
  );

-- Admins can update any job (approve/reject)
CREATE POLICY "Admins can update any job"
  ON jobs FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete jobs
CREATE POLICY "Admins can delete jobs"
  ON jobs FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### notifications

```sql
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only read own notifications
CREATE POLICY "Users read own notifications"
  ON notifications FOR SELECT USING (user_id = auth.uid());

-- Users can update own notifications (mark as read)
CREATE POLICY "Users update own notifications"
  ON notifications FOR UPDATE USING (user_id = auth.uid());

-- Insert via service role or database functions only
CREATE POLICY "Service role inserts notifications"
  ON notifications FOR INSERT WITH CHECK (true);
  -- Controlled at application level via service role client
```

### events

```sql
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read events
CREATE POLICY "Authenticated read events"
  ON events FOR SELECT USING (auth.role() = 'authenticated');

-- Public can also read events (for public listing)
CREATE POLICY "Public read events"
  ON events FOR SELECT USING (true);

-- Admins can manage events
CREATE POLICY "Admins manage events"
  ON events FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### event_participants

```sql
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read participants
CREATE POLICY "Read event participants"
  ON event_participants FOR SELECT USING (auth.role() = 'authenticated');

-- Users can insert own participation
CREATE POLICY "Users join events"
  ON event_participants FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can remove own participation
CREATE POLICY "Users leave events"
  ON event_participants FOR DELETE USING (user_id = auth.uid());
```

### announcements

```sql
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Published announcements readable by everyone (including anon for public page)
CREATE POLICY "Public read published announcements"
  ON announcements FOR SELECT USING (status = 'published');

-- Admins can read all (including drafts)
CREATE POLICY "Admins read all announcements"
  ON announcements FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can manage announcements
CREATE POLICY "Admins manage announcements"
  ON announcements FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### audit_logs

```sql
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Admins read audit logs"
  ON audit_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Insert via service role only (application controlled)
CREATE POLICY "Service insert audit logs"
  ON audit_logs FOR INSERT WITH CHECK (true);
```

### curricula, courses, job_categories

```sql
-- Readable by all authenticated users
-- Writable by admins only
CREATE POLICY "Authenticated read"
  ON curricula FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage"
  ON curricula FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

Same pattern for `courses` and `job_categories`.

## Migration Strategy

- Sequential numbered SQL files in `supabase/migrations/`
- Format: `YYYYMMDDHHMMSS_description.sql`
- Each migration is idempotent where possible
- Run via Supabase CLI: `supabase db push` or `supabase migration up`

## Realtime Configuration

Enable Realtime on the `notifications` table for live notification delivery:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

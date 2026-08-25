-- ============================================
-- Migration: Row Level Security policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_work_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_account_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE curricula ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE graduate_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE current_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE employment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_category_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_updates ENABLE ROW LEVEL SECURITY;

-- ─── PROFILES ────────────────────────────────────────────────────────────────

CREATE POLICY "Authenticated users can read profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── USER EXTENSION TABLES ───────────────────────────────────────────────────

-- user_education
CREATE POLICY "Users can read own education"
  ON user_education FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Authenticated can read all education"
  ON user_education FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can manage own education"
  ON user_education FOR ALL TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- user_work_info
CREATE POLICY "Authenticated can read all work info"
  ON user_work_info FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can manage own work info"
  ON user_work_info FOR ALL TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- user_languages
CREATE POLICY "Authenticated can read all languages"
  ON user_languages FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can manage own languages"
  ON user_languages FOR ALL TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- user_account_links
CREATE POLICY "Authenticated can read all account links"
  ON user_account_links FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can manage own account links"
  ON user_account_links FOR ALL TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- user_skills
CREATE POLICY "Authenticated can read all skills"
  ON user_skills FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can manage own skills"
  ON user_skills FOR ALL TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- ─── CURRICULA & COURSES ─────────────────────────────────────────────────────

CREATE POLICY "Authenticated can read curricula"
  ON curricula FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage curricula"
  ON curricula FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read courses"
  ON courses FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── ALUMNI DATA (tracer survey — admin only write) ──────────────────────────

CREATE POLICY "Authenticated can read alumni profiles"
  ON alumni_profiles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage alumni profiles"
  ON alumni_profiles FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read graduate information"
  ON graduate_information FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage graduate information"
  ON graduate_information FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read current jobs"
  ON current_jobs FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage current jobs"
  ON current_jobs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read employment records"
  ON employment_records FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage employment records"
  ON employment_records FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── JOB CATEGORIES ──────────────────────────────────────────────────────────

CREATE POLICY "Authenticated can read job categories"
  ON job_categories FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage job categories"
  ON job_categories FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── JOBS ────────────────────────────────────────────────────────────────────

CREATE POLICY "Read approved jobs or own jobs or admin reads all"
  ON jobs FOR SELECT TO authenticated
  USING (
    status = 'approved' OR
    posted_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can create jobs"
  ON jobs FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Users can update own pending jobs"
  ON jobs FOR UPDATE TO authenticated
  USING (posted_by = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can update any job"
  ON jobs FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete jobs"
  ON jobs FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- job_category_assignments
CREATE POLICY "Authenticated can read job category assignments"
  ON job_category_assignments FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Job poster or admin can manage assignments"
  ON job_category_assignments FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.posted_by = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.posted_by = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── JOB APPLICATIONS ────────────────────────────────────────────────────────

CREATE POLICY "Users can read own applications"
  ON job_applications FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins and job posters can read applications"
  ON job_applications FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') OR
    EXISTS (SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.posted_by = auth.uid())
  );

CREATE POLICY "Users can create own applications"
  ON job_applications FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own applications"
  ON job_applications FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own applications"
  ON job_applications FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ─── SAVED JOBS ──────────────────────────────────────────────────────────────

CREATE POLICY "Users can read own saved jobs"
  ON saved_jobs FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can save jobs"
  ON saved_jobs FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unsave jobs"
  ON saved_jobs FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ─── EVENTS ──────────────────────────────────────────────────────────────────

CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage events"
  ON events FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- event_participants
CREATE POLICY "Authenticated can read event participants"
  ON event_participants FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can join events"
  ON event_participants FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave events"
  ON event_participants FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────────

CREATE POLICY "Anyone can read published announcements"
  ON announcements FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can read all announcements"
  ON announcements FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage announcements"
  ON announcements FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── NOTIFICATIONS ───────────────────────────────────────────────────────────

CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Insert controlled by service role (application-level)
CREATE POLICY "Service role inserts notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- notification_preferences
CREATE POLICY "Users can read own preferences"
  ON notification_preferences FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own preferences"
  ON notification_preferences FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Service role inserts preferences"
  ON notification_preferences FOR INSERT
  WITH CHECK (true);

-- ─── AUDIT LOGS ──────────────────────────────────────────────────────────────

CREATE POLICY "Admins can read audit logs"
  ON audit_logs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Service role inserts audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);

-- ─── SYSTEM UPDATES ──────────────────────────────────────────────────────────

CREATE POLICY "Authenticated can read system updates"
  ON system_updates FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage system updates"
  ON system_updates FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

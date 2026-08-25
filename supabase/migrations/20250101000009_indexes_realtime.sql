-- ============================================
-- Migration: Performance indexes and Realtime configuration
-- ============================================

-- Notifications
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read, created_at DESC);
CREATE INDEX idx_notifications_user_created ON notifications(user_id, created_at DESC);

-- Jobs
CREATE INDEX idx_jobs_status_created ON jobs(status, created_at DESC);
CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);

-- Alumni profiles
CREATE INDEX idx_alumni_profiles_alumni_id ON alumni_profiles(alumni_id);
CREATE INDEX idx_alumni_profiles_course ON alumni_profiles(course_id);

-- Event participants
CREATE INDEX idx_event_participants_event ON event_participants(event_id);
CREATE INDEX idx_event_participants_user ON event_participants(user_id);

-- Job applications
CREATE INDEX idx_job_applications_user ON job_applications(user_id);
CREATE INDEX idx_job_applications_job ON job_applications(job_id);

-- Saved jobs
CREATE INDEX idx_saved_jobs_user ON saved_jobs(user_id);

-- Audit logs
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Graduate information
CREATE INDEX idx_graduate_info_year ON graduate_information(year_graduated);

-- Announcements
CREATE INDEX idx_announcements_status ON announcements(status, published_at DESC);

-- Profiles
CREATE INDEX idx_profiles_role ON profiles(role);

-- User skills
CREATE INDEX idx_user_skills_category ON user_skills(category_id);

-- Enable Realtime on notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

---
inclusion: always
---

# Product Overview — DLL Alumni Platform

## Purpose

The DLL Alumni Platform is a web-based alumni management system for **Dalubhasaan ng Lungsod ng Lucena (DLL)**. It serves as the institution's central hub for tracking alumni outcomes, connecting graduates, facilitating employment, and managing alumni engagement through events and announcements.

## Users & Roles

### Admin
- Institution staff members responsible for managing alumni data and platform content
- Full access to all platform features and data
- Can manage user accounts (activate/deactivate, change roles)

### Alumni
- Registered graduates of DLL
- Can browse jobs, apply, save, and post job listings (pending admin approval)
- Can participate in events and manage their own profile
- Can browse the alumni community directory
- Receive real-time notifications

### Public (Unauthenticated)
- Can view the landing page, published news/announcements, and public event listings
- Cannot interact with any features requiring authentication

## Core Workflows

### Admin Workflows

1. **Alumni Tracer Survey (Admin-Only)**
   - Admin fills a multi-step form with alumni personal info, academic data, employment info, and employment history
   - System auto-generates alumni_id in format `A0-XXXX`
   - All related records created atomically (alumni_profile, graduate_information, current_job, employment_records)

2. **Curriculum & Course Management**
   - CRUD for curricula (CMO number, description, year range)
   - CRUD for courses under each curriculum (course_id, name, description, units)
   - Courses are linked to curricula and used in alumni academic records

3. **Job Moderation**
   - Alumni submit job postings → status is 'pending'
   - Admin reviews: approve or reject
   - Admin can also create jobs directly (auto-approved)
   - View applicant lists per job

4. **Event Management**
   - Create events with title, location, description, organizer, dates, poster image
   - Edit/delete events
   - View participant lists
   - Publishing triggers notification to all alumni

5. **Announcement Management**
   - Create announcements with title, summary, content, cover image
   - Draft/published status
   - Publishing triggers notification to all alumni

6. **Analytics Dashboard**
   - Summary metrics with year-over-year comparisons
   - Charts: graduation distribution, gender analysis, salary distribution, employment timing, course performance, employment types
   - Enhanced: employment timeline, geographic distribution, industry/sector analysis

7. **User Management**
   - View all users, activate/deactivate accounts, change roles
   - View audit logs of all admin actions

### Alumni Workflows

1. **Registration & Login**
   - Register with name, email, password
   - Login redirects to alumni dashboard
   - Password reset via email

2. **Job Board**
   - Browse approved jobs with filters (title, category, type, experience level)
   - View job details, apply/withdraw, save/unsave
   - Post new job listings (submitted for admin approval)
   - View own applications and saved jobs
   - Receive skill-based job recommendations on dashboard

3. **Event Participation**
   - Browse upcoming events
   - Join/leave events
   - View participant lists

4. **Profile Management**
   - Edit bio, location, education, work info, skills, languages, account links
   - Upload avatar
   - Change password and account info
   - Set notification preferences

5. **Community Directory**
   - Browse other alumni profiles (limited fields: name, course, year, location, skills)
   - Search and filter by course, year, skills

6. **Notifications**
   - Receive real-time notifications for events, announcements, job status changes, skill-matched jobs, system updates
   - View notification history, mark as read

## Key Business Rules

- **Alumni IDs** are auto-generated in format `A0-XXXX` (sequential)
- **Jobs require admin approval** before becoming visible in the public job board
- **Tracer survey is admin-only** — alumni cannot self-submit tracer data
- **Notifications are persistent** — stored in database AND delivered in real-time via Supabase Realtime
- **Reconnection sync** — when a user reconnects, missed notifications are fetched from the database
- **Community directory** — alumni can see limited fields of other alumni; admins see all fields
- **Events and announcements** — publicly viewable listings, but interaction (join event) requires authentication
- **Audit logging** — all admin actions are logged with actor, action, entity, and metadata
- **File uploads** — images only (jpeg, png, webp), max 5MB, stored in Supabase Storage

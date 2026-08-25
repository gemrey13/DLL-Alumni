/**
 * =============================================================
 * DLL Alumni Platform — Database Seed Script
 * =============================================================
 *
 * Usage:
 *   npm run seed
 *
 * Prerequisites:
 *   - Supabase project running (local or cloud)
 *   - .env.local configured with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   - Database migrations already applied
 *
 * What this script creates:
 *   - 1 admin user:  admin@dll-alumni.test / password123
 *   - 5 alumni users (3 active, 2 inactive): all use password123
 *       - maria@dll-alumni.test (active)
 *       - juan@dll-alumni.test (active)
 *       - ana@dll-alumni.test (active)
 *       - pedro@dll-alumni.test (inactive)
 *       - lisa@dll-alumni.test (inactive)
 *   - 2 curricula, 5 courses
 *   - 10 job categories
 *   - Profile data (education, work, skills, languages) for active alumni
 *   - 7 jobs (4 approved, 2 pending, 1 rejected) with applications & saves
 *   - 3 events with participants
 *   - 3 announcements (2 published, 1 draft)
 *   - 4 alumni tracer profiles with graduate info & employment records
 *
 * This script is idempotent — running it again cleans existing seed
 * data and re-creates everything.
 * =============================================================
 */

import { config } from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Load .env.local
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ─── Constants ────────────────────────────────────────────────────────────────

const TEST_EMAILS = [
  "admin@dll-alumni.test",
  "maria@dll-alumni.test",
  "juan@dll-alumni.test",
  "ana@dll-alumni.test",
  "pedro@dll-alumni.test",
  "lisa@dll-alumni.test",
];

const PASSWORD = "password123";

// ─── Cleanup ──────────────────────────────────────────────────────────────────

async function cleanup() {
  console.log("🧹 Cleaning existing seed data...");

  // Delete auth users (cascade will remove profiles, notifications, etc.)
  const { data: existingUsers } = await supabase.auth.admin.listUsers({
    perPage: 100,
  });

  if (existingUsers?.users) {
    for (const user of existingUsers.users) {
      if (user.email && TEST_EMAILS.includes(user.email)) {
        await supabase.auth.admin.deleteUser(user.id);
      }
    }
  }

  // Delete reference data that doesn't cascade from users
  await supabase.from("employment_records").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("current_jobs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("graduate_information").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("alumni_profiles").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("events").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("announcements").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("job_category_assignments").delete().neq("job_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("jobs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("job_categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("courses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("curricula").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("  ✓ Cleaned existing seed data");
}

// ─── Seed Users ───────────────────────────────────────────────────────────────

interface CreatedUsers {
  adminId: string;
  mariaId: string;
  juanId: string;
  anaId: string;
  pedroId: string;
  lisaId: string;
}

async function seedUsers(): Promise<CreatedUsers> {
  console.log("👤 Creating users...");

  const users: {
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "alumni";
    status: "active" | "inactive";
    bio?: string;
    location?: string;
    sex?: string;
  }[] = [
    {
      email: "admin@dll-alumni.test",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      status: "active",
      bio: "Platform administrator for DLL Alumni Management System.",
      location: "Lucena City, Quezon",
      sex: "Male",
    },
    {
      email: "maria@dll-alumni.test",
      firstName: "Maria",
      lastName: "Santos",
      role: "alumni",
      status: "active",
      bio: "Full-stack web developer passionate about building solutions for local communities. DLL BSIT graduate.",
      location: "Lucena City, Quezon",
      sex: "Female",
    },
    {
      email: "juan@dll-alumni.test",
      firstName: "Juan",
      lastName: "Dela Cruz",
      role: "alumni",
      status: "active",
      bio: "Data analyst with experience in business intelligence and machine learning. Proud DLL alumnus.",
      location: "Makati City, Metro Manila",
      sex: "Male",
    },
    {
      email: "ana@dll-alumni.test",
      firstName: "Ana",
      lastName: "Reyes",
      role: "alumni",
      status: "active",
      bio: "Certified public accountant specializing in auditing and tax advisory services.",
      location: "Tayabas City, Quezon",
      sex: "Female",
    },
    {
      email: "pedro@dll-alumni.test",
      firstName: "Pedro",
      lastName: "Garcia",
      role: "alumni",
      status: "inactive",
    },
    {
      email: "lisa@dll-alumni.test",
      firstName: "Lisa",
      lastName: "Mendoza",
      role: "alumni",
      status: "inactive",
    },
  ];

  const createdIds: Record<string, string> = {};

  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: {
        first_name: user.firstName,
        last_name: user.lastName,
      },
    });

    if (error) {
      console.error(`  ❌ Failed to create ${user.email}:`, error.message);
      throw error;
    }

    const userId = data.user.id;
    createdIds[user.email] = userId;

    // Update profile (trigger creates it with defaults, we override)
    const profileUpdate: Record<string, unknown> = {
      role: user.role,
      status: user.status,
    };
    if (user.bio) profileUpdate.bio = user.bio;
    if (user.location) profileUpdate.location = user.location;
    if (user.sex) profileUpdate.sex = user.sex;

    const { error: profileError } = await supabase
      .from("profiles")
      .update(profileUpdate)
      .eq("id", userId);

    if (profileError) {
      console.error(`  ❌ Failed to update profile for ${user.email}:`, profileError.message);
      throw profileError;
    }
  }

  console.log("  ✓ Created 6 users (1 admin, 3 active alumni, 2 inactive alumni)");

  return {
    adminId: createdIds["admin@dll-alumni.test"],
    mariaId: createdIds["maria@dll-alumni.test"],
    juanId: createdIds["juan@dll-alumni.test"],
    anaId: createdIds["ana@dll-alumni.test"],
    pedroId: createdIds["pedro@dll-alumni.test"],
    lisaId: createdIds["lisa@dll-alumni.test"],
  };
}

// ─── Seed Reference Data ──────────────────────────────────────────────────────

interface ReferenceData {
  curriculumIds: { cmo14: string; cmo20: string };
  courseIds: { bsit: string; bscs: string; bsa: string; bsba: string; beed: string };
  categoryIds: Record<string, string>;
}

async function seedReferenceData(): Promise<ReferenceData> {
  console.log("📚 Seeding reference data...");

  // Curricula
  const { data: curricula, error: currErr } = await supabase
    .from("curricula")
    .insert([
      {
        cmo_no: "CMO-14-s2018",
        description: "CHED Memorandum Order 14, Series of 2018",
        start_year: 2018,
        end_year: 2022,
      },
      {
        cmo_no: "CMO-20-s2023",
        description: "CHED Memorandum Order 20, Series of 2023",
        start_year: 2023,
        end_year: 2027,
      },
    ])
    .select();

  if (currErr) throw currErr;

  const cmo14Id = curricula![0].id;
  const cmo20Id = curricula![1].id;

  // Courses
  const { data: courses, error: courseErr } = await supabase
    .from("courses")
    .insert([
      {
        curriculum_id: cmo14Id,
        course_id: "BSIT",
        course_name: "BS Information Technology",
        course_desc: "Bachelor of Science in Information Technology program",
        no_units: 180,
      },
      {
        curriculum_id: cmo14Id,
        course_id: "BSCS",
        course_name: "BS Computer Science",
        course_desc: "Bachelor of Science in Computer Science program",
        no_units: 186,
      },
      {
        curriculum_id: cmo20Id,
        course_id: "BSA",
        course_name: "BS Accountancy",
        course_desc: "Bachelor of Science in Accountancy program",
        no_units: 192,
      },
      {
        curriculum_id: cmo20Id,
        course_id: "BSBA",
        course_name: "BS Business Administration",
        course_desc: "Bachelor of Science in Business Administration program",
        no_units: 174,
      },
      {
        curriculum_id: cmo20Id,
        course_id: "BEED",
        course_name: "Bachelor of Elementary Education",
        course_desc: "Bachelor of Elementary Education program",
        no_units: 168,
      },
    ])
    .select();

  if (courseErr) throw courseErr;

  const courseMap: Record<string, string> = {};
  for (const c of courses!) {
    courseMap[c.course_id] = c.id;
  }

  // Job Categories
  const categoryNames = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Accounting & Finance",
    "Teaching & Education",
    "Marketing",
    "Graphic Design",
    "Software Engineering",
    "Healthcare",
    "Business Management",
  ];

  const { data: categories, error: catErr } = await supabase
    .from("job_categories")
    .insert(categoryNames.map((name) => ({ name })))
    .select();

  if (catErr) throw catErr;

  const categoryMap: Record<string, string> = {};
  for (const cat of categories!) {
    categoryMap[cat.name] = cat.id;
  }

  console.log("  ✓ Seeded 2 curricula, 5 courses, 10 job categories");

  return {
    curriculumIds: { cmo14: cmo14Id, cmo20: cmo20Id },
    courseIds: {
      bsit: courseMap["BSIT"],
      bscs: courseMap["BSCS"],
      bsa: courseMap["BSA"],
      bsba: courseMap["BSBA"],
      beed: courseMap["BEED"],
    },
    categoryIds: categoryMap,
  };
}

// ─── Seed Profile Extensions ──────────────────────────────────────────────────

async function seedProfileExtensions(
  users: CreatedUsers,
  refs: ReferenceData
) {
  console.log("📝 Seeding profile extensions...");

  // User Education
  await supabase.from("user_education").insert([
    {
      profile_id: users.mariaId,
      school_name: "Dalubhasaan ng Lungsod ng Lucena",
      course: "BS Information Technology",
      school_year: "2018-2022",
    },
    {
      profile_id: users.juanId,
      school_name: "Dalubhasaan ng Lungsod ng Lucena",
      course: "BS Computer Science",
      school_year: "2017-2021",
    },
    {
      profile_id: users.anaId,
      school_name: "Dalubhasaan ng Lungsod ng Lucena",
      course: "BS Accountancy",
      school_year: "2019-2023",
    },
  ]);

  // User Work Info
  await supabase.from("user_work_info").insert([
    {
      profile_id: users.mariaId,
      specialty: "Full-Stack Web Development",
      description:
        "Building modern web applications using React, Next.js, and Node.js. Experienced with both relational and NoSQL databases.",
      experience: "3 years",
    },
    {
      profile_id: users.juanId,
      specialty: "Data Analytics & Business Intelligence",
      description:
        "Transforming raw data into actionable business insights using Python, SQL, and visualization tools like Tableau and Power BI.",
      experience: "4 years",
    },
    {
      profile_id: users.anaId,
      specialty: "Auditing & Tax Advisory",
      description:
        "Providing audit and tax advisory services for small to medium enterprises. CPA-licensed.",
      experience: "2 years",
    },
  ]);

  // User Skills (linked to job categories)
  await supabase.from("user_skills").insert([
    { profile_id: users.mariaId, category_id: refs.categoryIds["Web Development"] },
    { profile_id: users.mariaId, category_id: refs.categoryIds["Software Engineering"] },
    { profile_id: users.mariaId, category_id: refs.categoryIds["Mobile Development"] },
    { profile_id: users.juanId, category_id: refs.categoryIds["Data Science"] },
    { profile_id: users.juanId, category_id: refs.categoryIds["Software Engineering"] },
    { profile_id: users.juanId, category_id: refs.categoryIds["Web Development"] },
    { profile_id: users.anaId, category_id: refs.categoryIds["Accounting & Finance"] },
    { profile_id: users.anaId, category_id: refs.categoryIds["Business Management"] },
  ]);

  // User Languages
  await supabase.from("user_languages").insert([
    { profile_id: users.mariaId, name: "Filipino" },
    { profile_id: users.mariaId, name: "English" },
    { profile_id: users.juanId, name: "Filipino" },
    { profile_id: users.juanId, name: "English" },
    { profile_id: users.juanId, name: "Japanese" },
    { profile_id: users.anaId, name: "Filipino" },
    { profile_id: users.anaId, name: "English" },
  ]);

  // User Account Links
  await supabase.from("user_account_links").insert([
    { profile_id: users.mariaId, url: "https://linkedin.com/in/maria-santos-dev" },
    { profile_id: users.mariaId, url: "https://github.com/mariasantos" },
    { profile_id: users.juanId, url: "https://linkedin.com/in/juan-delacruz-data" },
  ]);

  console.log("  ✓ Seeded profile data (education, work, skills, languages)");
}

// ─── Seed Jobs ────────────────────────────────────────────────────────────────

interface SeededJobs {
  jobIds: string[];
}

async function seedJobs(
  users: CreatedUsers,
  refs: ReferenceData
): Promise<SeededJobs> {
  console.log("💼 Seeding jobs...");

  const jobsData = [
    {
      posted_by: users.mariaId,
      title: "Junior Web Developer",
      company_name: "TechCorp Philippines",
      starting_salary: 30000,
      description:
        "We are looking for a junior web developer to join our growing team. You will work on building and maintaining web applications using modern JavaScript frameworks. Experience with React or Vue.js is a plus.",
      location: "Makati City, Metro Manila",
      job_type: "Full-time",
      experience_level: 1,
      status: "approved" as const,
    },
    {
      posted_by: users.juanId,
      title: "Data Analyst",
      company_name: "DataPH Solutions",
      starting_salary: 35000,
      description:
        "Join our analytics team to help businesses make data-driven decisions. You will work with large datasets, create dashboards, and provide insights using SQL, Python, and visualization tools.",
      location: "BGC, Taguig City",
      job_type: "Full-time",
      experience_level: 2,
      status: "approved" as const,
    },
    {
      posted_by: users.anaId,
      title: "Staff Accountant",
      company_name: "FinanceInc Manila",
      starting_salary: 28000,
      description:
        "Seeking a detail-oriented staff accountant to handle bookkeeping, financial reporting, and tax preparation for our clients. CPA preferred but not required for entry-level applicants.",
      location: "Lucena City, Quezon",
      job_type: "Full-time",
      experience_level: 1,
      status: "approved" as const,
    },
    {
      posted_by: users.mariaId,
      title: "Digital Marketing Specialist",
      company_name: "MediaPH Agency",
      starting_salary: 25000,
      description:
        "Lead digital marketing campaigns across social media platforms. Experience with Facebook Ads, Google Analytics, and content creation required. Creative thinkers welcome!",
      location: "Quezon City, Metro Manila",
      job_type: "Full-time",
      experience_level: 2,
      status: "approved" as const,
    },
    {
      posted_by: users.juanId,
      title: "Mobile App Developer",
      company_name: "StartupPH Inc",
      starting_salary: 40000,
      description:
        "Build cross-platform mobile applications using React Native or Flutter. You will be responsible for the entire mobile development lifecycle from concept to deployment on app stores.",
      location: "Remote (Philippines)",
      job_type: "Remote",
      experience_level: 2,
      status: "pending" as const,
    },
    {
      posted_by: users.anaId,
      title: "Elementary School Teacher",
      company_name: "Bright Academy Philippines",
      starting_salary: 22000,
      description:
        "We need passionate educators to teach elementary students. Must have a degree in Education (BEED or equivalent). Experience in K-12 curriculum implementation is an advantage.",
      location: "Lucena City, Quezon",
      job_type: "Full-time",
      experience_level: 1,
      status: "pending" as const,
    },
    {
      posted_by: users.mariaId,
      title: "Graphic Design Intern",
      company_name: "CreativeWorks Studio",
      starting_salary: 15000,
      description:
        "Internship opportunity for aspiring graphic designers. Learn from industry professionals while working on real client projects.",
      location: "Lucena City, Quezon",
      job_type: "Part-time",
      experience_level: 1,
      status: "rejected" as const,
      admin_feedback:
        "Please provide more details about job requirements, expected work hours, and whether this leads to a full-time position.",
    },
  ];

  const { data: jobs, error: jobErr } = await supabase
    .from("jobs")
    .insert(jobsData)
    .select();

  if (jobErr) throw jobErr;

  const jobIds = jobs!.map((j) => j.id);

  // Job category assignments
  const categoryAssignments = [
    { job_id: jobIds[0], category_id: refs.categoryIds["Web Development"] },
    { job_id: jobIds[0], category_id: refs.categoryIds["Software Engineering"] },
    { job_id: jobIds[1], category_id: refs.categoryIds["Data Science"] },
    { job_id: jobIds[1], category_id: refs.categoryIds["Software Engineering"] },
    { job_id: jobIds[2], category_id: refs.categoryIds["Accounting & Finance"] },
    { job_id: jobIds[3], category_id: refs.categoryIds["Marketing"] },
    { job_id: jobIds[4], category_id: refs.categoryIds["Mobile Development"] },
    { job_id: jobIds[4], category_id: refs.categoryIds["Software Engineering"] },
    { job_id: jobIds[5], category_id: refs.categoryIds["Teaching & Education"] },
    { job_id: jobIds[6], category_id: refs.categoryIds["Graphic Design"] },
  ];

  await supabase.from("job_category_assignments").insert(categoryAssignments);

  // Job Applications (Juan applied to Web Dev job, Ana applied to Accountant job)
  await supabase.from("job_applications").insert([
    { job_id: jobIds[0], user_id: users.juanId, status: "applied" },
    { job_id: jobIds[2], user_id: users.anaId, status: "applied" },
  ]);

  // Saved Jobs (Maria saved Data Analyst, Ana saved Marketing job)
  await supabase.from("saved_jobs").insert([
    { job_id: jobIds[1], user_id: users.mariaId },
    { job_id: jobIds[3], user_id: users.anaId },
  ]);

  console.log("  ✓ Seeded 7 jobs (4 approved, 2 pending, 1 rejected)");

  return { jobIds };
}

// ─── Seed Events & Announcements ──────────────────────────────────────────────

async function seedEventsAndAnnouncements(users: CreatedUsers) {
  console.log("🎉 Seeding events and announcements...");

  const now = new Date();

  // Events
  const pastStart = new Date(now);
  pastStart.setMonth(pastStart.getMonth() - 2);
  const pastEnd = new Date(pastStart);
  pastEnd.setDate(pastEnd.getDate() + 1);

  const ongoingStart = new Date(now);
  ongoingStart.setDate(ongoingStart.getDate() - 1);
  const ongoingEnd = new Date(now);
  ongoingEnd.setDate(ongoingEnd.getDate() + 6);

  const futureStart = new Date(now);
  futureStart.setMonth(futureStart.getMonth() + 1);
  const futureEnd = new Date(futureStart);
  futureEnd.setDate(futureEnd.getDate() + 1);

  const { data: events, error: eventErr } = await supabase
    .from("events")
    .insert([
      {
        title: "DLL Alumni Homecoming 2025",
        location: "DLL Main Campus, Lucena City",
        description:
          "Annual homecoming celebration bringing together alumni from all batches. Join us for a day of reconnecting with old friends, campus tours, cultural performances, and a grand alumni dinner. Don't miss this opportunity to relive your college memories!",
        organizer: "DLL Alumni Affairs Office",
        start_date: pastStart.toISOString(),
        end_date: pastEnd.toISOString(),
      },
      {
        title: "Career Fair 2025",
        location: "DLL Gymnasium, Lucena City",
        description:
          "Connect with top employers in the Quezon province and Metro Manila. Over 30 companies will be present offering full-time positions, internships, and career guidance. Bring multiple copies of your resume and dress professionally!",
        organizer: "DLL Office of Student Affairs & Alumni Relations",
        start_date: ongoingStart.toISOString(),
        end_date: ongoingEnd.toISOString(),
      },
      {
        title: "Alumni General Assembly 2025",
        location: "DLL Audio-Visual Hall, Lucena City",
        description:
          "Annual general assembly for all DLL alumni association members. Agenda includes election of new officers, financial report presentation, and discussion of upcoming alumni projects and scholarship programs.",
        organizer: "DLL Alumni Association",
        start_date: futureStart.toISOString(),
        end_date: futureEnd.toISOString(),
      },
    ])
    .select();

  if (eventErr) throw eventErr;

  // Event Participants
  await supabase.from("event_participants").insert([
    { event_id: events![1].id, user_id: users.mariaId },
    { event_id: events![1].id, user_id: users.juanId },
    { event_id: events![2].id, user_id: users.anaId },
    { event_id: events![0].id, user_id: users.mariaId },
    { event_id: events![0].id, user_id: users.juanId },
    { event_id: events![0].id, user_id: users.anaId },
  ]);

  // Announcements
  const publishedAt1 = new Date(now);
  publishedAt1.setDate(publishedAt1.getDate() - 7);

  const publishedAt2 = new Date(now);
  publishedAt2.setDate(publishedAt2.getDate() - 3);

  await supabase.from("announcements").insert([
    {
      title: "Welcome to the New DLL Alumni Platform",
      summary:
        "We are excited to launch our brand new alumni management platform designed to keep our community connected.",
      content:
        "Dear DLL Alumni,\n\nWe are thrilled to announce the launch of our new alumni platform! This system has been built from the ground up to better serve our growing alumni community.\n\n**Key Features:**\n- Alumni Directory: Find and connect with fellow graduates\n- Job Board: Post and discover career opportunities\n- Events: Stay updated on alumni gatherings and campus activities\n- Notifications: Real-time updates on things that matter to you\n\nWe encourage everyone to complete their profiles and explore the platform. Your feedback is invaluable as we continue to improve.\n\nMabuhay ang mga alumni ng DLL!",
      status: "published",
      published_at: publishedAt1.toISOString(),
    },
    {
      title: "Alumni Scholarship Program Now Open",
      summary:
        "Applications are now being accepted for the DLL Alumni Scholarship Fund for academic year 2025-2026.",
      content:
        "The DLL Alumni Association is pleased to announce that the Alumni Scholarship Program is now accepting applications for AY 2025-2026.\n\n**Eligibility:**\n- Must be a currently enrolled DLL student (2nd year and above)\n- Must maintain a GWA of 1.75 or better\n- Must demonstrate financial need\n- Must not be a recipient of any other scholarship\n\n**Benefits:**\n- Full tuition fee coverage\n- Monthly stipend of ₱3,000\n- Book allowance of ₱5,000 per semester\n\n**How to Apply:**\nVisit the DLL Alumni Affairs Office or download the application form from this platform. Deadline for submission is October 15, 2025.\n\nLet's pay it forward and help the next generation of DLL graduates succeed!",
      status: "published",
      published_at: publishedAt2.toISOString(),
    },
    {
      title: "Upcoming Platform Maintenance",
      summary:
        "Scheduled maintenance window for system updates and performance improvements.",
      content:
        "We will be performing scheduled maintenance on the alumni platform to implement new features and performance improvements.\n\n**Maintenance Window:**\n- Date: TBD\n- Duration: Approximately 2 hours\n- Impact: Platform will be temporarily unavailable\n\nWe will announce the exact date and time once confirmed. Thank you for your patience.",
      status: "draft",
      published_at: null,
    },
  ]);

  console.log("  ✓ Seeded 3 events, 3 announcements");
}

// ─── Seed Alumni Tracer Data ──────────────────────────────────────────────────

async function seedTracerData(refs: ReferenceData) {
  console.log("📊 Seeding alumni tracer data...");

  // Alumni Profiles (admin-traced records)
  const { data: alumniProfiles, error: apErr } = await supabase
    .from("alumni_profiles")
    .insert([
      {
        alumni_id: "A0-0001",
        course_id: refs.courseIds.bsit,
        fname: "Roberto",
        lname: "Cruz",
        mi: "M",
        sex: "Male",
        contact_number: "09171234567",
        religion: "Roman Catholic",
        civil_status: "Single",
        date_of_birth: "1998-03-15",
        facebook_account: "roberto.cruz.dev",
        address_country: "Philippines",
        address_region: "CALABARZON",
        address_province: "Quezon",
        address_city: "Lucena City",
        address_barangay: "Ibabang Dupay",
        address_zip: "4301",
      },
      {
        alumni_id: "A0-0002",
        course_id: refs.courseIds.bscs,
        fname: "Carmen",
        lname: "Reyes",
        mi: "L",
        sex: "Female",
        contact_number: "09181234568",
        religion: "Roman Catholic",
        civil_status: "Single",
        date_of_birth: "1999-07-22",
        facebook_account: "carmen.reyes.tech",
        address_country: "Philippines",
        address_region: "CALABARZON",
        address_province: "Quezon",
        address_city: "Tayabas City",
        address_barangay: "Poblacion",
        address_zip: "4327",
      },
      {
        alumni_id: "A0-0003",
        course_id: refs.courseIds.bsa,
        fname: "Miguel",
        lname: "Santos",
        mi: "A",
        sex: "Male",
        contact_number: "09191234569",
        religion: "Iglesia ni Cristo",
        civil_status: "Married",
        date_of_birth: "1996-11-08",
        facebook_account: "miguel.santos.cpa",
        address_country: "Philippines",
        address_region: "NCR",
        address_province: "Metro Manila",
        address_city: "Makati City",
        address_barangay: "Poblacion",
        address_zip: "1210",
      },
      {
        alumni_id: "A0-0004",
        course_id: refs.courseIds.bsba,
        fname: "Teresa",
        lname: "Garcia",
        mi: "R",
        sex: "Female",
        contact_number: "09201234570",
        religion: "Roman Catholic",
        civil_status: "Single",
        date_of_birth: "2000-01-30",
        facebook_account: "teresa.garcia.biz",
        address_country: "Philippines",
        address_region: "CALABARZON",
        address_province: "Quezon",
        address_city: "Lucena City",
        address_barangay: "Cotta",
        address_zip: "4301",
      },
    ])
    .select();

  if (apErr) throw apErr;

  const apIds = alumniProfiles!.map((ap) => ap.id);

  // Graduate Information
  await supabase.from("graduate_information").insert([
    {
      alumni_profile_id: apIds[0],
      year_graduated: 2020,
      satisfaction_level: 4,
      pursued_further_education: false,
      honor: null,
    },
    {
      alumni_profile_id: apIds[1],
      year_graduated: 2021,
      satisfaction_level: 5,
      pursued_further_education: true,
      honor: "Cum Laude",
    },
    {
      alumni_profile_id: apIds[2],
      year_graduated: 2019,
      satisfaction_level: 4,
      pursued_further_education: true,
      honor: "Magna Cum Laude",
    },
    {
      alumni_profile_id: apIds[3],
      year_graduated: 2022,
      satisfaction_level: 3,
      pursued_further_education: false,
      honor: null,
    },
  ]);

  // Current Jobs
  await supabase.from("current_jobs").insert([
    {
      alumni_profile_id: apIds[0],
      job_position: "Software Engineer",
      approximate_monthly_salary: 45000,
      company_affiliation: "Accenture Philippines",
      company_address_country: "Philippines",
      company_address_region: "NCR",
      company_address_province: "Metro Manila",
      company_address_city: "Mandaluyong City",
      employment_status: "Employed",
      employed_within_6mo: true,
      promoted_in_current_job: true,
      getting_jobs_related_to_experience: true,
      employment_type: "Full-time",
    },
    {
      alumni_profile_id: apIds[1],
      job_position: "Web Developer",
      approximate_monthly_salary: 38000,
      company_affiliation: "Pointwest Technologies",
      company_address_country: "Philippines",
      company_address_region: "NCR",
      company_address_province: "Metro Manila",
      company_address_city: "Taguig City",
      employment_status: "Employed",
      employed_within_6mo: true,
      promoted_in_current_job: false,
      getting_jobs_related_to_experience: true,
      employment_type: "Full-time",
    },
    {
      alumni_profile_id: apIds[2],
      job_position: "Senior Accountant",
      approximate_monthly_salary: 55000,
      company_affiliation: "SGV & Co. (EY Philippines)",
      company_address_country: "Philippines",
      company_address_region: "NCR",
      company_address_province: "Metro Manila",
      company_address_city: "Makati City",
      employment_status: "Employed",
      employed_within_6mo: false,
      promoted_in_current_job: true,
      getting_jobs_related_to_experience: true,
      employment_type: "Full-time",
    },
    {
      alumni_profile_id: apIds[3],
      job_position: "Marketing Officer",
      approximate_monthly_salary: 32000,
      company_affiliation: "Jollibee Foods Corporation",
      company_address_country: "Philippines",
      company_address_region: "CALABARZON",
      company_address_province: "Quezon",
      company_address_city: "Lucena City",
      employment_status: "Employed",
      employed_within_6mo: true,
      promoted_in_current_job: false,
      getting_jobs_related_to_experience: true,
      employment_type: "Full-time",
    },
  ]);

  // Employment Records (previous jobs)
  await supabase.from("employment_records").insert([
    {
      alumni_profile_id: apIds[0],
      company_name: "Freelance Web Development",
      employment_status: "Self-employed",
      approximate_monthly_salary: 20000,
      date_employed: "2020-08-01",
    },
    {
      alumni_profile_id: apIds[0],
      company_name: "Collabera Digital",
      employment_status: "Employed",
      approximate_monthly_salary: 30000,
      date_employed: "2021-03-15",
    },
    {
      alumni_profile_id: apIds[1],
      company_name: "Tech Startup (Intern)",
      employment_status: "Employed",
      approximate_monthly_salary: 12000,
      date_employed: "2021-06-01",
    },
    {
      alumni_profile_id: apIds[2],
      company_name: "Local Accounting Firm",
      employment_status: "Employed",
      approximate_monthly_salary: 25000,
      date_employed: "2019-09-01",
    },
    {
      alumni_profile_id: apIds[2],
      company_name: "Isla Lipana & Co. (PwC)",
      employment_status: "Employed",
      approximate_monthly_salary: 40000,
      date_employed: "2021-01-15",
    },
    {
      alumni_profile_id: apIds[3],
      company_name: "SM Retail Inc.",
      employment_status: "Employed",
      approximate_monthly_salary: 18000,
      date_employed: "2022-07-01",
    },
  ]);

  console.log("  ✓ Seeded 4 alumni tracer profiles with employment data");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 DLL Alumni Platform — Seed Script");
  console.log("═".repeat(50));
  console.log("");

  try {
    // Step 1: Cleanup
    await cleanup();
    console.log("");

    // Step 2: Create users
    const users = await seedUsers();
    console.log("");

    // Step 3: Reference data
    const refs = await seedReferenceData();
    console.log("");

    // Step 4: Profile extensions
    await seedProfileExtensions(users, refs);
    console.log("");

    // Step 5: Jobs
    await seedJobs(users, refs);
    console.log("");

    // Step 6: Events & Announcements
    await seedEventsAndAnnouncements(users);
    console.log("");

    // Step 7: Tracer data
    await seedTracerData(refs);
    console.log("");

    // Summary
    console.log("═".repeat(50));
    console.log("✅ Seed completed successfully!");
    console.log("");
    console.log("Test Credentials:");
    console.log("  Admin:  admin@dll-alumni.test / password123");
    console.log("  Alumni: maria@dll-alumni.test / password123");
    console.log("          juan@dll-alumni.test  / password123");
    console.log("          ana@dll-alumni.test   / password123");
    console.log("          pedro@dll-alumni.test / password123 (inactive)");
    console.log("          lisa@dll-alumni.test  / password123 (inactive)");
    console.log("");
  } catch (error) {
    console.error("");
    console.error("═".repeat(50));
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

main();

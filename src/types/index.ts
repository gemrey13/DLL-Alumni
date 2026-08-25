// Re-export all database row types
export type {
  Profile,
  AlumniProfile,
  GraduateInformation,
  CurrentJobRecord,
  EmploymentRecord,
  Curriculum,
  Course,
  Job,
  JobCategory,
  JobApplication,
  SavedJob,
  Event,
  EventParticipant,
  Announcement,
  Notification,
  NotificationPreferences,
  AuditLog,
  SystemUpdate,
  UserEducation,
  UserWorkInfo,
  UserLanguage,
  UserAccountLink,
  UserSkill,
  UserRole,
  UserStatus,
  JobStatus,
  ApplicationStatus,
  AnnouncementStatus,
  Json,
  Database,
} from "./database";

// Common response type for Server Actions
export interface ActionResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string | Record<string, string[]>;
}

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

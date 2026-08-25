export const NOTIFICATION_TYPES = {
  NEW_EVENT: "new_event",
  NEW_ANNOUNCEMENT: "new_announcement",
  JOB_APPROVED: "job_approved",
  JOB_REJECTED: "job_rejected",
  JOB_MATCHING_SKILLS: "job_matching_skills",
  EVENT_PARTICIPATION: "event_participation",
  ADMIN_ACTION: "admin_action",
  SYSTEM_ANNOUNCEMENT: "system_announcement",
  WELCOME: "welcome",
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

export interface NotificationMetadata {
  link?: string;
  event_id?: string;
  event_title?: string;
  announcement_id?: string;
  announcement_title?: string;
  job_id?: string;
  job_title?: string;
  feedback?: string;
  matched_skills?: string[];
  user_name?: string;
  action?: string;
  details?: string;
  update_id?: string;
  title?: string;
}

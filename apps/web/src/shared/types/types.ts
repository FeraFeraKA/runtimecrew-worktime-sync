export type Severity = "low" | "medium" | "high" | "critical";

export type WorkFormat = "office" | "remote" | "hybrid";

export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type RecommendationStatus = "new" | "in_progress" | "done" | "dismissed";

export type RecommendationPriority = Severity;

export type ConflictType =
  | "event_outside_working_hours"
  | "schedule_calendar_mismatch"
  | "timezone_conflict"
  | "exception_conflict"
  | "overload_conflict"
  | "work_format_mismatch";

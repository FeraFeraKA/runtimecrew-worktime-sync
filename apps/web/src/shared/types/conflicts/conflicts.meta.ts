import {
  CalendarClock,
  Globe2,
  ShieldX,
  UserRoundCog,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { ConflictType, Severity } from "../types";
import type {
  ConflictFilterOption,
  ConflictsPageKpiKey,
  ConflictSeverityFilter,
  ConflictStatus,
  ConflictStatusFilter,
  ConflictTypeFilter,
} from "./conflicts.types";

export type ConflictsPageKpiMeta = {
  icon: LucideIcon;
  iconClassName: string;
  valueClassName: string;
  iconWrapperClassName: string;
};

export const conflictsPageKpiMeta: Record<
  ConflictsPageKpiKey,
  ConflictsPageKpiMeta
> = {
  totalConflicts: {
    icon: UserRoundCog,
    iconClassName: "text-violet-600",
    valueClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
  },
  criticalConflicts: {
    icon: ShieldX,
    iconClassName: "text-red-600",
    valueClassName: "text-red-600",
    iconWrapperClassName: "bg-red-50",
  },
  outsideWorkingHours: {
    icon: CalendarClock,
    iconClassName: "text-orange-600",
    valueClassName: "text-orange-600",
    iconWrapperClassName: "bg-orange-50",
  },
  timezoneConflicts: {
    icon: Globe2,
    iconClassName: "text-blue-600",
    valueClassName: "text-blue-600",
    iconWrapperClassName: "bg-blue-50",
  },
  exceptions: {
    icon: UsersRound,
    iconClassName: "text-violet-600",
    valueClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
  },
};

export const conflictAllFilterOption = {
  value: "all",
  label: "Все",
} satisfies ConflictFilterOption<"all">;

export const conflictTypeMeta: Record<
  ConflictType,
  {
    label: string;
    badgeClassName: string;
    dotClassName: string;
    iconClassName: string;
    iconWrapperClassName: string;
  }
> = {
  event_outside_working_hours: {
    label: "Вне рабочего времени",
    badgeClassName: "bg-orange-100 text-orange-600",
    dotClassName: "bg-orange-500",
    iconClassName: "text-orange-600",
    iconWrapperClassName: "bg-orange-50",
  },
  timezone_conflict: {
    label: "Конфликт часового пояса",
    badgeClassName: "bg-blue-100 text-blue-600",
    dotClassName: "bg-blue-500",
    iconClassName: "text-blue-600",
    iconWrapperClassName: "bg-blue-50",
  },
  schedule_calendar_mismatch: {
    label: "Несовпадение графика и календаря",
    badgeClassName: "bg-yellow-100 text-yellow-600",
    dotClassName: "bg-red-400",
    iconClassName: "text-red-500",
    iconWrapperClassName: "bg-red-50",
  },
  exception_conflict: {
    label: "Конфликт исключения",
    badgeClassName: "bg-violet-100 text-violet-600",
    dotClassName: "bg-violet-400",
    iconClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
  },
  overload_conflict: {
    label: "Перегрузка",
    badgeClassName: "bg-red-100 text-red-600",
    dotClassName: "bg-red-400",
    iconClassName: "text-red-500",
    iconWrapperClassName: "bg-red-50",
  },
  work_format_mismatch: {
    label: "Несовпадение формата работы",
    badgeClassName: "bg-yellow-100 text-yellow-600",
    dotClassName: "bg-yellow-400",
    iconClassName: "text-yellow-600",
    iconWrapperClassName: "bg-yellow-50",
  },
};

export const conflictSeverityMeta: Record<
  Severity,
  {
    label: string;
    badgeClassName: string;
  }
> = {
  critical: {
    label: "Критический",
    badgeClassName: "bg-red-100 text-red-600",
  },
  high: {
    label: "Высокий",
    badgeClassName: "bg-orange-100 text-orange-600",
  },
  medium: {
    label: "Средний",
    badgeClassName: "bg-yellow-100 text-yellow-600",
  },
  low: {
    label: "Низкий",
    badgeClassName: "bg-green-100 text-green-600",
  },
};

export const conflictStatusMeta: Record<
  ConflictStatus,
  {
    label: string;
    badgeClassName: string;
  }
> = {
  open: {
    label: "Открыт",
    badgeClassName: "bg-orange-200 text-orange-500",
  },
  in_progress: {
    label: "В работе",
    badgeClassName: "bg-blue-100 text-blue-600",
  },
  resolved: {
    label: "Решён",
    badgeClassName: "bg-emerald-100 text-emerald-600",
  },
};

export const conflictTypeFilterOptions = [
  conflictAllFilterOption,
  {
    value: "event_outside_working_hours",
    label: conflictTypeMeta.event_outside_working_hours.label,
  },
  {
    value: "timezone_conflict",
    label: conflictTypeMeta.timezone_conflict.label,
  },
  {
    value: "schedule_calendar_mismatch",
    label: conflictTypeMeta.schedule_calendar_mismatch.label,
  },
  {
    value: "exception_conflict",
    label: conflictTypeMeta.exception_conflict.label,
  },
  {
    value: "overload_conflict",
    label: conflictTypeMeta.overload_conflict.label,
  },
  {
    value: "work_format_mismatch",
    label: conflictTypeMeta.work_format_mismatch.label,
  },
] satisfies ConflictFilterOption<ConflictTypeFilter>[];

export const conflictSeverityFilterOptions = [
  conflictAllFilterOption,
  {
    value: "critical",
    label: conflictSeverityMeta.critical.label,
  },
  {
    value: "high",
    label: conflictSeverityMeta.high.label,
  },
  {
    value: "medium",
    label: conflictSeverityMeta.medium.label,
  },
  {
    value: "low",
    label: conflictSeverityMeta.low.label,
  },
] satisfies ConflictFilterOption<ConflictSeverityFilter>[];

export const conflictStatusFilterOptions = [
  conflictAllFilterOption,
  {
    value: "open",
    label: conflictStatusMeta.open.label,
  },
  {
    value: "in_progress",
    label: conflictStatusMeta.in_progress.label,
  },
  {
    value: "resolved",
    label: conflictStatusMeta.resolved.label,
  },
] satisfies ConflictFilterOption<ConflictStatusFilter>[];

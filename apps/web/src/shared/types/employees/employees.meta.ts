import {
  AlertTriangle,
  ShieldX,
  UserCheck,
  UserMinus,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { Severity } from "../types";
import type {
  EmployeeStatus,
  EmployeesPageKpiKey,
  ProductivitySegmentStatus,
} from "./employees.types";

export type EmployeesPageKpiMeta = {
  icon: LucideIcon;
  iconClassName: string;
  valueClassName: string;
  iconWrapperClassName: string;
};

export const employeesPageKpiMeta: Record<
  EmployeesPageKpiKey,
  EmployeesPageKpiMeta
> = {
  totalEmployees: {
    icon: UsersRound,
    iconClassName: "text-blue-600",
    valueClassName: "text-blue-600",
    iconWrapperClassName: "bg-blue-50",
  },
  activeEmployees: {
    icon: UserCheck,
    iconClassName: "text-emerald-600",
    valueClassName: "text-emerald-600",
    iconWrapperClassName: "bg-emerald-50",
  },
  riskZoneEmployees: {
    icon: AlertTriangle,
    iconClassName: "text-orange-600",
    valueClassName: "text-orange-600",
    iconWrapperClassName: "bg-orange-50",
  },
  criticalEmployees: {
    icon: ShieldX,
    iconClassName: "text-red-600",
    valueClassName: "text-red-600",
    iconWrapperClassName: "bg-red-50",
  },
  unavailableEmployees: {
    icon: UserMinus,
    iconClassName: "text-violet-600",
    valueClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
  },
};

export const employeeStatusMeta: Record<
  EmployeeStatus,
  {
    dotClassName: string;
    badgeClassName: string;
  }
> = {
  actual: {
    dotClassName: "bg-green-600",
    badgeClassName: "bg-green-200 text-green-600",
  },
  outdated: {
    dotClassName: "bg-yellow-600",
    badgeClassName: "bg-yellow-200 text-yellow-600",
  },
  outside_schedule_meetings: {
    dotClassName: "bg-yellow-600",
    badgeClassName: "bg-yellow-200 text-yellow-600",
  },
  requires_confirmation: {
    dotClassName: "bg-yellow-600",
    badgeClassName: "bg-yellow-200 text-yellow-600",
  },
  work_format_mismatch: {
    dotClassName: "bg-yellow-600",
    badgeClassName: "bg-yellow-200 text-yellow-600",
  },
  overloaded: {
    dotClassName: "bg-red-600",
    badgeClassName: "bg-red-200 text-red-600",
  },
  timezone_conflict: {
    dotClassName: "bg-red-600",
    badgeClassName: "bg-red-200 text-red-600",
  },
  vacation: {
    dotClassName: "bg-violet-600",
    badgeClassName: "bg-violet-200 text-violet-600",
  },
  business_trip: {
    dotClassName: "bg-violet-600",
    badgeClassName: "bg-violet-200 text-violet-600",
  },
  sick_leave: {
    dotClassName: "bg-violet-600",
    badgeClassName: "bg-violet-200 text-violet-600",
  },
  personal_unavailable: {
    dotClassName: "bg-violet-600",
    badgeClassName: "bg-violet-200 text-violet-600",
  },
};

export const employeeRiskMeta: Record<
  Severity,
  {
    badgeClassName: string;
  }
> = {
  critical: {
    badgeClassName: "bg-red-200 text-red-600",
  },
  high: {
    badgeClassName: "bg-orange-200 text-orange-600",
  },
  medium: {
    badgeClassName: "bg-yellow-200 text-yellow-600",
  },
  low: {
    badgeClassName: "bg-green-200 text-green-600",
  },
};

export const employeeWorkFormatMeta = {
  office: {
    badgeClassName: "bg-green-200 text-green-600",
  },
  remote: {
    badgeClassName: "bg-blue-200 text-blue-600",
  },
  hybrid: {
    badgeClassName: "bg-purple-200 text-purple-600",
  },
};

export const productivitySegmentStatusMeta: Record<
  ProductivitySegmentStatus,
  {
    dotClassName: string;
    textClassName: string;
    label: string;
  }
> = {
  productive: {
    dotClassName: "bg-cyan-400",
    textClassName: "text-cyan-600",
    label: "Продуктивно",
  },
  idle: {
    dotClassName: "bg-yellow-300",
    textClassName: "text-yellow-600",
    label: "Пониженная продуктивность",
  },
  unproductive: {
    dotClassName: "bg-red-400",
    textClassName: "text-red-600",
    label: "Непродуктивно",
  },
};

export function getProductivitySegmentStatus(
  productivityPercent: number,
): ProductivitySegmentStatus {
  if (productivityPercent >= 70) {
    return "productive";
  }

  if (productivityPercent >= 35) {
    return "idle";
  }

  return "unproductive";
}

export function getProductivityBackground(value: number) {
  const hue = value <= 50 ? (value / 50) * 47 : 47 + ((value - 50) / 50) * 135;
  const saturation = value <= 50 ? 82 : 72;
  const lightness = value <= 50 ? 61 : 54;

  return `linear-gradient(90deg, hsl(${hue} ${saturation}% ${lightness}%), hsl(${hue} ${saturation}% ${Math.max(lightness - 5, 42)}%))`;
}

export function getProductivityClassName(value: number) {
  if (value >= 80) {
    return "text-cyan-600";
  }

  if (value >= 55) {
    return "text-yellow-600";
  }

  return "text-red-600";
}

export function buildProductivityTimelineTimeLabels(
  start: number,
  end: number,
  step: number,
) {
  const labels: string[] = [];

  for (let current = start; current <= end; current += step) {
    labels.push(formatProductivityTimelineTime(current));
  }

  return labels;
}

export function buildProductivityTimelineDateTime(
  date: string,
  minutes: number,
) {
  return `${date}T${formatProductivityTimelineTime(minutes)}:00`;
}

export function formatProductivityTimelineDateTime(dateTime: string) {
  return dateTime.slice(11, 16);
}

export function formatProductivityTimelineTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(restMinutes).padStart(
    2,
    "0",
  )}`;
}

export function toProductivityTimelineMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function dateTimeToProductivityTimelineMinutes(dateTime: string) {
  return toProductivityTimelineMinutes(
    formatProductivityTimelineDateTime(dateTime),
  );
}

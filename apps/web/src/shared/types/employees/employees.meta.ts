import {
  AlertTriangle,
  ShieldX,
  UserCheck,
  UserMinus,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { Severity } from "../types";
import type { EmployeeStatus, EmployeesPageKpiKey } from "./employees.types";

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

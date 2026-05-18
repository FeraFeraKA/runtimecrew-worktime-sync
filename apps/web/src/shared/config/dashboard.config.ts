import {
  AlertTriangle,
  Clock,
  ShieldAlert,
  UserCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { DashboardKpiKey } from "../types/dashboard.types";

type KpiCardConfig = {
  icon: LucideIcon;
  iconClassName: string;
  valueClassName: string;
  badgeClassName: string;
};

export const kpiCardConfig: Record<DashboardKpiKey, KpiCardConfig> = {
  teamActualityScore: {
    icon: UserCheck,
    iconClassName: "text-emerald-600",
    valueClassName: "text-emerald-600",
    badgeClassName: "bg-emerald-50 text-emerald-700",
  },

  averageRiskScore: {
    icon: ShieldAlert,
    iconClassName: "text-orange-600",
    valueClassName: "text-orange-600",
    badgeClassName: "bg-orange-50 text-orange-700",
  },

  highRiskEmployeesCount: {
    icon: AlertTriangle,
    iconClassName: "text-red-600",
    valueClassName: "text-red-600",
    badgeClassName: "bg-red-50 text-red-700",
  },

  conflictsCount: {
    icon: AlertTriangle,
    iconClassName: "text-rose-600",
    valueClassName: "text-rose-600",
    badgeClassName: "bg-rose-50 text-rose-700",
  },

  overloadedEmployeesCount: {
    icon: UsersRound,
    iconClassName: "text-violet-600",
    valueClassName: "text-violet-600",
    badgeClassName: "bg-violet-50 text-violet-700",
  },

  timezoneConflictsCount: {
    icon: Clock,
    iconClassName: "text-blue-600",
    valueClassName: "text-blue-600",
    badgeClassName: "bg-blue-50 text-blue-700",
  },
};

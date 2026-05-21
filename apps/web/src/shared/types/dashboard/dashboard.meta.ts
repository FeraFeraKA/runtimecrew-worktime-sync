import {
  AlertTriangle,
  Clock,
  ShieldAlert,
  UserCheck,
  UserLock,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { RecommendationPriority, Severity, WorkFormat } from "../types";
import type {
  DashboardKpiKey,
  RecommendationTargetType,
  RiskDistributionKey,
} from "./dashboard.types";

export type DashboardKpiMeta = {
  icon: LucideIcon;
  iconClassName: string;
  valueClassName: string;
  iconWrapperClassName: string;
};

export const dashboardKpiMeta: Record<DashboardKpiKey, DashboardKpiMeta> = {
  teamActualityScore: {
    icon: UserCheck,
    iconClassName: "text-emerald-600",
    valueClassName: "text-emerald-600",
    iconWrapperClassName: "bg-emerald-50",
  },
  averageRiskScore: {
    icon: ShieldAlert,
    iconClassName: "text-orange-600",
    valueClassName: "text-orange-600",
    iconWrapperClassName: "bg-orange-50",
  },
  highRiskEmployeesCount: {
    icon: UserLock,
    iconClassName: "text-red-600",
    valueClassName: "text-red-600",
    iconWrapperClassName: "bg-red-50",
  },
  conflictsCount: {
    icon: AlertTriangle,
    iconClassName: "text-yellow-500",
    valueClassName: "text-yellow-500",
    iconWrapperClassName: "bg-yellow-50",
  },
  overloadedEmployeesCount: {
    icon: UsersRound,
    iconClassName: "text-violet-600",
    valueClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
  },
  timezoneConflictsCount: {
    icon: Clock,
    iconClassName: "text-blue-600",
    valueClassName: "text-blue-600",
    iconWrapperClassName: "bg-blue-50",
  },
};

export const riskDistributionMeta: Record<
  RiskDistributionKey,
  {
    label: string;
    colorClassName: string;
    fillClassName: string;
  }
> = {
  critical: {
    label: "Крит.",
    colorClassName: "text-red-600",
    fillClassName: "fill-red-600",
  },
  high: {
    label: "Высокий",
    colorClassName: "text-orange-600",
    fillClassName: "fill-orange-500",
  },
  medium: {
    label: "Средний",
    colorClassName: "text-yellow-600",
    fillClassName: "fill-yellow-500",
  },
  low: {
    label: "Низкий",
    colorClassName: "text-green-600",
    fillClassName: "fill-green-600",
  },
};

export const severityMeta: Record<
  Severity,
  {
    label: string;
    badgeClassName: string;
  }
> = {
  critical: {
    label: "Критический",
    badgeClassName: "bg-red-200 text-red-600",
  },
  high: {
    label: "Высокий",
    badgeClassName: "bg-orange-200 text-orange-600",
  },
  medium: {
    label: "Средний",
    badgeClassName: "bg-yellow-200 text-yellow-600",
  },
  low: {
    label: "Низкий",
    badgeClassName: "bg-green-200 text-green-600",
  },
};

export const workFormatMeta: Record<
  WorkFormat,
  {
    label: string;
    badgeClassName: string;
  }
> = {
  office: {
    label: "Офис",
    badgeClassName: "bg-green-200 text-green-600",
  },
  remote: {
    label: "Удалённо",
    badgeClassName: "bg-blue-200 text-blue-600",
  },
  hybrid: {
    label: "Гибрид",
    badgeClassName: "bg-purple-200 text-purple-600",
  },
};

export const recommendationPriorityMeta: Record<
  RecommendationPriority,
  {
    label: string;
    badgeClassName: string;
  }
> = severityMeta;

export const recommendationTargetTypeMeta: Record<
  RecommendationTargetType,
  {
    label: string;
  }
> = {
  employee: {
    label: "Сотрудник",
  },
  team: {
    label: "Команда",
  },
  event: {
    label: "Событие",
  },
  schedule: {
    label: "График",
  },
};

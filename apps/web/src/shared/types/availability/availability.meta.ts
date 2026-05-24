import {
  Calendar,
  Clock,
  Globe2,
  TrendingUp,
  TriangleAlert,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type {
  AvailabilityIssueType,
  AvailabilityPageKpiKey,
  AvailabilityStatus,
} from "./availability.types";

export type AvailabilityPageKpiMeta = {
  icon: LucideIcon;
  iconClassName: string;
  valueClassName: string;
  iconWrapperClassName: string;
};

export const availabilityPageKpiMeta: Record<
  AvailabilityPageKpiKey,
  AvailabilityPageKpiMeta
> = {
  fullyAvailable: {
    icon: UserRoundCheck,
    iconClassName: "text-emerald-600",
    valueClassName: "text-emerald-600",
    iconWrapperClassName: "bg-emerald-50",
  },
  mostlyAvailable: {
    icon: UsersRound,
    iconClassName: "text-blue-600",
    valueClassName: "text-blue-600",
    iconWrapperClassName: "bg-blue-50",
  },
  problemDays: {
    icon: TriangleAlert,
    iconClassName: "text-orange-600",
    valueClassName: "text-orange-600",
    iconWrapperClassName: "bg-orange-50",
  },
  timezoneConflicts: {
    icon: Globe2,
    iconClassName: "text-violet-600",
    valueClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
  },
  averageAvailability: {
    icon: TrendingUp,
    iconClassName: "text-emerald-600",
    valueClassName: "text-emerald-600",
    iconWrapperClassName: "bg-emerald-50",
  },
};

export const availabilityStatusMeta: Record<
  AvailabilityStatus,
  {
    label: string;
    cellClassName: string;
    dotClassName: string;
  }
> = {
  available: {
    label: "Все доступны",
    cellClassName: "bg-emerald-500/70",
    dotClassName: "bg-emerald-600",
  },
  mostly_available: {
    label: "Большинство доступно",
    cellClassName: "bg-emerald-400/60",
    dotClassName: "bg-emerald-400",
  },
  limited: {
    label: "Ограниченная доступность",
    cellClassName: "bg-yellow-300/80",
    dotClassName: "bg-yellow-400",
  },
  unavailable: {
    label: "Недоступно",
    cellClassName: "bg-rose-300",
    dotClassName: "bg-rose-400",
  },
};

export const availabilityIssueMeta: Record<
  AvailabilityIssueType,
  {
    icon: LucideIcon;
    iconClassName: string;
    iconWrapperClassName: string;
    badgeClassName: string;
  }
> = {
  timezone: {
    icon: Globe2,
    iconClassName: "text-blue-600",
    iconWrapperClassName: "bg-blue-50",
    badgeClassName: "bg-blue-100 text-blue-600",
  },
  outside_hours: {
    icon: Clock,
    iconClassName: "text-orange-600",
    iconWrapperClassName: "bg-orange-50",
    badgeClassName: "bg-orange-100 text-orange-600",
  },
  vacation: {
    icon: Calendar,
    iconClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
    badgeClassName: "bg-violet-100 text-violet-600",
  },
};

export const availabilityFlexibleBadgeClassName =
  "bg-violet-100 text-violet-600";

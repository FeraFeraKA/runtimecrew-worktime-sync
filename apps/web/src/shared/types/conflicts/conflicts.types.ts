import type { ConflictType, EmployeeShortDto, Severity } from "../types";

export type ConflictStatus = "open" | "in_progress" | "resolved";

export type ConflictFilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type ConflictTypeFilter = "all" | ConflictType;

export type ConflictSeverityFilter = "all" | Severity;

export type ConflictStatusFilter = "all" | ConflictStatus;

export type ConflictsPageKpiKey =
  | "totalConflicts"
  | "criticalConflicts"
  | "outsideWorkingHours"
  | "timezoneConflicts"
  | "exceptions";

export type ConflictsPageKpiDto = {
  key: ConflictsPageKpiKey;
  title: string;
  value: number;
  changeValue: number;
  changeLabel: string;
};

export type ConflictTableRowDto = {
  id: string;
  type: ConflictType;
  typeLabel: string;
  severity: Severity;
  severityLabel: string;
  employee: EmployeeShortDto;
  event: string;
  dateLabel: string;
  description: string;
  recommendation: string;
  status: ConflictStatus;
  statusLabel: string;
};

export type ConflictTypeSummaryDto = {
  type: ConflictType;
  label: string;
  count: number;
};

export type ConflictQuickActionDto = {
  id: string;
  type: ConflictType;
  title: string;
  subtitle: string;
};

export type ConflictsPageResponse = {
  kpis: ConflictsPageKpiDto[];
  conflicts: ConflictTableRowDto[];
  typeSummary: ConflictTypeSummaryDto[];
  quickActions: ConflictQuickActionDto[];
};

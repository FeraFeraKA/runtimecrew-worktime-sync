import type { EmployeeShortDto, Severity, WorkFormat } from "../types";

export type EmployeeProfileResponse = {
  employee: EmployeeProfileDto;
  statistics: EmployeeProfileStatisticsDto;
  productivity: EmployeeProductivityPointDto[];
  riskDistribution: EmployeeRiskDistributionItemDto[];
  topConflicts: EmployeeConflictDto[];
  overloadedDays: EmployeeOverloadedDayDto[];
};

export type EmployeeProfileDto = {
  employee: EmployeeShortDto;
  email: string;
  role: string;
  roleLabel: string;
  teamId: string;
  teamName: string;
  timezone: string;
  timezoneLabel: string;
  workFormat: WorkFormat;
  workFormatLabel: string;
  hiredAt: string;
  hiredAtLabel: string;
  status: "actual" | "outdated" | "unavailable";
  statusLabel: string;
};

export type EmployeeProfileStatisticsDto = {
  actualityPercent: number;
  risk: Severity;
  riskLabel: string;
  conflictsCount: number;
  overloadedDaysCount: number;
};

export type EmployeeProductivityPointDto = {
  label: string;
  productivityPercent: number;
};

export type EmployeeRiskDistributionItemDto = {
  risk: Severity;
  count: number;
};

export type EmployeeConflictDto = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  severity: Severity;
};

export type EmployeeOverloadedDayDto = {
  id: string;
  dateLabel: string;
  durationLabel: string;
  statusLabel: string;
  optimumPercent: number;
};

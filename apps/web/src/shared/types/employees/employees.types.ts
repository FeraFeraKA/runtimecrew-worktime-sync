import type { EmployeeShortDto, Severity, WorkFormat } from "../types";

export type EmployeesPageResponse = {
  kpis: EmployeesPageKpiDto[];
  employees: EmployeeTableRowDto[];
};

export type EmployeesPageKpiKey =
  | "totalEmployees"
  | "activeEmployees"
  | "riskZoneEmployees"
  | "criticalEmployees"
  | "unavailableEmployees";

export type EmployeesPageKpiDto = {
  key: EmployeesPageKpiKey;
  title: string;
  value: number;
  changeValue: number;
  changeLabel: string;
};

export type EmployeeRoleFilter =
  | "all"
  | "backend_engineer"
  | "frontend_engineer"
  | "product_manager"
  | "ui_ux_designer"
  | "qa_engineer"
  | "devops_engineer"
  | "system_analyst"
  | "hr_manager";

export type EmployeeRiskFilter = "all" | Severity;

export type EmployeeStatus =
  | "actual"
  | "outdated"
  | "outside_schedule_meetings"
  | "requires_confirmation"
  | "work_format_mismatch"
  | "overloaded"
  | "timezone_conflict"
  | "vacation"
  | "business_trip"
  | "sick_leave"
  | "personal_unavailable";

export type EmployeeStatusFilter = "all" | EmployeeStatus;

export type EmployeeTableRowDto = {
  employee: EmployeeShortDto;

  role: Exclude<EmployeeRoleFilter, "all">;
  roleLabel: string;

  timezone: string;
  timezoneLabel: string;

  workFormat: WorkFormat;
  workFormatLabel: string;

  actualityScore: number;

  risk: Severity;
  riskLabel: string;

  conflictsCount: number;
  overloadedDaysCount: number;

  productivityPercent: number;

  status: EmployeeStatus;
  statusLabel: string;

  actions: string;
};

export type GetEmployeesParams = {
  teamId: string;
  from: string;
  to: string;
  search?: string;
  role?: EmployeeRoleFilter;
  timezone?: string;
  status?: EmployeeStatusFilter;
  risk?: EmployeeRiskFilter;
};

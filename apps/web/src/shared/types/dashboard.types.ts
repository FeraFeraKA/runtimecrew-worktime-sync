import type { RecommendationPriority, Severity, WorkFormat } from "./types";

export type DashboardResponse = {
  team: TeamDto;
  period: PeriodDto;
  kpis: DashboardKpisDto;
  riskDistribution: RiskDistributionDto;
  problematicEmployees: EmployeeDiagnosticSummaryDto[];
  topRecommendations: RecommendationDto[];
};

export type TeamDto = {
  id: string;
  name: string;
};

export type PeriodDto = {
  from: string;
  to: string;
};

export type DashboardKpiKey =
  | "teamActualityScore"
  | "averageRiskScore"
  | "highRiskEmployeesCount"
  | "conflictsCount"
  | "overloadedEmployeesCount"
  | "timezoneConflictsCount";

export type DashboardKpiDto = {
  key: DashboardKpiKey;
  title: string;
  value: number;
  unit?: "%";
  changePercent: number;
  changeLabel: string;
};

export type DashboardKpisDto = DashboardKpiDto[];

export type RiskDistributionKey = "critical" | "high" | "medium" | "low";

export type RiskDistributionDto = {
  key: RiskDistributionKey;
  count: number;
  color: string;
}[];

export type EmployeeDiagnosticSummaryDto = {
  employee: EmployeeShortDto;

  role: string;
  timezone: string;
  workFormat: WorkFormat;

  actualityScore: number;
  riskScore: number;
  severity: Severity;

  mainReason: string;
  recommendedAction: string;

  daysSinceLastUpdate: number;
  conflictsCount: number;
  loadRate: number;

  status: string;
};

export type EmployeeShortDto = {
  id: string;
  fullName: string;
  avatarUrl: string | undefined;
};

export type RecommendationDto = {
  id: string;
  priority: RecommendationPriority;

  title: string;
  description: string;
  reason: string;

  evidence: string[];

  target: RecommendationTargetDto;
  suggestedActionLabel: string;
  expectedEffect: ExpectedEffectDto;

  createdAt: string;
};

export type RecommendationTargetDto = {
  type: "employee" | "team" | "event" | "schedule";
  employeeId?: string;
  teamId?: string;
  eventId?: string;
  scheduleId?: string;
};

export type ExpectedEffectDto = {
  actualityScoreDelta?: number;
  riskScoreDelta?: number;
  conflictsDelta?: number;
  description: string;
};

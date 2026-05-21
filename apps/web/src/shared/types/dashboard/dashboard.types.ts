import type {
  EmployeeShortDto,
  RecommendationPriority,
  Severity,
  WorkFormat,
} from "../types";

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

export type RiskDistributionItemDto = {
  key: RiskDistributionKey;
  count: number;
};

export type RiskDistributionDto = RiskDistributionItemDto[];

export type EmployeeDiagnosticSummaryDto = {
  employee: EmployeeShortDto;

  role: string;
  roleLabel: string;

  timezone: string;
  timezoneLabel: string;

  workFormat: WorkFormat;
  workFormatLabel: string;

  actualityScore: number;
  riskScore: number;

  severity: Severity;
  severityLabel: string;

  mainReason: string;
  recommendedAction: string;

  daysSinceLastUpdate: number;
  conflictsCount: number;
  loadRate: number;

  status: string;
  statusLabel: string;
};

export type RecommendationDto = {
  id: string;

  priority: RecommendationPriority;
  priorityLabel: string;

  title: string;
  description: string;
  reason: string;

  evidence: string[];

  target: RecommendationTargetDto;
  suggestedActionLabel: string;
  expectedEffect: ExpectedEffectDto;

  createdAt: string;
};

export type RecommendationTargetType = "employee" | "team" | "event" | "schedule";

export type RecommendationTargetDto = {
  type: RecommendationTargetType;
  typeLabel: string;

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

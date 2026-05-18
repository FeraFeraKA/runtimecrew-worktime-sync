import type {
  RecommendationPriority,
  RecommendationStatus,
  Severity,
  WorkFormat,
} from "./types";

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

export type RiskDistributionDto = {
  low: number;
  medium: number;
  high: number;
  critical: number;
};

export type EmployeeDiagnosticSummaryDto = {
  employee: EmployeeShortDto;

  role: string;
  timezone: string;
  workFormat: WorkFormat;

  actualityScore: number;
  severity: Severity;

  mainReason: string;
  recommendedAction: string;

  daysSinceLastUpdate: number;
  conflictsCount: number;
  loadRate: number;

  statuses: string[];
};

export type EmployeeShortDto = {
  id: string;
  fullName: string;
  avatarUrl: string | undefined;
};

export type RecommendationDto = {
  id: string;
  type: string;
  priority: RecommendationPriority;

  title: string;
  description: string;
  reason: string;

  evidence: string[];

  target: RecommendationTargetDto;
  suggestedAction: SuggestedActionDto;
  expectedEffect: ExpectedEffectDto;

  status: RecommendationStatus;
  createdAt: string;
};

export type RecommendationTargetDto = {
  type: "employee" | "team" | "event" | "schedule";
  employeeId?: string;
  teamId?: string;
  eventId?: string;
  scheduleId?: string;
};

export type SuggestedActionDto = {
  type: string;
  label: string;
  payload?: Record<string, unknown>;
};

export type ExpectedEffectDto = {
  actualityScoreDelta?: number;
  riskScoreDelta?: number;
  conflictsDelta?: number;
  description: string;
};

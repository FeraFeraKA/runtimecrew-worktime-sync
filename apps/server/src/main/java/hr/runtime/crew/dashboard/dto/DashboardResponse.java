package hr.runtime.crew.dashboard.dto;


import java.util.List;

public record DashboardResponse(
        TeamDto team,
        PeriodDto period,
        List<DashboardKpiDto> kpis,
        List<RiskDistributionItemDto> riskDistribution,
        List<EmployeeDiagnosticSummaryDto> problematicEmployees,
        List<RecommendationDto> topRecommendations
) {}
package hr.runtime.crew.dashboard.dto;

import hr.runtime.crew.employee.dto.EmployeeResponse;

import java.util.List;

public record DashboardResponse(
        EmployeeResponse employee,
        PeriodDto period,
        List<DashboardKpiDto> kpis,
        List<RiskDistributionItemDto> riskDistribution,
        List<EmployeeDiagnosticSummaryDto> problematicEmployees,
        List<RecommendationDto> topRecommendations
) {
}

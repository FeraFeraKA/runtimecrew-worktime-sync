package hr.runtime.crew.dashboard.dto;

import hr.runtime.crew.team.dto.TeamResponse;

import java.util.List;

public record TeamDashboardResponse(
        TeamResponse team,
        PeriodDto period,
        List<DashboardKpiDto> kpis,
        List<RiskDistributionItemDto> riskDistribution,
        List<EmployeeDiagnosticSummaryDto> employees,
        List<RecommendationDto> topRecommendations,
        List<EmployeeHourlyActivityDto> activity,
        List<MeetingAttendanceDto> meetings
) {
}

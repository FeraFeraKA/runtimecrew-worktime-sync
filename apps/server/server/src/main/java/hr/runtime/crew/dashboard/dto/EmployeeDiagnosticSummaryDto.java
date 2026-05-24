package hr.runtime.crew.dashboard.dto;

import hr.runtime.crew.dashboard.model.enums.RiskLevel;
import hr.runtime.crew.employee.model.enums.WorkFormat;

public record EmployeeDiagnosticSummaryDto(
        EmployeeShortDto employee,
        String role,
        String timezone,
        WorkFormat workFormat,
        double activityPercent,
        double engagementPercent,
        double attendanceRate,
        double riskScore,
        RiskLevel severity,
        String mainReason,
        String recommendedAction
) {
}

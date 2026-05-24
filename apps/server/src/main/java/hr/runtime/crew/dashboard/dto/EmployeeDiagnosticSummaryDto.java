package hr.runtime.crew.dashboard.dto;


import hr.runtime.crew.dashboard.model.enums.Severity;
import hr.runtime.crew.employee.model.enums.WorkFormat;

public record EmployeeDiagnosticSummaryDto(
        EmployeeShortDto employee,
        String role,
        String roleLabel,
        String timezone,
        String timezoneLabel,
        WorkFormat workFormat,
        String workFormatLabel,
        double actualityScore,
        double riskScore,
        Severity severity,
        String severityLabel,
        String mainReason,
        String recommendedAction,
        long daysSinceLastUpdate,
        int conflictsCount,
        double loadRate,
        String status,
        String statusLabel
) {}
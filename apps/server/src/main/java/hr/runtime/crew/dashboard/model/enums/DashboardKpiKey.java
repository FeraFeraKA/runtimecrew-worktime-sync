package hr.runtime.crew.dashboard.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum DashboardKpiKey {
    TEAM_ACTUALITY_SCORE("teamActualityScore"),
    AVERAGE_RISK_SCORE("averageRiskScore"),
    HIGH_RISK_EMPLOYEES_COUNT("highRiskEmployeesCount"),
    CONFLICTS_COUNT("conflictsCount"),
    OVERLOADED_EMPLOYEES_COUNT("overloadedEmployeesCount"),
    TIMEZONE_CONFLICTS_COUNT("timezoneConflictsCount");

    private final String value;

    DashboardKpiKey(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
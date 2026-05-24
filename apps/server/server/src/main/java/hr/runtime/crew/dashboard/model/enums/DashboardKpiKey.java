package hr.runtime.crew.dashboard.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum DashboardKpiKey {
    ACTIVITY_PERCENT("activityPercent"),
    ENGAGEMENT_PERCENT("engagementPercent"),
    MEETINGS_COUNT("meetingsCount"),
    ATTENDANCE_RATE("attendanceRate"),
    OUTSIDE_WORKING_HOURS_RATE("outsideWorkingHoursRate"),
    AVERAGE_RISK_SCORE("averageRiskScore"),
    HIGH_RISK_EMPLOYEES_COUNT("highRiskEmployeesCount");

    private final String value;

    DashboardKpiKey(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

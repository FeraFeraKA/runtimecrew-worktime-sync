package hr.runtime.crew.conflict.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ConflictsPageKpiKey {
    TOTAL_CONFLICTS("totalConflicts"),
    CRITICAL_CONFLICTS("criticalConflicts"),
    OUTSIDE_WORKING_HOURS("outsideWorkingHours"),
    TIMEZONE_CONFLICTS("timezoneConflicts"),
    EXCEPTIONS("exceptions");

    private final String value;

    ConflictsPageKpiKey(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

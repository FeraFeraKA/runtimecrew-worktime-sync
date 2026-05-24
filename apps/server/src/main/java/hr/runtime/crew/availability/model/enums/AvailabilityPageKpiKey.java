package hr.runtime.crew.availability.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AvailabilityPageKpiKey {
    FULLY_AVAILABLE("fullyAvailable"),
    MOSTLY_AVAILABLE("mostlyAvailable"),
    PROBLEM_DAYS("problemDays"),
    TIMEZONE_CONFLICTS("timezoneConflicts"),
    AVERAGE_AVAILABILITY("averageAvailability");

    private final String value;

    AvailabilityPageKpiKey(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

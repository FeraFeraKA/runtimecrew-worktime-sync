package hr.runtime.crew.availability.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AvailabilityIssueType {
    TIMEZONE("timezone"),
    OUTSIDE_HOURS("outside_hours"),
    VACATION("vacation");

    private final String value;

    AvailabilityIssueType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

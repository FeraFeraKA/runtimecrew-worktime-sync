package hr.runtime.crew.availability.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AvailabilityEmployeeTagType {
    TIMEZONE("timezone"),
    OUTSIDE_HOURS("outside_hours"),
    VACATION("vacation"),
    FLEXIBLE("flexible");

    private final String value;

    AvailabilityEmployeeTagType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

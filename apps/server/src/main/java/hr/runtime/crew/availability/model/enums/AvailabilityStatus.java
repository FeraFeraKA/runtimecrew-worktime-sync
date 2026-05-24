package hr.runtime.crew.availability.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AvailabilityStatus {
    AVAILABLE("available"),
    MOSTLY_AVAILABLE("mostly_available"),
    LIMITED("limited"),
    UNAVAILABLE("unavailable");

    private final String value;

    AvailabilityStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

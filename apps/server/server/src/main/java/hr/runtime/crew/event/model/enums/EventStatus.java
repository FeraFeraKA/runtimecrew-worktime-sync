package hr.runtime.crew.event.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventStatus {
    PLANNED("planned"),
    IN_PROGRESS("in_progress"),
    COMPLETED("completed"),
    CANCELLED("cancelled");

    private final String value;

    EventStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
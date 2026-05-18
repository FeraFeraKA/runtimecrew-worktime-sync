package hr.runtime.crew.event;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventType {
    MEETING("meeting"),
    FOCUS_TIME("focus_time"),
    TASK("task"),
    BUSY_BLOCK("busy_block");

    private final String value;

    EventType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
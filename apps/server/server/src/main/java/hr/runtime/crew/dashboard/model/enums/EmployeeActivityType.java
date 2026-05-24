package hr.runtime.crew.dashboard.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EmployeeActivityType {
    WORKING("working"),
    MEETING("meeting"),
    FOCUS_TIME("focus_time"),
    BREAK("break"),
    IDLE("idle"),
    OFFLINE("offline"),
    OUTSIDE_WORKING_HOURS("outside_working_hours");

    private final String value;

    EmployeeActivityType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

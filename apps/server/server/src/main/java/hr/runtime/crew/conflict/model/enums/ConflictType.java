package hr.runtime.crew.conflict.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ConflictType {
    EVENT_OUTSIDE_WORKING_HOURS("event_outside_working_hours"),
    SCHEDULE_CALENDAR_MISMATCH("schedule_calendar_mismatch"),
    TIMEZONE_CONFLICT("timezone_conflict"),
    EXCEPTION_CONFLICT("exception_conflict"),
    OVERLOAD_CONFLICT("overload_conflict"),
    WORK_FORMAT_MISMATCH("work_format_mismatch");

    private final String value;

    ConflictType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

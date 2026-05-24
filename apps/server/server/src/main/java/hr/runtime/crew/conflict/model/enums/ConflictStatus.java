package hr.runtime.crew.conflict.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ConflictStatus {
    OPEN("open"),
    IN_PROGRESS("in_progress"),
    RESOLVED("resolved");

    private final String value;

    ConflictStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

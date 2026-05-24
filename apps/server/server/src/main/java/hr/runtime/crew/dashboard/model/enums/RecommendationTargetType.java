package hr.runtime.crew.dashboard.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RecommendationTargetType {
    EMPLOYEE("employee"),
    TEAM("team"),
    EVENT("event"),
    SCHEDULE("schedule");

    private final String value;

    RecommendationTargetType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
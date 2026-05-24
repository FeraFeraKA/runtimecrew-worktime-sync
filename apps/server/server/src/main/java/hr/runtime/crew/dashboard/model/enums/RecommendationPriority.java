package hr.runtime.crew.dashboard.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RecommendationPriority {
    LOW("low"),
    MEDIUM("medium"),
    HIGH("high"),
    CRITICAL("critical");

    private final String value;

    RecommendationPriority(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}

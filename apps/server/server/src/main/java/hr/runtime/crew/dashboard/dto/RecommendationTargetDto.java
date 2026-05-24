package hr.runtime.crew.dashboard.dto;


import hr.runtime.crew.dashboard.model.enums.RecommendationTargetType;
import java.util.UUID;

public record RecommendationTargetDto(
        RecommendationTargetType type,
        String typeLabel,
        UUID employeeId,
        UUID teamId,
        UUID eventId,
        UUID scheduleId
) {}
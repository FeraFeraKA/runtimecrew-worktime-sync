package hr.runtime.crew.dashboard.dto;

import java.util.UUID;
import hr.runtime.crew.dashboard.model.enums.RecommendationPriority;

import java.time.Instant;
import java.util.List;

public record RecommendationDto(
        String id,
        RecommendationPriority priority,
        String title,
        String description,
        String reason,
        List<String> evidence,
        String targetType,
        UUID employeeId,
        UUID teamId,
        UUID eventId,
        Instant createdAt
) {
}

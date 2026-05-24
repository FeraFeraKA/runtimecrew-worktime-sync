package hr.runtime.crew.dashboard.dto;


import hr.runtime.crew.dashboard.model.enums.RecommendationPriority;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record RecommendationDto(
        UUID id,
        RecommendationPriority priority,
        String priorityLabel,
        String title,
        String description,
        String reason,
        List<String> evidence,
        RecommendationTargetDto target,
        String suggestedActionLabel,
        ExpectedEffectDto expectedEffect,
        Instant createdAt
) {}
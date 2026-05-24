package hr.runtime.crew.dashboard.dto;


import hr.runtime.crew.dashboard.model.enums.RecommendationTargetType;

public record RecommendationTargetDto(
        RecommendationTargetType type,
        String typeLabel,
        Long employeeId,
        Long teamId,
        Long eventId,
        Long scheduleId
) {}
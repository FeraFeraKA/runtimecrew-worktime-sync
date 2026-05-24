package hr.runtime.crew.availability.dto;

import hr.runtime.crew.availability.model.enums.AvailabilityIssueType;

public record AvailabilityProblemDayDto(
        String id,
        AvailabilityIssueType type,
        String day,
        String time,
        String description
) {
}

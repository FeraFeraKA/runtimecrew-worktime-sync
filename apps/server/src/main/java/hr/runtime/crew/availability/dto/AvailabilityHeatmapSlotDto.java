package hr.runtime.crew.availability.dto;

import hr.runtime.crew.availability.model.enums.AvailabilityStatus;

public record AvailabilityHeatmapSlotDto(
        String id,
        String day,
        String time,
        AvailabilityStatus status,
        int availableCount,
        int totalCount,
        Boolean isSelected
) {
}

package hr.runtime.crew.availability.dto;

import hr.runtime.crew.availability.model.enums.AvailabilityStatus;

public record AvailabilityMeetingSlotDto(
        String id,
        String day,
        String time,
        String availableLabel,
        int score,
        AvailabilityStatus status
) {
}

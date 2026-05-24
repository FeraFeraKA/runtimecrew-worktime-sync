package hr.runtime.crew.availability.dto;

import java.util.List;

public record AvailabilitySelectedSlotDto(
        String day,
        String time,
        List<AvailabilityEmployeeDto> available,
        List<AvailabilityEmployeeDto> unavailable
) {
}

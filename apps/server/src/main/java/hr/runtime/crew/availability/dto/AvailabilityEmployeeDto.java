package hr.runtime.crew.availability.dto;

import hr.runtime.crew.availability.model.enums.AvailabilityEmployeeTagType;

public record AvailabilityEmployeeDto(
        EmployeeShortDto employee,
        String roleLabel,
        String tag,
        AvailabilityEmployeeTagType tagType
) {
}

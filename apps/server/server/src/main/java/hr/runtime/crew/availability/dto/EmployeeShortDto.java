package hr.runtime.crew.availability.dto;

import java.util.UUID;

public record EmployeeShortDto(
        UUID id,
        String fullName,
        String avatarUrl
) {
}

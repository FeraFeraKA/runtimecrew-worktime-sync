package hr.runtime.crew.conflict.dto;

import java.util.UUID;

public record EmployeeShortDto(
        UUID id,
        String fullName,
        String avatarUrl
) {
}

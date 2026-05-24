package hr.runtime.crew.dashboard.dto;

import java.util.UUID;
public record EmployeeShortDto(
        UUID id,
        String fullName,
        String avatarUrl
) {
}

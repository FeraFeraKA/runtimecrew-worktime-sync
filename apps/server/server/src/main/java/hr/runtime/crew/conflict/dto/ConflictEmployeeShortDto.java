package hr.runtime.crew.conflict.dto;

import java.util.UUID;

public record ConflictEmployeeShortDto(
        UUID id,
        String fullName,
        String avatarUrl
) {
}

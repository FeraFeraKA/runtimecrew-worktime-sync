package hr.runtime.crew.conflict.dto;

import hr.runtime.crew.conflict.model.enums.ConflictType;

import java.util.UUID;

public record ConflictQuickActionDto(
        UUID id,
        ConflictType type,
        String title,
        String subtitle
) {
}

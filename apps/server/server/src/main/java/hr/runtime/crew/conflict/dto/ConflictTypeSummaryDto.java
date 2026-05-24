package hr.runtime.crew.conflict.dto;

import hr.runtime.crew.conflict.model.enums.ConflictType;

public record ConflictTypeSummaryDto(
        ConflictType type,
        String label,
        int count
) {
}

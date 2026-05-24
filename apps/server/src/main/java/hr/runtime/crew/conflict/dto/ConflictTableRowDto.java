package hr.runtime.crew.conflict.dto;

import hr.runtime.crew.conflict.model.enums.ConflictStatus;
import hr.runtime.crew.conflict.model.enums.ConflictType;
import hr.runtime.crew.conflict.model.enums.Severity;

import java.util.UUID;

public record ConflictTableRowDto(
        UUID id,
        ConflictType type,
        String typeLabel,
        Severity severity,
        String severityLabel,
        ConflictEmployeeShortDto employee,
        String event,
        String dateLabel,
        String description,
        String recommendation,
        ConflictStatus status,
        String statusLabel
) {
}

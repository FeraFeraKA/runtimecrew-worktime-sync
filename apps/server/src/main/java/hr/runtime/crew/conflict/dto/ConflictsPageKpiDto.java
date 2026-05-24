package hr.runtime.crew.conflict.dto;

import hr.runtime.crew.conflict.model.enums.ConflictsPageKpiKey;

public record ConflictsPageKpiDto(
        ConflictsPageKpiKey key,
        String title,
        int value,
        int changeValue,
        String changeLabel
) {
}

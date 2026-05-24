package hr.runtime.crew.availability.dto;

import hr.runtime.crew.availability.model.enums.AvailabilityPageKpiKey;

public record AvailabilityPageKpiDto(
        AvailabilityPageKpiKey key,
        String title,
        String value,
        int changeValue,
        String changeLabel
) {
}

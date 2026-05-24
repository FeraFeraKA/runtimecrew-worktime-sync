package hr.runtime.crew.dashboard.dto;

import hr.runtime.crew.dashboard.model.enums.RiskLevel;

public record RiskDistributionItemDto(
        RiskLevel key,
        String title,
        int count
) {
}

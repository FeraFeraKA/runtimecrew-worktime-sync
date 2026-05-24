package hr.runtime.crew.dashboard.dto;


import hr.runtime.crew.dashboard.model.enums.RiskDistributionKey;

public record RiskDistributionItemDto(
        RiskDistributionKey key,
        int count
) {}
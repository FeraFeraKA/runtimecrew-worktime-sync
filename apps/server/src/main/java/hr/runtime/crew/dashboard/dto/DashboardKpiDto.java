package hr.runtime.crew.dashboard.dto;


import hr.runtime.crew.dashboard.model.enums.DashboardKpiKey;

public record DashboardKpiDto(
        DashboardKpiKey key,
        String title,
        double value,
        String unit,
        double changePercent,
        String changeLabel
) {}
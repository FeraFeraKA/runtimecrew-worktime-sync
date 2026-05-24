package hr.runtime.crew.conflict.dto;

import java.util.List;

public record ConflictsPageResponse(
        List<ConflictsPageKpiDto> kpis,
        List<ConflictTableRowDto> conflicts,
        List<ConflictTypeSummaryDto> typeSummary,
        List<ConflictQuickActionDto> quickActions
) {
}

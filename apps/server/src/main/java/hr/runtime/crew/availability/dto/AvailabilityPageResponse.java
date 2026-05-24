package hr.runtime.crew.availability.dto;

import java.util.List;
import java.util.Map;

public record AvailabilityPageResponse(
        List<AvailabilityPageKpiDto> kpis,
        List<AvailabilityHeatmapSlotDto> heatmap,
        String selectedSlotId,
        Map<String, AvailabilitySelectedSlotDto> slotDetails,
        List<AvailabilityMeetingSlotDto> bestSlots,
        List<AvailabilityProblemDayDto> problemDays
) {
}

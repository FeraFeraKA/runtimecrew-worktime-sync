package hr.runtime.crew.dashboard.dto;

import java.util.UUID;
import hr.runtime.crew.dashboard.model.enums.EmployeeActivityType;

import java.time.Instant;

public record EmployeeHourlyActivityDto(
        UUID id,
        EmployeeShortDto employee,
        Instant startAt,
        Instant endAt,
        EmployeeActivityType activityType,
        int activityPercent,
        int engagementPercent,
        String title,
        String description
) {
}

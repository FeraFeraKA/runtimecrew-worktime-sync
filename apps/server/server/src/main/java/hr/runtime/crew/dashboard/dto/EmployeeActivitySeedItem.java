package hr.runtime.crew.dashboard.dto;

import hr.runtime.crew.dashboard.model.enums.EmployeeActivityType;

import java.time.Instant;

public record EmployeeActivitySeedItem(
        String employeeEmail,
        Instant startAt,
        Instant endAt,
        EmployeeActivityType activityType,
        int activityPercent,
        int engagementPercent,
        String title,
        String description
) {
}

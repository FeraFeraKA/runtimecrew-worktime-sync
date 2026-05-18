package hr.runtime.crew.employee.dto;

import hr.runtime.crew.employee.WeekDay;
import hr.runtime.crew.employee.WorkFormat;

import java.time.Instant;
import java.time.LocalTime;
import java.util.Set;

public record WorkScheduleResponse(
        Set<WeekDay> workingDays,
        LocalTime startTime,
        LocalTime endTime,
        String timezone,
        WorkFormat workFormat,
        Instant lastUpdatedAt,
        Instant confirmedAt
) {
}

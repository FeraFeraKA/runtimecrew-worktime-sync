package hr.runtime.crew.employee.dto;

import hr.runtime.crew.employee.model.enums.WeekDay;
import hr.runtime.crew.employee.model.enums.WorkFormat;

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

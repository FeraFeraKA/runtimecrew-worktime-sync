package hr.runtime.crew.employee.dto;

import hr.runtime.crew.employee.WeekDay;
import hr.runtime.crew.employee.WorkFormat;

import java.time.LocalTime;
import java.util.Set;

public record WorkScheduleRequest(
        Set<WeekDay> workingDays,
        LocalTime startTime,
        LocalTime endTime,
        String timezone,
        WorkFormat workFormat
) {
}

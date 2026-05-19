package hr.runtime.crew.employee.dto;

import hr.runtime.crew.employee.model.enums.WeekDay;
import hr.runtime.crew.employee.model.enums.WorkFormat;

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

package hr.runtime.crew.dashboard.dto;

import hr.runtime.crew.event.model.enums.AttendanceStatus;

import java.time.Instant;

public record MeetingAttendanceParticipantDto(
        EmployeeShortDto employee,
        AttendanceStatus attendanceStatus,
        boolean attended,
        Instant joinedAt,
        Instant leftAt,
        long attendanceMinutes
) {
}

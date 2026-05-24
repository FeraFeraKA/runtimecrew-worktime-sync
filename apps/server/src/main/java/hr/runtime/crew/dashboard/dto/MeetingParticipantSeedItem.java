package hr.runtime.crew.dashboard.dto;

import hr.runtime.crew.event.model.enums.AttendanceStatus;

import java.time.Instant;

public record MeetingParticipantSeedItem(
        String employeeEmail,
        String role,
        AttendanceStatus attendanceStatus,
        Instant joinedAt,
        Instant leftAt
) {
}

package hr.runtime.crew.dashboard.dto;

import java.util.UUID;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.enums.EventType;

import java.time.Instant;
import java.util.List;

public record MeetingAttendanceDto(
        UUID eventId,
        String title,
        String description,
        Instant startAt,
        Instant endAt,
        EventType eventType,
        EventStatus status,
        List<MeetingAttendanceParticipantDto> participants
) {
}

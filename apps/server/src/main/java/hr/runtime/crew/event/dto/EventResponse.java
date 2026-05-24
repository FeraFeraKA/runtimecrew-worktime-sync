package hr.runtime.crew.event.dto;

import hr.runtime.crew.event.model.enums.EventType;
import hr.runtime.crew.event.model.enums.EventStatus;
import java.time.Instant;
import java.util.List;

public record EventResponse(
        Long id,
        Long teamId,
        String title,
        String description,
        Instant startAt,
        Instant endAt,
        EventType eventType,
        String locationType,
        EventStatus status,
        List<Long> participantIds,
        Instant createdAt
) {}
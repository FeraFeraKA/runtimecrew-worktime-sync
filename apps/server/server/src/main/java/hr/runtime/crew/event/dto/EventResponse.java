package hr.runtime.crew.event.dto;

import hr.runtime.crew.event.model.enums.EventType;
import hr.runtime.crew.event.model.enums.EventStatus;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record EventResponse(
        UUID id,
        UUID teamId,
        String title,
        String description,
        Instant startAt,
        Instant endAt,
        EventType eventType,
        String locationType,
        EventStatus status,
        List<UUID> participantIds,
        Instant createdAt
) {}
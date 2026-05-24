package hr.runtime.crew.dashboard.dto;

import java.util.UUID;
import java.time.Instant;
import java.util.List;

public record MeetingSeedItem(
        UUID teamId,
        String title,
        String description,
        Instant startAt,
        Instant endAt,
        List<MeetingParticipantSeedItem> participants
) {
}

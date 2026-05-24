package hr.runtime.crew.team.dto;

import java.time.Instant;
import java.util.UUID;

public record TeamResponse(
        UUID id,
        String name,
        Instant createdAt
) {
}

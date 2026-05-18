package hr.runtime.crew.team.dto;

import java.time.Instant;

public record TeamResponse(
        Long id,
        String name,
        Instant createdAt
) {
}

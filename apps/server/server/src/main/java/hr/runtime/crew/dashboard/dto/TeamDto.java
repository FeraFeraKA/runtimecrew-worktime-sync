package hr.runtime.crew.dashboard.dto;

import java.util.UUID;


public record TeamDto(
        UUID id,
        String name
) {}
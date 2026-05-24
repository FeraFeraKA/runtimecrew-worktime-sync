package hr.runtime.crew.dashboard.dto;


public record ExpectedEffectDto(
        Double actualityScoreDelta,
        Double riskScoreDelta,
        Integer conflictsDelta,
        String description
) {}
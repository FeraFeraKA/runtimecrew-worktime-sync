package hr.runtime.crew.dashboard.dto;

import java.time.LocalDate;

public record PeriodDto(
        LocalDate from,
        LocalDate to
) {
}

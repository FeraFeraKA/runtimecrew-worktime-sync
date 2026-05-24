package hr.runtime.crew.employee.dto;

import java.time.Instant;
import java.util.UUID;

public record EmployeeResponse(
        UUID id,
        UUID teamId,
        String fullName,
        String email,
        String role,
        String avatarUrl,
        WorkScheduleResponse workSchedule,
        Instant createdAt,
        Instant updatedAt
) {
}

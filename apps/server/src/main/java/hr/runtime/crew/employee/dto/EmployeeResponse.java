package hr.runtime.crew.employee.dto;

import java.time.Instant;

public record EmployeeResponse(
        Long id,
        Long teamId,
        String fullName,
        String email,
        String role,
        String avatarUrl,
        WorkScheduleResponse workSchedule,
        Instant createdAt,
        Instant updatedAt
) {
}

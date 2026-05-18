package hr.runtime.crew.employee.dto;

public record CreateEmployeeRequest(
        String fullName,
        String email,
        String role,
        String avatarUrl,
        WorkScheduleRequest workSchedule
) {
}

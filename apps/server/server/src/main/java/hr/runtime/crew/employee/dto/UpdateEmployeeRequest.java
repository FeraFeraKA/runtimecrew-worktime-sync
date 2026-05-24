package hr.runtime.crew.employee.dto;

public record UpdateEmployeeRequest(
        String fullName,
        String email,
        String role,
        String avatarUrl
) {
}

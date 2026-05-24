package hr.runtime.crew.dashboard.dto;


public record EmployeeShortDto(
        Long id,
        String fullName,
        String avatarUrl
) {}
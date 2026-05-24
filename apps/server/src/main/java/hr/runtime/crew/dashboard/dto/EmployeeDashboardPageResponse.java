package hr.runtime.crew.dashboard.dto;

import java.util.List;

public record EmployeeDashboardPageResponse(
        DashboardResponse dashboard,
        List<EmployeeHourlyActivityDto> activity,
        List<MeetingAttendanceDto> meetings
) {
}

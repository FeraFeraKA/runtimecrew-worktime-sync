package hr.runtime.crew.dashboard.dto;

import java.util.List;

public record DashboardSyntheticSeedFile(
        List<EmployeeActivitySeedItem> activity,
        List<MeetingSeedItem> meetings
) {
}

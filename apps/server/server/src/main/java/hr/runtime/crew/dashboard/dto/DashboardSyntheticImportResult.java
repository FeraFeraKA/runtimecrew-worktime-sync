package hr.runtime.crew.dashboard.dto;

public record DashboardSyntheticImportResult(
        int activityItemsSaved,
        int meetingsCreated,
        int participantsCreated
) {
}

package hr.runtime.crew.dashboard.controller;

import java.util.UUID;
import hr.runtime.crew.dashboard.dto.DashboardSyntheticImportResult;
import hr.runtime.crew.dashboard.dto.EmployeeDashboardPageResponse;
import hr.runtime.crew.dashboard.dto.TeamDashboardResponse;
import hr.runtime.crew.dashboard.service.DashboardService;
import hr.runtime.crew.dashboard.service.DashboardSyntheticDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class DashboardController {

    private final DashboardService dashboardService;
    private final DashboardSyntheticDataService syntheticDataService;

    public DashboardController(
            DashboardService dashboardService,
            DashboardSyntheticDataService syntheticDataService
    ) {
        this.dashboardService = dashboardService;
        this.syntheticDataService = syntheticDataService;
    }

    @GetMapping("/api/employees/{employeeId}/dashboard")
    public EmployeeDashboardPageResponse getEmployeeDashboard(
            @PathVariable UUID employeeId,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to
    ) {
        return dashboardService.getEmployeeDashboard(employeeId, from, to);
    }

    @GetMapping("/api/teams/{teamId}/dashboard")
    public TeamDashboardResponse getTeamDashboard(
            @PathVariable UUID teamId,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to
    ) {
        return dashboardService.getTeamDashboard(teamId, from, to);
    }

    @PostMapping("/api/dashboard/import-synthetic")
    public DashboardSyntheticImportResult importSyntheticDashboardData(
            @RequestParam(defaultValue = "data/dashboard-synthetic-data.json") String resourcePath
    ) {
        return syntheticDataService.importSyntheticData(resourcePath);
    }
}

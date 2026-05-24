package hr.runtime.crew.dashboard.controller;


import hr.runtime.crew.dashboard.dto.DashboardResponse;
import hr.runtime.crew.dashboard.service.DashboardService;
import hr.runtime.crew.team.TeamService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/teams")
public class DashboardController {

    private final DashboardService dashboardService;
    private final TeamService teamService;

    public DashboardController(DashboardService dashboardService, TeamService teamService) {
        this.dashboardService = dashboardService;
        this.teamService = teamService;
    }

    @GetMapping("/{teamId}/dashboard")
    public DashboardResponse getDashboard(
            @PathVariable Long teamId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        teamService.getTeamEntityById(teamId);
        return dashboardService.buildDashboard(teamId, from, to);
    }
}

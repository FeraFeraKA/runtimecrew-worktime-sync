package hr.runtime.crew.team;

import java.util.UUID;
import hr.runtime.crew.team.dto.CreateTeamRequest;
import hr.runtime.crew.team.dto.TeamResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeamResponse createTeam(@RequestBody CreateTeamRequest request) {
        return teamService.createTeam(request);
    }

    @GetMapping
    public List<TeamResponse> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/{teamId}")
    public TeamResponse getTeamById(@PathVariable UUID teamId) {
        return teamService.getTeamById(teamId);
    }
}

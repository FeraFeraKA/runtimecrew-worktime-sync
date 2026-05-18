package hr.runtime.crew.team;

import hr.runtime.crew.team.dto.CreateTeamRequest;
import hr.runtime.crew.team.dto.TeamResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public TeamResponse createTeam(CreateTeamRequest request) {
        Team team = new Team(request.name());
        Team savedTeam = teamRepository.save(team);
        return toResponse(savedTeam);
    }

    public List<TeamResponse> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TeamResponse getTeamById(Long teamId) {
        Team team = getTeamEntityById(teamId);
        return toResponse(team);
    }

    public Team getTeamEntityById(Long teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }

    private TeamResponse toResponse(Team team) {
        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getCreatedAt()
        );
    }
}

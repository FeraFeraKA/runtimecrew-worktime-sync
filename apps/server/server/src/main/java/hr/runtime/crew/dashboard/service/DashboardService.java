package hr.runtime.crew.dashboard.service;

import java.util.UUID;
import hr.runtime.crew.dashboard.dto.DashboardKpiDto;
import hr.runtime.crew.dashboard.dto.DashboardResponse;
import hr.runtime.crew.dashboard.dto.EmployeeDashboardPageResponse;
import hr.runtime.crew.dashboard.dto.EmployeeDiagnosticSummaryDto;
import hr.runtime.crew.dashboard.dto.EmployeeHourlyActivityDto;
import hr.runtime.crew.dashboard.dto.EmployeeShortDto;
import hr.runtime.crew.dashboard.dto.MeetingAttendanceDto;
import hr.runtime.crew.dashboard.dto.MeetingAttendanceParticipantDto;
import hr.runtime.crew.dashboard.dto.PeriodDto;
import hr.runtime.crew.dashboard.dto.RecommendationDto;
import hr.runtime.crew.dashboard.dto.RiskDistributionItemDto;
import hr.runtime.crew.dashboard.dto.TeamDashboardResponse;
import hr.runtime.crew.dashboard.model.entity.EmployeeActivitySnapshot;
import hr.runtime.crew.dashboard.model.enums.DashboardKpiKey;
import hr.runtime.crew.dashboard.model.enums.RecommendationPriority;
import hr.runtime.crew.dashboard.model.enums.RiskLevel;
import hr.runtime.crew.dashboard.repository.EmployeeActivitySnapshotRepository;
import hr.runtime.crew.employee.dto.EmployeeResponse;
import hr.runtime.crew.employee.model.entity.WorkSchedule;
import hr.runtime.crew.employee.dto.WorkScheduleResponse;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.model.enums.WeekDay;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.event.model.entity.WorkEvent;
import hr.runtime.crew.event.model.entity.WorkEventParticipant;
import hr.runtime.crew.event.model.enums.AttendanceStatus;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.enums.EventType;
import hr.runtime.crew.event.repository.WorkEventParticipantRepository;
import hr.runtime.crew.team.Team;
import hr.runtime.crew.team.TeamRepository;
import hr.runtime.crew.team.dto.TeamResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;

@Service
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final TeamRepository teamRepository;
    private final WorkEventParticipantRepository participantRepository;
    private final EmployeeActivitySnapshotRepository activityRepository;

    public DashboardService(
            EmployeeRepository employeeRepository,
            TeamRepository teamRepository,
            WorkEventParticipantRepository participantRepository,
            EmployeeActivitySnapshotRepository activityRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.teamRepository = teamRepository;
        this.participantRepository = participantRepository;
        this.activityRepository = activityRepository;
    }

    @Transactional(readOnly = true)
    public EmployeeDashboardPageResponse getEmployeeDashboard(
            UUID employeeId,
            LocalDate from,
            LocalDate to
    ) {
        Employee employee = getEmployee(employeeId);
        Instant fromInstant = toStartInstant(from);
        Instant toInstant = toEndInstant(to);

        List<EmployeeActivitySnapshot> activity = activityRepository
                .findByEmployee_IdAndStartAtLessThanAndEndAtGreaterThanOrderByStartAt(
                        employeeId,
                        toInstant,
                        fromInstant
                );

        List<WorkEventParticipant> employeeParticipants = getEmployeeMeetingParticipants(
                employeeId,
                fromInstant,
                toInstant
        );

        EmployeeDiagnosticSummaryDto summary = buildSummary(
                employee,
                activity,
                employeeParticipants
        );

        DashboardResponse dashboard = new DashboardResponse(
                toEmployeeResponse(employee),
                new PeriodDto(from, to),
                buildEmployeeKpis(summary, employeeParticipants),
                buildRiskDistribution(List.of(summary)),
                summary.riskScore() >= 50 ? List.of(summary) : List.of(),
                buildRecommendations(List.of(summary), employee.getTeam().getId())
        );

        return new EmployeeDashboardPageResponse(
                dashboard,
                activity.stream().map(this::toActivityDto).toList(),
                buildMeetingDtos(employeeParticipants)
        );
    }

    @Transactional(readOnly = true)
    public TeamDashboardResponse getTeamDashboard(
            UUID teamId,
            LocalDate from,
            LocalDate to
    ) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        Instant fromInstant = toStartInstant(from);
        Instant toInstant = toEndInstant(to);

        List<Employee> employees = employeeRepository.findByTeam_Id(teamId);
        List<EmployeeActivitySnapshot> teamActivity = activityRepository
                .findByEmployee_Team_IdAndStartAtLessThanAndEndAtGreaterThanOrderByStartAt(
                        teamId,
                        toInstant,
                        fromInstant
                );

        List<EmployeeDiagnosticSummaryDto> summaries = new ArrayList<>();
        List<WorkEventParticipant> allParticipants = new ArrayList<>();

        for (Employee employee : employees) {
            List<EmployeeActivitySnapshot> employeeActivity = teamActivity.stream()
                    .filter(item -> item.getEmployee().getId().equals(employee.getId()))
                    .toList();

            List<WorkEventParticipant> employeeParticipants = getEmployeeMeetingParticipants(
                    employee.getId(),
                    fromInstant,
                    toInstant
            );

            allParticipants.addAll(employeeParticipants);
            summaries.add(buildSummary(employee, employeeActivity, employeeParticipants));
        }

        summaries = summaries.stream()
                .sorted(Comparator.comparingDouble(EmployeeDiagnosticSummaryDto::riskScore).reversed())
                .toList();

        return new TeamDashboardResponse(
                new TeamResponse(team.getId(), team.getName(), team.getCreatedAt()),
                new PeriodDto(from, to),
                buildTeamKpis(summaries, allParticipants),
                buildRiskDistribution(summaries),
                summaries,
                buildRecommendations(summaries, teamId),
                teamActivity.stream().map(this::toActivityDto).toList(),
                buildMeetingDtos(allParticipants)
        );
    }

    private Employee getEmployee(UUID employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    private List<WorkEventParticipant> getEmployeeMeetingParticipants(
            UUID employeeId,
            Instant from,
            Instant to
    ) {
        return participantRepository.findByEmployee_Id(employeeId)
                .stream()
                .filter(participant -> participant.getEvent() != null)
                .filter(participant -> isMeetingInPeriod(participant.getEvent(), from, to))
                .toList();
    }

    private boolean isMeetingInPeriod(WorkEvent event, Instant from, Instant to) {
        return event.getEventType() == EventType.MEETING
                && event.getStatus() != EventStatus.CANCELLED
                && event.getStartAt().isBefore(to)
                && event.getEndAt().isAfter(from);
    }

    private EmployeeDiagnosticSummaryDto buildSummary(
            Employee employee,
            List<EmployeeActivitySnapshot> activity,
            List<WorkEventParticipant> participants
    ) {
        double activityPercent = averageActivity(activity);
        double engagementPercent = averageEngagement(activity);
        double attendanceRate = calculateAttendanceRate(participants);
        double outsideWorkingHoursRate = calculateOutsideWorkingHoursRate(employee, participants);

        double riskScore = clamp100(
                (100 - activityPercent) * 0.25
                        + (100 - engagementPercent) * 0.30
                        + (100 - attendanceRate) * 0.25
                        + outsideWorkingHoursRate * 0.20
        );

        RiskLevel severity = toRiskLevel(riskScore);

        String mainReason = buildMainReason(
                activityPercent,
                engagementPercent,
                attendanceRate,
                outsideWorkingHoursRate
        );

        return new EmployeeDiagnosticSummaryDto(
                toEmployeeShort(employee),
                employee.getRole(),
                employee.getTimezone(),
                employee.getWorkSchedule() == null ? null : employee.getWorkSchedule().getWorkFormat(),
                round(activityPercent),
                round(engagementPercent),
                round(attendanceRate),
                round(riskScore),
                severity,
                mainReason,
                buildRecommendedAction(severity, mainReason)
        );
    }

    private List<DashboardKpiDto> buildEmployeeKpis(
            EmployeeDiagnosticSummaryDto summary,
            List<WorkEventParticipant> participants
    ) {
        return List.of(
                new DashboardKpiDto(
                        DashboardKpiKey.ACTIVITY_PERCENT,
                        "Активность",
                        summary.activityPercent(),
                        "%",
                        0,
                        "за выбранный период"
                ),
                new DashboardKpiDto(
                        DashboardKpiKey.ENGAGEMENT_PERCENT,
                        "Вовлечённость",
                        summary.engagementPercent(),
                        "%",
                        0,
                        "за выбранный период"
                ),
                new DashboardKpiDto(
                        DashboardKpiKey.MEETINGS_COUNT,
                        "Встречи",
                        participants.size(),
                        null,
                        0,
                        "за выбранный период"
                ),
                new DashboardKpiDto(
                        DashboardKpiKey.ATTENDANCE_RATE,
                        "Посещаемость",
                        summary.attendanceRate(),
                        "%",
                        0,
                        "по встречам"
                )
        );
    }

    private List<DashboardKpiDto> buildTeamKpis(
            List<EmployeeDiagnosticSummaryDto> summaries,
            List<WorkEventParticipant> participants
    ) {
        double avgActivity = average(summaries.stream()
                .map(EmployeeDiagnosticSummaryDto::activityPercent)
                .toList());
        double avgEngagement = average(summaries.stream()
                .map(EmployeeDiagnosticSummaryDto::engagementPercent)
                .toList());
        double avgRisk = average(summaries.stream()
                .map(EmployeeDiagnosticSummaryDto::riskScore)
                .toList());
        long highRiskCount = summaries.stream()
                .filter(summary -> summary.severity() == RiskLevel.HIGH
                        || summary.severity() == RiskLevel.CRITICAL)
                .count();

        return List.of(
                new DashboardKpiDto(
                        DashboardKpiKey.ACTIVITY_PERCENT,
                        "Средняя активность",
                        round(avgActivity),
                        "%",
                        0,
                        "по команде"
                ),
                new DashboardKpiDto(
                        DashboardKpiKey.ENGAGEMENT_PERCENT,
                        "Средняя вовлечённость",
                        round(avgEngagement),
                        "%",
                        0,
                        "по команде"
                ),
                new DashboardKpiDto(
                        DashboardKpiKey.MEETINGS_COUNT,
                        "Встречи",
                        countUniqueMeetings(participants),
                        null,
                        0,
                        "за выбранный период"
                ),
                new DashboardKpiDto(
                        DashboardKpiKey.AVERAGE_RISK_SCORE,
                        "Средний риск",
                        round(avgRisk),
                        "%",
                        0,
                        "по команде"
                ),
                new DashboardKpiDto(
                        DashboardKpiKey.HIGH_RISK_EMPLOYEES_COUNT,
                        "Высокий риск",
                        highRiskCount,
                        null,
                        0,
                        "сотрудников"
                )
        );
    }

    private List<RiskDistributionItemDto> buildRiskDistribution(
            List<EmployeeDiagnosticSummaryDto> summaries
    ) {
        return List.of(
                new RiskDistributionItemDto(RiskLevel.CRITICAL, "Критический", countByRisk(summaries, RiskLevel.CRITICAL)),
                new RiskDistributionItemDto(RiskLevel.HIGH, "Высокий", countByRisk(summaries, RiskLevel.HIGH)),
                new RiskDistributionItemDto(RiskLevel.MEDIUM, "Средний", countByRisk(summaries, RiskLevel.MEDIUM)),
                new RiskDistributionItemDto(RiskLevel.LOW, "Низкий", countByRisk(summaries, RiskLevel.LOW))
        );
    }

    private List<RecommendationDto> buildRecommendations(
            List<EmployeeDiagnosticSummaryDto> summaries,
            UUID teamId
    ) {
        return summaries.stream()
                .filter(summary -> summary.severity() == RiskLevel.HIGH
                        || summary.severity() == RiskLevel.CRITICAL)
                .limit(5)
                .map(summary -> new RecommendationDto(
                        "rec-employee-" + summary.employee().id(),
                        summary.severity() == RiskLevel.CRITICAL
                                ? RecommendationPriority.CRITICAL
                                : RecommendationPriority.HIGH,
                        "Проверить график сотрудника",
                        "У сотрудника обнаружены признаки низкой доступности или вовлечённости.",
                        summary.mainReason(),
                        List.of(
                                "activityPercent=" + summary.activityPercent(),
                                "engagementPercent=" + summary.engagementPercent(),
                                "attendanceRate=" + summary.attendanceRate(),
                                "riskScore=" + summary.riskScore()
                        ),
                        "employee",
                        summary.employee().id(),
                        teamId,
                        null,
                        Instant.now()
                ))
                .toList();
    }

    private List<MeetingAttendanceDto> buildMeetingDtos(
            List<WorkEventParticipant> participants
    ) {
        Map<UUID, WorkEvent> eventsById = new LinkedHashMap<>();

        for (WorkEventParticipant participant : participants) {
            WorkEvent event = participant.getEvent();
            if (event != null) {
                eventsById.putIfAbsent(event.getId(), event);
            }
        }

        return eventsById.values()
                .stream()
                .sorted(Comparator.comparing(WorkEvent::getStartAt))
                .map(event -> {
                    List<MeetingAttendanceParticipantDto> participantDtos = participantRepository
                            .findByEvent_Id(event.getId())
                            .stream()
                            .map(this::toMeetingParticipantDto)
                            .toList();

                    return new MeetingAttendanceDto(
                            event.getId(),
                            event.getTitle(),
                            event.getDescription(),
                            event.getStartAt(),
                            event.getEndAt(),
                            event.getEventType(),
                            event.getStatus(),
                            participantDtos
                    );
                })
                .toList();
    }

    private MeetingAttendanceParticipantDto toMeetingParticipantDto(
            WorkEventParticipant participant
    ) {
        boolean attended = participant.getAttendanceStatus() == AttendanceStatus.PRESENT
                || participant.getAttendanceStatus() == AttendanceStatus.LATE
                || participant.getAttendanceStatus() == AttendanceStatus.PARTIAL;

        long attendanceMinutes = 0;

        if (participant.getJoinedAt() != null && participant.getLeftAt() != null) {
            attendanceMinutes = Duration.between(
                    participant.getJoinedAt(),
                    participant.getLeftAt()
            ).toMinutes();
        }

        return new MeetingAttendanceParticipantDto(
                toEmployeeShort(participant.getEmployee()),
                participant.getAttendanceStatus(),
                attended,
                participant.getJoinedAt(),
                participant.getLeftAt(),
                Math.max(attendanceMinutes, 0)
        );
    }

    private EmployeeHourlyActivityDto toActivityDto(EmployeeActivitySnapshot snapshot) {
        return new EmployeeHourlyActivityDto(
                snapshot.getId(),
                toEmployeeShort(snapshot.getEmployee()),
                snapshot.getStartAt(),
                snapshot.getEndAt(),
                snapshot.getActivityType(),
                snapshot.getActivityPercent(),
                snapshot.getEngagementPercent(),
                snapshot.getTitle(),
                snapshot.getDescription()
        );
    }

    private EmployeeResponse toEmployeeResponse(Employee employee) {
        WorkSchedule schedule = employee.getWorkSchedule();

        WorkScheduleResponse scheduleResponse = null;
        if (schedule != null) {
            scheduleResponse = new WorkScheduleResponse(
                    schedule.getWorkingDays(),
                    schedule.getStartTime(),
                    schedule.getEndTime(),
                    schedule.getTimezone(),
                    schedule.getWorkFormat(),
                    schedule.getLastUpdatedAt(),
                    schedule.getConfirmedAt()
            );
        }

        return new EmployeeResponse(
                employee.getId(),
                employee.getTeam().getId(),
                employee.getFullName(),
                employee.getEmail(),
                employee.getRole(),
                employee.getAvatarUrl(),
                scheduleResponse,
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );
    }

    private EmployeeShortDto toEmployeeShort(Employee employee) {
        return new EmployeeShortDto(
                employee.getId(),
                employee.getFullName(),
                employee.getAvatarUrl()
        );
    }

    private double averageActivity(List<EmployeeActivitySnapshot> activity) {
        return average(activity.stream()
                .map(item -> (double) item.getActivityPercent())
                .toList());
    }

    private double averageEngagement(List<EmployeeActivitySnapshot> activity) {
        return average(activity.stream()
                .map(item -> (double) item.getEngagementPercent())
                .toList());
    }

    private double calculateAttendanceRate(List<WorkEventParticipant> participants) {
        if (participants.isEmpty()) {
            return 100;
        }

        long attended = participants.stream()
                .filter(participant -> participant.getAttendanceStatus() == AttendanceStatus.PRESENT
                        || participant.getAttendanceStatus() == AttendanceStatus.LATE
                        || participant.getAttendanceStatus() == AttendanceStatus.PARTIAL)
                .count();

        return 100.0 * attended / participants.size();
    }

    private double calculateOutsideWorkingHoursRate(
            Employee employee,
            List<WorkEventParticipant> participants
    ) {
        if (participants.isEmpty()) {
            return 0;
        }

        long outside = participants.stream()
                .filter(participant -> !isInsideWorkingHours(employee, participant.getEvent()))
                .count();

        return 100.0 * outside / participants.size();
    }

    private boolean isInsideWorkingHours(Employee employee, WorkEvent event) {
        if (employee.getWorkSchedule() == null
                || employee.getWorkSchedule().getTimezone() == null
                || employee.getWorkSchedule().getStartTime() == null
                || employee.getWorkSchedule().getEndTime() == null
                || employee.getWorkSchedule().getWorkingDays() == null) {
            return false;
        }

        ZoneId zoneId = ZoneId.of(employee.getWorkSchedule().getTimezone());
        ZonedDateTime localStart = event.getStartAt().atZone(zoneId);
        ZonedDateTime localEnd = event.getEndAt().atZone(zoneId);

        if (!localStart.toLocalDate().equals(localEnd.toLocalDate())) {
            return false;
        }

        WeekDay weekDay = toWeekDay(localStart.getDayOfWeek());
        LocalTime startTime = localStart.toLocalTime();
        LocalTime endTime = localEnd.toLocalTime();

        return employee.getWorkSchedule().getWorkingDays().contains(weekDay)
                && !startTime.isBefore(employee.getWorkSchedule().getStartTime())
                && !endTime.isAfter(employee.getWorkSchedule().getEndTime());
    }

    private WeekDay toWeekDay(DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> WeekDay.MON;
            case TUESDAY -> WeekDay.TUE;
            case WEDNESDAY -> WeekDay.WED;
            case THURSDAY -> WeekDay.THU;
            case FRIDAY -> WeekDay.FRI;
            case SATURDAY -> WeekDay.SAT;
            case SUNDAY -> WeekDay.SUN;
        };
    }

    private String buildMainReason(
            double activityPercent,
            double engagementPercent,
            double attendanceRate,
            double outsideWorkingHoursRate
    ) {
        if (attendanceRate < 70) {
            return "Низкая посещаемость встреч";
        }
        if (outsideWorkingHoursRate > 30) {
            return "Часть встреч стоит вне рабочего времени";
        }
        if (engagementPercent < 60) {
            return "Сниженная вовлечённость в течение дня";
        }
        if (activityPercent < 60) {
            return "Сниженная активность по рабочим слотам";
        }
        return "Существенных проблем не обнаружено";
    }

    private String buildRecommendedAction(RiskLevel severity, String mainReason) {
        if (severity == RiskLevel.CRITICAL || severity == RiskLevel.HIGH) {
            return switch (mainReason) {
                case "Низкая посещаемость встреч" -> "Проверить причины пропусков встреч";
                case "Часть встреч стоит вне рабочего времени" -> "Обновить рабочий график или перенести встречи";
                case "Сниженная вовлечённость в течение дня" -> "Проверить нагрузку и распределение задач";
                case "Сниженная активность по рабочим слотам" -> "Уточнить фактический режим работы";
                default -> "Проверить профиль сотрудника";
            };
        }

        return "Действия не требуются";
    }

    private RiskLevel toRiskLevel(double riskScore) {
        if (riskScore >= 75) {
            return RiskLevel.CRITICAL;
        }
        if (riskScore >= 50) {
            return RiskLevel.HIGH;
        }
        if (riskScore >= 25) {
            return RiskLevel.MEDIUM;
        }
        return RiskLevel.LOW;
    }

    private int countByRisk(List<EmployeeDiagnosticSummaryDto> summaries, RiskLevel riskLevel) {
        return (int) summaries.stream()
                .filter(summary -> summary.severity() == riskLevel)
                .count();
    }

    private long countUniqueMeetings(List<WorkEventParticipant> participants) {
        return participants.stream()
                .map(participant -> participant.getEvent().getId())
                .distinct()
                .count();
    }

    private double average(List<Double> values) {
        if (values == null || values.isEmpty()) {
            return 0;
        }

        return values.stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0);
    }

    private double clamp100(double value) {
        if (value < 0) {
            return 0;
        }
        if (value > 100) {
            return 100;
        }
        return value;
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }

    private Instant toStartInstant(LocalDate date) {
        return date.atStartOfDay().toInstant(ZoneOffset.UTC);
    }

    private Instant toEndInstant(LocalDate date) {
        return date.plusDays(1).atStartOfDay().toInstant(ZoneOffset.UTC);
    }
}

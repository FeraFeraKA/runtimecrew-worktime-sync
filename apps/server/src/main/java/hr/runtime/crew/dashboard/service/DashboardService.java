package hr.runtime.crew.dashboard.service;


import hr.runtime.crew.dashboard.dto.ExpectedEffectDto;
import hr.runtime.crew.dashboard.dto.RecommendationDto;
import hr.runtime.crew.dashboard.dto.*;
import hr.runtime.crew.dashboard.model.enums.*;
import hr.runtime.crew.dashboard.model.enums.DashboardKpiKey;
import hr.runtime.crew.employee.dto.WorkSchedule;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.model.enums.WorkFormat;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.event.model.entity.WorkEvent;
import hr.runtime.crew.event.repository.WorkEventParticipantRepository;
import hr.runtime.crew.metrics.MetricsService;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final WorkEventParticipantRepository participantRepository;
    private final MetricsService metricsService;

    private static final double HIGH_RISK_THRESHOLD = 60.0;
    private static final double OVERLOAD_THRESHOLD = 0.8;
    private static final double TIMEZONE_WARNING_THRESHOLD = 0.3;

    public DashboardService(
            EmployeeRepository employeeRepository,
            WorkEventParticipantRepository participantRepository,
            MetricsService metricsService
    ) {
        this.employeeRepository = employeeRepository;
        this.participantRepository = participantRepository;
        this.metricsService = metricsService;
    }

    public DashboardResponse buildDashboard(Long teamId, LocalDate from, LocalDate to) {
        List<Employee> employees = employeeRepository.findByTeam_Id(teamId);
        Map<Employee, List<WorkEvent>> eventsByEmployee = loadEventsForPeriod(employees, from, to);

        List<DashboardKpiDto> kpis = calculateKpis(employees, eventsByEmployee, from, to);
        List<RiskDistributionItemDto> riskDistribution = calculateRiskDistribution(employees, eventsByEmployee, from, to);
        List<EmployeeDiagnosticSummaryDto> problematicEmployees = buildProblematicEmployees(employees, eventsByEmployee, from, to);
        List<RecommendationDto> topRecommendations = buildTopRecommendations(problematicEmployees);

        String teamName = employees.isEmpty() ? "Unknown" : employees.get(0).getTeam().getName();
        TeamDto teamDto = new TeamDto(teamId, teamName);
        PeriodDto periodDto = new PeriodDto(from, to);

        return new DashboardResponse(teamDto, periodDto, kpis, riskDistribution, problematicEmployees, topRecommendations);
    }

    private Map<Employee, List<WorkEvent>> loadEventsForPeriod(List<Employee> employees, LocalDate from, LocalDate to) {
        Instant fromInstant = from.atStartOfDay(ZoneOffset.UTC).toInstant();
        Instant toInstant = to.plusDays(1).atStartOfDay(ZoneOffset.UTC).toInstant();

        Map<Employee, List<WorkEvent>> result = new HashMap<>();

        for (Employee employee : employees) {
            List<WorkEvent> events = metricsService.getEmployeeEvents(employee.getId()).stream()
                    .filter(e -> !e.getStartAt().isBefore(fromInstant))
                    .filter(e -> e.getStartAt().isBefore(toInstant))
                    .collect(Collectors.toList());
            result.put(employee, events);
        }

        return result;
    }

    private List<DashboardKpiDto> calculateKpis(
            List<Employee> employees,
            Map<Employee, List<WorkEvent>> eventsByEmployee,
            LocalDate from,
            LocalDate to
    ) {
        if (employees.isEmpty()) {
            return emptyKpis();
        }

        double totalActuality = 0.0;
        double totalRisk = 0.0;
        int highRiskCount = 0;
        int totalConflicts = 0;
        int overloadedCount = 0;
        int timezoneConflictsCount = 0;

        for (Employee employee : employees) {
            List<WorkEvent> events = eventsByEmployee.getOrDefault(employee, Collections.emptyList());

            float actuality = metricsService.actualityScore(employee);
            float risk = calculateRiskForPeriod(employee, events, from, to);
            float conflictRatio = metricsService.workingTimeConflict(employee.getId());
            float load = calculateAverageLoad(employee, events, from, to);
            float timezoneScore = metricsService.timezoneSuspicionScore(employee, events);

            totalActuality += actuality;
            totalRisk += risk;
            totalConflicts += (int) (conflictRatio * events.size());

            if (risk > HIGH_RISK_THRESHOLD) highRiskCount++;
            if (load > OVERLOAD_THRESHOLD) overloadedCount++;
            if (timezoneScore > TIMEZONE_WARNING_THRESHOLD) timezoneConflictsCount++;
        }

        int employeeCount = employees.size();
        double avgActuality = (totalActuality / employeeCount) * 100;
        double avgRisk = totalRisk / employeeCount;

        return List.of(
                new DashboardKpiDto(DashboardKpiKey.TEAM_ACTUALITY_SCORE, "Актуальность команды", avgActuality, "%", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.AVERAGE_RISK_SCORE, "Средний риск", avgRisk, "%", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.HIGH_RISK_EMPLOYEES_COUNT, "Высокий риск", highRiskCount, "", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.CONFLICTS_COUNT, "Конфликты", totalConflicts, "", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.OVERLOADED_EMPLOYEES_COUNT, "Перегруженные сотрудники", overloadedCount, "", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.TIMEZONE_CONFLICTS_COUNT, "Конфликты часовых поясов", timezoneConflictsCount, "", 0, "")
        );
    }

    private List<DashboardKpiDto> emptyKpis() {
        return List.of(
                new DashboardKpiDto(DashboardKpiKey.TEAM_ACTUALITY_SCORE, "Актуальность команды", 0, "%", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.AVERAGE_RISK_SCORE, "Средний риск", 0, "%", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.HIGH_RISK_EMPLOYEES_COUNT, "Высокий риск", 0, "", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.CONFLICTS_COUNT, "Конфликты", 0, "", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.OVERLOADED_EMPLOYEES_COUNT, "Перегруженные сотрудники", 0, "", 0, ""),
                new DashboardKpiDto(DashboardKpiKey.TIMEZONE_CONFLICTS_COUNT, "Конфликты часовых поясов", 0, "", 0, "")
        );
    }

    private float calculateRiskForPeriod(Employee employee, List<WorkEvent> events, LocalDate from, LocalDate to) {
        WorkSchedule schedule = employee.getWorkSchedule();
        if (schedule == null) return 0.0f;

        LocalTime workStart = schedule.getStartTime();
        LocalTime workEnd = schedule.getEndTime();
        if (workStart == null || workEnd == null) return 0.0f;

        float totalRisk = 0.0f;
        int daysWithEvents = 0;

        for (LocalDate date = from; !date.isAfter(to); date = date.plusDays(1)) {
            List<WorkEvent> dayEvents = filterEventsByDate(events, date, employee);
            if (!dayEvents.isEmpty()) {
                float risk = metricsService.riskScore(employee, dayEvents, workStart, workEnd);
                totalRisk += risk;
                daysWithEvents++;
            }
        }

        if (daysWithEvents == 0) return 0.0f;
        return totalRisk / daysWithEvents;
    }

    private float calculateAverageLoad(Employee employee, List<WorkEvent> events, LocalDate from, LocalDate to) {
        WorkSchedule schedule = employee.getWorkSchedule();
        if (schedule == null) return 0.0f;

        LocalTime workStart = schedule.getStartTime();
        LocalTime workEnd = schedule.getEndTime();
        if (workStart == null || workEnd == null) return 0.0f;

        float totalLoad = 0.0f;
        int daysWithEvents = 0;

        for (LocalDate date = from; !date.isAfter(to); date = date.plusDays(1)) {
            List<WorkEvent> dayEvents = filterEventsByDate(events, date, employee);
            if (!dayEvents.isEmpty()) {
                float load = metricsService.loadRate(employee, dayEvents, workStart, workEnd);
                totalLoad += load;
                daysWithEvents++;
            }
        }

        if (daysWithEvents == 0) return 0.0f;
        return totalLoad / daysWithEvents;
    }

    private List<WorkEvent> filterEventsByDate(List<WorkEvent> events, LocalDate date, Employee employee) {
        ZoneId zone = ZoneId.of(employee.getWorkSchedule().getTimezone());
        return events.stream()
                .filter(e -> {
                    ZonedDateTime localStart = e.getStartAt().atZone(zone);
                    return localStart.toLocalDate().equals(date);
                })
                .collect(Collectors.toList());
    }

    private List<RiskDistributionItemDto> calculateRiskDistribution(
            List<Employee> employees,
            Map<Employee, List<WorkEvent>> eventsByEmployee,
            LocalDate from,
            LocalDate to
    ) {
        int critical = 0, high = 0, medium = 0, low = 0;

        for (Employee employee : employees) {
            List<WorkEvent> events = eventsByEmployee.getOrDefault(employee, Collections.emptyList());
            float risk = calculateRiskForPeriod(employee, events, from, to);
            String status = metricsService.getRiskStatus(risk);

            switch (status) {
                case "critical" -> critical++;
                case "high" -> high++;
                case "medium" -> medium++;
                default -> low++;
            }
        }

        return List.of(
                new RiskDistributionItemDto(RiskDistributionKey.CRITICAL, critical),
                new RiskDistributionItemDto(RiskDistributionKey.HIGH, high),
                new RiskDistributionItemDto(RiskDistributionKey.MEDIUM, medium),
                new RiskDistributionItemDto(RiskDistributionKey.LOW, low)
        );
    }

    private List<EmployeeDiagnosticSummaryDto> buildProblematicEmployees(
            List<Employee> employees,
            Map<Employee, List<WorkEvent>> eventsByEmployee,
            LocalDate from,
            LocalDate to
    ) {
        List<EmployeeDiagnosticSummaryDto> result = new ArrayList<>();

        for (Employee employee : employees) {
            List<WorkEvent> events = eventsByEmployee.getOrDefault(employee, Collections.emptyList());
            float risk = calculateRiskForPeriod(employee, events, from, to);

            if (risk > HIGH_RISK_THRESHOLD) {
                result.add(buildEmployeeSummary(employee, events, from, to));
            }
        }

        result.sort((a, b) -> Double.compare(b.riskScore(), a.riskScore()));
        return result;
    }

    private EmployeeDiagnosticSummaryDto buildEmployeeSummary(Employee employee, List<WorkEvent> events, LocalDate from, LocalDate to) {
        WorkSchedule schedule = employee.getWorkSchedule();

        float actuality = metricsService.actualityScore(employee) * 100;
        float risk = calculateRiskForPeriod(employee, events, from, to);
        float conflictRatio = metricsService.workingTimeConflict(employee.getId());
        float load = calculateAverageLoad(employee, events, from, to);
        long daysSinceUpdate = metricsService.daysSinceLastUpdate(employee);
        float timezoneScore = metricsService.timezoneSuspicionScore(employee, events);

        int conflictsCount = (int) (conflictRatio * events.size());

        String mainReason;
        String recommendedAction;
        String status;

        if (daysSinceUpdate >= 90) {
            mainReason = "График давно не обновлялся";
            recommendedAction = "Попросить сотрудника подтвердить график";
            status = "outdated";
        } else if (conflictRatio >= 0.4f) {
            mainReason = String.format("%.0f%% встреч вне рабочего графика", conflictRatio * 100);
            recommendedAction = "Обновить рабочие часы";
            status = "outside_work_hours";
        } else if (load >= 0.8f) {
            mainReason = String.format("Перегрузка: загрузка %.0f%%", load * 100);
            recommendedAction = "Снизить количество встреч, добавить focus time";
            status = "overloaded";
        } else if (timezoneScore >= 0.3f) {
            mainReason = String.format("%.0f%% встреч проходят ночью", timezoneScore * 100);
            recommendedAction = "Проверить часовой пояс";
            status = "timezone_conflict";
        } else {
            mainReason = "Высокий интегральный риск";
            recommendedAction = "Провести диагностику графика";
            status = "high_risk";
        }

        Severity severity = risk > 80 ? Severity.CRITICAL : (risk > 60 ? Severity.HIGH : Severity.MEDIUM);

        EmployeeShortDto shortDto = new EmployeeShortDto(
                employee.getId(),
                employee.getFullName(),
                employee.getAvatarUrl()
        );

        return new EmployeeDiagnosticSummaryDto(
                shortDto,
                employee.getRole(),
                employee.getRole(),
                schedule.getTimezone(),
                formatTimezoneLabel(schedule.getTimezone()),
                schedule.getWorkFormat(),
                formatWorkFormatLabel(schedule.getWorkFormat()),
                actuality,
                risk,
                severity,
                severity == Severity.CRITICAL ? "Критический" : (severity == Severity.HIGH ? "Высокий" : "Средний"),
                mainReason,
                recommendedAction,
                daysSinceUpdate,
                conflictsCount,
                load,
                status,
                formatStatusLabel(status)
        );
    }

    private List<RecommendationDto> buildTopRecommendations(List<EmployeeDiagnosticSummaryDto> problematicEmployees) {
        List<RecommendationDto> recommendations = new ArrayList<>();

        for (int i = 0; i < Math.min(problematicEmployees.size(), 3); i++) {
            EmployeeDiagnosticSummaryDto emp = problematicEmployees.get(i);
            recommendations.add(createEmployeeRecommendation(emp));
        }

        if (recommendations.isEmpty()) {
            recommendations.add(createDefaultRecommendation());
        }

        return recommendations;
    }

    private RecommendationDto createEmployeeRecommendation(EmployeeDiagnosticSummaryDto emp) {
        return new RecommendationDto(
                UUID.randomUUID(),
                RecommendationPriority.valueOf(emp.severity().name()),
                emp.severityLabel(),
                emp.recommendedAction(),
                emp.mainReason(),
                emp.mainReason(),
                List.of(
                        String.format("Риск: %.0f%%", emp.riskScore()),
                        String.format("Актуальность: %.0f%%", emp.actualityScore()),
                        String.format("Дней с последнего обновления: %d", emp.daysSinceLastUpdate())
                ),
                new RecommendationTargetDto(RecommendationTargetType.EMPLOYEE, "Сотрудник", emp.employee().id(), null, null, null),
                emp.recommendedAction(),
                new ExpectedEffectDto(15.0, -22.0, -4, "Снизит риск и повысит актуальность"),
                Instant.now()
        );
    }

    private RecommendationDto createDefaultRecommendation() {
        return new RecommendationDto(
                UUID.randomUUID(),
                RecommendationPriority.MEDIUM,
                "Средний",
                "Провести командную встречу по актуализации графиков",
                "Рекомендуется регулярно обновлять рабочие графики",
                "Актуальность данных влияет на планирование встреч",
                List.of("Поддерживайте графики в актуальном состоянии"),
                new RecommendationTargetDto(RecommendationTargetType.TEAM, "Команда", null, null, null, null),
                "Провести встречу",
                new ExpectedEffectDto(5.0, -5.0, -1, "Повысит общую актуальность"),
                Instant.now()
        );
    }

    private String formatTimezoneLabel(String timezone) {
        if (timezone == null) return "UTC";
        if (timezone.equals("Europe/Moscow")) return "UTC +3";
        if (timezone.equals("Asia/Vladivostok")) return "UTC +10";
        if (timezone.equals("Europe/Samara")) return "UTC +4";
        return timezone;
    }

    private String formatWorkFormatLabel(WorkFormat format) {
        if (format == null) return "Не указан";
        return switch (format) {
            case OFFICE -> "Офис";
            case REMOTE -> "Удалённо";
            case HYBRID -> "Гибрид";
        };
    }

    private String formatStatusLabel(String status) {
        return switch (status) {
            case "outdated" -> "Необходимо обновить график";
            case "outside_work_hours" -> "Много встреч вне графика";
            case "overloaded" -> "Перегрузка встречами";
            case "timezone_conflict" -> "Конфликты часовых поясов";
            default -> "Требуется внимание";
        };
    }
}
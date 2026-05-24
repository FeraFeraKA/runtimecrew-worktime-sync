package hr.runtime.crew.conflict.service;

import hr.runtime.crew.conflict.dto.ConflictEmployeeShortDto;
import hr.runtime.crew.conflict.dto.ConflictQuickActionDto;
import hr.runtime.crew.conflict.dto.ConflictTableRowDto;
import hr.runtime.crew.conflict.dto.ConflictTypeSummaryDto;
import hr.runtime.crew.conflict.dto.ConflictsPageKpiDto;
import hr.runtime.crew.conflict.dto.ConflictsPageResponse;
import hr.runtime.crew.conflict.model.enums.ConflictStatus;
import hr.runtime.crew.conflict.model.enums.ConflictType;
import hr.runtime.crew.conflict.model.enums.ConflictsPageKpiKey;
import hr.runtime.crew.conflict.model.enums.Severity;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.team.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@Service
public class ConflictsMockService {

    private static final DateTimeFormatter DATE_LABEL_FORMATTER = DateTimeFormatter
            .ofPattern("d MMMM", Locale.forLanguageTag("ru"));

    private static final List<ConflictType> TYPE_PATTERN = List.of(
            ConflictType.EVENT_OUTSIDE_WORKING_HOURS,
            ConflictType.TIMEZONE_CONFLICT,
            ConflictType.SCHEDULE_CALENDAR_MISMATCH,
            ConflictType.EXCEPTION_CONFLICT,
            ConflictType.OVERLOAD_CONFLICT,
            ConflictType.WORK_FORMAT_MISMATCH
    );

    private static final List<Severity> SEVERITY_PATTERN = List.of(
            Severity.CRITICAL,
            Severity.HIGH,
            Severity.HIGH,
            Severity.MEDIUM,
            Severity.MEDIUM,
            Severity.LOW
    );

    private static final List<ConflictStatus> STATUS_PATTERN = List.of(
            ConflictStatus.OPEN,
            ConflictStatus.IN_PROGRESS,
            ConflictStatus.OPEN,
            ConflictStatus.RESOLVED
    );

    private final TeamRepository teamRepository;
    private final EmployeeRepository employeeRepository;

    public ConflictsMockService(
            TeamRepository teamRepository,
            EmployeeRepository employeeRepository
    ) {
        this.teamRepository = teamRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public ConflictsPageResponse getConflictsPage(
            UUID teamId,
            LocalDate from,
            LocalDate to,
            String type,
            String severity,
            String status,
            String search
    ) {
        if (!teamRepository.existsById(teamId)) {
            throw new RuntimeException("Team not found");
        }

        List<ConflictTableRowDto> conflicts = employeeRepository.findByTeam_Id(teamId)
                .stream()
                .map(employee -> buildConflict(teamId, from, employee))
                .filter(conflict -> matchesType(conflict, type))
                .filter(conflict -> matchesSeverity(conflict, severity))
                .filter(conflict -> matchesStatus(conflict, status))
                .filter(conflict -> matchesSearch(conflict, search))
                .toList();

        return new ConflictsPageResponse(
                buildKpis(conflicts),
                conflicts,
                buildTypeSummary(conflicts),
                buildQuickActions(conflicts)
        );
    }

    private ConflictTableRowDto buildConflict(
            UUID teamId,
            LocalDate from,
            Employee employee
    ) {
        int index = Math.abs(employee.getId().hashCode());
        ConflictType type = TYPE_PATTERN.get(index % TYPE_PATTERN.size());
        Severity severity = SEVERITY_PATTERN.get(index % SEVERITY_PATTERN.size());
        ConflictStatus status = STATUS_PATTERN.get(index % STATUS_PATTERN.size());
        LocalDate conflictDate = from.plusDays(index % 7L);

        return new ConflictTableRowDto(
                stableUuid("conflict", teamId, employee.getId(), type.getValue()),
                type,
                typeLabel(type),
                severity,
                severityLabel(severity),
                toEmployeeShort(employee),
                eventName(type),
                dateLabel(conflictDate, type),
                description(type, employee),
                recommendation(type),
                status,
                statusLabel(status)
        );
    }

    private List<ConflictsPageKpiDto> buildKpis(List<ConflictTableRowDto> conflicts) {
        int total = conflicts.size();
        int critical = countBySeverity(conflicts, Severity.CRITICAL);
        int outsideWorkingHours = countByType(conflicts, ConflictType.EVENT_OUTSIDE_WORKING_HOURS);
        int timezoneConflicts = countByType(conflicts, ConflictType.TIMEZONE_CONFLICT);
        int exceptions = countByType(conflicts, ConflictType.EXCEPTION_CONFLICT);

        return List.of(
                new ConflictsPageKpiDto(
                        ConflictsPageKpiKey.TOTAL_CONFLICTS,
                        "Всего конфликтов",
                        total,
                        0,
                        "за выбранный период"
                ),
                new ConflictsPageKpiDto(
                        ConflictsPageKpiKey.CRITICAL_CONFLICTS,
                        "Критические",
                        critical,
                        0,
                        "за выбранный период"
                ),
                new ConflictsPageKpiDto(
                        ConflictsPageKpiKey.OUTSIDE_WORKING_HOURS,
                        "Вне рабочего времени",
                        outsideWorkingHours,
                        0,
                        "за выбранный период"
                ),
                new ConflictsPageKpiDto(
                        ConflictsPageKpiKey.TIMEZONE_CONFLICTS,
                        "Часовые пояса",
                        timezoneConflicts,
                        0,
                        "за выбранный период"
                ),
                new ConflictsPageKpiDto(
                        ConflictsPageKpiKey.EXCEPTIONS,
                        "Исключения",
                        exceptions,
                        0,
                        "за выбранный период"
                )
        );
    }

    private List<ConflictTypeSummaryDto> buildTypeSummary(List<ConflictTableRowDto> conflicts) {
        Map<ConflictType, Integer> counts = new EnumMap<>(ConflictType.class);
        for (ConflictTableRowDto conflict : conflicts) {
            counts.merge(conflict.type(), 1, Integer::sum);
        }

        List<ConflictTypeSummaryDto> summary = new ArrayList<>();
        for (ConflictType conflictType : TYPE_PATTERN) {
            int count = counts.getOrDefault(conflictType, 0);
            if (count > 0) {
                summary.add(new ConflictTypeSummaryDto(
                        conflictType,
                        typeLabel(conflictType),
                        count
                ));
            }
        }
        return summary;
    }

    private List<ConflictQuickActionDto> buildQuickActions(List<ConflictTableRowDto> conflicts) {
        return conflicts.stream()
                .filter(conflict -> conflict.status() != ConflictStatus.RESOLVED)
                .limit(3)
                .map(conflict -> new ConflictQuickActionDto(
                        stableUuid("action", conflict.id(), conflict.employee().id()),
                        conflict.type(),
                        conflict.recommendation(),
                        conflict.employee().fullName()
                ))
                .toList();
    }

    private ConflictEmployeeShortDto toEmployeeShort(Employee employee) {
        return new ConflictEmployeeShortDto(
                employee.getId(),
                employee.getFullName(),
                employee.getAvatarUrl()
        );
    }

    private int countByType(List<ConflictTableRowDto> conflicts, ConflictType type) {
        return (int) conflicts.stream()
                .filter(conflict -> conflict.type() == type)
                .count();
    }

    private int countBySeverity(List<ConflictTableRowDto> conflicts, Severity severity) {
        return (int) conflicts.stream()
                .filter(conflict -> conflict.severity() == severity)
                .count();
    }

    private boolean matchesType(ConflictTableRowDto conflict, String type) {
        return isBlank(type) || conflict.type().getValue().equals(type);
    }

    private boolean matchesSeverity(ConflictTableRowDto conflict, String severity) {
        return isBlank(severity) || conflict.severity().getValue().equals(severity);
    }

    private boolean matchesStatus(ConflictTableRowDto conflict, String status) {
        return isBlank(status) || conflict.status().getValue().equals(status);
    }

    private boolean matchesSearch(ConflictTableRowDto conflict, String search) {
        if (isBlank(search)) {
            return true;
        }

        String normalizedSearch = search.toLowerCase(Locale.ROOT);
        return contains(conflict.employee().fullName(), normalizedSearch)
                || contains(conflict.event(), normalizedSearch)
                || contains(conflict.description(), normalizedSearch)
                || contains(conflict.recommendation(), normalizedSearch)
                || contains(conflict.typeLabel(), normalizedSearch)
                || contains(conflict.statusLabel(), normalizedSearch)
                || contains(conflict.severityLabel(), normalizedSearch);
    }

    private boolean contains(String value, String normalizedSearch) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(normalizedSearch);
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private UUID stableUuid(Object... values) {
        StringBuilder source = new StringBuilder();
        for (Object value : values) {
            source.append(value).append('|');
        }
        return UUID.nameUUIDFromBytes(source.toString().getBytes(StandardCharsets.UTF_8));
    }

    private String dateLabel(LocalDate date, ConflictType type) {
        String time = switch (type) {
            case EVENT_OUTSIDE_WORKING_HOURS -> "20:30";
            case TIMEZONE_CONFLICT -> "08:00";
            case SCHEDULE_CALENDAR_MISMATCH -> "18:30";
            case EXCEPTION_CONFLICT -> "11:00";
            case OVERLOAD_CONFLICT -> "16:00";
            case WORK_FORMAT_MISMATCH -> "10:30";
        };
        return capitalize(date.format(DATE_LABEL_FORMATTER)) + ", " + time;
    }

    private String capitalize(String value) {
        if (value == null || value.isBlank()) {
            return value;
        }
        return value.substring(0, 1).toUpperCase(Locale.ROOT) + value.substring(1);
    }

    private String eventName(ConflictType type) {
        return switch (type) {
            case EVENT_OUTSIDE_WORKING_HOURS -> "Weekly Sync";
            case TIMEZONE_CONFLICT -> "Daily Standup";
            case SCHEDULE_CALENDAR_MISMATCH -> "Sprint Review";
            case EXCEPTION_CONFLICT -> "Schedule Update";
            case OVERLOAD_CONFLICT -> "Planning Meeting";
            case WORK_FORMAT_MISMATCH -> "Office Day";
        };
    }

    private String description(ConflictType type, Employee employee) {
        String timezone = employee.getTimezone() == null ? "не указан" : employee.getTimezone();
        return switch (type) {
            case EVENT_OUTSIDE_WORKING_HOURS -> "Встреча назначена вне рабочего времени сотрудника";
            case TIMEZONE_CONFLICT -> "Регулярная встреча конфликтует с часовым поясом " + timezone;
            case SCHEDULE_CALENDAR_MISMATCH -> "Календарь не совпадает с подтверждённым рабочим графиком";
            case EXCEPTION_CONFLICT -> "В графике есть исключение, которое требует проверки";
            case OVERLOAD_CONFLICT -> "У сотрудника слишком высокая нагрузка в выбранный день";
            case WORK_FORMAT_MISMATCH -> "Формат события не совпадает с рабочим форматом сотрудника";
        };
    }

    private String recommendation(ConflictType type) {
        return switch (type) {
            case EVENT_OUTSIDE_WORKING_HOURS -> "Перенести встречу на рабочее время";
            case TIMEZONE_CONFLICT -> "Проверить timezone сотрудника";
            case SCHEDULE_CALENDAR_MISMATCH -> "Подтвердить рабочий график";
            case EXCEPTION_CONFLICT -> "Запросить обновление графика";
            case OVERLOAD_CONFLICT -> "Снизить нагрузку на день";
            case WORK_FORMAT_MISMATCH -> "Проверить формат работы";
        };
    }

    private String typeLabel(ConflictType type) {
        return switch (type) {
            case EVENT_OUTSIDE_WORKING_HOURS -> "Вне рабочего времени";
            case SCHEDULE_CALENDAR_MISMATCH -> "Несовпадение графика и календаря";
            case TIMEZONE_CONFLICT -> "Конфликт часового пояса";
            case EXCEPTION_CONFLICT -> "Исключения";
            case OVERLOAD_CONFLICT -> "Перегрузка";
            case WORK_FORMAT_MISMATCH -> "Формат работы";
        };
    }

    private String severityLabel(Severity severity) {
        return switch (severity) {
            case LOW -> "Низкий";
            case MEDIUM -> "Средний";
            case HIGH -> "Высокий";
            case CRITICAL -> "Критический";
        };
    }

    private String statusLabel(ConflictStatus status) {
        return switch (status) {
            case OPEN -> "Открыт";
            case IN_PROGRESS -> "В работе";
            case RESOLVED -> "Решён";
        };
    }
}

package hr.runtime.crew.metrics;

import hr.runtime.crew.employee.dto.WorkSchedule;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.model.enums.WeekDay;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.event.model.entity.WorkEvent;
import hr.runtime.crew.event.model.entity.WorkEventParticipant;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.enums.EventType;
import hr.runtime.crew.event.repository.WorkEventParticipantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DateTimeException;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import hr.runtime.crew.employee.model.enums.WorkFormat;
import hr.runtime.crew.event.model.enums.AttendanceStatus;

import java.util.HashSet;
import java.util.Set;

@Service
public class MetricsService {
    private static final int MAX_ALLOWED_DAYS = 90;

    private static final int DEFAULT_SWITCH_PENALTY_MINUTES = 15;
    private static final int DEFAULT_FOCUS_TASK_MINUTES = 30;

    private static final int TIMEZONE_ANALYSIS_PERIOD_DAYS = 30;
    private static final int MIN_TIMEZONE_EVENTS = 20;
    private static final LocalTime NIGHT_START_TIME = LocalTime.MIDNIGHT;
    private static final LocalTime NIGHT_END_TIME = LocalTime.of(6, 0);

    private static final int WORK_FORMAT_OFFICE_WINDOW_DAYS = 30;
    private static final int WORK_FORMAT_REMOTE_WINDOW_DAYS = 30;
    private static final int WORK_FORMAT_HYBRID_REMOTE_WINDOW_DAYS = 60;
    private static final int WORK_FORMAT_HYBRID_OFFICE_WINDOW_DAYS = 30;

    private static final float NORMAL_SCORE = 0.0f;
    private static final float WARNING_SCORE = 0.5f;
    private static final float ACTION_REQUIRED_SCORE = 1.0f;
    private static final float NO_DATA_RATIO = -1.0f;

    private final EmployeeRepository employeeRepository;
    private final WorkEventParticipantRepository participantRepository;

    public MetricsService(
            EmployeeRepository employeeRepository,
            WorkEventParticipantRepository participantRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.participantRepository = participantRepository;
    }

    @Transactional(readOnly = true)
    public float workingTimeConflict(Long employeeId) {
        Employee employee = getEmployee(employeeId);
        List<WorkEvent> meetings = getEmployeeMeetings(employeeId);

        return calculateWorkingTimeConflict(employee, meetings);
    }

    @Transactional(readOnly = true)
    public float scheduleActuality(Long employeeId) {
        Employee employee = getEmployee(employeeId);
        WorkSchedule schedule = employee.getWorkSchedule();

        if (schedule == null || schedule.getLastUpdatedAt() == null) {
            return 0;
        }

        long daysAfterUpdate = ChronoUnit.DAYS.between(
                schedule.getLastUpdatedAt(),
                Instant.now()
        );

        if (daysAfterUpdate < 0) {
            daysAfterUpdate = 0;
        }

        float conflictCoefficient = calculateWorkingTimeConflict(
                employee,
                getEmployeeMeetings(employeeId)
        );

        float actuality = 1 - ((float) daysAfterUpdate / MAX_ALLOWED_DAYS)
                * (1 + conflictCoefficient);

        return clamp(actuality);
    }

    @Transactional(readOnly = true)
    public float overloadScore(Long employeeId) {
        Employee employee = getEmployee(employeeId);
        WorkSchedule schedule = employee.getWorkSchedule();

        if (!isScheduleUsable(schedule)) {
            return 1;
        }

        ZoneId zoneId = resolveZoneId(schedule);

        if (zoneId == null) {
            return 1;
        }

        LocalDate currentDate = LocalDate.now(zoneId);

        List<WorkEvent> todayMeetings = getEmployeeMeetings(employeeId)
                .stream()
                .filter(meeting -> isEventOnDate(meeting, currentDate, zoneId))
                .toList();

        return calculateOverload(schedule, todayMeetings, zoneId, currentDate);
    }

    @Transactional(readOnly = true)
    public float timezoneActualityCoefficient(Long employeeId) {
        Employee employee = getEmployee(employeeId);
        WorkSchedule schedule = employee.getWorkSchedule();

        if (schedule == null
                || schedule.getTimezone() == null
                || schedule.getTimezone().isBlank()) {
            return 1;
        }

        ZoneId zoneId = resolveZoneId(schedule);

        if (zoneId == null) {
            return 1;
        }

        Instant now = Instant.now();
        Instant periodStart = now.minus(
                TIMEZONE_ANALYSIS_PERIOD_DAYS,
                ChronoUnit.DAYS
        );

        List<WorkEvent> events = getEmployeeEvents(employeeId)
                .stream()
                .filter(event -> !event.getStartAt().isBefore(periodStart))
                .filter(event -> !event.getStartAt().isAfter(now))
                .toList();

        int totalEvents = events.size();

        if (totalEvents <= MIN_TIMEZONE_EVENTS) {
            return 0;
        }

        int nightEvents = 0;

        for (WorkEvent event : events) {
            if (isEventStartedAtNight(event, zoneId)) {
                nightEvents++;
            }
        }

        return clamp((float) nightEvents / totalEvents);
    }

    public long daysSinceLastUpdate(Employee employee) {
        WorkSchedule schedule = employee.getWorkSchedule();
        if (schedule == null || schedule.getLastUpdatedAt() == null) {
            return MAX_ALLOWED_DAYS;
        }
        long days = ChronoUnit.DAYS.between(schedule.getLastUpdatedAt(), Instant.now());
        return days < 0 ? 0 : days;
    }

    public float actualityScore(Employee employee) {
        return scheduleActuality(employee.getId());
    }

    public float loadRate(Employee employee, List<WorkEvent> dayEvents, LocalTime workStart, LocalTime workEnd) {
        if (dayEvents.isEmpty()) return 0.0f;

        long workMinutes = Duration.between(workStart, workEnd).toMinutes();
        if (workMinutes <= 0) return 1.0f;

        long busyMinutes = dayEvents.stream()
                .mapToLong(e -> Duration.between(e.getStartAt(), e.getEndAt()).toMinutes())
                .sum();

        if (busyMinutes >= workMinutes) return 1.0f;

        float freeMinutes = workMinutes - busyMinutes;
        int meetingsCount = dayEvents.size();

        float timePenalty = meetingsCount * DEFAULT_SWITCH_PENALTY_MINUTES
                * (1 + (meetingsCount * DEFAULT_FOCUS_TASK_MINUTES) / freeMinutes);

        float overload = (busyMinutes + timePenalty) / workMinutes;
        return clamp(overload);
    }

    public float timezoneSuspicionScore(Employee employee, List<WorkEvent> events) {
        if (events.size() < MIN_TIMEZONE_EVENTS) return 0.0f;

        WorkSchedule schedule = employee.getWorkSchedule();
        if (schedule == null || schedule.getTimezone() == null) return 0.0f;

        ZoneId zone = resolveZoneId(schedule);
        if (zone == null) return 0.0f;

        long nightEvents = events.stream()
                .filter(e -> isEventStartedAtNight(e, zone))
                .count();

        return (float) nightEvents / events.size();
    }

    public float riskScore(Employee employee, List<WorkEvent> dayEvents, LocalTime workStart, LocalTime workEnd) {
        float Ai = scheduleActuality(employee.getId());
        float Ci = workingTimeConflict(employee.getId());
        float Li = loadRate(employee, dayEvents, workStart, workEnd);
        float Zi = timezoneSuspicionScore(employee, dayEvents);
        float Hi = workFormatScore(employee.getId());

        float w1 = 0.35f;
        float w2 = 0.10f;
        float w3 = 0.10f;
        float w4 = 0.10f;
        float w5 = 0.35f;

        float Ri = w1 * (1 - Ai) + w2 * Ci + w3 * Li + w4 * Zi + w5 * Hi;

        return clamp(Ri) * 100;
    }

    public String getRiskStatus(double riskScore) {
        if (riskScore <= 30) return "low";
        if (riskScore <= 60) return "medium";
        if (riskScore <= 80) return "high";
        return "critical";
    }


    private Employee getEmployee(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    private List<WorkEvent> getEmployeeMeetings(Long employeeId) {
        return getEmployeeEvents(employeeId)
                .stream()
                .filter(event -> event.getEventType() == EventType.MEETING)
                .toList();
    }

    public List<WorkEvent> getEmployeeEvents(Long employeeId) {
        return participantRepository.findByEmployee_Id(employeeId)
                .stream()
                .map(WorkEventParticipant::getEvent)
                .filter(this::isActiveEvent)
                .toList();
    }

    private boolean isActiveEvent(WorkEvent event) {
        return event != null
                && event.getStartAt() != null
                && event.getEndAt() != null
                && event.getEndAt().isAfter(event.getStartAt())
                && event.getStatus() != EventStatus.CANCELLED;
    }

    private float calculateWorkingTimeConflict(
            Employee employee,
            List<WorkEvent> meetings
    ) {
        if (meetings.isEmpty()) {
            return 0;
        }

        WorkSchedule schedule = employee.getWorkSchedule();

        if (!isScheduleUsable(schedule)) {
            return 1;
        }

        ZoneId zoneId = resolveZoneId(schedule);

        if (zoneId == null) {
            return 1;
        }

        int outsideWorkingTimeCount = 0;

        for (WorkEvent meeting : meetings) {
            if (!isMeetingInsideWorkingTime(meeting, schedule, zoneId)) {
                outsideWorkingTimeCount++;
            }
        }

        return (float) outsideWorkingTimeCount / meetings.size();
    }

    private float calculateOverload(
            WorkSchedule schedule,
            List<WorkEvent> meetings,
            ZoneId zoneId,
            LocalDate currentDate
    ) {
        if (meetings.isEmpty()) {
            return 0;
        }

        WeekDay currentWeekDay = toWeekDay(currentDate.getDayOfWeek());

        if (!schedule.getWorkingDays().contains(currentWeekDay)) {
            return 1;
        }

        long workMinutes = Duration.between(
                schedule.getStartTime(),
                schedule.getEndTime()
        ).toMinutes();

        if (workMinutes <= 0) {
            return 1;
        }

        long busyMinutes = 0;

        for (WorkEvent meeting : meetings) {
            ZonedDateTime start = meeting.getStartAt().atZone(zoneId);
            ZonedDateTime end = meeting.getEndAt().atZone(zoneId);

            busyMinutes += Duration.between(start, end).toMinutes();
        }

        if (busyMinutes >= workMinutes) {
            return 1;
        }

        float freeMinutes = workMinutes - busyMinutes;

        if (freeMinutes <= 0) {
            return 1;
        }

        int meetingsCount = meetings.size();

        float timePenalty = meetingsCount * DEFAULT_SWITCH_PENALTY_MINUTES
                * (1 + (meetingsCount * DEFAULT_FOCUS_TASK_MINUTES) / freeMinutes);

        float overload = (busyMinutes + timePenalty) / workMinutes;

        return clamp(overload);
    }

    private boolean isMeetingInsideWorkingTime(
            WorkEvent meeting,
            WorkSchedule schedule,
            ZoneId zoneId
    ) {
        ZonedDateTime localStart = meeting.getStartAt().atZone(zoneId);
        ZonedDateTime localEnd = meeting.getEndAt().atZone(zoneId);

        if (!localStart.toLocalDate().equals(localEnd.toLocalDate())) {
            return false;
        }

        WeekDay meetingDay = toWeekDay(localStart.getDayOfWeek());

        if (!schedule.getWorkingDays().contains(meetingDay)) {
            return false;
        }

        LocalTime meetingStartTime = localStart.toLocalTime();
        LocalTime meetingEndTime = localEnd.toLocalTime();

        return !meetingStartTime.isBefore(schedule.getStartTime())
                && !meetingEndTime.isAfter(schedule.getEndTime());
    }

    private boolean isEventOnDate(
            WorkEvent event,
            LocalDate date,
            ZoneId zoneId
    ) {
        LocalDate eventDate = event.getStartAt()
                .atZone(zoneId)
                .toLocalDate();

        return eventDate.equals(date);
    }

    private boolean isEventStartedAtNight(
            WorkEvent event,
            ZoneId zoneId
    ) {
        LocalTime eventStartTime = event.getStartAt()
                .atZone(zoneId)
                .toLocalTime();

        return !eventStartTime.isBefore(NIGHT_START_TIME)
                && eventStartTime.isBefore(NIGHT_END_TIME);
    }

    private boolean isScheduleUsable(WorkSchedule schedule) {
        return schedule != null
                && schedule.getTimezone() != null
                && !schedule.getTimezone().isBlank()
                && schedule.getStartTime() != null
                && schedule.getEndTime() != null
                && schedule.getWorkingDays() != null
                && !schedule.getWorkingDays().isEmpty();
    }

    private ZoneId resolveZoneId(WorkSchedule schedule) {
        try {
            return ZoneId.of(schedule.getTimezone());
        } catch (DateTimeException exception) {
            return null;
        }
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

    private float clamp(float value) {
        if (value < 0) {
            return 0;
        }

        if (value > 1) {
            return 1;
        }

        return value;
    }

    public float workFormatScore(Long employeeId) {
        Employee employee = getEmployee(employeeId);
        WorkSchedule schedule = employee.getWorkSchedule();

        if (schedule == null || schedule.getWorkFormat() == null) {
            return ACTION_REQUIRED_SCORE;
        }

        ZoneId zoneId = resolveZoneId(schedule);

        if (zoneId == null) {
            return ACTION_REQUIRED_SCORE;
        }

        WorkFormat workFormat = schedule.getWorkFormat();

        return switch (workFormat) {
            case OFFICE -> calculateOfficeFormatScore(employeeId, zoneId);
            case REMOTE -> calculateRemoteFormatScore(employeeId, zoneId);
            case HYBRID -> calculateHybridFormatScore(employeeId, zoneId);
        };
    }

    private float calculateOfficeFormatScore(Long employeeId, ZoneId zoneId) {
        float officeRatio = calculateOfficePresenceRatio(
                employeeId,
                zoneId,
                WORK_FORMAT_OFFICE_WINDOW_DAYS
        );

        if (officeRatio == NO_DATA_RATIO) {
            return NORMAL_SCORE;
        }

        if (officeRatio < 0.2f) {
            return ACTION_REQUIRED_SCORE;
        }

        if (officeRatio < 0.5f) {
            return WARNING_SCORE;
        }

        return NORMAL_SCORE;
    }

    private float calculateRemoteFormatScore(Long employeeId, ZoneId zoneId) {
        float officeRatio = calculateOfficePresenceRatio(
                employeeId,
                zoneId,
                WORK_FORMAT_REMOTE_WINDOW_DAYS
        );

        if (officeRatio == NO_DATA_RATIO) {
            return NORMAL_SCORE;
        }

        if (officeRatio > 0.5f) {
            return ACTION_REQUIRED_SCORE;
        }

        if (officeRatio > 0.2f) {
            return WARNING_SCORE;
        }

        return NORMAL_SCORE;
    }

    private float calculateHybridFormatScore(Long employeeId, ZoneId zoneId) {
        float officeRatioForRemoteCheck = calculateOfficePresenceRatio(
                employeeId,
                zoneId,
                WORK_FORMAT_HYBRID_REMOTE_WINDOW_DAYS
        );

        float officeRatioForOfficeCheck = calculateOfficePresenceRatio(
                employeeId,
                zoneId,
                WORK_FORMAT_HYBRID_OFFICE_WINDOW_DAYS
        );

        if (officeRatioForRemoteCheck != NO_DATA_RATIO
                && officeRatioForRemoteCheck <= 0.1f) {
            return ACTION_REQUIRED_SCORE;
        }

        if (officeRatioForOfficeCheck != NO_DATA_RATIO
                && officeRatioForOfficeCheck >= 0.85f) {
            return ACTION_REQUIRED_SCORE;
        }

        return NORMAL_SCORE;
    }

    private float calculateOfficePresenceRatio(
            Long employeeId,
            ZoneId zoneId,
            int periodDays
    ) {
        Instant now = Instant.now();
        Instant periodStart = now.minus(periodDays, ChronoUnit.DAYS);

        List<WorkEventParticipant> participants = getActiveEmployeeParticipants(employeeId)
                .stream()
                .filter(participant -> isEventInPeriod(
                        participant.getEvent(),
                        periodStart,
                        now
                ))
                .toList();

        Set<LocalDate> activeWorkingDays = new HashSet<>();
        Set<LocalDate> officeDays = new HashSet<>();

        for (WorkEventParticipant participant : participants) {
            WorkEvent event = participant.getEvent();

            LocalDate eventDate = event.getStartAt()
                    .atZone(zoneId)
                    .toLocalDate();

            activeWorkingDays.add(eventDate);

            if (participant.getAttendanceStatus() == AttendanceStatus.PRESENT) {
                officeDays.add(eventDate);
            }
        }

        if (activeWorkingDays.isEmpty()) {
            return NO_DATA_RATIO;
        }

        return (float) officeDays.size() / activeWorkingDays.size();
    }

    private List<WorkEventParticipant> getActiveEmployeeParticipants(Long employeeId) {
        return participantRepository.findByEmployee_Id(employeeId)
                .stream()
                .filter(participant -> participant.getEvent() != null)
                .filter(participant -> isActiveEvent(participant.getEvent()))
                .toList();
    }

    private boolean isEventInPeriod(
            WorkEvent event,
            Instant periodStart,
            Instant periodEnd
    ) {
        return !event.getStartAt().isBefore(periodStart)
                && !event.getStartAt().isAfter(periodEnd);
    }
}
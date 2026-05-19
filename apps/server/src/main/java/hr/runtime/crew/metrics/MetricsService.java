package hr.runtime.crew.metrics;

import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.employee.model.enums.WeekDay;
import hr.runtime.crew.employee.dto.WorkSchedule;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.enums.EventType;
import hr.runtime.crew.event.model.entity.WorkEvent;
import hr.runtime.crew.event.model.entity.WorkEventParticipant;
import hr.runtime.crew.event.repository.WorkEventParticipantRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class MetricsService {
    private final EmployeeRepository employeeRepository;
    private final WorkEventParticipantRepository participantRepository;

    public MetricsService(
            EmployeeRepository employeeRepository,
            WorkEventParticipantRepository participantRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.participantRepository = participantRepository;
    }

    public float workingTimeConflict(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<WorkEventParticipant> participants =
                participantRepository.findByEmployee_Id(employeeId);

        List<WorkEvent> meetings = participants.stream()
                .map(WorkEventParticipant::getEvent)
                .filter(event -> event.getEventType() == EventType.MEETING)
                .filter(event -> event.getStatus() != EventStatus.CANCELLED)
                .toList();

        int totalMeetings = meetings.size();

        if (totalMeetings == 0) {
            return 0;
        }

        WorkSchedule schedule = employee.getWorkSchedule();

        if (schedule == null) {
            return 1;
        }

        int outsideWorkingTimeCount = 0;

        for (WorkEvent meeting : meetings) {
            if (!isMeetingInsideWorkingTime(meeting, schedule)) {
                outsideWorkingTimeCount++;
            }
        }

        return (float) outsideWorkingTimeCount / totalMeetings;
    }

    private boolean isMeetingInsideWorkingTime(WorkEvent meeting, WorkSchedule schedule) {
        if (schedule.getTimezone() == null
                || schedule.getStartTime() == null
                || schedule.getEndTime() == null
                || schedule.getWorkingDays() == null
                || schedule.getWorkingDays().isEmpty()) {
            return false;
        }

        ZoneId zoneId = ZoneId.of(schedule.getTimezone());

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
}

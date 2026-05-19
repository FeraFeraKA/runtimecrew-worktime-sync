package hr.runtime.crew.availability;

import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.employee.model.enums.WeekDay;
import hr.runtime.crew.employee.dto.WorkSchedule;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.repository.WorkEventParticipantRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
public class AvailabilityService {

    private final EmployeeRepository employeeRepository;
    private final WorkEventParticipantRepository participantRepository;

    public AvailabilityService(
            EmployeeRepository employeeRepository,
            WorkEventParticipantRepository participantRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.participantRepository = participantRepository;
    }

    public boolean isEmployeeAvailable(Long employeeId, Instant timeStart, Instant timeEnd) {
        if (employeeId == null || timeStart == null || timeEnd == null) {
            return false;
        }

        if (!timeEnd.isAfter(timeStart)) {
            return false;
        }

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        WorkSchedule schedule = employee.getWorkSchedule();

        if (schedule == null) {
            return false;
        }

        if (schedule.getTimezone() == null
                || schedule.getStartTime() == null
                || schedule.getEndTime() == null
                || schedule.getWorkingDays() == null
                || schedule.getWorkingDays().isEmpty()) {
            return false;
        }

        ZoneId employeeZone = ZoneId.of(schedule.getTimezone());

        ZonedDateTime localStart = timeStart.atZone(employeeZone);
        ZonedDateTime localEnd = timeEnd.atZone(employeeZone);

        if (!localStart.toLocalDate().equals(localEnd.toLocalDate())) {
            return false;
        }

        WeekDay weekDay = toWeekDay(localStart.getDayOfWeek());

        if (!schedule.getWorkingDays().contains(weekDay)) {
            return false;
        }

        LocalTime localStartTime = localStart.toLocalTime();
        LocalTime localEndTime = localEnd.toLocalTime();

        if (localStartTime.isBefore(schedule.getStartTime())) {
            return false;
        }

        if (localEndTime.isAfter(schedule.getEndTime())) {
            return false;
        }

        boolean hasOverlappingEvent = participantRepository.existsOverlappingEvent(
                employeeId,
                timeStart,
                timeEnd,
                EventStatus.CANCELLED
        );

        return !hasOverlappingEvent;
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
package hr.runtime.crew.dashboard.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.runtime.crew.dashboard.dto.DashboardSyntheticImportResult;
import hr.runtime.crew.dashboard.dto.DashboardSyntheticSeedFile;
import hr.runtime.crew.dashboard.dto.EmployeeActivitySeedItem;
import hr.runtime.crew.dashboard.dto.MeetingParticipantSeedItem;
import hr.runtime.crew.dashboard.dto.MeetingSeedItem;
import hr.runtime.crew.dashboard.model.entity.EmployeeActivitySnapshot;
import hr.runtime.crew.dashboard.repository.EmployeeActivitySnapshotRepository;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.event.model.entity.EventAttendanceLog;
import hr.runtime.crew.event.model.enums.ParticipantRole;
import hr.runtime.crew.event.model.entity.WorkEvent;
import hr.runtime.crew.event.model.entity.WorkEventParticipant;
import hr.runtime.crew.event.model.enums.AttendanceAction;
import hr.runtime.crew.event.model.enums.AttendanceStatus;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.repository.EventAttendanceLogRepository;
import hr.runtime.crew.event.repository.WorkEventParticipantRepository;
import hr.runtime.crew.event.repository.WorkEventRepository;
import hr.runtime.crew.team.Team;
import hr.runtime.crew.team.TeamRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.Instant;

@Service
public class DashboardSyntheticDataService {

    private final ObjectMapper objectMapper;
    private final EmployeeRepository employeeRepository;
    private final TeamRepository teamRepository;
    private final WorkEventRepository eventRepository;
    private final WorkEventParticipantRepository participantRepository;
    private final EventAttendanceLogRepository attendanceLogRepository;
    private final EmployeeActivitySnapshotRepository activityRepository;

    public DashboardSyntheticDataService(
            ObjectMapper objectMapper,
            EmployeeRepository employeeRepository,
            TeamRepository teamRepository,
            WorkEventRepository eventRepository,
            WorkEventParticipantRepository participantRepository,
            EventAttendanceLogRepository attendanceLogRepository,
            EmployeeActivitySnapshotRepository activityRepository
    ) {
        this.objectMapper = objectMapper;
        this.employeeRepository = employeeRepository;
        this.teamRepository = teamRepository;
        this.eventRepository = eventRepository;
        this.participantRepository = participantRepository;
        this.attendanceLogRepository = attendanceLogRepository;
        this.activityRepository = activityRepository;
    }

    @Transactional
    public DashboardSyntheticImportResult importSyntheticData(String resourcePath) {
        DashboardSyntheticSeedFile seedFile = readSeedFile(resourcePath);

        int activityItemsSaved = saveActivity(seedFile);
        MeetingImportCounters meetingCounters = saveMeetings(seedFile);

        return new DashboardSyntheticImportResult(
                activityItemsSaved,
                meetingCounters.meetingsCreated(),
                meetingCounters.participantsCreated()
        );
    }

    private DashboardSyntheticSeedFile readSeedFile(String resourcePath) {
        try {
            ClassPathResource resource = new ClassPathResource(resourcePath);
            return objectMapper.readValue(
                    resource.getInputStream(),
                    DashboardSyntheticSeedFile.class
            );
        } catch (IOException exception) {
            throw new RuntimeException("Failed to read synthetic dashboard data", exception);
        }
    }

    private int saveActivity(DashboardSyntheticSeedFile seedFile) {
        int savedCount = 0;

        for (EmployeeActivitySeedItem item : seedFile.activity()) {
            Employee employee = employeeRepository.findByEmail(item.employeeEmail())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + item.employeeEmail()));

            EmployeeActivitySnapshot snapshot = new EmployeeActivitySnapshot(
                    employee,
                    item.startAt(),
                    item.endAt(),
                    item.activityType(),
                    item.activityPercent(),
                    item.engagementPercent(),
                    item.title(),
                    item.description()
            );

            activityRepository.save(snapshot);
            savedCount++;
        }

        return savedCount;
    }

    private MeetingImportCounters saveMeetings(DashboardSyntheticSeedFile seedFile) {
        int meetingsCreated = 0;
        int participantsCreated = 0;

        for (MeetingSeedItem item : seedFile.meetings()) {
            Team team = teamRepository.findById(item.teamId())
                    .orElseThrow(() -> new RuntimeException("Team not found: " + item.teamId()));

            WorkEvent event = new WorkEvent(
                    team,
                    item.title(),
                    item.description(),
                    item.startAt(),
                    item.endAt()
            );
            event.changeStatus(EventStatus.COMPLETED);

            WorkEvent savedEvent = eventRepository.save(event);
            meetingsCreated++;

            for (MeetingParticipantSeedItem participantItem : item.participants()) {
                Employee employee = employeeRepository.findByEmail(participantItem.employeeEmail())
                        .orElseThrow(() -> new RuntimeException("Employee not found: " + participantItem.employeeEmail()));

                WorkEventParticipant participant = new WorkEventParticipant(
                        savedEvent,
                        employee,
                        parseRole(participantItem.role())
                );

                applyAttendance(participant, participantItem);

                WorkEventParticipant savedParticipant = participantRepository.save(participant);
                participantsCreated++;

                saveAttendanceLogs(savedEvent, employee, savedParticipant, participantItem);
            }
        }

        return new MeetingImportCounters(meetingsCreated, participantsCreated);
    }

    private ParticipantRole parseRole(String value) {
        if (value == null || value.isBlank()) {
            return ParticipantRole.PARTICIPANT;
        }

        return ParticipantRole.valueOf(value.toUpperCase());
    }

    private void applyAttendance(
            WorkEventParticipant participant,
            MeetingParticipantSeedItem participantItem
    ) {
        AttendanceStatus status = participantItem.attendanceStatus();

        if (status == AttendanceStatus.PRESENT
                || status == AttendanceStatus.LATE
                || status == AttendanceStatus.PARTIAL) {
            participant.markPresent(participantItem.joinedAt());
            if (participantItem.leftAt() != null) {
                participant.markLeft(participantItem.leftAt());
            }
            return;
        }

        if (status == AttendanceStatus.ABSENT) {
            participant.markAbsent();
        }
    }

    private void saveAttendanceLogs(
            WorkEvent event,
            Employee employee,
            WorkEventParticipant participant,
            MeetingParticipantSeedItem participantItem
    ) {
        AttendanceStatus status = participantItem.attendanceStatus();

        if (status == AttendanceStatus.PRESENT
                || status == AttendanceStatus.LATE
                || status == AttendanceStatus.PARTIAL) {
            Instant joinedAt = participantItem.joinedAt() == null
                    ? event.getStartAt()
                    : participantItem.joinedAt();

            attendanceLogRepository.save(new EventAttendanceLog(
                    event,
                    employee,
                    participant,
                    AttendanceAction.JOINED,
                    AttendanceStatus.PRESENT,
                    joinedAt,
                    "Synthetic employee joined the meeting"
            ));

            if (participantItem.leftAt() != null) {
                attendanceLogRepository.save(new EventAttendanceLog(
                        event,
                        employee,
                        participant,
                        AttendanceAction.LEFT,
                        AttendanceStatus.PRESENT,
                        participantItem.leftAt(),
                        "Synthetic employee left the meeting"
                ));
            }
            return;
        }

        if (status == AttendanceStatus.ABSENT) {
            attendanceLogRepository.save(new EventAttendanceLog(
                    event,
                    employee,
                    participant,
                    AttendanceAction.AUTO_MARK_ABSENT,
                    AttendanceStatus.ABSENT,
                    event.getEndAt().plusSeconds(300),
                    "Synthetic employee did not join the meeting"
            ));
        }
    }

    private record MeetingImportCounters(
            int meetingsCreated,
            int participantsCreated
    ) {
    }
}

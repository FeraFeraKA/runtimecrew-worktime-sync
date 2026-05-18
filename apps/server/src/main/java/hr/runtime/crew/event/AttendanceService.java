package hr.runtime.crew.event;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class AttendanceService {

    private final WorkEventParticipantRepository participantRepository;
    private final EventAttendanceLogRepository attendanceLogRepository;

    public AttendanceService(
            WorkEventParticipantRepository participantRepository,
            EventAttendanceLogRepository attendanceLogRepository
    ) {
        this.participantRepository = participantRepository;
        this.attendanceLogRepository = attendanceLogRepository;
    }

    @Transactional
    public void markPresent(Long eventId, Long employeeId) {
        WorkEventParticipant participant = participantRepository
                .findByEvent_IdAndEmployee_Id(eventId, employeeId)
                .orElseThrow(() -> new RuntimeException("Employee is not participant of this event"));

        Instant now = Instant.now();

        participant.markPresent(now);
        participantRepository.save(participant);

        EventAttendanceLog log = new EventAttendanceLog(
                participant.getEvent(),
                participant.getEmployee(),
                participant,
                AttendanceAction.MARK_PRESENT,
                AttendanceStatus.PRESENT,
                now,
                "Employee marked as present"
        );

        attendanceLogRepository.save(log);
    }

    @Transactional
    public void markAbsent(Long eventId, Long employeeId) {
        WorkEventParticipant participant = participantRepository
                .findByEvent_IdAndEmployee_Id(eventId, employeeId)
                .orElseThrow(() -> new RuntimeException("Employee is not participant of this event"));

        Instant now = Instant.now();

        participant.markAbsent();
        participantRepository.save(participant);

        EventAttendanceLog log = new EventAttendanceLog(
                participant.getEvent(),
                participant.getEmployee(),
                participant,
                AttendanceAction.MARK_ABSENT,
                AttendanceStatus.ABSENT,
                now,
                "Employee marked as absent"
        );

        attendanceLogRepository.save(log);
    }
}
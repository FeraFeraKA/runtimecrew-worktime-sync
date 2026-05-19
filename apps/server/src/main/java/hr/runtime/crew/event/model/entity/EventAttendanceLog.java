package hr.runtime.crew.event.model.entity;

import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.event.model.enums.AttendanceAction;
import hr.runtime.crew.event.model.enums.AttendanceStatus;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "event_attendance_logs")
public class EventAttendanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private WorkEvent event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id", nullable = false)
    private WorkEventParticipant participant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceAction action;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus resultStatus;

    @Column(nullable = false)
    private Instant occurredAt;

    private String comment;

    public EventAttendanceLog() {
    }

    public EventAttendanceLog(
            WorkEvent event,
            Employee employee,
            WorkEventParticipant participant,
            AttendanceAction action,
            AttendanceStatus resultStatus,
            Instant occurredAt,
            String comment
    ) {
        this.event = event;
        this.employee = employee;
        this.participant = participant;
        this.action = action;
        this.resultStatus = resultStatus;
        this.occurredAt = occurredAt;
        this.comment = comment;
    }
}
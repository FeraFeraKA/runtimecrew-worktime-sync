package hr.runtime.crew.event.model.entity;

import java.util.UUID;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.event.model.enums.AttendanceAction;
import hr.runtime.crew.event.model.enums.AttendanceStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "event_attendance_logs")
public class EventAttendanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

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

    public UUID getId() {
        return id;
    }

    public WorkEvent getEvent() {
        return event;
    }

    public Employee getEmployee() {
        return employee;
    }

    public WorkEventParticipant getParticipant() {
        return participant;
    }

    public AttendanceAction getAction() {
        return action;
    }

    public AttendanceStatus getResultStatus() {
        return resultStatus;
    }

    public Instant getOccurredAt() {
        return occurredAt;
    }

    public String getComment() {
        return comment;
    }
}

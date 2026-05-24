package hr.runtime.crew.event.model.entity;

import java.util.UUID;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.event.model.enums.ParticipantRole;
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
@Table(name = "work_event_participants")
public class WorkEventParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private WorkEvent event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParticipantRole role = ParticipantRole.PARTICIPANT;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus attendanceStatus = AttendanceStatus.UNKNOWN;

    private Instant joinedAt;

    private Instant leftAt;

    public WorkEventParticipant() {
    }

    public WorkEventParticipant(WorkEvent event, Employee employee, ParticipantRole role) {
        this.event = event;
        this.employee = employee;
        this.role = role;
        this.attendanceStatus = AttendanceStatus.UNKNOWN;
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

    public ParticipantRole getRole() {
        return role;
    }

    public AttendanceStatus getAttendanceStatus() {
        return attendanceStatus;
    }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public Instant getLeftAt() {
        return leftAt;
    }

    public void markPresent(Instant joinedAt) {
        this.attendanceStatus = AttendanceStatus.PRESENT;
        this.joinedAt = joinedAt;
    }

    public void markAbsent() {
        this.attendanceStatus = AttendanceStatus.ABSENT;
    }

    public void markLeft(Instant leftAt) {
        this.leftAt = leftAt;
    }
}

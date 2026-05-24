package hr.runtime.crew.dashboard.model.entity;

import java.util.UUID;
import hr.runtime.crew.dashboard.model.enums.EmployeeActivityType;
import hr.runtime.crew.employee.model.entity.Employee;
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
@Table(name = "employee_activity_snapshots")
public class EmployeeActivitySnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "start_at", nullable = false)
    private Instant startAt;

    @Column(name = "end_at", nullable = false)
    private Instant endAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false)
    private EmployeeActivityType activityType;

    @Column(name = "activity_percent", nullable = false)
    private int activityPercent;

    @Column(name = "engagement_percent", nullable = false)
    private int engagementPercent;

    private String title;

    private String description;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public EmployeeActivitySnapshot() {
    }

    public EmployeeActivitySnapshot(
            Employee employee,
            Instant startAt,
            Instant endAt,
            EmployeeActivityType activityType,
            int activityPercent,
            int engagementPercent,
            String title,
            String description
    ) {
        this.employee = employee;
        this.startAt = startAt;
        this.endAt = endAt;
        this.activityType = activityType;
        this.activityPercent = activityPercent;
        this.engagementPercent = engagementPercent;
        this.title = title;
        this.description = description;
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Instant getStartAt() {
        return startAt;
    }

    public Instant getEndAt() {
        return endAt;
    }

    public EmployeeActivityType getActivityType() {
        return activityType;
    }

    public int getActivityPercent() {
        return activityPercent;
    }

    public int getEngagementPercent() {
        return engagementPercent;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}

package hr.runtime.crew.employee.dto;

import hr.runtime.crew.employee.model.enums.WeekDay;
import hr.runtime.crew.employee.model.enums.WorkFormat;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;

import java.time.Instant;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Embeddable
public class WorkSchedule {

    @ElementCollection
    @CollectionTable(
            name = "employee_working_days",
            joinColumns = @JoinColumn(name = "employee_id")
    )
    @Column(name = "working_day", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<WeekDay> workingDays = new HashSet<>();

    @Column(name = "work_start_time")
    private LocalTime startTime;

    @Column(name = "work_end_time")
    private LocalTime endTime;

    @Column(name = "timezone")
    private String timezone;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_format")
    private WorkFormat workFormat;

    @Column(name = "schedule_last_updated_at")
    private Instant lastUpdatedAt;

    @Column(name = "schedule_confirmed_at")
    private Instant confirmedAt;

    public WorkSchedule() {
    }

    public WorkSchedule(
            Set<WeekDay> workingDays,
            LocalTime startTime,
            LocalTime endTime,
            String timezone,
            WorkFormat workFormat
    ) {
        this.workingDays = workingDays;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timezone = timezone;
        this.workFormat = workFormat;
        this.lastUpdatedAt = Instant.now();
    }

    public Set<WeekDay> getWorkingDays() {
        return workingDays;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public String getTimezone() {
        return timezone;
    }

    public WorkFormat getWorkFormat() {
        return workFormat;
    }

    public Instant getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public Instant getConfirmedAt() {
        return confirmedAt;
    }

    public void update(
            Set<WeekDay> workingDays,
            LocalTime startTime,
            LocalTime endTime,
            String timezone,
            WorkFormat workFormat
    ) {
        this.workingDays = workingDays;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timezone = timezone;
        this.workFormat = workFormat;
        this.lastUpdatedAt = Instant.now();
    }

    public void confirm() {
        this.confirmedAt = Instant.now();
    }
}

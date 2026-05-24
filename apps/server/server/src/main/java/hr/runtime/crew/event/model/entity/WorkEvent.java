package hr.runtime.crew.event.model.entity;

import java.util.UUID;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.enums.EventType;
import hr.runtime.crew.team.Team;
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
@Table(name = "work_events")
public class WorkEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "location_type")
    private String locationType;

    @Column(name = "start_at", nullable = false)
    private Instant startAt;

    @Column(name = "end_at", nullable = false)
    private Instant endAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType eventType = EventType.MEETING;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status = EventStatus.PLANNED;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public WorkEvent() {
    }

    public WorkEvent(Team team, String title, String description, Instant startAt, Instant endAt) {
        this.team = team;
        this.title = title;
        this.description = description;
        this.startAt = startAt;
        this.endAt = endAt;
        this.eventType = EventType.MEETING;
        this.status = EventStatus.PLANNED;
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public Team getTeam() {
        return team;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getLocationType() {
        return locationType;
    }

    public Instant getStartAt() {
        return startAt;
    }

    public Instant getEndAt() {
        return endAt;
    }

    public EventType getEventType() {
        return eventType;
    }

    public EventStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void changeStatus(EventStatus status) {
        this.status = status;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public void setStartAt(Instant startAt) {
        this.startAt = startAt;
    }

    public void setEndAt(Instant endAt) {
        this.endAt = endAt;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}

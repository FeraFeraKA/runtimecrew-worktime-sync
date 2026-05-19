package hr.runtime.crew.event.model.entity;

import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.enums.EventType;
import hr.runtime.crew.team.Team;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "work_events")
public class WorkEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Column(nullable = false)
    private String title;

    private String description;

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

    public Long getId() {
        return id;
    }

    public Team getTeam() {
        return team;
    }

    public String getTitle() {
        return title;
    }

    public Instant getStartAt() {
        return startAt;
    }

    public Instant getEndAt() {
        return endAt;
    }

    public EventStatus getStatus() {
        return status;
    }

    public EventType getEventType(){return eventType;}
}
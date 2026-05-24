package hr.runtime.crew.event.service;


import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.repository.EmployeeRepository;

import hr.runtime.crew.event.dto.CreateEventRequest;
import hr.runtime.crew.event.dto.EventResponse;
import hr.runtime.crew.event.dto.UpdateEventRequest;
import hr.runtime.crew.event.model.entity.WorkEvent;
import hr.runtime.crew.event.model.entity.WorkEventParticipant;
import hr.runtime.crew.event.model.enums.ParticipantRole;
import hr.runtime.crew.event.repository.WorkEventParticipantRepository;
import hr.runtime.crew.event.repository.WorkEventRepository;
import hr.runtime.crew.team.Team;
import hr.runtime.crew.team.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WorkEventService {

    private final WorkEventRepository workEventRepository;
    private final WorkEventParticipantRepository participantRepository;
    private final EmployeeRepository employeeRepository;
    private final TeamRepository teamRepository;

    public WorkEventService(
            WorkEventRepository workEventRepository,
            WorkEventParticipantRepository participantRepository,
            EmployeeRepository employeeRepository,
            TeamRepository teamRepository
    ) {
        this.workEventRepository = workEventRepository;
        this.participantRepository = participantRepository;
        this.employeeRepository = employeeRepository;
        this.teamRepository = teamRepository;
    }

    @Transactional
    public EventResponse createEvent(UUID teamId, CreateEventRequest request) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        WorkEvent event = new WorkEvent();
        event.setTeam(team);
        event.setTitle(request.title());
        event.setDescription(request.description());
        event.setStartAt(request.startAt());
        event.setEndAt(request.endAt());
        if (request.eventType() != null) {
            event.setEventType(request.eventType());
        }
        event.setLocationType(request.locationType());
        if (request.status() != null) {
            event.setStatus(request.status());
        }

        WorkEvent saved = workEventRepository.save(event);

        if (request.participantIds() != null && !request.participantIds().isEmpty()) {
            for (UUID employeeId : request.participantIds()) {
                addParticipant(saved.getId(), employeeId);
            }
        }

        return toResponse(saved);
    }

    public List<EventResponse> getEventsByTeam(UUID teamId, Instant from, Instant to) {
        List<WorkEvent> events = workEventRepository.findByTeam_Id(teamId);

        if (from != null) {
            events = events.stream()
                    .filter(e -> !e.getStartAt().isBefore(from))
                    .collect(Collectors.toList());
        }
        if (to != null) {
            events = events.stream()
                    .filter(e -> e.getStartAt().isBefore(to))
                    .collect(Collectors.toList());
        }

        return events.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public EventResponse getEventById(UUID eventId) {
        WorkEvent event = workEventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return toResponse(event);
    }

    @Transactional
    public EventResponse updateEvent(UUID eventId, UpdateEventRequest request) {
        WorkEvent event = workEventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (request.title() != null) event.setTitle(request.title());
        if (request.description() != null) event.setDescription(request.description());
        if (request.startAt() != null) event.setStartAt(request.startAt());
        if (request.endAt() != null) event.setEndAt(request.endAt());
        if (request.eventType() != null) event.setEventType(request.eventType());
        if (request.locationType() != null) event.setLocationType(request.locationType());
        if (request.status() != null) event.setStatus(request.status());

        return toResponse(workEventRepository.save(event));
    }

    @Transactional
    public void deleteEvent(UUID eventId) {
        workEventRepository.deleteById(eventId);
    }

    @Transactional
    public void addParticipant(UUID eventId, UUID employeeId) {
        WorkEvent event = workEventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        boolean alreadyExists = participantRepository
                .findByEvent_IdAndEmployee_Id(eventId, employeeId)
                .isPresent();

        if (alreadyExists) {
            return;
        }

        WorkEventParticipant participant = new WorkEventParticipant(event, employee, ParticipantRole.PARTICIPANT);
        participantRepository.save(participant);
    }

    @Transactional
    public void removeParticipant(UUID eventId, UUID employeeId) {
        WorkEventParticipant participant = participantRepository
                .findByEvent_IdAndEmployee_Id(eventId, employeeId)
                .orElseThrow(() -> new RuntimeException("Participant not found"));
        participantRepository.delete(participant);
    }

    public List<UUID> getEventParticipantIds(UUID eventId) {
        return participantRepository.findByEvent_Id(eventId).stream()
                .map(p -> p.getEmployee().getId())
                .collect(Collectors.toList());
    }

    private EventResponse toResponse(WorkEvent event) {
        List<UUID> participantIds = getEventParticipantIds(event.getId());

        return new EventResponse(
                event.getId(),
                event.getTeam().getId(),
                event.getTitle(),
                event.getDescription(),
                event.getStartAt(),
                event.getEndAt(),
                event.getEventType(),
                event.getLocationType(),
                event.getStatus(),
                participantIds,
                event.getCreatedAt()
        );
    }
}
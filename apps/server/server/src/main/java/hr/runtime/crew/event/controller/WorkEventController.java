package hr.runtime.crew.event.controller;



import hr.runtime.crew.event.dto.CreateEventRequest;
import hr.runtime.crew.event.dto.EventResponse;
import hr.runtime.crew.event.dto.UpdateEventRequest;
import hr.runtime.crew.event.service.WorkEventService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teams/{teamId}/events")
public class WorkEventController {

    private final WorkEventService workEventService;

    public WorkEventController(WorkEventService workEventService) {
        this.workEventService = workEventService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventResponse createEvent(
            @PathVariable UUID teamId,
            @RequestBody CreateEventRequest request
    ) {
        return workEventService.createEvent(teamId, request);
    }

    @GetMapping
    public List<EventResponse> getEventsByTeam(
            @PathVariable UUID teamId,
            @RequestParam(required = false) Instant from,
            @RequestParam(required = false) Instant to
    ) {
        return workEventService.getEventsByTeam(teamId, from, to);
    }

    @GetMapping("/{eventId}")
    public EventResponse getEventById(@PathVariable UUID eventId) {
        return workEventService.getEventById(eventId);
    }

    @PatchMapping("/{eventId}")
    public EventResponse updateEvent(
            @PathVariable UUID eventId,
            @RequestBody UpdateEventRequest request
    ) {
        return workEventService.updateEvent(eventId, request);
    }

    @DeleteMapping("/{eventId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable UUID eventId) {
        workEventService.deleteEvent(eventId);
    }

    @PostMapping("/{eventId}/participants/{employeeId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addParticipant(
            @PathVariable UUID eventId,
            @PathVariable UUID employeeId
    ) {
        workEventService.addParticipant(eventId, employeeId);
    }

    @DeleteMapping("/{eventId}/participants/{employeeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeParticipant(
            @PathVariable UUID eventId,
            @PathVariable UUID employeeId
    ) {
        workEventService.removeParticipant(eventId, employeeId);
    }
}
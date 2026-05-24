package hr.runtime.crew.event.controller;



import hr.runtime.crew.event.dto.CreateEventRequest;
import hr.runtime.crew.event.dto.EventResponse;
import hr.runtime.crew.event.dto.UpdateEventRequest;
import hr.runtime.crew.event.service.WorkEventService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

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
            @PathVariable Long teamId,
            @RequestBody CreateEventRequest request
    ) {
        return workEventService.createEvent(teamId, request);
    }

    @GetMapping
    public List<EventResponse> getEventsByTeam(
            @PathVariable Long teamId,
            @RequestParam(required = false) Instant from,
            @RequestParam(required = false) Instant to
    ) {
        return workEventService.getEventsByTeam(teamId, from, to);
    }

    @GetMapping("/{eventId}")
    public EventResponse getEventById(@PathVariable Long eventId) {
        return workEventService.getEventById(eventId);
    }

    @PatchMapping("/{eventId}")
    public EventResponse updateEvent(
            @PathVariable Long eventId,
            @RequestBody UpdateEventRequest request
    ) {
        return workEventService.updateEvent(eventId, request);
    }

    @DeleteMapping("/{eventId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long eventId) {
        workEventService.deleteEvent(eventId);
    }

    @PostMapping("/{eventId}/participants/{employeeId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addParticipant(
            @PathVariable Long eventId,
            @PathVariable Long employeeId
    ) {
        workEventService.addParticipant(eventId, employeeId);
    }

    @DeleteMapping("/{eventId}/participants/{employeeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeParticipant(
            @PathVariable Long eventId,
            @PathVariable Long employeeId
    ) {
        workEventService.removeParticipant(eventId, employeeId);
    }
}
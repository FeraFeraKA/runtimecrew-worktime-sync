package hr.runtime.crew.availability.controller;

import hr.runtime.crew.availability.dto.AvailabilityPageResponse;
import hr.runtime.crew.availability.service.AvailabilityMockService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;

@RestController
public class AvailabilityController {

    private final AvailabilityMockService availabilityMockService;

    public AvailabilityController(AvailabilityMockService availabilityMockService) {
        this.availabilityMockService = availabilityMockService;
    }

    @GetMapping("/api/teams/{teamId}/availability")
    public AvailabilityPageResponse getAvailabilityPage(
            @PathVariable UUID teamId,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to
    ) {
        return availabilityMockService.getAvailabilityPage(teamId, from, to);
    }
}
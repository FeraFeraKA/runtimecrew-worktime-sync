package hr.runtime.crew.conflict.controller;

import hr.runtime.crew.conflict.dto.ConflictsPageResponse;
import hr.runtime.crew.conflict.service.ConflictsMockService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;

@RestController
public class ConflictsController {

    private final ConflictsMockService conflictsMockService;

    public ConflictsController(ConflictsMockService conflictsMockService) {
        this.conflictsMockService = conflictsMockService;
    }

    @GetMapping("/api/teams/{teamId}/conflicts")
    public ConflictsPageResponse getConflictsPage(
            @PathVariable UUID teamId,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search
    ) {
        return conflictsMockService.getConflictsPage(
                teamId,
                from,
                to,
                type,
                severity,
                status,
                search
        );
    }
}

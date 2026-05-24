package hr.runtime.crew.event.repository;

import java.util.UUID;
import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.entity.WorkEventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface WorkEventParticipantRepository extends JpaRepository<WorkEventParticipant, UUID> {

    List<WorkEventParticipant> findByEvent_Id(UUID eventId);
    List<WorkEventParticipant> findByEmployee_Id(UUID employeeId);

    Optional<WorkEventParticipant> findByEvent_IdAndEmployee_Id(UUID eventId, UUID employeeId);

    @Query("""
            select count(participant) > 0
            from WorkEventParticipant participant
            where participant.employee.id = :employeeId
              and participant.event.status <> :cancelledStatus
              and participant.event.startAt < :timeEnd
              and participant.event.endAt > :timeStart
            """)
    boolean existsOverlappingEvent(
            @Param("employeeId") UUID employeeId,
            @Param("timeStart") Instant timeStart,
            @Param("timeEnd") Instant timeEnd,
            @Param("cancelledStatus") EventStatus cancelledStatus
    );
}
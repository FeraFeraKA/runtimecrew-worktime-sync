package hr.runtime.crew.event.repository;

import hr.runtime.crew.event.model.enums.EventStatus;
import hr.runtime.crew.event.model.entity.WorkEventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface WorkEventParticipantRepository extends JpaRepository<WorkEventParticipant, Long> {

    List<WorkEventParticipant> findByEvent_Id(Long eventId);
    List<WorkEventParticipant> findByEmployee_Id(Long employeeId);

    Optional<WorkEventParticipant> findByEvent_IdAndEmployee_Id(Long eventId, Long employeeId);

    @Query("""
            select count(participant) > 0
            from WorkEventParticipant participant
            where participant.employee.id = :employeeId
              and participant.event.status <> :cancelledStatus
              and participant.event.startAt < :timeEnd
              and participant.event.endAt > :timeStart
            """)
    boolean existsOverlappingEvent(
            @Param("employeeId") Long employeeId,
            @Param("timeStart") Instant timeStart,
            @Param("timeEnd") Instant timeEnd,
            @Param("cancelledStatus") EventStatus cancelledStatus
    );
}
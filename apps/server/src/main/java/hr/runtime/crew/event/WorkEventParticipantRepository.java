package hr.runtime.crew.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkEventParticipantRepository extends JpaRepository<WorkEventParticipant, Long> {

    List<WorkEventParticipant> findByEvent_Id(Long eventId);

    Optional<WorkEventParticipant> findByEvent_IdAndEmployee_Id(Long eventId, Long employeeId);
}
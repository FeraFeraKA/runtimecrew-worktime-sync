package hr.runtime.crew.event.repository;

import java.util.List;
import java.util.UUID;
import hr.runtime.crew.event.model.entity.WorkEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkEventRepository extends JpaRepository<WorkEvent, UUID> {

    List<WorkEvent> findByTeam_Id(UUID teamId);
}
package hr.runtime.crew.event.repository;

import hr.runtime.crew.event.model.entity.WorkEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkEventRepository extends JpaRepository<WorkEvent, Long> {
    List<WorkEvent> findByTeam_Id(Long teamId);
}
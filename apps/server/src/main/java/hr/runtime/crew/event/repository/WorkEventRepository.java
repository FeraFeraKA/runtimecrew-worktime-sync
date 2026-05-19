package hr.runtime.crew.event.repository;

import hr.runtime.crew.event.model.entity.WorkEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkEventRepository extends JpaRepository<WorkEvent, Long> {
}
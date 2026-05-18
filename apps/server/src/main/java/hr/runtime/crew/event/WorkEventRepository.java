package hr.runtime.crew.event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkEventRepository extends JpaRepository<WorkEvent, Long> {
}
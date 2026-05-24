package hr.runtime.crew.dashboard.repository;

import hr.runtime.crew.dashboard.model.entity.EmployeeActivitySnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface EmployeeActivitySnapshotRepository extends JpaRepository<EmployeeActivitySnapshot, UUID> {

    List<EmployeeActivitySnapshot> findByEmployee_IdAndStartAtLessThanAndEndAtGreaterThanOrderByStartAt(
            UUID employeeId,
            Instant to,
            Instant from
    );

    List<EmployeeActivitySnapshot> findByEmployee_Team_IdAndStartAtLessThanAndEndAtGreaterThanOrderByStartAt(
            UUID teamId,
            Instant to,
            Instant from
    );
}

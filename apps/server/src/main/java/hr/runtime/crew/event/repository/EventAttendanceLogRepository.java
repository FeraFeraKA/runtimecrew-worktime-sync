package hr.runtime.crew.event.repository;

import java.util.UUID;
import hr.runtime.crew.event.model.entity.EventAttendanceLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventAttendanceLogRepository extends JpaRepository<EventAttendanceLog, UUID> {

    List<EventAttendanceLog> findByEvent_Id(UUID eventId);

    List<EventAttendanceLog> findByEmployee_Id(UUID employeeId);
}
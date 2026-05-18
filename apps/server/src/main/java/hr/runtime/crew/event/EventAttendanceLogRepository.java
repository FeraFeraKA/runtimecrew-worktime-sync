package hr.runtime.crew.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventAttendanceLogRepository extends JpaRepository<EventAttendanceLog, Long> {

    List<EventAttendanceLog> findByEvent_Id(Long eventId);

    List<EventAttendanceLog> findByEmployee_Id(Long employeeId);
}
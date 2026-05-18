package hr.runtime.crew.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByTeam_Id(Long teamId);

    Optional<Employee> findByEmail(String email);
}

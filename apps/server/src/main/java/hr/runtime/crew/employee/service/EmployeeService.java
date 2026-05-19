package hr.runtime.crew.employee.service;

import hr.runtime.crew.employee.dto.*;
import hr.runtime.crew.employee.model.entity.Employee;
import hr.runtime.crew.employee.repository.EmployeeRepository;
import hr.runtime.crew.team.Team;
import hr.runtime.crew.team.TeamService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final TeamService teamService;

    public EmployeeService(EmployeeRepository employeeRepository, TeamService teamService) {
        this.employeeRepository = employeeRepository;
        this.teamService = teamService;
    }

    public EmployeeResponse createEmployee(Long teamId, CreateEmployeeRequest request) {
        Team team = teamService.getTeamEntityById(teamId);
        WorkSchedule workSchedule = toWorkSchedule(request.workSchedule());

        Employee employee = new Employee(
                team,
                request.fullName(),
                request.email(),
                request.role(),
                request.avatarUrl(),
                workSchedule
        );

        Employee savedEmployee = employeeRepository.save(employee);
        return toResponse(savedEmployee);
    }

    public List<EmployeeResponse> getEmployeesByTeam(Long teamId) {
        return employeeRepository.findByTeam_Id(teamId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EmployeeResponse getEmployeeById(Long employeeId) {
        Employee employee = getEmployeeEntityById(employeeId);
        return toResponse(employee);
    }

    public EmployeeResponse updateEmployee(Long employeeId, UpdateEmployeeRequest request) {
        Employee employee = getEmployeeEntityById(employeeId);
        employee.updateMainInfo(
                request.fullName(),
                request.email(),
                request.role(),
                request.avatarUrl()
        );

        Employee savedEmployee = employeeRepository.save(employee);
        return toResponse(savedEmployee);
    }

    public EmployeeResponse updateWorkSchedule(Long employeeId, WorkScheduleRequest request) {
        Employee employee = getEmployeeEntityById(employeeId);
        employee.updateWorkSchedule(toWorkSchedule(request));

        Employee savedEmployee = employeeRepository.save(employee);
        return toResponse(savedEmployee);
    }

    public EmployeeResponse confirmWorkSchedule(Long employeeId) {
        Employee employee = getEmployeeEntityById(employeeId);
        employee.confirmWorkSchedule();

        Employee savedEmployee = employeeRepository.save(employee);
        return toResponse(savedEmployee);
    }

    public Employee getEmployeeEntityById(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    private WorkSchedule toWorkSchedule(WorkScheduleRequest request) {
        if (request == null) {
            return new WorkSchedule();
        }

        return new WorkSchedule(
                request.workingDays(),
                request.startTime(),
                request.endTime(),
                request.timezone(),
                request.workFormat()
        );
    }

    private EmployeeResponse toResponse(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getTeam().getId(),
                employee.getFullName(),
                employee.getEmail(),
                employee.getRole(),
                employee.getAvatarUrl(),
                toWorkScheduleResponse(employee.getWorkSchedule()),
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );
    }

    private WorkScheduleResponse toWorkScheduleResponse(WorkSchedule workSchedule) {
        if (workSchedule == null) {
            return null;
        }

        return new WorkScheduleResponse(
                workSchedule.getWorkingDays(),
                workSchedule.getStartTime(),
                workSchedule.getEndTime(),
                workSchedule.getTimezone(),
                workSchedule.getWorkFormat(),
                workSchedule.getLastUpdatedAt(),
                workSchedule.getConfirmedAt()
        );
    }
}

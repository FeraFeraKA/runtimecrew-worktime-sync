package hr.runtime.crew.employee.controller;

import java.util.UUID;
import hr.runtime.crew.employee.service.EmployeeService;
import hr.runtime.crew.employee.dto.CreateEmployeeRequest;
import hr.runtime.crew.employee.dto.EmployeeResponse;
import hr.runtime.crew.employee.dto.UpdateEmployeeRequest;
import hr.runtime.crew.employee.dto.WorkScheduleRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/api/teams/{teamId}/employees")
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse createEmployee(
            @PathVariable UUID teamId,
            @RequestBody CreateEmployeeRequest request
    ) {
        return employeeService.createEmployee(teamId, request);
    }

    @GetMapping("/api/teams/{teamId}/employees")
    public List<EmployeeResponse> getEmployeesByTeam(@PathVariable UUID teamId) {
        return employeeService.getEmployeesByTeam(teamId);
    }

    @GetMapping("/api/employees/{employeeId}")
    public EmployeeResponse getEmployeeById(@PathVariable UUID employeeId) {
        return employeeService.getEmployeeById(employeeId);
    }

    @PatchMapping("/api/employees/{employeeId}")
    public EmployeeResponse updateEmployee(
            @PathVariable UUID employeeId,
            @RequestBody UpdateEmployeeRequest request
    ) {
        return employeeService.updateEmployee(employeeId, request);
    }

    @PatchMapping("/api/employees/{employeeId}/work-schedule")
    public EmployeeResponse updateWorkSchedule(
            @PathVariable UUID employeeId,
            @RequestBody WorkScheduleRequest request
    ) {
        return employeeService.updateWorkSchedule(employeeId, request);
    }

    @PostMapping("/api/employees/{employeeId}/confirm-schedule")
    public EmployeeResponse confirmWorkSchedule(@PathVariable UUID employeeId) {
        return employeeService.confirmWorkSchedule(employeeId);
    }
}

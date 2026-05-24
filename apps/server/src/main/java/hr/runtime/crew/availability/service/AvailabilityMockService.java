package hr.runtime.crew.availability.service;

import hr.runtime.crew.availability.dto.AvailabilityEmployeeDto;
import hr.runtime.crew.availability.dto.AvailabilityHeatmapSlotDto;
import hr.runtime.crew.availability.dto.AvailabilityMeetingSlotDto;
import hr.runtime.crew.availability.dto.AvailabilityPageKpiDto;
import hr.runtime.crew.availability.dto.AvailabilityPageResponse;
import hr.runtime.crew.availability.dto.AvailabilityProblemDayDto;
import hr.runtime.crew.availability.dto.AvailabilitySelectedSlotDto;
import hr.runtime.crew.availability.dto.EmployeeShortDto;
import hr.runtime.crew.availability.model.enums.AvailabilityEmployeeTagType;
import hr.runtime.crew.availability.model.enums.AvailabilityIssueType;
import hr.runtime.crew.availability.model.enums.AvailabilityPageKpiKey;
import hr.runtime.crew.availability.model.enums.AvailabilityStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AvailabilityMockService {

    public AvailabilityPageResponse getAvailabilityPage(UUID teamId, LocalDate from, LocalDate to) {
        EmployeeShortDto ivan = new EmployeeShortDto(
                UUID.fromString("d6fd68c7-0a1e-4246-b2c3-d52f599fb183"),
                "Иван Петров",
                "/avatars/ivan-petrov.png"
        );

        EmployeeShortDto maria = new EmployeeShortDto(
                UUID.fromString("1f0d36a7-3aa2-4f79-bf6e-e26e8d9f5ef4"),
                "Мария Соколова",
                "/avatars/maria-sokolova.png"
        );

        EmployeeShortDto alexey = new EmployeeShortDto(
                UUID.fromString("7b2cf28b-4a7b-4e7f-9f4f-b8e8d0c3de31"),
                "Алексей Морозов",
                "/avatars/alexey-morozov.png"
        );

        EmployeeShortDto dmitry = new EmployeeShortDto(
                UUID.fromString("f30ff4ad-3f56-4390-8022-0bb5df224e1a"),
                "Дмитрий Волков",
                "/avatars/dmitry-volkov.png"
        );

        AvailabilityEmployeeDto ivanAvailable = new AvailabilityEmployeeDto(
                ivan,
                "Бэкенд-инженер",
                null,
                null
        );

        AvailabilityEmployeeDto mariaAvailable = new AvailabilityEmployeeDto(
                maria,
                "Фронтенд-инженер",
                null,
                null
        );

        AvailabilityEmployeeDto alexeyUnavailable = new AvailabilityEmployeeDto(
                alexey,
                "QA-инженер",
                "UTC+10",
                AvailabilityEmployeeTagType.TIMEZONE
        );

        AvailabilityEmployeeDto dmitryUnavailable = new AvailabilityEmployeeDto(
                dmitry,
                "DevOps-инженер",
                "Перегрузка",
                AvailabilityEmployeeTagType.OUTSIDE_HOURS
        );

        String selectedSlotId = "Вт-14:00 - 15:00";

        return new AvailabilityPageResponse(
                buildKpis(),
                buildHeatmap(),
                selectedSlotId,
                Map.of(
                        selectedSlotId,
                        new AvailabilitySelectedSlotDto(
                                "Вт",
                                "14:00 - 15:00",
                                List.of(ivanAvailable, mariaAvailable),
                                List.of(alexeyUnavailable, dmitryUnavailable)
                        )
                ),
                buildBestSlots(),
                buildProblemDays()
        );
    }

    private List<AvailabilityPageKpiDto> buildKpis() {
        return List.of(
                new AvailabilityPageKpiDto(
                        AvailabilityPageKpiKey.FULLY_AVAILABLE,
                        "Полностью доступны",
                        "12",
                        2,
                        "за выбранный период"
                ),
                new AvailabilityPageKpiDto(
                        AvailabilityPageKpiKey.MOSTLY_AVAILABLE,
                        "Большинство доступно",
                        "18",
                        1,
                        "за выбранный период"
                ),
                new AvailabilityPageKpiDto(
                        AvailabilityPageKpiKey.PROBLEM_DAYS,
                        "Проблемные дни",
                        "4",
                        -1,
                        "за выбранный период"
                ),
                new AvailabilityPageKpiDto(
                        AvailabilityPageKpiKey.TIMEZONE_CONFLICTS,
                        "Конфликты часовых поясов",
                        "3",
                        0,
                        "за выбранный период"
                ),
                new AvailabilityPageKpiDto(
                        AvailabilityPageKpiKey.AVERAGE_AVAILABILITY,
                        "Средняя доступность",
                        "76%",
                        5,
                        "за выбранный период"
                )
        );
    }

    private List<AvailabilityHeatmapSlotDto> buildHeatmap() {
        return List.of(
                new AvailabilityHeatmapSlotDto(
                        "Пн-08:00 - 09:00",
                        "Пн",
                        "08:00 - 09:00",
                        AvailabilityStatus.MOSTLY_AVAILABLE,
                        5,
                        6,
                        false
                ),
                new AvailabilityHeatmapSlotDto(
                        "Вт-14:00 - 15:00",
                        "Вт",
                        "14:00 - 15:00",
                        AvailabilityStatus.AVAILABLE,
                        6,
                        6,
                        true
                ),
                new AvailabilityHeatmapSlotDto(
                        "Ср-18:00 - 19:00",
                        "Ср",
                        "18:00 - 19:00",
                        AvailabilityStatus.UNAVAILABLE,
                        3,
                        6,
                        false
                ),
                new AvailabilityHeatmapSlotDto(
                        "Чт-16:00 - 17:00",
                        "Чт",
                        "16:00 - 17:00",
                        AvailabilityStatus.LIMITED,
                        4,
                        6,
                        false
                ),
                new AvailabilityHeatmapSlotDto(
                        "Пт-09:00 - 10:00",
                        "Пт",
                        "09:00 - 10:00",
                        AvailabilityStatus.MOSTLY_AVAILABLE,
                        5,
                        6,
                        false
                )
        );
    }

    private List<AvailabilityMeetingSlotDto> buildBestSlots() {
        return List.of(
                new AvailabilityMeetingSlotDto(
                        "best-1",
                        "Вт",
                        "14:00 - 15:00",
                        "5/6 доступны",
                        96,
                        AvailabilityStatus.AVAILABLE
                ),
                new AvailabilityMeetingSlotDto(
                        "best-2",
                        "Ср",
                        "11:00 - 12:00",
                        "6/6 доступны",
                        91,
                        AvailabilityStatus.AVAILABLE
                ),
                new AvailabilityMeetingSlotDto(
                        "best-3",
                        "Чт",
                        "16:00 - 17:00",
                        "4/6 доступны",
                        82,
                        AvailabilityStatus.LIMITED
                )
        );
    }

    private List<AvailabilityProblemDayDto> buildProblemDays() {
        return List.of(
                new AvailabilityProblemDayDto(
                        "problem-1",
                        AvailabilityIssueType.TIMEZONE,
                        "Пн",
                        "10:00 - 11:00",
                        "2 конфликта часовых поясов"
                ),
                new AvailabilityProblemDayDto(
                        "problem-2",
                        AvailabilityIssueType.OUTSIDE_HOURS,
                        "Ср",
                        "18:00 - 19:00",
                        "3 сотрудника вне рабочего времени"
                ),
                new AvailabilityProblemDayDto(
                        "problem-3",
                        AvailabilityIssueType.VACATION,
                        "Пт",
                        "09:00 - 10:00",
                        "2 сотрудника в отпуске"
                )
        );
    }
}
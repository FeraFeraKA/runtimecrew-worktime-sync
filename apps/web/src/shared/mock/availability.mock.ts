import type {
  AvailabilityEmployeeDto,
  AvailabilityHeatmapSlotDto,
  AvailabilityPageResponse,
  AvailabilitySelectedSlotDto,
  AvailabilityStatus,
} from "../types/availability/availability.types";
import { SELECTED_PERIOD_CHANGE_LABEL } from "../config/defaults";

const employees = {
  ivan: {
    id: "d6fd68c7-0a1e-4246-b2c3-d52f599fb183",
    fullName: "Иван Петров",
    avatarUrl: "/avatars/ivan-petrov.png",
  },
  maria: {
    id: "1f0d36a7-3aa2-4f79-bf6e-e26e8d9f5ef4",
    fullName: "Мария Соколова",
    avatarUrl: "/avatars/maria-sokolova.png",
  },
  ekaterina: {
    id: "50f8717d-fc8e-41dd-8d32-4d6a0f3c7f94",
    fullName: "Екатерина Лебедева",
    avatarUrl: "/avatars/ekaterina-lebedeva.png",
  },
  anna: {
    id: "afd7216f-cd71-4d62-a3f7-b8e68d89f77e",
    fullName: "Анна Кузнецова",
    avatarUrl: "/avatars/anna-kuznetsova.png",
  },
  alexey: {
    id: "7b2cf28b-4a7b-4e7f-9f4f-b8e8d0c3de31",
    fullName: "Алексей Морозов",
    avatarUrl: "/avatars/alexey-morozov.png",
  },
  dmitry: {
    id: "f30ff4ad-3f56-4390-8022-0bb5df224e1a",
    fullName: "Дмитрий Волков",
    avatarUrl: "/avatars/dmitry-volkov.png",
  },
};

const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const times = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
];

const slotStatuses = [
  [
    "mostly_available",
    "mostly_available",
    "mostly_available",
    "mostly_available",
    "mostly_available",
  ],
  [
    "mostly_available",
    "mostly_available",
    "mostly_available",
    "mostly_available",
    "available",
  ],
  [
    "unavailable",
    "limited",
    "mostly_available",
    "mostly_available",
    "unavailable",
  ],
  [
    "mostly_available",
    "mostly_available",
    "available",
    "mostly_available",
    "mostly_available",
  ],
  [
    "mostly_available",
    "mostly_available",
    "available",
    "mostly_available",
    "mostly_available",
  ],
  [
    "mostly_available",
    "mostly_available",
    "mostly_available",
    "available",
    "mostly_available",
  ],
  [
    "available",
    "mostly_available",
    "mostly_available",
    "mostly_available",
    "available",
  ],
  [
    "mostly_available",
    "mostly_available",
    "mostly_available",
    "available",
    "mostly_available",
  ],
  [
    "limited",
    "mostly_available",
    "mostly_available",
    "limited",
    "mostly_available",
  ],
  [
    "mostly_available",
    "mostly_available",
    "unavailable",
    "mostly_available",
    "mostly_available",
  ],
  ["unavailable", "limited", "unavailable", "unavailable", "unavailable"],
] as const;

const employeeRows: AvailabilityEmployeeDto[] = [
  { employee: employees.ivan, roleLabel: "Бэкенд-инженер" },
  { employee: employees.maria, roleLabel: "Фронтенд-инженер" },
  { employee: employees.ekaterina, roleLabel: "Продакт-менеджер" },
  { employee: employees.anna, roleLabel: "Дизайнер интерфейсов" },
  {
    employee: employees.alexey,
    roleLabel: "Инженер по тестированию",
    tag: "UTC+10",
    tagType: "timezone",
  },
  {
    employee: employees.dmitry,
    roleLabel: "Инженер инфраструктуры",
    tag: "Перегрузка",
    tagType: "outside_hours",
  },
];

const defaultSelectedSlotId = "Вт-14:00 - 15:00";

const heatmap: AvailabilityHeatmapSlotDto[] = times.flatMap((time, timeIndex) =>
  days.map((day, dayIndex) => {
    const status = slotStatuses[timeIndex][dayIndex];

    return {
      id: `${day}-${time}`,
      day,
      time,
      status,
      availableCount: getAvailableCount(status),
      totalCount: employeeRows.length,
      isSelected: day === "Вт" && time === "14:00 - 15:00",
    };
  }),
);

const slotDetails = Object.fromEntries(
  heatmap.map((slot, index) => [slot.id, buildSlotDetails(slot, index)]),
);

slotDetails[defaultSelectedSlotId] = {
  day: "Вт",
  time: "14:00-15:00",
  available: employeeRows.slice(0, 4),
  unavailable: employeeRows.slice(4),
};

export const mockAvailabilityResponse: AvailabilityPageResponse = {
  kpis: [
    {
      key: "fullyAvailable",
      title: "Полностью доступны",
      value: "12",
      changeValue: 2,
      changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
    },
    {
      key: "mostlyAvailable",
      title: "Большинство доступно",
      value: "18",
      changeValue: 1,
      changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
    },
    {
      key: "problemDays",
      title: "Проблемные дни",
      value: "4",
      changeValue: -1,
      changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
    },
    {
      key: "timezoneConflicts",
      title: "Конфликты часовых поясов",
      value: "3",
      changeValue: 0,
      changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
    },
    {
      key: "averageAvailability",
      title: "Средняя доступность",
      value: "76%",
      changeValue: 5,
      changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
    },
  ],
  heatmap,
  selectedSlotId: defaultSelectedSlotId,
  slotDetails,
  bestSlots: [
    {
      id: "best-1",
      day: "Вт",
      time: "14:00 - 15:00",
      availableLabel: "5/6 доступны",
      score: 96,
      status: "available",
    },
    {
      id: "best-2",
      day: "Ср",
      time: "11:00 - 12:00",
      availableLabel: "6/6 доступны",
      score: 91,
      status: "available",
    },
    {
      id: "best-3",
      day: "Чт",
      time: "16:00 - 17:00",
      availableLabel: "4/6 доступны",
      score: 82,
      status: "limited",
    },
  ],
  problemDays: [
    {
      id: "problem-1",
      type: "timezone",
      day: "Пн",
      time: "10:00 - 11:00",
      description: "2 конфликта час. поясов",
    },
    {
      id: "problem-2",
      type: "outside_hours",
      day: "Ср",
      time: "18:00 - 19:00",
      description: "3 вне рабочего времени",
    },
    {
      id: "problem-3",
      type: "vacation",
      day: "Пт",
      time: "09:00 - 10:00",
      description: "2 сотрудника в отпуске",
    },
  ],
};

function getAvailableCount(status: AvailabilityStatus) {
  if (status === "available") {
    return 6;
  }

  if (status === "mostly_available") {
    return 5;
  }

  if (status === "limited") {
    return 4;
  }

  return 3;
}

function buildSlotDetails(
  slot: AvailabilityHeatmapSlotDto,
  index: number,
): AvailabilitySelectedSlotDto {
  const rotatedEmployees = [
    ...employeeRows.slice(index % employeeRows.length),
    ...employeeRows.slice(0, index % employeeRows.length),
  ];
  const availableCount = slot.availableCount;
  const available = rotatedEmployees.slice(0, availableCount);
  const unavailable = rotatedEmployees.slice(availableCount);

  return {
    day: slot.day,
    time: slot.time.replace(" - ", "-"),
    available,
    unavailable,
  };
}

import {
  buildProductivityTimelineDateTime,
  getProductivitySegmentStatus,
  productivitySegmentStatusMeta,
  toProductivityTimelineMinutes,
} from "../types/employees/employees.meta";
import { SELECTED_PERIOD_CHANGE_LABEL } from "../config/defaults";
import type {
  EmployeeProductivitySegmentDto,
  EmployeeTableRowDto,
  EmployeesPageKpiDto,
  EmployeesPageResponse,
} from "../types/employees/employees.types";

const mockEmployeesKpis: EmployeesPageKpiDto[] = [
  {
    key: "totalEmployees",
    title: "Всего сотрудников",
    value: 30,
    changeValue: 2,
    changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
  },
  {
    key: "activeEmployees",
    title: "Активны",
    value: 24,
    changeValue: 1,
    changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
  },
  {
    key: "riskZoneEmployees",
    title: "В зоне риска",
    value: 10,
    changeValue: -2,
    changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
  },
  {
    key: "criticalEmployees",
    title: "Критический риск",
    value: 5,
    changeValue: 1,
    changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
  },
  {
    key: "unavailableEmployees",
    title: "Недоступны",
    value: 4,
    changeValue: 0,
    changeLabel: SELECTED_PERIOD_CHANGE_LABEL,
  },
];

const mockEmployees: EmployeeTableRowDto[] = [
  {
    employee: {
      id: "d6fd68c7-0a1e-4246-b2c3-d52f599fb183",
      fullName: "Иван Петров",
      avatarUrl: "/avatars/ivan-petrov.png",
    },
    role: "backend_engineer",
    roleLabel: "Бэкенд-инженер",
    timezone: "Europe/Moscow",
    timezoneLabel: "UTC +3",
    workFormat: "remote",
    workFormatLabel: "Удалённо",
    actualityScore: 52,
    risk: "critical",
    riskLabel: "Критический",
    conflictsCount: 6,
    overloadedDaysCount: 3,
    productivityPercent: 71,
    status: "outdated",
    statusLabel: "Необходимо обновить график",
    actions: "Попросить обновить график",
  },
  {
    employee: {
      id: "1f0d36a7-3aa2-4f79-bf6e-e26e8d9f5ef4",
      fullName: "Мария Соколова",
      avatarUrl: "/avatars/maria-sokolova.png",
    },
    role: "frontend_engineer",
    roleLabel: "Фронтенд-инженер",
    timezone: "Europe/Moscow",
    timezoneLabel: "UTC +3",
    workFormat: "hybrid",
    workFormatLabel: "Гибрид",
    actualityScore: 58,
    risk: "critical",
    riskLabel: "Критический",
    conflictsCount: 5,
    overloadedDaysCount: 2,
    productivityPercent: 76,
    status: "personal_unavailable",
    statusLabel: "Личная недоступность",
    actions: "Проверить исключения",
  },
  {
    employee: {
      id: "7b2cf28b-4a7b-4e7f-9f4f-b8e8d0c3de31",
      fullName: "Алексей Морозов",
      avatarUrl: "/avatars/alexey-morozov.png",
    },
    role: "qa_engineer",
    roleLabel: "Инженер по тестированию",
    timezone: "Asia/Vladivostok",
    timezoneLabel: "UTC +10",
    workFormat: "remote",
    workFormatLabel: "Удалённо",
    actualityScore: 61,
    risk: "high",
    riskLabel: "Высокий",
    conflictsCount: 4,
    overloadedDaysCount: 1,
    productivityPercent: 82,
    status: "timezone_conflict",
    statusLabel: "Конфликт часового пояса",
    actions: "Сместить командные встречи",
  },
  {
    employee: {
      id: "50f8717d-fc8e-41dd-8d32-4d6a0f3c7f94",
      fullName: "Екатерина Лебедева",
      avatarUrl: "/avatars/ekaterina-lebedeva.png",
    },
    role: "product_manager",
    roleLabel: "Продакт-менеджер",
    timezone: "Europe/Moscow",
    timezoneLabel: "UTC +3",
    workFormat: "office",
    workFormatLabel: "Офис",
    actualityScore: 64,
    risk: "high",
    riskLabel: "Высокий",
    conflictsCount: 3,
    overloadedDaysCount: 5,
    productivityPercent: 68,
    status: "overloaded",
    statusLabel: "Перегружена встречами",
    actions: "Добавить время для фокусной работы",
  },
  {
    employee: {
      id: "f30ff4ad-3f56-4390-8022-0bb5df224e1a",
      fullName: "Дмитрий Волков",
      avatarUrl: "/avatars/dmitry-volkov.png",
    },
    role: "devops_engineer",
    roleLabel: "Инженер инфраструктуры",
    timezone: "Europe/Samara",
    timezoneLabel: "UTC +4",
    workFormat: "remote",
    workFormatLabel: "Удалённо",
    actualityScore: 66,
    risk: "medium",
    riskLabel: "Средний",
    conflictsCount: 2,
    overloadedDaysCount: 1,
    productivityPercent: 84,
    status: "requires_confirmation",
    statusLabel: "Требует подтверждения",
    actions: "Отправить запрос",
  },
  {
    employee: {
      id: "afd7216f-cd71-4d62-a3f7-b8e68d89f77e",
      fullName: "Анна Кузнецова",
      avatarUrl: "/avatars/anna-kuznetsova.png",
    },
    role: "ui_ux_designer",
    roleLabel: "Дизайнер интерфейсов",
    timezone: "Europe/Moscow",
    timezoneLabel: "UTC +3",
    workFormat: "hybrid",
    workFormatLabel: "Гибрид",
    actualityScore: 71,
    risk: "medium",
    riskLabel: "Средний",
    conflictsCount: 2,
    overloadedDaysCount: 0,
    productivityPercent: 88,
    status: "work_format_mismatch",
    statusLabel: "Несовпадение формата",
    actions: "Уточнить офисные дни",
  },
  {
    employee: {
      id: "4b7f617a-6a9d-4a4b-a31b-80a14380b950",
      fullName: "Ольга Новикова",
      avatarUrl: "/avatars/olga-novikova.png",
    },
    role: "system_analyst",
    roleLabel: "Системный аналитик",
    timezone: "Europe/Moscow",
    timezoneLabel: "UTC +3",
    workFormat: "office",
    workFormatLabel: "Офис",
    actualityScore: 92,
    risk: "low",
    riskLabel: "Низкий",
    conflictsCount: 0,
    overloadedDaysCount: 0,
    productivityPercent: 94,
    status: "actual",
    statusLabel: "Актуальный график",
    actions: "Действий не требуется",
  },
  {
    employee: {
      id: "b0b71ef4-e5ef-4c0d-9dbb-9c4dc0dc66e4",
      fullName: "Никита Орлов",
      avatarUrl: "/avatars/nikita-orlov.png",
    },
    role: "hr_manager",
    roleLabel: "Менеджер по персоналу",
    timezone: "Europe/Moscow",
    timezoneLabel: "UTC +3",
    workFormat: "hybrid",
    workFormatLabel: "Гибрид",
    actualityScore: 89,
    risk: "low",
    riskLabel: "Низкий",
    conflictsCount: 1,
    overloadedDaysCount: 0,
    productivityPercent: 91,
    status: "vacation",
    statusLabel: "Отпуск",
    actions: "Учесть недоступность",
  },
];

export const mockEmployeesResponse: EmployeesPageResponse = {
  kpis: mockEmployeesKpis,
  employees: mockEmployees,
  productivityTimeline: {
    period: {
      date: "2026-05-20",
      startTime: "08:00",
      endTime: "18:00",
      intervalMinutes: 15,
    },
    employees: mockEmployees.map((row, rowIndex) => ({
      employee: row.employee,
      roleLabel: row.roleLabel,
      averageProductivityPercent: row.productivityPercent,
      segments: buildMockProductivitySegments(row, rowIndex),
    })),
  },
};

function buildMockProductivitySegments(
  row: EmployeeTableRowDto,
  rowIndex: number,
) {
  const date = "2026-05-20";
  const startMinutes = toProductivityTimelineMinutes("08:00");
  const endMinutes = toProductivityTimelineMinutes("18:00");
  const intervalMinutes = 15;
  const segments: EmployeeProductivitySegmentDto[] = [];

  for (
    let current = startMinutes;
    current < endMinutes;
    current += intervalMinutes
  ) {
    const slotIndex = (current - startMinutes) / intervalMinutes;
    const isLow = (slotIndex * 5 + rowIndex * 7) % 17 === 0;
    const isMiddle = (slotIndex * 3 + rowIndex * 5) % 11 === 0;
    const variation = ((slotIndex * 13 + rowIndex * 17) % 23) - 11;
    const productivityPercent = clamp(
      isLow
        ? 14 + ((slotIndex + rowIndex) % 12)
        : isMiddle
          ? 48 + ((slotIndex + rowIndex * 2) % 14)
          : row.productivityPercent + variation,
      0,
      100,
    );
    const status = getProductivitySegmentStatus(productivityPercent);

    segments.push({
      startAt: buildProductivityTimelineDateTime(date, current),
      endAt: buildProductivityTimelineDateTime(date, current + intervalMinutes),
      productivityPercent,
      status,
      statusLabel: productivitySegmentStatusMeta[status].label,
    });
  }

  return segments;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

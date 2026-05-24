export const TEAM_OPTIONS = [
  {
    id: "product-team",
    name: "Продуктовая команда",
  },
  {
    id: "research-team",
    name: "Исследовательская команда",
  },
  {
    id: "analytic-team",
    name: "Аналитическая команда",
  },
] as const;

export const DEFAULT_TEAM_ID = TEAM_OPTIONS[0].id;

export const DEFAULT_PERIOD = {
  from: "2026-05-01",
  to: "2026-05-14",
} as const;

export const DEFAULT_EMPLOYEE_ID = "d6fd68c7-0a1e-4246-b2c3-d52f599fb183";

export const SELECTED_PERIOD_CHANGE_LABEL = "за выбран. период";

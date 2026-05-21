import type { Severity } from "../types";

export const employeeProfileRiskMeta: Record<
  Severity,
  {
    label: string;
    color: string;
    textClassName: string;
  }
> = {
  low: {
    label: "Низкий",
    color: "#16a34a",
    textClassName: "text-green-600",
  },
  medium: {
    label: "Средний",
    color: "#eab308",
    textClassName: "text-yellow-600",
  },
  high: {
    label: "Высокий",
    color: "#f97316",
    textClassName: "text-orange-600",
  },
  critical: {
    label: "Критический",
    color: "#dc2626",
    textClassName: "text-red-600",
  },
};

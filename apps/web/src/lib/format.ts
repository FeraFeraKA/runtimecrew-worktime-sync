import type { Severity, WorkFormat } from "@/shared/types/types";

export function formatSeverity(severity: Severity) {
  const labels: Record<Severity, string> = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
    critical: "Критический",
  };

  return labels[severity];
}

export function formatWorkFormat(workFormat: WorkFormat) {
  const labels: Record<WorkFormat, string> = {
    office: "Офис",
    remote: "Удалённо",
    hybrid: "Гибрид",
  };

  return labels[workFormat];
}

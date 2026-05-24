import type { EmployeeShortDto } from "../types";

export type AvailabilityStatus =
  | "available"
  | "mostly_available"
  | "limited"
  | "unavailable";

export type AvailabilityIssueType = "timezone" | "outside_hours" | "vacation";

export type AvailabilityPageKpiKey =
  | "fullyAvailable"
  | "mostlyAvailable"
  | "problemDays"
  | "timezoneConflicts"
  | "averageAvailability";

export type AvailabilityPageKpiDto = {
  key: AvailabilityPageKpiKey;
  title: string;
  value: string;
  changeValue: number;
  changeLabel: string;
};

export type AvailabilityHeatmapSlotDto = {
  id: string;
  day: string;
  time: string;
  status: AvailabilityStatus;
  availableCount: number;
  totalCount: number;
  isSelected?: boolean;
};

export type AvailabilityEmployeeDto = {
  employee: EmployeeShortDto;
  roleLabel: string;
  tag?: string;
  tagType?: AvailabilityIssueType | "flexible";
};

export type AvailabilitySelectedSlotDto = {
  day: string;
  time: string;
  available: AvailabilityEmployeeDto[];
  unavailable: AvailabilityEmployeeDto[];
};

export type AvailabilityMeetingSlotDto = {
  id: string;
  day: string;
  time: string;
  availableLabel: string;
  score: number;
  status: AvailabilityStatus;
};

export type AvailabilityProblemDayDto = {
  id: string;
  type: AvailabilityIssueType;
  day: string;
  time: string;
  description: string;
};

export type AvailabilityPageResponse = {
  kpis: AvailabilityPageKpiDto[];
  heatmap: AvailabilityHeatmapSlotDto[];
  selectedSlotId: string;
  slotDetails: Record<string, AvailabilitySelectedSlotDto>;
  bestSlots: AvailabilityMeetingSlotDto[];
  problemDays: AvailabilityProblemDayDto[];
};

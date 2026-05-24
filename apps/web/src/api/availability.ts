import type { AvailabilityPageResponse } from "@/shared/types/availability/availability.types";
import { mockAvailabilityResponse } from "@/shared/mock/availability.mock";
import type { TeamPeriodRequestParams } from "./team-period.types";

export type GetAvailabilityDataParams = TeamPeriodRequestParams;

export async function getAvailabilityData(
  _params: GetAvailabilityDataParams,
): Promise<AvailabilityPageResponse> {
  return mockAvailabilityResponse;
}

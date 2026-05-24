import type { DashboardResponse } from "@/shared/types/dashboard/dashboard.types";
import { mockDashboardResponse } from "@/shared/mock/dashboard.mock";
import type { TeamPeriodRequestParams } from "./team-period.types";

export type GetDashboardDataParams = TeamPeriodRequestParams;

export async function getDashboardData(
  _params: GetDashboardDataParams,
): Promise<DashboardResponse> {
  return mockDashboardResponse;
}

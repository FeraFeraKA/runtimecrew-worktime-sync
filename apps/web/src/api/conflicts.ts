import type { ConflictsPageResponse } from "@/shared/types/conflicts/conflicts.types";
import { mockConflictsResponse } from "@/shared/mock/conflicts.mock";
import type { TeamPeriodRequestParams } from "./team-period.types";

export type GetConflictsDataParams = TeamPeriodRequestParams;

export async function getConflictsData(
  _params: GetConflictsDataParams,
): Promise<ConflictsPageResponse> {
  return mockConflictsResponse;
}

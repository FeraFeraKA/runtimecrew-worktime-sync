import type { EmployeeProfileResponse } from "@/shared/types/employee-profile/employee-profile.types";
import { mockEmployeeProfileResponse } from "@/shared/mock/employee-profile.mock";
import type { TeamPeriodRequestParams } from "./team-period.types";

export type GetEmployeeProfileDataParams = TeamPeriodRequestParams & {
  employeeId: string;
};

export async function getEmployeeProfileData(
  _params: GetEmployeeProfileDataParams,
): Promise<EmployeeProfileResponse> {
  return mockEmployeeProfileResponse;
}

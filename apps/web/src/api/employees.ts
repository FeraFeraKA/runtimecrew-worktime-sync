import type { EmployeesPageResponse } from "@/shared/types/employees/employees.types";
import { mockEmployeesResponse } from "@/shared/mock/employees.mock";
import type { TeamPeriodRequestParams } from "./team-period.types";

export type GetEmployeesDataParams = TeamPeriodRequestParams;

export async function getEmployeesData(
  _params: GetEmployeesDataParams,
): Promise<EmployeesPageResponse> {
  return mockEmployeesResponse;
}

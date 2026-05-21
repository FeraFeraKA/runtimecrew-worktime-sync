import type {
  DashboardResponse,
  PeriodDto,
  TeamDto,
} from "@/shared/types/dashboard/dashboard.types";
import { fetcher } from "./fetcher";

export interface IGetDashboardData {
  team: TeamDto;
  period: PeriodDto;
}

export function getDashboardData({ team, period }: IGetDashboardData) {
  const dashboardData = fetcher<DashboardResponse>({
    url: `dashboard?teamId=${team.id}&from=${period.from}&to=${period.to}`,
    method: "GET",
  });

  return dashboardData;
}

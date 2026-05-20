import { getDashboardData, type IGetDashboardData } from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";

const useGetDashboardData = (data: IGetDashboardData) => {
  return useQuery({
    queryKey: ["dashboardData", data.team.id, data.period.from, data.period.to],
    queryFn: () => getDashboardData(data),
  });
};

export default useGetDashboardData;

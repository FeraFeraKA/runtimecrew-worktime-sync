import {
  getDashboardData,
  type GetDashboardDataParams,
} from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";

const useGetDashboardData = (data: GetDashboardDataParams) => {
  return useQuery({
    queryKey: ["teams", data.teamId, "dashboard", data.from, data.to],
    queryFn: ({ signal }) => getDashboardData({ ...data, signal }),
  });
};

export default useGetDashboardData;

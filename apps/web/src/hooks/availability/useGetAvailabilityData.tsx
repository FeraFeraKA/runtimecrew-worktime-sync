import {
  getAvailabilityData,
  type GetAvailabilityDataParams,
} from "@/api/availability";
import { useQuery } from "@tanstack/react-query";

const useGetAvailabilityData = (data: GetAvailabilityDataParams) => {
  return useQuery({
    queryKey: ["teams", data.teamId, "availability", data.from, data.to],
    queryFn: ({ signal }) => getAvailabilityData({ ...data, signal }),
  });
};

export default useGetAvailabilityData;
